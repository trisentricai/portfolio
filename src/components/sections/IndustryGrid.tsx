import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { IndustryCard } from '@/components/cards/IndustryCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { INDUSTRIES } from '@/data/industries';
import { motion } from 'framer-motion';
import { EASE_PREMIUM } from '@/lib/motion';

export function IndustryGrid({ limit }: { limit?: number }) {
  const industries = limit ? INDUSTRIES.slice(0, limit) : INDUSTRIES;

  return (
    <section id="industries" className="section bg-canvas">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-lines opacity-40 mask-fade-b" />
      </div>

      <div className="container-page relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Industries"
            title="Domain knowledge changes the engineering."
            lede="The same model behaves very differently in a clinic, a warehouse and a trading floor. We build for the constraints your sector actually operates under."
          />
          {limit ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
              className="shrink-0"
            >
              <Link
                to="/industries"
                className="group/all inline-flex h-11 items-center gap-2 rounded-full border border-line bg-white px-5 text-[0.9375rem] font-medium text-ink transition-all duration-200 hover:border-brand hover:text-brand"
              >
                All industries
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5" aria-hidden="true" />
              </Link>
            </motion.div>
          ) : null}
        </div>

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" as="ul">
          {industries.map((industry) => (
            <RevealItem key={industry.slug} as="li" className="h-full">
              <IndustryCard industry={industry} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
