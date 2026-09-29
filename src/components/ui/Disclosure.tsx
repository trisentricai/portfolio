import type { ReactNode } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface DisclosureProps {
  title: string;
  children: ReactNode;
  className?: string;
  tone?: 'info' | 'warn';
}

/**
 * Visible content-integrity notice.
 *
 * Used on every page that carries illustrative content (case studies, product
 * concepts) so placeholder material can never be mistaken for a factual claim
 * about Trisentric AI or its clients.
 */
export function Disclosure({ title, children, className, tone = 'info' }: DisclosureProps) {
  return (
    <aside
      className={cn(
        'flex gap-3.5 rounded-2xl border p-4 sm:p-5',
        tone === 'info'
          ? 'border-brand-100 bg-brand-50/60'
          : 'border-[#FFE3A3] bg-[#FFF8E6]',
        className,
      )}
    >
      <span
        className={cn(
          'mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
          tone === 'info' ? 'bg-brand/10 text-brand' : 'bg-[#FFE3A3] text-[#8A6100]',
        )}
        aria-hidden="true"
      >
        <Info className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 text-sm leading-relaxed">
        <p
          className={cn(
            'font-display text-[0.9375rem] font-semibold',
            tone === 'info' ? 'text-brand-900' : 'text-[#6B4B00]',
          )}
        >
          {title}
        </p>
        <div className={cn('mt-1.5', tone === 'info' ? 'text-brand-900/75' : 'text-[#6B4B00]/80')}>
          {children}
        </div>
      </div>
    </aside>
  );
}

/**
 * Placeholder artwork block. Any region that would otherwise hold a screenshot
 * or product image renders this instead of a fabricated mockup.
 */
export function PlaceholderVisual({
  label,
  className,
  ratio = 'aspect-[16/10]',
}: {
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={cn(
        'relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-line bg-canvas',
        ratio,
        className,
      )}
      role="img"
      aria-label={`Placeholder: ${label}`}
    >
      <div className="absolute inset-0 bg-grid-dots opacity-50" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand/[0.05] to-transparent"
        aria-hidden="true"
      />
      <span className="relative flex flex-col items-center gap-2 px-6 text-center">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">{label}</span>
        <span className="max-w-xs text-xs text-ink-muted/80">
          Reserved for approved project imagery. Replace during content intake.
        </span>
      </span>
    </div>
  );
}
