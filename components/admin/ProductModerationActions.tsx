'use client'

import { useState, useTransition } from 'react'
import { Check, X, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import ActionFeedback from './ActionFeedback'
import { moderateProduct } from '@/lib/marketplace/admin-actions'
import type { ActionResult } from '@/lib/marketplace/admin-types'

export default function ProductModerationActions({ id }: { id: string }) {
  const [pending, start] = useTransition()
  const [result, setResult] = useState<ActionResult | null>(null)

  const run = (decision: 'publish' | 'reject') =>
    start(async () => setResult(await moderateProduct(id, decision)))

  if (result?.ok) return <ActionFeedback ok>{result.message}</ActionFeedback>

  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="flex items-center gap-2">
        <Button variant="gold" size="sm" disabled={pending} onClick={() => run('publish')}>
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
          Publish
        </Button>
        <Button variant="secondary" size="sm" disabled={pending} onClick={() => run('reject')}>
          <X className="h-3.5 w-3.5" />
          Send back
        </Button>
      </div>
      {result && !result.ok && <ActionFeedback ok={false}>{result.error}</ActionFeedback>}
    </div>
  )
}
