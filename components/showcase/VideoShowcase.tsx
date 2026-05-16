'use client'

import { useEffect, useRef, useState } from 'react'
import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import FadeUp from '@/components/motion/FadeUp'

const VIDEOS = [
  {
    src: '/videos/launch-02.mp4',
    label: 'Your profile',
    sub: 'Streaks, weight, workouts completed — your training history, owned.',
  },
  {
    src: '/videos/launch-04.mp4',
    label: 'The session',
    sub: 'Live rest timer. Auto-suggested loads. PRs flagged automatically.',
  },
  {
    src: '/videos/launch-06.mp4',
    label: 'Nutrition',
    sub: 'Calories, macros, and meals — in the same app as your training.',
  },
]

function VideoCard({
  src,
  label,
  sub,
  index,
}: {
  src: string
  label: string
  sub: string
  index: number
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {
            // autoplay may be blocked; ignore silently
          })
          setHasPlayed(true)
        } else if (hasPlayed) {
          el.pause()
        }
      },
      { threshold: 0.35 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [hasPlayed])

  return (
    <FadeUp delay={index * 0.08}>
      <figure className="flex flex-col gap-4">
        <div className="group relative overflow-hidden rounded-[28px] border border-border bg-bg-high transition-all duration-300 hover:border-border-mid">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 -z-10 scale-110 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)',
            }}
          />
          <video
            ref={videoRef}
            src={src}
            loop
            muted
            playsInline
            preload="metadata"
            className="block aspect-[9/16] w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(5,5,6,0.55) 100%)',
            }}
          />
        </div>
        <figcaption className="flex flex-col gap-1.5">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-accent/80">
            {String(index + 1).padStart(2, '0')} — {label}
          </span>
          <span className="text-[15px] text-text-secondary">{sub}</span>
        </figcaption>
      </figure>
    </FadeUp>
  )
}

export default function VideoShowcase() {
  return (
    <Section spacing="loose" className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
        }}
      />

      <FadeUp>
        <div className="flex flex-col items-start gap-6">
          <Pill>IN MOTION</Pill>
          <h2 className="max-w-[820px] text-balance text-4xl font-bold leading-[1.02] tracking-tightest text-text-primary md:text-5xl lg:text-6xl">
            The training app,{' '}
            <span className="text-text-tertiary">in motion.</span>
          </h2>
          <p className="max-w-[560px] text-base leading-relaxed text-text-secondary md:text-lg">
            Profile, session, nutrition. What it actually looks like
            day-to-day.
          </p>
        </div>
      </FadeUp>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {VIDEOS.map((v, i) => (
          <VideoCard key={v.src} {...v} index={i} />
        ))}
      </div>
    </Section>
  )
}
