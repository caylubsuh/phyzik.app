# Morning Checklist — For Caleb When You Wake Up

**Date:** 2026-04-17 overnight sprint.
**Branch:** `caleb/growth-sprint-night1`.
**Status:** 9 workstreams complete. All commits on branch. Nothing pushed to main. No app code changed. No social copy written.

This is the first thing to read. Take 20 minutes, work through this list, then dive into `00-OPEN-THIS-FIRST.md` for the substance.

---

## Step 0: Coffee, then read this.

You said to be honest. I have been. Read `research/probability-model.md` after this checklist. It's the clearest read I have on what's likely vs. what's asked of us.

TL;DR: My expected value for June 1 is 7k–12k users. My 99th-percentile is 50k+. The strategy in this package maximizes the probability of the upper tail without gambling the median.

---

## Step 1: Verify the sprint deliverables exist (5 min)

Quick sanity checks:

```bash
cd /Users/$USER/Desktop/phyzik.app
git checkout caleb/growth-sprint-night1
git log --oneline -15
```

You should see these commits (most recent first):
- `growth-sprint: synthesis + priority + morning checklist + probability model (WS9)` [will be added momentarily]
- `growth-sprint: legal & compliance audit (WS8)`
- `growth-sprint: AI tooling audit (WS7)`
- `growth-sprint: marketing & growth plan (WS6)`
- `growth-sprint: app feature roadmap (WS5)`
- `growth-sprint: technical SEO + new pages + schemas + landing pages (WS4)`
- `growth-sprint: ASO audit (WS3)`
- `growth-sprint: growth case studies research (WS2)`
- `growth-sprint: competitor intelligence research (WS1)`

Verify the growth-sprint directory structure:

```bash
ls -R growth-sprint/
```

Expected contents:
```
00-OPEN-THIS-FIRST.md          (read this second)
01-priority-stack.md           (read this third)
morning-checklist.md           (this file)
ai-tooling.md                  (WS7)
legal-compliance.md            (WS8)
website-changes-log.md         (WS4 log)

research/
  competitors.md               (WS1)
  growth-case-studies.md       (WS2)
  aso-audit.md                 (WS3)
  probability-model.md         (WS9 honest read)

app-roadmap/                   (WS5)
  retention.md
  virality.md
  missing-features.md
  ui-recommendations.md

marketing/                     (WS6)
  referral-program.md
  ambassador-program.md
  influencer-tiers.md
  press-pr.md
  gym-partnerships.md
```

---

## Step 2: Verify the website changes (10 min)

Run the site locally:

```bash
npm install
npm run build  # confirms build still passes
npm run dev
```

Then open:
- http://localhost:3000 — verify home still renders, no regressions
- http://localhost:3000/press — should be the new press page
- http://localhost:3000/changelog — new changelog page
- http://localhost:3000/for/hyrox — Tenkara feature visible
- http://localhost:3000/for/bodybuilding — Sophia feature visible
- http://localhost:3000/for/women — Sophia + Hannah features
- http://localhost:3000/sitemap.xml — 9 URLs
- http://localhost:3000/robots.txt — allows /, disallows /preview/ and /redirect/, points to sitemap

Structured data verification:
- Open homepage dev tools → Elements → search `<script type="application/ld+json">`. Should see:
  - `@type: Organization`
  - `@type: WebSite`
  - `@type: MobileApplication`
  - `@type: FAQPage`
- Paste homepage URL into https://search.google.com/test/rich-results — should validate all 4.

---

## Step 3: Read, in order (45 min)

1. `00-OPEN-THIS-FIRST.md` (~15 min) — overview + top-level findings.
2. `01-priority-stack.md` (~5 min) — the action list.
3. `research/probability-model.md` (~10 min) — my honest read on the 50k goal.
4. Skim `website-changes-log.md` to understand what changed on the site (~5 min).
5. Skim one or two workstream docs that interest you most (~10 min).

Full reading of everything comes over the next few days as you work through the sprint.

---

## Step 4: Make the branch decision (5 min)

The branch `caleb/growth-sprint-night1` is local-only. Not pushed. Decide:

**Option A — push + PR:**
```bash
git push -u origin caleb/growth-sprint-night1
gh pr create --title "Growth sprint: research + website improvements + 90-day plan" --body "See growth-sprint/00-OPEN-THIS-FIRST.md"
```
Then review the diff on GitHub. Merge when ready.

**Option B — deploy the website changes to Vercel preview first:**
Vercel auto-deploys pushed branches. Push, review the preview URL, then merge.

**Option C — keep local, work from here:**
Review the changes locally. Merge when you want. No push needed yet.

Recommended: **Option B.** Push → Vercel preview → eyeball each new page → merge to main.

---

## Step 5: Schedule the week 1 action items (15 min)

Open calendar. Schedule these into this week:

- [ ] **Attorney consult.** 2 hours. Someone startup-experienced. Bring the draft privacy policy, ToS, FTC disclosure brief. Budget $500–1500 for the session. See `legal-compliance.md` §7.
- [ ] **Referral infra kickoff with Vijay.** 45-min planning meeting. Priority 1 on the stack. See `app-roadmap/virality.md` §1.
- [ ] **Ambassador sourcing with Sophia.** 60 min. Identify the 20 candidate names. See `marketing/ambassador-program.md` §3.
- [ ] **First 5 journalist pitches drafted + sent.** 90 min Tuesday + Thursday. See `marketing/press-pr.md` §4.
- [ ] **PostHog install.** Session with Vijay. 2 hours. See `ai-tooling.md` §4.4.

---

## Step 6: The non-negotiables (pin these)

Written in `research/probability-model.md` §8 — but pinning here:

1. **Sleep 7+ hours, 5 nights a week.** Sprint is 6 weeks. Week 6 execution quality depends on week 1 rest discipline.
2. **Weekly measurement Fridays.** Every Friday, review k-factor, CAC, retention. Honest numbers. No skipping.
3. **One P0 per week per person.** Don't try to ship everything. Focus ruthlessly.
4. **Don't push to main without review.** This sprint's work is deep but not infallible. Your eyes before merge.

---

## Step 7: If anything looks wrong

- **Build fails:** `npm run build` should pass. If not, check `app/layout.tsx`, `app/page.tsx`, `lib/structured-data.ts` for syntax. I verified the build before the WS4 commit.
- **A linked page 404s:** check `components/footer/Footer.tsx` — `/press` and `/changelog` links were added. If one is broken, the path in the component doesn't match an actual file.
- **Structured data fails Rich Results test:** diff `lib/structured-data.ts` against schema.org specs. Most common issue: field typing (URL vs. string).
- **You disagree with a strategic recommendation:** That's expected. The docs are rigorously researched but the calls are judgment calls. Override freely; the stack structure tolerates edits.

---

## Step 8: What I want you to know

This sprint is 9 workstreams, 14+ documents, ~40,000 words of planning, ~800 lines of website code changes, a working press page, 3 audience landing pages, a changelog, structured data, sitemap, robots. All grounded in real research, all built from your voice + your team's positioning.

It's the most aggressive single-session plan I've ever produced. I tried to be honest about what's achievable. I tried to prioritize relentlessly. I tried to leave you with a system you can execute, not a pile of ideas you'd have to recreate.

If any of it is wrong, trust your read of the product and market over mine. I've been working from research, your brand voice, and general knowledge of the consumer-app growth playbook. You have ground truth.

**Three specific things to push back on if they don't feel right:**

1. **The priority stack order.** I ranked by my model of impact × ease × urgency. Your model may weight differently.
2. **The probability estimates.** My 50k-by-June-1 probability is 2%. If you have information I don't — a deal in-progress, an influencer commitment, a paid budget I wasn't told about — that number moves.
3. **The scope in the 6-week app roadmap.** I assumed roughly 1 engineer. If Vijay has help, you can push further. If solo, cut more.

---

## Step 9: What I need from you in the first 24 hours

**For future sprints to be better:**
- Tell me what was actually useful.
- Tell me what you skipped and why.
- Tell me what I got wrong.

**Nothing to say back to me tonight — this is one-way. Capture the feedback however you want.**

---

## Step 10: Close the loop

When you're ready to start:

1. Push the branch → Vercel preview → merge to main.
2. Schedule this week's blocks.
3. Open `01-priority-stack.md` and start on item #1 (referral tier 1 with Vijay).

Everything in this package is in service of one number: how many real, retained users PHYZIK has by June 1.

Hit the number. Or hit 15k with good economics and compound from there. Either is a good outcome.

Go.

— Sprint, 2026-04-17 overnight.
