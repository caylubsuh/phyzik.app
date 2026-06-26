import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import MerchantShell from '@/components/merchant/MerchantShell'
import ProductEditor from '@/components/merchant/ProductEditor'
import { getManagedBrand } from '@/lib/marketplace/queries'
import { getBrandPrimaryCategory } from '@/lib/marketplace/merchant-products'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'New product — Merchant Portal — PHYZIK',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/merchant` },
}

export default async function NewMerchantProductPage({
  params,
}: {
  params: Promise<{ brandId: string }>
}) {
  const { brandId } = await params
  const brand = await getManagedBrand(brandId)
  if (!brand) notFound()

  const primaryCategory = await getBrandPrimaryCategory(brandId)

  return (
    <>
      <Nav />
      <MerchantShell
        brand={brand}
        eyebrow="Catalog"
        title="New product"
        subtitle="Add an item to your catalog. Save it as a draft, or submit it for PHYZIK review to go live on the Shop."
        headerAside={
          <Link
            href={`/merchant/${brandId}/products`}
            className="inline-flex items-center gap-2 self-start rounded-[3px] border border-border bg-bg-high px-3 py-2 text-[12.5px] font-semibold text-text-secondary transition-colors hover:border-accent/35 hover:text-text-primary sm:self-auto"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to products
          </Link>
        }
      >
        <ProductEditor brandId={brandId} brandPrimaryCategory={primaryCategory} />
      </MerchantShell>
      <Footer />
    </>
  )
}
