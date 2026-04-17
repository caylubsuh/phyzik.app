'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { ElementType } from 'react'
import { createElement } from 'react'
import { cn } from '@/lib/utils'

type LetterRevealProps = {
  text: string
  as?: ElementType
  className?: string
  startDelay?: number
}

const containerVariants = (startDelay: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2 + startDelay,
    },
  },
})

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function LetterReveal({
  text,
  as = 'h1',
  className,
  startDelay = 0,
}: LetterRevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return createElement(as, { className }, text)
  }

  const Wrapper = motion[as as 'h1']

  return (
    <Wrapper
      className={cn('inline-block overflow-hidden', className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants(startDelay)}
      aria-label={text}
    >
      {text.split('').map((char, i) => {
        if (char === ' ') {
          return (
            <span key={i} className="inline-block" aria-hidden="true">
              &nbsp;
            </span>
          )
        }
        return (
          <motion.span
            key={i}
            className="inline-block"
            variants={letterVariants}
            aria-hidden="true"
          >
            {char}
          </motion.span>
        )
      })}
    </Wrapper>
  )
}
