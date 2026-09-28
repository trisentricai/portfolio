import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { TECHNOLOGY_CATEGORIES } from '@/data/technologies';

/** Compact technology stack matrix for the home page. */
export function StackSection() {
  return (
    <section id="stack" className="section bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Technology stack"
            title="The engineering substrate."
            lede="Eight capability areas, one coherent stack. We choose tools that keep a system maintainable after handover — not the newest thing on the list."
          />
          <Link
            to="/technologies"
            className="group/all inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full border border-line bg-white px-5 text-[0.9375rem] font-medium text-ink transition-all duration-200 hover:border-brand hover:text-brand lg:self-auto"
          >
            Full ecosystem
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-3xl border border-line">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
              {TECHNOLOGY_CATEGORIES.map((category, index) => (
                <Link
                  key={category.id}
                  to={`/technologies#${category.id}`}
                  className="group/stack relative border-b border-line p-6 transition-colors duration-300 hover:bg-brand-50/60 sm:[&:nth-child(2n)]:border-l lg:[&:nth-child(2n)]:border-l-0 lg:[&:not(:nth-child(4n))]:border-r lg:border-b-0"
                >
                  <span
                    className="absolute left-0 top-0 h-full w-px bg-accent opacity-0 transition-opacity duration-300 group-hover/stack:opacity-100"
                    aria-hidden="true"
                  />
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted numeric">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-ink-muted opacity-0 transition-all duration-300 group-hover/stack:-translate-y-0.5 group-hover/stack:translate-x-0.5 group-hover/stack:text-brand group-hover/stack:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em]">
                    {category.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-2 text-[0.8125rem] leading-relaxed text-ink-muted">
                    {category.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
