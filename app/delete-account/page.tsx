import LegalLayout from '@/components/legal/LegalLayout'

export const metadata = {
  title: 'Delete your account — PHYZIK',
  description:
    'How to permanently delete your PHYZIK account and what data is removed.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/delete-account' },
}

export default function DeleteAccountPage() {
  return (
    <LegalLayout title="Delete your account" lastUpdated="May 15, 2026">
      <p>
        You can permanently delete your PHYZIK account at any time, directly
        from the app or by emailing us. Deletion is irreversible — your
        workouts, posts, messages, and media are removed within 30 days.
      </p>

      <h2 id="in-app">Delete from the app (recommended)</h2>
      <ol>
        <li>Open PHYZIK on your device and sign in.</li>
        <li>
          Tap <strong>Profile</strong> → <strong>Settings</strong> (gear icon
          in the top right).
        </li>
        <li>
          Scroll to the <strong>Account</strong> section and tap{' '}
          <strong>Delete account</strong>.
        </li>
        <li>
          Confirm three times to acknowledge the action is permanent.
        </li>
      </ol>
      <p>
        Once confirmed, you are signed out immediately and a deletion job is
        queued. Your account becomes unreachable to other users right away.
      </p>

      <h2 id="email">Can&apos;t sign in?</h2>
      <p>
        If you have lost access to your account, email{' '}
        <a href="mailto:admin@phyzik.app">admin@phyzik.app</a> from the address
        associated with your PHYZIK account. We will verify ownership and
        process the deletion within 7 business days.
      </p>
      <p>
        Include the following in your message so we can act faster: your
        registered email, your PHYZIK username (if you remember it), and
        approximately when the account was created.
      </p>

      <h2 id="what-is-deleted">What gets deleted</h2>
      <p>
        Within 30 days of confirmation, the following data is permanently
        removed from our systems:
      </p>
      <ul>
        <li>Your profile (name, photo, bio, height, weight, social links)</li>
        <li>All workouts, sets, body weight entries, and progress photos</li>
        <li>All posts, comments, likes, and follows</li>
        <li>Direct messages you sent and received</li>
        <li>Squad memberships, challenge participations, and gym check-ins</li>
        <li>Authentication records and saved login providers</li>
        <li>Media stored in our cloud storage buckets</li>
      </ul>

      <h2 id="what-is-retained">What we retain</h2>
      <p>
        Some data is kept after deletion for limited, legitimate purposes:
      </p>
      <ul>
        <li>
          <strong>Anonymized analytics</strong> — aggregate, non-identifying
          usage data may be retained indefinitely for product improvement. It
          cannot be linked back to you.
        </li>
        <li>
          <strong>Audit and abuse logs</strong> — security and moderation
          records (e.g. reports filed against the account) are retained for up
          to 12 months for fraud prevention and legal compliance.
        </li>
        <li>
          <strong>Financial records</strong> — if you ever made a paid
          transaction, the underlying receipt is retained as required by tax
          and accounting law.
        </li>
      </ul>

      <h2 id="partial-deletion">Deleting individual data without closing your account</h2>
      <p>
        You don&apos;t have to delete your entire account to remove specific
        data. From inside the app you can:
      </p>
      <ul>
        <li>Delete an individual workout (long-press → Delete)</li>
        <li>Delete a post from The Floor (post menu → Delete)</li>
        <li>Delete body weight entries and progress photos</li>
        <li>Remove a profile photo, bio, or social link</li>
      </ul>
      <p>
        These deletions are immediate. If you need help removing something
        you can&apos;t reach in the UI, email{' '}
        <a href="mailto:admin@phyzik.app">admin@phyzik.app</a>.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Physique Technologies LLC
        <br />
        <a href="mailto:admin@phyzik.app">admin@phyzik.app</a>
        <br />
        416 Windover Ave NW, Vienna, VA 22180
      </p>
    </LegalLayout>
  )
}
