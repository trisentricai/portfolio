import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

export interface LogoProps {
  className?: string;
  /** Compact mark only — used in tight spaces. */
  markOnly?: boolean;
  /** Inverted colours for use on dark surfaces. */
  inverted?: boolean;
  asLink?: boolean;
}

/**
 * The Trisentri mark: three nodes of a triangle, two blue and one lime.
 * Built from the same geometry as the favicon so the identity is consistent
 * at every size. No external logo asset is required.
 */
export function LogoMark({ className, animated = true }: { className?: string; animated?: boolean }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="Trisentri AI"
      className={cn('h-8 w-8 shrink-0', className)}
    >
      <defs>
        <linearGradient id="ts-mark-stroke" x1="4" y1="6" x2="27" y2="25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2457FF" />
          <stop offset="1" stopColor="#6D8DFF" />
        </linearGradient>
      </defs>

      {/* Outer triangle */}
      <path
        d="M16 4.6 L27.4 25.2 H4.6 Z"
        stroke="url(#ts-mark-stroke)"
        strokeWidth="2.1"
        strokeLinejoin="round"
        className="origin-center"
      />

      {/* Inner triangle — the "tri" in trisentri */}
      <path
        d="M16 11.4 L22.3 23.4 H9.7 Z"
        stroke="#6D8DFF"
        strokeOpacity="0.55"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />

      {/* Nodes */}
      <circle cx="16" cy="4.6" r="3.1" fill="#2457FF" />
      <circle cx="27.4" cy="25.2" r="3.1" fill="#2457FF" />
      <circle
        cx="4.6"
        cy="25.2"
        r="3.1"
        fill="#C8FF3D"
        stroke="#FFFFFF"
        strokeWidth="1.3"
        className={animated ? 'origin-center' : undefined}
      />
    </svg>
  );
}

export function Logo({ className, markOnly = false, inverted = false, asLink = true }: LogoProps) {
  const content = (
    <span className={cn('group/logo inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      {!markOnly ? (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-display text-[1.0625rem] font-bold uppercase leading-none tracking-[-0.01em]',
              inverted ? 'text-white' : 'text-ink',
            )}
          >
            Trisentri
          </span>
          <span
            className={cn(
              'mt-[3px] font-mono text-[0.5625rem] font-medium uppercase leading-none tracking-[0.42em]',
              inverted ? 'text-brand-300' : 'text-brand',
            )}
          >
            AI
          </span>
        </span>
      ) : null}
    </span>
  );

  if (!asLink) return content;

  return (
    <Link
      to="/"
      aria-label="Trisentri AI — home"
      className="inline-flex rounded-lg transition-opacity duration-200 hover:opacity-85"
    >
      {content}
    </Link>
  );
}
