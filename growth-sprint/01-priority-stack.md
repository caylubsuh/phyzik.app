# 01 — Priority Stack

**One action stack, ranked by impact × ease × urgency. Do them in this order.**

Each item: what it is, why it's here, who owns it, where to find the details.

---

## The top 10, ranked

### 1. Ship referral tier 1 (code + attribution + auto-friend)
**Why:** Without referral, we cap at whatever paid + press delivers. Referral is the only path with compounding returns.
**Impact:** 🔥🔥🔥🔥🔥 · **Ease:** Medium · **Urgency:** Week 1
**Owner:** Vijay
**Details:** `app-roadmap/virality.md` §1.1
**Definition of done:** A user can generate a referral code, share a `phyzik.app/i/{code}` link, have a friend install via that link, and both users are auto-friended in-app. Dashboard shows attributed referrals.

### 2. Update privacy policy + ToS, verify Apple compliance
**Why:** If App Store review flags this, 2 weeks of the sprint burn. Block-the-launch risk.
**Impact:** 🔥🔥🔥🔥 · **Ease:** Easy-medium · **Urgency:** Week 1
**Owner:** Caleb + attorney consult
**Details:** `legal-compliance.md` §2
**Definition of done:** Privacy policy reflects actual data practices. ToS reviewed. Apple Privacy Nutrition Labels match. In-app account deletion verified.

### 3. Close 4–6 Tier A ambassadors (founding athletes)
**Why:** Ambassadors anchor trust for press, influencer outreach, and Floor content. Need them recruited before Product Hunt.
**Impact:** 🔥🔥🔥🔥 · **Ease:** Medium-hard · **Urgency:** Weeks 1–3
**Owner:** Caleb + Sophia
**Details:** `marketing/ambassador-program.md`
**Definition of done:** 4+ ambassadors signed, logging on PHYZIK, featured on `/community`.

### 4. Ship workout share card auto-prompt + QR + attribution
**Why:** Converts every session into a potential install. Highest-leverage content loop.
**Impact:** 🔥🔥🔥🔥🔥 · **Ease:** Medium · **Urgency:** Weeks 1–2
**Owner:** Vijay
**Details:** `app-roadmap/virality.md` §2.1
**Definition of done:** Post-workout prompt → card → IG Story / iMessage with sticker + QR. Attribution traces back to referrer.

### 5. Product Hunt launch — book hunter + prep assets (week 4 target)
**Why:** The concentrated moment. Day-of 5k–20k install potential. Content asset for weeks after.
**Impact:** 🔥🔥🔥🔥 · **Ease:** Medium · **Urgency:** Weeks 1–3 prep
**Owner:** Caleb
**Details:** `marketing/press-pr.md` §5
**Definition of done:** Hunter confirmed, thumbnail + gallery ready, launch email list primed, first-comment drafted.

### 6. Install PostHog analytics + define activation funnel
**Why:** Without measurement, we're gambling. Must know k-factor, activation, retention by week 4.
**Impact:** 🔥🔥🔥🔥 · **Ease:** Easy · **Urgency:** Weeks 1–2
**Owner:** Vijay
**Details:** `ai-tooling.md` §2.6 + `app-roadmap/retention.md`
**Definition of done:** 6 core events firing (onboarding_started, onboarding_completed, first_workout_started, first_workout_completed, session_logged, share_card_shared). Funnel + cohort dashboards live.

### 7. Ship program builder MVP + 3 program templates
**Why:** Without programs, PHYZIK is a logger. Programming depth is the stated differentiator vs. Hevy/Strong. Gym partnerships depend on this.
**Impact:** 🔥🔥🔥🔥 · **Ease:** Hard · **Urgency:** Weeks 2–4
**Owner:** Vijay + Sophia (content)
**Details:** `app-roadmap/missing-features.md` §3.1
**Definition of done:** User can pick from 3+ templates, follow a multi-week program, see auto-progressive weights/reps session to session.

### 8. Outreach to 20 target journalists across 3 tracks
**Why:** Press is slow; start early. Niche fitness + tech + founder-story.
**Impact:** 🔥🔥🔥 · **Ease:** Medium · **Urgency:** Weeks 1–2
**Owner:** Caleb
**Details:** `marketing/press-pr.md` §3–4
**Definition of done:** 20 pitches sent, tracked, followed-up once. Target: 3–5 pieces published by week 6.

### 9. Ship 10 Tier 3 micro-influencer campaigns (seed wave)
**Why:** Tier 3 delivers best CAC. Seed measures which niches convert.
**Impact:** 🔥🔥🔥 · **Ease:** Medium · **Urgency:** Weeks 2–3
**Owner:** Caleb
**Details:** `marketing/influencer-tiers.md` §6.1
**Definition of done:** 10 Tier 3 activations live, each with custom referral code + attribution. CAC measured per campaign.

### 10. Close first 3 partner gyms (Model 1 + Model 2 mix)
**Why:** Local network effects seed long-term moat. Starts now, pays off month 3+.
**Impact:** 🔥🔥 · **Ease:** Medium-hard · **Urgency:** Weeks 2–5
**Owner:** Caleb + Sophia + Tenkara (relationships)
**Details:** `marketing/gym-partnerships.md`
**Definition of done:** 3 gyms signed. 1 framed certificate shipped. First in-gym meetup booked.

---

## Things to explicitly deprioritize

These look tempting but shouldn't get sprint time:

- **AI-generated coaching or chat features.** Commodity; dilutes positioning. See `app-roadmap/missing-features.md` §4.1.
- **Global leaderboards.** Moderation cost exceeds retention benefit at this stage. See `app-roadmap/virality.md` §7.
- **Paid ads at scale.** Attribution isn't wired; learning phase expensive. Revisit week 4 after attribution + measurement live.
- **Apple Watch companion app.** 3+ weeks of work, small user base impacted. Push to Q3.
- **Real-time DMs.** Weeks of work, huge moderation liability. Squad reactions cover 80% of social need. Push to post-30k users.
- **Full EU/UK localization.** Launch US-focused. International users who find us are fine; active international marketing = full GDPR stack. Revisit once US baseline is solid.
- **Global leaderboards, meal planning, AI-generated programs.** All mentioned in `app-roadmap/missing-features.md` §4 — explicit skips.

---

## The weekly execution cadence

**Monday AM:** Caleb + Vijay 30-min sync. Review priorities. One P0 per person for the week.

**Daily 10-min standup (async in Slack/Discord):** Yesterday's win, today's focus, what's blocked.

**Friday PM:** Measurement review. Actual numbers on the week's KPIs. Honest read. Adjust next week.

**Saturday:** rest.

---

## The one-number-per-week KPI

Track all of these weekly, but each week, there's **one number that matters most.**

| Week | The number that matters | Target |
|---|---|---|
| 1 | Referral infra live + 1 test referral converts end-to-end | yes/no |
| 2 | Share cards shipping · activation rate (install → first workout) | >40% |
| 3 | Ambassadors active · content published per ambassador | 3+ ambassadors w/ content |
| 4 | K-factor from Product Hunt week | >0.3 |
| 5 | Week-4 retention of week-1 cohort | >35% |
| 6 | Total active users + k-factor trend | honestly assessed |

If the Friday number misses target, the following week's P0 is "diagnose + fix that number."

---

## The 5-minute reprioritization rule

If something big changes mid-sprint (viral moment, Apple rejection, bug spike, press breakthrough), Caleb spends 5 minutes re-ranking this list — NOT rewriting it. The items stay; the order shifts. Example: if Apple rejects the app on week 3, items 1-10 freeze; top priority becomes "un-reject." Other lanes pause.

Don't rewrite the stack. Re-order it.

---

## Ownership summary

| Owner | Primary items |
|---|---|
| Caleb | #2 (legal), #3 (ambassadors — with Sophia), #5 (Product Hunt), #8 (press), #9 (influencers), #10 (gyms) |
| Vijay | #1 (referral), #4 (share card), #6 (analytics), #7 (program builder) |
| Sophia | #3 (ambassador sourcing), #7 (program content), #10 (gym relationships) |
| Hannah | Content execution across the above |
| Tenkara | #3 (founding athlete), #10 (her gym as first partner) |

---

## What I'd check in with Caleb on

Before sprint start, Caleb confirms / edits:
- [ ] This order is right. (Or: "No, I disagree with X ranking because Y.")
- [ ] The deprioritizations are right.
- [ ] Nobody is over-loaded — redistribute if they are.
- [ ] Legal attorney consult is scheduled for week 1 or 2.

---

## The honest framing

Hitting #1 and #6 in week 1 is the sprint-winning move. Referral infrastructure + measurement are the two things that make every other action in this stack *leverage*. Without them, we're doing marketing blind.

Hitting #1–#5 in the first 3 weeks is a strong sprint.

Hitting #1–#10 in 6 weeks would require 2 engineers + Caleb full-time + Sophia full-time. If that resourcing isn't real, cut items 7–10 to "best-effort" and protect 1–6.

**The single most important thing:** don't burn out. A rested team in week 6 outperforms an exhausted team in week 3. Real rest isn't optional; it's sprint hygiene.
