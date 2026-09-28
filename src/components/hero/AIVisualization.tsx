import { Suspense, lazy, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { CONFIG } from '@/lib/config';
import { LatticeStatic } from './LatticeStatic';

/**
 * The 3D engine is only pulled in on the home page, and only when the device
 * can actually run it. Everything else resolves to the static projection.
 */
const LatticeCanvas = lazy(() =>
  import('./LatticeCanvas').then((module) => ({ default: module.LatticeCanvas })),
);

function hasWebGL(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!gl) return false;
    const loseContext = gl.getExtension('WEBGL_lose_context');
    loseContext?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export interface AIVisualizationProps {
  className?: string;
  /** Reduced node count and DPR — used below the `lg` breakpoint. */
  compact?: boolean;
}

/**
 * Abstract AI lattice.
 *
 * Decisions are made in order of cost: reduced motion → no WebGL → low core
 * count → single-column layout. At no point does the section render empty; the
 * static projection is always available.
 */
export function AIVisualization({ className, compact = false }: AIVisualizationProps) {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<'checking' | 'ready' | 'unsupported'>('checking');

  useEffect(() => {
    if (reduce || !CONFIG.enableHero3D) {
      setStatus('unsupported');
      return;
    }
    if (typeof navigator !== 'undefined' && typeof navigator.hardwareConcurrency === 'number') {
      if (navigator.hardwareConcurrency <= 2) {
        setStatus('unsupported');
        return;
      }
    }
    setStatus(hasWebGL() ? 'ready' : 'unsupported');
  }, [reduce]);

  return (
    <div className={className} aria-hidden="true">
      <div className="relative h-full w-full">
        {status === 'ready' ? (
          <Suspense fallback={<LatticeStatic compact={compact} />}>
            <LatticeCanvas compact={compact} interactive={!reduce} />
          </Suspense>
        ) : (
          <LatticeStatic compact={compact} />
        )}
      </div>
    </div>
  );
}

export default AIVisualization;
