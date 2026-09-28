import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Card, IconPlate } from '@/components/ui/Card';
import { getIcon } from '@/lib/icons';
import type { TechnologyCategory } from '@/data/technologies';
import { cn } from '@/lib/cn';

export function TechnologyCard({
  category,
  className,
  href,
}: {
  category: TechnologyCategory;
  className?: string;
  href?: string;
}) {
  const Icon = getIcon(category.icon);
  const to = href ?? `/technologies#${category.id}`;
  const itemCount = category.groups.reduce((total, group) => total + group.items.length, 0);

  const Wrapper = to ? Card : 'div';

  return (
    <Wrapper
      {...(to ? { as: 'article' as const, interactive: true } : {})}
      className={cn('h-full overflow-hidden', className)}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <IconPlate>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </IconPlate>
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted numeric">
            {itemCount} items
          </span>
        </div>

        <h3 className="mt-6 font-display text-[1.25rem] font-semibold tracking-[-0.02em]">
          {to ? (
            <Link to={to} className="before:absolute before:inset-0 before:content-['']">
              {category.title}
            </Link>
          ) : (
            category.title
          )}
        </h3>

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{category.description}</p>

        <ul className="mt-6 flex flex-1 flex-wrap content-start gap-1.5">
          {category.groups.flatMap((group) => group.items).slice(0, 8).map((item) => (
            <li
              key={item}
              className="rounded-lg border border-line bg-canvas px-2.5 py-1 font-mono text-[0.6875rem] text-ink-soft transition-colors duration-200 group-hover:border-brand-100 group-hover:bg-brand-50 group-hover:text-brand"
            >
              {item}
            </li>
          ))}
        </ul>

        {to ? (
          <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
            View ecosystem
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
              aria-hidden="true"
            />
          </span>
        ) : null}
      </div>
    </Wrapper>
  );
}
