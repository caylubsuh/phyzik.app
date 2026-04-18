'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { Plus, Minus } from 'lucide-react'
import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import FadeUp from '@/components/motion/FadeUp'
import { FAQ_ITEMS } from '@/lib/faq'

const ITEMS = FAQ_ITEMS

export default function FAQ() {
  return (
    <Section spacing="loose">
      <FadeUp>
        <div className="flex flex-col items-center">
          <Pill>FAQ</Pill>

          <h2 className="mx-auto mt-8 max-w-[700px] text-center text-4xl font-bold leading-[1.05] tracking-tightest text-text-primary md:text-6xl">
            Common questions.
          </h2>

          <Accordion.Root
            type="single"
            collapsible
            className="mx-auto mt-20 w-full max-w-[720px] border-b border-border"
          >
            {ITEMS.map((item, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="group border-t border-border"
              >
                <Accordion.Header className="flex">
                  <Accordion.Trigger className="flex w-full items-center justify-between rounded-lg py-6 text-left transition-colors duration-200 hover:bg-white/[0.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg">
                    <span className="text-lg font-semibold text-text-primary group-data-[state=open]:font-bold md:text-xl">
                      {item.q}
                    </span>
                    <Plus
                      className="h-5 w-5 shrink-0 text-text-tertiary transition-colors duration-200 group-hover:text-accent group-data-[state=open]:hidden group-data-[state=open]:text-accent"
                      aria-hidden="true"
                    />
                    <Minus
                      className="hidden h-5 w-5 shrink-0 text-text-tertiary transition-colors duration-200 group-hover:text-accent group-data-[state=open]:block group-data-[state=open]:text-accent"
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="max-w-[640px] space-y-4 pb-6 pr-8 text-[15px] leading-relaxed text-text-secondary md:text-base">
                    {item.a.split('\n\n').map((para, pi) => (
                      <p key={pi}>{para}</p>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </FadeUp>
    </Section>
  )
}
