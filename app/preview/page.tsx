import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Pill from '@/components/ui/Pill'
import Button from '@/components/ui/Button'
import AppStoreBadge from '@/components/ui/AppStoreBadge'
import QRCode from '@/components/ui/QRCode'
import PhoneFrame from '@/components/ui/PhoneFrame'
import StatBlock from '@/components/ui/StatBlock'
import ScrollIndicator from '@/components/ui/ScrollIndicator'
import FadeUp from '@/components/motion/FadeUp'
import LetterReveal from '@/components/motion/LetterReveal'
import CountUp from '@/components/motion/CountUp'
import AccentGlow from '@/components/motion/AccentGlow'
import { STATS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Design system preview — PHYZIK',
  robots: { index: false, follow: false },
}

type BlockProps = {
  label: string
  title: string
  children: React.ReactNode
}

function Block({ label, title, children }: BlockProps) {
  return (
    <div className="space-y-6 border-t border-border pt-10">
      <div className="space-y-2">
        <Pill>{label}</Pill>
        <h2 className="text-2xl font-semibold tracking-tighter text-text-primary">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default function PreviewPage() {
  return (
    <main className="relative min-h-screen bg-bg pb-40 pt-20">
      <Container>
        <header className="space-y-4 pb-16">
          <Pill variant="filled">Design System</Pill>
          <h1 className="text-4xl font-black tracking-tightest text-text-primary md:text-6xl">
            Primitives preview
          </h1>
          <p className="max-w-2xl text-text-secondary">
            Visual QA surface for every design-system primitive. Not linked from navigation;
            not indexed.
          </p>
        </header>

        <div className="space-y-16">
          <Block label="Label" title="Pills">
            <div className="flex flex-wrap items-center gap-4">
              <Pill>Programs</Pill>
              <Pill variant="filled">The Floor</Pill>
              <Pill>Progressive Overload</Pill>
              <Pill variant="filled">Squads</Pill>
            </div>
          </Block>

          <Block label="Interactive" title="Buttons">
            <div className="space-y-6">
              {(['primary', 'secondary', 'ghost', 'accent'] as const).map((variant) => (
                <div key={variant} className="space-y-2">
                  <Pill>{variant}</Pill>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button variant={variant} size="sm">
                      Small
                    </Button>
                    <Button variant={variant} size="md">
                      Medium
                    </Button>
                    <Button variant={variant} size="lg">
                      Large
                    </Button>
                    <Button variant={variant} size="md" asChild>
                      <Link href="#">As link</Link>
                    </Button>
                    <Button variant={variant} size="md" disabled>
                      Disabled
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Block>

          <Block label="Conversion" title="App Store badges">
            <div className="flex flex-wrap items-end gap-6">
              <AppStoreBadge size="sm" />
              <AppStoreBadge size="md" />
              <AppStoreBadge size="lg" />
            </div>
          </Block>

          <Block label="Conversion" title="QR code (desktop only)">
            <div className="flex flex-wrap items-center gap-8">
              <QRCode />
              <QRCode size={160} hideOnMobile={false} />
            </div>
          </Block>

          <Block label="Device" title="Phone frame">
            <div className="grid gap-8 md:grid-cols-2">
              <PhoneFrame
                screenshot="/screenshots/train-program.png"
                alt="Train program screenshot"
                priority
              />
              <PhoneFrame
                screenshot="/screenshots/feed-post.png"
                alt="Feed post screenshot"
                floatOnHover
              />
            </div>
          </Block>

          <Block label="Typography" title="Letter reveal">
            <div className="overflow-hidden py-6">
              <LetterReveal
                text="PHYZIK"
                className="text-[140px] font-black leading-none tracking-tightest text-text-primary"
              />
            </div>
          </Block>

          <Block label="Motion" title="Fade up">
            <FadeUp>
              <p className="max-w-xl text-lg text-text-secondary">
                Structured programs. Automatic progressive overload. A social feed where every
                post is a real workout. This paragraph fades up when it scrolls into view.
              </p>
            </FadeUp>
          </Block>

          <Block label="Metrics" title="CountUp">
            <div className="flex flex-wrap gap-10">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-5xl font-black tracking-tightest text-text-primary">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-2 text-[12px] uppercase tracking-[0.22em] text-text-tertiary">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Block>

          <Block label="Metrics" title="StatBlock">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
              {STATS.map((stat) => (
                <StatBlock
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          </Block>

          <Block label="Ambient" title="Grain overlay">
            <p className="text-text-secondary">
              The grain is mounted globally in{' '}
              <code className="rounded bg-bg-high px-2 py-1 text-text-primary">app/layout.tsx</code>
              — scroll the background to see it move with the noise texture. Zoom in for the
              subtle fractal pattern.
            </p>
          </Block>

          <Block label="Ambient" title="AccentGlow">
            <div className="relative grid h-[420px] grid-cols-2 gap-0 overflow-hidden rounded-3xl border border-border bg-bg-low">
              <div className="relative">
                <AccentGlow position="top-left" size="md" intensity={0.4} />
                <div className="absolute bottom-4 left-4 z-10">
                  <Pill>top-left · md</Pill>
                </div>
              </div>
              <div className="relative">
                <AccentGlow position="bottom-center" size="lg" intensity={0.35} />
                <div className="absolute bottom-4 left-4 z-10">
                  <Pill>bottom-center · lg</Pill>
                </div>
              </div>
            </div>
          </Block>

          <Block label="Navigation" title="ScrollIndicator">
            <div className="flex h-[240px] items-end justify-center rounded-3xl border border-border bg-bg-low">
              <div className="pb-8">
                <ScrollIndicator />
              </div>
            </div>
          </Block>
        </div>
      </Container>

      <Section spacing="tight" className="relative overflow-hidden">
        <div className="flex flex-col items-center gap-6 text-center">
          <Pill variant="filled">End</Pill>
          <p className="text-text-secondary">
            Every primitive accounted for. Compose away.
          </p>
        </div>
      </Section>
    </main>
  )
}
