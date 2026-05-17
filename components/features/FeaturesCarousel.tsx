'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from 'motion/react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import FadeUp from '@/components/motion/FadeUp'
import { FEATURES } from '@/lib/features'
import { cn } from '@/lib/utils'

const AUTOPLAY_MS = 6500
const SWIPE_VELOCITY_THRESHOLD = 350
const SWIPE_OFFSET_THRESHOLD = 80

function splitBody(body: string): { lead: string; rest: string | null } {
  const idx = body.indexOf('. ')
  if (idx === -1) return { lead: body, rest: null }
  return { lead: body.slice(0, idx + 1), rest: body.slice(idx + 2) }
}

export default function FeaturesCarousel() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const total = FEATURES.length
  const current = FEATURES[active]
  const { lead, rest } = useMemo(() => splitBody(current.body), [current.body])

  const goTo = useCallback(
    (next: number, dir: 1 | -1 = 1) => {
      setDirection(dir)
      setActive(((next % total) + total) % total)
    },
    [total],
  )

  const next = useCallback(() => goTo(active + 1, 1), [active, goTo])
  const prev = useCallback(() => goTo(active - 1, -1), [active, goTo])

  // Autoplay
  useEffect(() => {
    if (reduced || paused) return
    const id = window.setTimeout(() => next(), AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  }, [active, paused, reduced, next])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      }
    },
    [next, prev],
  )

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const { offset, velocity } = info
      if (offset.x < -SWIPE_OFFSET_THRESHOLD || velocity.x < -SWIPE_VELOCITY_THRESHOLD) {
        next()
      } else if (offset.x > SWIPE_OFFSET_THRESHOLD || velocity.x > SWIPE_VELOCITY_THRESHOLD) {
        prev()
      }
    },
    [next, prev],
  )

  /**
   * SCREENSHOT variants — 3D rotation around the Y axis.
   * Outgoing slide rotates away from camera + slides + scales down.
   * Incoming slide enters from opposite rotation, rotates into place.
   * Perspective wrapper on the parent makes the rotation feel volumetric.
   */
  const screenshotVariants = useMemo(
    () => ({
      enter: (d: number) => ({
        opacity: 0,
        x: d > 0 ? 90 : -90,
        rotateY: d > 0 ? 35 : -35,
        scale: 0.86,
        filter: 'blur(6px)',
      }),
      center: {
        opacity: 1,
        x: 0,
        rotateY: 0,
        scale: 1,
        filter: 'blur(0px)',
      },
      exit: (d: number) => ({
        opacity: 0,
        x: d > 0 ? -90 : 90,
        rotateY: d > 0 ? -35 : 35,
        scale: 0.86,
        filter: 'blur(6px)',
      }),
    }),
    [],
  )

  /** COPY variants — gentler, no rotation. Lets the screenshot be the star. */
  const copyVariants = useMemo(
    () => ({
      enter: (d: number) => ({
        opacity: 0,
        y: 18,
        x: d > 0 ? 14 : -14,
      }),
      center: { opacity: 1, y: 0, x: 0 },
      exit: (d: number) => ({
        opacity: 0,
        y: -10,
        x: d > 0 ? -14 : 14,
      }),
    }),
    [],
  )

  return (
    <Section spacing="loose" className="relative overflow-hidden">
      {/* Section-anchored bronze halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[1100px] -translate-x-1/2 -translate-y-1/2 animate-slow-drift opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(184,151,106,0.18) 0%, transparent 65%)',
        }}
      />

      <div
        className="relative outline-none"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="PHYZIK features"
      >
        <div className="grid items-center gap-10 md:grid-cols-[0.85fr_1fr] md:gap-16 lg:gap-24">
          {/* ─────────── Screenshot column with 3D perspective ─────────── */}
          <div
            className="relative mx-auto w-full max-w-[260px] md:mx-0 md:max-w-[320px]"
            style={{
              perspective: 1400,
              perspectiveOrigin: 'center center',
            }}
          >
            {/* Behind-glow that pulses subtly with each slide change */}
            <motion.div
              key={`glow-${active}`}
              aria-hidden="true"
              className="pointer-events-none absolute -inset-10 -z-10 scale-110 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(184,151,106,0.26) 0%, transparent 70%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />

            <div
              className="relative aspect-[1290/2796] w-full"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={screenshotVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 220, damping: 28, mass: 0.9 },
                    rotateY: { type: 'spring', stiffness: 220, damping: 28, mass: 0.9 },
                    scale: { type: 'spring', stiffness: 240, damping: 26 },
                    opacity: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                    filter: { duration: 0.4, ease: 'easeOut' },
                  }}
                  drag={reduced ? undefined : 'x'}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={onDragEnd}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center',
                  }}
                >
                  {/* Edge highlight that catches "light" as the screenshot rotates */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[40px]"
                    style={{
                      background:
                        'linear-gradient(115deg, transparent 38%, rgba(255,255,255,0.06) 50%, transparent 62%)',
                      zIndex: 2,
                    }}
                  />
                  <Image
                    src={current.image}
                    alt={current.imageAlt}
                    fill
                    sizes="(max-width: 768px) 70vw, 320px"
                    quality={95}
                    draggable={false}
                    priority={active === 0}
                    className="select-none object-contain"
                    style={{
                      // Soft drop-shadow that adds dimensionality during rotation
                      filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))',
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ─────────── Copy column ─────────── */}
          <div className="relative min-h-[280px] md:min-h-[340px]">
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={copyVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 260, damping: 30 },
                  y: { type: 'spring', stiffness: 260, damping: 30 },
                  opacity: { duration: 0.4, ease: 'easeOut' },
                }}
                className="flex flex-col gap-5"
              >
                <Pill>{current.pill}</Pill>

                <h3 className="max-w-[520px] text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold leading-[1.05] tracking-tightest text-text-primary">
                  {lead}
                </h3>

                {rest && (
                  <p className="max-w-[520px] text-[15px] leading-relaxed text-text-secondary md:text-[17px]">
                    {rest}
                  </p>
                )}

                {current.bullets && current.bullets.length > 0 && (
                  <ul className="mt-1 flex flex-col gap-2.5">
                    {current.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-[14.5px] text-text-secondary"
                      >
                        <Check
                          className="mt-1 h-4 w-4 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ─────────── Controls strip ─────────── */}
        <div className="mt-14 flex flex-col items-center gap-5 md:mt-16">
          <div className="flex items-center gap-2.5" role="tablist" aria-label="Feature">
            {FEATURES.map((f, i) => {
              const isActive = i === active
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show ${f.pill}`}
                  onClick={() => goTo(i, i > active ? 1 : -1)}
                  className={cn(
                    'relative h-2 overflow-hidden rounded-full transition-all duration-500',
                    isActive
                      ? 'w-10 bg-border-mid'
                      : 'w-2 bg-border-mid hover:bg-border-strong',
                  )}
                >
                  {isActive && !reduced && !paused && (
                    <motion.span
                      key={`progress-${active}`}
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 bg-accent"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{
                        duration: AUTOPLAY_MS / 1000,
                        ease: 'linear',
                      }}
                    />
                  )}
                  {isActive && (reduced || paused) && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-accent"
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous feature"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-mid text-text-secondary transition-colors hover:border-border-strong hover:bg-white/5 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <span className="font-mono text-[12px] tabular-nums tracking-tight text-text-tertiary">
              {String(active + 1).padStart(2, '0')}
              <span className="mx-2 text-border-strong">/</span>
              {String(total).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={next}
              aria-label="Next feature"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-mid text-text-secondary transition-colors hover:border-border-strong hover:bg-white/5 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <FadeUp className="sr-only" aria-hidden="true">
        <span />
      </FadeUp>
    </Section>
  )
}
