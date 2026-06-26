'use client'

import { useState, useTransition } from 'react'
import { Link2, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import ActionFeedback from './ActionFeedback'
import { setBrandOwner } from '@/lib/marketplace/admin-actions'
import type { ActionResult } from '@/lib/marketplace/admin-types'

export default function BrandOwnerLink({
  brandId,
  currentOwnerId,
}: {
  brandId: string
  currentOwnerId: string | null
}) {
  const [email, setEmail] = useState('')
  const [pending, start] = useTransition()
  const [result, setResult] = useState<ActionResult | null>(null)

  const submit = () => {
    if (!email.trim()) return
    start(async () => {
      const r = await setBrandOwner(brandId, email.trim())
      setResult(r)
      if (r.ok) setEmail('')
    })
  }

  return (
    <div className="flex flex-col gap-2.5">
      {currentOwnerId && !result?.ok && (
        <p className="text-[12px] text-text-tertiary">
          Current owner ID:{' '}
          <span className="font-mono">
            {currentOwnerId.slice(0, 8)}&hellip;
          </span>
        </p>
      )}
      <div className="flex items-center gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="seller@example.com"
          className="min-w-0 flex-1 rounded-[3px] border border-border bg-bg-high px-3 py-2 text-[13px] text-text-primary placeholder:text-text-tertiary focus:border-accent/50 focus:outline-none"
        />
        <Button
          variant="secondary"
          size="sm"
          disabled={pending || !email.trim()}
          onClick={submit}
        >
          {pending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Link2 className="h-3.5 w-3.5" />
          )}
          Link owner
        </Button>
      </div>
      {result && (
        <ActionFeedback ok={result.ok}>
          {result.ok ? result.message : result.error}
        </ActionFeedback>
      )}
    </div>
  )
}
