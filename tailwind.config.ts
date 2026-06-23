import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          deep: '#050506',
          DEFAULT: '#0A0A0B',
          low: '#111113',
          surface: '#141416',
          high: '#1C1C1F',
          top: '#252528',
        },
        text: {
          primary: '#F2F2F3',
          secondary: '#8A8A8E',
          tertiary: '#71717A',
          inverse: '#0A0A0B',
        },
        // PRIMARY ACCENT — metallic gold. CTAs, links, icons, glows, ratings, PR accents.
        accent: {
          DEFAULT: '#A8892E',
          light: 'rgba(168,137,46,0.08)',
          dark: '#856A1F',
          dim: 'rgba(168,137,46,0.12)',
          bubble: 'rgba(168,137,46,0.30)',
          mid: '#B8902F',
          bright: '#C9A94E',
        },
        // TERTIARY ONLY — lavender. Muscle-map highlight + data viz. NEVER a CTA/hero/live accent.
        tertiary: {
          DEFAULT: '#A78BFA',
          light: 'rgba(167,139,250,0.08)',
          dark: '#8B6FE0',
          dim: 'rgba(167,139,250,0.12)',
          bubble: 'rgba(167,139,250,0.30)',
          mid: '#9A7EF0',
        },
        // Gold scale (aligned with accent).
        gold: {
          DEFAULT: '#A8892E',
          dark: '#856A1F',
          light: '#C9A94E',
          bright: '#E8D9A8',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.07)',
          mid: 'rgba(255,255,255,0.10)',
          strong: 'rgba(255,255,255,0.16)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-archivo)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
      },
      spacing: {
        '13': '3.25rem',
        '18': '4.5rem',
        '22': '5.5rem',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-180% center' },
          '100%': { backgroundPosition: '180% center' },
        },
        'slow-drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(0, -8%, 0) scale(1.06)' },
        },
      },
      animation: {
        shimmer: 'shimmer 7s linear infinite',
        'slow-drift': 'slow-drift 14s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
