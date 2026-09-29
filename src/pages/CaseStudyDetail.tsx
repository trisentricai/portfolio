import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';
import { CaseStudyCard } from '@/components/cards/CaseStudyCard';
import { CTASection } from '@/components/sections/CTASection';
import { Disclosure, PlaceholderVisual } from '@/components/ui/Disclosure';
import { Badge } from '@/components/ui/Badge';
import { getCaseStudy, getRelatedCaseStudies } from '@/data/caseStudies';
import { usePageMeta, absoluteUrl, breadcrumbJsonLd, organizationJsonLd } from '@/lib/seo';
import { EASE_PREMIUM } from '@/lib/motion';
import NotFound from '@/pages/NotFound';
import { cn } from '@/lib/cn';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const study = getCaseStudy(slug);
  const related = getRelatedCaseStudies(study?.relatedSlugs ?? []);

  usePageMeta({
    title: study ? `${study.title} — Case Study` : 'Case study not found',
    description: study?.summary ?? 'This case study could not be found.',
    path: study ? `/case-studies/${study.slug}` : undefined,
    noIndex: !study,
    jsonLd: study
      ? [
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Case Studies', path: '/case-studies' },
            { name: study.title, path: `/case-studies/${study.slug}` },
          ]),
          organizationJsonLd(),
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: study.title,
            description: study.summary,
            url: absoluteUrl(`/case-studies/${study.slug}`),
            datePublished: `${study.year}-01-01`,
            author: { '@type': 'Organization', name: 'Trisentric AI' },
            isAccessibleForFree: true,
          },
        ]
      : undefined,
  });

  if (!study) return <NotFound />;

  return (
    <>
      <PageHeader
        eyebrow={`${study.industry} · ${study.archetype}`}
        title={study.title}
        lede={study.overview}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="warn">Illustrative engagement</Badge>
          <Badge tone="outline">{study.duration}</Badge>
          <Badge tone="outline">Team of {study.team}</Badge>
        </div>
      </PageHeader>

      <section className="section bg-white">
        <div className="container-page">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Case Studies', to: '/case-studies' },
              { label: study.archetype },
            ]}
            className="mb-10"
          />

          <Disclosure title="This is not a client record" tone="warn">
            Trisentric AI has not published named client engagements. This write-up documents how we would approach a
            problem of this shape: the challenge framing, the architecture, the technology choices and the measures we
            would agree to track at discovery. The figures below are targets, not achieved results.
          </Disclosure>

          {/* ---- Meta strip ---- */}
          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Sector', value: study.industry },
              { label: 'Engagement type', value: study.archetype },
              { label: 'Duration', value: study.duration },
              { label: 'Team', value: study.team },
            ].map((item) => (
              <div key={item.label} className="bg-white p-5">
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">{item.label}</dt>
                <dd className="mt-2 text-[0.9375rem] font-medium text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>

          {/* ---- Challenge ---- */}
          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="font-display text-[1.75rem] font-semibold tracking-[-0.025em] sm:text-[2rem]">The challenge</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-4">
                {study.challenge.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="leading-relaxed text-ink-soft">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Approach ---- */}
      <section className="section bg-canvas">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 className="text-balance font-display text-display-md">Our approach</h2>
            <p className="lede mt-5">
              The work is organised around de-risking: understand the decisions, define how quality is measured, then
              build a slice that runs end to end before anything is polished.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {study.approach.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06} y={18}>
                <div className="group/approach h-full rounded-2xl border border-line bg-white p-6 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand-200 hover:shadow-card">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-[1.125rem] font-semibold tracking-[-0.015em]">{item.title}</h3>
                    <span className="font-mono text-[0.625rem] text-ink-muted numeric">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Architecture ---- */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 className="text-balance font-display text-display-md">Architecture</h2>
            <p className="lede mt-5">
              Layered so that each part can be replaced independently — models change far more often than the data
              contracts or the interfaces around them.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {study.architecture.map((layer, index) => (
              <motion.div
                key={layer.layer}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3), ease: EASE_PREMIUM }}
                className={cn(
                  'group/layer grid gap-5 rounded-2xl border border-line bg-canvas p-6 transition-all duration-300 ease-premium hover:border-brand-200 hover:bg-white hover:shadow-card lg:grid-cols-12',
                )}
              >
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <h3 className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em]">{layer.layer}</h3>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <ul className="flex flex-wrap gap-1.5">
                    {layer.components.map((component) => (
                      <li
                        key={component}
                        className="rounded-lg border border-line bg-white px-2.5 py-1.5 font-mono text-[0.6875rem] text-ink-soft"
                      >
                        {component}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-[0.875rem] leading-relaxed text-ink-soft">{layer.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">Technology</h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {study.technology.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-line bg-canvas px-3 py-1.5 font-mono text-[0.6875rem] text-ink-soft transition-colors duration-200 hover:border-brand-200 hover:bg-brand-50 hover:text-brand"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- Results / targets ---- */}
      <section className="section bg-canvas">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 className="text-balance font-display text-display-md">What success would look like</h2>
            <p className="lede mt-5">
              These are the measures we would agree to track at discovery, against a baseline captured in week one. We
              publish no achieved numbers until they are measured and cleared.
            </p>
          </div>

          <dl className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {study.results.map((metric, index) => (
              <Reveal key={metric.label} delay={index * 0.06} y={18}>
                <div className="h-full rounded-2xl border border-line bg-white p-6">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">{metric.label}</dt>
                  <dd className="mt-4 font-display text-[2rem] font-semibold leading-none tracking-[-0.03em] text-brand numeric">
                    {metric.value}
                  </dd>
                  <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-soft">{metric.note}</p>
                </div>
              </Reveal>
            ))}
          </dl>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {study.visuals.map((visual, index) => (
              <Reveal key={visual.caption} delay={index * 0.08} y={18}>
                <figure className="h-full">
                  <PlaceholderVisual label={`${visual.kind} — ${visual.caption}`} ratio="aspect-[16/10]" />
                  <figcaption className="mt-3 text-[0.8125rem] text-ink-muted">{visual.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Related ---- */}
      {related.length ? (
        <section className="section bg-white">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-display-md">Related work</h2>
              <Link
                to="/case-studies"
                className="group/all inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-brand"
              >
                <span>All case studies</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <CaseStudyCard key={item.slug} study={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-tight bg-white">
        <div className="container-page">
          <Link
            to="/case-studies"
            className="group/back inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink-soft transition-colors hover:text-brand"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-200 group-hover/back:-translate-x-1"
              aria-hidden="true"
            />
            Back to all case studies
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
