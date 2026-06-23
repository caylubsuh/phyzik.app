'use client'

import { motion } from 'motion/react'
import { PLAY_STORE_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

type Size = 'sm' | 'md' | 'lg'

type GooglePlayBadgeProps = {
  size?: Size
  className?: string
}

const sizeMap: Record<Size, { height: string; icon: string; small: string; large: string; gap: string; pad: string }> = {
  sm: { height: 'h-11', icon: 'h-5 w-5', small: 'text-[8px]', large: 'text-[14px]', gap: 'gap-2', pad: 'px-4' },
  md: { height: 'h-12', icon: 'h-6 w-6', small: 'text-[9px]', large: 'text-[16px]', gap: 'gap-2.5', pad: 'px-4' },
  lg: { height: 'h-14', icon: 'h-7 w-7', small: 'text-[10px]', large: 'text-[19px]', gap: 'gap-3', pad: 'px-5' },
}

export default function GooglePlayBadge({ size = 'lg', className }: GooglePlayBadgeProps) {
  const s = sizeMap[size]
  return (
    <motion.a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener"
      data-track="google-play-badge"
      aria-label="Get it on Google Play"
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
      <svg viewBox="0 0 24 24" className={cn('shrink-0', s.icon)} aria-hidden="true">
        <path fill="#00D2FF" d="M3.3 2.4C3.1 2.6 3 2.9 3 3.4v17.2c0 .5.1.8.4 1l.1.1 9.6-9.6v-.2L3.4 2.3z" />
        <path fill="#FFCB00" d="M16.4 15.5l-3.3-3.3v-.3l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.6 0 2.3l-3.9 2.2z" />
        <path fill="#FF3D44" d="M16.5 15.4 13.1 12 3.3 21.7c.4.4 1 .4 1.6.1l11.6-6.4z" />
        <path fill="#00D387" d="M3.3 2.3 13.1 12l3.4-3.4L4.9 2.2c-.6-.3-1.2-.3-1.6.1z" />
      </svg>
      <span className="flex flex-col items-start leading-none">
        <span className={cn('font-medium uppercase tracking-wide opacity-90', s.small)}>
          Get it on
        </span>
        <span className={cn('font-semibold tracking-tight', s.large)}>Google Play</span>
      </span>
    </motion.a>
  )
}
