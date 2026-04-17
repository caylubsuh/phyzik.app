import AccentGlow from '@/components/motion/AccentGlow'

export default function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[40%]">
        <AccentGlow position="center" size="xl" intensity={0.45} />
      </div>

      <AccentGlow position="bottom-center" size="md" intensity={0.15} />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, transparent 55%, #050506 100%)',
        }}
      />
    </div>
  )
}
