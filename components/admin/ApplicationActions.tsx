'use client'

import { useState, useTransition } from 'react'
import { Check, X, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import ActionFeedback from './ActionFeedback'
import {
  approveApplication,
  rejectApplication,
} from '@/lib/marketplace/admin-actions'
import type { ActionResult } from '@/lib/marketplace/admin-types'

export default function ApplicationActions({ id, status }: { id: string; status: string }) {
  const [pending, start] = useTransition()
  const [result, setResult] = useState<ActionResult | null>(null)
  const [resolved, setResolved] = useState(status !== 'pending')

  if (resolved && !result) {
    return <span className="text-[12.5px] text-text-tertiary capitalize">{status}</span>
  }

  const run = (fn: (id: string) => Promise<ActionResult>) =>
    start(async () => {
      const r = await fn(id)
      setResult(r)
      if (r.ok) setResolved(true)
    })

  if (result?.ok) {
    return <ActionFeedback ok>{result.message ?? 'Done'}</ActionFeedback>
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="flex items-center gap-2">
        <Button
          variant="gold"
          size="sm"
          disabled={pending}
          onClick={() => run(approveApplication)}
        >
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
          Approve
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={pending}
          onClick={() => run(rejectApplication)}
        >
          <X className="h-3.5 w-3.5" />
          Reject
        </Button>
      </div>
      {result && !result.ok && <ActionFeedback ok={false}>{result.error}</ActionFeedback>}
    </div>
  )
}
