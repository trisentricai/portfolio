import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CaseStudyCard } from '@/components/cards/CaseStudyCard';
import { CTASection } from '@/components/sections/CTASection';
import { EmptyState, FilterBar, type FilterOption } from '@/components/ui/FilterBar';
import { Disclosure } from '@/components/ui/Disclosure';
import { CASE_STUDIES } from '@/data/caseStudies';
import { breadcrumbJsonLd, absoluteUrl, usePageMeta } from '@/lib/seo';
import { EASE_PREMIUM } from '@/lib/motion';

export default function CaseStudies() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  usePageMeta({
    title: 'Case Studies',
    description:
      'Structured AI engineering engagements — the problem, the constraints, the architecture and the decisions. Published as illustrative work, not client claims.',
    path: '/case-studies',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Case Studies', path: '/case-studies' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Case studies',
        itemListElement: CASE_STUDIES.map((study, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: study.title,
          url: absoluteUrl(`/case-studies/${study.slug}`),
        })),
      },
    ],
  });

  const options = useMemo<FilterOption[]>(() => {
    const counts = new Map<string, number>();
    CASE_STUDIES.forEach((study) => counts.set(study.industry, (counts.get(study.industry) ?? 0) + 1));
    return [
      { value: 'all', label: 'All', count: CASE_STUDIES.length },
      ...Array.from(counts.entries()).map(([industry, count]) => ({ value: industry, label: industry, count })),
    ];
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return CASE_STUDIES.filter((study) => {
      const matchesFilter = filter === 'all' || study.industry === filter;
      const matchesQuery =
        !term ||
        [study.title, study.summary, study.industry, study.archetype, ...study.technology]
          .join(' ')
          .toLowerCase()
          .includes(term);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="How the work actually gets done."
        lede="Every engagement follows the same discipline: define the baseline, design the failure path, ship a working slice, then harden. These write-ups show that process applied to real problem shapes."
        aside={<CaseStudyAside />}
      />

      <section className="section bg-white">
        <div className="container-page">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Case Studies' }]} className="mb-10" />

          <Disclosure title="Illustrative engagements — not client records" tone="warn">
            These case studies describe Trisentric AI's approach and architecture using realistic problem shapes. They
            are placeholders: no client is named, no engagement is claimed, and the figures shown are targets agreed at
            discovery rather than measured results. Nothing here should be read as a testimonial or a performance claim.
          </Disclosure>

          <FilterBar
            className="mt-10"
            query={query}
            onQueryChange={setQuery}
            options={options}
            value={filter}
            onValueChange={setFilter}
            searchLabel="Search case studies"
            searchPlaceholder="Search by problem, sector or technology"
          />

          <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted numeric" role="status" aria-live="polite">
            Showing {filtered.length} of {CASE_STUDIES.length}
          </p>

          {filtered.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((study, index) => (
                  <motion.div
                    key={study.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.24), ease: EASE_PREMIUM }}
                    className="h-full"
                  >
                    <CaseStudyCard study={study} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <EmptyState
              className="mt-8"
              title="No case studies match those filters"
              body="Try a broader search term, or reset the filters to see all illustrative engagements."
              onReset={() => {
                setQuery('');
                setFilter('all');
              }}
            />
          )}
        </div>
      </section>

      <CTASection
        eyebrow="Your project"
        title="The next one could be yours."
        body="If your problem resembles any of these, the fastest way forward is a short conversation about what data you have and what decision you need to improve."
      />
    </>
  );
}

function CaseStudyAside() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-card">
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-50" aria-hidden="true" />
      <div className="relative">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">Coverage</p>
        <dl className="mt-5 space-y-3">
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
            <dt className="text-[0.8125rem] text-ink-muted">Engagements documented</dt>
            <dd className="font-display text-[1.125rem] font-semibold numeric">{CASE_STUDIES.length}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
            <dt className="text-[0.8125rem] text-ink-muted">Sectors covered</dt>
            <dd className="font-display text-[1.125rem] font-semibold numeric">
              {new Set(CASE_STUDIES.map((study) => study.industry)).size}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-[0.8125rem] text-ink-muted">Client names published</dt>
            <dd className="font-display text-[1.125rem] font-semibold">0</dd>
          </div>
        </dl>
        <p className="mt-5 border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-ink-muted">
          Client identities are only published with explicit written permission — we do not imply relationships that do
          not exist.
        </p>
      </div>
    </div>
  );
}
