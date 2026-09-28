import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type BadgeTone = 'brand' | 'neutral' | 'lime' | 'outline' | 'warn';

const TONES: Record<BadgeTone, string> = {
  brand: 'bg-brand-50 text-brand-700 ring-brand-100',
  neutral: 'bg-[#F2F4F7] text-ink-soft ring-[#E4E7EC]',
  lime: 'bg-accent/25 text-[#3F5D00] ring-accent/50',
  outline: 'bg-transparent text-ink-soft ring-line',
  warn: 'bg-[#FFF8E6] text-[#8A6100] ring-[#FFE3A3]',
};

export interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
  icon?: ReactNode;
  /** Small pulsing dot — used for "live" or "in progress" states. */
  pulse?: boolean;
}

export function Badge({ children, tone = 'neutral', className, icon, pulse = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] ring-1 ring-inset',
        TONES[tone],
        className,
      )}
    >
      {pulse ? (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-deep opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-deep" />
        </span>
      ) : null}
      {icon}
      {children}
    </span>
  );
}

/**
 * Section eyebrow: a short monospace label preceded by a hairline rule and a
 * lime dot. Used above every section heading to reinforce the technical tone.
 */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-center gap-2.5 font-mono text-eyebrow font-medium uppercase text-brand', className)}>
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      <span className="h-px w-6 bg-brand/30" aria-hidden="true" />
      {children}
    </p>
  );
}
