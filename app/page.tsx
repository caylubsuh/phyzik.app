import Hero from '@/components/hero/Hero'
import Nav from '@/components/nav/Nav'
import FeaturesIntro from '@/components/features/FeaturesIntro'
import FeaturesGrid from '@/components/features/FeaturesGrid'
import StatsSection from '@/components/stats/StatsSection'
import FAQ from '@/components/faq/FAQ'
import FinalCTA from '@/components/cta/FinalCTA'
import Footer from '@/components/footer/Footer'

export default function HomePage() {
  return (
    <>
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
