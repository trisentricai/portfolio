import { Mail, Users, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CTASection } from '@/components/sections/CTASection';
import { CapabilityGrid } from '@/components/sections/CapabilityGrid';
import { IconPlate } from '@/components/ui/Card';
import { getIcon } from '@/lib/icons';
import { CONFIG } from '@/lib/config';
import { COMPANY, CONTACT_OFFICES } from '@/data/site';
import { usePageMeta, breadcrumbJsonLd, organizationJsonLd, absoluteUrl } from '@/lib/seo';

export default function Company() {
  usePageMeta({
    title: 'Company',
    description:
      'Trisentri AI is an engineering company focused on artificial intelligence, automation and data systems — our mission, engineering philosophy, values, culture and team structure.',
    path: '/company',
    jsonLd: [
      organizationJsonLd(),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Company', path: '/company' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Trisentri AI',
        url: absoluteUrl('/company'),
        mainEntity: { '@type': 'Organization', name: 'Trisentri AI', url: absoluteUrl('/') },
      },
    ],
  });

  return (
    <>
      <PageHeader eyebrow={COMPANY.hero.eyebrow} title={COMPANY.hero.heading} lede={COMPANY.hero.lede} aside={<MissionAside />} />

      {/* ---- Mission / vision ---- */}
      <section className="section bg-white">
        <div className="container-page">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Company' }]} className="mb-12" />

          <div className="grid gap-6 lg:grid-cols-2">
            {[
              { ...COMPANY.mission, tone: 'brand' as const, icon: 'Target' },
              { ...COMPANY.vision, tone: 'lime' as const, icon: 'Radar' },
            ].map((block, index) => (
              <Reveal key={block.title} delay={index * 0.08} y={20}>
                <div
                  className={
                    block.tone === 'brand'
                      ? 'relative h-full overflow-hidden rounded-3xl border border-brand-100 bg-brand-50/50 p-7 sm:p-9'
                      : 'relative h-full overflow-hidden rounded-3xl border border-accent/40 bg-accent/[0.07] p-7 sm:p-9'
                  }
                >
                  <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-40" aria-hidden="true" />
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <IconPlate tone={block.tone === 'brand' ? 'brand' : 'lime'}>
                        <MilestoneIcon name={block.icon} />
                      </IconPlate>
                      <h2 className="font-display text-[1.5rem] font-semibold tracking-[-0.02em]">{block.title}</h2>
                    </div>
                    <p className="mt-5 leading-relaxed text-ink-soft">{block.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Philosophy ---- */}
      <section className="section bg-canvas">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="text-balance font-display text-display-md">{COMPANY.philosophy.title}</h2>
              <p className="mt-6 leading-relaxed text-ink-soft">{COMPANY.philosophy.body}</p>
            </div>

            <div className="lg:col-span-7">
              <RevealGroup className="grid gap-4 sm:grid-cols-2" as="ul">
                {COMPANY.philosophy.points.map((point, index) => (
                  <RevealItem key={point.title} as="li" className="h-full">
                    <div className="group/point h-full rounded-2xl border border-line bg-white p-6 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand-200 hover:shadow-card">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em]">{point.title}</h3>
                        <span className="font-mono text-[0.625rem] text-ink-muted numeric">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-soft">{point.detail}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Values ---- */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 className="text-balance font-display text-display-md">What we hold to</h2>
            <p className="lede mt-5">
              Six commitments that decide how we build, how we review each other&rsquo;s work, and what we decline to
              ship.
            </p>
          </div>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" as="ul">
            {COMPANY.values.map((value, index) => {
              const Icon = getIcon(value.icon);
              return (
                <RevealItem key={value.title} as="li" className="h-full">
                  <div className="group/value relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-canvas p-6 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-card">
                    <div className="flex items-start justify-between gap-4">
                      <IconPlate>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </IconPlate>
                      <span className="font-mono text-[0.625rem] text-ink-muted numeric">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-[1.125rem] font-semibold tracking-[-0.015em]">
                      {value.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">{value.detail}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ---- Capabilities recap ---- */}
      <CapabilityGrid />

      {/* ---- Culture ---- */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="text-balance font-display text-display-md">{COMPANY.culture.title}</h2>
              <p className="mt-6 leading-relaxed text-ink-soft">{COMPANY.culture.body}</p>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-3">
                {COMPANY.culture.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-xl border border-line bg-canvas px-5 py-4 text-[0.9375rem] leading-relaxed text-ink-soft"
                  >
                    <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ProcessSection />

      {/* ---- Team ---- */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 className="text-balance font-display text-display-md">{COMPANY.team.title}</h2>
            <p className="mt-5 leading-relaxed text-ink-soft">{COMPANY.team.body}</p>
          </div>

          <p className="mt-8 max-w-2xl rounded-2xl border border-line bg-canvas p-5 text-[0.875rem] leading-relaxed text-ink-muted">
            {COMPANY.team.note}
          </p>

          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" as="ul">
            {COMPANY.roles.map((role) => (
              <RevealItem key={role.title} as="li" className="h-full">
                <div className="group/role h-full rounded-2xl border border-line bg-canvas p-6 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-card">
                  <h3 className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em]">{role.title}</h3>
                  <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-soft">{role.detail}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---- Careers ---- */}
      <section id="careers" className="section scroll-mt-32 bg-canvas">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <IconPlate>
                  <Users className="h-5 w-5" aria-hidden="true" />
                </IconPlate>
                <h2 className="font-display text-display-md">{COMPANY.careers.title}</h2>
              </div>
              <p className="mt-6 leading-relaxed text-ink-soft">{COMPANY.careers.body}</p>
              <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-muted">{COMPANY.careers.note}</p>
            </div>

            <div className="lg:col-span-7">
              {COMPANY.careers.openings.length ? (
                <ul className="space-y-3">
                  {COMPANY.careers.openings.map((role) => (
                    <li
                      key={role.title}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white p-5"
                    >
                      <div>
                        <h3 className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em]">{role.title}</h3>
                        <p className="mt-1 text-[0.875rem] text-ink-muted">
                          {role.location} · {role.type}
                        </p>
                      </div>
                      <a
                        href={`mailto:${CONFIG.careersEmail}?subject=${encodeURIComponent(role.title)}`}
                        className="inline-flex h-10 items-center rounded-full border border-line px-4 text-[0.875rem] font-medium transition-colors hover:border-brand hover:text-brand"
                      >
                        Apply
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex h-full flex-col items-start justify-center rounded-3xl border border-dashed border-line bg-white p-8">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-[1.125rem] font-semibold tracking-[-0.02em]">
                    No open roles listed
                  </h3>
                  <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
                    We publish roles here as they are approved rather than advertising a pipeline of openings. If the
                    work described above sounds like what you want to do, send a note and we will keep it on file.
                  </p>
                  <a
                    href={`mailto:${CONFIG.careersEmail}?subject=Working%20at%20Trisentri%20AI`}
                    className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-brand transition-colors hover:text-brand-700"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span className="link-sweep">{CONFIG.careersEmail}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Contact points ---- */}
      <section className="section-tight bg-white">
        <div className="container-page">
          <ul className="grid gap-4 sm:grid-cols-3">
            {CONTACT_OFFICES.map((office) => {
              const Icon = getIcon(office.icon);
              return (
                <li key={office.label} className="rounded-2xl border border-line bg-canvas p-5">
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-brand" aria-hidden="true" />
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">
                      {office.label}
                    </span>
                  </div>
                  <p className="mt-3 text-[0.9375rem] font-medium text-ink">{office.value}</p>
                  <p className="mt-1 text-[0.8125rem] text-ink-muted">{office.detail}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function MilestoneIcon({ name }: { name: string }) {
  const Icon = getIcon(name);
  return <Icon className="h-5 w-5" aria-hidden="true" />;
}

function MissionAside() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-card">
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-50" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/[0.08] blur-2xl" aria-hidden="true" />
      <div className="relative">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-4 w-4 text-brand" aria-hidden="true" />
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">In one line</p>
        </div>
        <p className="mt-4 font-display text-[1.375rem] font-semibold leading-snug tracking-[-0.02em] text-ink">
          {`“${COMPANY.philosophy.body.split('.')[0]}.”`}
        </p>
        <dl className="mt-6 space-y-3 border-t border-line pt-5">
          {[
            { label: 'Focus', value: 'AI · Automation · Data' },
            { label: 'Team model', value: 'Small, senior, cross-functional' },
            { label: 'Delivery', value: 'Architecture first, then build' },
            { label: 'Handover', value: 'Documented and owned by your team' },
          ].map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-4">
              <dt className="text-[0.8125rem] text-ink-muted">{row.label}</dt>
              <dd className="text-right text-[0.8125rem] font-medium text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
