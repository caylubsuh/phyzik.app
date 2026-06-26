import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Package, Plus } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import MerchantShell from '@/components/merchant/MerchantShell'
import ProductTable from '@/components/merchant/ProductTable'
import MerchantEmptyState from '@/components/merchant/MerchantEmptyState'
import Button from '@/components/ui/Button'
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
          <Button variant="gold" size="md" asChild className="self-start sm:self-auto">
            <Link href={`/merchant/${brandId}/products/new`}>
              <Plus className="h-4 w-4" />
              New product
            </Link>
          </Button>
        }
      >
        {products.length === 0 ? (
          <MerchantEmptyState
            icon={<Package className="h-5 w-5" />}
            title="No products yet"
            description="Add your first product to start building your catalog. Save it as a draft, then submit it for review to go live on the Shop."
            cta={{ label: 'Add your first product', href: `/merchant/${brandId}/products/new` }}
          />
        ) : (
          <div className="flex flex-col gap-3">
            <ProductTable products={products} brandId={brandId} />
            <p className="text-[12.5px] text-text-tertiary">
              Tap a product to edit. Published listings require PHYZIK review.
            </p>
          </div>
        )}
      </MerchantShell>
      <Footer />
    </>
  )
}
