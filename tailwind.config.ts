import type { Config } from 'tailwindcss';

/**
 * Trisentri AI design system.
 *
 * The palette is intentionally small and brand-locked:
 *   brand   #2457FF  electric blue  (primary, structural)
 *   accent  #C8FF3D  lime           (micro-accents only, never dominant)
 * Everything else is a neutral from the approved light-theme scale.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2457FF',
          50: '#EEF3FF',
          100: '#DDE6FF',
          200: '#BCCFFF',
          300: '#93AEFF',
          400: '#6D8DFF',
          500: '#4A73FF',
          600: '#2457FF',
          700: '#1A43D6',
          800: '#1535A8',
          900: '#0F2580',
        },
        accent: {
          DEFAULT: '#C8FF3D',
          soft: '#E7FFA8',
          deep: '#A8DB18',
        },
        ink: {
          DEFAULT: '#101828',
          soft: '#475467',
          muted: '#667085',
        },
        line: '#E4E7EC',
        canvas: '#F7F9FC',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 1.2rem + 5.4vw, 5.25rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.25rem, 1.3rem + 3.8vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.875rem, 1.3rem + 2.2vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)', { lineHeight: '1.14', letterSpacing: '-0.02em' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.7' }],
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      borderRadius: {
        xl2: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.75rem',
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 10px 40px rgba(16, 24, 40, 0.06)',
        'card-hover': '0 24px 60px rgba(16, 24, 40, 0.10)',
        blue: '0 12px 32px rgba(36, 87, 255, 0.24)',
        'blue-sm': '0 4px 14px rgba(36, 87, 255, 0.20)',
        hairline: 'inset 0 0 0 1px rgba(228, 231, 236, 1)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #2457FF 0%, #6D8DFF 100%)',
        'brand-soft': 'linear-gradient(180deg, rgba(238,243,255,0) 0%, rgba(238,243,255,0.9) 100%)',
        'grid-line':
          'linear-gradient(to right, rgba(16,24,40,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,24,40,0.055) 1px, transparent 1px)',
        'grid-dot': 'radial-gradient(rgba(36, 87, 255, 0.16) 1px, transparent 1px)',
        'noise':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      maxWidth: {
        container: '80rem',
        prose: '46rem',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
        swift: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'float-y': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-y-lg': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(2%, -3%, 0) scale(1.06)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'pulse-node': {
          '0%,100%': { opacity: '0.25', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.35)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        'marquee-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'float-y': 'float-y 7s cubic-bezier(0.45,0,0.55,1) infinite',
        'float-y-lg': 'float-y-lg 9s cubic-bezier(0.45,0,0.55,1) infinite',
        drift: 'drift 22s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        'pulse-node': 'pulse-node 3.2s cubic-bezier(0.45,0,0.55,1) infinite',
        'scan-line': 'scan-line 9s linear infinite',
        'marquee-x': 'marquee-x 42s linear infinite',
        'fade-in': 'fade-in 0.5s var(--ease-premium) both',
      },
    },
  },
  plugins: [],
};

export default config;
