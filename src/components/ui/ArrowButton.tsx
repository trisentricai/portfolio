import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

export interface ArrowLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  children: ReactNode;
  className?: string;
  /** Direction the arrow points. */
  direction?: 'right' | 'up-right' | 'left';
  tone?: 'brand' | 'ink';
}

const PATHS = {
  right: 'M4 12h15M13 6l6 6-6 6',
  'up-right': 'M7 17 17 7M8 7h9v9',
  left: 'M20 12H5M11 18l-6-6 6-6',
} as const;

/**
 * Text link with an arrow that slides on hover. Used at the end of cards and
 * sections as the primary "go deeper" affordance.
 */
export const ArrowLink = forwardRef<HTMLAnchorElement, ArrowLinkProps>(function ArrowLink(
  { children, className, direction = 'right', tone = 'brand', ...rest },
  ref,
) {
  return (
    <Link
      ref={ref}
      className={cn(
        'group/alink inline-flex items-center gap-2 text-[0.9375rem] font-medium transition-colors duration-200',
        tone === 'brand' ? 'text-brand hover:text-brand-700' : 'text-ink hover:text-brand',
        className,
      )}
      {...rest}
    >
      <span className="link-sweep">{children}</span>
      <span
        className={cn(
          'inline-flex transition-transform duration-300 ease-premium',
          direction === 'right' && 'group-hover/alink:translate-x-1',
          direction === 'up-right' && 'group-hover/alink:-translate-y-0.5 group-hover/alink:translate-x-1',
          direction === 'left' && 'group-hover/alink:-translate-x-1',
        )}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d={PATHS[direction]}
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
});

export interface ArrowButtonProps {
  to: string;
  children: ReactNode;
  className?: string;
}

/** Circular icon-only link used on cards (bottom-right corner). */
export function ArrowCircle({ to, label, className }: { to: string; label: string; className?: string }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className={cn(
        'group/arrow inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-white',
        'text-ink-soft transition-all duration-300 ease-premium',
        'hover:border-brand hover:bg-brand hover:text-white hover:shadow-blue-sm',
        'focus-visible:outline-brand',
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-[1.125rem] w-[1.125rem] transition-transform duration-300 ease-premium group-hover/arrow:translate-x-0.5"
      >
        <path
          d="M5 12h13M12.5 6.5 18 12l-5.5 5.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
