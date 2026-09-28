import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from '@/data/caseStudies';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';

/** Deterministic abstract artwork — derived from the slug, not a stock image. */
function StudyArtwork({ seed, className }: { seed: number; className?: string }) {
  const variant = seed % 4;
  return (
    <div
      className={cn('relative h-40 overflow-hidden bg-canvas sm:h-44', className)}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-grid-dots opacity-60" />

      {variant === 0 ? (
        <svg viewBox="0 0 400 176" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <polyline
              key={i}
              points={Array.from({ length: 9 }, (_, j) => `${j * 50},${40 + i * 18 + Math.sin(j * 1.1 + i) * 14}`).join(' ')}
              fill="none"
              stroke="#2457FF"
              strokeOpacity={0.14 + i * 0.06}
              strokeWidth="1.4"
            />
          ))}
        </svg>
      ) : null}

      {variant === 1 ? (
        <svg viewBox="0 0 400 176" className="absolute inset-0 h-full w-full">
          {Array.from({ length: 34 }, (_, i) => {
            const angle = i * 0.9;
            const radius = 24 + (i % 7) * 13;
            return (
              <circle
                key={i}
                cx={200 + Math.cos(angle) * radius * 1.7}
                cy={88 + Math.sin(angle) * radius * 0.72}
                r={i % 5 === 0 ? 4.5 : 2.2}
                fill={i % 9 === 0 ? '#C8FF3D' : '#2457FF'}
                fillOpacity={i % 5 === 0 ? 0.85 : 0.28}
              />
            );
          })}
        </svg>
      ) : null}

      {variant === 2 ? (
        <svg viewBox="0 0 400 176" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {Array.from({ length: 22 }, (_, i) => (
            <rect
              key={i}
              x={i * 19 + 6}
              y={140 - (10 + ((i * 37) % 96))}
              width="11"
              height={10 + ((i * 37) % 96)}
              rx="3"
              fill="#2457FF"
              fillOpacity={0.1 + (i % 4) * 0.07}
            />
          ))}
        </svg>
      ) : null}

      {variant === 3 ? (
        <svg viewBox="0 0 400 176" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {Array.from({ length: 7 }, (_, i) => (
            <rect
              key={i}
              x={10}
              y={14 + i * 22}
              width={380 - i * 34}
              height="12"
              rx="6"
              fill="none"
              stroke="#2457FF"
              strokeOpacity={0.12 + i * 0.05}
              strokeWidth="1.2"
            />
          ))}
          <circle cx="286" cy="48" r="5" fill="#C8FF3D" />
        </svg>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 to-transparent" />
    </div>
  );
}

export function CaseStudyCard({
  study,
  className,
  priority = false,
}: {
  study: CaseStudy;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Card as="article" interactive className={cn('h-full overflow-hidden', className)}>
      <StudyArtwork seed={hashSeed(study.slug)} />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="brand">{study.industry}</Badge>
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted numeric">
            {study.archetype}
          </span>
        </div>

        <h3 className="mt-5 font-display text-[1.3125rem] font-semibold leading-snug tracking-[-0.02em] sm:text-[1.375rem]">
          <Link
            to={`/case-studies/${study.slug}`}
            className="before:absolute before:inset-0 before:content-['']"
            {...(priority ? { 'data-priority': 'true' } : {})}
          >
            {study.title}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{study.summary}</p>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
            Read engagement
          </span>
          <ArrowUpRight
            className="h-[1.125rem] w-[1.125rem] text-ink-muted transition-all duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
            aria-hidden="true"
          />
        </div>
      </div>
    </Card>
  );
}

function hashSeed(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) hash = (hash * 31 + slug.charCodeAt(i)) % 100000;
  return hash;
}
