import { PageHeader } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Mail } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { ContactAlternatives } from '@/components/sections/CTASection';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { ENGAGEMENT_MODELS, CONTACT_OFFICES } from '@/data/site';
import { getIcon } from '@/lib/icons';
import { CONFIG } from '@/lib/config';
import { usePageMeta, breadcrumbJsonLd, organizationJsonLd, faqJsonLd, absoluteUrl } from '@/lib/seo';

const CONTACT_FAQS = [
  {
    question: 'What happens after I get in touch?',
    answer:
      'An engineer reads the enquiry and replies with a short response — usually questions about the problem, the data you have and the constraint that matters most. If there is a sensible fit, we suggest a short call. There is no obligation and no proposal template.',
  },
  {
    question: 'Do you work with early-stage companies?',
    answer:
      'Yes. A short paid assessment or proof of value is often the right first step — it establishes whether the data supports the idea before anyone commits to a build. If we are not the right fit, we will say so early and suggest who is.',
  },
  {
    question: 'Can you work with our existing data platform?',
    answer:
      'Usually. We integrate with the systems you already run rather than replacing them. Where the existing data layer cannot support what the model needs, we will tell you exactly what is missing and what the options are.',
  },
  {
    question: 'Do you sign NDAs?',
    answer:
      'Yes, and we are happy to. Send the agreement you would like us to sign and we will review it before any substantive conversation about your data.',
  },
  {
    question: 'How do you handle data privacy and security?',
    answer:
      'Data stays within the deployment boundary you specify. We design for least-privilege access, encryption in transit and at rest, audit logging, and documented retention. Model providers with no training-on-your-data terms are the default for any external API path.',
  },
  {
    question: 'Do you hand over the system at the end?',
    answer:
      'Yes. Documentation, runbooks, architecture records and team enablement are part of the deliverable. We do not build a proprietary layer you need us to maintain in order to keep running.',
  },
];

export default function Contact() {
  usePageMeta({
    title: 'Contact',
    description:
      'Start a conversation with Trisentri AI about an AI, automation or data engineering project. Every enquiry is read by an engineer on the team.',
    path: '/contact',
    jsonLd: [
      organizationJsonLd(),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]),
      faqJsonLd(CONTACT_FAQS),
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Trisentri AI',
        url: absoluteUrl('/contact'),
        mainEntity: {
          '@type': 'Organization',
          name: 'Trisentri AI',
          email: CONFIG.contactEmail,
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: CONFIG.contactEmail,
            availableLanguage: ['English'],
          },
        },
      },
    ],
  });

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let us start with the problem."
        lede="Tell us what you are trying to achieve and what is getting in the way. An engineer will reply — with questions, not a sales pitch."
        aside={<ContactAside />}
      />

      <section className="section bg-white">
        <div className="container-page">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} className="mb-10" />

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <aside className="lg:col-span-5">
              <div className="flex flex-col gap-5">
                <div className="rounded-3xl border border-line bg-canvas p-6">
                  <h2 className="font-display text-[1.25rem] font-semibold tracking-[-0.02em]">Direct contact</h2>
                  <ul className="mt-5 space-y-4">
                    <li className="flex items-start gap-3.5">
                      <span
                        className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand"
                        aria-hidden="true"
                      >
                        <Mail className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">Email</p>
                        <a
                          href={`mailto:${CONFIG.contactEmail}`}
                          className="mt-1 block truncate text-[0.9375rem] font-medium text-ink transition-colors hover:text-brand"
                        >
                          {CONFIG.contactEmail}
                        </a>
                        <p className="mt-0.5 text-[0.8125rem] text-ink-muted">
                          Prefer email? Use this address instead of the form.
                        </p>
                      </div>
                    </li>
                    {CONTACT_OFFICES.map((office) => {
                      const Icon = getIcon(office.icon);
                      return (
                        <li key={office.label} className="flex items-start gap-3.5">
                          <span
                            className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand"
                            aria-hidden="true"
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">
                              {office.label}
                            </p>
                            <p className="mt-1 text-[0.9375rem] font-medium text-ink">{office.value}</p>
                            <p className="mt-0.5 text-[0.8125rem] text-ink-muted">{office.detail}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="rounded-3xl border border-line bg-white p-6">
                  <h2 className="font-display text-[1.25rem] font-semibold tracking-[-0.02em]">How to scope a request</h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                    The most useful first message answers three things. Everything else we can work out together.
                  </p>
                  <ol className="mt-5 space-y-3">
                    {[
                      'The decision or process you want to improve.',
                      'What data exists today, and in what systems.',
                      'The constraint that matters most — accuracy, latency, cost, regulation or a fixed deadline.',
                    ].map((item, index) => (
                      <li key={item} className="flex items-start gap-3 text-[0.875rem] leading-relaxed text-ink-soft">
                        <span
                          className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 font-mono text-[0.625rem] font-medium text-brand numeric"
                          aria-hidden="true"
                        >
                          {index + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 border-t border-line pt-5">
                    <ContactAlternatives />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ---- Engagement models ---- */}
      <section className="section bg-canvas">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 className="text-balance font-display text-display-md">Ways to work together</h2>
            <p className="lede mt-5">
              Most engagements start small. These are the four shapes we work in, and roughly what each is for.
            </p>
          </div>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" as="ul">
            {ENGAGEMENT_MODELS.map((model) => {
              const Icon = getIcon(model.icon);
              return (
                <RevealItem key={model.title} as="li" className="h-full">
                  <div className="group/model flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand-200 hover:shadow-card">
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand transition-colors duration-300 group-hover/model:bg-brand group-hover/model:text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted">
                        {model.duration}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em]">
                      {model.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-[0.875rem] leading-relaxed text-ink-soft">{model.detail}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ---- FAQs ---- */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-balance font-display text-display-md">Before you write</h2>
              <p className="lede mt-5">
                The questions we are asked most often about working with us. If yours is not here, ask it in your
                message.
              </p>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <FaqAccordion items={CONTACT_FAQS} defaultOpen={0} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactAside() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-card">
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-50" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/[0.08] blur-2xl" aria-hidden="true" />
      <div className="relative">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">What to expect</p>
        <ol className="mt-5 space-y-4">
          {[
            { step: '01', title: 'An engineer replies', detail: 'A human response with questions about the problem — not a sales sequence.' },
            { step: '02', title: 'A short call', detail: 'Thirty minutes to understand the problem, the data and the constraints.' },
            { step: '03', title: 'A written recommendation', detail: 'Scope, approach, and an honest view of what is feasible.' },
          ].map((item) => (
            <li key={item.step} className="flex gap-4">
              <span className="font-mono text-[0.6875rem] text-brand numeric">{item.step}</span>
              <div>
                <p className="text-[0.9375rem] font-medium text-ink">{item.title}</p>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-soft">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-ink-muted">
          We never publish client names without written permission, and we do not use your enquiry as a case study
          without asking.
        </p>
      </div>
    </div>
  );
}
