import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import FadeUp from '@/components/motion/FadeUp'
import { ShopLockup, ZMark } from '@/components/brand/BrandMarks'
import ProductCard from '@/components/shop/ProductCard'
import BrandCard from '@/components/shop/BrandCard'
import CategoryNav from '@/components/shop/CategoryNav'
import ShopEmptyState from '@/components/shop/ShopEmptyState'
import {
  getProducts,
  getFeaturedBrands,
  getDrops,
} from '@/lib/marketplace/queries'
import { CATEGORY_LABEL, CATEGORIES } from '@/lib/marketplace/format'
import type { MarketplaceCategory } from '@/lib/marketplace/types'
import { SITE_URL } from '@/lib/constants'

// Public catalog — refresh hourly so new products surface without a deploy.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Shop — Gear up where you train | PHYZIK',
  description:
    'The PHYZIK Shop. Supplements, apparel, and equipment from brands built for lifters — live in the app and right here on the web.',
  alternates: { canonical: `${SITE_URL}/shop` },
  openGraph: {
    title: 'PHYZIK Shop — Gear up where you train',
    description:
      'Supplements, apparel, and equipment from brands built for lifters.',
    url: `${SITE_URL}/shop`,
  },
}

function isCategory(v: string | undefined): v is MarketplaceCategory {
  return v != null && (CATEGORIES as string[]).includes(v)
}

export default async function ShopHomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const activeCategory = isCategory(category) ? category : undefined

  const [products, featuredBrands, drops] = await Promise.all([
    getProducts(activeCategory ? { category: activeCategory } : undefined),
    getFeaturedBrands(),
    getDrops(),
  ])

  const brandName = new Map(featuredBrands.map((b) => [b.id, b.name]))

  return (
    <>
      <Nav />

      <main id="main-content" className="relative overflow-hidden">
        {/* ─────────── Atmosphere ─────────── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-30 h-[1200px]"
          style={{
            background:
              'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(184,151,106,0.16) 0%, transparent 60%), linear-gradient(180deg, #0A0A0B 0%, #050506 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[6%] -z-20 h-[680px] w-[1100px] -translate-x-1/2 animate-slow-drift opacity-90 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(184,151,106,0.18) 0%, rgba(184,151,106,0.05) 35%, transparent 70%)',
          }}
        />

        {/* ─────────── HERO ─────────── */}
        <section className="relative pb-12 pt-28 md:pb-16 md:pt-36">
          <Container>
            <FadeUp>
              <div className="mx-auto flex max-w-[820px] flex-col items-center gap-7 text-center">
                <ShopLockup sizeClass="h-14 w-auto md:h-20" priority />
                <h1 className="text-balance font-display text-[clamp(2.5rem,6vw,4.75rem)] font-bold leading-[0.95] tracking-tightest text-text-primary">
                  Gear up where you{' '}
                  <span className="text-shimmer-gold">train.</span>
                </h1>
                <p className="max-w-[540px] text-[15.5px] leading-relaxed text-text-secondary md:text-[17px]">
                  Supplements, apparel, and equipment from brands built for
                  lifters — curated inside PHYZIK, checkout in seconds.
                </p>
                <div className="flex flex-col items-center gap-4 pt-1 sm:flex-row">
                  <Button variant="gold" size="lg" asChild>
                    <Link href="#catalog">
                      Browse the shop
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Link
                    href="/shop/brands"
                    className="text-[14px] font-semibold text-text-secondary underline-offset-4 transition-colors hover:text-text-primary"
                  >
                    Explore brands
                  </Link>
                </div>
                <p className="pt-1 text-[12.5px] text-text-tertiary">
                  Shop is live in the PHYZIK app — and right here on the web.
                </p>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ─────────── CATEGORY STRIP ─────────── */}
        <section className="relative">
          <Container>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {CATEGORIES.map((cat, i) => (
                <FadeUp key={cat} delay={i * 0.04}>
                  <Link
                    href={`/shop?category=${cat}`}
                    className="group relative flex items-center justify-between overflow-hidden rounded-[3px] border border-border bg-bg-surface/50 px-5 py-5 transition-colors hover:border-accent/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    <span className="font-display text-[16px] font-bold tracking-tight text-text-primary">
                      {CATEGORY_LABEL[cat]}
                    </span>
                    <ArrowRight className="h-4 w-4 text-text-tertiary transition-all group-hover:translate-x-0.5 group-hover:text-accent-bright" />
                  </Link>
                </FadeUp>
              ))}
            </div>
          </Container>
        </section>

        {/* ─────────── FEATURED BRANDS ─────────── */}
        {featuredBrands.length > 0 && (
          <section className="relative py-16 md:py-20">
            <Container>
              <FadeUp>
                <div className="mb-8 flex items-end justify-between">
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-text-tertiary">
                      Featured
                    </span>
                    <h2 className="mt-2 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-bold tracking-tightest text-text-primary">
                      Brands built for lifters
                    </h2>
                  </div>
                  <Link
                    href="/shop/brands"
                    className="hidden items-center gap-1.5 text-[13.5px] font-semibold text-accent transition-colors hover:text-accent-bright sm:inline-flex"
                  >
                    All brands
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </FadeUp>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featuredBrands.map((brand, i) => (
                  <FadeUp key={brand.id} delay={i * 0.05}>
                    <BrandCard brand={brand} />
                  </FadeUp>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ─────────── DROPS STRIP ─────────── */}
        {drops.length > 0 && (
          <section className="relative border-t border-border/60 py-16 md:py-20">
            <Container>
              <FadeUp>
                <div className="mb-8 flex items-end justify-between">
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-accent-bright">
                      Limited
                    </span>
                    <h2 className="mt-2 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-bold tracking-tightest text-text-primary">
                      Live drops
                    </h2>
                  </div>
                  <Link
                    href="/shop/drops"
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent transition-colors hover:text-accent-bright"
                  >
                    All drops
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </FadeUp>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {drops.slice(0, 4).map((p, i) => (
                  <FadeUp key={p.id} delay={i * 0.05}>
                    <ProductCard product={p} brandName={brandName.get(p.brand_id)} />
                  </FadeUp>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ─────────── CATALOG ─────────── */}
        <section
          id="catalog"
          className="relative scroll-mt-24 border-t border-border/60 py-16 md:py-20"
        >
          <Container>
            <FadeUp>
              <div className="mb-8">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-text-tertiary">
                  Catalog
                </span>
                <h2 className="mt-2 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-bold tracking-tightest text-text-primary">
                  {activeCategory ? CATEGORY_LABEL[activeCategory] : 'Everything in store'}
                </h2>
              </div>
            </FadeUp>

            <CategoryNav active={activeCategory ?? 'all'} className="mb-10" />

            {products.length === 0 ? (
              <ShopEmptyState
                title={
                  activeCategory
                    ? `No ${CATEGORY_LABEL[activeCategory].toLowerCase()} yet`
                    : 'The catalog is being stocked'
                }
                message={
                  activeCategory
                    ? 'Nothing in this category right now. Brands are onboarding fast — check the other categories or come back soon.'
                    : 'Brands are onboarding now. The first products land here — and in the PHYZIK app — any day.'
                }
                action={
                  <Button variant="secondary" size="md" asChild>
                    <Link href="/for-brands">Sell on PHYZIK</Link>
                  </Button>
                }
              />
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {products.map((p, i) => (
                  <FadeUp key={p.id} delay={Math.min(i, 8) * 0.03}>
                    <ProductCard
                      product={p}
                      brandName={brandName.get(p.brand_id)}
                    />
                  </FadeUp>
                ))}
              </div>
            )}
          </Container>
        </section>

        {/* ─────────── SELLER CTA ─────────── */}
        <section className="relative border-t border-border/60 py-16 md:py-24">
          <Container>
            <FadeUp>
              <div className="relative overflow-hidden rounded-[3px] border border-accent/40 bg-bg-high/50 p-8 md:p-12">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10"
                  style={{
                    background:
                      'radial-gradient(ellipse 60% 80% at 85% 0%, rgba(184,151,106,0.18) 0%, transparent 60%)',
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(245,220,170,0.7) 50%, transparent 100%)',
                  }}
                />
                <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-5">
                    <span className="hidden h-14 w-14 items-center justify-center rounded-[3px] border border-border bg-bg-deep/80 sm:flex">
                      <ZMark sizeClass="h-7 w-auto" />
                    </span>
                    <div>
                      <h2 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-tightest text-text-primary">
                        Sell to lifters who actually train.
                      </h2>
                      <p className="mt-2 max-w-[460px] text-[14.5px] leading-relaxed text-text-secondary">
                        List your brand on PHYZIK and reach an audience that
                        logs every workout. Storefront, payments, and payouts
                        handled.
                      </p>
                    </div>
                  </div>
                  <Button variant="gold" size="lg" asChild>
                    <Link href="/for-brands">
                      Become a seller
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeUp>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
