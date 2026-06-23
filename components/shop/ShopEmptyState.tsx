import { ZMark } from '@/components/brand/BrandMarks'
import { cn } from '@/lib/utils'

/**
 * Polished empty / zero-state used across the shop while the catalog is being
 * stocked. Gold Z monogram on a dark surface. Server-safe.
 */
export default function ShopEmptyState({
  title = 'Stocking the shelves',
  message = 'Brands are onboarding now. Check back soon — the first drops land here.',
  action,
  className,
}: {
  title?: string
  message?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-[3px] border border-border/70 bg-bg-surface/60 px-8 py-20 text-center',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(168,137,46,0.35) 50%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(168,137,46,0.10) 0%, transparent 65%)',
        }}
      />
      <span className="flex h-16 w-16 items-center justify-center rounded-[3px] border border-border bg-bg-deep/80">
        <ZMark sizeClass="h-8 w-auto" />
      </span>
      <div className="flex flex-col items-center gap-2">
        <h3 className="font-display text-[19px] font-bold tracking-tightest text-text-primary">
          {title}
        </h3>
        <p className="max-w-[360px] text-[14px] leading-relaxed text-text-secondary">
          {message}
        </p>
      </div>
      {action}
    </div>
  )
}
