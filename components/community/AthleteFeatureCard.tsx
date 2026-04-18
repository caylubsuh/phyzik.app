import Image from 'next/image'
import type { TeamMember } from '@/lib/team'

type ArcStat = {
  label: string
  value: string
}

type AthleteFeatureCardProps = {
  member: TeamMember
  arcTitle: string
  arcSubtitle: string
  arcStats?: ArcStat[]
}

export default function AthleteFeatureCard({
  member,
  arcTitle,
  arcSubtitle,
  arcStats,
}: AthleteFeatureCardProps) {
  const { name, role, bio, photoPath } = member
  const initial = name.trim().charAt(0).toUpperCase()

  return (
    <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-surface p-6 md:p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,_40%)_1fr] md:gap-10">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/[0.05] bg-bg-low">
          {photoPath ? (
            <Image
              src={photoPath}
              alt={name}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5"
              aria-hidden="true"
            >
              <span className="text-8xl font-black text-accent/80">
                {initial}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {arcTitle}
          </span>
          <p className="mt-2 text-sm text-text-secondary">{arcSubtitle}</p>

          <h3 className="mt-6 text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
            {name}
          </h3>
          <p className="mt-1 text-sm text-text-secondary">{role}</p>

          <p className="mt-5 text-base leading-relaxed text-text-primary/80">
            {bio}
          </p>

          {arcStats && arcStats.length > 0 ? (
            <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
              {arcStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 text-base font-semibold text-text-primary">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </article>
  )
}
