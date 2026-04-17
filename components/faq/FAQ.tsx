'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { Plus, Minus } from 'lucide-react'
import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import FadeUp from '@/components/motion/FadeUp'

const ITEMS: { q: string; a: string }[] = [
  {
    q: 'Is PHYZIK really free?',
    a: "Yes — completely free. No ads, no paywalls, no credit card, no 'free for the first X users' catch. That's aligned with why we built this: everyone who steps into a gym deserves the tools to become the best version of themselves, regardless of what they can afford. How we eventually fund the platform — whether through gym partnerships, optional advanced features, or something else — is something we're still exploring, but the core experience is free.",
  },
  {
    q: 'Who is PHYZIK built for?',
    a: "Anyone who trains. If you step into a gym with intent — whether you're an ultra-marathon runner, a competitive bodybuilder, a high schooler getting your first pump, a working professional squeezing in lunch sessions, or someone who just started last week — PHYZIK is built for you. Strava did this for runners and cyclists. PHYZIK is that for lifters.",
  },
  {
    q: 'How is PHYZIK different from other lifting apps?',
    a: "Three things make PHYZIK different. First, social is built in — every post is a completed workout, not gym selfies or motivation content. Second, programs are first-class — periodized splits with volume cycling, deload weeks, and research-backed volume landmarks, not empty routines you fill in yourself. Third, progressive overload is automatic — PHYZIK proposes the next session's weights and reps based on how you performed the last one. You just show up and lift.",
  },
  {
    q: 'Is there an Android version?',
    a: "Not yet. PHYZIK is iOS-only for now. Android is on the roadmap but we're laser-focused on making the iOS experience exceptional first.",
  },
  {
    q: 'Do you sell my data?',
    a: "Never. Your workouts, weights, PRs, photos, and progress are yours. We don't sell data, we don't share it with advertisers, we don't monetize it. Profiles are private by default — you control exactly what's visible and to whom. Full details in our privacy policy.",
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
