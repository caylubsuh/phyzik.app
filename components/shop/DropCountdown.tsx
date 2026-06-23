'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

function diffParts(target: number, now: number) {
  const ms = Math.max(0, target - now)
  const totalSec = Math.floor(ms / 1000)
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
    done: ms === 0,
  }
}

/**
 * Live "ends in" countdown for a drop. Renders nothing until mounted to avoid
 * a hydration mismatch (server has no clock tick). Gold accent.
 */
export default function DropCountdown({
  endsAt,
  className,
}: {
  endsAt: string
  className?: string
}) {
  const target = new Date(endsAt).getTime()
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    if (Number.isNaN(target)) return
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [target])

  if (now == null || Number.isNaN(target)) return null

  const { days, hours, minutes, seconds, done } = diffParts(target, now)

  if (done) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-text-tertiary',
          className,
        )}
      >
        <Clock className="h-3.5 w-3.5" />
        Drop ended
      </span>
    )
  }

  const pad = (n: number) => String(n).padStart(2, '0')
  const label =
    days > 0
      ? `${days}d ${pad(hours)}h ${pad(minutes)}m`
      : `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] tabular-nums text-accent-bright',
        className,
      )}
    >
      <Clock className="h-3.5 w-3.5" />
      Ends in {label}
    </span>
  )
}
