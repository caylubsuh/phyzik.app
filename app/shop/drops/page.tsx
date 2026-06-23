import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import FadeUp from '@/components/motion/FadeUp'
import ProductCard from '@/components/shop/ProductCard'
import ShopEmptyState from '@/components/shop/ShopEmptyState'
import DropCountdown from '@/components/shop/DropCountdown'
import { getDrops, getBrands } from '@/lib/marketplace/queries'
import { SITE_URL } from '@/lib/constants'

// Drops are time-sensitive — refresh every 10 minutes.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Drops — PHYZIK Shop',
  description:
    'Limited releases on the PHYZIK Shop. Time-boxed drops from brands built for lifters — gone when the clock runs out.',
  alternates: { canonical: `${SITE_URL}/shop/drops` },
  openGraph: {
    title: 'Drops — PHYZIK Shop',
    description: 'Limited, time-boxed releases from brands built for lifters.',
    url: `${SITE_URL}/shop/drops`,
  },
}

export default async function DropsPage() {
  const [drops, brands] = await Promise.all([getDrops(), getBrands()])
  const brandName = new Map(brands.map((b) => [b.id, b.name]))

  return (
    <>
      <Nav />

      <main id="main-content" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-30 h-[900px]"
          style={{
            background:
              'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(184,151,106,0.16) 0%, transparent 60%), linear-gradient(180deg, #0A0A0B 0%, #050506 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[6%] -z-20 h-[560px] w-[1000px] -translate-x-1/2 animate-slow-drift opacity-90 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(184,151,106,0.18) 0%, transparent 70%)',
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
              <span className="block text-[10.5px] font-bold uppercase tracking-[0.36em] text-accent-bright">
                Limited · Time-boxed
              </span>
              <h1 className="mt-4 max-w-[720px] text-balance font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.96] tracking-tightest text-text-primary">
                Drops. Gone when the{' '}
                <span className="text-shimmer-gold">clock runs out.</span>
              </h1>
              <p className="mt-5 max-w-[520px] text-[15.5px] leading-relaxed text-text-secondary">
                Limited releases from brands on PHYZIK. When the timer hits
                zero, the drop closes.
              </p>
            </FadeUp>
          </Container>
        </section>

        <section className="relative pb-20 md:pb-28">
          <Container>
            {drops.length === 0 ? (
              <ShopEmptyState
                title="No live drops right now"
                message="There's nothing dropping at the moment. Browse the full catalog, or follow brands in the app to get notified the second a drop goes live."
                action={
                  <Button variant="secondary" size="md" asChild>
                    <Link href="/shop">Browse the shop</Link>
                  </Button>
                }
              />
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {drops.map((p, i) => (
                  <FadeUp key={p.id} delay={Math.min(i, 8) * 0.03}>
                    <div className="flex flex-col gap-2.5">
                      <ProductCard
                        product={p}
                        brandName={brandName.get(p.brand_id)}
                      />
                      {p.drop_ends_at && (
                        <DropCountdown
                          endsAt={p.drop_ends_at}
                          className="px-1"
                        />
                      )}
                    </div>
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
