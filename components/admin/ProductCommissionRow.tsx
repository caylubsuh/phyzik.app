'use client'

import { useState, useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import StatusChip from '@/components/merchant/StatusChip'
import ActionFeedback from './ActionFeedback'
import { formatCents } from '@/lib/marketplace/format'
import { setProductCommission } from '@/lib/marketplace/admin-actions'
import type { ActionResult } from '@/lib/marketplace/admin-types'
import type { AdminProductRow } from '@/lib/marketplace/admin'
import type { ProductStatus } from '@/lib/marketplace/types'

/**
 * One product row with an inline per-item commission editor. Blank input = the
 * product inherits the brand default; the placeholder shows that default %.
 */
export default function ProductCommissionRow({
  product,
  brandDefaultBps,
}: {
  product: AdminProductRow
  brandDefaultBps: number
}) {
  const [pct, setPct] = useState<string>(
    product.commission_bps != null ? (product.commission_bps / 100).toString() : '',
  )
  const [pending, start] = useTransition()
  const [result, setResult] = useState<ActionResult | null>(null)
  const [hasOverride, setHasOverride] = useState<boolean>(product.commission_bps != null)

  const save = (clear: boolean) =>
    start(async () => {
      const parsed = parseFloat(pct)
      const bps = clear ? null : Number.isFinite(parsed) ? Math.round(parsed * 100) : null
      const r = await setProductCommission(product.id, bps)
      setResult(r)
      if (r.ok) {
        setHasOverride(!clear && bps != null)
        if (clear) setPct('')
      }
    })

  return (
    <div className="flex flex-col gap-3 rounded-[3px] border border-border bg-bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt=""
            className="h-11 w-11 shrink-0 rounded-[3px] border border-border object-cover"
          />
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[3px] border border-border bg-bg-high text-[12px] text-text-tertiary">
            —
          </span>
        )}
        <div className="flex min-w-0 flex-col gap-1">
          <span className="truncate text-[14.5px] font-semibold text-text-primary">{product.name}</span>
          <span className="flex items-center gap-2 text-[12.5px] text-text-tertiary">
            <StatusChip kind="product" status={product.status as ProductStatus} />
            {formatCents(product.price_cents)}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <div className="relative">
          <input
            type="number"
            step="0.5"
            min="0"
            max="100"
            value={pct}
            onChange={(e) => setPct(e.target.value)}
            placeholder={(brandDefaultBps / 100).toFixed(1)}
            disabled={pending}
            className="w-24 rounded-[3px] border border-border bg-bg-high px-3 py-2 pr-7 text-[13.5px] tabular-nums text-text-primary focus:border-accent/50 focus:outline-none"
          />
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[13px] text-text-tertiary">
            %
          </span>
        </div>
        <Button variant="gold" size="sm" disabled={pending} onClick={() => save(false)}>
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
          Save
        </Button>
        {hasOverride && (
          <Button variant="ghost" size="sm" disabled={pending} onClick={() => save(true)}>
            Clear
          </Button>
        )}
        {result && (
          <ActionFeedback ok={result.ok}>{result.ok ? '✓' : result.error}</ActionFeedback>
        )}
      </div>
    </div>
  )
}
