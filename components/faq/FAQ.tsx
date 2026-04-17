'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { Plus, Minus } from 'lucide-react'
import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import FadeUp from '@/components/motion/FadeUp'

const ITEMS: { q: string; a: string }[] = [
  {
    q: 'Is PHYZIK really free?',
    a: "Yes. Completely free through our first 500 users — no ads, no paywalls, no credit card. We'll introduce an optional Pro tier later at around $6.99/month for advanced analytics and exclusive programs, but the core experience — workout tracking, programs, progressive overload, squads, and The Floor — will always be free.",
  },
  {
    q: 'Who is PHYZIK built for?',
    a: "Serious lifters. People who train 3+ times a week with a real program and want their tracking app to keep up. We're hypertrophy-focused today with powerlifting and CrossFit modes on the roadmap. If you're casual about the gym, this isn't the app for you.",
  },
  {
    q: 'How is this different from Hevy or Strong?',
    a: "Three things. One: social is built in — every post is a completed workout, no motivation content, no ads. Two: programs are first-class — periodized splits with volume cycling and deload weeks, not just empty routines you fill in yourself. Three: progressive overload is automatic — the app proposes the next session's weights and reps based on how you performed the last one. No other lifting app does all three.",
  },
  {
    q: 'Is there an Android version?',
    a: "Not yet. PHYZIK is iOS-only for now. Android is on the roadmap but we're laser-focused on making the iOS experience exceptional first.",
  },
  {
    q: 'Do you sell my data?',
    a: "No. We don't sell, share, or monetize your data. Your workouts, weights, and progress are yours. Full details in our privacy policy.",
  },
  {
    q: 'Can I use PHYZIK without sharing my workouts publicly?',
    a: "Yes. Profiles are private by default. You control exactly what's visible — to the public, to followers, or to no one. You can use PHYZIK purely as a private tracker if that's your preference.",
  },
]

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
                  <Accordion.Trigger className="flex w-full items-center justify-between py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg">
                    <span className="text-lg font-semibold text-text-primary transition-colors group-hover:text-accent md:text-xl">
                      {item.q}
                    </span>
                    <Plus
                      className="h-5 w-5 shrink-0 text-text-secondary transition-colors group-hover:text-accent group-data-[state=open]:hidden"
                      aria-hidden="true"
                    />
                    <Minus
                      className="hidden h-5 w-5 shrink-0 text-text-secondary transition-colors group-hover:text-accent group-data-[state=open]:block"
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="max-w-[640px] pb-6 pr-8 text-[15px] leading-relaxed text-text-secondary md:text-base">
                    {item.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </FadeUp>
    </Section>
  )
}
