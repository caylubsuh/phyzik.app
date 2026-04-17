'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { Plus, Minus } from 'lucide-react'
import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import FadeUp from '@/components/motion/FadeUp'

const ITEMS: { q: string; a: string }[] = [
  {
    q: 'Is PHYZIK really free?',
    a: `Yes. Completely free — no trial, no "first 500 users," no asterisk.

PHYZIK exists because we believe one thing: if you walk into a gym with intent to get better, you deserve tools that are actually built for you. We don't care where you come from, what you can afford, your background, your experience level, your gender, your ethnicity, or what you've done before. We care that you're here — and we give you everything we've got.

Every program. Every insight. Every feature. Yours.`,
  },
  {
    q: 'Who is PHYZIK built for?',
    a: `Anyone in the gym, training with intent.

An ultra-marathon runner adding Zone 2 and strength work. A competitive bodybuilder mid-prep. A high schooler learning what a deadlift is. A working professional squeezing in lunch sessions. Someone who joined last Monday.

Same app. Same tools. Same respect. If you lift, PHYZIK is built for you.`,
  },
  {
    q: 'How is PHYZIK different from other lifting apps?',
    a: `Three things.

First: social is real, and it's built in. Gym selfies, progress posts, training breakthroughs — all of it lives on The Floor. But every post is attached to a completed workout. Real exercises, real weights, real reps, real progression. The feed isn't noise; it's signal. You learn from how people are actually training.

Second: the programming is the product. Your split isn't a static PDF someone charged you forty bucks for — it's generated from the same peer-reviewed literature that informs elite coaching. Volume landmarks, mechanical tension, stimulus-to-fatigue ratios, proximity-to-failure thresholds. And it adapts: as your numbers move, your program moves. Volume cycles across mesocycles, deloads trigger when recovery calls for them, and every week stays calibrated to where hypertrophy research says adaptation actually happens.

Third: progressive overload is automatic. Every session, PHYZIK proposes your next weights and reps based on exactly how you performed last time. Hit the top of your rep range? Weight goes up. Stalled? You get a variation or a deload. You show up, you lift — the math is handled.`,
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
