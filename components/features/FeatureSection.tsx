'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Check } from 'lucide-react'
import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import FadeUp from '@/components/motion/FadeUp'
import { cn } from '@/lib/utils'
import type { FeatureData } from '@/lib/features'

type FeatureSectionProps = FeatureData

function splitBody(body: string): { lead: string; rest: string | null } {
  const idx = body.indexOf('. ')
  if (idx === -1) return { lead: body, rest: null }
  return {
    lead: body.slice(0, idx + 1),
    rest: body.slice(idx + 2),
  }
}

export default function FeatureSection({
  id,
  pill,
  body,
  image,
  imageAlt,
  imagePosition,
  bullets,
  accent = false,
}: FeatureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  const { lead, rest } = splitBody(body)

  const imageOnLeft = imagePosition === 'left'

  return (
    <Section
      ref={sectionRef}
      id={id}
      spacing="tight"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          width: '900px',
          height: '700px',
          top: imageOnLeft ? undefined : '-200px',
          right: imageOnLeft ? undefined : '-200px',
          bottom: imageOnLeft ? '-200px' : undefined,
          left: imageOnLeft ? '-200px' : undefined,
          background:
            'radial-gradient(ellipse at center, rgba(184,151,106,0.12) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />
      <div className="relative grid items-start gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
        <div className={cn('w-full', imageOnLeft ? 'md:order-1' : 'md:order-2')}>
          <div
            className={cn(
              'relative mx-auto w-full max-w-[280px] md:max-w-[340px]',
              !imageOnLeft && 'md:mx-0 md:ml-auto',
              imageOnLeft && 'md:mx-0 md:mr-auto',
            )}
          >
            {accent && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 scale-110 blur-3xl"
                style={{
                  background:
                    'radial-gradient(circle, rgba(184,151,106,0.18), transparent 70%)',
                }}
              />
            )}

            <motion.div
              className="relative"
              style={reduced ? undefined : { y: imageY }}
            >
              <FadeUp>
                <motion.div
                  whileHover={reduced ? undefined : { scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative aspect-[1290/2796] w-full"
                >
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 768px) 75vw, 340px"
                    quality={95}
                    draggable={false}
                    className="object-contain"
                  />
                </motion.div>
              </FadeUp>
            </motion.div>
          </div>
        </div>

        <div className={cn(imageOnLeft ? 'md:order-2' : 'md:order-1')}>
          <FadeUp delay={0.15}>
            <div className="flex max-w-[520px] flex-col gap-6">
              <Pill>{pill}</Pill>

              <h3 className="max-w-[460px] text-2xl font-semibold leading-[1.15] tracking-tight text-text-primary md:text-3xl lg:text-4xl">
                {lead}
              </h3>

              {rest && (
                <p className="max-w-[480px] text-base leading-relaxed text-text-secondary md:text-lg">
                  {rest}
                </p>
              )}

              {bullets && bullets.length > 0 && (
                <ul className="flex flex-col gap-3">
                  {bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-base text-text-secondary"
                    >
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </Section>
  )
}
