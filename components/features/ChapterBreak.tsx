'use client'

import { motion, useReducedMotion } from 'motion/react'

export default function ChapterBreak() {
  const reduced = useReducedMotion()
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(167,139,250,0.18) 0%, rgba(167,139,250,0.05) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/30 to-transparent md:w-48"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/30 to-transparent md:w-48"
      />
      <div className="mx-auto max-w-[1000px] px-6 text-center">
        <motion.p
          initial={reduced ? undefined : { opacity: 0, y: 30 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl font-bold leading-[1.1] tracking-tightest text-text-primary md:text-5xl lg:text-6xl"
        >
          {`We don't care who you are.`}{' '}
          <span className="text-accent">We care that you showed up.</span>
        </motion.p>
      </div>
    </section>
  )
}
