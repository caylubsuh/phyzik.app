# 00 — OPEN THIS FIRST

**Caleb. Read this first.**

You asked for a comprehensive growth sprint while you slept. Here it is.

**Branch:** `caleb/growth-sprint-night1` (local only — not pushed, not merged).
**Date:** 2026-04-17 overnight.
**Time spent:** one overnight session.
**Status:** 9 workstreams complete. 10 total commits. Website changes live on branch (build passing). All planning docs under `growth-sprint/`.

If you only read 3 files, read in this order:
1. **This file** (10 min) — overview + what to do next.
2. `morning-checklist.md` (5 min) — step-by-step for today.
3. `01-priority-stack.md` (5 min) — the action list in priority order.

Everything else is reference material for the next 6 weeks.

---

## 1. What you asked for

> "50,000 users in 6 weeks. Autonomous overnight sprint across 9 workstreams. Be honest about what's achievable. Don't push to main, don't change app code, don't write social copy. Commit early and often. Cite everything or mark [ASSUMPTION]."

I held to those constraints. Details on each:

- ✅ **No push to main.** All work on `caleb/growth-sprint-night1`. You decide when to merge.
- ✅ **No app code changed.** Only website (marketing) + growth-sprint docs. App roadmap is a plan for Vijay, not code I wrote.
- ✅ **No social media copy.** Strategy defines tone + targets; you + Hannah write.
- ✅ **Commits per workstream.** 10 commits across 9 workstreams.
- ✅ **Cited or marked.** Research docs cite competitor names + case-study companies by name. Where I'm inferring (e.g., specific current user count), I've marked `[ASSUMPTION]` or `[INFERENCE]`.

---

## 2. The honest read (the most important section)

I've written the full honest analysis in `research/probability-model.md`. Short version:

**My expected outcome by June 1:** 7,000–12,000 users.
**Probability of hitting 50k:** ~2%.
**Probability of being between 2k and 25k:** ~80%.

This isn't me being pessimistic. It's probability calibration. 50k-month-1 outcomes in consumer iOS apps are 99th-percentile events. They happen — BeReal, Cal AI, Clubhouse all did — and almost always involve an unpredictable viral moment that can't be engineered in advance.

**What I recommend:**
- Hold 50k as the aspirational target (keeps ambition).
- Target 15k–25k as the realistic execution goal (top 25% of launches).
- Measure on k-factor, retention, activation rate — not raw user count. 10k users with k-factor 0.5 is worth more than 25k users with k-factor 0.05.

Execute ruthlessly on the top 10 priorities (`01-priority-stack.md`) and we're in the upper tail of probability distributions.

---

## 3. What's in this package

### Research (WS1–3)
- `research/competitors.md` — 11-competitor teardown. Positioning, gaps, 3 differentiators we should lean on, 3 gaps we need to close.
- `research/growth-case-studies.md` — 11 consumer-app case studies (Strava, BeReal, Duolingo, Cal AI, Hevy, WHOOP, MyFitnessPal, Peloton, Calm, Zwift, TrainHeroic). Plays that transfer; plays that don't.
- `research/aso-audit.md` — App Store listing audit. Title/subtitle recommendation, keyword field, description restructure, screenshot strategy.

### Website changes (WS4)
Shipped on the branch. Full log in `website-changes-log.md`. Headline items:
- **Technical SEO:** sitemap, robots, JSON-LD (Organization, WebSite, MobileApplication, FAQPage). Metadata overhaul.
- **New pages:** `/press` (full media kit), `/changelog` (versioned release notes), `/for/hyrox`, `/for/bodybuilding`, `/for/women` (audience landing pages).
- **Footer updates:** press + changelog links.
- **Reusable audience components:** `AudienceHero`, `AudienceBenefits`, `AudienceFeatureFeature`.
- `npm run build` passes (18 routes generated cleanly).

### App roadmap (WS5) — for Vijay
- `app-roadmap/retention.md` — streaks, PR moments, push strategy, win-back flows.
- `app-roadmap/virality.md` — referral, share cards, squad invites, IG integration, challenges.
- `app-roadmap/missing-features.md` — table-stakes gaps (exercise library, plate math, Apple Health, offline), programming depth, explicit skips.
- `app-roadmap/ui-recommendations.md` — onboarding (3 questions), in-session UX, empty states, design system, accessibility.

### Marketing + growth (WS6)
- `marketing/referral-program.md` — 2-tier status + merch rewards, no cash incentives.
- `marketing/ambassador-program.md` — 3-tier curated athlete program, low-obligation, high-trust.
- `marketing/influencer-tiers.md` — 4-tier campaign model, micro-heavy, $30k/6-week budget, CAC-capped.
- `marketing/press-pr.md` — niche fitness first, Product Hunt week 4, realistic outlet targets.
- `marketing/gym-partnerships.md` — 3 partnership models, 6-week seeds, long-term moat.

### AI tooling (WS7)
- `ai-tooling.md` — pragmatic stack: Claude + Cursor for dev, Claude + Perplexity for content, PostHog for analytics, Granola or Otter for meetings. What NOT to install.

### Legal (WS8)
- `legal-compliance.md` — Tier 1 must-fix-week-1 (privacy policy, ToS, Apple compliance, medical disclaimer, FTC endorsement). Tier 2 + 3. Attorney consult strongly recommended.

### Synthesis (WS9)
- `00-OPEN-THIS-FIRST.md` — this file.
- `01-priority-stack.md` — top 10 in order, with explicit deprioritizations.
- `morning-checklist.md` — step-by-step for waking up.
- `research/probability-model.md` — my honest read on the 50k goal.

---

## 4. The biggest decisions waiting for you

Ranked by urgency:

1. **Attorney consult.** Book this week. $500–1500. Bring current ToS + privacy policy + FTC disclosure brief. See `legal-compliance.md` §7.

2. **Follow-vs-friend social model for the app.** Asymmetric follow (Strava model) or mutual friend (Facebook model) — this blocks profile depth, squad mechanics, and the public content loop. My recommendation: asymmetric follow with "mutual = squad." See `app-roadmap/missing-features.md` §2.4.

3. **6-week influencer budget.** $10k? $30k? $75k? The playbook in `marketing/influencer-tiers.md` scales with this number. Need to know to finalize targets.

4. **How many engineers Vijay has.** Everything in `app-roadmap/` scales from it. Solo Vijay = cut scope to P0-only. +1 contractor = feasible. +2 engineers = comfortable.

5. **Merch vendor + budget.** Referral tier 3 (10-referral hoodie) requires ~$17.5k pre-commitment if 500 users hit the tier. See `marketing/referral-program.md` §2.1.

6. **Push the sprint branch to production, or review locally first.** Recommend: push → Vercel preview → eyeball → merge. See `morning-checklist.md` §4.

---

## 5. What's shipped vs. what's planned

**Shipped (live on branch):**
- All website code changes.
- All structured data + SEO hygiene.
- 3 audience landing pages.
- Press + changelog pages.
- Sitemap + robots.

**Planned (docs only, execution ahead of you):**
- Referral infrastructure (Vijay builds).
- Program builder (Vijay builds).
- Ambassador program (Caleb + Sophia run).
- Influencer campaigns (Caleb runs).
- Press outreach (Caleb runs).
- Gym partnerships (Caleb + Sophia + Ten Takeda run).

Nothing in the "planned" pile has moving parts yet; it's all paper until you decide to execute.

---

## 6. Recurring themes across the 9 workstreams

Reading the docs, these patterns emerge. They're the shape of the strategy:

### Theme 1: Protect the brand voice
Marketing, copy, app UX, ambassador curation — all hinge on the voice you've built. Evidence-based, respectful, direct, no bro-science. Every shortcut that violates that voice costs more than it saves. See `app-roadmap/ui-recommendations.md` §3.1, `marketing/influencer-tiers.md` §11.

### Theme 2: Referral over ads
The research is unambiguous: consumer apps that scaled to 100k+ without massive paid budgets did it with a referral loop. Build the loop; let it compound. Paid is secondary. See `app-roadmap/virality.md` §1, `marketing/referral-program.md`.

### Theme 3: Measurement is leverage
We can't improve what we don't measure. PostHog + dashboard + weekly review. Friday becomes the most important day of the week. See `app-roadmap/retention.md` §measurement, `01-priority-stack.md` KPIs.

### Theme 4: Curate relentlessly
Ambassadors, influencers, gym partners, press contacts — every one is chosen carefully, not blanket-outreached. 10 right people beat 100 wrong ones. See `marketing/ambassador-program.md` §3.2, `marketing/influencer-tiers.md` §4.2.

### Theme 5: Scope honestly
The full roadmap (app + marketing + content) is ~40 person-weeks of work. Six weeks with a small team means ruthless cutting. Pretending we can do everything breaks the team. See `app-roadmap/virality.md` scope honesty, `research/probability-model.md`.

### Theme 6: The sports niche (Hyrox) is our beachhead
Hyrox is growing ~50% YoY globally, underserved by software. Ten's story + `/for/hyrox` page + niche press push can own this in 6 months. Bigger strategic bet than it looks. See `research/competitors.md` §Hyrox gap, `marketing/press-pr.md` §3.3.

---

## 7. What I'm confident about vs. uncertain about

**High confidence:**
- The strategic framing of referral > paid.
- The brand voice protections.
- The technical SEO + structured data deliver measurable wins.
- The feature roadmap priorities (program builder, exercise library, offline, Apple Health as P0).
- The press / ambassador / influencer tiering and outreach approach.
- The legal Tier 1 items are genuinely urgent.

**Medium confidence:**
- The specific CAC + k-factor targets. They're industry benchmarks; our numbers will differ.
- The Product Hunt strategy — it's the right move but outcomes vary.
- The ambassador tier structure — good starting point, will need iteration.

**Lower confidence:**
- Specific merch economics. Drop-ship pricing varies.
- Timing of the program builder — depends entirely on Vijay's current app state.
- Precise outreach targeting for specific journalists (I named outlets; you'll need to find specific reporters at each).

Where I'm uncertain, I've said so.

---

## 8. What I didn't do (and why)

- **Didn't change app code.** Per your constraint.
- **Didn't write social media copy.** Per your constraint — tone + targets only.
- **Didn't run Lighthouse or performance benchmarks.** Would require running the dev server end-to-end with headless Chrome. You can do in 10 minutes Monday.
- **Didn't generate per-page OG images.** `opengraph-image.tsx` produces homepage OG; audience pages inherit the default. Future work if you want per-page OG cards.
- **Didn't install PostHog or any analytics.** That's in the app-roadmap, for Vijay, with your approval.
- **Didn't contact any vendors, journalists, or ambassadors.** All outbound messaging is yours.
- **Didn't assume any decision I wasn't told.** Where preferences came up, I've surfaced them for you.

---

## 9. What I'd do if I were you this week

**Monday:**
- Read this + morning checklist + priority stack (20 min).
- Deploy the branch to Vercel preview, click through every new page (20 min).
- Schedule: attorney consult, Vijay kickoff, Sophia ambassador session (30 min).

**Tuesday:**
- Attorney consult or confirm it for Wed/Thu.
- Vijay kickoff: referral infra, PostHog, program builder MVP scope. Agree on what ships week 1 vs. week 2.
- Merge branch to main once confident.

**Wednesday:**
- Draft first 10 journalist pitches. Send.
- Sophia + Caleb list 20 ambassador candidates. First 5 outreach messages drafted.

**Thursday:**
- First ambassador calls booked.
- Submit sitemap to Google Search Console.
- Paid account infra — set up Meta + Google Ads accounts even if not spending yet.

**Friday:**
- Run Lighthouse on live site.
- Weekly check-in: What moved this week? What's stuck?
- Rest over the weekend. Actually.

---

## 10. The one thing I'd want you to remember

The goal isn't 50k by June 1. The goal is **building something that's genuinely worth 50k users, and letting the distribution channels compound.**

If in 6 weeks we have 10k users, 60% week-4 retention, a working referral loop with k-factor 0.4, and an ambassador roster generating organic content, that's a better position than 30k users with 20% retention and no viral mechanic. The first becomes 50k by August; the second caps at 40k and churns down.

Build right. Measure honestly. Rest enough to think clearly. Ship the priority stack in order.

See you in 6 weeks.

---

**Begin:** `morning-checklist.md` → `01-priority-stack.md` → `research/probability-model.md`.
