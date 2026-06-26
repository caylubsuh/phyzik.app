import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Package } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import MerchantShell from '@/components/merchant/MerchantShell'
import StatusChip from '@/components/merchant/StatusChip'
import FulfillmentControl from './FulfillmentControl'
import { getManagedBrand } from '@/lib/marketplace/queries'
import { getMerchantOrder } from '@/lib/marketplace/merchant-order'
import { formatCents } from '@/lib/marketplace/format'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Order Detail — Merchant Portal — PHYZIK',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/merchant` },
}

function shortId(id: string) {
  return id.slice(0, 8).toUpperCase()
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function MerchantOrderDetailPage({
  params,
}: {
  params: Promise<{ brandId: string; orderId: string }>
}) {
  const { brandId, orderId } = await params
  const [brand, order] = await Promise.all([
    getManagedBrand(brandId),
    getMerchantOrder(brandId, orderId),
  ])
  if (!brand || !order) notFound()

  const ship = order.ship_to

  return (
    <>
      <Nav />
      <MerchantShell
        brand={brand}
        eyebrow="Orders"
        title={`Order ${shortId(order.id)}`}
        subtitle={`Placed ${fmtDate(order.created_at)}`}
        headerAside={
          <Link
            href={`/merchant/${brandId}/orders`}
            className="inline-flex items-center gap-1.5 self-start rounded-[3px] border border-border bg-bg-high px-3 py-2 text-[12.5px] font-semibold text-text-secondary transition-colors hover:text-text-primary sm:self-auto"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to orders
          </Link>
        }
      >
        <div className="flex flex-col gap-5">
          {/* Status + tracking summary */}
          <div className="flex flex-wrap items-center gap-3 rounded-[3px] border border-border bg-bg-surface px-4 py-3">
            <StatusChip kind="order" status={order.status} />
            {order.tracking_number && (
              <span className="font-mono text-[12.5px] text-text-secondary tabular-nums">
                {order.tracking_carrier ? `${order.tracking_carrier} ` : ''}
                {order.tracking_number}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
            <div className="flex flex-col gap-5">
              {/* Line items */}
              <div className="overflow-hidden rounded-[3px] border border-border bg-bg-surface">
                <div className="border-b border-border px-5 py-3.5">
                  <span className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
                    <Package className="h-3.5 w-3.5" />
                    Items
                  </span>
                </div>
                <div className="divide-y divide-border/50">
                  {(order.items ?? []).map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-4 px-5 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[13.5px] font-medium text-text-primary">
                          {item.name_snapshot}
                        </span>
                        <span className="text-[12px] text-text-tertiary">
                          Qty: {item.qty}
                        </span>
                      </div>
                      <span className="shrink-0 font-mono text-[13px] font-medium text-text-primary tabular-nums">
                        {formatCents(item.unit_price_cents * item.qty, order.currency)}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Totals */}
                <div className="divide-y divide-border/50 border-t border-border bg-bg-high/40">
                  {order.shipping_cents > 0 && (
                    <div className="flex items-center justify-between px-5 py-3 text-[13px] text-text-secondary">
                      <span>Shipping</span>
                      <span className="font-mono tabular-nums">
                        {formatCents(order.shipping_cents, order.currency)}
                      </span>
                    </div>
                  )}
                  {order.tax_cents > 0 && (
                    <div className="flex items-center justify-between px-5 py-3 text-[13px] text-text-secondary">
                      <span>Tax</span>
                      <span className="font-mono tabular-nums">
                        {formatCents(order.tax_cents, order.currency)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between px-5 py-3 text-[14px] font-semibold text-text-primary">
                    <span>Total</span>
                    <span className="font-mono tabular-nums">
                      {formatCents(order.amount_total_cents, order.currency)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fulfillment control */}
              <FulfillmentControl
                brandId={brandId}
                orderId={order.id}
                status={order.status}
              />
            </div>

            {/* Ship-to sidebar */}
            {ship && (
              <div className="flex flex-col gap-3 rounded-[3px] border border-border bg-bg-surface p-5">
                <span className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
                  <MapPin className="h-3.5 w-3.5" />
                  Ship to
                </span>
                <div className="flex flex-col gap-1 text-[13.5px] leading-relaxed text-text-secondary">
                  {ship.name && (
                    <span className="font-semibold text-text-primary">{ship.name}</span>
                  )}
                  {ship.line1 && <span>{ship.line1}</span>}
                  {ship.line2 && <span>{ship.line2}</span>}
                  {(ship.city || ship.state || ship.zip) && (
                    <span>
                      {[ship.city, ship.state, ship.zip].filter(Boolean).join(', ')}
                    </span>
                  )}
                  {ship.country && <span>{ship.country}</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      </MerchantShell>
      <Footer />
    </>
  )
}
