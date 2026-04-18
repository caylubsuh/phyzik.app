import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import AppStoreBadge from '@/components/ui/AppStoreBadge'
import FadeUp from '@/components/motion/FadeUp'

export default function FloorScaffold() {
  return (
    <Section spacing="medium">
      <FadeUp>
        <Pill>THE FLOOR</Pill>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          This is where the community lives.
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-text-primary/70 md:text-lg">
          Every post on The Floor is a completed workout — real exercises, real
          weights, real progression, from real members. As PHYZIK grows, this
          section will highlight the squads, the PRs, the milestones happening
          inside the app every day.
        </p>
      </FadeUp>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-white/10 p-6"
          >
            <span className="text-center text-sm text-text-primary/30">
              Member spotlight — coming soon
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start gap-5">
        <p className="text-sm text-text-tertiary">
          Be one of the first. Download PHYZIK and start posting.
        </p>
        <AppStoreBadge size="sm" />
      </div>
    </Section>
  )
}
