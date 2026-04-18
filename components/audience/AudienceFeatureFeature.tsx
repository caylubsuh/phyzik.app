import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import FadeUp from '@/components/motion/FadeUp'
import type { TeamMember } from '@/lib/team'

type Props = {
  pill: string
  heading: string
  member: TeamMember
  body: string
}

export default function AudienceFeatureFeature({
  pill,
  heading,
  member,
  body,
}: Props) {
  return (
    <Section spacing="medium">
      <FadeUp>
        <Pill>{pill}</Pill>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          {heading}
        </h2>
      </FadeUp>
      <div className="mt-10 rounded-3xl border border-border bg-bg-high p-8 md:p-10">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.15em] text-accent">
            {member.role}
          </span>
          <h3 className="text-2xl font-semibold text-text-primary">
            {member.name}
          </h3>
          {member.credentials && (
            <span className="text-sm text-text-tertiary">
              {member.credentials}
            </span>
          )}
        </div>
        <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-text-secondary md:text-base">
          {body}
        </p>
      </div>
    </Section>
  )
}
