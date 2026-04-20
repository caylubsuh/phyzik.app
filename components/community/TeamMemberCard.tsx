import Image from 'next/image'
import type { TeamMember } from '@/lib/team'
import { cn } from '@/lib/utils'
import PhotoCarousel from './PhotoCarousel'

type Size = 'default' | 'large' | 'founding'

type Photo = { src: string; alt: string }

type TeamMemberCardProps = {
  member: TeamMember
  size?: Size
  className?: string
  photos?: Photo[]
}

export default function TeamMemberCard({
  member,
  size = 'default',
  className,
  photos,
}: TeamMemberCardProps) {
  const { name, role, bio, photoPath } = member
  const isLarge = size === 'large'
  const isFounding = size === 'founding'

  if (isFounding) {
    return (
      <article
        className={cn(
          'rounded-2xl border border-white/[0.08] bg-bg-surface p-6 md:p-8',
          className,
        )}
      >
        <div className="flex flex-col gap-6">
          <FoundingPhoto photos={photos} photoPath={photoPath} name={name} />

          <div className="flex flex-col">
            <h3 className="text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
              {name}
            </h3>
            <p className="mt-1 text-sm text-text-secondary">{role}</p>
            <p className="mt-3 text-base leading-relaxed text-text-primary/80">
              {bio}
            </p>
          </div>
        </div>
      </article>
    )
  }

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

          <p
            className={cn(
              'mt-3 leading-relaxed text-text-primary/80',
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

function FoundingPhoto({
  photos,
  photoPath,
  name,
}: {
  photos?: Photo[]
  photoPath?: string
  name: string
}) {
  const initial = name.trim().charAt(0).toUpperCase()
  const sizes = '(min-width: 768px) 540px, 100vw'
  const aspect = 'aspect-[4/5]'

  if (photos && photos.length > 0) {
    return <PhotoCarousel photos={photos} className={aspect} sizes={sizes} />
  }

  if (!photoPath) {
    return (
      <div
        className={cn(
          'flex w-full items-center justify-center overflow-hidden rounded-xl border border-white/[0.05] bg-gradient-to-br from-accent/20 to-accent/5',
          aspect,
        )}
        aria-hidden="true"
      >
        <span className="text-7xl font-black text-accent/80">{initial}</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-xl border border-white/[0.05] bg-bg-low',
        aspect,
      )}
    >
      <Image
        src={photoPath}
        alt={name}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  )
}
