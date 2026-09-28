import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Industry } from '@/data/industries';
import { Card, IconPlate } from '@/components/ui/Card';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/cn';

export function IndustryCard({
  industry,
  className,
  size = 'default',
}: {
  industry: Industry;
  className?: string;
  size?: 'default' | 'compact';
}) {
  const Icon = getIcon(industry.icon);
  const to = `/industries#${industry.slug}`;

  return (
    <Card as="article" interactive className={cn('h-full overflow-hidden', className)}>
      {/* Gradient wash that fades in on hover */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-500 ease-premium group-hover:opacity-100"
        aria-hidden="true"
      />
      {/* Lime corner indicator */}
      <span
        className="pointer-events-none absolute left-0 top-0 h-1 w-0 bg-accent transition-[width] duration-500 ease-premium group-hover:w-full"
        aria-hidden="true"
      />

      <div className={cn('flex h-full flex-col', size === 'compact' ? 'p-5' : 'p-6 sm:p-7')}>
        <div className="flex items-start justify-between gap-4">
          <IconPlate>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </IconPlate>
          <ArrowUpRight
            className="h-[1.125rem] w-[1.125rem] shrink-0 text-ink-muted transition-all duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
            aria-hidden="true"
          />
        </div>

        <h3 className="mt-6 font-display text-[1.25rem] font-semibold tracking-[-0.02em]">
          <Link to={to} className="before:absolute before:inset-0 before:content-['']">
            {industry.name}
          </Link>
        </h3>

        <p className="mt-2 text-[0.875rem] font-medium leading-snug text-brand">{industry.tagline}</p>

        {size === 'default' ? (
          <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{industry.description}</p>
        ) : null}

        {size === 'default' ? (
          <ul className="mt-5 space-y-2 border-t border-line pt-5">
            {industry.applications.slice(0, 3).map((application) => (
              <li key={application} className="flex items-start gap-2 text-[0.8125rem] leading-snug text-ink-muted">
                <span className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-brand/50" aria-hidden="true" />
                {application}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Card>
  );
}
