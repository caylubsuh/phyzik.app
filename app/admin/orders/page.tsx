import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ShoppingBag, ChevronRight } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import StatusChip from '@/components/merchant/StatusChip'
import { listOrders, getAdminUser } from '@/lib/marketplace/admin'
import { formatCents } from '@/lib/marketplace/format'
import type { OrderStatus } from '@/lib/marketplace/types'

const FILTERS: { label: string; value?: string }[] = [
  { label: 'All' },
  { label: 'Paid', value: 'paid' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Refunded', value: 'refunded' },
  { label: 'Disputed', value: 'disputed' },
]

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { isAdmin } = await getAdminUser()
  if (!isAdmin) notFound()

  const { status } = await searchParams
  const orders = await listOrders({ status })

  return (
    <AdminShell
      eyebrow="Commerce"
      title="Orders"
      subtitle={`${orders.length} order${orders.length === 1 ? '' : 's'}${status ? ` · ${status}` : ''} across all brands.`}
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = (f.value ?? '') === (status ?? '')
          return (
            <Link
              key={f.label}
              href={f.value ? `/admin/orders?status=${f.value}` : '/admin/orders'}
              className={
                'rounded-[3px] border px-3 py-1.5 text-[12.5px] font-semibold transition-colors ' +
                (active
                  ? 'border-accent/40 bg-accent/[0.08] text-accent-bright'
                  : 'border-border bg-bg-surface text-text-secondary hover:text-text-primary')
              }
            >
              {f.label}
            </Link>
          )
        })}
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[3px] border border-border bg-bg-surface px-6 py-16 text-center">
          <ShoppingBag className="h-6 w-6 text-text-tertiary" />
          <p className="text-[14.5px] font-semibold text-text-primary">No orders</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[3px] border border-border bg-bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  {['Order', 'Date', 'Brand', 'Buyer', 'Total', 'Status', ''].map((h, i) => (
                    <th
                      key={h || i}
                      className="px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr
                    key={o.id}
                    className="border-b border-border/50 last:border-b-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/admin/orders/${o.id}`}
                        className="font-mono text-[12.5px] text-accent-bright tabular-nums hover:underline"
                      >
                        {o.id.slice(0, 8).toUpperCase()}
                      </Link>
                    </td>
                    <td className="px-4 py-3.5 text-[13px] text-text-secondary tabular-nums">
                      {fmtDate(o.created_at)}
                    </td>
                    <td className="px-4 py-3.5 text-[13px] text-text-primary">
                      {o.brandName ?? '—'}
                    </td>
                    <td className="px-4 py-3.5 text-[13px] text-text-secondary">
                      {o.ship_to?.name ?? '—'}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[13px] font-medium text-text-primary tabular-nums">
                      {formatCents(o.amount_total_cents, o.currency)}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusChip kind="order" status={o.status as OrderStatus} />
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <Link
                        href={`/admin/orders/${o.id}`}
                        className="inline-flex text-text-tertiary hover:text-accent-bright"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminShell>
  )
}
