import { formatCents, priceRange } from '@/lib/marketplace/format'
import { cn } from '@/lib/utils'

/**
 * Renders a product price — a single value, a min–max range, or a
 * compare-at strikethrough. Server-safe (no hooks).
 */
export default function PriceTag({
  minCents,
  maxCents,
  compareAtCents,
  currency = 'USD',
  size = 'md',
  className,
}: {
  minCents: number | null
  maxCents?: number | null
  compareAtCents?: number | null
  currency?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const sizeMap = {
    sm: 'text-[13px]',
    md: 'text-[15px]',
    lg: 'text-[22px] md:text-[26px]',
  } as const

  const onSale =
    compareAtCents != null && minCents != null && compareAtCents > minCents

  return (
    <span className={cn('inline-flex items-baseline gap-2', className)}>
      <span
        className={cn(
          'font-semibold tabular-nums tracking-tight text-text-primary',
          sizeMap[size],
        )}
      >
        {priceRange(minCents, maxCents ?? minCents, currency)}
      </span>
      {onSale && (
        <span
          className={cn(
            'tabular-nums text-text-tertiary line-through',
            size === 'lg' ? 'text-[15px]' : 'text-[12px]',
          )}
        >
          {formatCents(compareAtCents, currency)}
        </span>
      )}
    </span>
  )
}
