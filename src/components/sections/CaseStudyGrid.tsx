import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { CaseStudyCard } from '@/components/cards/CaseStudyCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { FEATURED_CASE_STUDIES } from '@/data/caseStudies';
import { Disclosure } from '@/components/ui/Disclosure';
import { EASE_PREMIUM } from '@/lib/motion';

export function CaseStudyGrid({ limit }: { limit?: number }) {
  const studies = limit ? FEATURED_CASE_STUDIES.slice(0, limit) : FEATURED_CASE_STUDIES;

  return (
    <section id="case-studies" className="section bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="How the work actually gets done."
            lede="Structured engagements showing the problem, the constraints and the engineering decisions — published as they are cleared for release."
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
                to="/case-studies"
                className="group/all inline-flex h-11 items-center gap-2 rounded-full border border-line bg-white px-5 text-[0.9375rem] font-medium text-ink transition-all duration-200 hover:border-brand hover:text-brand"
              >
                All case studies
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5" aria-hidden="true" />
              </Link>
            </motion.div>
          ) : null}
        </div>

        {limit ? (
          <Disclosure title="Illustrative engagements" className="mt-10">
            These case studies document Trisentri AI's approach and architecture. They are placeholders, not records of
            client work — no client names, measured results or testimonials are represented. Figures shown are targets
            defined at discovery.
          </Disclosure>
        ) : null}

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3" as="ul">
          {studies.map((study) => (
            <RevealItem key={study.slug} as="li" className="h-full">
              <CaseStudyCard study={study} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
