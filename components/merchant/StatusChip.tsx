import { cn } from '@/lib/utils'
import type { OrderStatus, ProductStatus, BrandStatus } from '@/lib/marketplace/types'

/**
 * Squared status chip — maps an order / product / brand status to a muted
 * gold / green / red / neutral tone. NEVER a rounded pill (squared corners
 * only). Tabular tracking, uppercase, premium.
 */

type Tone = 'gold' | 'green' | 'red' | 'neutral' | 'lavender'

const toneClass: Record<Tone, string> = {
  gold: 'border-accent/35 bg-accent/[0.08] text-accent-bright',
  green: 'border-[#5A7A64]/45 bg-[#5A7A64]/[0.12] text-[#9FC4AC]',
  red: 'border-red-500/35 bg-red-500/[0.08] text-red-300',
  neutral: 'border-border-mid bg-white/[0.03] text-text-secondary',
  lavender: 'border-tertiary/35 bg-tertiary/[0.08] text-tertiary',
}

const ORDER_TONE: Record<OrderStatus, Tone> = {
  pending: 'neutral',
  paid: 'gold',
  fulfilled: 'gold',
  shipped: 'green',
  delivered: 'green',
  refunded: 'red',
  partially_refunded: 'red',
  disputed: 'red',
  failed: 'red',
  cancelled: 'neutral',
}

const ORDER_LABEL: Record<OrderStatus, string> = {
  pending: 'Pending',
  paid: 'Paid',
  fulfilled: 'Fulfilled',
  shipped: 'Shipped',
  delivered: 'Delivered',
  refunded: 'Refunded',
  partially_refunded: 'Part. refund',
  disputed: 'Disputed',
  failed: 'Failed',
  cancelled: 'Cancelled',
}

const PRODUCT_TONE: Record<ProductStatus, Tone> = {
  draft: 'neutral',
  review: 'gold',
  published: 'green',
  archived: 'neutral',
}

const PRODUCT_LABEL: Record<ProductStatus, string> = {
  draft: 'Draft',
  review: 'In review',
  published: 'Published',
  archived: 'Archived',
}

const BRAND_TONE: Record<BrandStatus, Tone> = {
  pending: 'neutral',
  approved: 'gold',
  live: 'green',
  suspended: 'red',
}

const BRAND_LABEL: Record<BrandStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  live: 'Live',
  suspended: 'Suspended',
}

type StatusChipProps =
  | { kind: 'order'; status: OrderStatus; className?: string }
  | { kind: 'product'; status: ProductStatus; className?: string }
  | { kind: 'brand'; status: BrandStatus; className?: string }

function resolve(
  props: StatusChipProps,
): { tone: Tone; label: string } {
  switch (props.kind) {
    case 'order':
      return { tone: ORDER_TONE[props.status], label: ORDER_LABEL[props.status] }
    case 'product':
      return { tone: PRODUCT_TONE[props.status], label: PRODUCT_LABEL[props.status] }
    case 'brand':
      return { tone: BRAND_TONE[props.status], label: BRAND_LABEL[props.status] }
  }
}

export default function StatusChip(props: StatusChipProps) {
  const { tone, label } = resolve(props)
  const dotClass: Record<Tone, string> = {
    gold: 'bg-accent',
    green: 'bg-[#5A7A64]',
    red: 'bg-red-400',
    neutral: 'bg-text-tertiary',
    lavender: 'bg-tertiary',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap',
        toneClass[tone],
        props.className,
      )}
    >
      <span aria-hidden className={cn('inline-block h-1.5 w-1.5 rounded-full', dotClass[tone])} />
      {label}
    </span>
  )
}
