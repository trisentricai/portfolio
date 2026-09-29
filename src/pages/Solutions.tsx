import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';
import { FilterBar, EmptyState, type FilterOption } from '@/components/ui/FilterBar';
import { SolutionCard } from '@/components/cards/SolutionCard';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CTASection } from '@/components/sections/CTASection';
import { SolutionPipeline } from '@/components/sections/SolutionPipeline';
import { SOLUTIONS } from '@/data/solutions';
import { CAPABILITIES } from '@/data/site';
import { usePageMeta, breadcrumbJsonLd, organizationJsonLd, absoluteUrl } from '@/lib/seo';
import { EASE_PREMIUM } from '@/lib/motion';
import { IconPlate } from '@/components/ui/Card';
import { getIcon } from '@/lib/icons';
import { ArrowCircle } from '@/components/ui/ArrowButton';
import { Link } from 'react-router-dom';

export default function Solutions() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  usePageMeta({
    title: 'AI Solutions & Services',
    description:
      'Explore Trisentric AI solutions: machine learning, generative AI, computer vision, intelligent automation, data analytics, AI agents and custom AI engineering.',
    path: '/solutions',
    jsonLd: [
      organizationJsonLd(),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Solutions', path: '/solutions' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Trisentric AI solutions',
        itemListElement: SOLUTIONS.map((solution, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: solution.title,
          url: absoluteUrl(`/solutions/${solution.slug}`),
        })),
      },
    ],
  });

  const filterOptions = useMemo<FilterOption[]>(
    () => [
      { value: 'all', label: 'All', count: SOLUTIONS.length },
      ...SOLUTIONS.map((solution) => ({
        value: solution.shortTitle,
        label: solution.shortTitle,
        count: SOLUTIONS.filter((entry) => entry.shortTitle === solution.shortTitle).length,
      })),
    ],
    [],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return SOLUTIONS.filter((solution) => {
      const matchesFilter = filter === 'all' || solution.shortTitle === filter;
      const matchesQuery =
        !term ||
        [solution.title, solution.shortTitle, solution.summary, solution.description, ...solution.useCases]
          .join(' ')
          .toLowerCase()
          .includes(term);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Engineering solutions for ambitious AI problems."
        lede="From a single capability to a full production platform — our practices cover the complete path from research through deployment, monitoring and handover."
        aside={<CapabilityOrbit />}
      >
        <div className="flex flex-wrap items-center gap-3">
          {SOLUTIONS.map((solution) => (
            <a
              key={solution.slug}
              href={`#${solution.slug}`}
              className="inline-flex h-9 items-center rounded-full border border-line bg-white px-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft transition-colors duration-200 hover:border-brand hover:text-brand focus-visible:outline-brand"
            >
              {solution.shortTitle}
            </a>
          ))}
        </div>
      </PageHeader>

      <section className="section bg-white" id="all-solutions">
        <div className="container-page">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Solutions' }]} className="mb-10" />

          <div className="flex flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-[1.5rem] font-semibold tracking-[-0.02em]">All solutions</h2>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted numeric">
              {filtered.length} of {SOLUTIONS.length}
            </p>
          </div>

          <FilterBar
            className="mt-8"
            query={query}
            onQueryChange={setQuery}
            options={filterOptions}
            value={filter}
            onValueChange={setFilter}
            searchLabel="Search solutions"
            searchPlaceholder="Search solutions, use cases, capabilities"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((solution, index) => (
                <motion.div
                  key={solution.slug}
                  id={solution.slug}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.24), ease: EASE_PREMIUM }}
                  className="scroll-mt-28"
                >
                  <SolutionCard solution={solution} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              className="mt-10"
              title="No solutions match your search"
              body="Try a different term, or get in touch and describe the problem directly — we can usually point you to the right practice area."
              onReset={() => {
                setQuery('');
                setFilter('all');
              }}
            />
          ) : null}
        </div>
      </section>

      <section className="section bg-canvas">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-balance font-display text-display-md">How an engagement runs.</h2>
              <p className="lede mt-5">
                Every solution is delivered through the same five-stage process, so scope, risk and quality gates are
                clear from week one.
              </p>
              <Reveal delay={0.1} className="mt-8">
                <Link
                  to="/contact"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-brand-700"
                >
                  Discuss your project
                </Link>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <SolutionPipeline stages={SOLUTIONS[0]?.pipeline ?? []} />
            </div>
          </div>
        </div>
      </section>

      <ProcessSection />
      <CTASection />
    </>
  );
}

/** Decorative capability cluster shown in the page header aside. */
function CapabilityOrbit() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-card">
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-50" aria-hidden="true" />
      <div className="relative">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">
          Practice areas
        </p>
        <ul className="mt-5 grid grid-cols-2 gap-2.5">
          {CAPABILITIES.slice(0, 6).map((capability) => {
            const Icon = getIcon(capability.icon);
            return (
              <li
                key={capability.name}
                className="flex items-center gap-2.5 rounded-xl border border-line bg-canvas px-3 py-2.5"
              >
                <IconPlate className="h-8 w-8 rounded-lg">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </IconPlate>
                <span className="min-w-0 text-[0.75rem] font-medium leading-tight text-ink">{capability.name}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted numeric">
            {SOLUTIONS.length} solution areas
          </span>
          <ArrowCircle to="/technologies" label="View technologies" />
        </div>
      </div>
    </div>
  );
}
