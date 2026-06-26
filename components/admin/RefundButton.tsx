'use client'

import { useState, useTransition } from 'react'
import { RotateCcw, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import ActionFeedback from './ActionFeedback'
import { refundOrder } from '@/lib/marketplace/admin-actions'
import type { ActionResult } from '@/lib/marketplace/admin-types'

interface RefundButtonProps {
  orderId: string
  /** Whether the order status allows any refund. */
  refundable?: boolean
  /** When true, the amount field is required (used for partially_refunded orders). */
  requireAmount?: boolean
}

export default function RefundButton({
  orderId,
  refundable = false,
  requireAmount = false,
}: RefundButtonProps) {
  const [pending, start] = useTransition()
  const [confirm, setConfirm] = useState(false)
  const [amountStr, setAmountStr] = useState('')
  const [result, setResult] = useState<ActionResult | null>(null)

  if (!refundable) {
    return <span className="text-[12.5px] text-text-tertiary">Not refundable in this status</span>
  }
  if (result?.ok) return <ActionFeedback ok>{result.message}</ActionFeedback>

  /** Returns cents if valid, null otherwise. */
  const parsedCents = (() => {
    const n = parseFloat(amountStr)
    if (!Number.isFinite(n) || n <= 0) return null
    return Math.round(n * 100)
  })()

  const canSubmit = requireAmount ? parsedCents !== null : true

  if (!confirm) {
    return (
      <Button variant="secondary" size="sm" onClick={() => setConfirm(true)}>
        <RotateCcw className="h-3.5 w-3.5" />
        Refund order
      </Button>
    )
  }

  const handleConfirm = () =>
    start(async () => {
      const r = await refundOrder(orderId, parsedCents ?? undefined)
      setResult(r)
    })

  const confirmLabel = (() => {
    if (parsedCents !== null) {
      return `Confirm refund ($${(parsedCents / 100).toFixed(2)})`
    }
    return requireAmount ? 'Enter amount above' : 'Confirm full refund'
  })()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[13px] text-text-tertiary">
            $
          </span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder={requireAmount ? 'Amount required' : 'Leave blank for full refund'}
            value={amountStr}
            onChange={(e) => setAmountStr(e.target.value)}
            className="w-[220px] rounded-[3px] border border-border bg-bg-high py-2 pl-7 pr-3 text-[13px] text-text-primary placeholder:text-text-tertiary focus:border-accent/50 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="gold"
          size="sm"
          disabled={pending || !canSubmit}
          onClick={handleConfirm}
        >
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
          {confirmLabel}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={pending}
          onClick={() => {
            setConfirm(false)
            setAmountStr('')
          }}
        >
          Cancel
        </Button>
      </div>
      {result && !result.ok && <ActionFeedback ok={false}>{result.error}</ActionFeedback>}
    </div>
  )
}
