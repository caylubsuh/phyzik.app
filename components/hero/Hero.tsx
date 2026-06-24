'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Star } from 'lucide-react'
import Container from '@/components/ui/Container'
import AppStoreBadge from '@/components/ui/AppStoreBadge'
import GooglePlayBadge from '@/components/ui/GooglePlayBadge'
import QRCode from '@/components/ui/QRCode'
import Wordmark from '@/components/brand/Wordmark'
import HeroBackground from './HeroBackground'
import { BRAND } from '@/lib/constants'

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Hero() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const videoY = useTransform(scrollY, [0, 500], [0, -40], { clamp: true })

  return (
    <section
      role="banner"
      aria-label={`${BRAND.name} — ${BRAND.tagline}`}
      className="relative flex flex-col items-stretch justify-start overflow-hidden pb-16 pt-28 md:pb-20 md:pt-32"
    >
      <HeroBackground />

      <Container className="relative z-10 flex-1">
        <div className="grid h-full items-center gap-14 md:grid-cols-[1.05fr_0.95fr] md:gap-16 lg:gap-24">
          <div className="flex flex-col items-start gap-6 md:gap-7">
            <motion.span
              aria-hidden="true"
              initial={reduced ? undefined : { opacity: 0, y: -6 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-high/60 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-text-secondary backdrop-blur"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Now live on iOS &amp; Android
            </motion.span>

            <h1 className="sr-only">{BRAND.name}</h1>
            <div className="relative w-full max-w-[640px]">
              <Wordmark variant="hero" animate />
            </div>

            <motion.h2
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE_OUT_EXPO }}
              className="max-w-[620px] text-balance text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-text-primary"
            >
              The social training platform for{' '}
              <span className="text-shimmer-gold">lifters.</span>
            </motion.h2>

            <motion.p
              initial={reduced ? undefined : { opacity: 0, y: 10 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
              className="max-w-[520px] text-base leading-relaxed text-text-secondary md:text-lg"
            >
              {BRAND.description}
            </motion.p>

            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 10 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75, ease: 'easeOut' }}
              className="flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-6"
            >
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <AppStoreBadge size="lg" />
                <GooglePlayBadge size="lg" />
              </div>
              <QRCode />
            </motion.div>

            <motion.div
              initial={reduced ? undefined : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.95 }}
              className="flex items-center gap-3 text-[13px] text-text-tertiary"
            >
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
            </motion.div>
          </div>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 36, scale: 0.96 }}
            animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={reduced ? undefined : { y: videoY }}
            className="relative mx-auto w-full max-w-[400px] md:mx-0 md:max-w-none"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-8 scale-105 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(168,137,46,0.28) 0%, rgba(168,137,46,0.08) 50%, transparent 75%)',
              }}
            />

            <div className="relative mx-auto w-full max-w-[400px] overflow-hidden rounded-[44px] border border-border-mid bg-bg-high/40 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7),0_0_0_1px_rgba(168,137,46,0.06)] md:ml-auto md:mr-0">
              <video
                src="/videos/launch-01.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="block aspect-[9/16] w-full object-cover"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[44px]"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 70%, rgba(5,5,6,0.25) 100%)',
                }}
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
