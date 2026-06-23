import LegalLayout from '@/components/legal/LegalLayout'

export const metadata = {
  title: 'Prohibited Items — PHYZIK',
  description:
    'Items that may not be sold on PHYZIK Shop, including controlled substances, banned supplement ingredients, counterfeit goods, weapons, and hazardous materials.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://phyzik.app/legal/prohibited-items' },
}

export default function ProhibitedItemsPage() {
  return (
    <LegalLayout title="Prohibited Items" lastUpdated="June 23, 2026">
      <div className="mb-12 border border-border bg-bg-low px-5 py-4">
        <p className="!mb-0 text-[13px] leading-relaxed !text-text-tertiary">
          <strong className="!text-text-secondary">Draft — pending legal review.</strong>{' '}
          This document is provided for information only and is not legal
          advice.
        </p>
      </div>

      <p>
        This Prohibited Items policy describes products that may not be listed or
        sold through PHYZIK Shop, the marketplace operated by Physique Technologies
        LLC (&quot;PHYZIK,&quot; &quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;). It applies to all sellers and supplements our{' '}
        <a href="/legal/seller-agreement">Seller / Brand Agreement</a> and{' '}
        <a href="/terms">Terms of Service</a>. The categories below are examples
        and are not exhaustive; we may prohibit additional items at our discretion.
      </p>

      <h2>Illegal and controlled substances</h2>
      <p>
        Controlled substances, narcotics, or any product whose sale or possession
        is unlawful; prescription drugs and prescription-only items; anabolic
        steroids and steroid precursors; and any product marketed as a substitute
        for a controlled substance.
      </p>

      <h2>Banned or unsafe supplement ingredients</h2>
      <p>
        Dietary supplements containing ingredients that are banned, unapproved, or
        not lawful for sale, including but not limited to DMAA (1,3-dimethylamylamine),
        DMHA, ephedra and ephedrine alkaloids, SARMs (selective androgen receptor
        modulators), prohormones, and any ingredient subject to an FDA warning,
        recall, or import alert. Supplements must comply with our{' '}
        <a href="/legal/supplement-disclaimer">Supplement Disclaimer</a> and the
        compliance requirements in the Seller / Brand Agreement.
      </p>

      <h2>Counterfeit and IP-infringing goods</h2>
      <p>
        Counterfeit products, replicas, or any goods that infringe the trademarks,
        copyrights, patents, or other intellectual-property rights of a third
        party, including unauthorized use of brand names or logos.
      </p>

      <h2>Weapons and dangerous goods</h2>
      <p>
        Firearms, ammunition, explosives, weapons, and weapon components or
        accessories, as well as any item restricted or prohibited from sale or
        shipment under applicable law.
      </p>

      <h2>Hazardous materials</h2>
      <p>
        Hazardous, flammable, toxic, radioactive, or otherwise dangerous materials,
        and any item that cannot be shipped safely and lawfully through standard
        carriers.
      </p>

      <h2>Other prohibited items</h2>
      <p>
        Recalled products; expired or adulterated consumables; stolen goods;
        products that make unlawful health or disease claims; items that are
        obscene or that exploit or endanger minors; products that promote hate,
        violence, or illegal activity; and any item that is otherwise illegal,
        unsafe, or in violation of our policies.
      </p>

      <h2>Consequences</h2>
      <p>
        Listing a prohibited item is a serious violation. We may remove the
        listing, cancel affected orders, withhold or reverse related payouts,
        suspend or terminate your seller account, and, where appropriate, report
        the matter to the relevant authorities. Sellers remain responsible for any
        liability arising from prohibited or non-compliant items and must indemnify
        PHYZIK as set out in the Seller / Brand Agreement.
      </p>

      <h2>Reporting</h2>
      <p>
        If you believe a product listed on PHYZIK Shop violates this policy, please
        report it to{' '}
        <a href="mailto:admin@phyzik.app">admin@phyzik.app</a>.
      </p>

      <h2>Contact us</h2>
      <p>
        Physique Technologies LLC
        <br />
        <a href="mailto:admin@phyzik.app">admin@phyzik.app</a>
      </p>
    </LegalLayout>
  )
}
