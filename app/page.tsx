import Hero from '@/components/hero/Hero'
import Nav from '@/components/nav/Nav'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <section
          id="features"
          className="flex h-screen items-center justify-center border-t border-border"
        >
          <p className="text-sm uppercase tracking-[0.22em] text-text-tertiary">
            Feature sections — Phase 4
          </p>
        </section>
      </main>
    </>
  )
}
