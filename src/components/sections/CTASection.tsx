import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Badge';
import { EASE_PREMIUM } from '@/lib/motion';
import { cn } from '@/lib/cn';

export interface CTASectionProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  className?: string;
}

const DEFAULTS: Required<Omit<CTASectionProps, 'className'>> = {
  eyebrow: 'Start a project',
  title: 'Have an idea worth engineering?',
  body: 'Tell us what you are building. We will help turn the idea into a scalable technology solution — starting with a conversation, not a proposal template.',
  primaryLabel: 'Start a Project',
  primaryTo: '/contact',
  secondaryLabel: 'Explore solutions',
  secondaryTo: '/solutions',
};

export function CTASection({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  body = DEFAULTS.body,
  primaryLabel = DEFAULTS.primaryLabel,
  primaryTo = DEFAULTS.primaryTo,
  secondaryLabel = DEFAULTS.secondaryLabel,
  secondaryTo = DEFAULTS.secondaryTo,
  className,
}: CTASectionProps) {
  const reduce = useReducedMotion();

  return (
    <section className={cn('relative overflow-hidden bg-white', className)}>
      <div className="container-page py-20 sm:py-24 lg:py-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: EASE_PREMIUM }}
          className="relative overflow-hidden rounded-3xl border border-line bg-canvas px-6 py-14 sm:px-12 sm:py-16 lg:px-16"
        >
          {/* Layered background: grid, blue bloom, lime spark */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-grid-lines opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.06] via-transparent to-transparent" />
            <div className="blob -right-16 -top-24 h-[24rem] w-[24rem] bg-brand/[0.12]" />
            <div className="blob -bottom-24 -left-10 h-[18rem] w-[18rem] bg-accent/[0.09]" />
            <div className="absolute right-10 top-10 h-2 w-2 rounded-full bg-accent" />
            <div className="absolute right-20 top-24 h-1.5 w-1.5 rounded-full bg-brand/40" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>

            <h2 className="mt-7 text-balance font-display text-display-md">{title}</h2>

            <p className="mx-auto mt-5 max-w-xl text-body-lg text-ink-soft">{body}</p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink to={primaryTo} size="lg" withArrow>
                {primaryLabel}
              </ButtonLink>
              <ButtonLink to={secondaryTo} size="lg" variant="secondary">
                {secondaryLabel}
              </ButtonLink>
            </div>

            <p className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted">
              <span>Every enquiry read by an engineer</span>
              <span className="hidden h-1 w-1 rounded-full bg-accent sm:block" aria-hidden="true" />
              <span>No sales sequence, no obligation</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Slim inline CTA used at the end of articles and detail pages. */
export function InlineCTA({ title, body }: { title: string; body: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-canvas p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-dots opacity-50" />
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand/[0.09] blur-2xl" />
      </div>
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-lg">
          <h2 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em]">{title}</h2>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{body}</p>
        </div>
        <ButtonLink to="/contact" withArrow className="shrink-0 self-start sm:self-auto">
          Start a Project
        </ButtonLink>
      </div>
    </div>
  );
}

/** Quiet "next step" strip used under the contact form. */
export function ContactAlternatives() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <Link
        to="/solutions"
        className="group/alt inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-ink-soft transition-colors hover:text-brand"
      >
        <span className="link-sweep">Browse solutions</span>
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover/alt:-translate-y-0.5 group-hover/alt:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
      <Link
        to="/case-studies"
        className="group/alt inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-ink-soft transition-colors hover:text-brand"
      >
        <span className="link-sweep">Read case studies</span>
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover/alt:-translate-y-0.5 group-hover/alt:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
