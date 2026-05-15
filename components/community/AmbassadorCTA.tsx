import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Pill from '@/components/ui/Pill'
import Button from '@/components/ui/Button'
import FadeUp from '@/components/motion/FadeUp'

const MAILTO_HREF =
  'mailto:admin@phyzik.app?subject=Ambassador%20Application&body=Hi%20PHYZIK%2C%0A%0AMy%20name%20is%20%5Byour%20name%5D.%0A%0AA%20bit%20about%20me%3A%0A-%20How%20I%20train%3A%0A-%20My%20platforms%20%2F%20content%3A%0A-%20Why%20PHYZIK%20fits%20me%3A%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0A%5Byour%20name%5D'

export default function AmbassadorCTA() {
  return (
    <Section spacing="loose" noContainer>
      <Container className="max-w-3xl">
        <FadeUp className="flex flex-col items-center text-center">
          <Pill>JOIN THE TEAM</Pill>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
            Want to be part of PHYZIK?
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-primary/80 md:text-lg">
            We&apos;re building a roster of athletes across every discipline —
            bodybuilders, powerlifters, Hyrox competitors, everyday lifters
            with strong content. If you train with intent, produce content
            that reflects real work, and want to grow with a platform that
            respects lifters, we want to hear from you.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-text-primary/60 md:text-base">
            Send a short note about yourself — who you are, how you train,
            what you&apos;d bring to the community.
          </p>
          <div className="mt-10">
            <Button size="lg" variant="primary" asChild>
              <a href={MAILTO_HREF}>Apply to be an ambassador</a>
            </Button>
          </div>
        </FadeUp>
      </Container>
    </Section>
  )
}