# Marketing — Referral Program

**Owner:** Caleb (program design), Vijay (implementation per `app-roadmap/virality.md` §1).
**Budget estimate:** $0 initially (status rewards), +$2–5k for merch tier when we cross 2k users.
**Grounded in:** `research/growth-case-studies.md` §Dropbox §Whoop §BeReal §Cal AI, `app-roadmap/virality.md` §1.

This doc covers the **program design, economics, communication, and measurement** of referrals — not the engineering (that's in `virality.md` §1).

---

## 1. Why referral is the single highest-leverage program

From the case studies (`growth-case-studies.md`):
- **Dropbox** hit 4M users in 15 months primarily through 2-sided storage referral.
- **Whoop** in 2018–2019 ran "gift a band" promos that drove ~30% of new signups.
- **BeReal** had no paid marketing through 200M users; k-factor was >1.5 at peak. Status + mystery drove it.
- **Cal AI** rode "share to unlock" — coercive, but worked for a specific UX.

The common thread: **apps that crossed 100k users without paid acquisition did so with a referral loop.** Every single one. Our goal is 50k in six weeks on a zero-to-low paid budget. Referral is not optional.

---

## 2. Program architecture

### 2.1 The two-tier structure

**Tier 1 — Always on, no reward:**
- Every user has a referral code generated at signup.
- Link format: `phyzik.app/i/{code}`.
- Shareable via the app's share sheet (iMessage, Instagram Story, copy link).
- When a referral installs + completes a workout, both users become "friends" on PHYZIK automatically.
- Referrer receives a push: "Sarah joined PHYZIK via you."

**Tier 2 — Thresholded rewards:**

| Referrals | Reward | Cost to us | Why |
|---|---|---|---|
| 1 | Auto-connect ("friend" with your referral) | $0 | Social reward, not status |
| 3 | **Founding Member badge** on Floor posts + profile | $0 | Pure status. Scarcity matters — only available in the first 90 days post-launch. |
| 5 | **1 month Pro** (when Pro launches) OR "Founder Plus" profile frame | $0 | Functional reward once Pro exists; status reward until then. |
| 10 | **PHYZIK hoodie** (first 500 users only) | ~$35 each × 500 = $17,500 | Physical moment. Social media gold. |
| 25 | **PHYZIK Founding Member listed on website** (opt-in) | $0 | Named recognition. Permanent. |
| 50 | **Lifetime Pro** + direct line to Caleb on Discord | $0 | Top 1% evangelism. |

**Why this structure:**
- Status rewards (badges, frames, named recognition) are free and **persistent** — they keep paying off socially every time the user posts.
- Merch at 10 is a bar that's aspirational but hittable. 10 × 10% conversion = 100 personal invitations. For an ambassador or influencer, trivial.
- The 500-hoodie cap creates scarcity. If we blow past 500 users at tier 3, that's a $50k+ merch bill; the cap makes it budgetable.
- Lifetime Pro at 50 is cheap (zero marginal cost on digital) and creates a reliable evangelist pool.

### 2.2 What we are NOT doing

**No cash rewards.** Attracts affiliate-spam behavior. Breaks trust with the brand.
**No "you'll get $X if you sign up."** Distorts the signal — users who joined for cash are the worst retention cohort. See `growth-case-studies.md` § "plays that don't transfer."
**No "free month if you invite a friend" with pressure framing.** Healthy referrals happen when the user is proud of the app. Unhealthy ones happen when they're hostage-taken into sharing.

### 2.3 Rules

- **Referral counts on confirmed retention**, not install. A referral counts when the new user completes their **first workout** (not just opens the app). Prevents install-spam.
- **Cap daily invite sends at 10 per user.** Server-enforced. Protects users from spam-reporting their own accounts on iMessage and protects us from App Store review risk.
- **Self-referral prevention.** Same device ID, same phone number, same Apple ID via App Store — all blocked. Low-effort spam filter.
- **No referral "expiry."** A code works forever. Don't create artificial urgency; it feels cheap.
- **The 500-hoodie cap is enforced at reward redemption**, not at qualifier. A user hitting 10 referrals gets a clear message: "You hit 10! Claim your hoodie (434 of 500 remaining)." Transparent scarcity.

---

## 3. Launch sequencing

### Phase 0: week 0 (before launch)

- Referral infrastructure built (tier 1, per `virality.md` §1.1).
- The first 50 users (team + closest friends + early ambassadors) have personal codes assigned in advance.
- Landing pages for referred users are built (every `phyzik.app/i/{code}` resolves to a personalized landing page: "Your friend Caleb thinks you'd like PHYZIK" + their workout history preview if they opted in).

### Phase 1: week 1–2 (soft launch)

- **Tier 1 active from day 1.** Everyone who signs up has a code.
- **Tier 2 disabled.** Don't promise the Founding Member badge until we're confident we can support a surge.
- **Seed the loop:** the initial 50 users (team, friends, first ambassadors) each get a personal prompt from Caleb: "Invite 3 people this week. Here's why you'd want to."

### Phase 2: week 3 (Founding Member badge ships)

- **Tier 2 opens with the badge only.** No merch yet. No Pro yet.
- **Announce:** A Floor post from @phyzikapp. A single Instagram post. An email to current users ("Because you joined early, you're eligible for the Founding Member badge. Here's how.").
- **Watch conversion:** referrals sent per user. If <5% of WAUs are sending any invites, the friction's too high — debug.

### Phase 3: week 4–5 (merch tier + Pro tier)

- Merch tier opens when ≥500 users have hit the 3-referral milestone (so we know the population exists). Before that, the 10-tier shows as "unlocking soon" — known-in-advance, transparent.
- Pro launches or the "Founder Plus" frame replaces it.

### Phase 4: week 6+ (ongoing)

- Surface referral state in the app: "You've invited 4 friends · 2 joined · Founding Member unlocked."
- Permanent spot in the profile screen with clear next-tier milestone.
- Quarterly "Founding Member" cohort announcement on Instagram.

---

## 4. Communication — what to say, where

### 4.1 In-app

**Primary surface:** Profile screen — a persistent card showing invite count, joined count, next tier progress.

**Secondary surfaces:**
- After a user completes a PR: small dismissible tooltip — "Share this with a friend? They get PHYZIK free; you get a Founding Member badge at 3."
- After a user's 4-week streak: dedicated moment — "You've stuck with this. Who else would?"
- Post-session share card includes the referral link by default.

**Avoid:**
- Interstitial full-screen "INVITE NOW" prompts on app open.
- Red-dot badging on the profile tab for unread referral stats.
- Countdown timers or loss-aversion framing.

### 4.2 In email (if we build a list)

Referral mention in:
- Welcome email day 1 (1 sentence, linked): "When you're feeling it, bring a friend — they get PHYZIK, you get the Founding Member badge at 3 referrals."
- Weekly recap email (post-week 4): referral state + nearest-tier progress.
- Month 1 email: "You hit month 1. Three referrals = Founding Member. Here's your link."

**Avoid:**
- Dedicated "REFERRAL PROGRAM!" emails. Cheapens the brand.
- Daily or weekly referral nagging.

### 4.3 On the marketing site

- A section on `/community` or a new `/founders` page: "Founding members get a permanent badge in the app — details in the app." Avoid putting the full mechanics on the site; keeps the app the primary surface.

### 4.4 In user-generated content

The workout share card (per `virality.md` §2.1) includes a small QR or handle + referral link. Every Floor share → Instagram Story is an unattributed-to-attributed conversion event. This is the largest referral surface by volume.

---

## 5. Targeted referral prompts (where to ask)

Some moments are higher-conversion than others. Prompts should only appear at:

1. **Post-PR.** User's emotional state is positive; share likelihood spikes.
2. **Post-streak-milestone.** The commitment has been earned; the ask has credibility.
3. **Post-squad-creation with <3 members.** The user is actively trying to bring people in; we support.
4. **After a high-volume week.** Weekly Wrapped share flow naturally carries the referral.

Moments to **not** ask:
- After a missed workout.
- After a failed set.
- During a session (obviously).
- In the first 48 hours after install — too early for credible advocacy.

---

## 6. The "ambassador multiplier"

Per `ambassador-program.md` (forthcoming), ambassadors get higher-tier referral rewards baked into their agreement:

- **Tier A ambassadors** (10k+ IG following, per `influencer-tiers.md`): a custom landing page at `phyzik.app/i/sophia`, personalized. 1-tap invite flow from their social platform. Revenue share on Pro conversions (when Pro exists).
- **Tier B ambassadors** (1k–10k): Founding Member badge immediately, merch at 5 referrals not 10.
- **Tier C community ambassadors** (<1k, brand-aligned): Standard referral tiers + monthly shoutout in the official @phyzikapp feed.

The program is the same mechanic; ambassadors get a head start + visibility.

---

## 7. Measurement

### 7.1 Core metrics

| Metric | Target by week 2 | Target by week 4 | Target by week 6 |
|---|---|---|---|
| % of WAU that sent ≥1 invite this week | 5% | 10% | 15% |
| Invites sent per sender (median) | 2 | 3 | 3 |
| Install rate per invite sent | 15% | 20% | 25% |
| Completed-workout rate of referred installs | 35% | 45% | 50% |
| **K-factor (referrals × conversion)** | 0.15 | 0.35 | 0.55 |
| % of total new users via referral | 20% | 40% | 55% |

**Honest baseline:** nobody knows our k-factor will hit 0.55 by week 6. It might. It might not. The discipline is measuring it weekly and adjusting. If we're at 0.15 in week 4, the program design is wrong and we change the levers (bigger incentive, easier friction, or prompt timing).

### 7.2 Dashboard to build

Vijay or a contracted data person should wire a simple dashboard:
- Daily: invites sent, installs via invite, completed-first-workout via invite.
- Weekly: k-factor, tier-distribution (how many users at each tier).
- Per-user: referral leaderboard (who's bringing who — ambassador identification pipeline).

Tools: Supabase queries → Metabase or a quick Notion-embed dashboard. Don't over-engineer; look at the numbers once a day.

### 7.3 When to kill the program / pivot

- If week 4 k-factor is <0.1: the incentive or friction is broken. Don't blame the users; diagnose the funnel.
- If tier 2 merch redemptions exceed budget: pause, communicate transparently, re-release with a higher cap or longer timeline.
- If referrals are driving low-retention cohorts (joined + churned in 7 days at higher rates than organic): the messaging is attracting the wrong users. Tighten the ask.

---

## 8. Risks

1. **Spam risk.** Users abusing the contact-import flow hurt us. Mitigate: cap daily sends, server-enforced. Monitor spam-report rates via Apple.
2. **Reward economics blowout.** If hoodies go faster than expected. Mitigate: transparent scarcity cap (500), pre-paid merch budget, public-facing "only 482 left."
3. **Brand dilution.** "Refer a friend" energy looks MLM-ish if we're not careful. Mitigate: refuse cash incentives; lead with status, not money; keep the language in the brand voice (not bro-y, not mercenary).
4. **Churn-via-referral.** Referrals with weak retention = bad signal. Mitigate: count only on first-workout completion, not install. Adjust messaging if referrals are arriving with wrong expectations.
5. **App Store Guideline risk.** Apple disallows some incentive structures (spam-flavored). Mitigate: don't gate any core functionality behind referrals. Rewards are additive, not subtractive.

---

## 9. Tasks for Caleb, ordered

**Week 1:**
- [ ] Approve tier structure above (or edit).
- [ ] Finalize merch vendor (Printful / Everpress / custom). Get price + lead time.
- [ ] Have Vijay estimate referral tier 1 eng weeks. Adjust sprint plan.
- [ ] Decide Founding Member badge visual design (collaborate with whoever does design).
- [ ] Seed the first 50 users (team + closest friends) — have their codes in hand before launch.

**Week 2:**
- [ ] Validate tier 1 is shipping. QA the invite → install → auto-friend flow end-to-end.
- [ ] Draft welcome-email language for referral section.
- [ ] Build the dashboard. Decide who looks at it daily (Caleb alone is fine for weeks 1–4).

**Week 3:**
- [ ] Ship tier 2 badge.
- [ ] Announce via Instagram + email.
- [ ] Measure first-week conversion.

**Week 4:**
- [ ] Decide on merch tier launch.
- [ ] Decide on ambassador-tier-specific program (coordinate with `ambassador-program.md`).

**Week 5–6:**
- [ ] Measure, iterate, either amplify or diagnose.

---

## 10. One-paragraph pitch for Caleb to use internally

> "We're building a referral system with one goal: give users a reason to be proud of introducing PHYZIK, and make the friction to do it as close to zero as possible. We're not paying people to invite friends — we're recognizing the people who believe in this early with a permanent mark on the app. Tier 1 is one tap, works from day one. Tier 2 gives a badge at 3 referrals and a hoodie at 10. Beyond that, the top 1% of referrers get lifetime Pro and their name on the founders page. It costs us almost nothing and it's how apps scale past 50k without paid marketing."

That's the frame. Everything else downstream supports it.
