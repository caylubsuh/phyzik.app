import Image from 'next/image'
import Container from '@/components/ui/Container'
import FadeUp from '@/components/motion/FadeUp'

/**
 * The moat-first section. Leads the homepage with the two things nothing else
 * has: (1) every post is a real, logged workout, and (2) PHYZIK Cut edits your
 * workout, not just pixels.
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
            'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(168,137,46,0.16) 0%, transparent 65%)',
        }}
      />

      <Container>
        <div className="mx-auto max-w-[760px] text-center">
          <FadeUp>
            <span className="text-[10.5px] font-bold uppercase tracking-[0.4em] text-text-tertiary">
              The moat
            </span>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h2 className="mt-6 text-balance font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-extrabold leading-[1.0] tracking-tightest text-text-primary">
              Two things nothing else{' '}
              <span className="text-shimmer-gold">has.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mx-auto mt-6 max-w-[560px] text-[16px] leading-relaxed text-text-secondary md:text-[18px]">
              One integrated training graph. Everything else — programming,
              nutrition, recovery, the Shop — hangs off it.
            </p>
          </FadeUp>
        </div>

        {/* MOAT 1 — Cut edits your workout */}
        <div className="mt-20 grid grid-cols-1 items-center gap-12 md:mt-28 md:grid-cols-2 md:gap-16">
          <FadeUp>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-accent">
                PHYZIK Cut
              </span>
              <h3 className="mt-5 text-balance font-display text-[clamp(1.85rem,3.6vw,2.85rem)] font-bold leading-[1.05] tracking-tightest text-text-primary">
                It edits your workout, not just pixels.
              </h3>
              <p className="mt-5 max-w-[480px] text-[15.5px] leading-relaxed text-text-secondary">
                Other editors push pixels around. PHYZIK owns your logged sets —
                so it turns raw gym clips into highlight reels with automatic PR
                badges, set counters, and week-over-week stat overlays a general
                editor physically cannot produce. Clean exports for Reels,
                TikTok, and Shorts. No watermark.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[6px] border border-accent/30 bg-bg-high">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 90% 70% at 30% 0%, rgba(168,137,46,0.20) 0%, transparent 60%), linear-gradient(160deg, #17140d 0%, #0b0a08 100%)',
                }}
              />
              {/* Simulated workout-aware overlays */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <span
                    className="rounded-[3px] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-bg"
                    style={{
                      background:
                        'linear-gradient(135deg,#E8D9A8 0%,#C9A94E 40%,#A8892E 75%,#856A1F 100%)',
                    }}
                  >
                    PR · Bench 245 lb
                  </span>
                  <span className="font-mono text-[11px] tabular-nums text-text-tertiary">
                    00:12 / 00:30
                  </span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-display text-[40px] font-extrabold leading-none tracking-tightest text-text-primary md:text-[56px]">
                      SET 4
                    </div>
                    <div className="mt-1 font-mono text-[13px] tabular-nums text-accent">
                      8 reps × 225 lb
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-text-tertiary">
                      vs last week
                    </div>
                    <div className="font-display text-[22px] font-bold tabular-nums text-accent-bright md:text-[26px]">
                      +15 lb
                    </div>
                  </div>
                </div>
              </div>
              {/* scrub bar */}
              <div className="absolute inset-x-6 bottom-3 h-1 rounded-[2px] bg-white/10 md:inset-x-8">
                <div
                  className="h-full rounded-[2px]"
                  style={{
                    width: '40%',
                    background: 'linear-gradient(90deg,#C9A94E,#A8892E)',
                  }}
                />
              </div>
            </div>
          </FadeUp>
        </div>

        {/* MOAT 2 — every post is a real workout */}
        <div className="mt-20 grid grid-cols-1 items-center gap-12 md:mt-28 md:grid-cols-2 md:gap-16">
          <FadeUp delay={0.1} className="md:order-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-accent">
                The Floor
              </span>
              <h3 className="mt-5 text-balance font-display text-[clamp(1.85rem,3.6vw,2.85rem)] font-bold leading-[1.05] tracking-tightest text-text-primary">
                Every post is a real workout.
              </h3>
              <p className="mt-5 max-w-[480px] text-[15.5px] leading-relaxed text-text-secondary">
                Not influencer content anyone can fake — verified training data.
                Real sets, real PRs, real volume, the gym you actually trained
                at. Give respect when someone hits a PR. Learn from how people
                are really training. The feed is signal, not noise.
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
