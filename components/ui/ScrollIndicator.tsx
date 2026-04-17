'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type ScrollIndicatorProps = {
  className?: string
}

export default function ScrollIndicator({ className }: ScrollIndicatorProps) {
  const reduced = useReducedMotion()
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setHidden(window.scrollY > 100)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const baseOpacity = hidden ? 0 : 1

  if (reduced) {
    return (
      <div
        className={cn(
          'flex flex-col items-center gap-3 transition-opacity duration-300',
          className,
        )}
        style={{ opacity: baseOpacity }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
          Scroll
        </span>
        <div className="h-10 w-[2px] rounded-full bg-white/15" />
      </div>
    )
  }

  return (
    <motion.div
      className={cn('flex flex-col items-center gap-3', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: baseOpacity }}
      transition={{ duration: 0.6, delay: hidden ? 0 : 1.5, ease: 'easeOut' }}
    >
      <span className="text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
        Scroll
      </span>
      <div className="relative h-10 w-[2px] overflow-hidden rounded-full bg-white/15">
        <motion.div
          className="absolute left-0 top-0 h-3 w-full rounded-full bg-white/80"
          initial={{ y: -12 }}
          animate={{ y: [-12, 40] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 0.2,
          }}
        />
      </div>
    </motion.div>
  )
}
