import { forwardRef, type ElementType, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
}

const Container = forwardRef<HTMLElement, ContainerProps>(function Container(
  { as: Component = 'div', className, children, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn('mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-10', className)}
      {...props}
    >
      {children}
    </Component>
  )
})

export default Container
