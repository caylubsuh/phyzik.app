import AdminShell from '@/components/admin/AdminShell'
import StatCard from '@/components/merchant/StatCard'
import { listPayouts, getBrandGmv } from '@/lib/marketplace/admin'
import { formatCents } from '@/lib/marketplace/format'
import { TrendingUp, Wallet, Receipt } from 'lucide-react'

function fmtDate(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function AdminPayoutsPage() {
  const [payouts, gmv] = await Promise.all([listPayouts(), getBrandGmv()])

  const totalGmv = gmv.reduce((s, b) => s + b.gmvCents, 0)
  const totalPaidOut = payouts.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount_cents, 0)
  const totalPending = payouts.filter((p) => p.status !== 'paid').reduce((s, p) => s + p.amount_cents, 0)

  return (
    <AdminShell
      eyebrow="Finance"
      title="Payouts & GMV"
      subtitle="Platform-wide gross merchandise value and brand payout history."
    >
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard label="Total GMV" value={formatCents(totalGmv)} hint="Paid orders, all brands" icon={<TrendingUp className="h-4 w-4" />} emphasis />
          <StatCard label="Paid out" value={formatCents(totalPaidOut)} hint="Settled to brands" icon={<Receipt className="h-4 w-4" />} />
          <StatCard label="In transit" value={formatCents(totalPending)} hint="Pending payouts" icon={<Wallet className="h-4 w-4" />} />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-text-tertiary">GMV by brand</span>
          <div className="overflow-hidden rounded-[3px] border border-border bg-bg-surface">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  {['Brand', 'Orders', 'GMV'].map((h) => (
                    <th key={h} className="px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gmv.length === 0 ? (
                  <tr><td colSpan={3} className="px-4 py-6 text-[13px] text-text-tertiary">No paid orders yet.</td></tr>
                ) : (
                  gmv.map((b) => (
                    <tr key={b.brandId} className="border-b border-border/50 last:border-b-0">
                      <td className="px-4 py-3 text-[13.5px] text-text-primary">{b.brandName}</td>
                      <td className="px-4 py-3 font-mono text-[13px] text-text-secondary tabular-nums">{b.orders}</td>
                      <td className="px-4 py-3 font-mono text-[13px] font-medium text-text-primary tabular-nums">{formatCents(b.gmvCents)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-text-tertiary">Payout history</span>
          <div className="overflow-hidden rounded-[3px] border border-border bg-bg-surface">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  {['Brand', 'Amount', 'Status', 'Arrival', 'Created'].map((h) => (
                    <th key={h} className="px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payouts.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-6 text-[13px] text-text-tertiary">No payouts recorded yet.</td></tr>
                ) : (
                  payouts.map((p) => (
                    <tr key={p.id} className="border-b border-border/50 last:border-b-0">
                      <td className="px-4 py-3 text-[13.5px] text-text-primary">{p.brandName ?? '—'}</td>
                      <td className="px-4 py-3 font-mono text-[13px] font-medium text-text-primary tabular-nums">{formatCents(p.amount_cents)}</td>
                      <td className="px-4 py-3 text-[13px] capitalize text-text-secondary">{p.status ?? '—'}</td>
                      <td className="px-4 py-3 text-[13px] text-text-secondary tabular-nums">{fmtDate(p.arrival_date)}</td>
                      <td className="px-4 py-3 text-[13px] text-text-secondary tabular-nums">{fmtDate(p.created_at)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
