import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface CardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li' | 'section';
  /** Adds the hover lift + gradient ring treatment. */
  interactive?: boolean;
}

/** Base surface: white, 1px hairline, 24px radius, soft shadow. */
export function Card({ children, className, as: Tag = 'div', interactive = false }: CardProps) {
  return (
    <Tag
      className={cn(
        'group relative rounded-2xl border border-line bg-white',
        interactive &&
          'transition-[transform,box-shadow,border-color] duration-300 ease-premium hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover motion-reduce:hover:translate-y-0',
        className,
      )}
    >
      {interactive ? <span className="ring-gradient absolute inset-0 rounded-2xl" aria-hidden="true" /> : null}
      <div className="relative z-[1] flex h-full flex-col">{children}</div>
    </Tag>
  );
}

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Adds a soft blue rim light along the top edge. */
  rim?: boolean;
}

export function GlassCard({ children, className, rim = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/70 bg-white/70 shadow-card backdrop-blur-xl',
        className,
      )}
    >
      {rim ? (
        <span
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
          aria-hidden="true"
        />
      ) : null}
      <div className="relative z-[1] flex h-full flex-col">{children}</div>
    </div>
  );
}

/** Small icon plate used at the top-left of every feature card. */
export function IconPlate({
  children,
  className,
  tone = 'brand',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'brand' | 'neutral' | 'lime';
}) {
  return (
    <span
      className={cn(
        'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300',
        tone === 'brand' && 'bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white',
        tone === 'neutral' && 'bg-[#F2F4F7] text-ink-soft group-hover:bg-brand-50 group-hover:text-brand',
        tone === 'lime' && 'bg-accent/25 text-[#3F5D00] group-hover:bg-accent group-hover:text-ink',
        className,
      )}
    >
      {children}
    </span>
  );
}
