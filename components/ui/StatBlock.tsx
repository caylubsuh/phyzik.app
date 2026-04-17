import { cn } from '@/lib/utils'
import CountUp from '@/components/motion/CountUp'

type StatBlockProps = {
  value: number
  suffix?: string
  label: string
  className?: string
}

export default function StatBlock({ value, suffix = '', label, className }: StatBlockProps) {
  return (
    <div className={cn('flex min-w-[140px] flex-col items-start', className)}>
      <span className="text-[48px] font-black leading-none tracking-tightest text-text-primary md:text-[60px] lg:text-[72px]">
        <CountUp value={value} suffix={suffix} />
      </span>
      <span className="mt-2 text-[12px] uppercase tracking-[0.22em] text-text-tertiary">
        {label}
      </span>
    </div>
  )
}
