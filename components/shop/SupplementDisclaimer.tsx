/**
 * SupplementDisclaimer — server component.
 * Renders VERBATIM FDA disclaimer for supplement products.
 * Render only when product.category === 'supplements'.
 */
import Link from 'next/link'

export default function SupplementDisclaimer() {
  return (
    <aside
      aria-label="Supplement disclaimer"
      className="rounded-[3px] border border-border bg-bg-surface px-5 py-4 text-[12.5px] leading-relaxed text-text-tertiary"
    >
      <p>
        These statements have not been evaluated by the Food and Drug
        Administration. This product is not intended to diagnose, treat, cure,
        or prevent any disease.
      </p>
      <p className="mt-2">
        Consult a physician before use. Keep out of reach of children.{' '}
        <Link
          href="/legal/supplement-disclaimer"
          className="underline underline-offset-2 transition-colors hover:text-text-secondary"
        >
          Learn more
        </Link>
      </p>
    </aside>
  )
}
