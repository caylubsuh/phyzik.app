import Image from 'next/image'
import type { TeamMember } from '@/lib/team'
import { cn } from '@/lib/utils'

type Size = 'default' | 'large'

type TeamMemberCardProps = {
  member: TeamMember
  size?: Size
  className?: string
}

export default function TeamMemberCard({
  member,
  size = 'default',
  className,
}: TeamMemberCardProps) {
  const { name, role, credentials, bio, photoPath } = member
  const isLarge = size === 'large'

  return (
    <article
      className={cn(
        'rounded-2xl border border-white/[0.08] bg-bg-surface',
        isLarge ? 'p-6 md:p-8' : 'p-6',
        className,
      )}
    >
      <div
        className={cn(
          isLarge
            ? 'grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,_240px)_1fr] md:items-start md:gap-8'
            : 'flex flex-col gap-5',
        )}
      >
        <Photo photoPath={photoPath} name={name} />

        <div className="flex flex-col">
          <h3
            className={cn(
              'font-bold tracking-tight text-text-primary',
              isLarge ? 'text-2xl md:text-3xl' : 'text-lg',
            )}
          >
            {name}
          </h3>
          <p
            className={cn(
              'mt-1 text-text-secondary',
              isLarge ? 'text-sm' : 'text-sm',
            )}
          >
            {role}
          </p>
          {credentials ? (
            <p
              className={cn(
                'mt-1 text-xs text-text-tertiary',
                isLarge && 'text-[13px]',
              )}
            >
              {credentials}
            </p>
          ) : null}

          <p
            className={cn(
              'mt-4 leading-relaxed text-text-primary/80',
              isLarge ? 'text-base' : 'text-sm',
            )}
          >
            {bio}
          </p>
        </div>
      </div>
    </article>
  )
}

function Photo({
  photoPath,
  name,
}: {
  photoPath?: string
  name: string
}) {
  const initial = name.trim().charAt(0).toUpperCase()

  if (!photoPath) {
    return (
      <div
        className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-white/[0.05] bg-gradient-to-br from-accent/20 to-accent/5"
        aria-hidden="true"
      >
        <span className="text-6xl font-black text-accent/80">{initial}</span>
      </div>
    )
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/[0.05] bg-bg-low">
      <Image
        src={photoPath}
        alt={name}
        fill
        sizes="(min-width: 768px) 240px, 100vw"
        className="object-cover"
      />
    </div>
  )
}
