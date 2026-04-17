import { ReactNode } from 'react'

interface PillarBlockProps {
  headline: ReactNode
  description: string
}

export default function PillarBlock({ headline, description }: PillarBlockProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-px w-10 bg-accent/60" aria-hidden="true" />
      <h3 className="min-h-[3.5em] text-xl font-bold leading-[1.15] tracking-tight text-text-primary md:text-2xl">
        {headline}
      </h3>
      <p className="text-sm leading-relaxed text-text-secondary md:text-[15px]">
        {description}
      </p>
    </div>
  )
}
