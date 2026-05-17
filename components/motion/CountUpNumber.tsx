'use client'

import { useEffect, useRef } from 'react'
import { animate, useInView, useMotionValue, useTransform } from 'motion/react'

type Props = {
  /** Final numeric value to count up to. */
  to: number
  /** Number of decimal places. Default 2. */
  decimals?: number
  /** Animation duration in seconds. Default 1.6. */
  duration?: number
  /** Starting value. Default 0. */
  from?: number
  className?: string
}

/**
 * Animates a number counting up from `from` to `to` once the element enters
 * the viewport. Renders inside a <span>. Respects reduced-motion preferences
 * by snapping to the final value.
 */
export default function CountUpNumber({
  to,
  decimals = 2,
  duration = 1.6,
  from = 0,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  const value = useMotionValue(from)
  const display = useTransform(value, (v) => v.toFixed(decimals))

  useEffect(() => {
    if (!inView) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      value.set(to)
      return
    }

    const controls = animate(value, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    })
    return () => controls.stop()
  }, [inView, to, duration, value])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const unsub = display.on('change', (v) => {
      el.textContent = v
    })
    el.textContent = from.toFixed(decimals)
    return () => unsub()
  }, [display, decimals, from])

  return <span ref={ref} className={className} aria-hidden="true" />
}
