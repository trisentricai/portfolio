import { Hero } from '@/components/hero/Hero';
import { TechnologyStrip } from '@/components/sections/TechnologyStrip';
import { SolutionsGrid } from '@/components/sections/SolutionsGrid';
import { CapabilityGrid } from '@/components/sections/CapabilityGrid';
import { IndustryGrid } from '@/components/sections/IndustryGrid';
import { CaseStudyGrid } from '@/components/sections/CaseStudyGrid';
import { StackSection } from '@/components/sections/StackSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { CTASection } from '@/components/sections/CTASection';
import { usePageMeta } from '@/lib/seo';

/**
 * Home page composition.
 *
 * Section order follows the brief: hero → technology strip → what we build →
 * capabilities → industries → selected work → stack → process → about → CTA.
 */
export default function Home() {
  usePageMeta({
    title: 'AI Engineering & Intelligent Automation',
    description:
      'Trisentri AI is an AI engineering company building machine learning, generative AI, computer vision and intelligent automation systems that are measurable, bounded and maintainable in production.',
  });

  return (
    <>
      <Hero />
      <TechnologyStrip />
      <SolutionsGrid />
      <CapabilityGrid />
      <IndustryGrid limit={4} />
      <CaseStudyGrid limit={3} />
      <StackSection />
      <ProcessSection />
      <AboutSection />
      <CTASection />
    </>
  );
}
