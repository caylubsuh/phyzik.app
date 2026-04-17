export default function GrainOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full opacity-[0.025] mix-blend-overlay"
    >
      <filter id="phyzik-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="1" />
      </filter>
      <rect width="100%" height="100%" filter="url(#phyzik-grain)" />
    </svg>
  )
}
