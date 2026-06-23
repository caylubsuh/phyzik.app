import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Wallet } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import MerchantShell from '@/components/merchant/MerchantShell'
import EarningsStats from '@/components/merchant/EarningsStats'
import MerchantEmptyState from '@/components/merchant/MerchantEmptyState'
import {
  getManagedBrand,
  getMerchantEarnings,
  CATEGORY_COMMISSION_BPS,
} from '@/lib/marketplace/queries'
import { CATEGORY_LABEL, formatCents } from '@/lib/marketplace/format'
import { SITE_URL } from '@/lib/constants'
import type { MarketplaceCategory } from '@/lib/marketplace/types'

export const metadata: Metadata = {
  title: 'Earnings — Merchant Portal — PHYZIK',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/merchant` },
}

function bpsToPct(bps: number): string {
  return `${(bps / 100).toFixed(bps % 100 === 0 ? 0 : 1)}%`
}

export default async function MerchantEarningsPage({
  params,
}: {
  params: Promise<{ brandId: string }>
}) {
  const { brandId } = await params
  const brand = await getManagedBrand(brandId)
  if (!brand) notFound()

  const earnings = await getMerchantEarnings(brandId)
  const hasActivity = earnings.paidOrderCount > 0

  const categories = Object.keys(CATEGORY_COMMISSION_BPS) as MarketplaceCategory[]

  return (
    <>
      <Nav />
      <MerchantShell
        brand={brand}
        eyebrow="Money"
        title="Earnings"
        subtitle="How your revenue breaks down — platform commission, Stripe processing, and net to you."
      >
        <div className="flex flex-col gap-9">
          <EarningsStats earnings={earnings} />

          {!hasActivity && (
            <MerchantEmptyState
              icon={<Wallet className="h-5 w-5" />}
              title="No earnings yet"
              description="Once your first order is paid, your GMV, commission, processing, and net payout figures will populate here."
            />
          )}

          {/* Fee model */}
          <div className="flex flex-col gap-4 rounded-[3px] border border-border bg-bg-surface p-6">
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display text-[18px] font-bold tracking-tightest text-text-primary">
                How fees work
              </h3>
              <p className="max-w-[620px] text-[14px] leading-relaxed text-text-secondary">
                Every paid order is split three ways: a PHYZIK commission (varies
                by product category), a Stripe processing passthrough, and your
                net — settled to your bank as a payout.
              </p>
            </div>

            {/* Three-part split */}
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[3px] border border-border/70 sm:grid-cols-3">
              <div className="flex flex-col gap-1 bg-bg-high p-4">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-tertiary">
                  PHYZIK commission
                </span>
                <span className="font-display text-[16px] font-bold tracking-tight text-accent-bright tabular-nums">
                  {bpsToPct(brand.commission_bps)}
                </span>
                <span className="text-[12px] leading-snug text-text-secondary">
                  Your brand&apos;s rate on subtotal.
                </span>
              </div>
              <div className="flex flex-col gap-1 bg-bg-high p-4">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-tertiary">
                  Stripe processing
                </span>
                <span className="font-display text-[16px] font-bold tracking-tight text-text-primary tabular-nums">
                  2.9% + 30¢
                </span>
                <span className="text-[12px] leading-snug text-text-secondary">
                  Standard card processing, per order.
                </span>
              </div>
              <div className="flex flex-col gap-1 bg-bg-high p-4">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-tertiary">
                  Your net
                </span>
                <span className="font-display text-[16px] font-bold tracking-tight text-[#9FC4AC] tabular-nums">
                  Subtotal − fees
                </span>
                <span className="text-[12px] leading-snug text-text-secondary">
                  What lands in your account.
                </span>
              </div>
            </div>

            {/* Per-category commission reference */}
            <div className="mt-1 flex flex-col gap-2">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-tertiary">
                Commission by category
              </span>
              <div className="overflow-hidden rounded-[3px] border border-border/70">
                <table className="w-full border-collapse text-left">
                  <tbody>
                    {categories.map((cat) => (
                      <tr
                        key={cat}
                        className="border-b border-border/50 last:border-b-0"
                      >
                        <td className="px-4 py-2.5 text-[13.5px] text-text-secondary">
                          {CATEGORY_LABEL[cat]}
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono text-[13.5px] font-medium text-text-primary tabular-nums">
                          {bpsToPct(CATEGORY_COMMISSION_BPS[cat])}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Payouts */}
          <div className="flex flex-col gap-3 rounded-[3px] border border-border bg-bg-surface p-6">
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display text-[18px] font-bold tracking-tightest text-text-primary">
                Payouts
              </h3>
              <p className="max-w-[620px] text-[14px] leading-relaxed text-text-secondary">
                Net proceeds settle to your connected Stripe account on Stripe&apos;s
                standard payout schedule. Manage your bank details and payout
                cadence from the PHYZIK app.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border/60 pt-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-tertiary">
                  Paid to date
                </span>
                <span className="font-display text-[20px] font-bold tracking-tight text-text-primary tabular-nums">
                  {formatCents(earnings.payoutPaidCents)}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-tertiary">
                  Payouts enabled
                </span>
                <span className="font-display text-[20px] font-bold tracking-tight text-text-primary">
                  {brand.payouts_enabled ? 'Yes' : 'Not yet'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </MerchantShell>
      <Footer />
    </>
  )
}
