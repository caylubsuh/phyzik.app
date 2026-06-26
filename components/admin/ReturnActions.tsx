'use client'

import { useState, useTransition } from 'react'
import { Check, X, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import ActionFeedback from './ActionFeedback'
import { updateReturn } from '@/lib/marketplace/admin-actions'
import type { ActionResult } from '@/lib/marketplace/admin-types'

export default function ReturnActions({ id, status }: { id: string; status: string }) {
  const [pending, start] = useTransition()
  const [note, setNote] = useState('')
  const [result, setResult] = useState<ActionResult | null>(null)
  const [resolved, setResolved] = useState(status !== 'requested')

  if (resolved && !result) {
    return <span className="text-[12.5px] text-text-tertiary capitalize">{status}</span>
  }
  if (result?.ok) return <ActionFeedback ok>{result.message}</ActionFeedback>

  const run = (decision: 'approved' | 'denied') =>
    start(async () => {
      const r = await updateReturn(id, decision, note)
      setResult(r)
      if (r.ok) setResolved(true)
    })

  return (
    <div className="flex flex-col gap-2">
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Resolution note (optional)"
        className="w-full rounded-[3px] border border-border bg-bg-high px-3 py-2 text-[13px] text-text-primary placeholder:text-text-tertiary focus:border-accent/50 focus:outline-none"
      />
      <div className="flex items-center gap-2">
        <Button variant="gold" size="sm" disabled={pending} onClick={() => run('approved')}>
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
          Approve
        </Button>
        <Button variant="secondary" size="sm" disabled={pending} onClick={() => run('denied')}>
          <X className="h-3.5 w-3.5" />
          Deny
        </Button>
      </div>
      {result && !result.ok && <ActionFeedback ok={false}>{result.error}</ActionFeedback>}
    </div>
  )
}
