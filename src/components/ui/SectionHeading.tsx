import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Eyebrow } from '@/components/ui/Badge';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

export interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  /** Heading level — keeps the document outline correct per page. */
  as?: 'h1' | 'h2' | 'h3';
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  className,
  as: Tag = 'h2',
  children,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <motion.div variants={fadeUp}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>
      ) : null}

      <motion.div variants={fadeUp} className={cn('max-w-3xl', align === 'center' && 'mx-auto')}>
        <Tag
          className={cn(
            'text-balance font-display text-display-md',
            align === 'center' && 'mx-auto',
          )}
        >
          {title}
        </Tag>
      </motion.div>

      {lede ? (
        <motion.p variants={fadeUp} className={cn('lede max-w-2xl', align === 'center' && 'mx-auto')}>
          {lede}
        </motion.p>
      ) : null}

      {children ? (
        <motion.div variants={fadeUp} className={cn('mt-2', align === 'center' && 'mx-auto')}>
          {children}
        </motion.div>
      ) : null}
    </motion.div>
  );
}

export interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  children?: ReactNode;
  /** Optional right-hand slot (filters, artwork). */
  aside?: ReactNode;
  className?: string;
}

/**
 * Hero header used at the top of every inner page. Keeps a consistent
 * eyebrow → title → lede rhythm while allowing page-specific extras.
 */
export function PageHeader({ eyebrow, title, lede, children, aside, className }: PageHeaderProps) {
  return (
    <header className={cn('section-tight pt-32 sm:pt-36 lg:pt-40', className)}>
      <BackgroundTexture />
      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Eyebrow>{eyebrow}</Eyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-balance font-display text-display-lg"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="lede mt-6 max-w-2xl"
            >
              {lede}
            </motion.p>

            {children ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="mt-9"
              >
                {children}
              </motion.div>
            ) : null}
          </div>

          {aside ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              {aside}
            </motion.div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

/** Very low-opacity grid + blue bloom used behind page headers. */
export function BackgroundTexture({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      <div className="absolute inset-0 bg-grid-lines mask-fade-b opacity-70" />
      <div className="blob -right-24 -top-32 h-[26rem] w-[26rem] bg-brand/10" />
      <div className="blob -left-32 top-40 h-[20rem] w-[20rem] bg-accent/[0.07]" />
    </div>
  );
}
