import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { PageHeader } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SolutionPipeline, CheckList } from '@/components/sections/SolutionPipeline';
import { CTASection } from '@/components/sections/CTASection';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { SolutionCard } from '@/components/cards/SolutionCard';
import { getSolution, SOLUTIONS } from '@/data/solutions';
import { getIcon } from '@/lib/icons';
import { usePageMeta, absoluteUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import NotFound from '@/pages/NotFound';
import { IconPlate } from '@/components/ui/Card';

export default function SolutionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const solution = getSolution(slug);

  const related = SOLUTIONS.filter((item) => item.slug !== slug)
    .sort((a, b) => {
      const aOverlap = a.technologies.filter((tech) => solution?.technologies.includes(tech)).length;
      const bOverlap = b.technologies.filter((tech) => solution?.technologies.includes(tech)).length;
      return bOverlap - aOverlap;
    })
    .slice(0, 2);

  usePageMeta({
    title: solution ? `${solution.title} — AI Engineering` : 'Solution not found',
    description: solution?.summary ?? 'This solution page could not be found.',
    path: solution ? `/solutions/${solution.slug}` : undefined,
    noIndex: !solution,
    jsonLd: solution
      ? [
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Solutions', path: '/solutions' },
            { name: solution.title, path: `/solutions/${solution.slug}` },
          ]),
          faqJsonLd(solution.faqs),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: solution.title,
            serviceType: solution.title,
            description: solution.description,
            url: absoluteUrl(`/solutions/${solution.slug}`),
            provider: { '@type': 'Organization', name: 'Trisentri AI', url: absoluteUrl('/') },
            areaServed: 'Worldwide',
          },
        ]
      : undefined,
  });

  if (!solution) return <NotFound />;

  const Icon = getIcon(solution.icon);
  const titleId = 'solution-title';

  return (
    <>
      <PageHeader
        eyebrow={`${solution.shortTitle} · ${solution.index}`}
        title={solution.title}
        lede={solution.description}
        aside={<SolutionAside technologies={solution.technologies} icon={<Icon className="h-5 w-5" aria-hidden="true" />} />}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/contact"
            className="group/h inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-brand-700"
          >
            Discuss this solution
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover/h:-translate-y-0.5 group-hover/h:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <Link
            to="/solutions"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-white px-5 text-[0.9375rem] font-medium text-ink transition-colors hover:border-brand hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All solutions
          </Link>
        </div>
      </PageHeader>

      {/* ---- Anchor navigation ---- */}
      <div className="sticky top-[4.5rem] z-30 border-y border-line bg-white/85 backdrop-blur-xl">
        <div className="container-page">
          <nav aria-label="Page sections" className="flex items-center gap-1 overflow-x-auto py-2.5">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'capabilities', label: 'Capabilities' },
              { id: 'process', label: 'How it works' },
              { id: 'use-cases', label: 'Use cases' },
              { id: 'outcomes', label: 'Outcomes' },
              { id: 'faqs', label: 'FAQs' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 rounded-full px-3.5 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted transition-colors duration-200 hover:bg-brand-50 hover:text-brand focus-visible:outline-brand"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ---- Overview ---- */}
      <section id="overview" className="section scroll-mt-32 bg-white">
        <div className="container-page">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Solutions', to: '/solutions' },
              { label: solution.shortTitle },
            ]}
            className="mb-12"
          />

          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 id={titleId} className="font-display text-[1.75rem] font-semibold tracking-[-0.025em] sm:text-[2rem]">
                  Where this applies
                </h2>
                <div className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                  <p className="text-lg leading-relaxed text-ink">{solution.summary}</p>
                  <p>
                    We start by establishing the baseline this system has to beat, the data it can rely on today, and
                    the failure modes that matter operationally. Only then do we design the model and the interface
                    around it.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-line bg-canvas p-6">
                  <h3 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">
                    Representative technology
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {solution.technologies.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-lg border border-line bg-white px-2.5 py-1 font-mono text-[0.6875rem] text-ink-soft"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Capabilities ---- */}
      <section id="capabilities" className="section scroll-mt-32 bg-canvas">
        <div className="container-page">
          <h2 className="text-balance font-display text-display-md">What we build</h2>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" as="ul">
            {solution.capabilities.map((capability, index) => {
              const CapabilityIcon = getIcon(capability.icon);
              return (
                <RevealItem key={capability.title} as="li" className="h-full">
                  <div className="group/cap flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand-200 hover:shadow-card">
                    <div className="flex items-center justify-between">
                      <IconPlate>
                        <CapabilityIcon className="h-5 w-5" aria-hidden="true" />
                      </IconPlate>
                      <span className="font-mono text-[0.625rem] text-ink-muted numeric">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-[1.125rem] font-semibold tracking-[-0.015em]">
                      {capability.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">{capability.detail}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ---- Pipeline ---- */}
      <section id="process" className="section scroll-mt-32 bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-balance font-display text-display-md">How the work runs</h2>
              <p className="lede mt-5">
                Each stage produces something reviewable, so scope and risk stay visible for the whole engagement.
              </p>
            </div>
            <div className="lg:col-span-8">
              <SolutionPipeline stages={solution.pipeline} title="Delivery stages" />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Use cases + outcomes ---- */}
      <section id="use-cases" className="section scroll-mt-32 bg-canvas">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-[1.75rem] font-semibold tracking-[-0.025em] sm:text-[2rem]">
                Common use cases
              </h2>
              <ul className="mt-7 space-y-3">
                {solution.useCases.map((useCase) => (
                  <li
                    key={useCase}
                    className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3.5 text-[0.9375rem] text-ink-soft"
                  >
                    <span
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/30 text-[#3F5D00]"
                      aria-hidden="true"
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>

            <div id="outcomes" className="scroll-mt-32">
              <h2 className="font-display text-[1.75rem] font-semibold tracking-[-0.025em] sm:text-[2rem]">
                What good looks like
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                Outcomes we hold ourselves to. Specific numbers are agreed at discovery against your own baseline —
                we do not publish figures we have not measured.
              </p>
              <div className="mt-7">
                <CheckList items={solution.outcomes} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQs ---- */}
      <section id="faqs" className="section scroll-mt-32 bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-balance font-display text-display-md">Questions we get asked</h2>
              <p className="lede mt-5">
                If your question is not here, ask it directly — we answer scoping questions without an obligation.
              </p>
              <Link
                to="/contact"
                className="group/q inline-flex items-center gap-2 text-[0.9375rem] font-medium text-brand transition-colors hover:text-brand-700"
              >
                <span className="link-sweep">Ask a question</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover/q:-translate-y-0.5 group-hover/q:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordion items={solution.faqs} defaultOpen={0} />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Related ---- */}
      {related.length ? (
        <section className="section bg-canvas">
          <div className="container-page">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-display-md">Related solutions</h2>
              <Link
                to="/solutions"
                className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-brand"
              >
                View all
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {related.map((item) => (
                <SolutionCard key={item.slug} solution={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        eyebrow="Next step"
        title={`Ready to explore ${solution.shortTitle.toLowerCase()}?`}
        body="Bring the problem, not a finished brief. We will help you scope what is realistic, what is not, and what the first iteration should look like."
      />
    </>
  );
}

function SolutionAside({ technologies, icon }: { technologies: string[]; icon: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-card">
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-50" aria-hidden="true" />
      <div className="relative">
        <IconPlate>{icon}</IconPlate>
        <p className="mt-6 font-display text-[1.25rem] font-semibold tracking-[-0.02em]">
          Delivered as a system, not a demo.
        </p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
          Evaluation, monitoring, documentation and handover are part of the scope from the first sprint.
        </p>
        <div className="mt-6 border-t border-line pt-5">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">Built with</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-lg border border-line bg-canvas px-2.5 py-1 font-mono text-[0.6875rem] text-ink-soft"
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
