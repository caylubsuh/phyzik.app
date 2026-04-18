# Website Changes Log — Overnight Growth Sprint

**Branch:** `caleb/growth-sprint-night1`
**Build status:** passing (`npm run build` clean, all 18 routes generated).

Every change is grounded in Workstream 1-3 research (`research/competitors.md`, `research/growth-case-studies.md`, `research/aso-audit.md`). Rationale included per change.

---

## Technical SEO

### `app/sitemap.ts` — NEW
Generated sitemap at `/sitemap.xml`. Includes all 9 public routes with appropriate `priority` and `changeFrequency`. New routes (`/for/hyrox`, `/for/bodybuilding`, `/for/women`, `/press`, `/changelog`) are in. `/preview` and `/redirect` excluded (internal).

**Why:** Google needs an index. Before this commit, nothing told it about `/community`, the audience pages, or the press page.

### `app/robots.ts` — NEW
Generated `/robots.txt`. Allows all crawlers. Disallows `/preview/` and `/redirect/`. Points to sitemap.

**Why:** Basic hygiene + explicit sitemap declaration.

### `lib/structured-data.ts` — NEW
Centralized JSON-LD schema module exporting `organizationSchema`, `softwareApplicationSchema`, `personSchema`, `faqSchema`, `websiteSchema`, and `jsonLdScriptProps` helper.

- **Organization** — declares legal entity, founders, logo, contact points, sameAs pointers to Instagram + App Store.
- **WebSite** — declares the site itself (enables sitelinks / search box eligibility).
- **MobileApplication** — declares iOS app details: bundle ID, category (HealthApplication/FitnessApplication), price (free), screenshots array, aggregate rating.
- **FAQPage** — structured FAQ data, renders rich-result-eligible.

**Why:** Rich results in Google search (FAQ snippets, app card, knowledge-panel eligibility). Baseline SEO that every well-structured site has and PHYZIK did not.

### `app/layout.tsx` — UPDATED
- Added Organization + WebSite JSON-LD globally in `<head>`.
- Expanded metadata: `keywords` array, `authors`, `creator`, `publisher`, `alternates.canonical`, `robots` with googleBot config, `category: 'health'`.
- Switched `title` to templated format (`title.template: '%s — PHYZIK'`) so subpages get brand-suffixed titles automatically.
- Added `locale: 'en_US'` to OG, `site: '@phyzikapp'` to Twitter.
- `viewport.colorScheme: 'dark'`.

**Why:** The listing's metadata was minimal. Per the 2026 ASO guide, title templating + category declaration + explicit canonical is table-stakes.

### `app/page.tsx` — UPDATED
- Injected MobileApplication + FAQPage JSON-LD at the top of the homepage.

**Why:** FAQ rich-results are high-value in search — the eligible snippet can significantly increase CTR. See `research/aso-audit.md`.

### `lib/faq.ts` — NEW
Centralized FAQ data array, consumed by both the FAQ component (client-side UI) and the FAQPage schema (static).

**Why:** Avoid drift between FAQ content and schema. Previously only in the FAQ component, which meant schema couldn't consume it.

### `components/faq/FAQ.tsx` — REFACTORED
Now reads from `@/lib/faq`. No UX change.

---

## Share cards / metadata

Every new page sets explicit `metadata` including `title`, `description`, `alternates.canonical`, and `openGraph`. No new OG images generated tonight (default /og.png inherits). `app/opengraph-image.tsx` was not modified — it produces the homepage share card correctly.

**Potential follow-up (P2):** Generate per-page OG images for `/for/*` and `/community`. `opengraph-image.tsx` can be copied to each route.

---

## New pages

### `app/press/page.tsx` — NEW
Full media kit scaffold:
- Hero + boilerplate description
- Quick-reference "facts" dl (founded, category, platform, pricing, exercise counts, HQ, App Store URL)
- Founder bios (pulled from `lib/team.ts`)
- Downloadable logos (4 variants) with usage guidance
- Screenshot grid (7 marketing screenshots)
- Coverage section scaffolded (ready to populate)
- Contact CTA → press@phyzik.app

**Why:** WS6 `marketing/press-pr.md` will recommend outreach to journalists; journalists expect a press page. This removes a friction point before Caleb even starts pitching.

**Action for Caleb:** When he has coverage, drop entries into the "In the press" section.

### `app/changelog/page.tsx` + `lib/changelog.ts` — NEW
Versioned release notes. Scaffolded with v1.0.0, 1.1.0, 1.1.1 based on App Store "What's New" + inferred launch feature set.

**Why:** Changelogs do multiple jobs — SEO surface area ("what's new in PHYZIK?"), credibility signal for power users, press hook for update cycles. Every serious consumer app has one.

**Action for Caleb:** Update `lib/changelog.ts` with each app version as they ship.

### `app/for/hyrox/page.tsx` — NEW
Audience landing page.
- Hero: "Every discipline, one app."
- 3 benefits: stations coverage, hybrid programming, pace + performance in one view
- Tenkara feature block (Stockholm June 14 2026)

### `app/for/bodybuilding/page.tsx` — NEW
- Hero: "Hypertrophy science in your pocket."
- 3 benefits: MEV/MAV/MRV, mesocycle design, auto progressive overload
- Sophia feature block

### `app/for/women/page.tsx` — NEW
- Hero: "Training built for you."
- 3 benefits: same science, flexible scheduling, honest feed
- Sophia + Hannah feature blocks

**Why (all three):** Audience-targeted landing pages serve (a) ads — if Caleb ever runs Meta/Google ads he lands traffic on the matching audience's page, (b) SEO — long-tail queries like "Hyrox training app" or "bodybuilding tracker app" should land on targeted pages not the generic homepage, (c) partnerships — Caleb can link partners to the relevant audience page.

**Shared components:**
- `components/audience/AudienceHero.tsx`
- `components/audience/AudienceBenefits.tsx`
- `components/audience/AudienceFeatureFeature.tsx`

Reusing existing Nav, Footer, FinalCTA, Pill, Section, Container, AccentGlow, FadeUp primitives — no brand-voice rewrites, no duplicated design work.

---

## Nav + Footer updates

### `components/footer/Footer.tsx` — UPDATED
Added `/press` and `/changelog` links between Community and Privacy.

### `components/nav/Nav.tsx` — UNCHANGED
Per sprint spec: don't clutter primary nav with press/changelog. Kept as Features / Community / Privacy.

---

## Performance & Lighthouse notes

Build analysis (`npm run build`):
- Homepage: 15.3 kB (183 kB First Load JS). Healthy.
- Audience pages (`/for/*`): 131 B page-specific, 172 kB total — excellent.
- Static rendering for every page except `/opengraph-image` (dynamic, correct — it generates the PNG on demand).
- Next/Image is used across community + features. The press page uses `<img>` for logos (acceptable — they're small brand files).

**Known warning:** `app/opengraph-image.tsx` uses `<img>` intentionally (it's inside a server-only OG generator, Next/Image doesn't run there). Warning is correct to ignore.

**Potential follow-up:** No Lighthouse run was performed overnight (would need a running dev server + Chrome). Recommended: Caleb runs `npm run dev` and checks Lighthouse in Chrome DevTools in the morning. Expect LCP + CLS to be clean given next/image usage; look at JS bundle for unused motion imports on audience pages (they don't animate as heavily as the homepage — could save ~20-30 kB with tree-shaking audit).

---

## Social proof band — deferred

Per spec: **did not add** a "Trusted by N lifters from N countries" band because we don't have honest numbers yet. When we have real metrics, drop this between `<Hero />` and `<div id="features">` in `app/page.tsx`.

Scaffold the component later as `components/social-proof/TrustBand.tsx` with three metric slots.

---

## Analytics

`@vercel/analytics` already installed and wired in `app/layout.tsx`. No changes.

**Recommended additions (require Caleb approval — not installed tonight):**
- **PostHog** — product analytics, funnel analysis, session replay. Free up to 1M events/mo. Their MCP server is also on the recommendations list (`ai-tooling.md`).
- **Fathom** — privacy-first web analytics, $14/mo. Alternative if PostHog feels heavy.

Do not install without Caleb's call on:
1. Whether privacy policy needs updating (minor — we already disclose analytics collection in the privacy policy).
2. Which of PostHog vs. Fathom fits the team's workflow.

---

## What's committed on this branch

```
4213349 growth-sprint: ASO audit (WS3)
388c64a growth-sprint: growth case studies research (WS2)
7cabd6b growth-sprint: competitor intelligence research (WS1)
```

This log plus the code will be committed as `growth-sprint: website improvements (WS4)`.

---

## Post-merge checklist for Caleb

1. Deploy the branch to a Vercel preview, visit each new route:
   - `/press`, `/changelog`, `/for/hyrox`, `/for/bodybuilding`, `/for/women`
2. Verify OG cards render (use https://www.opengraph.xyz/ to preview).
3. Test sitemap: `/sitemap.xml` should return 9 URLs.
4. Test robots: `/robots.txt` should allow all, list sitemap URL.
5. Paste one page's URL into Google Rich Results Test (https://search.google.com/test/rich-results) to verify FAQ + App schema.
6. Submit sitemap to Google Search Console.
7. Merge to main when confident.
