# AI Tooling Audit

**Owner:** Caleb (decisions), Vijay (technical integration), Hannah (content).
**Budget estimate:** $200–800/month across all tools, scaling with usage.
**Grounded in:** Current market snapshot (January 2026 / April 2026 tooling landscape). Where pricing or availability is uncertain, I flag.

This doc is a pragmatic audit of AI tools across PHYZIK's workflows — development, content, support, analytics, design. Not a "use AI for everything" manifesto. The goal: identify high-leverage leverage points, skip the commodity parts, stay honest about where AI makes real work worse.

---

## 1. Principles

### 1.1 Where AI adds leverage

- **Content at volume, low-stakes.** Caption variants, FAQ drafts, email copy iterations.
- **Code boilerplate / boring work.** UI scaffolding, CRUD, type generation, test stubs.
- **Research synthesis.** Competitor summaries, trend scanning.
- **Cross-referencing + indexing.** Linking research docs, pulling quotes from transcripts.
- **Design ideation, not design execution.** Moodboards, variations, wireframes at speed.

### 1.2 Where AI adds friction or hurts

- **Voice-critical content.** Marketing copy where brand tone matters — AI produces the generic version of everything and it reads that way. Do manually.
- **Community / user messaging.** Automated responses to lifters hurt trust. Hand-write.
- **Medical / programming claims.** AI will confabulate specifics. Sophia + Caleb validate all programming content.
- **Code in high-stakes paths.** Auth, payments, health-data handling — don't vibe-code. Write it. Audit it.
- **Long-term decisions.** Product strategy, pricing, roadmap. AI is a thinking partner; never the decider.

### 1.3 The operating rule

If the output will be read by a user or investor, human approval is mandatory. If it's an internal research doc, AI can draft, human edits.

---

## 2. Tools by workflow

### 2.1 Development — primary

**Claude Code (Anthropic).**
- **Why:** Anthropic's coding agent. Strong on Next.js, TypeScript, React Native. The tool writing this sprint (dogfooding).
- **Pricing:** Included with Claude API or Max subscription ($20/mo). Pro plan with API access ~$100/mo for team tier.
- **Fit for PHYZIK:** Native for the web codebase (Next.js 15 App Router, TypeScript). Handles multi-file changes, maintains context across a session. Has working memory between turns.
- **Verdict:** Primary dev AI. Vijay should adopt for web + app tasks.

**Cursor (cursor.com).**
- **Why:** IDE with inline AI suggestions + agent mode. Native inline completions + multi-file edits.
- **Pricing:** $20/mo Pro, $40/mo Business.
- **Fit:** Cursor is excellent for high-velocity feature work where you want inline suggestions 100 times an hour. Competes with Claude Code but has different modal — IDE-native vs. CLI-agent.
- **Verdict:** Either Cursor or Claude Code; Vijay's choice. Probably not both. If Cursor is already the habit, stay with Cursor + add Claude API access for longer agentic tasks.

**GitHub Copilot.**
- **Why:** Inline suggestions in VS Code.
- **Pricing:** $10/mo individual, $19/mo business.
- **Verdict:** Skip if using Cursor (redundant). Fine as cheap alternative if budget-strapped.

### 2.2 Development — supplementary

**Claude MCP servers (Model Context Protocol).**
- The MCP ecosystem is emerging fast. PHYZIK-relevant servers:
  - **GitHub MCP** — Claude can read/write issues, PRs directly.
  - **Supabase MCP** — Claude can query the Supabase DB, run migrations with confirmation. Referenced in MCP instructions.
  - **Notion MCP** — Claude can read/write the team Notion.
  - **Vercel MCP** — Claude can check deployments, build logs.
  - **Slack / Gmail MCPs** — Claude can draft messages (always human-review before send).
  - **PostHog MCP** ([ASSUMPTION — availability verify before installing]) — Claude can query product analytics.
- **Verdict:** Install the Supabase, Vercel, GitHub MCPs for Vijay in Claude Code. Massive leverage for daily development. Notion MCP for Caleb.

**Supabase Studio AI.**
- **Why:** Supabase's SQL assistant. Given a prompt, writes SQL. Given a query, explains it.
- **Pricing:** Free with Supabase.
- **Verdict:** Use when writing ad-hoc queries for analytics.

**v0.dev (Vercel).**
- **Why:** UI-to-code. Generates shadcn-style React components from natural language + image input.
- **Pricing:** Free tier + $20/mo Pro.
- **Fit:** PHYZIK's marketing site already has a strong component library; v0 is most useful for one-off marketing pages where velocity > craft. Don't use for app components.
- **Verdict:** Occasional. Probably not a habit.

### 2.3 Content — copy + marketing

**Claude (web interface + API).**
- **Why:** Long-form writing partner. Handles brand voice well if given a strong voice brief upfront.
- **Pricing:** $20/mo Pro. Team: $30/user/mo (5+ seats).
- **Fit:** Caleb + Hannah's content drafts (email, blog posts, landing page variants). Always hand-edit for voice.
- **Verdict:** Primary content AI. Best of the current bunch for nuanced long-form.

**ChatGPT (web + API).**
- **Why:** Similar capability to Claude. Stronger on some verticals; weaker brand-voice on others (tends sweeter, more corporate).
- **Pricing:** $20/mo Plus. $30/user/mo Team.
- **Verdict:** Secondary option. Good for specific tasks where Claude's output doesn't land. Not a daily driver unless Caleb prefers its UX.

**Perplexity.**
- **Why:** Research + synthesis with sourced citations. Better than ChatGPT for current-information research.
- **Pricing:** Free + $20/mo Pro.
- **Fit:** Fact-checking marketing claims, market research, journalist background.
- **Verdict:** Use for research tasks. Especially good for "who is this journalist" background prep for press outreach.

**Jasper / Copy.ai / marketing-specific tools.**
- **Verdict:** Skip. Inferior to general-purpose LLMs for PHYZIK's content needs. Their UX and templates are for marketers writing AdWords at scale — not us.

### 2.4 Content — video + image

**Runway ML.**
- **Why:** Video generation + editing AI.
- **Pricing:** Free tier, $15–95/mo paid.
- **Fit:** Variant generation for ad creative, motion graphics for Reels.
- **Verdict:** Occasional. Low priority pre-launch; bigger value at scale.

**Pika Labs + Sora (OpenAI).**
- Similar space. Watch, don't commit yet.
- **Verdict:** Experimental only.

**Midjourney / DALL-E / Flux.**
- **Fit:** PHYZIK's brand is photo-based (real athletes, real gyms). AI-generated imagery undermines brand. **Explicit no for user-facing content.** Acceptable for internal moodboarding, never for production use.

**CapCut + Descript.**
- **Descript:** Audio/video editing by editing the transcript. AI-powered but not generative.
- **Pricing:** $12/mo Hobbyist, $30/mo Pro.
- **Fit:** Podcast clip editing, Reel editing for Hannah.
- **Verdict:** Yes, if podcast strategy ships (per `press-pr.md`). Caleb → Hannah handover.

### 2.5 Design

**Figma AI.**
- **Why:** Built-in to Figma. Prototype variants, copy suggestions, layout adjustments.
- **Pricing:** Included with Figma.
- **Verdict:** Use when using Figma. Low friction.

**Galileo AI / Uizard.**
- UI-from-prompt tools.
- **Verdict:** Skip. v0.dev is better for PHYZIK's stack.

### 2.6 Product + analytics

**PostHog.**
- **Why:** Product analytics with AI query interface + session replay.
- **Pricing:** Free tier to 1M events/mo. ~$450/mo at 10M events.
- **Fit:** Not installed yet (per `website-changes-log.md`). **Recommended install** for app-side analytics.
- **Verdict:** Install in week 1–2 of app launch. Non-negotiable — we need product analytics to measure the retention + virality roadmap.

**Amplitude.**
- **Why:** Enterprise product analytics.
- **Pricing:** Free to 10M events/mo → $49k+/yr enterprise.
- **Verdict:** Skip unless PostHog breaks at scale.

**Mixpanel.**
- Similar to Amplitude. Skip for similar reasons.

### 2.7 Operations

**Notion AI.**
- **Why:** Included with Notion. Summarizes docs, drafts content, Q&A across workspace.
- **Pricing:** $10/user/mo addon on top of Notion.
- **Fit:** Team Notion (if PHYZIK has one). Useful for summarizing weekly team updates.
- **Verdict:** Yes if team has Notion. Modest.

**Granola / Otter / Fathom (meeting AI).**
- Record + transcribe + summarize meetings.
- **Pricing:** $10–20/mo.
- **Fit:** Partnership calls, investor calls, journalist interviews.
- **Verdict:** Pick one. Otter is the incumbent; Granola is rising. Either works.

**Fireflies.**
- Like Otter. Pass.

**Superhuman AI.**
- Email client with AI drafting.
- **Pricing:** $30/mo.
- **Verdict:** Skip unless Caleb is already a Superhuman user. Normal Gmail + Claude draft workflow works.

### 2.8 Customer support (future)

**Intercom Fin.**
- AI customer support agent.
- **Pricing:** Intercom + Fin: $99/mo+ team.
- **Verdict:** Skip pre-launch. When user support volume requires it (5k+ users with active tickets), evaluate.

**Gorgias, Crisp, Chatwoot with AI.**
- Similar space. Skip for now.

---

## 3. Stack recommendation — ranked by priority

### 3.1 Install in week 1

| Tool | Use | Cost | Owner |
|---|---|---|---|
| Claude Pro + Claude Code | Dev + content | $20–100/mo | Caleb + Vijay |
| Cursor or stay-with-VSCode+Copilot | Dev | $0–20/mo | Vijay |
| Supabase MCP for Claude | Dev | Free | Vijay |
| GitHub MCP for Claude | Dev | Free | Vijay |
| Perplexity Pro | Research | $20/mo | Caleb |

**Monthly total:** $60–170.

### 3.2 Install in weeks 2–4

| Tool | Use | Cost | Owner |
|---|---|---|---|
| PostHog (app + web events) | Product analytics | $0 | Vijay |
| Granola or Otter | Meeting transcription | $10–20/mo | Caleb |
| Notion AI (if team on Notion) | Docs | $10/user/mo | Caleb |

**Additional monthly:** $40–80.

### 3.3 Install at 5k+ users

| Tool | Use | Cost | Owner |
|---|---|---|---|
| PostHog paid tier | Scale analytics | $0–450/mo | Vijay |
| Descript | Content editing | $30/mo | Hannah |
| v0.dev Pro | UI scaffolding for campaign pages | $20/mo | Caleb |

**Additional monthly:** $50–500.

### 3.4 Do not install

- **AI customer support** (Intercom Fin, etc.) pre-20k users.
- **Jasper / Copy.ai** — inferior to general LLMs.
- **Galileo / Uizard** — worse than v0.
- **AI-generated imagery for user-facing content** (Midjourney outputs on the marketing site, etc.).
- **Any tool promising "10× your growth with AI."** Red flag.

---

## 4. Specific workflows — concrete wiring

### 4.1 Development with Claude Code

**Recommended daily workflow for Vijay:**

1. Start Claude Code in the project root.
2. Delegate to subagents: `general-purpose` for broad exploration, `Plan` for design-first tasks, `Explore` for codebase search.
3. MCP servers active:
   - Supabase (for DB queries, migrations, typegen).
   - GitHub (for issue/PR management).
   - Vercel (for deployment health).
4. Prefer "understand first, then change" — always use Read/Grep before Edit.
5. Prune memory: the `/memory` directory should reflect current reality. Stale facts drift.

**Anti-pattern:** Pressing "accept all" on agent changes without reading them. AI-generated code must be reviewed before merge, especially in auth and payment paths.

### 4.2 Content creation with Claude

**Recommended workflow for Caleb's email drafts:**

1. Prompt with explicit brand voice primer: "Write in PHYZIK's voice — evidence-backed, respectful, direct, not shouty. Avoid fitness clichés. Write the way a good strength coach talks to an adult lifter."
2. Include 2–3 examples of existing PHYZIK copy. AI catches voice from examples better than rules.
3. Generate 3 variants.
4. Hand-edit hard. Every sentence.
5. Read aloud before sending. Voice holds up in speech.

### 4.3 Research with Perplexity

- Use for background checks on journalists, competitor updates, trend verification.
- Don't trust uncited claims — click through to sources.
- Good pattern: "What's the current state of [Hyrox participation growth in 2026]? Cite sources." Then check sources manually.

### 4.4 Analytics with PostHog

- Define 6 events on install:
  1. `onboarding_started`
  2. `onboarding_completed`
  3. `first_workout_started`
  4. `first_workout_completed` (activation event)
  5. `session_logged`
  6. `share_card_shared`
- Build the funnel: install → onboarding_completed → first_workout_completed.
- Measure weekly retention cohorts.
- Session replay: don't enable for all users; sample 1-5%. Privacy + cost.

---

## 5. Privacy + legal implications

### 5.1 User data in AI tools

- **Never paste user PII into ChatGPT / Claude web.** Both save chats by default (Claude has an "API / workspace" option with no training use — use that for sensitive work).
- **Supabase MCP + Claude:** Queries hitting user data are sent to Claude's backend. Confirm data processing agreement coverage. Anthropic's enterprise terms cover this; standard Pro doesn't. Check.
- **Audio transcription (Otter, Granola):** Recording a call = consent required in many jurisdictions. Always ask before recording.

### 5.2 Training opt-out

- Anthropic: API + Claude Team/Enterprise = no training on your data. Free/Pro = opted out by default (verify current policy).
- OpenAI: API = no training. ChatGPT web = opted out by default since 2023 (verify).
- Default stance: **never assume anything you send to a consumer AI chat won't be used for training.** Run internal tasks through API endpoints with explicit no-training agreements, especially for anything user-data-adjacent.

### 5.3 Disclosure

- **User-visible AI-generated content:** If any AI-generated text reaches users (replies, emails, push notifications), disclose where appropriate. EU AI Act (effective various dates through 2026–2027) has disclosure requirements worth tracking.
- **See `legal-compliance.md`** (WS8) for the full picture.

---

## 6. Things to avoid

1. **Using AI for programming advice, rep schemes, exercise selection.** The app's programming is an expert system, not a vibes prediction. Sophia owns programming truth; AI is her drafting tool, not her replacement.
2. **AI-written App Store responses to reviews.** Users notice. Kills trust.
3. **AI-generated support answers to user questions.** Especially wellness/injury questions. Liability + trust.
4. **Auto-generated Instagram replies.** IG algorithm penalizes + community notices.
5. **Letting AI suggest prices, pricing structure, or business-model changes.** Sounds informed; is uninformed. Caleb + team decide.
6. **Over-tooling.** Install one tool, use it for 2 weeks, install the next. Stack-sprawl is a real cost.

---

## 7. Stack total cost

**Minimal (sprint-only):**
- Claude Pro ($20) + Perplexity Pro ($20) + Cursor Pro ($20) = **$60/mo**.

**Sane (post-launch):**
- Claude Team ($30/user × 3) + Perplexity ($20) + Cursor ($20 × 2) + Notion AI ($30) + Granola ($18) = **~$200/mo**.

**At-scale (post-10k users):**
- Above + PostHog paid ($100–450) + Descript ($30) + extras = **~$400–800/mo**.

---

## 8. Caleb's decisions needed

- [ ] **Does team use Notion?** (Required to install Notion AI. If they use Linear or Airtable, pick equivalent.)
- [ ] **Claude plan choice:** Individual Pro × 3 vs. Team (5-seat minimum).
- [ ] **Analytics choice:** PostHog free tier first, upgrade at 10M events/mo. Confirmed?
- [ ] **Session replay privacy stance:** Sample what %? Exclude what fields?
- [ ] **AI-disclosure policy:** Any user-facing AI content gets disclosed in small print. Who approves what?

---

## 9. 90-day stack adoption plan

### Day 1–7
- Vijay adopts Claude Code + MCPs (Supabase, GitHub, Vercel).
- Caleb adopts Claude Pro + Perplexity Pro.
- Document voice primer for content-AI use (1-pager, sits in Notion/wherever).

### Day 8–21
- PostHog installed, funnel events defined, first weekly review run.
- Granola in use for ambassador/partner calls.
- Hannah trained on Descript (once podcast strategy ships).

### Day 22–60
- Evaluate stack friction. Anything unused? Cut.
- Session replay sampled in PostHog.
- Review user-facing AI disclosure stance.

### Day 60–90
- If scaling hits 10k+ users, reassess analytics + support needs.
- Quarterly tool audit: what's earned its cost, what hasn't.

---

## 10. One-paragraph pitch for Caleb's internal use

> "We're using AI as leverage, not as a strategy. Claude + Cursor for dev. Claude + Perplexity for content and research. PostHog for analytics. One meeting-transcription tool. We're not buying every 'AI-powered' tool on the market — most are worse than general-purpose LLMs with better UX. We never use AI for voice-critical user content, programming claims, or high-stakes code. Budget: $60/mo during sprint, $200/mo post-launch, $400–800/mo at scale."

---

## 11. Risks

1. **Over-reliance on AI drafts.** Team ships AI-generic copy as user-facing content. Mitigate: hand-edit everything user-facing. Don't ship the first draft.
2. **Accidental user-data exposure to consumer AI.** Pasting a user's info into ChatGPT. Mitigate: policy + training. API endpoints for anything sensitive.
3. **Tool-stack sprawl.** Installing a new AI tool every week costs attention + money. Mitigate: quarterly audit. One tool in, one tool out.
4. **AI-generated code bugs in production.** Especially in auth, payments, health data. Mitigate: review discipline. Code written by AI still belongs to the human who committed it.
5. **Vendor lock-in.** Building workflows that only work with Tool X. Mitigate: prefer open-standard tools (MCP, PostHog > closed-stack).
