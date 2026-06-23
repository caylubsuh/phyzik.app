import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, BadgeCheck, ExternalLink, Tag } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import FadeUp from '@/components/motion/FadeUp'
import { ZMark } from '@/components/brand/BrandMarks'
import ProductCard from '@/components/shop/ProductCard'
import ShopEmptyState from '@/components/shop/ShopEmptyState'
import { getBrand, getProducts } from '@/lib/marketplace/queries'
import { publicAssetUrl, CATEGORY_LABEL } from '@/lib/marketplace/format'
import { SITE_URL } from '@/lib/constants'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

type Params = { slug: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const brand = await getBrand(slug)
  if (!brand) {
    return { title: 'Brand not found — PHYZIK Shop', robots: { index: false } }
  }
  const desc =
    brand.description ??
    `Shop ${brand.name} on PHYZIK — built for lifters who train.`
  return {
    title: `${brand.name} — PHYZIK Shop`,
    description: desc,
    alternates: { canonical: `${SITE_URL}/shop/${brand.slug}` },
    openGraph: {
      title: `${brand.name} — PHYZIK Shop`,
      description: desc,
      url: `${SITE_URL}/shop/${brand.slug}`,
      images: brand.banner_url
        ? [{ url: publicAssetUrl(brand.banner_url) ?? '' }]
        : undefined,
    },
  }
}

export default async function BrandStorefrontPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const brand = await getBrand(slug)
  if (!brand) notFound()

  const products = await getProducts({ brandId: brand.id })
  const banner = publicAssetUrl(brand.banner_url)
  const logo = publicAssetUrl(brand.logo_url)

  return (
    <>
      <Nav />

      <main id="main-content" className="relative overflow-hidden">
        {/* ─────────── BANNER ─────────── */}
        <section className="relative pt-16">
          <div className="relative h-[220px] w-full overflow-hidden bg-bg-deep md:h-[320px]">
            {banner ? (
              <Image
                src={banner}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 100% at 30% 0%, rgba(168,137,46,0.20) 0%, transparent 60%), #0A0A0B',
                }}
              />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent"
            />
          </div>

          <Container>
            <div className="relative -mt-16 flex flex-col gap-5 md:-mt-20 md:flex-row md:items-end md:justify-between">
              <div className="flex items-end gap-5">
                <span className="relative z-10 flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[3px] border border-border-strong bg-bg-deep md:h-28 md:w-28">
                  {logo ? (
                    <Image
                      src={logo}
                      alt={brand.name}
                      width={112}
                      height={112}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ZMark sizeClass="h-12 w-auto opacity-50" />
                  )}
                </span>
                <div className="pb-1">
                  <div className="flex items-center gap-2">
                    <h1 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-none tracking-tightest text-text-primary">
                      {brand.name}
                    </h1>
                    {brand.verified && (
                      <BadgeCheck
                        className="h-6 w-6 text-accent-bright"
                        aria-label="Verified brand"
                      />
                    )}
                  </div>
                  {brand.categories.length > 0 && (
                    <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                      {brand.categories.map((c) => CATEGORY_LABEL[c]).join(' · ')}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {brand.website_url && (
                  <Button variant="secondary" size="md" asChild>
                    <a
                      href={brand.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Website
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                )}
                <Button variant="gold" size="md" asChild>
                  <Link href="/login?next=/shop">Follow</Link>
                </Button>
              </div>
            </div>

            {brand.description && (
              <FadeUp>
                <p className="mt-7 max-w-[680px] text-[15px] leading-relaxed text-text-secondary">
                  {brand.description}
                </p>
              </FadeUp>
            )}

            {brand.promo_code && (
              <FadeUp delay={0.05}>
                <div className="mt-6 inline-flex items-center gap-3 rounded-[3px] border border-accent/40 bg-accent/[0.06] px-4 py-3">
                  <Tag className="h-4 w-4 text-accent-bright" />
                  <span className="text-[13.5px] text-text-secondary">
                    {brand.promo_description ?? 'Use code'}{' '}
                    <span className="font-bold tracking-wide text-accent-bright">
                      {brand.promo_code}
                    </span>
                  </span>
                </div>
              </FadeUp>
            )}
          </Container>
        </section>

        {/* ─────────── PRODUCTS ─────────── */}
        <section className="relative py-14 md:py-20">
          <Container>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-bold tracking-tightest text-text-primary">
                Products
              </h2>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-text-secondary transition-colors hover:text-text-primary"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                All of shop
              </Link>
            </div>

            {products.length === 0 ? (
              <ShopEmptyState
                title={`${brand.name} is setting up`}
                message="This brand hasn't published products yet. Follow along in the PHYZIK app to catch the first listing."
              />
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {products.map((p, i) => (
                  <FadeUp key={p.id} delay={Math.min(i, 8) * 0.03}>
                    <ProductCard product={p} brandName={brand.name} />
                  </FadeUp>
                ))}
              </div>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
