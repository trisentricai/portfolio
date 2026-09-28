import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'lime' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

const BASE =
  'group/btn relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium leading-none ' +
  'transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-premium ' +
  'active:translate-y-px disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white shadow-blue-sm hover:bg-brand-700 hover:shadow-blue focus-visible:outline-brand',
  secondary:
    'bg-white text-ink border border-line hover:border-brand-200 hover:text-brand hover:shadow-card',
  ghost: 'bg-transparent text-ink-soft hover:bg-brand-50 hover:text-brand',
  lime: 'bg-accent text-ink hover:bg-accent-soft shadow-[0_8px_24px_rgba(200,255,61,0.35)]',
  dark: 'bg-ink text-white hover:bg-[#1D2939] shadow-card',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-[0.8125rem]',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-[3.25rem] px-7 text-base',
};

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders a trailing arrow that slides on hover. */
  withArrow?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

/** The arrow glyph, animated on the parent group's hover. */
function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn(
        'h-[0.875em] w-[0.875em] transition-transform duration-200 ease-premium group-hover/btn:translate-x-1',
        className,
      )}
    >
      <path
        d="M3 8h9.5M9 4.5 12.5 8 9 11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', withArrow = false, fullWidth = false, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && 'w-full', className)}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {withArrow ? <Arrow /> : null}
    </button>
  );
});

export interface ButtonLinkProps {
  to: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  withArrow?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}

/** Same visual language as `Button`, rendered as an internal route link. */
export function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  fullWidth = false,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      className={cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && 'w-full', className)}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {withArrow ? <Arrow /> : null}
    </Link>
  );
}

export interface ExternalButtonProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

export function ExternalButton({
  href,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className,
  children,
}: ExternalButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {withArrow ? <Arrow /> : null}
    </a>
  );
}

export { Arrow };
