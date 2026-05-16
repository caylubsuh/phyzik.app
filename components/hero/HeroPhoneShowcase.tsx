'use client'

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import PhoneFrame from '@/components/ui/PhoneFrame'

export default function HeroPhoneShowcase() {
  const reduced = useReducedMotion()

  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 400], [0, -60], { clamp: true })

  return (
    <div
      className="relative"
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 scale-125 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0) 70%)',
        }}
      />

      <motion.div
        className="relative"
        style={reduced ? undefined : { y: parallaxY }}
      >
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 80, rotateX: 15 }}
          animate={reduced ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <PhoneFrame
            screenshot="/screenshots/marketing/01-floor-post.png"
            alt="PHYZIK Floor social feed post from a completed workout"
            priority
            className="max-w-[360px]"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
