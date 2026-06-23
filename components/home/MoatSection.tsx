import Image from 'next/image'
import Container from '@/components/ui/Container'
import FadeUp from '@/components/motion/FadeUp'

/**
 * "The Floor" differentiator — the feed is verified training data, not
 * fakeable influencer content.
 */
export default function MoatSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(168,137,46,0.32) 50%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[640px] w-[1100px] -translate-x-1/2 opacity-80 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(168,137,46,0.14) 0%, transparent 65%)',
        }}
      />

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <FadeUp className="md:order-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-accent">
                The Floor
              </span>
              <h2 className="mt-5 text-balance font-display text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold leading-[1.03] tracking-tightest text-text-primary">
                A feed you can{' '}
                <span className="text-shimmer-gold">actually trust.</span>
              </h2>
              <p className="mt-6 max-w-[480px] text-[15.5px] leading-relaxed text-text-secondary md:text-[16.5px]">
                Not influencer content anyone can fake — verified training data.
                Real sets, real PRs, real volume, and the gym you actually
                trained at. Give respect when someone hits a PR, and learn from
                how people are really training. The feed is signal, not noise.
              </p>
            </div>
          </FadeUp>

          <FadeUp className="md:order-1">
            <div className="relative mx-auto w-full max-w-[360px]">
              <div className="absolute -left-3 -top-3 z-10">
                <span className="rounded-[3px] border border-accent/40 bg-bg-deep/80 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.2em] text-accent backdrop-blur">
                  Verified training data
                </span>
              </div>
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[8px] border border-border-mid bg-bg-high">
                <Image
                  src="/screenshots/marketing/01-floor-post.png"
                  alt="A PHYZIK Floor post showing a real logged workout with sets, volume, and PRs"
                  fill
                  sizes="(max-width: 768px) 80vw, 360px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  )
}
