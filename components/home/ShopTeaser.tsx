import Link from 'next/link'
import Container from '@/components/ui/Container'
import FadeUp from '@/components/motion/FadeUp'
import Button from '@/components/ui/Button'
import { ShopLockup } from '@/components/brand/BrandMarks'
import { CATEGORY_LABEL, CATEGORIES } from '@/lib/marketplace/format'

/** Homepage teaser for the PHYZIK Shop marketplace pillar. */
export default function ShopTeaser() {
  return (
    <section className="relative overflow-hidden border-y border-border/60 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(168,137,46,0.14) 0%, transparent 65%), linear-gradient(180deg, #0a0a0b 0%, #060605 100%)',
        }}
      />
      <Container>
        <div className="mx-auto flex max-w-[820px] flex-col items-center gap-8 text-center">
          <FadeUp>
            <ShopLockup sizeClass="h-16 w-auto md:h-20" />
          </FadeUp>
          <FadeUp delay={0.05}>
            <h2 className="text-balance font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1.0] tracking-tightest text-text-primary">
              Gear up where you{' '}
              <span className="text-shimmer-gold">train.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="max-w-[560px] text-[16px] leading-relaxed text-text-secondary md:text-[18px]">
              An athlete-curated marketplace of the brands you actually train
              with — supplements, apparel, equipment, and food. Shoppable posts
              tied to real workouts. Live in the app and right here on the web.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {CATEGORIES.map((c) => (
                <span
                  key={c}
                  className="rounded-[3px] border border-border-mid bg-bg-high/60 px-3.5 py-1.5 text-[12.5px] font-medium text-text-secondary"
                >
                  {CATEGORY_LABEL[c]}
                </span>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
              <Button variant="gold" size="lg" asChild>
                <Link href="/shop">Browse the Shop</Link>
              </Button>
              <Link
                href="/for-brands"
                className="rounded-[3px] px-4 py-2 text-[14px] font-semibold text-text-secondary transition-colors hover:text-accent"
              >
                Sell on PHYZIK →
              </Link>
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  )
}
