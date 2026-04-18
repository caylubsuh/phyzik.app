# App Roadmap — Missing Features

**Owner:** Vijay (CTO) in consultation with Caleb (product) + Sophia (programming).
**Grounded in:** `research/competitors.md` (all 11 teardowns), `research/growth-case-studies.md` §Hevy §Strong §MacroFactor §Whoop.
**Scope:** Features competitors have that PHYZIK does not. Gaps where a user evaluating PHYZIK vs. Hevy/Strong/Fitbod says "it's missing X, I'll go back."

This doc is opinionated about **what to build vs. what to skip**. Shipping every competitor feature is the fastest way to ship a worse, more bloated competitor. PHYZIK's edge is the social layer + honest programming — features that protect that edge are P0; features that don't are P3 or never.

---

## 1. Table-stakes gaps (must ship to not lose users on comparison)

### 1.1 Exercise library depth

**What's missing:** An actual searchable exercise library with:
- Every common lift (squat, bench, deadlift, row, press variations, ~300 core exercises).
- Video demo per exercise (10–15s, silent, correct form).
- Primary + secondary muscle tags.
- Equipment filter (barbell, dumbbell, cable, machine, bodyweight).
- Substitution suggestions when an exercise isn't available.

**Why:** Hevy ships with 400+, Strong with 350+, Fitbod with 500+ auto-suggested. If a user searches "incline DB press" and doesn't find it, they conclude the app is immature and bounce. Unfixable churn reason.

**Complexity:** Medium-high. Not the code — the content. 300 × 15s videos = ~75 minutes of production. Can be shot in 2 days at a single gym with clear lighting. Sophia or a contractor could own. Alternative: license from a stock library (Exrx, StrengthLog's library, etc.) — verify licensing before shipping.

**Priority:** P0 (week 1–2). The social layer doesn't matter if users leave on first search.

**Touches:** Exercise data schema, search UI, media storage (CDN — video files), exercise picker across all workout flows.

---

### 1.2 Plate math / warmup calculator

**What's missing:** Given a target working set weight, tell the user how to load the bar and what warmup sets to do.

- Plate breakdown: "315lbs = 45 bar + 2×45 + 1×25 + 2×10" per side.
- Warmup suggestions: "Warmup: 135×5, 185×3, 225×2, 275×1, 315 working sets" — based on Prilepin chart or similar.
- Metric/imperial toggle.
- Plate inventory config (user tells the app what plates their gym has).

**Why:** Every serious lifter loads a bar. Every serious lifter has done mental arithmetic mid-warmup. Every competitor has this: Hevy has plate math, Fitbod has warmups, RP has both. Absence = rookie tell.

**Complexity:** Low. ~2 days for an engineer. The math is trivial; the UI is a small card on the set screen.

**Priority:** P0 (week 1).

**Touches:** Set logging UI, new plate-math utility module, user settings (unit preference + plate inventory).

---

### 1.3 Apple Health sync (read + write)

**What's missing:** Apple Health integration to both pull (bodyweight, sleep, HRV if available) and push (workout sessions, active calories).

**Why:** Every iOS user has a Health app. Apps that don't sync feel isolated. Strava pulls runs; Whoop pushes recovery; MyFitnessPal syncs weight. PHYZIK syncing sessions makes it feel native, and pulling bodyweight means users don't have to double-log.

The bigger reason: when a user's sessions land in Apple Health, the Activity rings close differently, and that creates a second habit anchor outside our app. That's a retention lift, not just hygiene.

**Complexity:** Medium. HealthKit has quirks — permissions prompts, background delivery, workout type mapping (strength training vs. functional training). ~1 week for a competent iOS engineer.

**Priority:** P0 (week 2).

**Touches:** iOS HealthKit setup, session finish hook, bodyweight import on first open, privacy policy addendum.

---

### 1.4 Import from other apps

**What's missing:** A flow for users coming from Hevy / Strong / Excel to bring their history over.

- CSV importer (Hevy/Strong both export to CSV).
- Map rows to exercises automatically (fuzzy match + manual override for unknown names).
- Preserve set/rep/weight/date.
- Import can happen from onboarding or settings later.

**Why:** A Hevy user with 18 months of training history will not switch apps to "start from zero." Their PR graph, their volume history, their Floor — all empty. Hevy knows this and uses it as a retention moat; we break the moat by making import frictionless.

**Complexity:** Medium-high. CSV parsing is trivial; name-matching is the hard part. Ship with a good-enough fuzzy matcher + "something didn't match — review these 14 exercises" screen.

**Priority:** P1 (week 3). Not P0 only because the first 5k users are greenfield — they don't have history to import. But anyone coming off Hevy or Strong (which is most of the ambassador/influencer traffic in WS6) will need this fast.

**Touches:** New import flow in settings, CSV parser, exercise name matching service, bulk-insert to session history.

---

### 1.5 Offline mode

**What's missing:** The app should log sessions offline and sync when the user gets back online. Basement gyms, commercial gym WiFi deadzones, international roaming users — any of these kills a session if the app requires live connectivity.

**Why:** Universal dealbreaker. Strong and Hevy both handle this. An app that loses a set to bad WiFi doesn't get a second chance.

**Complexity:** Medium. Requires local-first session state + conflict resolution on sync. ~1–1.5 weeks depending on current architecture. If the app is already cloud-first, this is non-trivial.

**Priority:** P0 (week 2) — this is a trust feature, not a nice-to-have.

**Touches:** Session state management, local storage layer, sync queue, conflict resolution logic.

---

### 1.6 Widgets + Live Activities

**What's missing:**
- **iOS widget:** "Next session: Pull A — starts in the app" on the home screen.
- **Live Activity:** During a session, the current exercise + rest timer show on the Lock Screen and Dynamic Island.
- **Apple Watch companion:** log sets from the wrist (optional, but table stakes for lifters at the rack).

**Why:** Widgets and Live Activities are the new app install surface on iOS 17+. A workout app without them feels like a 2019 app. And the Apple Watch companion is where serious users (the ambassador tier we recruit) spend sessions.

**Complexity:** Medium-high.
- Widget: ~3 days.
- Live Activity: ~1 week (includes the Dynamic Island iteration).
- Apple Watch app: ~3 weeks minimum. Not feasible in 6 weeks without dedicated resource.

**Priority:**
- Widget: P1 (week 4).
- Live Activity: P1 (week 5).
- Apple Watch: P2 (post-6-week).

**Touches:** New iOS widget extension, Live Activity framework, ActivityKit. Watch app would be a new target entirely.

---

## 2. Social layer gaps (must ship to deliver the core promise)

### 2.1 In-app DM / direct message

**What's missing:** Users can't message each other privately. Squad interactions are public-to-squad; there's no 1:1 channel.

**Why:** If two squadmates want to discuss a program, they leave for iMessage. Leaving the app = weaker network effect. Strava has no DM and it hurts them. Every platform that kept users on-platform (Whoop, Discord, any social fitness app that scaled) built DMs.

**Complexity:** High. Real-time chat is deceptively hard — delivery receipts, typing, push notifications, moderation, abuse reporting. Honest estimate: 3–4 weeks, maybe more including moderation tools.

**Priority:** P1 or P2 — not this sprint. The squad Floor + reactions (per `virality.md` §3.2) covers 80% of the social density need without the DM cost. Revisit after 25k users.

**Touches:** New messaging schema, real-time infra (Supabase Realtime or Ably), moderation tooling, push handling, notification throttling.

**Recommendation:** Defer. Ship squad reactions first; measure whether users are asking for DMs or happy with public-to-squad.

---

### 2.2 Profile depth

**What's missing:** Profiles probably show a username, some PRs, session count. Missing:

- **Top 5 lifts section.** Back squat / bench / deadlift / OHP / row — prominent on the profile. Mini leaderboard vs. your friends on each.
- **Training block indicator.** "Currently: Week 3 of 8, Hypertrophy block." Others know what you're in the middle of.
- **Goal line.** One-sentence user-written goal. Short. Editable.
- **Verified athlete badge.** For the ambassador tier — accent-colored checkmark.
- **Follower/following counts + lists** (with public/private toggle).

**Why:** Profile is the single place a new visitor (from a shared Story, a Floor post, an invite link) lands. If it looks thin, the signup rate tanks. Instagram-grade profile pages are the minimum bar.

**Complexity:** Medium. ~1.5 weeks for UI + data plumbing.

**Priority:** P1 (week 3–4).

**Touches:** Profile screen redesign, new data fields on user model, follower graph query, verified-badge admin tool.

---

### 2.3 Gym clustering / "who's at your gym"

**What's missing:** Users can't see who else at their gym is on PHYZIK. Manual gym attribution (user picks their gym from a list or types it) + surface nearby lifters.

**Why:** Network effects in fitness apps cluster locally before globally. A user in Austin sees 40 Austinites training on PHYZIK and concludes "this is the Austin lifter app." That's defensible. Without gym clustering, the app feels diffuse.

**Complexity:** Medium. Gym selection UI is easy; getting a clean gym list (vs. "my friend's garage" free-text) requires either a curated list or Google Places API. Google Places ~$17/1k requests — budget-sized.

**Priority:** P1 (week 4–5).

**Touches:** Gym data model, new profile field, community discovery screen, maybe Places API integration.

---

### 2.4 Follow/friend model clarity

**What's missing:** It's unclear whether PHYZIK has a follow model (Twitter-style, asymmetric) or a friend model (Facebook-style, mutual). Each has consequences.

- **Follow model:** Scales better for public content (creators). Users can follow Sophia, Tenkara, any ambassador. No friction. But it creates celebrity dynamics and makes squad creation feel separate from "social."
- **Friend model:** Tighter trust, better for accountability, but has a friction cost (every connection requires approval) that throttles the content loop.

**Why:** Strava has both (friends = 2-way, follows on creator accounts = 1-way). Hevy has a friends-only model. The right choice depends on whether PHYZIK leans "training log with friends" or "fitness social network." Caleb's brand voice leans the latter.

**Recommendation:** Asymmetric follow by default, with a "squad = mutual" inside that. Creator accounts (ambassadors) are followable publicly. Regular users can toggle profile to private → follow-requests-only. This is Strava's model and it scales.

**Complexity:** Depends on current architecture. If it's already friend-only, unwinding is ~2 weeks. If it's greenfield, ~1 week.

**Priority:** P0 decision (week 1) — the choice blocks §2.2 and everything after.

---

## 3. Programming depth gaps (must ship to match RP / MacroFactor tier)

### 3.1 Mesocycle / program builder

**What's missing:** A way for a user to follow a multi-week program with automated progression. Currently, users are probably logging individual sessions.

Needed:
- Program templates (5/3/1, PHUL, PPL 6-day, RP hypertrophy, Hyrox 16-week).
- Auto-progression: next session's weights/reps computed from last session's performance.
- Deload week auto-insertion based on recovery signals (RPE, bar speed if we had it — failing that, user-reported readiness).
- Program duration visibility: "Week 3 of 8."

**Why:** RP Hypertrophy and MacroFactor win on the "science-backed programming" angle. `research/competitors.md` §RP flagged this as their moat. Without a program builder, PHYZIK is a logger, not a coach. The brand voice is "evidence-based coaching in your pocket" — the product has to deliver.

**Complexity:** High. This is a real product in itself. 4–6 weeks to ship well. Can ship MVP in 2–3 weeks with 3–5 program templates and simple rep-based progression.

**Priority:** P0 (MVP in weeks 2–4). The best in-app purchase hook later (Pro = more programs, custom program builder).

**Touches:** New program data model, progression engine, session seeding from program, deload logic, program picker UI.

---

### 3.2 Proximity to failure / RPE tagging

**What's missing:** Tagging each set with RPE (rate of perceived exertion, 1–10) or reps-in-reserve (RIR, 0–4). The data drives auto-progression and deload triggers.

**Why:** Every serious hypertrophy app has this. It's free signal that unlocks personalized progression. The UX cost is low (one tap after a set); the coaching-quality lift is large.

**Complexity:** Low-medium. UI is a 1-tap slider. Backend needs to store + use the data in the progression engine (§3.1).

**Priority:** P1 (week 3). Ship alongside the program builder MVP.

**Touches:** Set logger, progression engine.

---

### 3.3 Nutrition / bodyweight tracking (lightweight)

**What's missing:** Not a full food logger — MyFitnessPal owns that. But lightweight bodyweight tracking + optional protein target tracking.

- Daily bodyweight entry (1 tap, reads from Apple Health if §1.3 is live).
- Weekly average vs. trend (the Hacker's Diet / MacroFactor approach: smooth the noise).
- Optional protein target with 1-tap logging per meal.

**Why:** Lifters who want to get stronger/bigger/leaner all care about bodyweight trajectory. A 30-second bodyweight check on the app creates a daily touch independent of training days. And the protein integration is a cheap moat — MacroFactor's trend-weight algorithm is ~200 lines of code and it's one of their most praised features.

**Complexity:** Low-medium. Trend-weight algorithm is well-documented (Hacker's Diet EMA). 1 week for an engineer.

**Priority:** P2 (week 5–6). Nice-to-have; not the social/program-builder core.

**Touches:** New bodyweight data model, trend calculation service, bodyweight entry UI, settings.

---

## 4. Gaps I'd SKIP (what PHYZIK doesn't need)

Shipping these would bloat the app and dilute the position. Listed so Caleb can explicitly say "no."

### 4.1 AI-generated programs (skip for now)

Why skip: Every fitness app shipped "AI programs" in 2024. Most are GPT-wrapper garbage. PHYZIK's edge is *human* programming quality (Sophia) + evidence base. An AI program feature undermines that positioning and becomes a race-to-the-bottom with Fitbod's AI + MacroFactor's AI + the 50 new launches.

Revisit when: we have enough user training data to train something that's actually ours, not a prompt over GPT-4.

### 4.2 Meal planning (skip)

Why skip: Nutrition apps are a different business. MyFitnessPal, Cronometer, MacroFactor, Lose It all exist. Building meal planning means becoming a distant #5 in a category that's not ours. The lightweight bodyweight + protein tracking (§3.3) is the correct scope.

### 4.3 Heart rate / cardio tracking depth (skip)

Why skip: Strava and Whoop own this. PHYZIK's cardio story is "we log runs and rows within a session" — not "we are your cardio coach." Doing cardio coaching forces us to compete with Strava's 100M-user graph. Don't.

### 4.4 Live video classes (skip)

Why skip: Peloton money. Hardware-like economics. Don't touch.

### 4.5 Equipment marketplace / shop (skip until scale)

Why skip: Adds revenue but dilutes the app. Becomes a reason to mistrust the programming ("are they recommending this because it's right or because they sell it?"). Revisit at 500k users.

### 4.6 Chat with AI coach (skip)

Why skip: Same reason as §4.1 — commodity in 2026. The human coach voice (Sophia's programming, the ambassador tier) is the asset. AI dilutes it.

---

## 5. Quick wins Caleb can push on immediately (<1 week each)

| Feature | Eng time | Impact | Priority |
|---|---|---|---|
| Plate math / warmup calc | 2 days | Makes app feel serious | P0 |
| Default rest timer between sets | 1 day | Retention during sessions | P0 |
| "Copy yesterday's workout" | 0.5 day | Huge UX win for repeat sessions | P0 |
| Session notes / mood tag | 1 day | Floor content richness | P1 |
| PR detection on set log | 1 day | Supply for §PR celebration | P0 (dep for virality §2.2) |
| Unit toggle (kg/lb) in settings | 0.5 day | International users | P0 |
| Weekly volume chart per muscle group | 2 days | Coaching feel | P1 |
| Share squad invite via iMessage | 1 day | Squad loop (dep for virality §3.1) | P0 |
| Exercise history graph (per exercise, all time) | 2 days | Retention surface | P1 |
| Push notification consent on day 2 not day 1 | 0.5 day | +15% permission rate — see `retention.md` | P0 |

These are high-leverage, low-effort. The first three (plate math, rest timer, copy yesterday's workout) would land in the bottom 10% of engineering cost and the top 10% of "feels like a real app" perception.

---

## 6. Priority stack for 6 weeks

**Week 1 (foundation):**
- Follow-vs-friend model decision (§2.4)
- Plate math + warmup (§1.2)
- Rest timer, copy yesterday's workout, unit toggle, PR detection (§5)
- Exercise library push (content work starts — Sophia owns)

**Week 2 (content loop + offline):**
- Exercise library ship + video content seeded (~100 of 300) (§1.1)
- Apple Health sync (§1.3)
- Offline mode (§1.5)

**Week 3 (programming core):**
- Program builder MVP with 3–5 templates (§3.1)
- RPE / RIR tagging (§3.2)
- CSV import (§1.4)

**Week 4 (social depth):**
- Profile depth redesign (§2.2)
- Gym clustering (§2.3)
- iOS widget (§1.6)

**Week 5 (programming + polish):**
- Bodyweight tracking + trend (§3.3)
- Live Activity for sessions (§1.6)
- Full exercise library completion (200+ videos) (§1.1)

**Week 6 (buffer + measure):**
- Whatever's slipped
- Measure retention, k-factor, session completion from the last 5 weeks
- Plan post-sprint roadmap from data, not hope

---

## 7. Scope honesty

This roadmap plus the virality roadmap totals ~25–30 weeks of solo engineering. Two engineers: 12–15 weeks. Three: 8–10.

**If solo (Vijay only):** Cut to Week 1 + Week 2 + Program Builder MVP. Everything else pushes to post-June. Hitting 50k on a logger-only app is extraordinarily unlikely.

**If +1 contractor (recommended):** Week 1–4 is feasible. Week 5–6 partial.

**If +2 engineers (best case):** Full roadmap shippable by week 6, but onboarding cost eats week 1.

Caleb's call. The honest priority is: **do fewer things, ship them real, measure them** > **ship everything half-built.**

A good week-6 state: program builder + exercise library + health sync + referral + squad invite + IG share. That's it. Everything else is nice-to-have.

---

## 8. What competitors do that PHYZIK already does better

Worth noting for Caleb's positioning in press + ambassador outreach:

1. **Honest programming voice.** Most competitor brand voice is either sterile (Hevy) or bro-y (Strong). PHYZIK's voice — direct, evidence-backed, respectful — is a genuine differentiator. Protect it.
2. **Social layer oriented at training, not content.** Strava is optimized for bragging; Hevy has almost none. PHYZIK's Floor is focused on the training itself, not lifestyle content. That's rare.
3. **Design quality.** The website proves it; the app screenshots prove it. This is a soft moat but real — most fitness apps look like they were built in 2018.
4. **Ambassador system (pre-launch).** Most apps don't have a real human team visible on the marketing site before launch. PHYZIK's community page changes that.

These don't belong in an engineering roadmap, but they should inform what we *don't* break while chasing feature parity.
