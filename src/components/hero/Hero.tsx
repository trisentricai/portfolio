import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Cpu, Gauge, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AIVisualization } from './AIVisualization';
import { FloatingMetric, FloatingMetricsLayer } from './FloatingMetric';
import { ButtonLink } from '@/components/ui/Button';
import { EASE_PREMIUM } from '@/lib/motion';
import { NAV_CTA } from '@/data/navigation';

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE_PREMIUM },
});

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-36">
      {/* ---------------- Background depth ---------------- */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-lines mask-fade-b opacity-60" />
        <div className="blob right-[-10rem] top-[-8rem] h-[34rem] w-[34rem] bg-brand/[0.13] animate-drift" />
        <div className="blob left-[-8rem] top-[22rem] h-[24rem] w-[24rem] bg-accent/[0.08]" />
        <div className="grain absolute inset-0 opacity-[0.018] mix-blend-multiply" />
      </div>

      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---------------- Copy ---------------- */}
          <div className="lg:col-span-6 xl:col-span-6">
            <motion.div {...(reduce ? {} : rise(0))} className="flex">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 py-1.5 pl-1.5 pr-3.5 backdrop-blur">
                <span className="inline-flex h-6 items-center gap-1 rounded-full bg-brand-50 px-2 font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-brand">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  AI Engineering
                </span>
                <span className="text-[0.8125rem] font-medium text-ink-soft">Applied intelligence, production ready</span>
              </span>
            </motion.div>

            <motion.h1
              {...(reduce ? {} : rise(0.08))}
              className="mt-7 text-balance font-display text-display-xl"
            >
              Engineering Intelligence
              <br className="hidden sm:block" />{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-brand via-brand-400 to-brand bg-clip-text text-transparent">
                  for the Real World.
                </span>
              </span>
            </motion.h1>

            <motion.p {...(reduce ? {} : rise(0.16))} className="lede mt-7 max-w-xl">
              Trisentric AI builds intelligent systems that transform complex data, automate decisions, and turn
              ambitious ideas into scalable digital products.
            </motion.p>

            <motion.div {...(reduce ? {} : rise(0.24))} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink to="/solutions" size="lg" withArrow>
                Explore Solutions
              </ButtonLink>
              <ButtonLink to={NAV_CTA.to} size="lg" variant="secondary">
                Start a Project
              </ButtonLink>
            </motion.div>

            <motion.dl
              {...(reduce ? {} : rise(0.32))}
              className="mt-11 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7 sm:grid-cols-3"
            >
              {HERO_POINTS.map((point) => (
                <div key={point.label}>
                  <dt className="flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted">
                    <point.icon className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                    {point.label}
                  </dt>
                  <dd className="mt-1.5 text-[0.875rem] leading-snug text-ink-soft">{point.detail}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---------------- Visualization ---------------- */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_PREMIUM }}
            className="relative lg:col-span-6 xl:col-span-6"
          >
            <VisualizationCluster />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const HERO_POINTS = [
  { label: 'Approach', detail: 'Evaluation before interface', icon: Gauge },
  { label: 'Delivery', detail: 'Working slice every iteration', icon: Activity },
  { label: 'Handover', detail: 'Documented and maintainable', icon: Cpu },
];

function VisualizationCluster() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem] lg:max-w-none">
      {/* Concentric technical rings */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-[6%] rounded-full border border-line/70" />
        <div className="absolute inset-[18%] rounded-full border border-dashed border-line" />
        <div className="absolute inset-[30%] rounded-full border border-brand/10" />
        <div
          className="absolute inset-0 rounded-full opacity-[0.5] blur-[1px]"
          style={{
            backgroundImage:
              'repeating-conic-gradient(from 0deg, rgba(36,87,255,0.16) 0deg 0.35deg, transparent 0.35deg 12deg)',
          }}
        />
        <div
          className="absolute inset-[6%] rounded-full opacity-[0.35]"
          style={{
            backgroundImage:
              'repeating-conic-gradient(from 4deg, rgba(200,255,61,0.22) 0deg 0.25deg, transparent 0.25deg 24deg)',
          }}
        />
      </div>

      {/* The lattice itself */}
      <div className="absolute inset-[4%]">
        <AIVisualization className="h-full w-full" />
      </div>

      {/* Floating glass telemetry */}
      <FloatingMetricsLayer>
        <FloatingMetric
          label="AI System"
          value="98.4%"
          detail="Sample confidence reading"
          className="left-0 top-[8%] sm:left-[2%]"
          depth={14}
          delay={0.55}
          icon={<Cpu className="h-3 w-3" aria-hidden="true" />}
        />
        <FloatingMetric
          label="Real-time"
          value="< 50ms"
          detail="Sample inference latency"
          className="right-0 top-[42%] sm:right-[1%]"
          depth={20}
          delay={0.68}
          icon={<Activity className="h-3 w-3" aria-hidden="true" />}
        />
        <FloatingMetric
          label="Automation"
          value="24/7"
          detail="Sample continuous run rate"
          className="bottom-[4%] left-[6%] sm:left-[12%]"
          depth={10}
          delay={0.8}
          icon={<Sparkles className="h-3 w-3" aria-hidden="true" />}
        />
      </FloatingMetricsLayer>

      {/* Framing + disclosure */}
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-line/80 bg-white/25 backdrop-blur-[2px]" aria-hidden="true" />

      <p className="absolute inset-x-0 -bottom-7 mx-auto w-max max-w-[90%] text-center font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted">
        Illustrative interface preview · figures are sample values
      </p>
    </div>
  );
}

export function HeroScrollHint() {
  return (
    <Link
      to="/#capabilities"
      className="group mx-auto mt-16 hidden w-fit flex-col items-center gap-2 lg:flex"
      aria-label="Continue to AI capabilities"
    >
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-ink-muted transition-colors group-hover:text-brand">
        Explore
      </span>
      <span className="relative h-9 w-px overflow-hidden bg-line" aria-hidden="true">
        <span className="absolute inset-x-0 top-0 h-3 animate-scan-line bg-brand" />
      </span>
    </Link>
  );
}
