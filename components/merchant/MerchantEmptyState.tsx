import type { ReactNode } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

/**
 * Polished empty / zero-data panel for merchant tables and dashboards.
 * Squared, gold-forward, centered. Optional primary CTA + secondary note.
 */
type MerchantEmptyStateProps = {
  icon?: ReactNode
  title: string
  description?: string
  /** Primary action (internal route). */
  cta?: { label: string; href: string }
  /** External primary action (e.g. mailto / app deep-link). */
  ctaExternal?: { label: string; href: string }
  /** Muted line below the CTA, e.g. "Manage in the PHYZIK app". */
  note?: string
  className?: string
}

export default function MerchantEmptyState({
  icon,
  title,
  description,
  cta,
  ctaExternal,
  note,
  className,
}: MerchantEmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-[3px] border border-border bg-bg-surface px-6 py-16 text-center',
        className,
      )}
    >
      {icon && (
        <span className="flex h-12 w-12 items-center justify-center rounded-[3px] border border-accent/25 bg-accent/[0.06] text-accent-bright">
          {icon}
        </span>
      )}
      <h3 className="font-display text-[19px] font-bold tracking-tightest text-text-primary">
        {title}
      </h3>
      {description && (
        <p className="max-w-[420px] text-[14px] leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
      {(cta || ctaExternal) && (
        <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
          {cta && (
            <Button variant="gold" size="md" asChild>
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          )}
          {ctaExternal && (
            <Button variant="gold" size="md" asChild>
              <a href={ctaExternal.href}>{ctaExternal.label}</a>
            </Button>
          )}
        </div>
      )}
      {note && (
        <p className="text-[12.5px] text-text-tertiary">{note}</p>
      )}
    </div>
  )
}
