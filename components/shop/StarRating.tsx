import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Gold star rating. Renders 5 stars with a clipped fill for the fractional
 * portion of `value`. Server-safe (pure render). PRs/ratings are GOLD.
 */
export default function StarRating({
  value,
  count,
  size = 14,
  showValue = false,
  className,
}: {
  value: number | null
  count?: number
  size?: number
  showValue?: boolean
  className?: string
}) {
  const rating = value ?? 0
  const stars = [0, 1, 2, 3, 4]

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span
        className="inline-flex items-center gap-0.5"
        role="img"
        aria-label={
          value != null ? `Rated ${rating.toFixed(1)} of 5` : 'No ratings yet'
        }
      >
        {stars.map((i) => {
          const fill = Math.max(0, Math.min(1, rating - i))
          return (
            <span
              key={i}
              className="relative inline-block"
              style={{ width: size, height: size }}
            >
              <Star
                className="absolute inset-0 text-border-strong"
                style={{ width: size, height: size }}
                strokeWidth={1.5}
              />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  className="text-accent-bright"
                  style={{ width: size, height: size }}
                  fill="currentColor"
                  strokeWidth={1.5}
                />
              </span>
            </span>
          )
        })}
      </span>
      {showValue && value != null && (
        <span className="text-[12.5px] font-semibold tabular-nums text-text-secondary">
          {rating.toFixed(1)}
        </span>
      )}
      {count != null && (
        <span className="text-[12.5px] text-text-tertiary">
          ({count})
        </span>
      )}
    </span>
  )
}
