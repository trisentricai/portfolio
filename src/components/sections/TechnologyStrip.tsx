import { motion } from 'framer-motion';
import { TECH_STRIP } from '@/data/technologies';
import { getIcon } from '@/lib/icons';
import { EASE_PREMIUM } from '@/lib/motion';

/**
 * "Built with modern technology" strip.
 *
 * Deliberately monochrome and icon-led: these are capability categories, not
 * partner logos, so a wall of colourful brand marks would misrepresent them.
 */
export function TechnologyStrip() {
  return (
    <section aria-labelledby="tech-strip-title" className="relative border-y border-line bg-white">
      <div className="container-page py-10 sm:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          <h2
            id="tech-strip-title"
            className="shrink-0 font-mono text-[0.6875rem] font-medium uppercase leading-relaxed tracking-[0.16em] text-ink-muted lg:max-w-[13rem]"
          >
            Built with
            <br />
            modern technology
          </h2>

          <ul className="grid flex-1 grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 lg:grid-cols-7">
            {TECH_STRIP.map((item, index) => {
              const Icon = getIcon(item.icon);
              return (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: EASE_PREMIUM }}
                  className="group flex flex-col items-start gap-2.5 sm:items-center sm:text-center lg:items-start lg:text-left"
                >
                  <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-canvas text-ink-soft transition-all duration-300 ease-premium group-hover:border-brand/30 group-hover:bg-brand-50 group-hover:text-brand">
                    <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
                    <span
                      className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-[0.8125rem] font-medium leading-snug text-ink-soft">{item.label}</span>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
