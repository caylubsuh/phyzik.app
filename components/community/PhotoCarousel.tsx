'use client'

import Image from 'next/image'
import { useEffect, useState, type KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'

type Photo = { src: string; alt: string }

type PhotoCarouselProps = {
  photos: Photo[]
  className?: string
  sizes?: string
}

const AUTO_ADVANCE_MS = 4000
const TRANSITION_MS = 400

export default function PhotoCarousel({
  photos,
  className,
  sizes = '(min-width: 768px) 480px, 100vw',
}: PhotoCarouselProps) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = photos.length

  useEffect(() => {
    if (count <= 1 || paused) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % count)
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [count, paused])

  if (count === 0) return null

  if (count === 1) {
    const p = photos[0]
    return (
      <div
        className={cn(
          'relative aspect-square w-full overflow-hidden rounded-xl border border-white/[0.05] bg-bg-low',
          className,
        )}
      >
        <Image
          src={p.src}
          alt={p.alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    )
  }

  const advance = (delta: number) =>
    setActive((i) => (i + delta + count) % count)

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      advance(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      advance(-1)
    }
  }

  return (
    <div
      role="region"
      aria-label="Photo gallery"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative w-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div
        className={cn(
          'relative aspect-square w-full overflow-hidden rounded-xl border border-white/[0.05] bg-bg-low',
          className,
        )}
      >
        {photos.map((p, i) => (
          <div
            key={p.src}
            className={cn(
              'absolute inset-0 transition-opacity',
              i === active ? 'opacity-100' : 'opacity-0',
            )}
            style={{ transitionDuration: `${TRANSITION_MS}ms` }}
            aria-hidden={i !== active}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes={sizes}
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show photo ${i + 1} of ${count}`}
            aria-current={i === active}
            className={cn(
              'h-2 w-2 rounded-full transition-colors',
              i === active ? 'bg-accent' : 'bg-white/25 hover:bg-white/40',
            )}
          />
        ))}
      </div>
    </div>
  )
}
