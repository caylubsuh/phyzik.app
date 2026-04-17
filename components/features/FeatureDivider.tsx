'use client'

import { motion, useReducedMotion } from 'motion/react'

export default function FeatureDivider() {
  const reduced = useReducedMotion()
  return (
    <div aria-hidden="true" className="relative flex items-center justify-center py-12">
      <motion.div
        className="h-px w-32 bg-gradient-to-r from-transparent via-accent/40 to-transparent md:w-48"
        initial={{ opacity: 0, scaleX: 0.3 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={reduced ? { opacity: 1, transform: 'none' } : undefined}
      />
    </div>
  )
}
