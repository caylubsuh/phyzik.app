import LegalLayout from '@/components/legal/LegalLayout'

export const metadata = {
  title: 'Terms of Sale — PHYZIK',
  description:
    'Buyer terms for purchases made through PHYZIK Shop, where independent brands are the sellers of record and PHYZIK facilitates payment via Stripe.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://phyzik.app/legal/terms-of-sale' },
}

export default function TermsOfSalePage() {
  return (
    <LegalLayout title="Terms of Sale" lastUpdated="June 23, 2026">
      <div className="mb-12 border border-border bg-bg-low px-5 py-4">
        <p className="!mb-0 text-[13px] leading-relaxed !text-text-tertiary">
          <strong className="!text-text-secondary">Draft — pending legal review.</strong>{' '}
          This document is provided for information only and is not legal
          advice.
        </p>
      </div>

      <p>
        {`These Terms of Sale ("Sale Terms") apply to purchases of physical goods you make through PHYZIK Shop, the marketplace within the PHYZIK app and website operated by Physique Technologies LLC ("PHYZIK," "we," "us," or "our"). By placing an order, you agree to these Sale Terms, which supplement our `}
        <a href="/terms">Terms of Service</a> and{' '}
        <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>Marketplace model</h2>
      <p>
        PHYZIK Shop is a marketplace. Independent brands (each, a{' '}
        <strong>&quot;Seller&quot;</strong>) list and sell their products directly
        to you, and each Seller is the seller of record for its products. PHYZIK
        facilitates the marketplace — hosting product listings, processing
        payment, and providing the platform — but PHYZIK is not the seller,
        manufacturer, or distributor of the products unless expressly stated. The
        contract of sale for each product is between you and the Seller.
      </p>

      <h2>Eligibility</h2>
      <p>
        You must be at least 18 years old, or the age of majority in your
        jurisdiction, to purchase products through PHYZIK Shop. By placing an
        order, you represent that you meet this requirement and that the payment
        method you use is yours and valid.
      </p>

      <h2>Products and listings</h2>
      <p>
        Sellers are responsible for the accuracy of their product descriptions,
        images, ingredients, pricing, and availability. We strive to display
        information accurately, but we do not warrant that listings are complete,
        current, or error-free. Product colors and appearance may vary from how
        they appear on your device. Certain products, including dietary
        supplements, are subject to the disclaimers in our{' '}
        <a href="/legal/supplement-disclaimer">Supplement Disclaimer</a>.
      </p>

      <h2>Pricing, taxes, and shipping</h2>
      <p>
        Prices are shown in the listing and are set by the Seller. Applicable
        sales or other taxes, along with shipping and handling charges, are
        calculated and displayed at checkout before you confirm your order. You are
        responsible for paying the total order amount shown at checkout. We are not
        responsible for typographical or pricing errors; where a material pricing
        error occurs, the order may be cancelled and any payment refunded.
      </p>

      <h2>Payment</h2>
      <p>
        Payments are processed through our payment processor, Stripe. By submitting
        an order, you authorize the charge of the total order amount to your
        selected payment method. PHYZIK collects payment on behalf of the Seller
        and remits the Seller&apos;s share to it. We do not store your full card
        number on our servers.
      </p>

      <h2>Order acceptance</h2>
      <p>
        Your submission of an order is an offer to purchase. An order is accepted
        only when the Seller confirms it and/or ships the product; a confirmation
        screen or email acknowledging receipt of your order does not by itself
        constitute acceptance. We or the Seller may decline or cancel an order — in
        whole or in part — for reasons including product unavailability, suspected
        fraud, pricing errors, or inability to ship to your address. If your order
        is cancelled after payment, you will be refunded for the cancelled items.
      </p>

      <h2>Shipping and delivery</h2>
      <p>
        Shipping methods, costs, and estimated delivery times are set by the
        Seller and shown at checkout. Delivery estimates are not guarantees.
        Sellers are responsible for fulfilling and shipping orders. Title and risk
        of loss for products pass to you upon delivery to the carrier, unless
        applicable law requires otherwise.
      </p>

      <h2>Returns and refunds</h2>
      <p>
        Returns, exchanges, and refunds are governed by our{' '}
        <a href="/legal/returns">Returns &amp; Refunds Policy</a> and the
        individual Seller&apos;s return policy. Refunds, where due, are issued
        through Stripe to your original payment method. Certain items — such as
        opened supplements and perishable food — may be non-returnable, as
        described in that policy.
      </p>

      <h2>Disclaimers</h2>
      <p>
        {`Products are provided by Sellers, and any product warranties are made by the Seller, not by PHYZIK. To the maximum extent permitted by law, PHYZIK disclaims all warranties relating to products sold through PHYZIK Shop, including implied warranties of merchantability and fitness for a particular purpose. Nothing in these Sale Terms limits any rights you have under applicable consumer-protection law that cannot be waived.`}
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, PHYZIK&apos;s liability arising
        from your purchase through PHYZIK Shop is limited as set out in our{' '}
        <a href="/terms">Terms of Service</a>. PHYZIK is not liable for the acts or
        omissions of Sellers or carriers, or for the quality, safety, or legality
        of products listed by Sellers.
      </p>

      <h2>Governing law</h2>
      <p>
        These Sale Terms are governed by the laws of the Commonwealth of Virginia,
        without regard to conflict-of-law principles, and any disputes shall be
        resolved in the courts located in the state and federal courts located in the Commonwealth of Virginia.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about an order or these Sale Terms? Contact us at{' '}
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
