import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Package, Smartphone } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import MerchantShell from '@/components/merchant/MerchantShell'
import ProductTable from '@/components/merchant/ProductTable'
import MerchantEmptyState from '@/components/merchant/MerchantEmptyState'
import { getManagedBrand, getMerchantProducts } from '@/lib/marketplace/queries'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Products — Merchant Portal — PHYZIK',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/merchant` },
}

export default async function MerchantProductsPage({
  params,
}: {
  params: Promise<{ brandId: string }>
}) {
  const { brandId } = await params
  const brand = await getManagedBrand(brandId)
  if (!brand) notFound()

  const products = await getMerchantProducts(brandId)

  return (
    <>
      <Nav />
      <MerchantShell
        brand={brand}
        eyebrow="Catalog"
        title="Products"
        subtitle={`${products.length} product${products.length === 1 ? '' : 's'} in your catalog.`}
        headerAside={
          <span className="inline-flex items-center gap-2 self-start rounded-[3px] border border-border bg-bg-high px-3 py-2 text-[12.5px] text-text-secondary sm:self-auto">
            <Smartphone className="h-3.5 w-3.5 text-accent/70" />
            Create &amp; edit in the PHYZIK app
          </span>
        }
      >
        {products.length === 0 ? (
          <MerchantEmptyState
            icon={<Package className="h-5 w-5" />}
            title="No products yet"
            description="Add your first product from the PHYZIK app. It'll appear here once it's created — published items go live on the Shop."
            note="Product creation & editing happens in the PHYZIK app."
          />
        ) : (
          <div className="flex flex-col gap-3">
            <ProductTable products={products} />
            <p className="text-[12.5px] text-text-tertiary">
              Display only. To add, edit, or publish products, use the PHYZIK app.
            </p>
          </div>
        )}
      </MerchantShell>
      <Footer />
    </>
  )
}
