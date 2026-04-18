# App Roadmap — UI & UX Recommendations

**Owner:** Caleb (design) + Vijay (implementation).
**Grounded in:** `research/competitors.md` (app screenshots review), `research/growth-case-studies.md` (§Strava §Hevy §Duolingo UX patterns), `retention.md` + `virality.md` + `missing-features.md` (assumed context).

This doc is about **how the app feels.** Feature parity is covered in `missing-features.md`. Growth mechanics are in `virality.md`. This is the UX layer — where features land, how the app carries itself, what a new user sees in the first 60 seconds.

I have not observed the current app build directly (no internal screenshots reviewed). Where I'm operating on inference or industry norms, I flag `[INFERENCE]`. Caleb should correct the baseline where my assumptions don't match the built reality.

---

## 1. The 60-second test

Every fitness app lives or dies on what happens in the first 60 seconds after install. The average user gives you two screens of patience before they commit or bounce.

### 1.1 First launch (pre-signup)

**Current (inferred):** Splash → sign in / sign up → email or OAuth → onboarding questions → home.

**Recommendation:**
1. **First screen = value, not gate.** The pre-signup screen should be a 3-slide tap-through: "What PHYZIK does" (with a real app screenshot, not lifestyle imagery) → "Why it's different" (Floor + squad shot) → "Start" button. Skippable.
2. **Defer signup.** A user should be able to open the app and tap around without signing up. Minimum — let them browse the exercise library, see a demo program, view sample Floor content. Hevy and Fitbod both do this; conversion-to-signup lifts ~30% vs. a hard-gate.
3. **Sign up → single OAuth tap.** Apple first, Google second, email as tertiary. No username step at this stage — generate one, let them change later.

**Why:** Signup is the highest-friction step in the funnel. Every screen before the "home screen" halves the conversion. Streamline it ruthlessly.

**Complexity:** Low-medium. Mostly UI + deferred auth state management. ~3–5 days.

**Priority:** P0 (week 1).

---

### 1.2 Onboarding questionnaire

**Current (inferred):** Probably: goals, experience, days/week, equipment.

**Recommendation:** Cut to three questions max:
1. **Primary goal.** (Get stronger / Build muscle / Get fitter / Train for a specific event)
2. **Experience.** (First year / 1–3 years / 3+ years)
3. **Days per week.** (3 / 4 / 5 / 6)

Each question is one screen, one tap, skippable. Total time: 15 seconds. Every additional question drops completion by ~10%.

**What to do with the answers:** seed the program recommendation (§`missing-features.md` §3.1). If "Train for a specific event" is selected, show the Hyrox / meet-prep / hybrid templates. If the program builder isn't ready yet, seed a basic split (Upper/Lower, PPL, Full-body).

**Why:** Duolingo's onboarding is 5 questions and they've tested it thousands of times — each question justifies itself through a ~5% activation lift. PHYZIK should A/B test against 2 questions vs. 3 vs. 4 as volume grows. Start at 3.

**Anti-pattern:** Body stats, current lifts, injury history on first open. Save for later in settings. New users don't want to fill out a medical intake form before seeing the app.

**Complexity:** Low. UI + state.

**Priority:** P0 (week 1).

---

### 1.3 First-session "wow"

**Recommendation:** The first screen after onboarding should be the user's **pre-seeded first session** with a prominent "Start" button and a one-line context: "Today's session: Upper Day 1. 40 minutes. 5 exercises."

Not the Floor. Not a feed. Not settings. The one thing we want the user to do.

When they tap Start, walk them through set 1 with an inline tip ("Tap to log this set — you can adjust weight + reps any time"). After set 1 logs, confetti moment: "First set on PHYZIK. Keep going."

**Why:** Strava activates users on first ride logged. Duolingo on first lesson. MyFitnessPal on first meal logged. The universal activation metric in consumer apps is "user did the core action once." For PHYZIK, that's one set.

**Complexity:** Medium. Depends on onboarding → program → session seeding pipeline.

**Priority:** P0 (week 1–2).

---

## 2. Navigation & information architecture

### 2.1 The bottom tabs

**Recommendation:** 4 tabs, no more.

1. **Train** — the session / program view (default tab after login).
2. **Floor** — social feed, squads, community content.
3. **Stats** — PRs, volume, history, body weight trend.
4. **Profile** — self + settings.

Avoid the 5-tab temptation. The 5th slot becomes a "More" or "Misc" — a graveyard. Fitbod did this, it hurt their UX for years before they fixed it.

Every screen in the app should be reachable within 2 taps from a tab.

**[INFERENCE]** Current tabs are unknown to me. If there are more than 4, consolidate. If there's a "Community" tab separate from Floor, merge.

**Complexity:** Low if restructuring. Medium if the IA is already different.

**Priority:** P0 — structural decisions are cheap in week 1, expensive in week 6.

---

### 2.2 The Train tab — session-first, not program-first

**Recommendation:** When a user opens Train, they should see their **current session** as the hero card — not a list of programs, not a calendar, not a picker.

Structure:
- **Top:** "Today — Upper Day 1 · Week 3 of 8" with "Start Session" button.
- **Below:** Program progress bar (3 of 24 sessions done).
- **Below that:** This week's remaining sessions (small cards).
- **Below that:** "Switch program" link (tucked, not prominent).

**Why:** The job-to-be-done on Train tab is "do my workout today." Everything else is secondary. Apps that front-load program selection slow the daily user; apps that front-load the session respect the daily user's time.

**Complexity:** Low-medium.

**Priority:** P0 (week 2).

---

### 2.3 In-session UI

**Recommendation — the set logger:**
- **Current exercise name** at the top, big. Target sets × reps × weight visible.
- **The set row**: one tap to log a set (pre-filled with target). Long-press to adjust. Inline RPE tag (1 tap, optional).
- **Rest timer** starts automatically on set completion. Big, visible, dismissable.
- **Previous session's performance** in muted text below target. "Last: 8×185 @ 7.5 RPE."
- **Swipe left** on an exercise to swap for a variation (§`missing-features.md` §1.1).
- **Tap exercise name** opens the demo video.

Anti-patterns to avoid:
- Modal dialogs for set logging. Every tap that opens a modal in-session is a tap the user resents at set 5.
- Forcing the user to pick from a dropdown for RPE/weight/reps. Pre-fill; let them adjust.
- Disabling actions while the rest timer is running. Don't trap the user.

**Why:** The in-session UX is where retained users live. A user who does 40 sessions in PHYZIK does 40 × 25 set-logs = 1,000 logging interactions. Five seconds of friction per set = 83 minutes of friction per program cycle. Ruthless about tap count.

**Complexity:** Medium-high. This is the highest-leverage UI in the app.

**Priority:** P0 (week 1–2). Revisit weekly.

---

### 2.4 The Floor — simple first, clever later

**Recommendation — Floor v1 (week 2):**
- **Single vertical feed**, chronological, scoped to: my squads + people I follow + ambassadors.
- **Post card** = user + action + session summary + one PR highlight (if any) + hype react + comment.
- **Filter tabs above** (P2): All / Squads / Following. Don't ship filters in v1 — validate that the single feed is engaging first.

Anti-patterns:
- Algorithmic ranking on day 1. Validate the content loop is healthy before optimizing it.
- Infinite scroll that hides recency. Users are checking Floor multiple times a day looking for *new* activity — reverse chrono is correct.
- Ads in feed. Ever.

**Why:** See `virality.md` §anti-patterns. Chronological until there's a real reason to rank.

**Complexity:** Medium. Feed + post card + hype action + comment thread.

**Priority:** P0 (week 2).

---

### 2.5 The Stats tab

**Recommendation:**
- **Top:** Bodyweight trend sparkline + current vs. 4-week-ago delta.
- **Middle:** Top 5 lifts, each with a sparkline showing progression. Tap → full-screen per-exercise chart.
- **Below:** Weekly volume by muscle group (bar chart).
- **Below:** PR timeline (chronological list of all PRs, filterable by exercise).

**Why:** Stats is where retention users come to feel validated. The tab should answer "am I making progress?" in one scroll. Hevy's stats are excellent here and drive significant engagement.

**Complexity:** Medium. Charts + aggregation service.

**Priority:** P1 (week 3–4).

---

## 3. Design system & visual language

### 3.1 The brand voice in pixels

The marketing site gets this right: black-first, accent purple (#A78BFA) used with restraint, typography is Inter with weight discipline, spacing is generous. The app should feel like a natural continuation.

**Guidelines for the app UI:**
- **Dark mode first.** The site is dark; the app should be dark-default. Optional light mode can come later; don't build two equally-weighted themes in week 1.
- **Accent color only for action + celebration.** Buttons, active states, PR cards, hype reacts. Nothing passive should be accent-colored.
- **No stock fitness iconography.** No muscle-man silhouettes. No dumbbell clip art. If there's an icon, it's a thin-weight monoline that reads as part of the type system.
- **Screenshot-of-reality hero imagery.** Don't composite gym photos with phone mockups. Either show the app screen directly, or use real gym photography (the community page did this well).
- **No emoji in system UI.** Tempting for "fun" — undermines the brand voice. Exception: hype react can be a custom iconographic flame or lightning.

### 3.2 Typography

- **App body:** Inter (matches site). Fall back to SF Pro on iOS.
- **Numerals:** Always tabular-num for weights, reps, sets, timers. Non-tabular numerals in a session log make the eye work harder than it should.
- **Weight hierarchy:** 600 for H1s, 500 for H2/H3s, 400 for body. Avoid 700+ (too loud against black).
- **Line height:** 1.2 for titles, 1.5 for body. The site uses this; carry over.

### 3.3 Motion

The marketing site has real motion presence (FadeUp, parallax, etc.). The app should have the same restraint.
- **Micro-interactions only.** Button press gives 100ms scale; tab switch is a 200ms fade; set log is a subtle bump + rest timer slide-in.
- **Celebration moments are the exception.** PR confetti, streak milestone — these can be bigger (500ms, multi-step).
- **No full-screen loading spinners.** Skeleton states for everything. Users should never watch a spinner longer than 200ms.

---

## 4. Empty states — the underrated surface

Empty states are where churn happens fastest. Every "nothing here yet" screen is a conversion moment.

### 4.1 Empty Floor

**Bad:** "No posts yet."

**Good:** Three cards below a headline "Make the Floor yours":
1. "Invite a friend" → squad invite flow.
2. "Follow PHYZIK athletes" → list of 5–10 curated ambassadors including Sophia, Ten, Hannah, Ethan — one-tap follow.
3. "Log your first session — it'll post here" → train tab.

**Why:** Empty states are assignment briefs. Tell the user exactly what to do to un-empty it.

### 4.2 Empty squads

**Good:** "Squads are how PHYZIK gets useful. Start one with 2–5 friends who lift." Big button: "Create your first squad."

### 4.3 Empty PR history

**Good:** "Your first PR is one set away. Start today's session."

### 4.4 Empty bodyweight chart

**Good:** "Log today's weight — the trend line starts here. (1 tap, syncs with Apple Health.)"

**Priority for all empty states:** P0 (week 1 — these are 30-minute edits in Figma and 1-hour UI changes).

---

## 5. Notifications — the UX layer of retention

Covered in `retention.md` for strategy. UX notes:
- **Push permission ask on day 2**, not at onboarding. Higher opt-in rate. See `retention.md`.
- **Every push has a deep link to the relevant screen.** "Sarah hit a PR" taps → Sarah's PR post. "Your program starts tomorrow" taps → tomorrow's session preview. No "open app" with the user left to hunt.
- **Quiet hours by default.** 10pm–7am local. User can override.
- **Rate limit:** No more than 2 notifications per user per day unless squad activity spikes. Over-notifying is how apps get killed on iOS.

---

## 6. Haptic + sonic feedback

iPhone users are tuned to tactile feedback. Cheap to implement, high signal.

- **Log a set:** light haptic bump.
- **PR detected:** heavier bump + optional chime (settings).
- **Start/end rest timer:** soft haptic tick.
- **Share card tap:** selection haptic.

Use Apple's `UIImpactFeedbackGenerator` types. Don't use custom audio files for anything during a session — people train with music on. Haptic + visual only.

---

## 7. Accessibility

Not optional. Two non-negotiables:

- **VoiceOver labels on every interactive element.** Including custom icon buttons.
- **Dynamic Type support.** The app should legibly scale from Small to XXXL. This especially matters for older lifters.

Nice-to-haves:
- Reduced motion respects the system setting.
- Color contrast: accent purple on black passes WCAG AA; verify before shipping any secondary color.

**Why:** Accessibility is cheap to build in, expensive to retrofit. Week 1 is the time. And: the ambassador tier will include older lifters; Dynamic Type failures alienate them.

**Priority:** P0 throughout the sprint. Not a separate feature; a discipline.

---

## 8. Marketing site → app handoff

When a user installs from the marketing site, the brand continuity should be unbroken.

- **Color:** same accent, same black.
- **Typography:** same Inter.
- **Voice:** same — evidence-backed, respectful, direct, not shouty.
- **Imagery:** if the site shows a specific screenshot in the hero, the first app screen they see post-install should match that expectation.

**Anti-pattern:** Marketing sites that feel premium, apps that feel like a 2019 Rails admin panel. The disappointment is lethal to conversion.

**Complexity:** Design discipline, not engineering work.

---

## 9. Dark patterns to avoid

Competitors cluttered their apps with these; PHYZIK's brand voice explicitly rejects them.

1. **No "rate the app" nag in the first 7 days.** Ask at a natural moment (e.g., right after a 4-week streak milestone), not on day 2.
2. **No "upgrade to Pro" interstitials.** If/when Pro exists, it's visible in settings and contextually (e.g., when hitting a free-tier limit). Never a splash screen.
3. **No permission spam.** Ask for push (day 2), HealthKit (contextual to first session finish), Contacts (only when user taps "Invite from Contacts"). One ask per context.
4. **No streak-manipulation darkness.** No countdown timers designed to stress users into logging. No "you're about to lose your streak!" fear bait. See `retention.md` for healthy streak design.
5. **No comparison shame.** "You're behind 85% of users" is Duolingo's old pattern; it's demotivating in a training context. Comparisons should be opt-in and contextual.

---

## 10. Quick wins for week 1

Ship these in the first 5 days. Collectively they raise perceived quality ~30% with ~1 week of eng:

| Win | Effort | Why |
|---|---|---|
| Haptic feedback on set log | 1h | Feels alive |
| Tabular numerals in logger | 30m | Reads 20% faster |
| Empty state copy redo (all 6 empty states) | 3h | Converts churn moments |
| Skeleton loading states (replace all spinners) | 1 day | Perceived-performance win |
| Pre-filled set targets from program | 1 day | Cuts in-session friction |
| Accent-colored "Start Session" button on Train tab | 30m | Pulls the eye to the action |
| Dynamic Type check + fix on core screens | 1 day | Accessibility floor |
| VoiceOver labels on logger + Floor + tab bar | 1 day | Accessibility floor |
| "Copy yesterday's workout" in session picker | 2h | Huge repeat-user win |
| Remove any remaining stock fitness iconography | variable | Brand voice |

Caleb should do a design audit on the current build against these 10 items and produce a week-1 punch list for Vijay.

---

## 11. What I'd test if I were building this

A/B worth running as the user base grows past 10k:

1. **Onboarding: 3 questions vs. 4 vs. 2.** The activation-rate curve isn't always monotonic.
2. **Empty Floor CTAs: invite-first vs. follow-first.** Different user archetypes respond differently.
3. **Set logger: inline RPE vs. post-session RPE.** Inline is richer data but higher friction.
4. **Program picker vs. auto-assigned program on signup.** Choice friction vs. choice dissatisfaction.
5. **Floor chronological vs. "Today's highlights" pinned card at top.** The "highlights" model is lighter on daily users but could hurt repeat visits.

Don't start A/B testing until we have >10k users per variant per week. Below that, results are noise.

---

## 12. Design debt to address before scale

None of these block week 1 shipping, but Caleb should have them on a backlog:

- **Icon system:** every icon should come from a single weight/family. Currently a risk on any cross-platform app.
- **Illustration system:** if we ever need illustrations (empty states, onboarding, premium upsell), commission one system — don't Unsplash it.
- **Design token audit:** spacing, color, typography should be referenced from tokens, not inlined. If the app is on Expo/React Native and doesn't have a token file, week 2 is the time.
- **Component library doc:** Storybook or equivalent for the app's shared components. Pays for itself at the second engineer.

---

## Summary for Caleb's week-1 UX decisions

1. **Bottom tabs:** Train, Floor, Stats, Profile. 4 only.
2. **Onboarding:** 3 questions max, skippable, 15 seconds.
3. **Post-onboarding default:** pre-seeded session with "Start" front and center. Not the Floor.
4. **In-session logger:** one-tap log, pre-filled target, auto rest timer, inline RPE optional.
5. **Floor v1:** single chronological feed. Ranking + filters deferred.
6. **Design language:** dark-first, accent-for-action-only, tabular numerals, no stock iconography.
7. **Empty states:** every one is an assignment brief with a CTA.
8. **Push permission:** asked on day 2, not day 1.
9. **Accessibility:** VoiceOver + Dynamic Type are week-1 discipline.
10. **Haptics:** light on log, heavy on PR, soft on rest timer.

Ship the app that feels like the marketing site reads. The hardest thing about this roadmap isn't writing the code — it's protecting the voice.
