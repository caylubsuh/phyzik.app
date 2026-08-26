import LegalLayout from '@/components/legal/LegalLayout'

export const metadata = {
  title: 'Terms of Service — PHYZIK',
  description:
    'The terms governing your use of the PHYZIK app, PHYZIK Pro subscription, social features, and access to the PHYZIK Shop marketplace.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://phyzik.app/terms' },
}

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="August 26, 2026">
      <p>
        {`These Terms of Service ("Terms") govern your use of the PHYZIK mobile application, the phyzik.app website, and related services (together, the "Services"), operated by Physique Technologies LLC, a Virginia limited liability company ("PHYZIK," "we," "us," or "our"). By creating an account or using the Services, you agree to these Terms. If you do not agree, do not use the Services.`}
      </p>

      <h2>Eligibility</h2>
      <p>
        You must be at least 13 years old to use the App. If you are between 13
        and 17, you must have parental or guardian consent. Purchasing physical
        goods through PHYZIK Shop requires you to be at least 18 years old (or the
        age of majority where you live). By creating an account, you represent
        that you meet these requirements.
      </p>

      <h2>Account responsibilities</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account
        credentials and for all activity that occurs under your account. You must
        provide accurate and complete information when creating your account, and
        you agree to notify us immediately of any unauthorized use of your
        account.
      </p>

      <h2>PHYZIK Pro subscription</h2>
      <p>
        PHYZIK offers a free tier and a single paid subscription, PHYZIK Pro,
        available on a monthly or annual basis. PHYZIK Pro unlocks the premium
        features described at the point of purchase. Subscriptions purchased
        through the Apple App Store or Google Play are billed through your Apple
        or Google account and are subject to that platform&apos;s terms; web
        subscriptions are billed through our payment processor, Stripe.
      </p>
      <p>
        Subscriptions automatically renew for the same period unless cancelled at
        least 24 hours before the end of the current period. You can manage or
        cancel your subscription through your App Store or Google Play account
        settings, or — for web subscriptions — through your account billing page.
        Except where required by law or platform policy, payments are
        non-refundable and we do not provide refunds or credits for partial
        periods. Prices may change; we will give notice of price changes as
        required, and continued use after a change takes effect constitutes
        acceptance of the new price.
      </p>

      <h2>PHYZIK Shop marketplace</h2>
      <p>
        PHYZIK Shop is a marketplace on the phyzik.app website where independent
        brands offer physical goods. It is not part of the iOS or Android app, and
        no physical goods are sold or delivered inside the app. Purchases made
        through PHYZIK Shop are governed by our{' '}
        <a href="/legal/terms-of-sale">Terms of Sale</a> and{' '}
        <a href="/legal/returns">Returns &amp; Refunds Policy</a>. The independent
        brand is the seller of record for each product; PHYZIK facilitates the
        marketplace and processes payments through Stripe. Please review the Terms
        of Sale before making a purchase.
      </p>

      <h2>Acceptable use</h2>
      <p>
        {`You agree not to use the Services to post content that is illegal, harmful, threatening, abusive, harassing, defamatory, obscene, or otherwise objectionable. You may not post content that contains nudity, sexually explicit material, or content that sexualizes minors in any way. You may not impersonate any person or entity, harass or intimidate other users, interfere with the Services or their servers, attempt to access other users' accounts, use the Services for unauthorized commercial purposes, upload malicious code, scrape or systematically extract content, or create multiple accounts to circumvent restrictions.`}
      </p>

      <h2>Community guidelines</h2>
      <p>
        PHYZIK is a training community. Content should relate to fitness,
        training, and athletic performance. We reserve the right to remove content
        and suspend accounts that violate our community standards, including
        content containing profanity, hate speech, harassment, spam, or content
        that promotes dangerous training practices or substance abuse.
      </p>

      <h2>User content</h2>
      <p>
        You retain ownership of content you post to the Services (photos, workout
        data, comments, messages). By posting content, you grant us a
        non-exclusive, worldwide, royalty-free license to use, host, store,
        reproduce, display, and distribute your content within the Services and
        for promotional purposes such as featuring workout share cards in
        marketing materials. You can revoke this license by deleting your content
        or account, except to the extent it has already been shared with others or
        used in materials already distributed.
      </p>
      <p>
        You are solely responsible for the content you post and represent that you
        have the right to post it. Content that infringes the intellectual
        property, publicity, or privacy rights of others is prohibited.
      </p>

      <h2>Messaging and reporting</h2>
      <p>
        The App includes direct messaging and social-interaction features. You may
        report messages or content that violate these Terms using the in-app
        reporting tools. We review reports and may take action including content
        removal, warnings, or account suspension. We are not obligated to monitor
        all user communications but reserve the right to do so.
      </p>

      <h2>Workout, fitness, and nutrition information</h2>
      <p>
        The Services provide workout programming, progressive-overload
        calculations, body-weight and nutrition analytics, performance scoring,
        and related information for informational and educational purposes only.
        This is not medical, dietary, or professional health advice. Consult a
        qualified healthcare professional before beginning any exercise or
        nutrition program. We are not responsible for injuries or health outcomes
        resulting from your use of the Services, and you assume all risk
        associated with workout programs, exercise recommendations, nutrition
        tracking, and analytics provided by the Services.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Services, including their design, code, features, exercise library,
        algorithms, and the PHYZIK brand, are the intellectual property of
        Physique Technologies LLC. You may not copy, modify, distribute, reverse
        engineer, or create derivative works from any part of the Services without
        our written consent.
      </p>

      <h2>Account deletion</h2>
      <p>
        You may delete your account at any time through the App settings. Upon
        deletion, your personal data — including workout history, nutrition logs,
        posts, messages, photos, and profile information — will be permanently
        removed within 30 days. Certain order, transaction, and audit records may
        be retained where required for legal, tax, or fraud-prevention purposes,
        and some anonymized aggregate data may be retained.
      </p>

      <h2>Termination</h2>
      <p>
        We may suspend or terminate your account at any time for violation of
        these Terms, our community guidelines, or for any reason at our discretion,
        with or without notice. Upon termination, your right to use the Services
        ceases immediately.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        {`The Services are provided "as is" and "as available" without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee that the Services will be uninterrupted, error-free, or free of viruses or other harmful components. Products sold through PHYZIK Shop are warranted, if at all, by the independent brand selling them and not by PHYZIK.`}
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Physique Technologies LLC shall
        not be liable for any indirect, incidental, special, consequential, or
        punitive damages arising from your use of the Services, including but not
        limited to physical injury, data loss, or loss of profits. Our total
        liability for any claim arising out of or relating to the Services shall
        not exceed the amount you paid to us in the twelve months preceding the
        claim, or USD $50, whichever is greater.
      </p>

      <h2>Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless Physique Technologies LLC and its
        officers, employees, and agents from any claims, damages, or expenses
        arising from your use of the Services, your violation of these Terms, or
        your violation of any third-party rights.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of the Commonwealth of Virginia,
        without regard to its conflict-of-law principles. Any dispute arising out
        of or relating to these Terms or the Services shall be resolved
        exclusively in the state or federal courts located in the Commonwealth of
        Virginia, and you consent to the personal jurisdiction and venue of those
        courts.
      </p>

      <h2>Apple App Store</h2>
      <p>
        These Terms are an agreement between you and Physique Technologies LLC
        only, and not with Apple Inc. Apple is not responsible for the App or its
        content. Your license to use the App is a non-transferable license to use
        it on any Apple-branded device you own or control, as permitted by the
        Usage Rules in the Apple Media Services Terms and Conditions.
      </p>
      <p>
        Apple has no obligation to furnish any maintenance or support services for
        the App. If the App fails to conform to any applicable warranty, you may
        notify Apple, and Apple will refund the purchase price of the App; to the
        maximum extent permitted by law, Apple has no other warranty obligation
        with respect to the App. Physique Technologies LLC — not Apple — is
        responsible for addressing any claims relating to the App, including
        product liability claims, any claim that the App fails to conform to a
        legal or regulatory requirement, and claims arising under consumer
        protection or similar legislation.
      </p>
      <p>
        {`In the event of any third-party claim that the App or your possession and use of it infringes that third party's intellectual property rights, Physique Technologies LLC — not Apple — is solely responsible for the investigation, defense, settlement, and discharge of that claim. You represent that you are not located in a country subject to a U.S. Government embargo or designated as a "terrorist supporting" country, and that you are not listed on any U.S. Government list of prohibited or restricted parties. Apple and its subsidiaries are third-party beneficiaries of these Terms and, upon your acceptance, will have the right to enforce these Terms against you as a third-party beneficiary.`}
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. We will notify you of
        material changes through the Services or via email. Continued use of the
        Services after changes take effect constitutes acceptance of the updated
        Terms.
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
