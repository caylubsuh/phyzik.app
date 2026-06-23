'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Star } from 'lucide-react'
import AppStoreBadge from '@/components/ui/AppStoreBadge'
import QRCode from '@/components/ui/QRCode'
import FadeUp from '@/components/motion/FadeUp'
import Wordmark from '@/components/brand/Wordmark'
import { APP_STORE_URL, BRAND } from '@/lib/constants'

export default function HeroContent() {
  const reduced = useReducedMotion()

  return (
    <div className="flex flex-col items-center gap-8 text-center md:gap-12">
      <motion.a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener"
        aria-label="PHYZIK is now live on the App Store — tap to open"
        initial={reduced ? undefined : { opacity: 0, y: -8 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="group inline-flex items-center gap-2 rounded-[3px] border border-border bg-bg-high/60 px-4 py-2 text-[13px] text-text-secondary backdrop-blur transition-colors hover:border-border-mid hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <span className="relative inline-flex h-1.5 w-1.5">
          {!reduced && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          )}
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        Now live on the App Store
      </motion.a>

      <h1 className="sr-only">{BRAND.name}</h1>
      <div className="relative">
        {reduced ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '140%',
              height: '280%',
              background:
                'radial-gradient(ellipse at center, rgba(168,137,46,0.35) 0%, rgba(168,137,46,0.12) 30%, transparent 65%)',
              filter: 'blur(40px)',
            }}
          />
        ) : (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
            animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
            style={{
              width: '140%',
              height: '280%',
              background:
                'radial-gradient(ellipse at center, rgba(168,137,46,0.35) 0%, rgba(168,137,46,0.12) 30%, transparent 65%)',
              filter: 'blur(40px)',
            }}
          />
        )}
        <Wordmark variant="hero" animate />
      </div>

      <FadeUp delay={0.6}>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
          The <span className="text-accent">social</span> training platform built for{' '}
          <span className="text-accent">lifters.</span>
        </h2>
      </FadeUp>

      <FadeUp delay={0.75}>
        <p className="max-w-[580px] text-base leading-relaxed text-text-secondary md:text-lg">
          {BRAND.description}
        </p>
      </FadeUp>

      <FadeUp delay={0.9}>
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <AppStoreBadge size="lg" />
          <QRCode />
        </div>
      </FadeUp>

      <FadeUp delay={1.05}>
        <div className="mt-2 flex items-center gap-3 text-[13px] text-text-tertiary">
          <span className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 fill-accent text-accent"
                aria-hidden="true"
              />
            ))}
          </span>
          <span>5.0 App Store</span>
          <span aria-hidden="true">•</span>
          <span>Free to start</span>
          <span aria-hidden="true">•</span>
          <span>iOS &amp; Android</span>
        </div>
      </FadeUp>
    </div>
  )
}
