import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Truck } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import MerchantShell from '@/components/merchant/MerchantShell'
import ShippingForm from './ShippingForm'
import { getManagedBrand } from '@/lib/marketplace/queries'
import { createClient } from '@/lib/supabase/server'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Shipping — Merchant Portal — PHYZIK',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/merchant` },
}

type ShippingProfile = {
  id: string
  name: string
  flat_rate_cents: number
  free_over_cents: number | null
  processing_days: number
  ships_from_zip: string | null
}

const DEFAULT_PROFILE = {
  name: 'Standard',
  flat_rate_cents: 0,
  free_over_cents: null,
  processing_days: 2,
  ships_from_zip: '',
}

export default async function MerchantShippingPage({
  params,
}: {
  params: Promise<{ brandId: string }>
}) {
  const { brandId } = await params
  const brand = await getManagedBrand(brandId)
  if (!brand) notFound()

  const sb = await createClient()
  const { data: profile } = await sb
    .from('marketplace_shipping_profiles')
    .select('id,name,flat_rate_cents,free_over_cents,processing_days,ships_from_zip')
    .eq('brand_id', brandId)
    .maybeSingle()

  const sp = profile as ShippingProfile | null

  const initial = sp
    ? {
        name: sp.name,
        flat_rate_cents: sp.flat_rate_cents,
        free_over_cents: sp.free_over_cents,
        processing_days: sp.processing_days,
        ships_from_zip: sp.ships_from_zip ?? '',
      }
    : DEFAULT_PROFILE

  return (
    <>
      <Nav />
      <MerchantShell
        brand={brand}
        eyebrow="Settings"
        title="Shipping"
        subtitle="Configure your flat-rate shipping profile. Rates apply to all products in your store."
        headerAside={
          <span className="inline-flex items-center gap-2 self-start rounded-[3px] border border-border bg-bg-high px-3 py-2 text-[12.5px] text-text-secondary sm:self-auto">
            <Truck className="h-3.5 w-3.5 text-accent/70" />
            Flat-rate v1
          </span>
        }
      >
        <div className="rounded-[3px] border border-border bg-bg-surface p-6">
          <ShippingForm brandId={brandId} initial={initial} />
        </div>
      </MerchantShell>
      <Footer />
    </>
  )
}
