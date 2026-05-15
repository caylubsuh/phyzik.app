import { ReactNode } from 'react'

interface PillarBlockProps {
  index?: number
  headline: ReactNode
  description: string
}

export default function PillarBlock({ index, headline, description }: PillarBlockProps) {
  return (
    <div className="flex flex-col gap-4">
      {typeof index === 'number' ? (
        <div className="flex items-center gap-3">
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent/80"
            aria-hidden="true"
          >
            {String(index).padStart(2, '0')}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" aria-hidden="true" />
        </div>
      ) : (
        <div className="h-px w-10 bg-accent/60" aria-hidden="true" />
      )}
      <h3 className="text-xl font-bold leading-[1.15] tracking-tight text-text-primary md:text-2xl">
        {headline}
      </h3>
      <p className="text-sm leading-relaxed text-text-secondary md:text-[15px]">
        {description}
      </p>
    </div>
  )
}
