import Hero from '@/components/hero/Hero'
import Nav from '@/components/nav/Nav'
import FeaturesIntro from '@/components/features/FeaturesIntro'
import FeaturesGrid from '@/components/features/FeaturesGrid'

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
      </main>
    </>
  )
}
