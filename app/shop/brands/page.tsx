import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import FadeUp from '@/components/motion/FadeUp'
import BrandCard from '@/components/shop/BrandCard'
import ShopEmptyState from '@/components/shop/ShopEmptyState'
import { getBrands } from '@/lib/marketplace/queries'
import { SITE_URL } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Brands — PHYZIK Shop',
  description:
    'Every brand on the PHYZIK Shop. Supplements, apparel, and equipment makers built for lifters.',
  alternates: { canonical: `${SITE_URL}/shop/brands` },
  openGraph: {
    title: 'Brands — PHYZIK Shop',
    description: 'Every brand on the PHYZIK Shop, built for lifters.',
    url: `${SITE_URL}/shop/brands`,
  },
}

export default async function BrandsIndexPage() {
  const brands = await getBrands()

  return (
    <>
      <Nav />

      <main id="main-content" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-30 h-[900px]"
          style={{
            background:
              'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(184,151,106,0.14) 0%, transparent 60%), linear-gradient(180deg, #0A0A0B 0%, #050506 100%)',
          }}
        />

        <section className="relative pb-12 pt-28 md:pt-36">
          <Container>
            <FadeUp>
              <Link
                href="/shop"
                className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-text-secondary transition-colors hover:text-text-primary"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Shop home
              </Link>
              <span className="block text-[10.5px] font-bold uppercase tracking-[0.36em] text-text-tertiary">
                The roster
              </span>
              <h1 className="mt-4 max-w-[720px] text-balance font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.96] tracking-tightest text-text-primary">
                Brands built for{' '}
                <span className="text-shimmer-gold">lifters.</span>
              </h1>
              <p className="mt-5 max-w-[520px] text-[15.5px] leading-relaxed text-text-secondary">
                Curated supplement, apparel, and equipment makers — each
                verified before they reach the floor.
              </p>
            </FadeUp>
          </Container>
        </section>

        <section className="relative pb-20 md:pb-28">
          <Container>
            {brands.length === 0 ? (
              <ShopEmptyState
                title="Brands are onboarding"
                message="The first roster of brands is being verified now. Check back soon, or apply to put yours here."
                action={
                  <Button variant="secondary" size="md" asChild>
                    <Link href="/for-brands">Sell on PHYZIK</Link>
                  </Button>
                }
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {brands.map((brand, i) => (
                  <FadeUp key={brand.id} delay={Math.min(i, 9) * 0.04}>
                    <BrandCard brand={brand} />
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
