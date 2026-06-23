import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ShoppingBag, Smartphone } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import MerchantShell from '@/components/merchant/MerchantShell'
import OrderTable from '@/components/merchant/OrderTable'
import MerchantEmptyState from '@/components/merchant/MerchantEmptyState'
import { getManagedBrand, getMerchantOrders } from '@/lib/marketplace/queries'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Orders — Merchant Portal — PHYZIK',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/merchant` },
}

export default async function MerchantOrdersPage({
  params,
}: {
  params: Promise<{ brandId: string }>
}) {
  const { brandId } = await params
  const brand = await getManagedBrand(brandId)
  if (!brand) notFound()

  const orders = await getMerchantOrders(brandId)

  return (
    <>
      <Nav />
      <MerchantShell
        brand={brand}
        eyebrow="Sales"
        title="Orders"
        subtitle={`${orders.length} order${orders.length === 1 ? '' : 's'} to date.`}
        headerAside={
          <span className="inline-flex items-center gap-2 self-start rounded-[3px] border border-border bg-bg-high px-3 py-2 text-[12.5px] text-text-secondary sm:self-auto">
            <Smartphone className="h-3.5 w-3.5 text-accent/70" />
            Fulfill orders in the PHYZIK app
          </span>
        }
      >
        {orders.length === 0 ? (
          <MerchantEmptyState
            icon={<ShoppingBag className="h-5 w-5" />}
            title="No orders yet"
            description="When a lifter checks out with one of your products, the order shows up here. Mark it shipped from the PHYZIK app."
            note="Fulfillment (mark shipped / delivered) is handled in the PHYZIK app."
          />
        ) : (
          <div className="flex flex-col gap-3">
            <OrderTable orders={orders} />
            <p className="text-[12.5px] text-text-tertiary">
              Display only. Mark orders shipped or delivered from the PHYZIK app
              for now.
            </p>
          </div>
        )}
      </MerchantShell>
      <Footer />
    </>
  )
}
