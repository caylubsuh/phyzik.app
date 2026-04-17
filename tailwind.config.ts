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
        accent: {
          DEFAULT: '#A78BFA',
          light: 'rgba(167,139,250,0.08)',
          dark: '#8B6FE0',
          dim: 'rgba(167,139,250,0.12)',
          bubble: 'rgba(167,139,250,0.30)',
          mid: '#9A7EF0',
        },
        gold: {
          DEFAULT: '#B8976A',
          dark: '#997B54',
          light: '#C5A77D',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.07)',
          mid: 'rgba(255,255,255,0.10)',
          strong: 'rgba(255,255,255,0.16)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config
