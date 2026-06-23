import { AVAILABILITY_LABEL } from '@/lib/marketplace/format'
import type { Availability } from '@/lib/marketplace/types'
import { cn } from '@/lib/utils'

const DOT: Record<Availability, string> = {
  in_stock: 'bg-[#5A7A64]',
  low_stock: 'bg-accent',
  out_of_stock: 'bg-text-tertiary',
}

const TEXT: Record<Availability, string> = {
  in_stock: 'text-text-secondary',
  low_stock: 'text-accent-bright',
  out_of_stock: 'text-text-tertiary',
}

/**
 * Small in-stock / low-stock / sold-out indicator. Squared, no pill.
 * Server-safe.
 */
export default function AvailabilityBadge({
  availability,
  className,
}: {
  availability: Availability
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]',
        TEXT[availability],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('h-1.5 w-1.5 rounded-full', DOT[availability])}
      />
      {AVAILABILITY_LABEL[availability]}
    </span>
  )
}
