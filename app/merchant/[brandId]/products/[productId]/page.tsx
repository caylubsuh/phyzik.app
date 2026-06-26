import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import MerchantShell from '@/components/merchant/MerchantShell'
import ProductEditor from '@/components/merchant/ProductEditor'
import ProductArchiveControl from '@/components/merchant/ProductArchiveControl'
import StatusChip from '@/components/merchant/StatusChip'
import { getManagedBrand } from '@/lib/marketplace/queries'
import { getMerchantProductForEdit } from '@/lib/marketplace/merchant-products'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Edit product — Merchant Portal — PHYZIK',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/merchant` },
}

export default async function EditMerchantProductPage({
  params,
}: {
  params: Promise<{ brandId: string; productId: string }>
}) {
  const { brandId, productId } = await params
  const brand = await getManagedBrand(brandId)
  if (!brand) notFound()

  const product = await getMerchantProductForEdit(brandId, productId)
  if (!product) notFound()

  return (
    <>
      <Nav />
      <MerchantShell
        brand={brand}
        eyebrow="Catalog"
        title={product.name}
        subtitle="Update details, pricing, and stock. Changes are saved as a draft or submitted for PHYZIK review."
        headerAside={
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <StatusChip kind="product" status={product.status} />
            <Link
              href={`/merchant/${brandId}/products`}
              className="inline-flex items-center gap-2 rounded-[3px] border border-border bg-bg-high px-3 py-2 text-[12.5px] font-semibold text-text-secondary transition-colors hover:border-accent/35 hover:text-text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to products
            </Link>
          </div>
        }
      >
        <div className="flex flex-col gap-7">
          <ProductEditor
            brandId={brandId}
            brandPrimaryCategory={product.category}
            initial={product}
          />
          <ProductArchiveControl
            brandId={brandId}
            productId={product.id}
            status={product.status}
          />
        </div>
      </MerchantShell>
      <Footer />
    </>
  )
}
