'use client'

import { motion } from 'motion/react'
import { APP_STORE_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

type Size = 'sm' | 'md' | 'lg'

type AppStoreBadgeProps = {
  size?: Size
  className?: string
}

const sizeMap: Record<Size, { height: string; apple: string; small: string; large: string; gap: string; pad: string }> = {
  sm: {
    height: 'h-11',
    apple: 'h-5 w-5',
    small: 'text-[8px]',
    large: 'text-[14px]',
    gap: 'gap-2',
    pad: 'px-4',
  },
  md: {
    height: 'h-12',
    apple: 'h-6 w-6',
    small: 'text-[9px]',
    large: 'text-[16px]',
    gap: 'gap-2.5',
    pad: 'px-4',
  },
  lg: {
    height: 'h-14',
    apple: 'h-7 w-7',
    small: 'text-[10px]',
    large: 'text-[19px]',
    gap: 'gap-3',
    pad: 'px-5',
  },
}

export default function AppStoreBadge({ size = 'lg', className }: AppStoreBadgeProps) {
  const s = sizeMap[size]
  return (
    <motion.a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener"
      data-track="app-store-badge"
      aria-label="Download on the App Store"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={cn(
        'group inline-flex items-center rounded-xl bg-black text-white transition-colors hover:bg-[#1C1C1F]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        s.height,
        s.pad,
        s.gap,
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className={cn('shrink-0', s.apple)} aria-hidden="true">
        <path
          fill="currentColor"
          d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.09-.47-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
        />
      </svg>
      <span className="flex flex-col items-start leading-none">
        <span className={cn('font-medium uppercase tracking-wide opacity-90', s.small)}>
          Download on the
        </span>
        <span className={cn('font-semibold tracking-tight', s.large)}>App Store</span>
      </span>
    </motion.a>
  )
}
