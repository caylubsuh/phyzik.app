import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import StatusChip from '@/components/merchant/StatusChip'
import RefundButton from '@/components/admin/RefundButton'
import { getAdminOrder, getAdminUser } from '@/lib/marketplace/admin'
import { formatCents } from '@/lib/marketplace/format'
import type { OrderStatus } from '@/lib/marketplace/types'

/** Statuses where some form of refund is still allowed. */
const REFUNDABLE = new Set(['paid', 'fulfilled', 'shipped', 'delivered', 'partially_refunded'])
/** Statuses where a full refund has already been issued — block all further refunds. */
const FULLY_REFUNDED = new Set(['refunded'])

function MoneyRow({
  label,
  value,
  strong,
}: {
  label: string
  value: string
  strong?: boolean
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span
        className={
          strong
            ? 'text-[14px] font-semibold text-text-primary'
            : 'text-[13px] text-text-secondary'
        }
      >
        {label}
      </span>
      <span
        className={
          'font-mono tabular-nums ' +
          (strong
            ? 'text-[14px] font-semibold text-text-primary'
            : 'text-[13px] text-text-secondary')
        }
      >
        {value}
      </span>
    </div>
  )
}

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { isAdmin } = await getAdminUser()
  if (!isAdmin) notFound()

  const { id } = await params
  const order = await getAdminOrder(id)
  if (!order) notFound()
  const ship = order.ship_to

  const isFullyRefunded = FULLY_REFUNDED.has(order.status)
  const isPartiallyRefunded = order.status === 'partially_refunded'
  const refundable = REFUNDABLE.has(order.status)

  return (
    <AdminShell
      eyebrow="Commerce"
      title={`Order ${order.id.slice(0, 8).toUpperCase()}`}
      subtitle={order.brandName ?? undefined}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All orders
        </Link>
        <StatusChip kind="order" status={order.status as OrderStatus} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="rounded-[3px] border border-border bg-bg-surface p-5">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
              Items
            </span>
            <div className="mt-3 flex flex-col">
              {(order.items ?? []).map((it) => (
                <div
                  key={it.id}
                  className="flex items-center justify-between border-b border-border/50 py-2.5 last:border-b-0"
                >
                  <span className="text-[13.5px] text-text-primary">
                    {it.name_snapshot}{' '}
                    <span className="text-text-tertiary">&times; {it.qty}</span>
                  </span>
                  <span className="font-mono text-[13px] text-text-secondary tabular-nums">
                    {formatCents(it.unit_price_cents * it.qty, order.currency)}
                  </span>
                </div>
              ))}
              {(order.items ?? []).length === 0 && (
                <span className="text-[13px] text-text-tertiary">No line items.</span>
              )}
            </div>
            <div className="mt-3 border-t border-border pt-3">
              <MoneyRow
                label="Subtotal"
                value={formatCents(order.amount_subtotal_cents, order.currency)}
              />
              <MoneyRow
                label="Shipping"
                value={formatCents(order.shipping_cents, order.currency)}
              />
              <MoneyRow label="Tax" value={formatCents(order.tax_cents, order.currency)} />
              <div className="mt-1 border-t border-border/60 pt-1">
                <MoneyRow
                  label="Total"
                  value={formatCents(order.amount_total_cents, order.currency)}
                  strong
                />
              </div>
            </div>
          </div>

          <div className="rounded-[3px] border border-border bg-bg-surface p-5">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
              Refund
            </span>
            {isFullyRefunded ? (
              <p className="mt-2 text-[13px] text-text-secondary">
                This order has already been fully refunded. No further refunds are allowed.
              </p>
            ) : isPartiallyRefunded ? (
              <>
                <p className="mb-3 mt-1 text-[13px] text-text-secondary">
                  This order was partially refunded. Enter a specific dollar amount for an additional
                  partial refund. A blank amount is not accepted here — use the full order page if
                  you need to refund the remainder in full.
                </p>
                <RefundButton orderId={order.id} refundable requireAmount />
              </>
            ) : (
              <>
                <p className="mb-3 mt-1 text-[13px] text-text-secondary">
                  Issues a refund through Stripe and restores inventory. Enter an amount for a
                  partial refund, or leave blank for a full refund. This cannot be undone.
                </p>
                <RefundButton orderId={order.id} refundable={refundable} />
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-[3px] border border-border bg-bg-surface p-5">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
              Ship to
            </span>
            <div className="mt-2 text-[13.5px] leading-relaxed text-text-primary">
              {ship ? (
                <>
                  {ship.name && <div>{ship.name}</div>}
                  {ship.line1 && <div className="text-text-secondary">{ship.line1}</div>}
                  {ship.line2 && <div className="text-text-secondary">{ship.line2}</div>}
                  <div className="text-text-secondary">
                    {[ship.city, ship.state, ship.zip].filter(Boolean).join(', ')}
                  </div>
                  {ship.country && <div className="text-text-secondary">{ship.country}</div>}
                </>
              ) : (
                <span className="text-text-tertiary">No shipping address on file.</span>
              )}
            </div>
          </div>

          {order.tracking_number && (
            <div className="rounded-[3px] border border-border bg-bg-surface p-5">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
                Tracking
              </span>
              <div className="mt-2 font-mono text-[13px] text-text-primary tabular-nums">
                {order.tracking_carrier ? `${order.tracking_carrier} ` : ''}
                {order.tracking_number}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
