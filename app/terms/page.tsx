import LegalLayout from '@/components/legal/LegalLayout'

export const metadata = {
  title: 'Terms of Service — PHYZIK',
  description: 'PHYZIK terms of service.',
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="April 3, 2026">
      <p>
        {`These Terms of Service ("Terms") govern your use of the PHYZIK mobile application ("App") operated by Physique Technologies LLC ("we," "us," or "our"), a Virginia limited liability company. By using the App, you agree to these Terms.`}
      </p>

      <h2>Eligibility</h2>
      <p>
        You must be at least 13 years old to use the App. If you are between 13
        and 17, you must have parental or guardian consent. By creating an
        account, you represent that you meet these requirements.
      </p>

      <h2>Account responsibilities</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account
        credentials and for all activity that occurs under your account. You
        must provide accurate and complete information when creating your
        account. You agree to notify us immediately of any unauthorized use of
        your account.
      </p>

      <h2>Acceptable use</h2>
      <p>
        {`You agree not to use the App to post content that is illegal, harmful, threatening, abusive, harassing, defamatory, obscene, or otherwise objectionable. You may not post content that contains nudity, sexually explicit material, or content that sexualizes minors in any way. You may not impersonate any person or entity, harass or intimidate other users, interfere with the App or its servers, attempt to access other users' accounts, use the App for unauthorized commercial purposes, upload malicious code, scrape or systematically extract content, or create multiple accounts to circumvent restrictions.`}
      </p>

      <h2>Community guidelines</h2>
      <p>
        PHYZIK is a training community. All content should relate to fitness,
        training, and athletic performance. We reserve the right to remove
        content and suspend accounts that violate our community standards,
        including content containing profanity, hate speech, harassment, spam,
        or content that promotes dangerous training practices or substance
        abuse.
      </p>

      <h2>User content</h2>
      <p>
        You retain ownership of content you post to the App (photos, workout
        data, comments, messages). By posting content, you grant us a
        non-exclusive, worldwide, royalty-free license to use, display, and
        distribute your content within the App and for promotional purposes
        such as featuring workout share cards in marketing materials. You can
        revoke this license by deleting your content or account.
      </p>
      <p>
        You are solely responsible for the content you post and represent that
        you have the right to post it. Content that infringes on intellectual
        property rights, right of publicity, or privacy rights of others is
        prohibited.
      </p>

      <h2>Messaging and reporting</h2>
      <p>
        The App includes direct messaging and social interaction features. You
        may report messages or content that violates these Terms using the
        in-app reporting tools. We review reports and may take action including
        content removal, warnings, or account suspension. We are not obligated
        to monitor all user communications but reserve the right to do so.
      </p>

      <h2>Workout and fitness information</h2>
      <p>
        The App provides workout programming, progressive overload calculations,
        body weight analytics, performance scoring, and fitness-related
        information for informational and educational purposes only. This is
        not medical advice. Consult a qualified healthcare professional before
        beginning any exercise program. We are not responsible for injuries
        resulting from workouts performed using the App. You assume all risk
        associated with your use of workout programs, exercise recommendations,
        and training analytics provided by the App.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The App, including its design, code, features, exercise library,
        algorithms, and the PHYZIK brand, is the intellectual property of
        Physique Technologies LLC. You may not copy, modify, distribute,
        reverse engineer, or create derivative works from any part of the App
        without our written consent.
      </p>

      <h2>Account deletion</h2>
      <p>
        You may delete your account at any time through the App settings. Upon
        deletion, all your personal data — including workout history, posts,
        messages, photos, and profile information — will be permanently removed
        within 30 days. Some anonymized aggregate data may be retained.
      </p>

      <h2>Termination</h2>
      <p>
        We may suspend or terminate your account at any time for violation of
        these Terms, community guidelines violations, or for any reason at our
        discretion with or without notice. Upon termination, your right to use
        the App ceases immediately.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        {`The App is provided "as is" and "as available" without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee that the App will be uninterrupted, error-free, or free of viruses or other harmful components.`}
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Physique Technologies LLC shall
        not be liable for any indirect, incidental, special, consequential, or
        punitive damages arising from your use of the App, including but not
        limited to physical injury, data loss, or loss of profits. Our total
        liability shall not exceed the amount you paid to us in the twelve
        months preceding the claim, or $50, whichever is greater.
      </p>

      <h2>Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless Physique Technologies LLC and
        its officers, employees, and agents from any claims, damages, or
        expenses arising from your use of the App, your violation of these
        Terms, or your violation of any third-party rights.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of the Commonwealth of Virginia,
        without regard to conflict of law principles. Any disputes shall be
        resolved in the state or federal courts located in Fairfax County,
        Virginia.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. We will notify you of
        material changes through the App or via email. Continued use of the
        App after changes constitutes acceptance of the updated Terms.
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
