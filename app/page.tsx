import Hero from '@/components/hero/Hero'
import Nav from '@/components/nav/Nav'
import FeaturesIntro from '@/components/features/FeaturesIntro'
import FeaturesGrid from '@/components/features/FeaturesGrid'
import StatsSection from '@/components/stats/StatsSection'
import FAQ from '@/components/faq/FAQ'
import FinalCTA from '@/components/cta/FinalCTA'
import Footer from '@/components/footer/Footer'
import { FAQ_ITEMS } from '@/lib/faq'
import {
  softwareApplicationSchema,
  faqSchema,
  jsonLdScriptProps,
} from '@/lib/structured-data'

export default function HomePage() {
  return (
    <>
      <script {...jsonLdScriptProps(softwareApplicationSchema())} />
      <script
        {...jsonLdScriptProps(
          faqSchema(FAQ_ITEMS.map((i) => ({ question: i.q, answer: i.a })))
        )}
      />
      <Nav />
      <main id="main-content">
        <Hero />
        <div id="features">
          <FeaturesIntro />
          <FeaturesGrid />
        </div>
        <StatsSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
