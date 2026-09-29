import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { PageHeader } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CTASection } from '@/components/sections/CTASection';
import { getIcon } from '@/lib/icons';
import { ALL_TECHNOLOGIES, TECHNOLOGY_CATEGORIES } from '@/data/technologies';
import { usePageMeta, breadcrumbJsonLd, absoluteUrl } from '@/lib/seo';
import { EASE_PREMIUM } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { IconPlate } from '@/components/ui/Card';

export default function Technologies() {
  const [query, setQuery] = useState('');

  usePageMeta({
    title: 'Technologies',
    description:
      'The Trisentric AI technology ecosystem — machine learning, generative AI, computer vision, data engineering, cloud and software engineering, with the tools behind each capability.',
    path: '/technologies',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Technologies', path: '/technologies' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Technology ecosystem',
        itemListElement: TECHNOLOGY_CATEGORIES.map((category, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: category.title,
          url: absoluteUrl(`/technologies#${category.id}`),
        })),
      },
    ],
  });

  const term = query.trim().toLowerCase();

  const visible = useMemo(
    () =>
      TECHNOLOGY_CATEGORIES.map((category) => {
        if (!term) return category;
        const groups = category.groups
          .map((group) => ({
            ...group,
            items: group.items.filter((item) => item.toLowerCase().includes(term)),
          }))
          .filter((group) => group.items.length > 0);
        return { ...category, groups };
      }).filter((category) => !term || category.groups.length > 0),
    [term],
  );

  return (
    <>
      <PageHeader
        eyebrow="Technologies"
        title="The engineering substrate behind every solution."
        lede="Eight capability areas, one coherent stack. We pick tools for maintainability after handover rather than novelty at launch — and we document every choice."
        aside={<StackSummary />}
      />

      {/* ---- Search across the whole ecosystem ---- */}
      <section className="section-tight bg-white">
        <div className="container-page">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Technologies' }]} className="mb-8" />

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <label htmlFor="tech-search" className="sr-only">
                Search technologies
              </label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
                aria-hidden="true"
              />
              <input
                id="tech-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the stack — e.g. PyTorch"
                className="h-11 w-full rounded-full border border-line bg-white pl-11 pr-10 text-[0.9375rem] text-ink placeholder:text-ink-muted transition-colors duration-200 hover:border-brand-200 focus:border-brand focus:outline-none focus-visible:outline-brand"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-brand"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted numeric" role="status" aria-live="polite">
              {term
                ? `${ALL_TECHNOLOGIES.filter((item) => item.toLowerCase().includes(term)).length} matching of ${ALL_TECHNOLOGIES.length}`
                : `${ALL_TECHNOLOGIES.length} technologies · ${TECHNOLOGY_CATEGORIES.length} areas`}
            </p>
          </div>
        </div>
      </section>

      {/* ---- Categories ---- */}
      <section className="section bg-canvas">
        <div className="container-page">
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {visible.map((category, index) => {
                const Icon = getIcon(category.icon);
                return (
                  <motion.article
                    key={category.id}
                    id={category.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: EASE_PREMIUM }}
                    className="scroll-mt-32 overflow-hidden rounded-3xl border border-line bg-white"
                  >
                    <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:p-10">
                      <div className="lg:col-span-4">
                        <div className="flex items-center gap-4">
                          <IconPlate>
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </IconPlate>
                          <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted numeric">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <h2 className="mt-6 font-display text-[1.625rem] font-semibold leading-tight tracking-[-0.025em] sm:text-[1.875rem]">
                          {category.title}
                        </h2>
                        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">{category.description}</p>
                      </div>

                      <div className="lg:col-span-8">
                        <div className="grid gap-7 sm:grid-cols-2">
                          {category.groups.map((group) => (
                            <div key={group.title}>
                              <h3 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">
                                {group.title}
                              </h3>
                              <ul className="mt-3.5 flex flex-wrap gap-1.5">
                                {group.items.map((item) => (
                                  <li
                                    key={item}
                                    className="rounded-lg border border-line bg-canvas px-2.5 py-1.5 font-mono text-[0.6875rem] text-ink-soft transition-colors duration-200 hover:border-brand-200 hover:bg-brand-50 hover:text-brand"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          {visible.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center">
              <h3 className="font-display text-[1.25rem] font-semibold">No technology matches “{query}”</h3>
              <p className="mx-auto mt-2 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
                We work with a wider set of tools than we list here. Tell us what you need and we will tell you
                honestly whether it is the right choice.
              </p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mt-6 inline-flex h-10 items-center rounded-full border border-line bg-white px-5 text-[0.875rem] font-medium transition-colors hover:border-brand hover:text-brand"
              >
                Clear search
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <CTASection
        eyebrow="Not sure what fits?"
        title="Tell us the problem, not the stack."
        body="The right technology depends on your data, your constraints and who has to maintain it. We will recommend accordingly — including telling you when something simpler is better."
      />
    </>
  );
}

function StackSummary() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-card">
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-50" aria-hidden="true" />
      <div className="relative">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">At a glance</p>
        <dl className="mt-5 space-y-3">
          {[
            { label: 'Capability areas', value: String(TECHNOLOGY_CATEGORIES.length) },
            { label: 'Named technologies', value: String(ALL_TECHNOLOGIES.length) },
            { label: 'Deployment targets', value: 'Cloud & on-premise' },
          ].map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-0">
              <dt className="text-[0.8125rem] text-ink-muted">{row.label}</dt>
              <dd className={cn('font-display text-[1.125rem] font-semibold text-ink')}>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
