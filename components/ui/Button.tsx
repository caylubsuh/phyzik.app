import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'gold' | 'secondary' | 'ghost' | 'accent'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const variantMap: Record<ButtonVariant, string> = {
  // PRIMARY CTA — metallic gold. The dominant brand action.
  gold: 'text-bg shadow-[0_18px_48px_-16px_rgba(168,137,46,0.55)] bg-[linear-gradient(135deg,#E8D9A8_0%,#C9A94E_38%,#A8892E_70%,#856A1F_100%)] hover:brightness-110',
  primary: 'bg-white text-bg hover:bg-white/90 shadow-lg',
  secondary:
    'bg-bg-high text-text-primary border border-border hover:bg-bg-top',
  ghost: 'bg-transparent text-text-primary hover:bg-white/5',
  accent: 'bg-accent text-bg hover:bg-accent-dark',
}

const sizeMap: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-14 px-7 text-base',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', asChild = false, className, type, ...props },
  ref,
) {
  const Component = asChild ? Slot : 'button'
  return (
    <Component
      ref={ref}
      {...(asChild ? {} : { type: type ?? 'button' })}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-[3px] font-semibold transition-[transform,filter,background-color,box-shadow] duration-200 active:scale-[0.98]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        'disabled:pointer-events-none disabled:opacity-50',
        variantMap[variant],
        sizeMap[size],
        className,
      )}
      {...props}
    />
  )
})

export default Button
