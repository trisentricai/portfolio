import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PageHeader } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { IndustryCard } from '@/components/cards/IndustryCard';
import { CTASection } from '@/components/sections/CTASection';
import { INDUSTRIES } from '@/data/industries';
import { getIcon } from '@/lib/icons';
import { usePageMeta, breadcrumbJsonLd, absoluteUrl } from '@/lib/seo';
import { EASE_PREMIUM } from '@/lib/motion';
import { IconPlate } from '@/components/ui/Card';

export default function Industries() {
  const [open, setOpen] = useState<string | null>(null);

  usePageMeta({
    title: 'Industries',
    description:
      'Sector-specific AI engineering for healthcare, finance, retail, manufacturing, logistics, education, SaaS and enterprise — built around the constraints each industry actually operates under.',
    path: '/industries',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Industries', path: '/industries' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Industries served',
        itemListElement: INDUSTRIES.map((industry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: industry.name,
          url: absoluteUrl(`/industries#${industry.slug}`),
        })),
      },
    ],
  });

  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="The same model behaves differently in every sector."
        lede="Regulation, data sensitivity, operational rhythm and the cost of a wrong decision all change the engineering. These are the sectors we know best — and the constraints we design for."
        aside={<IndustryAside />}
      />

      <section className="section bg-white">
        <div className="container-page">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Industries' }]} className="mb-10" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map((industry, index) => (
              <motion.div
                key={industry.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: EASE_PREMIUM }}
                className="h-full"
              >
                <IndustryCard industry={industry} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Deep dives: selectable sector detail ---- */}
      <section className="section bg-canvas">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2.5 font-mono text-eyebrow font-medium uppercase text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span className="h-px w-6 bg-brand/30" aria-hidden="true" />
              Sector deep dive
            </p>
            <h2 className="mt-6 text-balance font-display text-display-md">What changes in your sector.</h2>
            <p className="lede mt-5">
              Select an industry to see the applications we build most often, the constraints that shape the
              architecture, and the measures we would track.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <ul className="flex flex-col gap-1.5" role="tablist" aria-label="Industries" aria-orientation="vertical">
                {INDUSTRIES.map((industry) => {
                  const selected = open === industry.slug;
                  return (
                    <li key={industry.slug}>
                      <button
                        type="button"
                        role="tab"
                        id={`tab-${industry.slug}`}
                        aria-selected={selected}
                        aria-controls={`panel-${industry.slug}`}
                        onClick={() => setOpen(industry.slug)}
                        className={
                          selected
                            ? 'group/tab flex w-full items-center gap-3 rounded-xl border border-brand/30 bg-brand-50 px-4 py-3 text-left transition-all duration-200'
                            : 'group/tab flex w-full items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-left transition-all duration-200 hover:border-line hover:bg-white'
                        }
                      >
                        <span
                          className={
                            selected
                              ? 'h-1.5 w-1.5 shrink-0 rounded-full bg-accent'
                              : 'h-1.5 w-1.5 shrink-0 rounded-full bg-line group-hover/tab:bg-brand/40'
                          }
                          aria-hidden="true"
                        />
                        <span
                          className={
                            selected ? 'text-[0.9375rem] font-medium text-brand' : 'text-[0.9375rem] text-ink-soft'
                          }
                        >
                          {industry.name}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {open ? (
                  <IndustryPanel key={open} slug={open} />
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full min-h-[24rem] flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-white px-6 text-center"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <p className="mt-4 font-display text-[1.125rem] font-semibold tracking-[-0.02em]">
                      Select an industry
                    </p>
                    <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-ink-soft">
                      Pick a sector on the left to see its applications, constraints and measures.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Sector fit"
        title="Working in a sector not listed?"
        body="The engineering translates, but the constraints are specific. Tell us the industry and the regulatory or operational reality, and we will tell you what is feasible."
      />
    </>
  );
}

function IndustryPanel({ slug }: { slug: string }) {
  const industry = INDUSTRIES.find((item) => item.slug === slug);
  if (!industry) return null;
  const Icon = getIcon(industry.icon);

  return (
    <motion.div
      key={slug}
      id={`panel-${slug}`}
      role="tabpanel"
      aria-labelledby={`tab-${slug}`}
      tabIndex={0}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: EASE_PREMIUM }}
      className="h-full rounded-3xl border border-line bg-white p-6 sm:p-8 lg:p-10"
    >
      <div className="flex items-center gap-4">
        <IconPlate>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </IconPlate>
        <div>
          <h3 className="font-display text-[1.5rem] font-semibold tracking-[-0.02em]">{industry.name}</h3>
          <p className="text-[0.875rem] font-medium text-brand">{industry.tagline}</p>
        </div>
      </div>

      <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-soft">{industry.description}</p>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <h4 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">Typical applications</h4>
          <ul className="mt-3.5 space-y-2.5">
            {industry.applications.map((application) => (
              <li key={application} className="flex items-start gap-2.5 text-[0.875rem] leading-snug text-ink-soft">
                <span
                  className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/30 text-[#3F5D00]"
                  aria-hidden="true"
                >
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                {application}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">
            Constraints we design for
          </h4>
          <ul className="mt-3.5 space-y-2.5">
            {industry.considerations.map((consideration) => (
              <li key={consideration} className="flex items-start gap-2.5 text-[0.875rem] leading-snug text-ink-soft">
                <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-brand/50" aria-hidden="true" />
                {consideration}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-line pt-6">
        <h4 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">Measures we would track</h4>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {industry.metrics.map((metric) => (
            <span
              key={metric}
              className="rounded-lg border border-line bg-canvas px-2.5 py-1.5 font-mono text-[0.6875rem] text-ink-soft"
            >
              {metric}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function IndustryAside() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-card">
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-50" aria-hidden="true" />
      <div className="relative">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">Sectors we work in</p>
        <ul className="mt-5 grid grid-cols-2 gap-2">
          {INDUSTRIES.map((industry) => (
            <li
              key={industry.slug}
              className="rounded-lg border border-line bg-canvas px-3 py-2 text-[0.8125rem] text-ink-soft"
            >
              {industry.name}
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-ink-muted">
          Not listed? The engineering transfers — the regulatory and operational details are what we would need to
          learn.
        </p>
      </div>
    </div>
  );
}
