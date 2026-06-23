import LegalLayout from '@/components/legal/LegalLayout'

export const metadata = {
  title: 'Privacy Policy — PHYZIK',
  description:
    'How PHYZIK collects, uses, shares, and protects your information across the social training app and PHYZIK Shop marketplace, including health and fitness data.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://phyzik.app/privacy' },
}

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="June 23, 2026">
      <div className="mb-12 border border-border bg-bg-low px-5 py-4">
        <p className="!mb-0 text-[13px] leading-relaxed !text-text-tertiary">
          <strong className="!text-text-secondary">Draft — pending legal review.</strong>{' '}
          This document is provided for information only and is not legal
          advice.
        </p>
      </div>

      <p>
        {`Physique Technologies LLC ("PHYZIK," "we," "us," or "our") operates the PHYZIK mobile application, the PHYZIK Shop marketplace, and the phyzik.app website (together, the "Services"). This Privacy Policy explains what information we collect, how and why we use it, who we share it with, and the choices and rights you have. By using the Services, you agree to the practices described here.`}
      </p>
      <p>
        PHYZIK is both a social fitness platform and a marketplace where
        independent brands sell physical goods. Because the Services include
        payments and the sale of products, this policy covers shopping and order
        data in addition to training and social data.
      </p>

      <h2>Information we collect</h2>
      <p>
        <strong>Account information.</strong>
        {` When you create an account we collect your email address, username, and password (stored securely via Supabase Auth with bcrypt hashing). You may optionally provide your name, profile photo, height, weight, bio, date of birth, and social media links. If you sign in with Apple or Google, we receive the basic profile information those providers share, such as your name and email (or Apple's private relay email).`}
      </p>
      <p>
        <strong>Health and fitness data.</strong>
        {` The Services are designed to track training and body metrics. We collect workout data (exercises, sets, reps, weights, rest, duration), body weight and body-measurement entries, nutrition logs (meals, calories, and macronutrients), progress photos you upload, program configurations, and performance analytics derived from your activity. Some of this is sensitive health-related information, and we treat it accordingly.`}
      </p>
      <p>
        <strong>Apple HealthKit.</strong>
        {` With your explicit permission, the App can read from and write to Apple HealthKit (for example, workouts, active energy, body weight, and nutrition). HealthKit data is used only to provide app features you have enabled. We never use HealthKit data for advertising or marketing, and we do not sell it. You can revoke HealthKit access at any time in the iOS Settings app or Apple Health app.`}
      </p>
      <p>
        <strong>AI processing of your inputs.</strong>
        {` When you use AI-assisted features — such as logging a meal from a photo or logging a workout by voice — the relevant content (the meal image, or an audio recording and its transcript) is sent to our AI processing provider, Anthropic (Claude), to interpret it and return structured results. This content is processed to deliver the feature and is not used by us to train advertising models.`}
      </p>
      <p>
        <strong>Social data.</strong>
        {` Posts, likes, comments, follows, squad memberships, challenge participations, direct messages, and gym check-ins.`}
      </p>
      <p>
        <strong>Marketplace and purchase data.</strong>
        {` When you buy from PHYZIK Shop, we and our payment processor collect the information needed to complete your order — items purchased, order amount, shipping and billing address, contact details, and order status. Payment card details are collected and processed directly by Stripe; we do not store your full card number on our servers.`}
      </p>
      <p>
        <strong>Device and usage information.</strong>
        {` Device type, operating system version, app version, approximate region, crash and performance diagnostics, and general usage analytics describing how features are used.`}
      </p>
      <p>
        <strong>Permissions you may grant.</strong>
        {` Depending on the features you use, the App may request access to your camera and photo library (for progress photos and meal photos), your microphone (for voice workout logging), push notifications, your contacts (to help you find friends), your calendar (to schedule workouts or rest reminders), and your location or maps (for gym check-ins and finding gyms near you). These permissions are optional, requested in context, and can be changed in your device settings at any time.`}
      </p>

      <h2>How we use your information</h2>
      <p>
        We use your information to provide and operate the Services — workout
        tracking, program generation, progressive-overload calculations,
        nutrition logging, performance analytics, social features, squad
        management, and the PHYZIK Shop marketplace. We use it to process and
        fulfill purchases, communicate with you about orders, prevent fraud, and
        provide customer support. We generate personalized training insights,
        display your public profile and activity to other users based on your
        privacy settings, maintain the security and integrity of the Services,
        diagnose and fix problems, comply with legal obligations, and improve and
        develop new features. We may send you service-related messages and, where
        permitted, product announcements you can opt out of.
      </p>

      <h2>How we share your information</h2>
      <p>
        We do not sell your personal information, and we do not share your health
        and fitness data with third-party advertisers. We share information in the
        following limited ways:
      </p>
      <p>
        <strong>With other users.</strong>
        {` Content you choose to make public — such as posts on The Floor, your public profile, and gym check-ins — is visible to your followers and, depending on your settings, other users.`}
      </p>
      <p>
        <strong>With sellers and fulfillment partners.</strong>
        {` When you place an order, we share the order details and shipping information needed to fulfill it with the independent brand selling the product and any carrier handling delivery.`}
      </p>
      <p>
        <strong>With service providers.</strong>
        {` We share data with vendors who process it on our behalf under contract, as described in "Third-party services" below.`}
      </p>
      <p>
        <strong>For legal and safety reasons.</strong>
        {` We may disclose information if required by law, to enforce our terms, to detect or prevent fraud or abuse, or to protect the rights, property, or safety of PHYZIK, our users, or the public.`}
      </p>
      <p>
        <strong>Business transfers.</strong>
        {` If we are involved in a merger, acquisition, financing, or sale of assets, your information may be transferred as part of that transaction, subject to this policy.`}
      </p>
      <p>
        We may also share anonymized or aggregated data that cannot reasonably be
        used to identify you.
      </p>

      <h2>Third-party services</h2>
      <p>
        We rely on the following third parties to operate the Services. Each has
        its own privacy policy governing how it handles data.
      </p>
      <p>
        <strong>Supabase</strong> — database, authentication, and file storage.{' '}
        <strong>Stripe</strong> — payment processing for marketplace purchases and
        web subscriptions.{' '}
        <strong>PostHog</strong> — product analytics and usage measurement.{' '}
        <strong>Sentry</strong> — crash reporting and performance diagnostics.{' '}
        <strong>Anthropic (Claude)</strong> — AI processing of meal photos and
        voice workout logging.{' '}
        <strong>Apple HealthKit</strong> — optional read/write of health and
        fitness data on iOS.{' '}
        <strong>Apple Sign-In</strong> and <strong>Google Sign-In</strong> —
        optional authentication.{' '}
        <strong>Apple Push Notification service</strong> and{' '}
        <strong>Firebase Cloud Messaging</strong> — push notification delivery.{' '}
        <strong>Expo / EAS</strong> — app build and update distribution. Where you
        enable them, your device&apos;s contacts, calendar, and maps providers are
        also involved in delivering those specific features.
      </p>

      <h2>Data storage and security</h2>
      <p>
        Your data is stored on Supabase infrastructure hosted in the United
        States. We implement row-level security (RLS) so users can only access
        their own data, encrypt data in transit, hash passwords using
        industry-standard algorithms, and store photos and media in access-
        controlled cloud storage. No method of transmission or storage is
        completely secure, so we cannot guarantee absolute security, but we work
        to protect your information using reasonable technical and organizational
        measures.
      </p>

      <h2>Your rights and choices</h2>
      <p>
        {`You can access and update your information in the App's profile settings at any time. You can delete your account and associated data using the in-app account-deletion feature or by emailing us. You can request a copy of your data, ask us to correct or delete information, and object to or restrict certain processing, subject to applicable law. Depending on where you live, you may have additional rights under laws such as the GDPR or the CCPA/CPRA, including the right to know what personal information we hold and the right not to be discriminated against for exercising your rights. You can also block other users, control who sees your content, manage app permissions in your device settings, and opt out of non-essential notifications.`}
      </p>

      <h2>Data retention</h2>
      <p>
        We retain your data for as long as your account is active. When you delete
        your account, we permanently delete associated data — including workout
        history, nutrition logs, posts, messages, and media — within 30 days.
        Order and transaction records may be retained longer where required for
        tax, accounting, fraud-prevention, or legal-compliance purposes. Some
        anonymized aggregate data may be retained indefinitely for product
        improvement.
      </p>

      <h2 id="account-deletion">Account deletion</h2>
      <p>
        You can permanently delete your PHYZIK account at any time. From the app,
        go to{' '}
        <strong>Profile → Settings → Account → Delete account</strong> and confirm
        three times. If you can&apos;t sign in, email{' '}
        <a href="mailto:admin@phyzik.app">admin@phyzik.app</a> from your registered
        address and we will process the deletion within 7 business days. Workouts,
        nutrition logs, posts, messages, media, and profile data are removed
        within 30 days. Aggregated analytics and certain transaction or audit
        records are retained for up to 12 months (or longer where legally
        required) for fraud prevention and compliance. Full instructions live at{' '}
        <a href="/delete-account">phyzik.app/delete-account</a>.
      </p>

      <h2>{`Children's privacy`}</h2>
      <p>
        The Services are not directed to children under 13, and we do not
        knowingly collect personal information from children under 13. Users
        between 13 and 17 must have parental or guardian consent to use the App.
        Purchasing physical goods through PHYZIK Shop is restricted to users who
        are at least 18 years old (or the age of majority where they live). If we
        learn we have collected personal information from a child under 13 without
        appropriate consent, we will promptly delete it.
      </p>

      <h2>International users</h2>
      <p>
        We operate in the United States, and your information is processed and
        stored there. If you access the Services from outside the United States,
        you understand that your information will be transferred to and processed
        in the United States, which may have different data-protection laws than
        your country.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of
        material changes through the Services or via email. Continued use of the
        Services after changes take effect constitutes acceptance of the updated
        policy.
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
