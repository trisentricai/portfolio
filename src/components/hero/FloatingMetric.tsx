import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM } from '@/lib/motion';

export interface FloatingMetricProps {
  label: string;
  value: string;
  detail?: string;
  icon?: ReactNode;
  /** Tailwind position classes — deliberately kept out of the data layer. */
  className?: string;
  delay?: number;
  /** Parallax strength in px at full pointer deflection. */
  depth?: number;
  style?: React.CSSProperties;
}

/**
 * Glass telemetry card that floats around the hero visualization.
 *
 * Values are sample interface readings for design purposes — see the caption
 * rendered beneath the visualization cluster.
 */
export function FloatingMetric({
  label,
  value,
  detail,
  icon,
  className,
  delay = 0,
  depth = 10,
  style,
}: FloatingMetricProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, delay, ease: EASE_PREMIUM }}
      style={style}
      className={cn('absolute z-10', className)}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="group/metric pointer-events-none"
      >
        <div
          data-parallax-depth={depth}
          className="relative w-[10.5rem] overflow-hidden rounded-2xl border border-white/80 bg-white/75 p-3.5 shadow-card backdrop-blur-xl transition-transform duration-300 ease-premium sm:w-[11.5rem]"
        >
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
            aria-hidden="true"
          />
          <div className="flex items-center gap-1.5">
            {icon ? <span className="text-brand">{icon}</span> : null}
            <p className="font-mono text-[0.5625rem] font-medium uppercase tracking-[0.16em] text-ink-muted">
              {label}
            </p>
          </div>
          <p className="mt-2 font-display text-[1.375rem] font-semibold leading-none tracking-[-0.02em] text-ink">
            {value}
          </p>
          {detail ? <p className="mt-1 text-[0.6875rem] leading-snug text-ink-muted">{detail}</p> : null}
        </div>
      </motion.div>
    </motion.div>
  );
}

export interface FloatingMetricsLayerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Applies a gentle pointer-driven parallax to any descendant marked with
 * `data-parallax-depth`. Implemented with a single rAF loop and direct style
 * writes so it never triggers React re-renders during pointer movement.
 */
export function FloatingMetricsLayer({ children, className }: FloatingMetricsLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const parent = layer?.parentElement;
    if (!layer || !parent) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;
    let running = false;

    const targets = Array.from(layer.querySelectorAll<HTMLElement>('[data-parallax-depth]'));
    if (targets.length === 0) return;

    const tick = () => {
      currentX += (pointerX - currentX) * 0.08;
      currentY += (pointerY - currentY) * 0.08;

      for (const target of targets) {
        const depth = Number(target.dataset.parallaxDepth ?? 8);
        target.style.transform = `translate3d(${(-currentX * depth * 2).toFixed(2)}px, ${(-currentY * depth * 1.4).toFixed(2)}px, 0)`;
      }

      const settled = Math.abs(pointerX - currentX) < 0.0008 && Math.abs(pointerY - currentY) < 0.0008;
      frame = settled ? 0 : requestAnimationFrame(tick);
      if (settled) running = false;
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      pointerY = (event.clientY - rect.top) / rect.height - 0.5;
      start();
    };

    const onLeave = () => {
      pointerX = 0;
      pointerY = 0;
      start();
    };

    parent.addEventListener('pointermove', onMove, { passive: true });
    parent.addEventListener('pointerleave', onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      running = false;
      parent.removeEventListener('pointermove', onMove);
      parent.removeEventListener('pointerleave', onLeave);
      targets.forEach((target) => {
        target.style.transform = '';
      });
    };
  }, []);

  return (
    <div ref={layerRef} className={cn('pointer-events-none absolute inset-0', className)}>
      {children}
    </div>
  );
}
