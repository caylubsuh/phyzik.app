import StatusChip from './StatusChip'
import { formatCents } from '@/lib/marketplace/format'
import type { Order } from '@/lib/marketplace/types'

/**
 * Display-only orders table. Fulfillment (mark shipped / delivered) happens in
 * the PHYZIK app for now — no writes here. Short order id, date, buyer, item
 * count, total, status, tracking.
 */
function shortId(id: string): string {
  return id.slice(0, 8).toUpperCase()
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function itemCount(o: Order): number {
  if (!o.items || o.items.length === 0) return 0
  return o.items.reduce((sum, it) => sum + (it.qty ?? 0), 0)
}

export default function OrderTable({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-hidden rounded-[3px] border border-border bg-bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary">
                Order
              </th>
              <th className="px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary">
                Date
              </th>
              <th className="px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary">
                Buyer
              </th>
              <th className="px-4 py-3 text-right text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary">
                Items
              </th>
              <th className="px-4 py-3 text-right text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary">
                Total
              </th>
              <th className="px-4 py-3 text-right text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary">
                Status
              </th>
              <th className="px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary">
                Tracking
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const buyer = o.buyerName ?? o.ship_to?.name ?? null
              return (
                <tr
                  key={o.id}
                  className="border-b border-border/50 last:border-b-0 transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3.5 font-mono text-[12.5px] text-text-primary tabular-nums">
                    {shortId(o.id)}
                  </td>
                  <td className="px-4 py-3.5 text-[13px] text-text-secondary tabular-nums">
                    {fmtDate(o.created_at)}
                  </td>
                  <td className="px-4 py-3.5 text-[13px] text-text-secondary">
                    {buyer ?? <span className="text-text-tertiary">—</span>}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-[13px] text-text-secondary tabular-nums">
                    {itemCount(o)}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-[13px] font-medium text-text-primary tabular-nums">
                    {formatCents(o.amount_total_cents, o.currency)}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <StatusChip kind="order" status={o.status} />
                  </td>
                  <td className="px-4 py-3.5 text-[12.5px] text-text-secondary">
                    {o.tracking_number ? (
                      <span className="font-mono tabular-nums">
                        {o.tracking_carrier ? `${o.tracking_carrier} ` : ''}
                        {o.tracking_number}
                      </span>
                    ) : (
                      <span className="text-text-tertiary">—</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
