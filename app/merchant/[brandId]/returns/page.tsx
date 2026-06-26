import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { RotateCcw, Info } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import MerchantShell from '@/components/merchant/MerchantShell'
import MerchantEmptyState from '@/components/merchant/MerchantEmptyState'
import { getManagedBrand } from '@/lib/marketplace/queries'
import { createClient } from '@/lib/supabase/server'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Returns — Merchant Portal — PHYZIK',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/merchant` },
}

type ReturnStatus = 'requested' | 'approved' | 'denied' | 'refunded' | 'cancelled'

type ReturnRequest = {
  id: string
  order_id: string
  reason: string
  details: string | null
  status: ReturnStatus
  created_at: string
}

const STATUS_LABEL: Record<ReturnStatus, string> = {
  requested: 'Requested',
  approved: 'Approved',
  denied: 'Denied',
  refunded: 'Refunded',
  cancelled: 'Cancelled',
}

function ReturnStatusChip({ status }: { status: ReturnStatus }) {
  const toneMap: Record<ReturnStatus, string> = {
    requested: 'border-accent/35 bg-accent/[0.08] text-accent-bright',
    approved: 'border-[#5A7A64]/45 bg-[#5A7A64]/[0.12] text-[#9FC4AC]',
    refunded: 'border-[#5A7A64]/45 bg-[#5A7A64]/[0.12] text-[#9FC4AC]',
    denied: 'border-red-500/35 bg-red-500/[0.08] text-red-300',
    cancelled: 'border-border bg-white/[0.03] text-text-secondary',
  }
  const dotMap: Record<ReturnStatus, string> = {
    requested: 'bg-accent',
    approved: 'bg-[#5A7A64]',
    refunded: 'bg-[#5A7A64]',
    denied: 'bg-red-400',
    cancelled: 'bg-text-tertiary',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap ${toneMap[status]}`}
    >
      <span aria-hidden className={`inline-block h-1.5 w-1.5 rounded-full ${dotMap[status]}`} />
      {STATUS_LABEL[status]}
    </span>
  )
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function shortId(id: string) {
  return id.slice(0, 8).toUpperCase()
}

export default async function MerchantReturnsPage({
  params,
}: {
  params: Promise<{ brandId: string }>
}) {
  const { brandId } = await params
  const brand = await getManagedBrand(brandId)
  if (!brand) notFound()

  const sb = await createClient()
  const { data: returns } = await sb
    .from('marketplace_return_requests')
    .select('id,order_id,reason,details,status,created_at')
    .eq('brand_id', brandId)
    .order('created_at', { ascending: false })
    .limit(200)

  const rows = (returns ?? []) as ReturnRequest[]

  return (
    <>
      <Nav />
      <MerchantShell
        brand={brand}
        eyebrow="Post-purchase"
        title="Returns"
        subtitle={`${rows.length} return request${rows.length === 1 ? '' : 's'}.`}
      >
        <div className="flex flex-col gap-4">
          {/* Platform note */}
          <div className="flex items-start gap-2.5 rounded-[3px] border border-border/60 bg-bg-surface px-4 py-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-text-tertiary" />
            <p className="text-[13px] leading-snug text-text-secondary">
              PHYZIK issues approved refunds directly. You can view requests and their
              status here — refund disbursement is handled by the platform.
            </p>
          </div>

          {rows.length === 0 ? (
            <MerchantEmptyState
              icon={<RotateCcw className="h-5 w-5" />}
              title="No return requests"
              description="When a buyer files a return request for one of your orders, it will appear here."
            />
          ) : (
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
                        Reason
                      </th>
                      <th className="px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary">
                        Details
                      </th>
                      <th className="px-4 py-3 text-right text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-tertiary">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr
                        key={r.id}
                        className="border-b border-border/50 last:border-b-0 transition-colors hover:bg-white/[0.02]"
                      >
                        <td className="px-4 py-3.5">
                          <Link
                            href={`/merchant/${brandId}/orders/${r.order_id}`}
                            className="font-mono text-[12.5px] tabular-nums text-accent-bright underline-offset-2 hover:underline"
                          >
                            {shortId(r.order_id)}
                          </Link>
                        </td>
                        <td className="px-4 py-3.5 text-[13px] text-text-secondary tabular-nums">
                          {fmtDate(r.created_at)}
                        </td>
                        <td className="px-4 py-3.5 text-[13px] text-text-primary">
                          {r.reason}
                        </td>
                        <td className="max-w-[240px] px-4 py-3.5 text-[12.5px] text-text-secondary">
                          {r.details ? (
                            <span className="line-clamp-2">{r.details}</span>
                          ) : (
                            <span className="text-text-tertiary">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <ReturnStatusChip status={r.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </MerchantShell>
      <Footer />
    </>
  )
}
