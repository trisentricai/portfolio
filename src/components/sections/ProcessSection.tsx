import { PROCESS } from '@/data/site';
import { getIcon } from '@/lib/icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

/**
 * Delivery process rail. The connecting line is a CSS gradient so the section
 * adds no JavaScript cost beyond the reveal.
 */
export function ProcessSection() {
  return (
    <section id="process" className="section relative overflow-hidden bg-canvas">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-lines opacity-40 mask-fade-b" />
        <div className="blob right-[-6rem] top-1/3 h-[26rem] w-[26rem] bg-brand/[0.06]" />
      </div>

      <div className="container-page relative">
        <SectionHeading
          eyebrow="How we work"
          title="A process built to de-risk, not to impress."
          lede="Five stages, each with a defined output you can review. Risk surfaces in the first weeks, and every iteration produces something that genuinely runs."
        />

        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5" as="ol">
          {PROCESS.map((step) => {
            const Icon = getIcon(step.icon);
            return (
              <RevealItem key={step.index} as="li" className="group/step relative bg-white">
                <div className="relative flex h-full flex-col p-6 sm:p-7">
                  {/* Top accent grows on hover */}
                  <span
                    className="absolute inset-x-0 top-0 h-0.5 w-0 bg-accent transition-[width] duration-500 ease-premium group-hover/step:w-full"
                    aria-hidden="true"
                  />

                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand transition-colors duration-300 group-hover/step:bg-brand group-hover/step:text-white">
                      <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
                    </span>
                    <span className="font-display text-[1.75rem] font-semibold leading-none text-line transition-colors duration-300 group-hover/step:text-brand-100 numeric">
                      {step.index}
                    </span>
                  </div>

                  <h3 className="mt-7 font-display text-[1.25rem] font-semibold tracking-[-0.02em]">{step.title}</h3>

                  <p className={cn('mt-3 flex-1 text-[0.875rem] leading-relaxed text-ink-soft')}>{step.detail}</p>

                  <ul className="mt-6 space-y-2 border-t border-line pt-5">
                    {step.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[0.8125rem] text-ink-muted">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-brand/50" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
