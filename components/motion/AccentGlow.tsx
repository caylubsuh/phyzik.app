'use client'

import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type Position =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'center'
  | 'bottom-center'

type Size = 'sm' | 'md' | 'lg' | 'xl'

type AccentGlowProps = {
  position?: Position
  size?: Size
  intensity?: number
  className?: string
}

const sizeMap: Record<Size, number> = {
  sm: 400,
  md: 600,
  lg: 900,
  xl: 1200,
}

const positionMap: Record<Position, string> = {
  'top-left': 'top-0 left-0 -translate-x-1/3 -translate-y-1/3',
  'top-right': 'top-0 right-0 translate-x-1/3 -translate-y-1/3',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/3',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3',
}

export default function AccentGlow({
  position = 'top-center',
  size = 'lg',
  intensity = 0.35,
  className,
}: AccentGlowProps) {
  const reduced = useReducedMotion()
  const px = sizeMap[size]

  const style = {
    width: px,
    height: px,
    background:
      'radial-gradient(circle, rgba(193,159,47,0.9) 0%, rgba(193,159,47,0) 65%)',
  } as const

  if (reduced) {
    return (
      <div
        aria-hidden="true"
        style={{ ...style, opacity: intensity }}
        className={cn('pointer-events-none absolute z-0', positionMap[position], className)}
      />
    )
  }

  return (
    <motion.div
      aria-hidden="true"
      style={style}
      initial={{ opacity: intensity * 0.7 }}
      animate={{
        opacity: [intensity * 0.7, intensity, intensity * 0.7],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className={cn('pointer-events-none absolute z-0', positionMap[position], className)}
    />
  )
}
