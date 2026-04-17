'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type Variant = 'hero' | 'nav'

type WordmarkProps = {
  variant?: Variant
  animate?: boolean
  src?: string
  className?: string
}

const INTRINSIC_WIDTH = 2046
const INTRINSIC_HEIGHT = 307

const variantSizeClass: Record<Variant, string> = {
  nav: 'h-7 w-auto',
  hero:
    'h-auto w-[280px] sm:w-[440px] md:w-[640px] lg:w-[820px] xl:w-[980px]',
}

export default function Wordmark({
  variant = 'nav',
  animate = false,
  src = '/brand/phyzik-wordmark-white.png',
  className,
}: WordmarkProps) {
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!animate || reduced) {
    return (
      <Image
        src={src}
        alt="PHYZIK"
        width={INTRINSIC_WIDTH}
        height={INTRINSIC_HEIGHT}
        priority={variant === 'hero'}
        draggable={false}
        sizes={variant === 'hero' ? '(max-width: 1024px) 80vw, 980px' : '200px'}
        className={cn(
          'select-none transition-opacity duration-300 ease-out',
          variantSizeClass[variant],
          !animate && !mounted ? 'opacity-0' : 'opacity-100',
          className,
        )}
      />
    )
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 1.08,
        filter: 'blur(40px)',
        clipPath: 'inset(0 100% 0 0)',
      }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        clipPath: 'inset(0 0 0 0)',
      }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="inline-block"
    >
      <Image
        src={src}
        alt="PHYZIK"
        width={INTRINSIC_WIDTH}
        height={INTRINSIC_HEIGHT}
        priority
        draggable={false}
        sizes="(max-width: 1024px) 80vw, 980px"
        className={cn('select-none', variantSizeClass[variant], className)}
      />
    </motion.div>
  )
}
