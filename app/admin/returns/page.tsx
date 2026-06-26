import Link from 'next/link'
import { RotateCcw } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import ReturnActions from '@/components/admin/ReturnActions'
import { listReturns } from '@/lib/marketplace/admin'

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const TONE: Record<string, string> = {
  requested: 'border-accent/35 bg-accent/[0.08] text-accent-bright',
  approved: 'border-[#5A7A64]/45 bg-[#5A7A64]/[0.12] text-[#9FC4AC]',
  denied: 'border-red-500/35 bg-red-500/[0.08] text-red-300',
  refunded: 'border-[#5A7A64]/45 bg-[#5A7A64]/[0.12] text-[#9FC4AC]',
  cancelled: 'border-border-mid bg-white/[0.03] text-text-secondary',
}

export default async function AdminReturnsPage() {
  const returns = await listReturns()
  const open = returns.filter((r) => r.status === 'requested').length

  return (
    <AdminShell
      eyebrow="Support"
      title="Returns"
      subtitle={`${open} open · ${returns.length} total. Approving a return flags it for refund — issue the Stripe refund from the order.`}
    >
      {returns.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[3px] border border-border bg-bg-surface px-6 py-16 text-center">
          <RotateCcw className="h-6 w-6 text-text-tertiary" />
          <p className="text-[14.5px] font-semibold text-text-primary">No return requests</p>
          <p className="max-w-[360px] text-[13px] text-text-secondary">
            When a buyer requests a return from their order page, it shows up here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {returns.map((r) => (
            <div key={r.id} className="flex flex-col gap-4 rounded-[3px] border border-border bg-bg-surface p-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex min-w-0 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={'inline-flex items-center rounded-[3px] border px-2 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] ' + (TONE[r.status] ?? TONE.cancelled)}>
                    {r.status}
                  </span>
                  <Link href={`/admin/orders/${r.order_id}`} className="font-mono text-[12.5px] text-accent-bright tabular-nums hover:underline">
                    {r.order_id.slice(0, 8).toUpperCase()}
                  </Link>
                  <span className="text-[12.5px] text-text-tertiary">{r.brandName ?? '—'} · {fmtDate(r.created_at)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] font-semibold text-text-primary">{r.reason}</span>
                  {r.details && <p className="max-w-[520px] text-[13px] leading-relaxed text-text-secondary">{r.details}</p>}
                  {r.resolution_note && (
                    <p className="text-[12.5px] text-text-tertiary">Note: {r.resolution_note}</p>
                  )}
                </div>
              </div>
              <div className="lg:w-[300px] lg:shrink-0">
                <ReturnActions id={r.id} status={r.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  )
}
