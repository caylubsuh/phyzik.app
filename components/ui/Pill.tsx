import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type PillVariant = 'default' | 'filled'

type PillProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: PillVariant
}

const Pill = forwardRef<HTMLSpanElement, PillProps>(function Pill(
  { variant = 'default', className, children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-block text-[12px] font-semibold uppercase tracking-[0.22em] text-accent',
        variant === 'filled' && 'rounded-full bg-accent/10 px-3 py-1',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
})

export default Pill
