'use client'

import { useState, useTransition } from 'react'
import { Loader2, Save } from 'lucide-react'
import Button from '@/components/ui/Button'
import ActionFeedback from './ActionFeedback'
import { updateBrand } from '@/lib/marketplace/admin-actions'
import type { ActionResult } from '@/lib/marketplace/admin-types'
import type { AdminBrand } from '@/lib/marketplace/admin-types'

const STATUSES = ['pending', 'approved', 'live', 'suspended'] as const

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between gap-4 rounded-[3px] border border-border bg-bg-high px-4 py-3 text-left transition-colors hover:border-accent/30"
    >
      <span className="text-[13.5px] font-medium text-text-primary">{label}</span>
      <span
        className={
          'relative h-5 w-9 shrink-0 rounded-[3px] border transition-colors ' +
          (checked ? 'border-accent/50 bg-accent/30' : 'border-border bg-bg-top')
        }
      >
        <span
          className={
            'absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-[2px] transition-all ' +
            (checked ? 'left-[18px] bg-accent-bright' : 'left-[2px] bg-text-tertiary')
          }
        />
      </span>
    </button>
  )
}

export default function BrandEditForm({ brand }: { brand: AdminBrand }) {
  const [status, setStatus] = useState<string>(brand.status)
  const [commissionPct, setCommissionPct] = useState<string>(
    ((brand.commission_bps ?? 1200) / 100).toString(),
  )
  const [isActive, setIsActive] = useState<boolean>(brand.is_active)
  const [featured, setFeatured] = useState<boolean>(brand.featured)
  const [verified, setVerified] = useState<boolean>(brand.verified)
  const [pending, start] = useTransition()
  const [result, setResult] = useState<ActionResult | null>(null)

  const save = () =>
    start(async () => {
      const pct = parseFloat(commissionPct)
      setResult(
        await updateBrand(brand.id, {
          status,
          commission_bps: Number.isFinite(pct) ? Math.round(pct * 100) : undefined,
          is_active: isActive,
          featured,
          verified,
        }),
      )
    })

  return (
    <div className="flex flex-col gap-5 rounded-[3px] border border-border bg-bg-surface p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-tertiary">
            Status
          </span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-[3px] border border-border bg-bg-high px-3 py-2.5 text-[14px] capitalize text-text-primary focus:border-accent/50 focus:outline-none"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-tertiary">
            Commission (%)
          </span>
          <input
            type="number"
            step="0.5"
            min="0"
            max="100"
            value={commissionPct}
            onChange={(e) => setCommissionPct(e.target.value)}
            className="rounded-[3px] border border-border bg-bg-high px-3 py-2.5 text-[14px] tabular-nums text-text-primary focus:border-accent/50 focus:outline-none"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        <Toggle label="Active" checked={isActive} onChange={setIsActive} />
        <Toggle label="Featured" checked={featured} onChange={setFeatured} />
        <Toggle label="Verified" checked={verified} onChange={setVerified} />
      </div>

      <div className="flex items-center gap-3">
        <Button variant="gold" size="md" disabled={pending} onClick={save}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save changes
        </Button>
        {result && <ActionFeedback ok={result.ok}>{result.ok ? result.message : result.error}</ActionFeedback>}
      </div>
    </div>
  )
}
