import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM } from '@/lib/motion';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

/**
 * Client-side filter bar: a text query plus a single-select pill row.
 *
 * Written as a controlled component with no internal data fetching, so the same
 * control works for solutions, case studies and insights without modification.
 */
export function FilterBar({
  query,
  onQueryChange,
  options,
  value,
  onValueChange,
  searchLabel,
  searchPlaceholder = 'Search',
  className,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  options: FilterOption[];
  value: string;
  onValueChange: (value: string) => void;
  searchLabel: string;
  searchPlaceholder?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between', className)}>
      <div className="relative w-full lg:max-w-xs">
        <label htmlFor="filter-search" className="sr-only">
          {searchLabel}
        </label>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
          aria-hidden="true"
        />
        <input
          id="filter-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="h-11 w-full rounded-full border border-line bg-white pl-11 pr-10 text-[0.9375rem] text-ink placeholder:text-ink-muted transition-colors duration-200 hover:border-brand-200 focus:border-brand focus:outline-none focus-visible:outline-brand"
        />
        {query ? (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            className="absolute right-3 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-brand"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onValueChange(option.value)}
              aria-pressed={selected}
              className={cn(
                'relative inline-flex h-9 items-center gap-1.5 rounded-full border px-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors duration-200 focus-visible:outline-brand',
                selected
                  ? 'border-brand bg-brand text-white'
                  : 'border-line bg-white text-ink-soft hover:border-brand-200 hover:text-brand',
              )}
            >
              {option.label}
              {typeof option.count === 'number' ? (
                <span className={cn('numeric', selected ? 'text-white/70' : 'text-ink-muted')}>{option.count}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export interface EmptyStateProps {
  title: string;
  body: string;
  onReset?: () => void;
  className?: string;
}

export function EmptyState({ title, body, onReset, className }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_PREMIUM }}
      className={cn(
        'flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-canvas px-6 py-16 text-center',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      <h3 className="mt-4 font-display text-[1.25rem] font-semibold tracking-[-0.02em]">{title}</h3>
      <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">{body}</p>
      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex h-10 items-center rounded-full border border-line bg-white px-5 text-[0.875rem] font-medium text-ink transition-colors duration-200 hover:border-brand hover:text-brand focus-visible:outline-brand"
        >
          Reset filters
        </button>
      ) : null}
    </motion.div>
  );
}

/** Case-insensitive substring match across the supplied fields. */
export function useTextFilter<T>(items: T[], fields: (item: T) => string[]) {
  return useMemo(
    () => (query: string) => {
      const term = query.trim().toLowerCase();
      if (!term) return items;
      return items.filter((item) => fields(item).some((field) => field.toLowerCase().includes(term)));
    },
    [items, fields],
  );
}
