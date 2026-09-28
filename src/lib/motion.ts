import type { Transition, Variants } from 'framer-motion';

/**
 * Motion language.
 *
 * Three speeds, one easing family. Anything that moves more than 8px or
 * changes opacity uses these presets so the whole site feels like one system.
 */
export const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_SWIFT: [number, number, number, number] = [0.4, 0, 0.2, 1];

/** 150–200ms — hovers, small state changes. */
export const transitionFast: Transition = { duration: 0.18, ease: EASE_SWIFT };
/** 300–500ms — reveals, card entrances, menu panels. */
export const transitionNormal: Transition = { duration: 0.5, ease: EASE_PREMIUM };
/** 600–900ms — hero choreography, large surfaces. */
export const transitionLarge: Transition = { duration: 0.8, ease: EASE_PREMIUM };

/** Container that reveals children with a small, consistent stagger. */
export const staggerContainer = (stagger = 0.06, delayChildren = 0.04): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Default child of `staggerContainer`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: transitionNormal },
};

/** Slightly tighter, for grids of small items. */
export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_PREMIUM } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_PREMIUM } },
};

/** Scale-in used for hero graphics and glass cards. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.85, ease: EASE_PREMIUM } },
};

/** Shared `whileInView` config so reveals trigger at the same threshold. */
export const inView = { once: true, amount: 0.2, margin: '0px 0px -80px 0px' } as const;

/** Viewport presets exported as a const object for compact prop spreading. */
export const viewportOnce = { once: true, amount: 0.18 } as const;
