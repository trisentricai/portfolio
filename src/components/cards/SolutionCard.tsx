import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Card, IconPlate } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getIcon } from '@/lib/icons';
import type { Solution } from '@/data/solutions';
import { cn } from '@/lib/cn';

/**
 * One solution card. `variant` controls density:
 *  - `compact` — mega menu / tight grids
 *  - `default` — home + listing pages
 *  - `row`     — solutions index, a wide horizontal treatment
 */
export function SolutionCard({
  solution,
  variant = 'default',
  className,
}: {
  solution: Solution;
  variant?: 'compact' | 'default' | 'row';
  className?: string;
}) {
  const Icon = getIcon(solution.icon);

  if (variant === 'compact') {
    return (
      <Link
        to={`/solutions/${solution.slug}`}
        className={cn(
          'group/cmp flex items-start gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-brand-50',
          className,
        )}
      >
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand transition-colors duration-200 group-hover/cmp:bg-brand group-hover/cmp:text-white">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.875rem] font-medium leading-snug text-ink">{solution.shortTitle}</span>
          <span className="mt-0.5 block text-xs leading-snug text-ink-muted">{solution.summary}</span>
        </span>
      </Link>
    );
  }

  if (variant === 'row') {
    return (
      <Card as="article" interactive className={cn('overflow-hidden', className)}>
        <div className="flex h-full flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-start lg:gap-12">
          <div className="flex items-center gap-4 lg:w-16 lg:shrink-0">
            <IconPlate>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </IconPlate>
            <span className="font-mono text-[0.6875rem] text-ink-muted lg:hidden numeric">{solution.index}</span>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.6875rem] text-ink-muted numeric">{solution.index}</span>
              <span className="h-px w-8 bg-line" aria-hidden="true" />
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted">
                {solution.shortTitle}
              </span>
            </div>

            <h2 className="mt-4 font-display text-[1.625rem] font-semibold leading-tight tracking-[-0.025em] sm:text-[1.875rem]">
              <Link to={`/solutions/${solution.slug}`} className="before:absolute before:inset-0 before:content-['']">
                {solution.title}
              </Link>
            </h2>

            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">{solution.description}</p>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {solution.useCases.slice(0, 4).map((useCase) => (
                <li key={useCase}>
                  <Badge tone="outline">{useCase}</Badge>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between gap-4 lg:w-44 lg:shrink-0 lg:flex-col lg:items-end lg:justify-center">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
              {solution.pipeline.length} stage{solution.pipeline.length === 1 ? '' : 's'}
            </span>
            <ArrowUpRight
              className="h-5 w-5 text-ink-muted transition-all duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
              aria-hidden="true"
            />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card as="article" interactive className={cn('h-full overflow-hidden', className)}>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <IconPlate>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </IconPlate>
          <span className="font-mono text-[0.6875rem] text-ink-muted numeric">{solution.index}</span>
        </div>

        <h3 className="mt-6 font-display text-[1.3125rem] font-semibold leading-snug tracking-[-0.02em] sm:text-[1.375rem]">
          <Link to={`/solutions/${solution.slug}`} className="before:absolute before:inset-0 before:content-['']">
            {solution.title}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{solution.description}</p>

        <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
          {solution.technologies.slice(0, 3).map((technology) => (
            <li
              key={technology}
              className="rounded-lg border border-line bg-canvas px-2.5 py-1 font-mono text-[0.6875rem] text-ink-soft"
            >
              {technology}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
