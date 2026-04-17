'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { createElement } from 'react'
import { fadeUp, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

type MotionTag = keyof typeof motion

type FadeUpProps = {
  children: ReactNode
  as?: MotionTag
  delay?: number
  className?: string
}

export default function FadeUp({
  children,
  as = 'div',
  delay = 0,
  className,
}: FadeUpProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return createElement(as as string, { className }, children)
  }

  const MotionComponent = motion[as] as React.ComponentType<HTMLMotionProps<'div'>>

  return (
    <MotionComponent
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionComponent>
  )
}
