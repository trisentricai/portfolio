import type { ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM } from '@/lib/motion';

export interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  /** Render as a motion element of this type. */
  as?: 'div' | 'li' | 'section' | 'article' | 'span' | 'header' | 'footer';
  once?: boolean;
}

/**
 * Scroll reveal. Respects `prefers-reduced-motion` by rendering the final state
 * immediately with no transform, so content is never trapped behind an
 * animation that will not run.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  duration = 0.6,
  as = 'div',
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2, margin: '0px 0px -60px 0px' }}
      transition={{ duration, delay, ease: EASE_PREMIUM }}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers its `RevealItem` children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.06,
  delayChildren = 0.04,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: 'div' | 'ul' | 'ol' | 'section';
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -60px 0px' }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  y = 20,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: 'div' | 'li' | 'article';
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_PREMIUM } },
      }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * CSS-only reveal driven by an IntersectionObserver. Used where a Framer
 * variant would add weight without benefit (e.g. long prose blocks).
 */
export function CssReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <div
      className={cn('reveal', className)}
      style={{ transitionDelay: `${delay}ms` }}
      ref={(node) => {
        if (!node) return;
        if (typeof IntersectionObserver === 'undefined') {
          node.classList.add('is-visible');
          return;
        }
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                node.classList.add('is-visible');
                observer.unobserve(node);
              }
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
        );
        observer.observe(node);
      }}
    >
      {children}
    </div>
  );
}
