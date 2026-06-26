'use client'

import { useState, useTransition } from 'react'
import { RotateCcw, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import ActionFeedback from './ActionFeedback'
import { refundOrder } from '@/lib/marketplace/admin-actions'
import type { ActionResult } from '@/lib/marketplace/admin-types'

export default function RefundButton({ orderId, refundable }: { orderId: string; refundable: boolean }) {
  const [pending, start] = useTransition()
  const [confirm, setConfirm] = useState(false)
  const [result, setResult] = useState<ActionResult | null>(null)

  if (!refundable) {
    return <span className="text-[12.5px] text-text-tertiary">Not refundable in this status</span>
  }
  if (result?.ok) return <ActionFeedback ok>{result.message}</ActionFeedback>

  if (!confirm) {
    return (
      <Button variant="secondary" size="sm" onClick={() => setConfirm(true)}>
        <RotateCcw className="h-3.5 w-3.5" />
        Refund order
      </Button>
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <span className="text-[13px] text-text-secondary">Refund the full order via Stripe?</span>
        <Button
          variant="gold"
          size="sm"
          disabled={pending}
          onClick={() => start(async () => setResult(await refundOrder(orderId)))}
        >
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
          Confirm refund
        </Button>
        <Button variant="ghost" size="sm" disabled={pending} onClick={() => setConfirm(false)}>
          Cancel
        </Button>
      </div>
      {result && !result.ok && <ActionFeedback ok={false}>{result.error}</ActionFeedback>}
    </div>
  )
}
