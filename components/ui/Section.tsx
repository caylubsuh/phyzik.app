import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import Container from './Container'

type Spacing = 'tight' | 'default' | 'loose'

type SectionProps = HTMLAttributes<HTMLElement> & {
  spacing?: Spacing
  noContainer?: boolean
  containerClassName?: string
}

const spacingMap: Record<Spacing, string> = {
  tight: 'py-16 md:py-20',
  default: 'py-24 md:py-32 lg:py-40',
  loose: 'py-32 md:py-48',
}

const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { spacing = 'default', noContainer = false, className, containerClassName, children, ...props },
  ref,
) {
  const content = noContainer ? (
    children
  ) : (
    <Container className={containerClassName}>{children}</Container>
  )

  return (
    <section ref={ref} className={cn(spacingMap[spacing], className)} {...props}>
      {content}
    </section>
  )
})

export default Section
