'use client'

import { useState, useTransition } from 'react'
import { Loader2, Archive, RotateCcw } from 'lucide-react'
import ActionFeedback from '@/components/admin/ActionFeedback'
import {
  archiveProduct,
  unarchiveProduct,
} from '@/app/merchant/[brandId]/products/actions'
import type { SaveResult } from '@/app/merchant/[brandId]/products/types'
import type { ProductStatus } from '@/lib/marketplace/types'

/**
 * Archive / restore control for the product editor. Soft state change only —
 * products are never hard-deleted (order_items FK-reference their variants).
 */
export default function ProductArchiveControl({
  brandId,
  productId,
  status,
}: {
  brandId: string
  productId: string
  status: ProductStatus
}) {
  const [pending, start] = useTransition()
  const [result, setResult] = useState<SaveResult | null>(null)
  const archived = status === 'archived'

  const run = () =>
    start(async () => {
      setResult(
        archived
          ? await unarchiveProduct(brandId, productId)
          : await archiveProduct(brandId, productId),
      )
    })

  return (
    <div className="flex flex-col gap-2 rounded-[3px] border border-border bg-bg-surface p-4">
      <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-tertiary">
        {archived ? 'Archived product' : 'Danger zone'}
      </span>
      <p className="text-[12.5px] text-text-tertiary">
        {archived
          ? 'This product is hidden from the Shop. Restore it to a draft to edit and resubmit.'
          : 'Archiving hides this product from the Shop. You can restore it any time.'}
      </p>
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="button"
          onClick={run}
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-[3px] border border-border bg-bg-high px-3.5 py-2.5 text-[13px] font-semibold text-text-secondary transition-colors hover:border-accent/35 hover:text-text-primary disabled:opacity-50"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : archived ? (
            <RotateCcw className="h-4 w-4 text-accent/70" />
          ) : (
            <Archive className="h-4 w-4 text-accent/70" />
          )}
          {archived ? 'Restore to draft' : 'Archive product'}
        </button>
        {result && (
          <ActionFeedback ok={result.ok}>
            {result.ok ? result.message ?? 'Done.' : result.error}
          </ActionFeedback>
        )}
      </div>
    </div>
  )
}
