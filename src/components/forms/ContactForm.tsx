import { useRef, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2, Send, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TextField, TextAreaField, SelectField } from '@/components/forms/Field';
import {
  submitContact,
  CONTACT_PROVIDER,
  hasContactDelivery,
  type SubmitState,
  type ContactPayload,
  type ContactProvider,
} from '@/lib/contact';
import { SITE } from '@/lib/seo';
import { SOLUTIONS } from '@/data/solutions';
import { EASE_PREMIUM } from '@/lib/motion';
import { cn } from '@/lib/cn';

const BUDGETS = [
  { value: 'under-25k', label: 'Under $25k' },
  { value: '25k-75k', label: '$25k – $75k' },
  { value: '75k-150k', label: '$75k – $150k' },
  { value: '150k-plus', label: '$150k+' },
  { value: 'unsure', label: 'Not sure yet' },
];

const TIMELINES = [
  { value: 'asap', label: 'As soon as possible' },
  { value: 'quarter', label: 'This quarter' },
  { value: 'six-months', label: 'Within six months' },
  { value: 'exploring', label: 'Exploring options' },
];

interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  website: string;
}

const EMPTY: FormState = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  timeline: '',
  message: '',
  website: '',
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(values: FormState): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) {
    errors.name = 'Please tell us your name.';
  } else if (values.name.trim().length < 2) {
    errors.name = 'That looks too short — please enter your full name.';
  }

  if (!values.email.trim()) {
    errors.email = 'We need an email address to reply to.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Please check the email address format.';
  }

  if (!values.service) {
    errors.service = 'Select the closest solution area.';
  }

  const message = values.message.trim();
  if (!message) {
    errors.message = 'Tell us a little about the problem.';
  } else if (message.length < 20) {
    errors.message = 'A sentence or two more would help us respond usefully.';
  } else if (message.length > 4000) {
    errors.message = 'Please keep this under 4000 characters.';
  }

  return errors;
}

/** What the visitor is told about their message, per active transport. */
const DELIVERY_NOTE: Record<ContactProvider, string> = {
  emailjs: 'Your details are used only to respond to this enquiry.',
  endpoint: 'Your details are used only to respond to this enquiry.',
  demo: 'Demonstration mode: this form validates and confirms locally, but no message is transmitted because no delivery method is configured.',
};

export function ContactForm() {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<SubmitState>('idle');
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string; delivered: boolean } | null>(null);
  /** When the form was first shown — used to reject instant (bot) submissions. */
  const mountedAt = useRef(Date.now());

  const update = (key: keyof FormState) => (event: { target: { value: string } }) => {
    setValues((previous) => ({ ...previous, [key]: event.target.value }));
    setErrors((previous) => (previous[key] ? { ...previous, [key]: undefined } : previous));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'submitting') return;

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the first invalid control for keyboard/screen-reader users.
      const firstKey = Object.keys(found)[0];
      const element = document.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      element?.focus();
      setFeedback({ ok: false, message: 'Please correct the highlighted fields.', delivered: false });
      return;
    }

    setState('submitting');
    setFeedback(null);

    const payload: ContactPayload = {
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim() || undefined,
      service: values.service,
      budget: values.budget || undefined,
      timeline: values.timeline || undefined,
      message: values.message.trim(),
      website: values.website,
    };

    const result = await submitContact(payload, mountedAt.current);

    setState(result.ok ? 'success' : 'error');
    setFeedback({ ok: result.ok, message: result.message, delivered: result.delivered });

    if (result.ok && result.delivered) {
      setValues(EMPTY);
    }

    if (!result.ok && result.fieldErrors) {
      setErrors(result.fieldErrors as Errors);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" aria-hidden="true" />

      <AnimatePresence mode="wait">
        {state === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
            role="status"
            aria-live="polite"
            className="py-6 text-center"
          >
            <span
              className={cn(
                'mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full',
                feedback?.delivered ? 'bg-accent/30 text-[#3F5D00]' : 'bg-brand-50 text-brand',
              )}
              aria-hidden="true"
            >
              <CheckCircle2 className="h-7 w-7" />
            </span>

            <h2 className="mt-6 font-display text-[1.625rem] font-semibold tracking-[-0.02em]">
              {feedback?.delivered
                ? 'Message sent.'
                : hasContactDelivery
                  ? 'Received — we will be in touch.'
                  : 'Nothing was sent (demo mode).'}
            </h2>

            <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">{feedback?.message}</p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setState('idle');
                  setFeedback(null);
                  setValues(EMPTY);
                }}
              >
                Send another message
              </Button>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-[0.9375rem] font-medium text-brand transition-colors hover:text-brand-700"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span className="link-sweep">Email us directly</span>
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE_PREMIUM }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-[1.5rem] font-semibold tracking-[-0.02em]">Tell us about the project</h2>
                <p className="mt-2 text-[0.9375rem] text-ink-soft">
                  Fields marked with <span className="text-brand">*</span> are required.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <TextField
                name="name"
                label="Full name"
                required
                autoComplete="name"
                placeholder="Alex Morgan"
                value={values.name}
                onChange={update('name')}
                error={errors.name}
              />
              <TextField
                name="email"
                type="email"
                label="Work email"
                required
                autoComplete="email"
                placeholder="alex@company.com"
                value={values.email}
                onChange={update('email')}
                error={errors.email}
              />
              <TextField
                name="company"
                label="Company"
                autoComplete="organization"
                placeholder="Company name"
                value={values.company}
                onChange={update('company')}
              />
              <SelectField
                name="service"
                label="What do you need?"
                required
                placeholder="Select a solution area"
                value={values.service}
                onChange={update('service')}
                error={errors.service}
                options={[
                  ...SOLUTIONS.map((solution) => ({ value: solution.slug, label: solution.title })),
                  { value: 'other', label: 'Something else' },
                ]}
              />
              <SelectField
                name="budget"
                label="Budget range"
                placeholder="Prefer not to say"
                value={values.budget}
                onChange={update('budget')}
                options={BUDGETS}
              />
              <SelectField
                name="timeline"
                label="Timeline"
                placeholder="Flexible"
                value={values.timeline}
                onChange={update('timeline')}
                options={TIMELINES}
              />
            </div>

            <TextAreaField
              name="message"
              label="Project details"
              required
              containerClassName="mt-5"
              placeholder="What problem are you trying to solve? What data do you have, and what does success look like?"
              hint={`${values.message.trim().length}/4000 characters`}
              value={values.message}
              onChange={update('message')}
              error={errors.message}
              maxLength={4000}
            />

            {/* Honeypot — visually and semantically hidden from users.
                `autoComplete="off"` alone is not enough: several password
                managers ignore it and happily fill a field named "website".
                A filled honeypot makes submitContact drop the submission while
                still reporting success, so a real enquiry would vanish without
                trace. The data-* attributes opt out of the major managers, and
                the name is deliberately not a plausible autofill target. */}
            <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="company-url-trap">Leave this field empty</label>
              <input
                id="company-url-trap"
                name="business_site_url_trap"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                data-1p-ignore
                data-lpignore="true"
                data-form-type="other"
                value={values.website}
                onChange={update('website')}
              />
            </div>

            <AnimatePresence>
              {feedback && !feedback.ok ? (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  role="alert"
                  className="mt-5 flex items-start gap-2.5 rounded-xl border border-[#FECDCA] bg-[#FEF3F2] px-4 py-3 text-[0.875rem] text-[#B42318]"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {feedback.message}
                </motion.p>
              ) : null}
            </AnimatePresence>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-[0.8125rem] leading-relaxed text-ink-muted">{DELIVERY_NOTE[CONTACT_PROVIDER]}</p>

              <Button type="submit" size="lg" withArrow disabled={state === 'submitting'} className="shrink-0">
                {state === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Send message
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
