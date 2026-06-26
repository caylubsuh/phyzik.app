// Server component — single buyer order detail
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Package, Truck } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import StatusChip from '@/components/merchant/StatusChip'
import { getMyOrder } from '@/lib/marketplace/queries'
import { formatCents } from '@/lib/marketplace/format'

export const metadata: Metadata = {
  title: 'Order — PHYZIK Shop',
  robots: { index: false, follow: false },
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function OrderDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ success?: string }>
}) {
  const { id } = await params
  const sp = await searchParams

  const order = await getMyOrder(id)
  if (!order) notFound()

  const shortId = order.id.slice(-8).toUpperCase()
  const currency = order.currency ?? 'USD'
  const hasTracking = !!(order.tracking_carrier || order.tracking_number)

  return (
    <>
      <Nav />
      <main
        id="main-content"
        className="relative min-h-[60vh] overflow-hidden pb-24 pt-28 md:pt-36"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(168,137,46,0.08) 0%, transparent 60%), linear-gradient(180deg, #0A0A0B 0%, #050506 100%)',
          }}
        />
        <Container>
          <div className="mx-auto w-full max-w-[720px]">
            <Link
              href="/orders"
              className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-text-secondary transition-colors hover:text-text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All orders
            </Link>

            {/* Success banner */}
            {sp.success === '1' && (
              <div className="relative mb-8 overflow-hidden rounded-[3px] border border-accent/40 bg-bg-high/50 px-6 py-5">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(245,220,170,0.7), transparent)',
                  }}
                />
                <p className="text-[14.5px] font-semibold text-text-primary">
                  Payment confirmed. Your order is on its way.
                </p>
                <p className="mt-1 text-[13px] text-text-secondary">
                  You&apos;ll receive a confirmation email shortly. Track your
                  package using the information below once the brand ships it.
                </p>
              </div>
            )}

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[13px] font-semibold text-text-primary">
                    #{shortId}
                  </span>
                  <StatusChip kind="order" status={order.status} />
                </div>
                <p className="text-[12.5px] text-text-tertiary">
                  Placed {fmtDate(order.created_at)}
                  {order.brandName && (
                    <> · <span className="text-text-secondary">{order.brandName}</span></>
                  )}
                </p>
              </div>
            </div>

            {/* Tracking */}
            {hasTracking && (
              <div className="mt-7 flex items-start gap-3 rounded-[3px] border border-border bg-bg-surface/60 p-5">
                <Truck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div className="flex flex-col gap-1">
                  <span className="text-[13px] font-semibold text-text-primary">
                    Tracking
                  </span>
                  {order.tracking_carrier && (
                    <span className="text-[13px] text-text-secondary">
                      Carrier:{' '}
                      <span className="font-medium text-text-primary">
                        {order.tracking_carrier}
                      </span>
                    </span>
                  )}
                  {order.tracking_number && (
                    <span className="font-mono text-[13px] text-text-secondary">
                      {order.tracking_number}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto]">
              {/* Items */}
              <div className="rounded-[3px] border border-border bg-bg-surface/60 p-6">
                <div className="mb-5 flex items-center gap-2">
                  <Package className="h-4 w-4 text-accent" />
                  <h2 className="font-display text-[15px] font-bold tracking-tightest text-text-primary">
                    Items
                  </h2>
                </div>
                {(!order.items || order.items.length === 0) ? (
                  <p className="text-[13px] text-text-tertiary">
                    Item details unavailable.
                  </p>
                ) : (
                  <ul className="flex flex-col divide-y divide-border/60">
                    {order.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                      >
                        <div className="min-w-0 flex-1">
                          <span className="block text-[14px] text-text-primary">
                            {item.name_snapshot}
                          </span>
                          <span className="text-[12px] text-text-tertiary">
                            Qty {item.qty}
                          </span>
                        </div>
                        <span className="shrink-0 text-[14px] tabular-nums text-text-secondary">
                          {formatCents(item.unit_price_cents * item.qty, currency)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Right column: totals + address */}
              <div className="flex flex-col gap-5 lg:w-[240px]">
                {/* Money breakdown */}
                <div className="rounded-[3px] border border-border bg-bg-surface/60 p-5">
                  <h3 className="mb-4 font-display text-[14px] font-bold tracking-tightest text-text-primary">
                    Summary
                  </h3>
                  <dl className="flex flex-col gap-2 text-[13.5px]">
                    <div className="flex justify-between">
                      <dt className="text-text-secondary">Subtotal</dt>
                      <dd className="tabular-nums text-text-primary">
                        {formatCents(order.amount_subtotal_cents, currency)}
                      </dd>
                    </div>
                    {order.shipping_cents > 0 && (
                      <div className="flex justify-between">
                        <dt className="text-text-secondary">Shipping</dt>
                        <dd className="tabular-nums text-text-primary">
                          {formatCents(order.shipping_cents, currency)}
                        </dd>
                      </div>
                    )}
                    {order.tax_cents > 0 && (
                      <div className="flex justify-between">
                        <dt className="text-text-secondary">Tax</dt>
                        <dd className="tabular-nums text-text-primary">
                          {formatCents(order.tax_cents, currency)}
                        </dd>
                      </div>
                    )}
                    <div
                      aria-hidden="true"
                      className="my-1 h-px w-full"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent, rgba(168,137,46,0.35), transparent)',
                      }}
                    />
                    <div className="flex justify-between">
                      <dt className="text-[12px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                        Total
                      </dt>
                      <dd className="font-display text-[18px] font-bold tabular-nums tracking-tightest text-text-primary">
                        {formatCents(order.amount_total_cents, currency)}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Ship-to address */}
                {order.ship_to && (
                  <div className="rounded-[3px] border border-border bg-bg-surface/60 p-5">
                    <h3 className="mb-3 font-display text-[14px] font-bold tracking-tightest text-text-primary">
                      Ship to
                    </h3>
                    <address className="not-italic text-[13px] leading-relaxed text-text-secondary">
                      {order.ship_to.name && (
                        <span className="block font-medium text-text-primary">
                          {order.ship_to.name}
                        </span>
                      )}
                      {order.ship_to.line1 && (
                        <span className="block">{order.ship_to.line1}</span>
                      )}
                      {order.ship_to.line2 && (
                        <span className="block">{order.ship_to.line2}</span>
                      )}
                      {(order.ship_to.city ||
                        order.ship_to.state ||
                        order.ship_to.zip) && (
                        <span className="block">
                          {[
                            order.ship_to.city,
                            order.ship_to.state,
                            order.ship_to.zip,
                          ]
                            .filter(Boolean)
                            .join(', ')}
                        </span>
                      )}
                      {order.ship_to.country && (
                        <span className="block">{order.ship_to.country}</span>
                      )}
                    </address>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
