import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Max-width wrapper + consistent page rhythm. */
export function PageContainer({
  children,
  className,
  size = 'default',
}: {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'wide' | 'narrow';
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-8 lg:px-10',
        size === 'default' && 'max-w-container',
        size === 'wide' && 'max-w-[92rem]',
        size === 'narrow' && 'max-w-4xl',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Vertical rhythm wrapper for a top-level page section. */
export function Section({
  children,
  className,
  id,
  tight = false,
  tone = 'canvas',
  as: Tag = 'section',
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tight?: boolean;
  tone?: 'canvas' | 'white' | 'none';
  as?: 'section' | 'div' | 'article';
}) {
  return (
    <Tag
      id={id}
      className={cn(
        'relative',
        tight ? 'section-tight' : 'section',
        tone === 'white' && 'bg-white',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
