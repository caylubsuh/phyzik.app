import LegalLayout from '@/components/legal/LegalLayout'

export const metadata = {
  title: 'Supplement Disclaimer — PHYZIK',
  description:
    'Important disclaimers for dietary supplements sold through PHYZIK Shop: statements not evaluated by the FDA and not intended to diagnose, treat, cure, or prevent disease.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://phyzik.app/legal/supplement-disclaimer' },
}

export default function SupplementDisclaimerPage() {
  return (
    <LegalLayout title="Supplement Disclaimer" lastUpdated="August 26, 2026">
      <p>
        This Supplement Disclaimer applies to dietary supplements and related
        consumable products offered through PHYZIK Shop, the marketplace operated
        by Physique Technologies LLC (&quot;PHYZIK,&quot; &quot;we,&quot;
        &quot;us,&quot; or &quot;our&quot;). Please read it before purchasing or
        using any such product.
      </p>

      <h2>FDA statement</h2>
      <p>
        These statements have not been evaluated by the Food and Drug
        Administration. These products are not intended to diagnose, treat, cure,
        or prevent any disease.
      </p>

      <h2>Not medical advice</h2>
      <p>
        Information provided about supplements on PHYZIK Shop, including product
        descriptions and any related content, is for general informational and
        educational purposes only and is not medical or professional health
        advice. It is not a substitute for advice from a qualified healthcare
        provider. Always seek the advice of your physician or another qualified
        health professional with any questions you may have regarding a medical
        condition or before starting any supplement, especially if you are
        pregnant or nursing, have a medical condition, or are taking medication.
      </p>

      <h2>Consult a physician</h2>
      <p>
        You should consult a physician or qualified healthcare professional before
        beginning any supplement regimen. Discontinue use and seek medical advice
        if you experience any adverse reaction. Keep supplements out of reach of
        children, and do not exceed recommended serving sizes.
      </p>

      <h2>DSHEA and seller compliance</h2>
      <p>
        Dietary supplements sold through PHYZIK Shop are regulated under the
        Dietary Supplement Health and Education Act (DSHEA). Sellers are
        responsible for ensuring their products are manufactured following current
        Good Manufacturing Practices (cGMP), are accurately and lawfully labeled,
        and do not make unlawful disease-treatment claims, as required by our{' '}
        <a href="/legal/seller-agreement">Seller / Brand Agreement</a>. Supplements
        must also comply with our{' '}
        <a href="/legal/prohibited-items">Prohibited Items</a> policy.
      </p>

      <h2>Individual results vary</h2>
      <p>
        Individual results vary and are not guaranteed. Any testimonials or
        examples reflect individual experiences and are not a promise of specific
        outcomes. Supplements are intended to support, not replace, a balanced diet
        and healthy lifestyle.
      </p>

      <h2>Allergens and ingredients</h2>
      <p>
        Review the product label and ingredient list before use, and do not use a
        product if you are allergic or sensitive to any of its ingredients. PHYZIK
        does not manufacture these products; ingredient and allergen information is
        provided by the seller, and you should rely on the actual product label.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about a supplement product? Contact us at{' '}
        <a href="mailto:admin@phyzik.app">admin@phyzik.app</a>.
      </p>
      <p>
        Physique Technologies LLC
        <br />
        <a href="mailto:admin@phyzik.app">admin@phyzik.app</a>
      </p>
    </LegalLayout>
  )
}
