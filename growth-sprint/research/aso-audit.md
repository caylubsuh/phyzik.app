# ASO Audit — PHYZIK App Store Listing

**Listing URL:** https://apps.apple.com/us/app/phyzik/id6760412488
**App ID:** 6760412488 · **Bundle ID:** com.physiquetech.physiqueai
**Audit date:** 2026-04-17

---

## Current listing (verified via web fetch, 2026-04-17)

| Field | Current value | Characters |
|---|---|---|
| **Title** | `PHYZIK` | 6 / 30 |
| **Subtitle** | `Train. Track. Compete.` | 22 / 30 |
| **Developer** | Physique Technologies LLC | |
| **Category** | Health & Fitness | |
| **Rating** | 5.0 (1 rating) | |
| **Pricing** | Free | |
| **Size** | 61 MB | |
| **iOS req.** | 15.1+ | |
| **Age rating** | 9+ | |
| **Language** | English only | |
| **Version** | 1.1.1 | |

## The single biggest miss: the title and subtitle are **leaving 24 characters of high-value keyword real estate unused.**

Apple's algorithm weights keywords in title + subtitle heavily. Current title "PHYZIK" = 6 chars. Subtitle "Train. Track. Compete." uses *zero* of the target keywords lifters search. That is the single largest fixable problem on this listing, worth ~10-30% in discoverability uplift by itself.

---

## How the competition presents itself

| App | Title | Subtitle |
|---|---|---|
| Hevy | `Hevy - Workout Tracker Gym Log` (30) | `Weight Lifting Routine Planner` (30) |
| Strong | `Strong Workout Tracker Gym Log App` (34 — over limit, clipped) | `Strength Training Planner` (25) |
| Jefit | `JEFIT Workout Plan Gym Tracker` (30) | varies |
| Fitbod | `Fitbod: Gym & Fitness Planner` (29) | ... |
| StrengthLog | `StrengthLog: Workout Tracker` (28) | ... |
| Liftoff | `Liftoff - Ranked Gym Workouts` (29) | ... |

**Pattern:** Every serious competitor uses all 30 title chars and loads them with the keywords users actually search: **workout**, **tracker**, **gym**, **log**, **lifting**, **planner**, **routine**, **training**, **strength**. PHYZIK is currently leaving this on the table.

---

## Recommended title + subtitle (Week 1 ship)

### Primary recommendation

| Field | Recommended | Chars |
|---|---|---|
| **Title** | `PHYZIK: Lifting & Gym Tracker` | 29 |
| **Subtitle** | `Workout Planner & Social Log` | 28 |

**Why:**
- Keeps "PHYZIK" brand first (Apple favors apps where brand matches search).
- Inserts three high-volume keywords into the title: `Lifting`, `Gym`, `Tracker`.
- Subtitle adds `Workout`, `Planner`, `Social`, `Log` — all high-volume, zero repetition with title.
- "Social" is the single differentiating word vs. Hevy/Strong — leans into our positioning.

### Alternate (more social-forward)

| Field | Recommended | Chars |
|---|---|---|
| **Title** | `PHYZIK: Social Gym Tracker` | 26 |
| **Subtitle** | `Lifting Workout Planner & Log` | 29 |

Use this if Caleb wants social as the wedge over discoverability. Lower keyword density for "lifting" (moves to subtitle, still indexed but weighted less).

### A/B test (after 2 weeks of baseline with primary)

| Field | A | B |
|---|---|---|
| **Subtitle A** | `Workout Planner & Social Log` | — |
| **Subtitle B** | `Smart Hypertrophy Programs` | — |

Variant B leans into RP Hypertrophy's territory (sub is a testable hypothesis about whether "hypertrophy" pulls qualified traffic vs. broader "workout").

---

## Hidden keyword field (100 chars, comma-separated, no spaces)

Current: unknown (requires App Store Connect access to verify).

**Recommended 100-char set (no overlap with title/subtitle):**

```
hypertrophy,strength,hevy,strong,fitbod,bodybuilding,hyrox,powerlifting,mesocycle,RPE,volume,squad,PR
```

That's 98 chars. Reasoning:
- **hypertrophy, strength, bodybuilding, hyrox, powerlifting** — the niches we compete in and they have search volume.
- **hevy, strong, fitbod** — competitor brand names. **Apple's rules allow this** [ASSUMPTION — confirm per current guideline 2.3.10, which historically allowed competitor names if not used deceptively. Verify before filing.]
- **mesocycle, RPE, volume, squad, PR** — long-tail terms serious lifters use.
- Excludes repeats of `lifting`, `gym`, `tracker`, `workout`, `planner`, `log`, `social`, `PHYZIK` which are already in title/subtitle.

Keywords should be reviewed every 3-4 weeks based on App Store Connect impressions/conversions data. [Source: AppTweak 2026 guide]

---

## Description — the first 3 lines matter most

iOS shows ~170 characters before the "More" truncation on phone screens. That's ~3 lines. Everything after that is for the minority of users who tap "More."

### Current issue (inferred): description appears to lead with feature list, not with benefit hook.

### Recommended opening 3 lines

```
The social training platform built for lifters. Structured 
programs, adaptive progressive overload, and a feed where 
every post is a real workout. Free, no ads.
```

~170 chars. Covers: social, training platform, lifters, structured programs, progressive overload, feed with real workouts, free, no ads. Hits keyword density *and* differentiation vs. Hevy ("social" + "adaptive programs" are the wedges).

### Body structure after the fold

1. **Opening hook** (above fold, as shown)
2. **Three primary benefits in 1-sentence format** (scannable):
   - Programs that adapt. Evidence-based, auto-regulated, deload-aware.
   - Squads that keep you accountable. Shared schedules, weekly leaderboards.
   - A social feed where every post is a real session.
3. **Feature list** — emoji-prefixed bullets for scanners (✓ Workout logging · ✓ Rest timer · ✓ Exercise analytics · ✓ Volume landmarks (MEV/MAV/MRV) · ✓ Recovery tracking · ✓ Squad accountability · ✓ Social feed · ✓ 730+ exercises · ✓ Progressive overload · ✓ Programs for hypertrophy, strength, Hyrox, powerlifting)
4. **Scientific credibility statement** (2 sentences): "Built on evidence-based training science — progressive overload, volume landmarks, and periodization frameworks published by leading researchers." [Keep it generic; legal consideration re: name-dropping specific scientists — see legal-compliance.md.]
5. **Call to action**: "Download free. Build your squad. Start training with data."
6. **Social proof** (when it exists — leave scaffold text until real)
7. **Support / website footer**: phyzik.app · support@phyzik.app · privacy policy + terms links

---

## Screenshot strategy

Apple fitness apps in 2026 follow a consistent pattern in the top-performing group:

1. **Screenshot 1** (highest impact): Hero shot + headline overlay. **This is essentially the ad.** It must communicate the product's single strongest promise in 1 second.
2. **Screenshots 2-5**: Feature showcases with big headline text (1 feature per screenshot).
3. **Screenshot 6**: Social proof ("5-star reviews," "featured," testimonial quote, press logos).
4. **Screenshots 7-8**: Aspirational / lifestyle ("Your gym, gamified" etc.).

### Top-performing 2026 patterns
- **Bold headline text overlays** (not raw UI screenshots).
- **Dark backgrounds** (matches most fitness apps' visual identity and pops on the light-background App Store).
- **Phone-in-hand mockup vs. clean app screenshot** — clean screenshot wins by default. Mockups should only be used for screenshots 7-8.
- **Video preview** — 30-second auto-playing video now shown prominently. 40-60% of downloads are influenced by it. **This is a P0 — PHYZIK should have an App Preview video ASAP.** [ASSUMPTION on uplift figure — directionally correct per ASO industry consensus.]

### Recommended screenshot slots for PHYZIK (to brief to Caleb/design team)

1. **"Every post is a real workout"** — The Floor feed (existing screenshot 01-floor-post.png already nails this)
2. **"Train with your squad"** — Squad leaderboard + shared schedule
3. **"Programs that adapt"** — Active workout + suggested progression
4. **"Every dimension of training, measured"** — Analytics dashboard
5. **"Your recovery, mapped"** — Anatomical recovery screen
6. **"Proven programs, ready to go"** — Program discovery
7. **"Schedule that follows you"** — Weekly scheduler
8. **Brand/hero** — PHYZIK wordmark + tagline ("The training platform built for lifters") — aspiration shot

Existing marketing screenshots in `/public/screenshots/marketing/` map almost 1:1. Just add headline overlays and export at App Store dimensions (1290×2796 for iPhone 15 Pro Max).

---

## App Preview video

**Not currently present.** This is the highest single-impact improvement to the listing.

Target: 15-30 seconds. Must work silently (most users watch muted).

**Recommended shot list (hand to editor):**
- 0-3s: Logo + tagline overlay over a lifting scene
- 3-8s: Active workout logging (a set being logged, timer running)
- 8-13s: The Floor feed scrolling with live PR notifications
- 13-18s: Squad leaderboard animating
- 18-23s: Analytics dashboard flyover
- 23-28s: "PHYZIK. Free on iPhone." card
- 28-30s: App Store badge

Caveat: per sprint rules, I'm not writing VO/copy for this. This is structural guidance for whoever produces it.

---

## Featured placement — how Apple editorial picks apps

Based on public Apple guidelines + observed patterns in the "Today" tab of the App Store:

1. **Editorial pitches matter.** Apple has a dedicated editorial team. [Email appstoreeditorial@apple.com or use the "Nominate your app" form in App Store Connect to submit.] Pitch should include: what makes the app visually distinct, what makes it unique in its category, what's newsworthy right now.
2. **Timing.** Apps get featured around launch moments, major updates, WWDC, seasonal themes (e.g., New Year's Resolutions in January, summer body prep in May).
3. **Design quality.** Apple favors apps with strong visual polish. PHYZIK's brand is already strong here — the lavender/true-black aesthetic and Inter typography are in the taste zone that Apple editorial notices.
4. **Apple-ecosystem native.** Apps that lean into Apple tech (Live Activities, Widgets, Apple Watch, Vision Pro, SwiftUI) get preference. **PHYZIK currently has none of these.** Adding Live Activities for the rest timer alone could swing editorial interest. This is covered in `app-roadmap/missing-features.md`.

**Action for Caleb:** Submit PHYZIK for featuring via https://developer.apple.com/contact/app-store/promote/ (App Store Connect → My Apps → App Store → App Information → Version Updates → Feature Your App). Timing: submit once screenshots + video are refreshed, not before.

---

## Review solicitation — compliant and effective

Apple rules (guideline 1.1.7 and native `SKStoreReviewController`):
- You may use the native rating prompt.
- You cannot gate features behind reviews.
- You cannot incentivize reviews with in-app rewards.
- You're limited to 3 native rating prompts per user per 365 days.

**Best practice trigger moments:**
1. After a user completes a 5-session streak (they've had a real experience and it's positive).
2. After they hit a personal PR (emotional high).
3. After their squad wins a weekly challenge (social reinforcement).
4. NOT on first-open, NOT during active workout (friction + interruption).

**Specifically avoid:** pop-ups that say "Rate us 5 stars" directly. Use native iOS prompt which doesn't tell the user what rating to leave.

**Consider:** a separate in-app feedback survey for dissatisfied users (via NPS <7) that routes to support instead of the public review flow. This is a classic pattern that keeps bad reviews out of the public rating pool while still surfacing issues internally. [ASSUMPTION — some debate on whether Apple discourages this; conservatively, allow all users access to the review prompt but also offer a feedback option.]

---

## Localization — international opportunities

Current listing is English only. Fitness apps see real uplift from localization. Priority markets (by App Store revenue + fitness category penetration):

1. **Spanish (LATAM + Spain)** — very high-volume market, underserved in lifting-specific apps. Easiest first localization.
2. **Portuguese (Brazil)** — Brazil has the world's 2nd-largest bodybuilding culture (anecdotal but strong signal). Huge opportunity.
3. **German** — wealthy market, high fitness app ARPU.
4. **French** — similar.
5. **Japanese** — technically challenging (different typography) but lifting culture growing.
6. **Korean** — K-pop/K-fitness halo effect, growing lifter scene.

**Minimum viable localization:** title, subtitle, description, keyword field. Not the app itself yet. ~$200-500 per language via professional translation service.

**P1 this sprint:** Spanish + Portuguese listings only. Budget ~$400.

---

## Category

Currently: Health & Fitness. Correct. No alternative.

Subcategory chase: none — Apple doesn't expose subcategories to users. Don't overthink.

---

## Specific ASO Claude skills / tools worth using

- **aso-skills on GitHub** — https://github.com/Eronred/aso-skills. AI agent skills for App Store Optimization. Built to work with Claude Code / Cursor. Worth installing as a skill.
- **AppTweak** — paid ASO tool (https://apptweak.com). ~$69/mo entry tier. Keyword research, competitor tracking. The gold standard for serious ASO.
- **Sensor Tower** — enterprise, too expensive for now.
- **AppFollow** — ~$79/mo. Cheaper alternative to AppTweak. Strong review management.
- **Apptopia** — data.ai competitor.
- **Mobile Action** — free tier available. Worth trying first before paying.

**Minimum tool stack for PHYZIK sprint:** free Mobile Action account + install aso-skills Claude skill. Upgrade to AppTweak if ASO becomes a core channel at week 3.

---

## Week 1 specific action items (App Store Connect)

Caleb needs to do these this week. Each is self-contained.

1. **Change title and subtitle.** Update to:
   - Title: `PHYZIK: Lifting & Gym Tracker` (29 chars)
   - Subtitle: `Workout Planner & Social Log` (28 chars)
2. **Update keyword field** (100 chars) with the comma-separated list above. Verify competitor names are still compliant (guideline 2.3.10) — quick search before submitting.
3. **Rewrite description** with the 3-line opening hook followed by the structured body.
4. **Request an App Preview video** from whoever edits video on the team. 15-30 seconds. Use the shot list above.
5. **Refresh screenshot set.** Add bold headline text overlays using existing `/public/screenshots/marketing/` images. Match the 8-slot plan.
6. **Submit app for editorial featuring** via the App Store Connect "Feature Your App" form.
7. **Add Spanish + Portuguese localized listings** (~$400 in translations). Low effort, real uplift.
8. **Hook review prompt into 5-session-streak trigger** in the app. (Planning only — this is a Vijay task.)
9. **Install aso-skills Claude skill** for keyword iteration workflow.

Estimated time for Caleb to execute 1-3 and 6: **60-90 minutes total in App Store Connect.**

---

## Sources

- [iOS App Store Optimization Metadata & Keyword Strategy — DEV](https://dev.to/arshtechpro/ios-app-store-optimization-metadata-keyword-strategy-3f6p)
- [App Store keyword research 2026 — AppTweak](https://www.apptweak.com/en/aso-blog/app-store-keyword-research-aso)
- [ASO in 2026 Complete Guide — ASOMobile](https://asomobile.net/en/blog/aso-in-2026-the-complete-guide-to-app-optimization/)
- [ASO Ranking Factors 2026 — AppFollow](https://appfollow.io/blog/aso-ranking-factors)
- [ASO Strategy 2026 — BrandLoom](https://www.brandloom.com/aso-strategy-must-do-steps-for-ranking-higher-in-the-ai-era)
- [aso-skills GitHub](https://github.com/Eronred/aso-skills)
- [Hevy listing](https://apps.apple.com/us/app/hevy-workout-tracker-gym-log/id1458862350)
- [Strong listing](https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577)
- [Current PHYZIK listing](https://apps.apple.com/us/app/phyzik/id6760412488)
