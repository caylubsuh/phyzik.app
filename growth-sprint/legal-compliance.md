# Legal & Compliance Audit

**Owner:** Caleb (business/legal decisions), Vijay (technical implementation).
**Scope:** Pre-launch and first-90-days legal hygiene for PHYZIK (Physique Technologies LLC).
**Status:** This is a non-attorney audit. It flags issues; it does not render legal advice. Caleb should have an attorney review the areas marked **[LAWYER REVIEW]** before shipping.

**Recommended attorney:** Retain a startup-experienced attorney (fixed-fee or hourly) for 5–10 hours of consultation this quarter. Budget $2–5k. Non-optional.

---

## 1. Priority ranking

Numbered most → least urgent. Each item: what it is, why it matters, recommended action, rough timeline.

### TIER 1 — Must address in week 1

| # | Issue | Risk if ignored | Action |
|---|---|---|---|
| 1 | Privacy Policy accuracy | App Store rejection, GDPR/CCPA fines, user mistrust | Audit existing policy against actual data practices. Update within 7 days. |
| 2 | Terms of Service enforceability | Disputes with users, uncapped liability exposure | Review for ToS that clearly disclaim liability + define acceptable use. |
| 3 | Apple App Store compliance | Rejection / removal | Verify against 2024-2025 App Store Review Guidelines. |
| 4 | Medical/fitness disclaimer | Claims of medical benefit expose us | Add strong disclaimer on app + website. |
| 5 | FTC endorsement guide compliance | FTC warning letters, fines up to $50k/violation | Brief all ambassadors + influencers on disclosure. |

### TIER 2 — Address in weeks 2–3

| # | Issue | Risk | Action |
|---|---|---|---|
| 6 | Data Processing Agreements with vendors | GDPR Article 28 breach | List vendors, confirm DPAs. |
| 7 | Cookie / tracker disclosure on website | GDPR/CCPA cookie violation | Implement consent banner (EU users) + privacy toggle. |
| 8 | Trademark search + defensive filing | Losing "PHYZIK" name to a challenger | File USPTO application. |
| 9 | Content + IP provenance (logos, images) | DMCA, reputational | Audit all marketing assets. |
| 10 | Accessibility compliance (ADA) | Class-action risk in US | WCAG 2.2 AA audit of site + app. |

### TIER 3 — Address in weeks 4–8

| # | Issue | Risk | Action |
|---|---|---|---|
| 11 | International data residency | Non-US user expansion risk | Decide posture: US only until Y, or multi-region from day 1. |
| 12 | GDPR / UK GDPR compliance (full) | Fines up to 4% global revenue | Review with attorney if EU launching. |
| 13 | EU Digital Services Act (DSA) | Content moderation obligations | Minor at our scale; document now. |
| 14 | Children under 13 (COPPA) | $50k+ fines | App Store sets age 17+; enforce + document. |
| 15 | Refund + subscription compliance | Consumer protection violations (when Pro launches) | Build refund policy before Pro ships. |

---

## 2. Tier 1 deep dives

### 2.1 Privacy Policy audit

**Current state:** [ASSUMPTION] PHYZIK has a `/privacy` page (referenced in Footer). Contents unverified.

**Must cover:**
- **What we collect:**
  - Account data: email, username, OAuth provider identifier.
  - Training data: exercise logs, sets, reps, weights, session timestamps.
  - Bodyweight (if provided), optional nutrition data.
  - Device data: OS version, device model, iOS device ID for attribution.
  - Location (only if user opts in for gym features — NOT by default).
  - Contact list (only when "Invite from Contacts" flow is used — NOT by default).
  - Health data (Apple HealthKit, only with explicit permission per session).
  - Analytics events (via Vercel Analytics + PostHog when installed).
- **Why we collect it:** training features, social features, app improvement, security, legal obligations.
- **Who we share it with:** Named sub-processors (Supabase, Apple, Vercel, PostHog, attribution vendor if any).
- **User rights:** access, deletion, portability, correction.
- **Retention:** how long data is kept (recommend: active while account exists, 30–90 days after deletion).
- **How users can delete their account + data.** Must be in-app (App Store requires this since iOS 15).
- **Contact:** privacy@phyzik.app inbox.
- **Jurisdiction:** governing law, venue.
- **Updates:** how we notify of changes.

**Specific checks:**
- [ ] **In-app account deletion flow exists.** Apple requires this. App can be rejected at review if missing.
- [ ] Privacy policy reflects every SDK the app ships with (check `package.json`, check `Info.plist`, check `NSPrivacyAccessedAPITypes` in iOS 17+).
- [ ] Apple's **Privacy Nutrition Labels** in App Store Connect match the policy. Mismatches flagged by Apple reviewers.
- [ ] PHZ Tech LLC is named as the data controller.

**Action week 1:**
1. Caleb: read current `/privacy` doc start to finish. List discrepancies with reality.
2. Caleb + Vijay: list every SDK the app integrates with. Verify policy covers each.
3. Update doc. Publish.
4. Update Apple Privacy Nutrition Labels in App Store Connect to match.

**[LAWYER REVIEW]** recommended once updated.

---

### 2.2 Terms of Service

**Current state:** [ASSUMPTION] `/terms` page exists. Contents unverified.

**Must include:**
- **Eligibility:** age requirement (17+ matches App Store age rating).
- **Acceptable use:** no cheating metrics, no harassment, no spam, no doping-product promo, no impersonation.
- **User-generated content:** users grant PHYZIK license to display their content. Content ownership stays with user.
- **Community moderation:** PHYZIK can remove content or suspend accounts that violate rules. Dispute process exists.
- **Disclaimer of warranty:** app is provided "as-is." No warranties of any kind.
- **Limitation of liability:** PHYZIK's liability capped at (typical: greater of $100 or amount user paid in last 12 months).
- **Indemnification:** user indemnifies PHYZIK for their own misuse.
- **Governing law + jurisdiction:** typically State of [LLC home state], with arbitration clause.
- **Arbitration + class action waiver:** standard; must be conspicuous. Survives most but not all legal challenges.
- **Modification of terms:** how we notify users of changes.
- **Account termination:** our right to terminate for violation; user's right to delete.

**Specific checks:**
- [ ] ToS link available both in app (settings) and on website footer. Both must be reachable.
- [ ] ToS acknowledgment step in signup flow (checkbox or implicit-through-use clause).
- [ ] Apple's EULA: we can use Apple's standard EULA OR our own. Ours is used — ensure Apple's minimum clauses are included (https://www.apple.com/legal/internet-services/itunes/dev/stdeula/).

**Action week 1:**
1. Caleb reads current ToS.
2. Confirm Apple standard EULA clauses are embedded or referenced.
3. **[LAWYER REVIEW]** — this is the document most likely to need attorney eyes.

---

### 2.3 Apple App Store compliance

**Source of truth:** App Store Review Guidelines (https://developer.apple.com/app-store/review/guidelines/).

**High-risk guidelines for PHYZIK:**

**1.4 Physical harm / 1.4.1 Medical:**
- If the app claims medical benefits or replaces medical advice, it needs medical validation. Apps that say "track injuries, we'll heal you" get rejected. PHYZIK's positioning is training, not medical — keep it that way.
- **Action:** No medical claim language in marketing copy or in-app. Avoid "cure," "treat," "diagnose." Safe phrases: "training," "coaching," "progression," "programming."

**1.6 Data security:**
- If we collect health data, we must use secure frameworks (HealthKit) and follow Apple's handling rules.

**2.3.1 Accurate metadata:**
- App Store listing must accurately describe the app. Keyword-stuffing (cramming keywords into description that don't describe the app) = rejection.

**3.1 In-App Purchase:**
- **If Pro launches:** must use Apple's In-App Purchase. Cannot direct users to pay outside the app (with limited reader/linking exceptions).
- Subscription terms must be clearly displayed + match App Store Connect data.
- **Reader apps exception** (can link to external web for payment): doesn't apply to fitness apps.

**4.2 Minimum functionality:**
- Not at risk. PHYZIK is clearly a functional app.

**5.0 Legal:**
- **5.1 Privacy:** see privacy policy section above.
- **5.1.1 Data collection:** explicit permission prompts when collecting sensitive data (HealthKit, Contacts, Location, Camera). iOS 14+ required.
- **5.1.1(v) Account deletion:** must be possible in-app. Non-negotiable.
- **5.4 VPN:** we don't use VPN-related features. Skip.
- **5.6.3 Discovery Features:** if we use Apple Sign In, we must also accept it (standard).
- **5.7 Permissible language and content:** no hate speech, no promotion of illegal activity. Platforms host user content — we need moderation tools to handle violations.

**Health & Fitness category specific concerns:**
- Apps making health/exercise claims need substantiation. "Evidence-based programming" is fine because we can cite it. "Lose 10lbs in 30 days" would be not fine.
- Integration with Apple Watch (future): additional guidelines 2.5.18 for workout apps using Core Motion.

**Action week 1:**
1. Caleb: re-read §1.4, §1.6, §2.3, §5.0 specifically.
2. Vijay: verify all HealthKit + Contacts + Location permission requests include NSUsageDescription strings that honestly describe use.
3. Vijay: verify in-app account deletion flow works end-to-end.
4. Caleb: verify App Store listing description matches app reality (no unshipped features).

---

### 2.4 Medical / fitness disclaimer

**The problem:** Fitness apps live in a gray zone. Implying we cure, heal, or provide medical advice exposes us to FDA scrutiny (as a "medical device" software) and to personal injury liability.

**What to put in place:**

**On the website (footer + FAQ):**
> "PHYZIK is for educational and training purposes only. Nothing in the app or on this site constitutes medical advice. Consult a qualified healthcare professional before starting any exercise program, especially if you have existing injuries, chronic conditions, or are pregnant. Stop exercising immediately if you experience pain or unusual symptoms and consult a doctor."

**In the app (first run + settings):**
- Brief disclaimer on sign-up: a one-line "You accept that PHYZIK is not medical advice" as a checkbox or inline text in the ToS acknowledgment.
- Longer disclaimer accessible from Settings → About.

**In marketing copy:**
- Avoid: "cure," "heal," "treatment," "medical benefit," "medically proven," "doctors recommend" (without specific doctor names + affidavits).
- OK: "evidence-based programming," "coaching," "performance improvement," "recovery support," "training."

**[LAWYER REVIEW]** for the specific wording. Cost: 1-hour review at $300–500.

---

### 2.5 FTC endorsement guide compliance

**Source of truth:** FTC 16 CFR Part 255 (https://www.ftc.gov/business-guidance/resources/ftc-endorsement-guides-what-people-are-asking).

**Summary:** any material connection between PHYZIK and an endorser must be disclosed **clearly and conspicuously** in the endorsement. Material connections include:
- Money (paid endorsement).
- Free product (merch, free app access, free Pro).
- Equity or employment.
- Family or personal relationships.
- Contest entry, discount, or anything of value.

**What this means for us:**

**Ambassadors (all tiers):**
- Free merch + badge = material connection.
- Disclosure required on every post featuring PHYZIK.
- Required tag: `#ad` or `#partnership` OR Instagram's native "Paid partnership" tag OR explicit wording: "partnering with PHYZIK."
- Tucking `#ad` at the end of 30 hashtags is **not** clear and conspicuous. FTC has explicitly said so.

**Influencers (all tiers):**
- Same, stricter. Paid content always requires disclosure.
- IG's Paid Partnership tag is the gold-standard disclosure.
- YouTube: disclosure in the video + in the description.
- TikTok: disclosure on-screen during the mention.

**Staff / team members:**
- A team member posting about PHYZIK must disclose their relationship. "Founder of PHYZIK" in bio is often enough; re-stating in captions is safer.

**Action week 1:**
1. Draft a 1-page disclosure brief for all ambassadors/influencers. Mandatory read-and-acknowledge.
2. Include in every deal memo + ambassador welcome email.
3. Audit existing content on `@phyzikapp` and team IG accounts for compliance. Fix gaps retroactively (edit captions if possible).
4. Bookmark the FTC endorsement guide. Re-read every 6 months.

**Risk:** FTC warning letters have increased since 2023. Major influencer cases (Kim Kardashian, Floyd Mayweather) were in the $1.26M+ range for individual violations. Early-stage startups are not the primary target, but we're not immune.

---

## 3. Tier 2 deep dives

### 3.1 Data Processing Agreements (DPAs)

**What:** When we use a vendor that processes personal data on our behalf, GDPR Article 28 requires a DPA. Most commercial vendors have standard DPAs you accept at signup or available on their legal page.

**Current vendor list (to verify + sign DPAs):**

| Vendor | Purpose | DPA status |
|---|---|---|
| Supabase | User data, DB | Available — auto-accepted on paid plans or available on request. Check. |
| Apple | Sign in with Apple, App Store, HealthKit | Apple Developer Program Agreement covers. |
| Vercel | Hosting, edge, analytics | DPA included in Vercel Terms. Verify. |
| PostHog (if installed) | Analytics | DPA available on signup. |
| GitHub | Code hosting | GitHub Enterprise DPA or standard. |
| Anthropic (if any user data in Claude API) | Dev tooling | Standard API agreement covers. |
| Google (if Gmail/Calendar used for ops) | Internal ops | Google Workspace agreement. |
| Printful / Printer (merch) | Fulfillment (physical addresses) | DPA available on signup. |
| Branch/AppsFlyer (if installed) | Attribution | Standard DPA at signup. |
| Stripe / Apple In-App Purchase (when Pro) | Payments | Apple IAP covers iOS; Stripe DPA for any web path. |

**Action week 2:**
1. List every vendor processing user data.
2. Verify DPA is in place for each.
3. Flag any vendor without DPA + either sign or switch.

### 3.2 Cookie consent on website

**What:** GDPR requires opt-in consent for non-essential cookies. CCPA requires opt-out. Vercel Analytics is explicitly privacy-first but our analytics stack may grow.

**Options:**
1. **Status quo:** No third-party cookies currently (Vercel Analytics is first-party cookieless). Acceptable if stack doesn't expand. Document this.
2. **Cookie banner:** Install Cookiebot, Osano, or build simple consent banner. $0 free tier to $99/mo for mid-tier.
3. **Geolocate users:** Show banner only for EU/UK users. Reduces US-user friction. Requires IP-based detection (adds mild complexity).

**Recommendation:** Option 1 today, plan for Option 3 at first EU-targeted marketing push.

**Action week 2:**
1. Audit all JavaScript tags on `phyzik.app`. Confirm only first-party / essential.
2. Document stance in privacy policy: "We do not use third-party tracking cookies on this site."
3. When PostHog or attribution is installed, revisit.

### 3.3 Trademark strategy

**"PHYZIK"** as a brand name is currently unclaimed on USPTO ([ASSUMPTION — verify with a TESS search at https://www.uspto.gov/trademarks/search]).

**Actions:**
- [ ] Run a TESS search for "PHYZIK" + "PHYZICK" + "PHYSIQUE AI" in classes:
  - Class 9 (software).
  - Class 41 (fitness training services).
  - Class 25 (clothing — for merch).
- [ ] If clear, file USPTO intent-to-use applications. $250/class via TEAS Plus. DIY or through LegalZoom or attorney.
- [ ] File one-off class 9 + class 25 + class 41 = ~$750–1000.
- [ ] Also consider: EUIPO (EU trademark) if ever launching there. $1000+.

**Urgency:** Moderate. A user base > 10k creates "PHYZIK" goodwill worth protecting; a competitor could start using a similar mark once we're visible.

**Attorney involvement:** Helpful but not required for simple US TM filing. LegalZoom or Stamps can handle at $500–1000.

### 3.4 Content IP provenance

**Risk:** Using imagery or footage we don't own = DMCA takedown + potential lawsuit.

**Audit:**
- [ ] Every image on `phyzik.app`: source documented (owned, licensed from stock, CC0, or owned by ambassador with release form).
- [ ] Every image in the app: same.
- [ ] Music in any video content: licensed (Epidemic Sound, Artlist, or royalty-free with documentation).
- [ ] Team + ambassador photos: signed image release forms from each person depicted.

**Action week 2:**
1. Caleb spends 2 hours auditing all site + app imagery.
2. Gap-fill: request image releases from team + ambassadors. Simple 1-page form.
3. Replace any uncertain imagery with owned/licensed alternatives.

### 3.5 Accessibility (ADA / Section 508)

**Legal context:** US courts have held that websites and apps are "places of public accommodation" subject to ADA. Non-compliant sites have been targeted by class-action plaintiffs (thousands of cases per year, often seeking settlements in $2–10k range).

**Standard:** WCAG 2.2 Level AA.

**Minimum checks for PHYZIK:**
- [ ] Color contrast: text on background meets 4.5:1. Automated check via Axe DevTools or Lighthouse. (The #A78BFA accent on black passes; verify for other combinations.)
- [ ] Every interactive element has an accessible name (aria-label, alt text, or visible label).
- [ ] Keyboard navigation: site works without mouse. Test: Tab through the homepage, can reach every button?
- [ ] Focus visible: a visible outline on focused elements.
- [ ] Forms: labels associated with inputs, error messages announced.
- [ ] Images: alt text or `alt=""` for decorative.
- [ ] Heading hierarchy: sensible H1 → H2 → H3.
- [ ] Video (OG card video, or any video content): captions if spoken content.
- [ ] App: VoiceOver labels, Dynamic Type support (per `ui-recommendations.md` §7).

**Tooling:**
- Axe DevTools browser extension.
- Lighthouse built into Chrome.
- Manual VoiceOver test on iOS.

**Action week 2:**
1. Run Axe on homepage, community, press. Fix any "serious" or "critical" issues.
2. Add accessibility ticket to the app roadmap for VoiceOver + Dynamic Type discipline.

**Risk level:** Moderate. Mitigate by being proactively compliant; defense in depth beats responding to a lawsuit.

---

## 4. Tier 3 considerations

### 4.1 International data residency

**If we target EU users:**
- GDPR applies.
- Data processors in the EU or approved Standard Contractual Clauses (SCCs) for transfers.
- A Data Protection Officer (DPO) if we process data at "large scale" — probably not required at <500k EU users but worth tracking.

**If we target UK users:**
- UK GDPR (same rules, different regulator — ICO).

**Recommendation for first 6 weeks:** US-focused marketing. International users who self-discover are fine; we don't actively market outside US/UK for now. Revisit when we have a reason.

### 4.2 EU Digital Services Act (DSA)

Applies to "online platforms" serving EU users. Full obligations kick in for "very large" platforms (>45M EU users); limited obligations at small scale.

**What applies to us even at small scale:**
- Clear notice-and-action mechanism for illegal content.
- Transparency reports (annually, if platform hosts user content).

**Action:** Document content moderation process. Build a reporting flow in the app (user reports a post → Caleb or moderator reviews). Soft due date: before EU launch.

### 4.3 COPPA (Children Under 13)

App Store age rating is 17+ (Sophia + hypertrophy content is mature). This mostly shields us, but:
- [ ] Verify App Store age rating is set to 17+.
- [ ] If a user self-reports under 13 in any onboarding, reject them.
- [ ] Do not target or market to users under 13.
- [ ] Do not collect data from users self-identifying under 13.

### 4.4 Subscription & refund compliance (when Pro ships)

Relevant laws:
- **EU Consumer Rights Directive:** 14-day cooling-off right for digital services (though waiver is possible if user starts using before period expires).
- **California ARLA (automatic renewal law):** clear disclosure of renewal, consent required, easy cancellation required.
- **Apple's subscription requirements:** cancellation must be as easy as signup; Apple enforces via App Store.

**Action (when Pro ships):**
- Clear pre-purchase disclosure: price, renewal, cancellation instructions.
- Refund policy: at minimum, follow Apple's — first 90 days of accidental renewals typically refundable. Consider a PHYZIK policy that's more generous (e.g., 30-day no-questions-asked).
- Cancellation flow: 2 taps max to cancel.

---

## 5. LLC & corporate hygiene

### 5.1 Physique Technologies LLC

**Current state:** [ASSUMPTION] LLC is formed (referenced in press page).

**Things to verify:**
- [ ] Operating Agreement exists + reflects current ownership.
- [ ] EIN obtained, business bank account open.
- [ ] Annual state filings current.
- [ ] Registered agent current.
- [ ] Business insurance: general liability (covers basic claims), potentially cyber liability (data breach). $500–2000/yr.

### 5.2 Founder + contributor agreements

- [ ] Every founder has a founder agreement. Covers equity split, IP assignment, vesting.
- [ ] Every contractor (designer, videographer, etc.) has signed a short IP assignment — any work they do for us is ours.
- [ ] Every employee (none yet?) has an employment agreement with IP assignment.

**Risk if missing:** Major IP disputes later. A contractor who designed your logo in 2026 could claim rights in 2029 if no assignment was signed.

### 5.3 Banking + payments

- [ ] Business bank account separate from personal.
- [ ] Apple Developer account tied to LLC, not a personal account.
- [ ] Stripe account (when Pro launches) tied to LLC.

---

## 6. Specific compliance checklist — week 1

**Caleb (legal):**
- [ ] Read + update `/privacy` page.
- [ ] Read + verify `/terms` page against ToS checklist.
- [ ] Draft FTC disclosure brief (1-pager) for ambassadors + influencers.
- [ ] Schedule 2-hour attorney consult this week. Topics: ToS, privacy policy, medical disclaimer language.
- [ ] Run USPTO trademark search.
- [ ] Verify LLC has current filings + business insurance.

**Vijay (technical):**
- [ ] Verify in-app account deletion works.
- [ ] Verify every iOS permission (HealthKit, Contacts, Location, Camera) has honest NSUsageDescription.
- [ ] Verify Apple Privacy Nutrition Labels match actual data collection.
- [ ] Verify no third-party analytics or ad SDKs sending data without consent.

**Hannah / content:**
- [ ] Audit all `@phyzikapp` posts for FTC compliance. Fix gaps retroactively.
- [ ] Brief team members on disclosure requirements.

---

## 7. The attorney ask — what to discuss in 2 hours

When Caleb books that attorney consult, bring:

1. Current ToS + Privacy Policy (draft 2.0 after updates).
2. Draft FTC disclosure brief for endorsers.
3. Current + planned vendor list (for DPA questions).
4. Ambassador agreement template.
5. Question: "What's our meaningful GDPR exposure with users in EU?"
6. Question: "What specific claims in our marketing copy concern you?"
7. Question: "At what stage do we need Terms of Service in multiple languages?"
8. Question: "What's missing from our risk picture that we haven't thought of?"

Most startup attorneys will do a 1-hour call free as a get-to-know you. Use that + schedule a followup 2-hour paid session.

**Recommended attorney profiles:**
- Startup-experienced. SaaS / consumer tech background.
- Comfortable with fitness / wellness apps (medical-claim-adjacent).
- Fixed-fee or hourly up to $500. Don't use big-firm hourly at $900+ unless enterprise-level.
- Finding: Clerky's network, Stripe Atlas's partner attorneys, YC's SAFE-network lawyers.

---

## 8. The risk register

Honest assessment of where lawsuits or enforcement actions would hurt most:

| Risk | Likelihood | Severity | Mitigation status |
|---|---|---|---|
| Privacy policy misrepresentation → App Store rejection | Medium | High (launch blocked) | Fix week 1 |
| FTC action on undisclosed endorsement | Low-medium | Medium ($5-50k) | Disclosure brief + enforcement week 1 |
| User injury claim during workout | Low | High ($100k+ if ruled against) | Strong disclaimer + insurance |
| ADA class action on inaccessible site/app | Medium | Low ($2-10k settlement typical) | Proactive remediation week 2 |
| DMCA takedown of marketing asset | Low | Low (remove + replace) | Audit week 2 |
| Trademark challenge from existing holder | Low | Medium (rebrand cost) | TESS search week 1 |
| GDPR fine | Very low (US focus) | High (up to 4% revenue) | DPAs + no active EU marketing |
| Subscription auto-renewal class action (when Pro ships) | Low-medium | Medium ($50k+) | Build compliance before Pro ships |
| Unauthorized use of user likeness | Low | Medium | Image release forms |
| Health claim enforcement (FTC or FDA) | Very low at our scale | High | Careful marketing copy |

---

## 9. What to do if something breaks

- **Apple App Store rejection:** respond to the review note within 24h. Fix the issue (most rejections are specific + fixable). Re-submit. If rejection is fundamental (guideline 4.3 copycat, for example, which doesn't apply to us), escalate via App Review Board or call a lawyer.
- **DMCA notice against us:** remove the flagged content within 24h. Respond to the notice honestly. If we believe the claim is wrong, file a counter-notice (high-friction).
- **FTC warning letter:** do not ignore. Consult attorney immediately. Respond within stated timeframe. Audit and correct.
- **User data breach:** notify users per state breach laws (most states require notification within 30–60 days). Notify affected regulators (state AGs, EU authorities if relevant). Engage cyber-liability insurance.
- **Lawsuit served:** engage attorney within 48h. Do not respond to opposing counsel directly.
- **Subpoena for user data:** engage attorney. Do not comply until attorney has reviewed.

Have attorney contact on speed dial before any of these happen.

---

## 10. Caleb's first-14-days legal checklist

**Day 1–3:**
- [ ] Read `/privacy` + `/terms`. List discrepancies.
- [ ] Book attorney for 2-hour consult within 2 weeks.
- [ ] Run USPTO TESS search on "PHYZIK."

**Day 4–7:**
- [ ] Update privacy policy + terms of service. Ship.
- [ ] Verify in-app account deletion (Vijay).
- [ ] Verify Apple Privacy Nutrition Labels (Caleb in App Store Connect).
- [ ] Draft FTC disclosure brief for ambassadors. Send to existing ones.

**Day 8–14:**
- [ ] Attorney consult held. Action items documented.
- [ ] Trademark application filed (if search clear).
- [ ] DPA audit complete — vendor list + status.
- [ ] Image/IP provenance audit complete.
- [ ] Accessibility audit run. Serious/critical issues fixed.
- [ ] Founder + contractor IP assignments confirmed.

---

## 11. One-paragraph pitch for Caleb

> "Our legal exposure isn't zero — no app's is — but it's manageable if we're disciplined. Week 1: privacy policy updated, ToS verified, Apple-compliance checked, disclaimer added, FTC disclosure brief distributed. Week 2: DPAs, cookies, trademark, accessibility. Week 3: attorney consult formalizes the above and catches what we missed. Budget $2-5k for an attorney this quarter. Don't skip the attorney; a 2-hour consult now is the cheapest legal insurance we'll ever buy."

---

## 12. Coordination with other docs

- **Privacy policy updates** reference SDKs listed in `ai-tooling.md` (PostHog) and attribution stack in `app-roadmap/virality.md`.
- **FTC disclosure** references `ambassador-program.md` + `influencer-tiers.md`.
- **Medical disclaimer** references `missing-features.md` (we don't ship features making medical claims).
- **App Store compliance** references `website-changes-log.md` (which improved ASO but didn't touch app compliance).
- **Subscription compliance** (when Pro ships) references `app-roadmap/virality.md` §1.1 tier 2 rewards and `app-roadmap/missing-features.md`.

This document is not legal advice. Caleb, please have an attorney review the TOS, privacy policy, and medical disclaimer before final ship.
