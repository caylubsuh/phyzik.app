# App Roadmap — Virality

**Owner:** Vijay (CTO)
**Horizon:** 6 weeks to 50k target; this doc prioritizes for that window.
**Grounded in:** `research/competitors.md` (§Hevy §Strava §Strong), `research/growth-case-studies.md` (§Strava §Hevy §Cal AI §BeReal §Duolingo).

---

## The gap we're trying to close

A retained user is worth ~1. A retained user who brings a friend is worth ~2. A retained user who brings a friend who brings a friend is the only path from 5k to 50k in six weeks.

Consumer-app case studies (`growth-case-studies.md`) agree on one number: sustainable product-led growth requires a **k-factor ≥ 0.5** — meaning every 10 users bring at least 5 new users on their own. PHYZIK's current k-factor is unknown but likely near zero: the app has no referral loop, no native share surfaces, and squad invites are not instrumented as a growth mechanic.

Every feature in this doc targets one of three loops:

| Loop | Mechanic | Target metric |
|---|---|---|
| **Invite loop** | Existing user → friend via DM/text | Invites sent per WAU |
| **Content loop** | Existing user → public post → non-user sees it → installs | Shares per WAU × install rate per share |
| **Squad loop** | User A creates squad → invites 3 → 2 join → each invites 3 | Squad join rate × squad avg size |

All three need to move. The content loop is the most scalable (no friction between user and audience). The invite loop is the most predictable (direct ask converts best). The squad loop is the stickiest (once joined, retention jumps — per `retention.md`).

---

## 1. Referral program — P0 (week 1–2)

### 1.1 The mechanic

**Tier 1 (no reward, always on):**
Every user gets a referral code on signup. Sharing it pre-fills an invite link: `phyzik.app/i/{code}`. When someone installs via that link, both users get a **squad connection** (auto-friend, not auto-squad — friend is softer). The referrer sees "+1 friend joined you on PHYZIK" as a push.

This is the baseline. No reward. Just a seamless "bring a friend" action.

**Tier 2 (reward-backed, launches once we can afford it):**
Referring N friends (N joining and completing one workout) unlocks:
- **3 friends:** "Founding Member" badge visible on profile + Floor posts. Persistent social signal.
- **5 friends:** 1 month Pro (when Pro exists — until then, "Founding Member Plus" frame on profile card).
- **10 friends:** Physical item (PHYZIK hoodie, low-cost, drop-ship via Printful). Only the first 500 10-referral users get this — scarcity.

Rationale per `growth-case-studies.md`:
- Dropbox-style storage rewards don't map to fitness apps (no "space" to give more of).
- Cash rewards attract affiliate farmers, not real users. Avoid.
- Status rewards (badges, profile frames) were the most durable driver in BeReal + Strava's rise. They signal early-adopter identity and compound socially.
- Physical merch at a threshold (Whoop did this with free bands for bringing 3 members in 2019) has unusually high completion rate because the goal is tangible.

**What — build:**
1. Referral code generation on signup (hash of userId + salt, 6 chars).
2. Deep link handler for `phyzik.app/i/{code}` → App Store → cold-start attribution via paste or AppsFlyer/Branch/AppStore-Affiliate.
3. Post-install attribution: first 24h, the new user sees a prompt: "Did a friend send you? Tap their code to connect." (paste-to-claim fallback — covers iOS App Store's destruction of UTM on install).
4. "Invites sent / pending / joined" state on profile, server-side.
5. Push when a referral completes: "Sarah joined PHYZIK via you. First workout tomorrow — hype her up."
6. Badge system on Floor posts and profile card.

**Why:** The biggest flaw in cold-launch apps isn't that referral *doesn't work* — it's that referral *doesn't exist*. Hevy did not add referral until after 100k users, and it cost them 8 months of compounding. See `competitors.md` §Hevy.

**Touches:** Onboarding flow, profile screen, Floor post card, push notification service, new DeepLink route, attribution infra.

**Complexity:** Tier 1: ~1.5 weeks (attribution is the hard part). Tier 2: +1 week for badge UI + threshold logic.

**Dependencies:** Branch.io or AppsFlyer SDK (or Apple's SKAdNetwork + paste-to-claim if lean). Deep link setup on phyzik.app.

### 1.2 The anti-patterns

- **Don't make referral a gated "premium" feature.** The whole point is friction-free sharing.
- **Don't copy Cal AI's "share to unlock" — that's coercive for a fitness app.** See `growth-case-studies.md` §Cal AI — their mechanic works because the app is the result (the photo is the moat). PHYZIK is a program; gating the program is anti-trust.
- **Don't over-engineer attribution.** A paste-to-claim fallback handles 95% of the value. Fight for the remaining 5% later.

---

## 2. Easy-share mechanics — P0 (week 1–3)

### 2.1 Workout share card (the existing win)

The workout share card is already good (per internal review). The issue is it's **discoverable, not unavoidable.**

**What — build:**
1. **Post-workout auto-prompt.** After the last set is logged and the session summary loads, a non-dismissible prompt: "Share today's work." Three tap targets: Instagram Story / iMessage / Skip. Skip is one tap, not hidden. This converts "nice to share" into "default to share."
2. **Smart variants.** The card auto-selects its highlight based on what happened in the session: a PR surfaces the PR frame; high-volume day surfaces the volume stat; long session surfaces the duration frame. Reduces generic share cards flooding feeds.
3. **Unboxed branding.** The card includes `@phyzikapp` handle + a QR code linking to `phyzik.app/i/{referrerCode}`. Non-users scanning it land on install flow with referrer attributed. This is the single most leveraged change on this roadmap — turn every share into an install opportunity with attribution.
4. **Template customization.** 3 themes: Minimal (black), Accent (purple glow), Personal (user's accent color + photo from gym if attached). Users with theme choice share 2–3× more per `growth-case-studies.md` §Strava analysis.

**Why:** Strava's ride summary image drove ~40% of their organic installs in 2014–2016. The card did two things: it looked good enough that athletes *wanted* to share, and it was branded so each share was an ad. PHYZIK's card already hits #1. This turns #2 on.

**Touches:** Post-workout screen, share sheet, card rendering (svg → png, server-side for speed), QR code generation (client-side, simple), deep-link handler.

**Complexity:** 1 week for prompt + branding + QR. Smart variants: +3 days. Template customization: +3 days.

**Dependencies:** Post-workout flow must exist (it does). Referral code system (§1).

### 2.2 PR / milestone celebration → share

The Floor already surfaces PRs. We need PR moments to be *irresistibly* shareable.

**What — build:**
1. **PR confirmation screen.** When a set is logged that sets a new PR, the app interrupts with a full-screen celebration: animated lift number, previous vs. new, confetti (tasteful, accent-color only — no rainbow). Two buttons: Share / Keep lifting. Default focus = Share.
2. **PR share card.** Dedicated template: big lift, exercise name, relative improvement ("+5kg on Back Squat — new 5RM"), user handle, PHYZIK wordmark. Instagram Story format first, then 1:1 for feed.
3. **Floor auto-post for PRs.** Every PR, by default, posts to the user's Floor. Opt-out, not opt-in. This is the content loop's main supply.
4. **Streak milestones.** Weeks 4, 8, 12, 26, 52 trigger the same celebration → share flow.

**Why:** The PR moment is the highest-emotion, highest-pride moment a lifter has. That's the moment they actually want to tell someone. Every week a user skips the app, that moment doesn't happen. Every week they use the app, the app is the *place* that moment happens — and the share card travels everywhere that friend sees it.

**Touches:** Set logger, PR detection service, celebration UI, Floor posting pipeline, share sheet.

**Complexity:** 1 week. PR detection is already partially implemented (it's visible on Floor). Wire the celebration + share flow.

**Dependencies:** The Floor post pipeline must handle auto-generated posts (not just manual). The share card renderer (§2.1).

### 2.3 Weekly Wrapped — P1 (week 4)

Copy the Spotify Wrapped / Strava Year in Sport / Duolingo "Year in Review" play, but **weekly.**

**What — build:**
1. Every Sunday 6pm local, users get a push: "Your week on PHYZIK — tap to see." Opens a 6-slide story: volume done, top lift, PRs, session count, a fun stat ("37% of your volume was legs"), share button on last slide.
2. Monthly version (first Sunday of each month) is richer.
3. Quarterly + annual recap follow.

**Why:** Wrapped-style recaps do three things: they create a habit touchpoint (every week you come back for one reason), they create share-native content (story-format is built for Stories), and they generate content gravity for non-users (if 10% of a lifter's following is also lifters, the Wrapped share pulls them in).

**Touches:** Weekly aggregate service, story UI, push notification schedule, share card variant.

**Complexity:** 1.5 weeks. The aggregate is computationally cheap (per-user, per-week stats). The story UI is the main lift.

**Dependencies:** Set logging data (exists). Push scheduling infra.

---

## 3. Squad mechanics — P0 (week 2–4)

### 3.1 The squad invite flow

Squads are PHYZIK's closest analog to Strava's "club" and Hevy's "friends" — the social unit. They're also the stickiest retention lever (per `retention.md`: squad-joined users stay 3× longer).

The current flow (inferred, not observed) is likely: create squad → search users → send invite → wait. That's a 4-step, high-friction funnel. Every step halves conversion.

**What — build:**
1. **Create-and-invite in one step.** "Create squad" → name → "Invite 3 friends to start" as required step with tap targets: Contacts / iMessage link / Paste handle. Squad isn't "created" until ≥1 invite is pending. This forces the loop.
2. **Invite-via-link.** Generate `phyzik.app/s/{squadId}` — opens in App Store → post-install lands in squad join confirmation. Eliminates the "what's your username" friction.
3. **Auto-suggest squad candidates.** Use the friend graph (referral connections) + gym location (if shared) to suggest likely squad members during creation.
4. **Lower the threshold.** Squads currently probably need a name, icon, etc. For MVP, a squad can start with 1 member + 1 pending invite. The icon comes later.

**Why:** Every consumer social app that grew past 1M users started by crushing friction on the "bring your first friend" action. BeReal's single-tap "invite everyone in your contacts" is aggressive — we won't go that far — but `phyzik.app/s/{squadId}` shareable via iMessage is the minimum bar.

**Touches:** Squad creation screen, squad join flow, invite backend, deep-link handler.

**Complexity:** 1–1.5 weeks. The deep link is the hard part; the UI is straightforward.

**Dependencies:** Deep link infrastructure (shared with §1 referral).

### 3.2 Squad activity feed + accountability

Once inside a squad, retention depends on feeling like something's happening.

**What — build:**
1. **Squad Floor.** A filtered Floor view scoped to the squad — sessions, PRs, streaks from squad members. Pinned at the top of the Floor tab with unread counter.
2. **Squad leaderboards.** Week-over-week: most sessions, most volume, best consistency. Reset every Monday. Public to squad only, not globally.
3. **"Hype" react.** A single react button (flame emoji or accent symbol) on squad members' sessions. Frictionless. Each hype sends a push to the recipient. This is the squad's dopamine pump.
4. **Squad push.** When a squad member hits a PR, the whole squad gets a push: "Sarah just hit a new deadlift PR — hype her." One tap. The hype pushes back to Sarah.

**Why:** Squad activity is the retention-to-virality bridge. If a squad is dead, the user churns. If a squad is alive, every session they share is an organic tap on the group's attention. Strava's club notifications and kudos system are the highest-engagement actions on the platform — users check who kudos'd them more than they check their own stats.

**Touches:** Floor (filter state), new leaderboard screen, push service, reactions data model, new DB writes on PR events.

**Complexity:** 2 weeks.

**Dependencies:** Floor component already exists. PR detection (§2.2).

### 3.3 Squad challenges — P1 (week 5–6)

**What — build:**
1. **Squad vs. squad challenge.** One squad challenges another to a 2-week total-volume contest. Winner gets a trophy visible on squad profile for the next cycle.
2. **Inside-squad challenges.** Pick a lift (back squat, bench), set a goal (total reps across squad in 4 weeks). Progress bar visible to all members. When the goal hits, confetti + squad-wide push.

**Why:** Challenges are a known driver of retention + virality in fitness apps (Zwift, Strava, Peloton, MyFitnessPal). They manufacture a reason to log sessions this specific week, in the context of a social obligation. See `growth-case-studies.md` §Strava — challenges account for ~15% of their DAU on any given day.

**Touches:** New challenge data model, challenge UI, notifications, squad leaderboard UI.

**Complexity:** 2 weeks. Not trivial — state machine (pending, active, completed), progress tracking, notification logic.

**Dependencies:** Squad infra (§3.1), push notification service, leaderboard UI (§3.2).

---

## 4. Instagram Story integration — P0 (week 2)

Instagram Stories is where lifters already share their training. The question isn't whether to hook into IG — it's how little friction sits between a PHYZIK event and a story post.

**What — build:**
1. **One-tap Story share.** Every share card in the app has a dedicated "Instagram Story" button. Tapping it uses IG's `instagram-stories://share` URL scheme with the card as the background asset + a sticker linking back to PHYZIK's App Store page. This is IG's native API and it's been stable since 2017. See: https://developers.facebook.com/docs/instagram-platform/sharing-to-stories/
2. **Smart sticker.** The sticker isn't generic — it says "Get PHYZIK" and taps through to App Store with the original poster's referral code attributed. Every Story is a signed referral link.
3. **Story-native format.** Every share card in the app has a 9:16 Story-aspect-ratio variant. Not squeezed — natively designed for vertical.
4. **Fallback to Share Sheet.** If IG isn't installed, fall back to the system Share Sheet gracefully.

**Why:** The friction between "finished lift, feel good" and "post to Story" is currently 5–8 taps across 3 apps (screenshot → crop → open IG → swipe to Story → add sticker → post). One tap collapses that to 2. The compounding effect: if 10% of lifters share a session today, and the friction drop takes that to 30%, the content loop's input tripled with no change to retention.

**Touches:** Share sheet component, IG URL scheme handler, sticker asset pipeline, attribution query param.

**Complexity:** 1 week. IG's API is simple; the sticker + attribution is the work.

**Dependencies:** Referral code system (§1), share card variants (§2).

---

## 5. Group workout sync — P2 (post-6-week)

Two friends at the same gym, training the same program, at the same time.

**What — build (conceptually):**
1. Detect proximity (opt-in location share during a session).
2. Surface "Sarah is at your gym and started a session 6 minutes ago" push.
3. Offer to sync sessions — progress bars align, they see each other's sets land in real time, can react to each lift.
4. Post-session: joint share card ("squatted together at Elite Gym — 4 sets of 8 @ 315lbs").

**Why:** This is a moat feature, not a growth feature. It's one of the things Hevy/Strong/Fitbod *can't* do without their own social layer. But it's expensive — real-time sync, location permissions (high-trust ask), co-session data model, joint share cards. Ship after the first 25k users, when social graph density makes it useful.

**Complexity:** 4+ weeks. Defer.

**Dependencies:** Squad infra, presence service, location permissions handling.

---

## 6. Challenges & head-to-head — P1 (week 4–6)

Already addressed inside squads (§3.3). Here the scope is 1-on-1 matchups across the full user graph.

**What — build:**
1. **Matchup card.** From a friend's Floor post, a "Challenge" button. Picks a lift + timeframe (e.g., "3 weeks — who adds more to their 5RM back squat?"). Stakes: winner's handle on loser's profile for a week, or a no-stakes "Challenged" badge.
2. **Progress side-by-side.** During the challenge, both users see each other's progress on a shared card.
3. **Resolution.** At the end, confetti for the winner, their handle shows up in the loser's profile header for 7 days.

**Why:** 1-on-1 rivalry is the most primal virality mechanic in any competitive sport. It doesn't scale infinitely (not everyone wants a rival), but for the 20% who do, it locks them in.

**Touches:** Challenge data model (shared with squad challenges), share card variant.

**Complexity:** 1.5 weeks (leveraging squad-challenge infra from §3.3).

**Dependencies:** §3.3 infra.

---

## 7. Leaderboards — P1 (week 4) → P2 (week 8+)

Leaderboards are a known retention+virality driver (see `growth-case-studies.md` §Strava §Duolingo). But they're also the single most dangerous feature for an early-stage fitness app: implemented wrong, they create toxicity, cheating, body-image pressure, and gatekeeping.

**What — build, P1:**
1. **Personal leaderboard.** Own PRs ranked by date. Private. This is just "PRs, timeline." Low stakes, high value.
2. **Squad leaderboard.** Already §3.2.

**What — hold until P2:**
- **Global leaderboards.** The problem: bodyweight normalization is hard, age normalization is hard, and most importantly, publicly ranking lifts against strangers invites cheating (fake lift entries) and comparison anxiety. Don't ship until moderation is real.
- **Campus/gym leaderboards.** Higher-trust (people know each other in real life). Harder to fake. But requires a reliable "gym" attribution. Defer until we have gym-level user clustering (via shared sessions or geo).

**Why:** `research/growth-case-studies.md` §Duolingo — their leagues were the single biggest 30-day retention lift they ever shipped (+17%). But Duolingo had years of moderation infrastructure before the leagues. Lifting has worse-faith-actor patterns (entering fake lifts is trivial) and higher body-image stakes. Don't copy Duolingo's mechanic without their defense in depth.

---

## Priority stack — 6-week version

**Week 1:**
- P0: Referral tier 1 (code + basic attribution + auto-friend) — §1.1
- P0: Workout share card — auto-prompt after session, branding + QR — §2.1

**Week 2:**
- P0: Squad invite flow redesign (`phyzik.app/s/{id}` + iMessage share) — §3.1
- P0: Instagram Story integration (one-tap + sticker + attribution) — §4
- P0: PR celebration + share — §2.2

**Week 3:**
- P0: Referral tier 2 (Founding Member badge + 3/5/10 thresholds, no merch yet) — §1.1
- P1: Squad Floor + Hype react — §3.2

**Week 4:**
- P1: Weekly Wrapped — §2.3
- P1: Personal leaderboard (PR timeline) — §7
- P1: Squad leaderboards — §3.2

**Week 5:**
- P1: Squad challenges — §3.3
- P2: Begin group workout sync scoping — §5

**Week 6:**
- P1: 1-on-1 head-to-head — §6
- P2: Merch drop for 10-referral users — §1.1

---

## Complexity map

| Feature | Eng weeks | Dependencies | Unlocks |
|---|---|---|---|
| Referral T1 | 1.5 | Deep links, attribution | Everything |
| Workout share auto-prompt + branding | 1 | — | Content loop |
| Squad invite redesign | 1.5 | Deep links | Squad retention |
| IG Story integration | 1 | Referral T1 | Content loop amplifier |
| PR celebrate + share | 1 | Share cards, Floor post pipeline | Content loop supply |
| Referral T2 | 1 | Referral T1 | Status-driven loop |
| Squad Floor + Hype | 2 | Squad, push service | Squad retention |
| Weekly Wrapped | 1.5 | Aggregate service, push | Habit + content |
| Personal leaderboard | 0.5 | PR data | Self-loop |
| Squad leaderboards | 1 | Squad data | Squad retention |
| Squad challenges | 2 | Squad infra | Retention + content |
| 1-on-1 matchups | 1.5 | Squad challenge infra | Rivalry loop |

Total P0+P1 engineering: ~14–16 weeks of work. One engineer can't ship this in six. Two is minimum. Three is comfortable.

**Honest recommendation to Caleb:** If Vijay is solo on app code, ship the P0 stack only. The P1 stack becomes a Q3 roadmap. Pretending a solo engineer hits 50k by June 1 on 16 weeks of eng work is how teams break themselves.

---

## Anti-patterns to avoid

1. **Don't build a feed algorithm.** A ranked feed looks mature but optimizes for engagement-as-numbness, not for the honest training loop PHYZIK is selling. Chronological until we have a hard reason to rank.
2. **Don't ship global leaderboards without moderation.** Fake lifts will fill the top 100 in a week. Kills trust.
3. **Don't copy TikTok-style "make it everywhere" sharing.** Lifters share on IG Stories and iMessage. That's it for now. TikTok, YouTube Shorts, X come later.
4. **Don't reward invite-spam.** A user inviting 50 contacts isn't a win — it's a spam vector that burns the sender's social capital and often gets the app banned from iMessage. Cap invite tokens per day (e.g., 10/day, server-enforced) to create social scarcity.
5. **Don't promise rewards we can't deliver.** If we promise a hoodie at 10 referrals, every 10-referral user gets a hoodie — or the trust hit lasts longer than the gain. Budget the merch or don't promise it.
6. **Don't launch referral + IG Story + PR share + squad redesign in the same week.** Stagger. We need to attribute *which* lever moves the needle, and launching all four in 7 days makes that impossible. Pick one per week. Measure.

---

## What Caleb should push Vijay on, in order

1. **Week 1 standup:** "Is the referral code in the database schema yet? If not, why?"
2. **Week 2 standup:** "What's the attribution path? What happens when someone taps the link but doesn't paste the code?"
3. **Week 3 standup:** "What % of sessions are resulting in a share card tap today vs. last week?"
4. **Week 4 standup:** "What's the actual k-factor as of Friday? If <0.2, we have a problem and need to rethink."
5. **Week 5 standup:** "Of the 3 growth loops (invite, content, squad), which is live, which is broken, which is untested?"

Growth without measurement is gambling. Ship one lever, measure one number, repeat.
