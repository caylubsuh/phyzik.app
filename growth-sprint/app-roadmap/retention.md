# App Roadmap — Retention

**Audience:** Caleb + Vijay
**Purpose:** Features to implement in the PHYZIK app that turn downloads into active users. Retention is the gap between "50k downloads" and "50k users." **This document is planning only — no app code is shipped tonight.**

Grounded in WS1 competitive intel and WS2 growth case studies. Every feature annotated with: what it does, why it moves retention, complexity (S/M/L/XL), dependencies.

Complexity key:
- **S** = 1-3 days of Vijay's work
- **M** = 1-2 weeks
- **L** = 2-4 weeks
- **XL** = full month+

---

## The retention hierarchy (where to invest first)

Per the Duolingo + Strava + Zwift case studies:

1. **First-session wow** — if user quits in session 1, nothing else matters. (Day 0 retention)
2. **Week-1 habit formation** — streak mechanics + onboarding hand-holding. (D1 / D7)
3. **Social accountability** — squad density. (D14 / D30)
4. **Periodic wow-moments** — PR celebrations, monthly wrapped, featured moments. (D60+)
5. **Return triggers for lapsers** — smart push, re-engagement campaigns. (D30+ churn recovery)

**Do #1 and #2 before anything below.** Most fitness apps die at #1 and #2; the rest is lipstick without them.

---

## 1. First-session "wow" moments

### 1.1 Contextual onboarding with concierge workout selection
- **What:** Replace the "pick a program" decision with a 3-question flow: (a) What are you training for? (b) How many days/week? (c) Any equipment constraints? → Surface 1-3 pre-filled program picks with a "Start today" CTA.
- **Why retention:** Decision paralysis on a 40-program menu is a known churn point [see Hick's Law; Fitbod avoided this with AI selection]. Hevy users often stall on routine creation day one.
- **Tables touched:** `user_programs`, new `onboarding_answers` table or JSON column on `profiles`.
- **Complexity:** M (1-2 weeks, mostly UX)
- **Dependencies:** Program catalog already exists.

### 1.2 First-workout hand-holding coach-marks
- **What:** On first "Start Workout" tap, overlay 3-4 tooltip coach-marks (rest timer location, how to log a set, how to swap exercise, how to mark complete). One-time, dismissable.
- **Why:** The app has dense UI. Users who don't learn the primitive actions in session 1 don't log session 2.
- **Tables touched:** `onboarding_progress` flag on profile.
- **Complexity:** S (2-3 days)

### 1.3 First-PR celebration
- **What:** When a user logs a set that beats their all-time record (on a tracked lift), trigger a full-screen celebration moment: animated confetti, big number, share card that pre-fills for Instagram/text message.
- **Why:** Emotional peak moments drive retention in Duolingo + Zwift. A PR early in the user's PHYZIK journey is associative glue. Bonus: share card = referral vector.
- **Tables touched:** `exercise_sets`, query for `max(weight * reps)` history, new `pr_events` table.
- **Complexity:** M (1 week)
- **Dependencies:** PR detection query must be fast enough to trigger inline.

### 1.4 Day-1 value: instant analytics after first session
- **What:** Immediately after the user completes their first workout, surface a "Your first session, mapped" screen: total volume, time under tension, muscle groups hit, rest adherence, a small "next session" preview.
- **Why:** Users expect analytics to require "enough data." Showing value from session 1 reframes the app as immediately useful. Hevy and Strong both wait to show real analytics until ~3 sessions — easy win.
- **Complexity:** S-M

---

## 2. Streak + habit mechanics

### 2.1 Weekly training streak (the spine)
- **What:** A streak counter that increments each week the user hits their programmed sessions (or a configurable minimum threshold, e.g., 3+ sessions/week). Visible on home screen. Visible on their profile.
- **Why:** Duolingo's 10-day streak cut churn substantially. Lifting isn't daily (4-6x/week) so *weekly* is the natural cadence. This is the single most impactful retention feature in the entire app.
- **Tables touched:** `weekly_streaks` table (user_id, week_number, sessions_logged, streak_count), plus a background job to compute/update weekly.
- **Complexity:** M (1-2 weeks)
- **Dependencies:** Need reliable session-count-per-week aggregation.

### 2.2 Streak freeze
- **What:** Users earn "streak freezes" (1-2 per 30 days) that auto-consume if a week would break the streak. Communicated honestly: "Your streak is safe — used a freeze."
- **Why:** Pure streak systems are cruel to users with a legitimate illness/travel week. Duolingo introduced streak freezes in 2017 and saw measurable increase in continued engagement.
- **Complexity:** S on top of 2.1
- **Dependencies:** 2.1

### 2.3 PR streak (sessions with at least one PR)
- **What:** A secondary streak counter tracking consecutive sessions with at least one lift PR.
- **Why:** Separates "showed up" (session streak) from "performed" (PR streak). Motivates quality, not just consistency.
- **Complexity:** S
- **Dependencies:** PR detection (1.3)

### 2.4 Streak-saver push notification
- **What:** Smart push notification when a user is at risk of breaking streak (e.g., Saturday at 6pm if they've only logged 2 of 4 scheduled sessions).
- **Why:** Duolingo's streak-saver notification was their single biggest retention lift per Lenny's Newsletter case study.
- **Complexity:** S (pure notification + trigger logic)
- **Dependencies:** 2.1, push notification infrastructure

---

## 3. Push notification strategy (general — no copy per sprint constraints)

Triggers to implement (with suggested send windows):

| Trigger | When | Frequency cap |
|---|---|---|
| Scheduled workout reminder | 30-60 min before planned session time | 1/day max |
| Squad member logged | Real-time (debounced) | Configurable in settings |
| PR alert from someone you follow | Real-time | 3/day max |
| Weekly recap available | Sunday evening | 1/week |
| Streak at risk | When streak breakpoint approaching | 2/week max |
| Program deload week starts | Sunday before deload | 1/6 weeks |
| Squad challenge starts | Monday morning of challenge week | 1/week |
| Squad member completes challenge you're in | Real-time, capped | 1/day |
| New feature / changelog | Manually triggered | At discretion |
| Inactive re-engagement | After 7, 14, 28 days of no-session | 1/lapse-milestone |

**Compliance:** iOS requires explicit notification authorization. Prompt for this at the first meaningful value moment — NOT on app launch. Post-first-workout is the ideal prompt timing.

**Frequency guardrails:** Cap total daily notifications at 5. Users who turn off notifications are a retention dead end; conservative is better.

**[Per sprint constraints: no specific copy / voice content written here — that's handled by the content Claude project.]**

---

## 4. Return trigger mechanics (win back lapsed users)

### 4.1 Win-back email/push sequence
- **What:** At day 7, 14, 28 of inactivity, send a progressively more compelling message. Day 7: "Your squad logged X sessions this week." Day 14: "You're 3 sessions from hitting a PR on [lift]." Day 28: "We saved your program — start where you left off in 1 tap."
- **Why:** Classic lifecycle email. Drives 15-25% of "lapsed" users back in most consumer apps [ASSUMPTION — directional from Braze/Iterable benchmarks].
- **Complexity:** M (backend job + email template infra if not present)
- **Dependencies:** Email send infra (Resend, Postmark, SendGrid). Current stack unknown — may need to add.

### 4.2 "Your squad is moving without you" contextual hook
- **What:** Push notification when a specific squadmate logs a PR or hits a milestone while you've been inactive.
- **Why:** Social FOMO is the strongest return trigger. Instagram/Strava both lean hard on this.
- **Complexity:** S on top of existing squad events
- **Dependencies:** Squad event stream

### 4.3 Seasonal / challenge-based re-engagement
- **What:** Time-bounded challenges ("April Volume Month," "Push Your Pull — Bench Challenge Week of May 12") announced to all users including inactives. Scheduled events à la Zwift.
- **Why:** Users who ignore generic re-engagement respond to specific scheduled events. Scheduled events in Zwift drive 30%+ of weekly engagement.
- **Complexity:** M (challenge infrastructure + UI)
- **Dependencies:** None heavy — can be implemented as a lightweight `events` table.

---

## 5. Milestone celebrations

### 5.1 PR celebration (covered in 1.3)

### 5.2 Volume landmark achievements
- **What:** When a user crosses a meaningful volume threshold (first 10k lbs squatted in a session, first 100k lbs total weekly, first cumulative million pounds lifetime), celebrate with a full-screen moment + shareable card.
- **Why:** Lifters care about volume milestones. This is not currently a surface in PHYZIK but shows up in all competitors' analytics.
- **Complexity:** M
- **Dependencies:** Volume calculation (should exist), shareable card renderer

### 5.3 Streak breakthrough achievements
- **What:** 4-week streak, 8-week streak, 12-week streak, 26-week, 52-week — each triggers a dedicated badge and share card.
- **Why:** Duolingo's achievement system: streak tiers are among the highest-retention features [Lenny's Newsletter breakdown].
- **Complexity:** S on top of weekly streak infra

### 5.4 Year-in-review / "PHYZIK Wrapped"
- **What:** End-of-year personalized recap (total volume, top 3 lifts, PR count, squad stats, months trained). Highly shareable.
- **Why:** Strava's Year in Sport is a signature press + PR + user-delight moment. Duolingo's Year in Review drives a massive spike in reinstalls. This is a P1 for our first December (2026).
- **Complexity:** L (data aggregation + shareable visual templates)
- **Dependencies:** Enough longitudinal data (users need 4+ months of history) — P1 for Dec 2026, not now.

---

## 6. Habit formation frameworks applicable

### 6.1 Tiny Habits (BJ Fogg)
Pattern: Anchor → tiny behavior → celebration.
- PHYZIK's equivalent: "After you finish a set" (anchor) → "log it in 2 taps" (tiny behavior) → "see your rest timer fire + notification when PR hit" (celebration).
- The app already does this implicitly. Make it explicit in onboarding: "You just logged a set. That's the whole loop. Do it again tomorrow."

### 6.2 Hooked Model (Nir Eyal)
Pattern: Trigger → Action → Variable reward → Investment.
- External trigger: squad notification.
- Action: open app.
- **Variable reward:** Whose workout am I looking at? Did they PR? Did the squad leaderboard shift? This needs the feed to be *fresh* with each open.
- Investment: log your own workout → platform gets more valuable.
- **Retention implication:** The Floor feed freshness + squad event density must be high. At scale this is fine. At 50 users, it's anemic. **Action: seed the feed with team + ambassador posts daily until user count exceeds ~500.**

### 6.3 Jobs-to-be-done (Clayton Christensen)
The job PHYZIK gets hired for:
- "Tell me what to lift this Tuesday so I don't have to think about it."
- "Prove to me I'm making progress."
- "Make me feel like I belong to a crew."
- Retention fails when any one of these jobs gets done poorly.

---

## 7. Retention-killing anti-patterns (avoid)

- **Forced social at signup.** Don't force a user to join a squad on day one. Private-by-default, social-by-choice.
- **Paywall gates on core features.** We're free — continue this. Any future monetization should be non-core (cosmetics, coach tools, advanced analytics beyond the free defaults).
- **"Fill out your profile 100%" tasks.** Low-value busywork for the user. Ask only what's needed to program correctly (goal, sessions/week, equipment).
- **Empty-state screens without CTAs.** If a user has zero squadmates on their Squads tab, it shouldn't show an empty list — it should show a "How to invite your crew" action card.

---

## Priority stack (next 6 weeks)

| Priority | Feature | Size | Owner |
|---|---|---|---|
| P0 | Weekly training streak (§2.1) | M | Vijay |
| P0 | First-PR celebration + share card (§1.3) | M | Vijay + design |
| P0 | First-workout coach-marks (§1.2) | S | Vijay |
| P0 | Push notification review + streak-saver (§2.4, §3) | S | Vijay |
| P1 | Instant analytics after first session (§1.4) | S-M | Vijay |
| P1 | Contextual onboarding concierge (§1.1) | M | Vijay + Caleb |
| P1 | Streak freeze (§2.2) | S | Vijay |
| P1 | Win-back push/email sequence (§4.1) | M | Vijay |
| P2 | PR streak secondary (§2.3) | S | Vijay |
| P2 | Volume landmark achievements (§5.2) | M | Vijay + design |
| P2 | Squad-FOMO return triggers (§4.2) | S | Vijay |
| P2 | Weekly/monthly challenges infrastructure (§4.3) | M | Vijay |
| P3 | Year-in-review (§5.4) | L | Vijay + design (Dec 2026) |

P0 items alone are ~5-6 weeks of work for Vijay if he's full-time on this. Realistic if prioritized ruthlessly.
