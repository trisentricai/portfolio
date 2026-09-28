import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CAPABILITIES } from '@/data/site';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM } from '@/lib/motion';

/**
 * "From intelligence to execution."
 *
 * A two-part interactive panel: a detail readout on the left that follows the
 * focused or hovered capability, and a dense grid of capabilities on the right.
 * Every tile is a real button so the panel is reachable by keyboard.
 */
export function CapabilityGrid() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = CAPABILITIES[active];

  return (
    <section id="capabilities" className="section relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-dots opacity-[0.55] mask-fade-radial" />
        <div className="blob left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 bg-brand/[0.06]" />
      </div>

      <div className="container-page relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2.5 font-mono text-eyebrow font-medium uppercase text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span className="h-px w-6 bg-brand/30" aria-hidden="true" />
              AI capabilities
            </p>
            <h2 className="mt-6 text-balance font-display text-display-md">From intelligence to execution.</h2>
            <p className="lede mt-5 max-w-xl">
              Ten disciplines we work in daily — connected end to end, so the model, the data and the workflow it
              runs in are designed together.
            </p>
          </div>

          <Link
            to="/technologies"
            className="group/cap inline-flex w-fit items-center gap-2 text-[0.9375rem] font-medium text-brand transition-colors hover:text-brand-700"
          >
            <span className="link-sweep">See the full technology ecosystem</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover/cap:-translate-y-0.5 group-hover/cap:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* ---------------- Detail readout ---------------- */}
          <div className="lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-3xl border border-line bg-canvas p-7 sm:p-9">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand/[0.08] blur-2xl"
                aria-hidden="true"
              />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-muted">
                    Capability
                  </span>
                  <span className="font-mono text-[0.6875rem] text-brand numeric">
                    {String(active + 1).padStart(2, '0')} / {String(CAPABILITIES.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="relative mt-8 min-h-[9.5rem] flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.name}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.32, ease: EASE_PREMIUM }}
                    >
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-blue-sm">
                        <ActiveIcon name={current.icon} />
                      </span>
                      <h3 className="mt-6 font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.02em]">
                        {current.name}
                      </h3>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{current.description}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress rail */}
                <div className="mt-8 flex gap-1" aria-hidden="true">
                  {CAPABILITIES.map((capability, index) => (
                    <span
                      key={capability.name}
                      className={cn(
                        'h-0.5 flex-1 rounded-full transition-colors duration-500',
                        index === active ? 'bg-brand' : 'bg-line',
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- Capability grid ---------------- */}
          <div className="lg:col-span-7">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {CAPABILITIES.map((capability, index) => {
                const isActive = index === active;
                return (
                  <li key={capability.name}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      onClick={() => setActive(index)}
                      aria-pressed={isActive}
                      className={cn(
                        'group/cap relative flex h-full w-full flex-col items-start gap-3 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ease-premium sm:p-5',
                        isActive
                          ? 'border-brand/30 bg-brand-50 shadow-card'
                          : 'border-line bg-white hover:-translate-y-1 hover:border-brand-200 hover:shadow-card',
                      )}
                    >
                      {/* Lime indicator, only on the active tile */}
                      <span
                        className={cn(
                          'absolute left-0 top-0 h-full w-[2px] origin-top bg-accent transition-transform duration-500 ease-premium',
                          isActive ? 'scale-y-100' : 'scale-y-0',
                        )}
                        aria-hidden="true"
                      />

                      <span
                        className={cn(
                          'flex w-full items-center justify-between',
                          'transition-colors duration-300',
                        )}
                      >
                        <span
                          className={cn(
                            'font-mono text-[0.6875rem] font-medium tracking-[0.1em] transition-colors duration-300',
                            isActive ? 'text-brand' : 'text-ink-muted',
                          )}
                        >
                          {capability.code}
                        </span>
                        <span
                          className={cn(
                            'h-1.5 w-1.5 rounded-full transition-all duration-300',
                            isActive ? 'scale-100 bg-accent' : 'scale-0 bg-line',
                          )}
                          aria-hidden="true"
                        />
                      </span>

                      <span className="text-[0.875rem] font-medium leading-snug text-ink sm:text-[0.9375rem]">
                        {capability.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ActiveIcon({ name }: { name: string }) {
  const Icon = getIcon(name);
  return <Icon className="h-[1.375rem] w-[1.375rem]" aria-hidden="true" />;
}
