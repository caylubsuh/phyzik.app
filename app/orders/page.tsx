// Server component — buyer's order history
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Package } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import StatusChip from '@/components/merchant/StatusChip'
import { createClient } from '@/lib/supabase/server'
import { getMyOrders } from '@/lib/marketplace/queries'
import { formatCents } from '@/lib/marketplace/format'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'My Orders — PHYZIK Shop',
  description: 'View and track your PHYZIK Shop orders.',
  alternates: { canonical: `${SITE_URL}/orders` },
  robots: { index: false, follow: false },
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function OrdersPage() {
  const sb = await createClient()
  const {
    data: { user },
  } = await sb.auth.getUser()

  if (!user) {
    redirect('/login?next=/orders')
  }

  const orders = await getMyOrders()

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
            <span className="block text-[10.5px] font-bold uppercase tracking-[0.32em] text-text-tertiary">
              Account
            </span>
            <h1 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-tightest text-text-primary">
              My orders
            </h1>

            {orders.length === 0 ? (
              <div className="mt-10 flex flex-col items-center gap-5 rounded-[3px] border border-border/70 bg-bg-surface/50 px-8 py-16 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-[3px] border border-border bg-bg-deep/80">
                  <Package className="h-6 w-6 text-text-tertiary" />
                </span>
                <h2 className="font-display text-[20px] font-bold tracking-tightest text-text-primary">
                  No orders yet
                </h2>
                <p className="max-w-[360px] text-[14px] leading-relaxed text-text-secondary">
                  When you purchase from the PHYZIK Shop your orders will appear
                  here.
                </p>
                <Link
                  href="/shop"
                  className="mt-2 inline-flex h-11 items-center justify-center rounded-[3px] border border-accent/40 bg-accent/[0.08] px-5 text-[14px] font-semibold text-accent-bright transition-colors hover:bg-accent/[0.14]"
                >
                  Browse the shop
                </Link>
              </div>
            ) : (
              <ul className="mt-8 flex flex-col gap-3">
                {orders.map((order) => {
                  const itemCount = order.items?.length ?? 0
                  const shortId = order.id.slice(-8).toUpperCase()
                  return (
                    <li key={order.id}>
                      <Link
                        href={`/orders/${order.id}`}
                        className="group flex items-center justify-between gap-4 rounded-[3px] border border-border bg-bg-surface/60 p-5 transition-colors hover:border-accent/30 hover:bg-bg-high/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                      >
                        <div className="flex min-w-0 flex-col gap-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[13px] font-semibold text-text-primary">
                              #{shortId}
                            </span>
                            <StatusChip kind="order" status={order.status} />
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-[12.5px] text-text-tertiary">
                            {order.brandName && (
                              <span className="text-text-secondary">
                                {order.brandName}
                              </span>
                            )}
                            <span>
                              {itemCount} item{itemCount !== 1 ? 's' : ''}
                            </span>
                            <span>{fmtDate(order.created_at)}</span>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <span className="font-display text-[16px] font-bold tabular-nums tracking-tight text-text-primary">
                            {formatCents(order.amount_total_cents, order.currency)}
                          </span>
                          <svg
                            aria-hidden="true"
                            className="h-4 w-4 text-text-tertiary transition-colors group-hover:text-accent-bright"
                            fill="none"
                            viewBox="0 0 16 16"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 3l5 5-5 5"
                            />
                          </svg>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
