# phyzik.app

Marketing site for **PHYZIK** — the training platform built for lifters.

This is the public-facing site only. The React Native app lives in a separate repo.

## Stack

- **Next.js 15** (App Router, Turbopack)
- **TypeScript**, strict
- **Tailwind CSS v3** with a custom token set mirroring the app's theme
- **motion** (v11, formerly framer-motion) for animations
- **GSAP** for scroll-timeline effects
- **Lenis** for smooth scrolling (respects `prefers-reduced-motion`)
- **Vercel Analytics**
- Deployed on **Vercel** — autodeploy on push to `main`

## Development

```bash
npm install
npm run dev       # localhost:3000
npm run build     # production build
npm run start     # run production build locally
npm run lint      # ESLint
```

## Critical invariants (do not break)

1. **AASA** — `public/.well-known/apple-app-site-association` must be served verbatim at
   `/.well-known/apple-app-site-association` with `Content-Type: application/json`. The header is
   enforced in `next.config.ts`.
2. **Deep-link rewrites** — `/post/*`, `/workout/*`, `/squad/*`, `/community/*`, `/gym/*`,
   `/challenge/*`, `/@username` all rewrite to `/redirect`, which attempts `phyzik://` and falls
   back to the App Store. Configured in `next.config.ts`.
3. **App Store**: id6760412488. **Bundle**: `com.physiquetech.physiqueai`. **Scheme**: `phyzik://`.

## Related

- App Store: https://apps.apple.com/us/app/phyzik/id6760412488
- Main app repo: (internal)

## TODOs

- [ ] Replace `public/icon.png` placeholder with the real app icon artwork.
- [ ] Generate `public/og.png` (1200×630) for OpenGraph/Twitter cards (Phase 7).
- [ ] Port real privacy/terms content from `_preserve/privacy.html` and `_preserve/terms.html` (Phase 6).
