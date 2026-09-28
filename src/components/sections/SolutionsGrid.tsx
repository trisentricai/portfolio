import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, IconPlate } from '@/components/ui/Card';
import { ArrowCircle } from '@/components/ui/ArrowButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { getIcon } from '@/lib/icons';
import { EASE_PREMIUM } from '@/lib/motion';
import { FEATURED_SOLUTIONS } from '@/data/solutions';

/** "What We Build" — the six capability cards on the home page. */
export function SolutionsGrid() {
  return (
    <section id="what-we-build" className="section bg-canvas">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What we build"
            title="Technology built around real problems."
            lede="Six practice areas, each with the engineering depth to take a problem from an ambiguous brief to a system running in production."
          />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="shrink-0"
          >
            <Link
              to="/solutions"
              className="group/all inline-flex h-11 items-center gap-2 rounded-full border border-line bg-white px-5 text-[0.9375rem] font-medium text-ink transition-all duration-200 hover:border-brand hover:text-brand"
            >
              View all solutions
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover/all:translate-x-1">
                <path d="M3 8h9.5M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" as="ul">
          {FEATURED_SOLUTIONS.map((solution) => {
            const Icon = getIcon(solution.icon);
            return (
              <RevealItem key={solution.slug} as="li" className="h-full">
                <Card as="article" interactive className="h-full p-6 sm:p-7">
                  {/* Restrained corner glow */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/0 blur-2xl transition-all duration-500 ease-premium group-hover:bg-brand/[0.07]"
                    aria-hidden="true"
                  />

                  <div className="flex items-start justify-between gap-4">
                    <IconPlate>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </IconPlate>
                    <span className="font-mono text-[0.6875rem] text-ink-muted numeric">{solution.index}</span>
                  </div>

                  <h3 className="mt-6 font-display text-[1.375rem] font-semibold leading-snug tracking-[-0.02em] sm:text-[1.5rem]">
                    <Link to={`/solutions/${solution.slug}`} className="before:absolute before:inset-0 before:content-['']">
                      {solution.cardTitle ?? solution.title}
                    </Link>
                  </h3>

                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{solution.summary}</p>

                  <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                      Explore
                    </span>
                    <ArrowCircle
                      to={`/solutions/${solution.slug}`}
                      label={`Explore ${solution.title}`}
                      className="pointer-events-none"
                    />
                  </div>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
