import LegalLayout from '@/components/legal/LegalLayout'

export const metadata = {
  title: 'Returns & Refunds — PHYZIK',
  description:
    'How returns and refunds work for PHYZIK Shop orders, including per-brand policies, return windows, non-returnable items, and damaged or defective goods.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://phyzik.app/legal/returns' },
}

export default function ReturnsPage() {
  return (
    <LegalLayout title="Returns & Refunds" lastUpdated="June 23, 2026">
      <div className="mb-12 border border-border bg-bg-low px-5 py-4">
        <p className="!mb-0 text-[13px] leading-relaxed !text-text-tertiary">
          <strong className="!text-text-secondary">Draft — pending legal review.</strong>{' '}
          This document is provided for information only and is not legal
          advice.
        </p>
      </div>

      <p>
        This Returns &amp; Refunds Policy explains how returns, exchanges, and
        refunds work for purchases made through PHYZIK Shop, the marketplace
        operated by Physique Technologies LLC (&quot;PHYZIK,&quot;
        &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). It supplements our{' '}
        <a href="/legal/terms-of-sale">Terms of Sale</a>.
      </p>

      <h2>Per-brand policies</h2>
      <p>
        PHYZIK Shop is a marketplace, and each independent brand (the
        <strong> &quot;Seller&quot;</strong>) is the seller of record for its
        products. Sellers set their own return policies, which may differ from one
        another. The Seller&apos;s policy — including its return window, accepted
        condition, and any restocking fees — applies to your order. Where a Seller
        has not specified terms, the default terms in this policy apply.
      </p>

      <h2>Return window</h2>
      <p>
        Unless the Seller&apos;s policy states otherwise, eligible items may be
        returned within <strong>30 days</strong> of delivery. Items returned after
        the applicable window may not be accepted, or may be subject to a partial
        refund at the Seller&apos;s discretion.
      </p>

      <h2>Condition of returned items</h2>
      <p>
        To be eligible for a return, items must generally be unused, unworn, in
        their original packaging, and in resalable condition, with any tags or
        seals intact. Items that show signs of use or damage caused after
        delivery, or that are missing parts or packaging, may be refused or
        refunded only in part.
      </p>

      <h2>How to request a return or refund</h2>
      <p>
        To start a return or request a refund, open your order from the{' '}
        <strong>Orders</strong> section of your PHYZIK account and follow the
        prompts, or email{' '}
        <a href="mailto:admin@phyzik.app">admin@phyzik.app</a> with your order
        number and the reason for the return. We will help coordinate with the
        Seller. Please do not ship items back until you have received return
        instructions, as unauthorized returns may not be processed.
      </p>

      <h2>Refunds</h2>
      <p>
        Approved refunds are issued through Stripe to your original payment method.
        Once a refund is approved and processed, it typically takes several
        business days to appear on your statement, depending on your bank or card
        issuer. Original shipping charges may be non-refundable, and return
        shipping costs may be your responsibility, unless the return is due to a
        Seller error or a damaged or defective item.
      </p>

      <h2>Non-returnable items</h2>
      <p>
        For health, safety, and hygiene reasons, certain items are non-returnable
        once delivered, including:
      </p>
      <p>
        <strong>Opened or used dietary supplements</strong> and other consumable
        nutrition products once the seal is broken.{' '}
        <strong>Perishable food</strong> and other items with a limited shelf
        life.{' '}
        <strong>Personal-care or intimate items</strong> that cannot be resold for
        hygiene reasons once opened.{' '}
        <strong>Final-sale or clearance items</strong> clearly marked as
        non-returnable.{' '}
        <strong>Gift cards</strong> and digital items, where applicable. This does
        not affect your rights regarding items that arrive damaged, defective, or
        not as described.
      </p>

      <h2>Damaged, defective, or incorrect items</h2>
      <p>
        If your order arrives damaged, defective, or you received the wrong item,
        contact us at{' '}
        <a href="mailto:admin@phyzik.app">admin@phyzik.app</a> within a reasonable
        time — ideally within 7 days of delivery — with your order number and
        photos of the issue. Eligible damaged, defective, or incorrect items may
        be replaced or refunded at no additional cost to you, including return
        shipping where applicable.
      </p>

      <h2>Cancellations</h2>
      <p>
        You may request to cancel an order before it ships by contacting us or the
        Seller as soon as possible. Once an order has shipped, it is handled as a
        return under this policy.
      </p>

      <h2>Contact us</h2>
      <p>
        For help with a return or refund, contact us at{' '}
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
