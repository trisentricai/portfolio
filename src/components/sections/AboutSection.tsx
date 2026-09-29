import { HOME_ABOUT } from '@/data/site';
import { getIcon } from '@/lib/icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';

/** Editorial "About" split section on the home page. */
export function AboutSection() {
  return (
    <section id="about" className="section relative overflow-hidden bg-canvas">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-dots opacity-50 mask-fade-radial" />
        <div className="blob -left-24 top-1/4 h-[26rem] w-[26rem] bg-brand/[0.06]" />
      </div>

      <div className="container-page relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={HOME_ABOUT.eyebrow} title={HOME_ABOUT.heading} />
            <Reveal delay={0.1} className="mt-9">
              <ButtonLink to="/company" variant="secondary" withArrow>
                More about Trisentric AI
              </ButtonLink>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-5">
              {HOME_ABOUT.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 24)} delay={index * 0.06}>
                  <p
                    className={
                      index === 0
                        ? 'text-lg leading-relaxed text-ink sm:text-xl sm:leading-[1.65]'
                        : 'leading-relaxed text-ink-soft'
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2" as="ul">
              {HOME_ABOUT.principles.map((principle) => {
                const Icon = getIcon(principle.icon);
                return (
                  <RevealItem key={principle.title} as="li">
                    <div className="group/principle flex h-full gap-4 rounded-2xl border border-line bg-white p-5 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand-200 hover:shadow-card">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand transition-colors duration-300 group-hover/principle:bg-brand group-hover/principle:text-white">
                        <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-[1rem] font-semibold tracking-[-0.015em]">
                          {principle.title}
                        </h3>
                        <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-soft">
                          {principle.detail}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
