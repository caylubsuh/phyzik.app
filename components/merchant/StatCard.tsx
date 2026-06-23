import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * A single dashboard metric tile. Squared corners, gold hairline top accent
 * on emphasized cards, tabular-nums value. Built for a crisp data grid.
 */
type StatCardProps = {
  label: string
  /** Pre-formatted value (e.g. formatCents output or a plain count). */
  value: string
  /** Optional sub-line under the value. */
  hint?: string
  /** Leading icon (lucide) rendered in muted gold. */
  icon?: ReactNode
  /** Emphasize with a gold hairline + faint gold wash (e.g. "your net"). */
  emphasis?: boolean
  className?: string
}

export default function StatCard({
  label,
  value,
  hint,
  icon,
  emphasis = false,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col gap-3 overflow-hidden rounded-[3px] border p-5',
        emphasis
          ? 'border-accent/30 bg-accent/[0.05]'
          : 'border-border bg-bg-surface',
        className,
      )}
    >
      {emphasis && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(168,137,46,0.55) 50%, transparent 100%)',
          }}
        />
      )}
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
          {label}
        </span>
        {icon && (
          <span className={cn('shrink-0', emphasis ? 'text-accent-bright' : 'text-accent/70')}>
            {icon}
          </span>
        )}
      </div>
      <span
        className={cn(
          'font-display text-[30px] font-bold leading-none tracking-tightest tabular-nums md:text-[34px]',
          emphasis ? 'text-accent-bright' : 'text-text-primary',
        )}
      >
        {value}
      </span>
      {hint && (
        <span className="text-[12px] leading-snug text-text-secondary">{hint}</span>
      )}
    </div>
  )
}
