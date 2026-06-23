import LegalLayout from '@/components/legal/LegalLayout'

export const metadata = {
  title: 'Seller Agreement — PHYZIK',
  description:
    'The agreement governing independent brands selling on PHYZIK Shop, covering onboarding, payouts, commission rates, compliance, and fulfillment obligations.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://phyzik.app/legal/seller-agreement' },
}

export default function SellerAgreementPage() {
  return (
    <LegalLayout title="Seller / Brand Agreement" lastUpdated="June 23, 2026">
      <div className="mb-12 border border-border bg-bg-low px-5 py-4">
        <p className="!mb-0 text-[13px] leading-relaxed !text-text-tertiary">
          <strong className="!text-text-secondary">Draft — pending legal review.</strong>{' '}
          This document is provided for information only and is not legal
          advice.
        </p>
      </div>

      <p>
        {`This Seller / Brand Agreement ("Agreement") governs your participation as a seller ("Seller," "Brand," "you," or "your") on PHYZIK Shop, the marketplace operated by Physique Technologies LLC ("PHYZIK," "we," "us," or "our"). By onboarding to PHYZIK Shop or listing products, you agree to this Agreement, our `}
        <a href="/terms">Terms of Service</a>, and the policies referenced below.
      </p>

      <h2>Relationship of the parties</h2>
      <p>
        You are an independent business and the seller of record for the products
        you list. Nothing in this Agreement creates a partnership, joint venture,
        franchise, employment, or agency relationship between you and PHYZIK,
        except that you appoint PHYZIK as your limited payment collection agent
        for the purpose of accepting buyer payments on your behalf through Stripe.
        You are solely responsible for your products, listings, and customer
        obligations.
      </p>

      <h2>Eligibility and onboarding</h2>
      <p>
        To sell on PHYZIK Shop, you must be a legitimate business in good
        standing, able to enter into contracts, and able to lawfully sell and ship
        the products you list. You must provide accurate business, tax, and
        banking information, and you must complete onboarding and identity
        verification through Stripe Connect before you can receive payouts. We may
        approve, decline, or revoke marketplace access at our discretion.
      </p>

      <h2>Payments and payouts</h2>
      <p>
        Buyer payments are processed through Stripe. PHYZIK collects payment from
        buyers on your behalf, deducts the commission and any applicable
        payment-processing fees, and remits the remaining balance to your
        connected Stripe account on the payout schedule configured for your
        account. You are responsible for maintaining your Stripe Connect account in
        good standing and for any chargebacks, disputes, or refunds attributable to
        your orders. Stripe&apos;s terms apply to your use of Stripe Connect.
      </p>

      <h2>Commission and fees</h2>
      <p>
        PHYZIK charges a commission on the sale price of each product sold through
        PHYZIK Shop, based on product category, plus a passthrough of
        payment-processing fees charged by Stripe. Current commission rates are:
      </p>
      <p>
        <strong>Supplements — 15%.</strong>{' '}
        <strong>Apparel — 12%.</strong>{' '}
        <strong>Food — 12%.</strong>{' '}
        <strong>Equipment — 10%.</strong>
      </p>
      <p>
        Commission is calculated on the product sale price (excluding taxes and
        shipping unless stated otherwise). Payment-processing fees charged by
        Stripe are passed through to you in addition to the commission. We may
        update commission rates or fees on prior notice; continued listing of
        products after an update takes effect constitutes acceptance of the
        updated rates.
      </p>

      <h2>Fulfillment and shipping obligations</h2>
      <p>
        You are responsible for maintaining accurate inventory, fulfilling
        accepted orders promptly, shipping using reliable methods, providing
        tracking where available, and meeting the delivery estimates shown on your
        listings. You must handle returns, exchanges, and refunds in accordance
        with our <a href="/legal/returns">Returns &amp; Refunds Policy</a> and your
        own stated return policy, and you must provide responsive customer support
        for your orders.
      </p>

      <h2>Product compliance</h2>
      <p>
        You are solely responsible for ensuring your products and listings comply
        with all applicable laws and regulations. In particular, you represent and
        warrant that:
      </p>
      <p>
        <strong>Insurance.</strong>
        {` You maintain appropriate product-liability and general-liability insurance and can provide a certificate of insurance (COI) naming PHYZIK as an additional insured upon request.`}
      </p>
      <p>
        <strong>Supplements.</strong>
        {` Any dietary supplements are manufactured in facilities that follow current Good Manufacturing Practices (cGMP), are labeled in compliance with the Dietary Supplement Health and Education Act (DSHEA) and FDA requirements, and do not make claims to diagnose, treat, cure, or prevent any disease. Supplement listings must comply with our `}
        <a href="/legal/supplement-disclaimer">Supplement Disclaimer</a>.
      </p>
      <p>
        <strong>Labeling and claims.</strong>
        {` Your product labeling, ingredient disclosures, and marketing claims are accurate, substantiated, and not misleading.`}
      </p>
      <p>
        <strong>Prohibited items.</strong>
        {` You do not list any item identified in our `}
        <a href="/legal/prohibited-items">Prohibited Items</a> policy or otherwise
        prohibited by law.
      </p>

      <h2>Intellectual property</h2>
      <p>
        You represent that you own or have the rights to all trademarks, images,
        and content in your listings, and that your products do not infringe the
        intellectual-property rights of any third party. You grant PHYZIK a
        non-exclusive, royalty-free license to use your brand names, logos, and
        product content to operate, display, and promote the marketplace.
      </p>

      <h2>Prohibited conduct</h2>
      <p>
        You may not list prohibited or unlawful items, misrepresent products,
        manipulate reviews or rankings, circumvent the platform to avoid
        commission, or engage in fraudulent, deceptive, or harmful conduct.
      </p>

      <h2>Suspension and termination</h2>
      <p>
        We may suspend or terminate your access to PHYZIK Shop, remove listings,
        or withhold payouts associated with disputed or fraudulent transactions if
        you breach this Agreement, violate applicable law, or create risk for
        buyers or the platform. You may stop selling and request removal of your
        listings at any time, subject to fulfilling pending orders. Provisions that
        by their nature should survive — including indemnification, compliance
        representations, and payment obligations — survive termination.
      </p>

      <h2>Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless PHYZIK and its officers,
        employees, and agents from and against any claims, liabilities, damages,
        losses, and expenses (including reasonable legal fees) arising out of or
        related to your products, your listings, your fulfillment, your breach of
        this Agreement, or your violation of any law or third-party right.
      </p>

      <h2>Governing law</h2>
      <p>
        This Agreement is governed by the laws of [Governing law: State of __],
        without regard to conflict-of-law principles, and any disputes shall be
        resolved in the courts located in [venue: __].
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about selling on PHYZIK Shop? Contact us at{' '}
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
