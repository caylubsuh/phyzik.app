import LegalLayout from '@/components/legal/LegalLayout'

export const metadata = {
  title: 'Privacy Policy — PHYZIK',
  description: 'PHYZIK privacy policy.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="April 3, 2026">
      <p>
        {`Physique Technologies LLC ("we," "us," or "our") operates the PHYZIK mobile application (the "App"). This privacy policy explains how we collect, use, and protect your information.`}
      </p>

      <h2>Information we collect</h2>
      <p>
        <strong>Account information.</strong>
        {` When you create an account, we collect your email address, username, and password (stored securely via Supabase Auth with bcrypt hashing). You may optionally provide your name, profile photo, height, weight, bio, date of birth, and social media links.`}
      </p>
      <p>
        <strong>Training data.</strong>
        {` Workout data (exercises, sets, reps, weights, duration), body weight entries, progress photos you upload, program configurations, and performance analytics derived from your training.`}
      </p>
      <p>
        <strong>Social data.</strong>
        {` Posts, likes, comments, follows, squad memberships, challenge participations, direct messages, and gym check-ins.`}
      </p>
      <p>
        <strong>Device information.</strong>
        {` Device type, operating system version, app version, and general usage analytics.`}
      </p>

      <h2>How we use your information</h2>
      <p>
        We use your information to provide core App functionality — workout
        tracking, program generation, progressive overload calculations,
        performance analytics, social features, and squad management. We generate
        personalized training insights including Performance Index scores, muscle
        recovery estimates, rep range distribution analysis, and body weight
        trend calculations. We display your public profile and workout activity
        to other users based on your privacy settings. We use aggregate usage
        patterns to improve and develop new features, and we communicate with
        you about updates, support, and product announcements.
      </p>

      <h2>Data storage and security</h2>
      <p>
        Your data is stored on Supabase infrastructure hosted in the United
        States (East US / North Virginia region). We implement row-level
        security (RLS) policies to ensure users can only access their own data.
        Passwords are hashed using industry-standard algorithms and never stored
        in plaintext. Profile photos, workout photos, and media are stored in
        secure cloud storage buckets with authenticated access controls.
      </p>

      <h2>Data sharing</h2>
      <p>
        We do not sell your personal information. We do not share your data with
        third-party advertisers. We may share anonymized, aggregate data for
        analytics and research purposes. We will disclose information if
        required by law or to protect our legal rights. Workout posts you share
        on The Floor are visible to your followers and, depending on your
        settings, other App users.
      </p>

      <h2>Third-party services</h2>
      <p>
        The App uses Supabase (database, authentication, and file storage),
        Apple Sign-In (optional authentication), and Expo/EAS (app build and
        update distribution). Each service has its own privacy policy governing
        how they handle data.
      </p>

      <h2>Your rights</h2>
      <p>
        {`You can access and update your personal information through the App's profile settings at any time. You can delete your account and all associated data using the account deletion feature in the App settings, or by emailing us. You can request a copy of your data by contacting us. You can block other users to prevent them from viewing your profile or interacting with your content. You can report content that violates our community guidelines.`}
      </p>

      <h2>Data retention</h2>
      <p>
        We retain your data for as long as your account is active. When you
        delete your account, we permanently delete all associated data —
        including workout history, posts, messages, and media — within 30 days.
        Some anonymized aggregate data may be retained indefinitely for product
        improvement purposes.
      </p>

      <h2>{`Children's privacy`}</h2>
      <p>
        The App is not directed to children under 13. We do not knowingly
        collect personal information from children under 13. If we learn we
        have collected such information, we will promptly delete it. Users
        between 13 and 17 must have parental or guardian consent to use the
        App.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this privacy policy from time to time. We will notify you
        of material changes through the App or via email. Continued use of the
        App after changes constitutes acceptance of the updated policy.
      </p>

      <h2>Contact us</h2>
      <p>
        Physique Technologies LLC
        <br />
        <a href="mailto:admin@phyzik.app">
          admin@phyzik.app
        </a>
        <br />
        416 Windover Ave NW, Vienna, VA 22180
      </p>
    </LegalLayout>
  )
}
