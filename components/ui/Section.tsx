import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import Container from './Container'

type Spacing = 'tight' | 'default' | 'medium' | 'loose'

type SectionProps = HTMLAttributes<HTMLElement> & {
  spacing?: Spacing
  noContainer?: boolean
  containerClassName?: string
}

const spacingMap: Record<Spacing, string> = {
  tight: 'py-12 md:py-16',
  default: 'py-16 md:py-20 lg:py-24',
  medium: 'py-16 md:py-20',
  loose: 'py-20 md:py-32',
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
