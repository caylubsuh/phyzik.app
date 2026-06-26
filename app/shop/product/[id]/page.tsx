import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, BadgeCheck, ShieldCheck, Truck } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import FadeUp from '@/components/motion/FadeUp'
import ProductGallery from '@/components/shop/ProductGallery'
import VariantPicker from '@/components/shop/VariantPicker'
import StarRating from '@/components/shop/StarRating'
import SupplementDisclaimer from '@/components/shop/SupplementDisclaimer'
import SellerInfo from '@/components/shop/SellerInfo'
import ReviewForm from '@/components/shop/ReviewForm'
import {
  getProductDetail,
  getProductReviews,
} from '@/lib/marketplace/queries'
import { CATEGORY_LABEL, publicAssetUrl } from '@/lib/marketplace/format'
import { SITE_URL } from '@/lib/constants'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

type Params = { id: string }

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return ''
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { id } = await params
  const product = await getProductDetail(id)
  if (!product) {
    return { title: 'Product not found — PHYZIK Shop', robots: { index: false } }
  }
  const desc =
    product.description ??
    `${product.name} — available now on the PHYZIK Shop.`
  return {
    title: `${product.name} — PHYZIK Shop`,
    description: desc,
    alternates: { canonical: `${SITE_URL}/shop/product/${product.id}` },
    openGraph: {
      title: `${product.name} — PHYZIK Shop`,
      description: desc,
      url: `${SITE_URL}/shop/product/${product.id}`,
      images: product.image_url
        ? [{ url: publicAssetUrl(product.image_url) ?? '' }]
        : undefined,
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { id } = await params
  const product = await getProductDetail(id)
  if (!product) notFound()

  const reviews = await getProductReviews(product.id)
  const brand = product.brand

  // Determine if a user is signed in (for the review form)
  const sb = await createClient()
  const {
    data: { user },
  } = await sb.auth.getUser()
  const isSignedIn = user != null

  return (
    <>
      <Nav />

      <main id="main-content" className="relative overflow-hidden pb-20 pt-24 md:pt-28">
        <Container>
          {/* Breadcrumb */}
          <FadeUp>
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 text-[13px] text-text-tertiary"
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-text-secondary"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Shop
              </Link>
              <span aria-hidden>/</span>
              {brand ? (
                <Link
                  href={`/shop/${brand.slug}`}
                  className="transition-colors hover:text-text-secondary"
                >
                  {brand.name}
                </Link>
              ) : (
                <span>{CATEGORY_LABEL[product.category]}</span>
              )}
            </nav>
          </FadeUp>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Gallery */}
            <FadeUp>
              <ProductGallery
                images={product.images}
                fallbackImage={product.image_url}
                productName={product.name}
              />
            </FadeUp>

            {/* Buy panel */}
            <FadeUp delay={0.05}>
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-3">
                  {brand ? (
                    <Link
                      href={`/shop/${brand.slug}`}
                      className="inline-flex w-fit items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-text-tertiary transition-colors hover:text-accent-bright"
                    >
                      {brand.name}
                      {brand.verified && (
                        <BadgeCheck className="h-4 w-4 text-accent-bright" />
                      )}
                    </Link>
                  ) : (
                    <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                      {CATEGORY_LABEL[product.category]}
                    </span>
                  )}

                  <h1 className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold leading-[1.02] tracking-tightest text-text-primary">
                    {product.name}
                  </h1>

                  {product.reviewCount > 0 && (
                    <StarRating
                      value={product.reviewAvg}
                      count={product.reviewCount}
                      showValue
                    />
                  )}
                </div>

                <div
                  aria-hidden="true"
                  className="h-px w-full"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(168,137,46,0.35) 0%, transparent 100%)',
                  }}
                />

                <VariantPicker
                  productId={product.id}
                  productName={product.name}
                  productImage={product.image_url}
                  brandId={product.brand_id}
                  brandName={brand?.name ?? 'PHYZIK Shop'}
                  variants={product.variants}
                  options={product.options}
                  inventory={product.inventory}
                  fallbackMinCents={product.priceMinCents}
                  fallbackMaxCents={product.priceMaxCents}
                  currency={product.currency}
                />

                {/* Returns link */}
                <p className="text-[12.5px] text-text-tertiary">
                  <Link
                    href="/legal/returns"
                    className="underline underline-offset-2 transition-colors hover:text-text-secondary"
                  >
                    Returns &amp; refunds
                  </Link>
                </p>

                {/* Trust strip */}
                <div className="mt-1 grid grid-cols-2 gap-4 border-t border-border/60 pt-6 text-[12.5px] text-text-tertiary">
                  <div className="flex items-start gap-2.5">
                    <Truck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>Shipped direct by {brand?.name ?? 'the brand'}.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>Secure checkout, processed via Stripe.</span>
                  </div>
                </div>

                {/* Seller disclosure */}
                {brand && (
                  <SellerInfo brand={brand} />
                )}
              </div>
            </FadeUp>
          </div>

          {/* Description */}
          {product.description && (
            <FadeUp>
              <div className="mt-16 max-w-[720px] border-t border-border/60 pt-12">
                <h2 className="font-display text-[18px] font-bold tracking-tightest text-text-primary">
                  Details
                </h2>
                <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-text-secondary">
                  {product.description}
                </p>
              </div>
            </FadeUp>
          )}

          {/* FDA supplement disclaimer — only for supplements */}
          {product.category === 'supplements' && (
            <FadeUp>
              <div className="mt-8 max-w-[720px]">
                <SupplementDisclaimer />
              </div>
            </FadeUp>
          )}

          {/* Reviews */}
          <section className="mt-16 border-t border-border/60 pt-12">
            <div className="mb-8 flex items-baseline justify-between gap-4">
              <h2 className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-bold tracking-tightest text-text-primary">
                Reviews
              </h2>
              {product.reviewCount > 0 && (
                <StarRating
                  value={product.reviewAvg}
                  count={product.reviewCount}
                  size={16}
                  showValue
                />
              )}
            </div>

            {reviews.length === 0 ? (
              <p className="rounded-[3px] border border-border/70 bg-bg-surface/50 px-6 py-10 text-center text-[14px] text-text-secondary">
                No reviews yet. Be the first to review this after your order
                arrives.
              </p>
            ) : (
              <ul className="flex flex-col divide-y divide-border/60">
                {reviews.map((r) => (
                  <li key={r.id} className="flex flex-col gap-2.5 py-6">
                    <div className="flex items-center justify-between gap-4">
                      <StarRating value={r.rating} size={14} />
                      <span className="text-[12px] text-text-tertiary">
                        {formatDate(r.created_at)}
                      </span>
                    </div>
                    {r.body && (
                      <p className="text-[14.5px] leading-relaxed text-text-secondary">
                        {r.body}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {/* Review submission form */}
            <div className="mt-10 border-t border-border/60 pt-8">
              <h3 className="mb-5 font-display text-[16px] font-bold tracking-tightest text-text-primary">
                Write a Review
              </h3>
              <ReviewForm productId={product.id} isSignedIn={isSignedIn} />
            </div>
          </section>
        </Container>
      </main>

      <Footer />
    </>
  )
}
