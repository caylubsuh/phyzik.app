import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Package, ShoppingBag, Wallet, ArrowRight } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import MerchantShell from '@/components/merchant/MerchantShell'
import EarningsStats from '@/components/merchant/EarningsStats'
import ConnectStatus from '@/components/merchant/ConnectStatus'
import { getManagedBrand, getMerchantEarnings } from '@/lib/marketplace/queries'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Dashboard — Merchant Portal — PHYZIK',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/merchant` },
}

const QUICK_LINKS = [
  {
    label: 'Products',
    desc: 'Your catalog & status',
    href: 'products',
    icon: Package,
  },
  {
    label: 'Orders',
    desc: 'Sales & fulfillment',
    href: 'orders',
    icon: ShoppingBag,
  },
  {
    label: 'Earnings',
    desc: 'Fees, net & payouts',
    href: 'earnings',
    icon: Wallet,
  },
]

export default async function MerchantDashboardPage({
  params,
}: {
  params: Promise<{ brandId: string }>
}) {
  const { brandId } = await params
  const brand = await getManagedBrand(brandId)
  if (!brand) notFound()

  const earnings = await getMerchantEarnings(brandId)

  return (
    <>
      <Nav />
      <MerchantShell
        brand={brand}
        eyebrow="Overview"
        title="Dashboard"
        subtitle="A live snapshot of your store. Numbers reflect paid orders to date."
      >
        <div className="flex flex-col gap-8">
          <EarningsStats earnings={earnings} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
            <ConnectStatus
              status={brand.status}
              chargesEnabled={brand.charges_enabled}
              payoutsEnabled={brand.payouts_enabled}
              stripeAccountId={brand.stripe_account_id}
            />

            <div className="flex flex-col gap-3">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
                Quick links
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {QUICK_LINKS.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={`/merchant/${brandId}/${link.href}`}
                      className="group flex items-center justify-between gap-3 rounded-[3px] border border-border bg-bg-surface px-4 py-3.5 transition-colors hover:border-accent/35 hover:bg-bg-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-accent/25 bg-accent/[0.06] text-accent-bright">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="flex flex-col">
                          <span className="text-[14.5px] font-semibold text-text-primary">
                            {link.label}
                          </span>
                          <span className="text-[12.5px] text-text-tertiary">
                            {link.desc}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-text-tertiary transition-colors group-hover:text-accent-bright" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </MerchantShell>
      <Footer />
    </>
  )
}
