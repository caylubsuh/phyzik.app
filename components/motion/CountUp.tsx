'use client'

import { useEffect, useRef, useState } from 'react'
import {
  animate,
  useInView,
  useReducedMotion,
} from 'motion/react'
import { cn } from '@/lib/utils'

type CountUpProps = {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export default function CountUp({
  value,
  suffix = '',
  duration = 1.8,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(reduced ? value : 0)

  useEffect(() => {
    if (reduced) {
      setDisplay(value)
      return
    }
    if (!inView) return
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate(latest) {
        setDisplay(Math.round(latest))
      },
    })
    return () => controls.stop()
  }, [inView, reduced, value, duration])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}
