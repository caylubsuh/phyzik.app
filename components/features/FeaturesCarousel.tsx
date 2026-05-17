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
  /** Direction of last navigation: +1 (next) or -1 (prev). Drives the
   *  AnimatePresence enter/exit direction so slides slide rather than fade. */
  const [direction, setDirection] = useState(1)
  /** Pauses autoplay on hover, focus, or user interaction. */
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

  const next = useCallback(
    () => goTo(active + 1, 1),
    [active, goTo],
  )
  const prev = useCallback(
    () => goTo(active - 1, -1),
    [active, goTo],
  )

  // Autoplay
  useEffect(() => {
    if (reduced || paused) return
    const id = window.setTimeout(() => next(), AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  }, [active, paused, reduced, next])

  // Keyboard nav while the carousel has focus
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

  // Touch / pointer swipe
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

  // Animation variants — both columns animate together, in the same direction.
  const variants = useMemo(
    () => ({
      enter: (d: number) => ({
        opacity: 0,
        x: d > 0 ? 40 : -40,
      }),
      center: { opacity: 1, x: 0 },
      exit: (d: number) => ({
        opacity: 0,
        x: d > 0 ? -40 : 40,
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
          {/* ─────────── Phone screenshot column ─────────── */}
          <div className="relative mx-auto w-full max-w-[260px] md:mx-0 md:max-w-[320px]">
            {/* Behind-glow that pulses subtly with each slide change */}
            <motion.div
              key={`glow-${active}`}
              aria-hidden="true"
              className="pointer-events-none absolute -inset-8 -z-10 scale-110 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(184,151,106,0.22) 0%, transparent 70%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />

            <div className="relative aspect-[1290/2796] w-full">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 260, damping: 30 },
                    opacity: { duration: 0.4, ease: 'easeOut' },
                  }}
                  drag={reduced ? undefined : 'x'}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={onDragEnd}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                >
                  <Image
                    src={current.image}
                    alt={current.imageAlt}
                    fill
                    sizes="(max-width: 768px) 70vw, 320px"
                    quality={95}
                    draggable={false}
                    priority={active === 0}
                    className="select-none object-contain"
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
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 260, damping: 30 },
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
          {/* Dot pagination with autoplay progress on active */}
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

          {/* Counter + arrow controls */}
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

      {/* Keep at least one FadeUp wrapping this section's mount so it aligns
          with the rest of the page reveal timing — visible only on first paint. */}
      <FadeUp className="sr-only" aria-hidden="true">
        <span />
      </FadeUp>
    </Section>
  )
}
