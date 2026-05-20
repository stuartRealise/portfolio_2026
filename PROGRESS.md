# Build Progress — Aitken Interactive

## Phase 1 — Scaffold & Brand System ✅
**Completed:** 2026-05-07
**What was built:**
- `app/globals.css` — full brand token system (primitives + semantic tokens + spacing + type scale), modern CSS reset, skip-link, scroll-reveal `.reveal` utility, hero fade-up `@keyframes`, focus-visible styles
- `app/layout.tsx` — Playfair Display, DM Sans, DM Mono loaded via `next/font/google` as CSS variables `--font-display`, `--font-body`, `--font-mono`; site metadata; skip-to-main link
- `app/page.tsx` — minimal stub (Phase 4 will replace)
- `app/about/page.tsx`, `app/work/page.tsx`, `app/work/[slug]/page.tsx`, `app/services/page.tsx` — minimal stubs
- `lib/constants.ts` — FORMSPREE_ENDPOINT, SITE_URL, SITE_NAME
- `public/logo.svg` — SVG placeholder wordmark
- `.env.local.example` — Formspree env var documented
- Full folder structure created: `components/layout/`, `components/ui/`, `components/home/`, `content/case-studies/`, `lib/`

**Decisions made:**
- node_modules were re-installed locally after copying scaffold from /tmp (symlink paths were broken)
- Font CSS variables declared in `:root` as documented fallbacks; next/font class on `<html>` overrides them at runtime with the actual loaded font family
- Removed `app/page.module.css` (default boilerplate, not needed)

**Known issues / TODOs:**
- `public/logo.svg` is a bare SVG text placeholder — Stuart will replace with final SVG

## Phase 2 — Layout Shell ✅
**Completed:** 2026-05-07
**What was built:**
- `lib/ContactModalContext.tsx` — React Context with `openContactModal(serviceId?)` / `closeContactModal()`, body scroll lock wired; provider wraps root layout
- `components/layout/Navbar.tsx` — sticky header, transparent→filled on scroll (>80px), white text on transparent / charcoal on filled, DM Mono nav links with sienna underline active state, Contact button fires context, hamburger + full-screen charcoal overlay mobile menu
- `components/layout/Navbar.module.css`
- `components/layout/Footer.tsx` — charcoal bg, 3-column grid (brand/nav/connect), sienna top border, dynamic copyright year
- `components/layout/Footer.module.css`
- `app/layout.tsx` — updated to include ContactModalProvider, Navbar, Footer

**Decisions made:**
- `openContactModal` typed as `(serviceId?: string) => void`; button onClick uses `() => openContactModal()` to avoid MouseEvent type mismatch
- Mobile menu is functional (opacity + pointer-events toggle) with close-on-link-click; Phase 12 will add focus trap and full accessibility polish
- Footer content hardcoded for Phase 2; Phase 3 content system will pull from `content/site.json`

**Known issues / TODOs:**
- ContactModal UI (the actual modal panel) is Phase 9 — context is wired but no modal renders yet
- Mobile menu lacks focus trap (Phase 12)

## Phase 3 — Content System ✅
**Completed:** 2026-05-07
**What was built:**
- `content/site.json` — global site data including bio, social, about page credentials (5 milestones), and values (3)
- `content/services.json` — 2 active services with full intakeFields + 4 coming-soon stubs; includes image URLs
- `content/work.json` — work index with 5 entries (3 featured), slugs, tags, teaser copy, indexImages
- `content/contact.json` — general inquiry form fields + success/error message strings
- `content/case-studies/saas-onboarding-churn.json` — Flowspark, 6 weeks, full 7-section content + gallery
- `content/case-studies/fintech-build-vs-buy.json` — Meridian Capital, 72hr audit, full content + gallery
- `content/case-studies/design-system-consolidation.json` — Cartlane, 12 weeks, full content + gallery
- `content/case-studies/healthcare-executive-dashboard.json` — Helio Health, 10 weeks, full content + gallery
- `content/case-studies/plg-pricing-redesign.json` — Syncly, 4 weeks, full content + gallery
- `lib/content.ts` — all TypeScript interfaces + helpers: `getSiteData`, `getServices`, `getActiveServices`, `getServiceById`, `getWorkIndex`, `getFeaturedWork`, `getContactConfig`, `getCaseStudy` (fs-based), `getAllCaseStudySlugs`, `getAdjacentCaseStudy`

**Decisions made:**
- Static JSON files (site, services, work, contact) are imported directly at build time via `import`
- Case studies use `fs.readFileSync` so they can be looked up by dynamic slug at request time
- `getAllCaseStudySlugs` uses `require('fs')` to avoid the static-import/dynamic path tension
- `getAdjacentCaseStudy` wraps around the work index (last → first) for continuous browsing

**Known issues / TODOs:**
- All Unsplash images are placeholder IDs — Stuart will swap in real project photography
- `content/site.json` email field is placeholder (`hello@aitken-interactive.co.uk`)

## Phase 4 — Home Page ✅
**Completed:** 2026-05-07
**What was built:**
- `components/ui/SectionLabel.tsx/.module.css` — eyebrow label (DM Mono, uppercase, muted; `light` variant for dark backgrounds)
- `components/ui/ScrollReveal.tsx` — client component (renders null); sets up IntersectionObserver on all `.reveal` elements, re-runs on pathname change, added to root layout
- `components/ui/ParallaxSection.tsx/.module.css` — reusable client component; image offset driven by `requestAnimationFrame` scroll listener; clamps ±80px
- `components/ui/ServiceCard.tsx/.module.css` — active card (dark surface, sienna left-border on hover, duration badge) + coming-soon variant (dashed border, low opacity)
- `components/ui/CaseStudyCard.tsx/.module.css` — full-bleed image with scale+overlay on hover, tags, title, meta
- `components/home/Hero.tsx/.module.css` — 100vh, background image, gradient overlay, staggered fade-up animations, CTA opens modal, animated scroll chevron
- `components/home/Intro.tsx/.module.css` — two-column pull quote + bio on parchment
- `components/home/ServicesTeaser.tsx/.module.css` — charcoal, 2 active cards + 4 coming-soon, CTA link
- `components/home/WorkTeaser.tsx/.module.css` — parchment, 3-col featured grid, hover states, CTA link
- `components/home/CtaBanner.tsx/.module.css` — charcoal, two modal-trigger buttons pre-filled by service ID
- `app/page.tsx` — full home page; server component fetching data via `lib/content.ts` helpers; all 6 sections assembled

**Decisions made:**
- `app/page.tsx` is a server component; it fetches data synchronously and passes it as props to section components
- Hero/CtaBanner are `'use client'` (contact modal); Intro/ServicesTeaser/WorkTeaser are server components
- `ScrollReveal` is in the root layout and re-runs on every pathname change via `usePathname` — handles scroll reveals across all pages
- Parallax offset is element-relative (rect-based), not absolute scrollY, so it works correctly at any vertical position on the page

**Known issues / TODOs:**
- Home page inline style on the parallax text (`style={{ fontFamily: ... }}`) should be extracted to a CSS class when the parallax component gets its own content patterns — acceptable for Phase 4

## Phase 5 — About Page ✅
**Completed:** 2026-05-07
**What was built:**
- `components/home/CtaBanner.tsx` — refactored to accept `heading`, `subline`, `buttons[]` props; home page defaults preserved; `CtaButton` interface exported
- `app/about/page.tsx` — 5 sections: parallax hero (70vh, Stuart's name + title, fade-up), Who I Am (pull quote with sienna border + portrait image + bio), Experience (charcoal timeline, 5 entries), Values (3-column cards on parchment), CTA banner ("Work with me")
- `app/about/page.module.css`

**Decisions made:**
- About page is a server component; all data from `getSiteData()` passed inline
- CtaBanner refactored to be generic — avoids duplicating the charcoal CTA pattern
- Values cards use a `border-top: 4px solid sienna` as the accent rule (top instead of left, distinct from pull quotes)
- Timeline uses `<ol>` for semantic list markup; years styled with sienna via `--color-brand-primary`

**Known issues / TODOs:**
- Portrait image is an atmospheric Unsplash placeholder — Stuart will replace

## Phase 6 — Services Page ✅
**Completed:** 2026-05-07
**What was built:**
- `components/ui/EnquireButton.tsx/.module.css` — small `'use client'` button component that calls `openContactModal(serviceId)`; reusable wherever a service enquiry trigger is needed
- `app/services/page.tsx` — server component; parallax hero (70vh), two alternating service sections (parchment/charcoal, image + text, reversed second), coming-soon 4-col grid, CTA banner
- `app/services/page.module.css`

**Decisions made:**
- Page must be a server component to use `lib/content.ts` (which calls `fs.readFileSync`); interactive modal trigger isolated in `EnquireButton` client component — same pattern needed across all pages that have CTAs
- `reversed` class on `.serviceInner` uses CSS `order` to flip image/text on alternating rows at desktop

**Known issues / TODOs:**
- None

## Phase 7 — Work Index Page ✅
**Completed:** 2026-05-07
**What was built:**
- `app/work/page.tsx` — server component; charcoal hero (50vh, flush-bottom heading), editorial intro paragraph, alternating-layout grid (every 3rd item spans 2 columns for magazine variety), hover lift + image scale + gradient overlay, "Read the case study →" links
- `app/work/page.module.css`

**Decisions made:**
- Wide items (index 0, 3, 6...) span 2 columns via `grid-column: span 2`; on mobile they revert to full-width single column
- Wide items use a side-by-side image+text grid at desktop (image left, meta right) — more editorial feel for the "hero" work items
- Image aspect ratio: standard 4:3, wide items use 3:4 portrait within a side-by-side layout

**Known issues / TODOs:**
- None

## Phase 8 — Case Study Page ✅
**Completed:** 2026-05-07
**What was built:**
- `components/ui/ImageCarousel.tsx/.module.css` — horizontal swipe carousel with scroll-snap, dot navigation, click-to-lightbox callback prop, keyboard accessible
- `app/work/[slug]/page.tsx` — full case study page with `generateStaticParams` (all 5 slugs pre-rendered as SSG): hero (85vh parallax), oversight (blurb + facts strip), problem (charcoal, decorative section num), decision (parchment + inline images), methods (steps with images), solution (parchment + carousel), outcomes (metrics strip + narrative), reflection (parchment), gallery grid, next-project teaser
- `app/work/[slug]/page.module.css`

**Decisions made:**
- Page is `async` server component; `params` is `Promise<{slug}>` per Next.js 15 convention
- `generateStaticParams` calls `getAllCaseStudySlugs()` — all 5 case studies are SSG at build time
- Decorative section numbers (`01`–`06`) are `position: absolute` with very low opacity — purely visual
- Metrics strip uses `auto-fit minmax(160px, 1fr)` grid so it adapts to any number of metrics
- Lightbox callback on carousel/gallery is wired to receive `onImageClick` but Lightbox component is Phase 10 — currently clicking has no effect

**Known issues / TODOs:**
- Lightbox not yet built (Phase 10) — gallery images and carousel images are not yet clickable to full-screen

## Phase 9 — Contact Modal ✅
**Completed:** 2026-05-07
**What was built:**
- `components/ui/ContactModal.tsx` — `'use client'`; two-step flow: service picker (Step 1 when no serviceId), dynamic intake form (Step 2) built from `intakeFields` in `services.json`; Formspree POST with loading/success/error states; focus trap (re-queried on each Tab press); ESC close; overlay click-to-close; body scroll lock via context
- `components/ui/ContactModal.module.css`
- `lib/ContactModalContext.tsx` — updated to render `<ContactModal />` directly inside the provider so modal is available everywhere without prop drilling
- `lib/clientContent.ts` — created to provide client-safe JSON helpers (`getServicesClient`, `getActiveServicesClient`, `getContactConfigClient`) — static imports only, no `fs`, safe in browser bundles

**Decisions made:**
- ContactModal must import from `lib/clientContent.ts` (not `lib/content.ts`) because it is a client component and `lib/content.ts` uses `fs`
- Focus trap re-queries focusable elements on each Tab keydown to handle DOM changes between form steps without stale ref arrays
- `lib/clientContent.ts` mirrors only the subset of helpers needed client-side; server helpers remain in `lib/content.ts`

**Known issues / TODOs:**
- Formspree endpoint is `process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT` — must be set in `.env.local` before form submission works in production

## Phase 10 — Lightbox ✅
**Completed:** 2026-05-07
**What was built:**
- `components/ui/Lightbox.tsx` — `'use client'`; full-screen `role="dialog"` aria-modal, ESC / ArrowLeft / ArrowRight keyboard navigation, focus trap (close + nav buttons), overlay click-to-close, prev/next nav buttons, image counter, fade-in animation
- `components/ui/Lightbox.module.css`
- `components/ui/LightboxGallery.tsx` — `'use client'`; manages `activeIndex` state, renders a 3-col responsive grid of clickable image buttons with zoom-in cursor, hover overlay with expand icon, captions; renders `<Lightbox>` when `activeIndex !== null`
- `components/ui/LightboxGallery.module.css`
- `app/work/[slug]/page.tsx` — gallery section updated: replaced static image grid with `<LightboxGallery images={gallery} />`

**Decisions made:**
- Lightbox uses `object-fit: contain` (not cover) so full image is always visible without cropping
- Gallery grid uses `aspect-ratio: 16/10` for consistent thumbnail sizing; lightbox uses `max-height: 80vh` with same aspect ratio
- Navigation arrows are outside the `imageArea` div and absolutely positioned relative to the overlay for full-height hit area
- LightboxGallery is a separate component from Lightbox — keeps state management out of the pure display component

**Verified:** `npx tsc --noEmit` — no errors; `npm run build` — clean, all 12 pages generated (5 case study SSG paths confirmed)

## Phase 11 — Parallax & Animations ✅
**Completed:** 2026-05-07
**What was built / audited:**
- `components/ui/ParallaxSection.tsx` — added `prefers-reduced-motion: reduce` guard before attaching scroll listener; in reduced-motion mode the image stays centred without any JS transform
- `components/layout/Navbar.module.css` — moved navbar background/padding/color transitions and mobile menu opacity transition into `@media (prefers-reduced-motion: no-preference)` blocks
- `components/ui/CaseStudyCard.module.css` — moved card lift (translateY -4px) and image scale (scale 1.03) transitions into reduced-motion guard
- `components/ui/LightboxGallery.module.css` — moved gallery thumbnail image scale transition into reduced-motion guard
- `components/ui/ImageCarousel.module.css` — moved image scale and dot scale transitions into reduced-motion guards; `background` transition on dots retained (not vestibular-triggering)
- Confirmed scroll reveal (`.reveal` / `.is-visible`) and hero fade-up animations were already gated inside `@media (prefers-reduced-motion: no-preference)` in `globals.css`
- Confirmed `ContactModal.module.css` and `Lightbox.module.css` already had reduced-motion guards on their entrance animations
- All `reveal` / `reveal-delay-*` classes confirmed present on all section content across home, about, services, work index, and case study pages

**Decisions made:**
- For hover transforms, both the `transition` AND the `transform` rule are inside the guard — instantaneous jumps are worse for vestibular users than simply removing the effect
- Subtle non-motion transitions (`background`, `color`, `opacity`, `width`) left ungated as they don't cause vestibular issues
- Parallax effect skips entirely (no JS overhead) in reduced-motion mode rather than clamping to 0 offset

**Verified:** `npx tsc --noEmit` — no errors; `npm run build` — clean, all 12 pages generated

## Phase 12 — Polish & Deployment ✅
**Completed:** 2026-05-07
**What was built:**
- `next.config.ts` — added `turbopack.root` (silences workspace-root warning), `images.remotePatterns` for `images.unsplash.com` (required for `next/image` to serve Unsplash URLs)
- `components/layout/Navbar.tsx` — full mobile menu focus trap added: ESC closes menu and returns focus to hamburger; Tab/Shift+Tab cycle within menu; first focusable element auto-focused on open; scroll-lock and focus-trap logic unified in single `useEffect` keyed to `menuOpen`
- `README.md` — replaced Next.js boilerplate with project-specific docs: stack, local setup, content structure table, environment variables, deploy instructions

**Decisions made:**
- Mobile focus trap uses `useCallback` for `closeMenu` so it can be a stable dependency of the focus-trap `useEffect` without triggering loops
- Focus trap queries live DOM on each Tab keydown — same pattern used in ContactModal and Lightbox — handles any DOM variation without stale refs

**Verified:** `npx tsc --noEmit` — no errors; `npm run build` — clean, all 12 pages generated

## Project Complete ✅
All 12 phases built and verified. Final build: 12 static pages (7 fully static, 5 SSG case studies). Zero TypeScript errors. Zero build warnings (other than a known Turbopack workspace-root notice that is silenced via `turbopack.root` config).

**To deploy:** push to GitHub, connect repo to Vercel, set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in Vercel environment variables.

---

## Post-Launch Fixes

### iOS / iPad Scroll Reveal Fix
**Completed:** 2026-05-10
**Problem:** All `.reveal` elements (Intro, ServicesTeaser, WorkTeaser, CtaBanner content) were invisible on iPad/iOS Safari. Hero and footer were unaffected. Text was selectable but had `opacity: 0`.

**Root cause:** The original `.reveal` system used `opacity: 0` in CSS + JavaScript class toggling (`is-visible`) via `IntersectionObserver` and later `getBoundingClientRect` + scroll listeners. Something in iOS Safari's environment prevented the JavaScript from adding the `is-visible` class — both the IntersectionObserver and scroll listener approaches failed completely on iPad despite working on desktop.

**Key insight:** The Hero section (which always worked) uses CSS `@keyframes` animation (`animate-fade-up`) — no JavaScript involved. The `.reveal` elements failed because they depended on JavaScript.

**Fix:** Converted `.reveal` in `globals.css` from a JS-class-toggled `opacity`/`transition` pattern to a pure CSS `@keyframes` animation (`revealUp`), mirroring the Hero's existing approach. `ScrollReveal.tsx` reduced to a no-op placeholder.

**Files changed:**
- `app/globals.css` — `.reveal` now uses `animation: revealUp 0.7s both` with a 0.3s base delay; delay classes updated from `transition-delay` to `animation-delay`
- `components/ui/ScrollReveal.tsx` — JS logic removed; component returns null (kept as placeholder)

**Trade-off:** Sections animate in on page load (time-based) rather than strictly on scroll. Acceptable for a portfolio site — content is always visible and animated.

---

### iOS / iPad Mobile Parity Fixes
**Completed:** 2026-05-10
**Discovered via:** Live device testing on iPad/iPhone via local network (`192.168.0.105:3000`)

**Root cause (overarching):** React JS bundles are hydrating correctly on desktop but failing to hydrate on iOS Safari. The SSR'd HTML and CSS loads fine; interactive behaviour (click handlers, state updates) does not attach. Likely a Turbopack dev-mode or React 19 hydration issue specific to the local-network test setup. **All fixes below account for this by providing CSS or vanilla-JS fallbacks wherever possible.**

#### 1. Viewport meta tag missing
**Problem:** No `<meta name="viewport">` — iOS Safari rendered the page at desktop width.
**Fix:** Added `export const viewport: Viewport` to `app/layout.tsx` with `width: 'device-width', initialScale: 1`. `maximumScale` intentionally NOT set — pinch-zoom must remain available (accessibility).

#### 2. iOS scroll lock — Contact modal & mobile menu
**Problem:** `document.body.style.overflow = 'hidden'` is ignored by iOS Safari; `position: fixed` overlays render off-screen.
**Fix:** Replaced with the iOS-safe scroll lock pattern in `lib/ContactModalContext.tsx`: record `window.scrollY`, set `body { position: fixed; top: -${y}px; width: 100% }`, restore on close. Mobile menu scroll lock removed entirely (full-screen overlay handles containment visually; scroll lock was causing `window.scrollTo(0,0)` on initial mount).

#### 3. Navbar background not changing on scroll
**Problem:** `background-color: dark` is invalid CSS (transparent by default). iOS Safari also routes scroll events inconsistently.
**Fix:** `Navbar.module.css` — solid dark fallback for mobile (`background: var(--color-surface-inverse)`); desktop-only `background: transparent`. Added `document.addEventListener('scroll', ...)` alongside `window.addEventListener` in `Navbar.tsx`.

#### 4. Button colour (blue iOS UA stylesheet override)
**Problem:** Buttons appeared blue on iOS — iOS Safari applies its own UA colour to `<button>` elements.
**Fix:** Added `color: inherit; -webkit-appearance: none; appearance: none;` to the `button` reset in `globals.css`.

#### 5. Hero tucked under fixed navbar on mobile
**Problem:** Fixed navbar overlapped hero section on mobile; no offset applied.
**Fix:** `Hero.module.css` — mobile-only: `margin-top: var(--navbar-height-mobile); height: auto; min-height: calc(100dvh - var(--navbar-height-mobile))`. `--navbar-height-mobile: 72px` set as CSS variable in `:root`. Logo resized to `120×40px` on mobile (was `200×100px` making the navbar ~156px tall).

#### 6. Hero CTA cut off on small phones
**Problem:** `height: calc(100dvh - 72px)` with `overflow: hidden` clipped the CTA button on phones where hero content is taller than the available height.
**Fix:** Changed to `height: auto` + `min-height: calc(100dvh - var(--navbar-height-mobile))` — hero is at least full-viewport-minus-navbar tall but can grow if content needs more room.

#### 7. ServiceCards broken on mobile
**Problem:** `height: stretch` (non-standard CSS) caused layout breakage; `4rem` padding was excessive on small screens.
**Fix:** `ServiceCard.module.css` — replaced `height: stretch` with `height: 100%`; added mobile breakpoint with reduced padding/gap. `ServicesTeaser.module.css` — added mobile section padding and 1-column coming-soon grid.

#### 8. Mobile menu toggle — inline JS fallback
**Problem:** Hamburger tap did nothing on iOS. Root cause: React not hydrating → no `onClick` handlers attached to any button on the page. Multiple CSS approaches attempted (conditional rendering, `visibility: hidden`, `pointer-events: none`) all failed for the same fundamental reason.

**Final fix — two-layer approach:**
1. **CSS layer:** Mobile menu always in DOM, hidden via `display: none` (immune to the iOS `visibility`/`pointer-events` bug). React toggles `mobileMenuOpen` CSS module class (`display: flex`). Global `#mobile-menu.nav-open` rule (`display: flex !important`) acts as fallback target.
2. **Vanilla JS layer:** Inline `<script dangerouslySetInnerHTML>` added as first child of `<body>` in `app/layout.tsx`. Runs directly from SSR'd HTML — no bundle, no React. Attaches click listener to hamburger; toggles `nav-open` global class. Checks `data-react-mounted` attribute on the button (set by `useEffect` when React does hydrate) and steps aside once React takes over.

**Result:** Navigation works regardless of React hydration status. When React hydrates, it removes `nav-open` and owns state via `menuOpen`. When it doesn't, the inline script drives the toggle.

**Files changed:**
- `app/layout.tsx` — inline `<script>` fallback; `Viewport` export
- `app/globals.css` — button reset additions; `#mobile-menu.nav-open` global rule; `--navbar-height-mobile` CSS variable
- `components/layout/Navbar.tsx` — `data-react-mounted` signal; `document` scroll listener; `type="button"` on all nav buttons; scroll lock simplified
- `components/layout/Navbar.module.css` — display:none/flex menu; fade-in animation; mobile padding; logo sizing
- `components/home/Hero.module.css` — mobile height/min-height fix
- `lib/ContactModalContext.tsx` — iOS-safe scroll lock
- `components/ui/ServiceCard.module.css` — mobile layout fixes
- `components/home/ServicesTeaser.module.css` — mobile padding

**Remaining issue:** Contact modal still requires React hydration (it's pure JS state/DOM). Once the React hydration root cause is diagnosed and fixed, the contact form should work automatically — no further changes needed to ContactModal itself.

---

### Contact Form Mobile Fallback
**Completed:** 2026-05-10
**Problem:** Contact modal is pure React state — all trigger buttons use `onClick` via `useContactModal()`. On iOS Safari where React isn't hydrating, tapping any contact button does nothing.

**Fix — same two-layer pattern as mobile menu:**
1. `components/ui/StaticContactModal.tsx` — server component, always SSR'd into the DOM. Single-step form (service select + name + email + company + message) with native `action={FORMSPREE_ENDPOINT} method="POST"`. Hidden by default via CSS (`display: none`).
2. `components/ui/StaticContactModal.module.css` — matches React modal styling.
3. `data-contact-trigger="true"` + `data-service-id` attributes added to all five trigger points: Hero CTA, CtaBanner buttons (×2), EnquireButton, Navbar desktop Contact, Navbar mobile Contact.
4. Inline `<script>` in `app/layout.tsx` extended with `initContact()` — attaches click listeners to `[data-contact-trigger]`, opens static modal via `style.display='flex'`, pre-selects service from `data-service-id`, applies iOS scroll lock, handles close (button / overlay / ESC). Guards on `document.body.hasAttribute('data-contact-react-mounted')` so it steps aside when React hydrates.
5. `lib/ContactModalContext.tsx` — added `useEffect` that sets `data-contact-react-mounted` on `document.body` on mount and hides the static modal if it was open.

**Trade-off:** Static fallback is a single-step form (no service-specific field sets). Full two-step React flow still activates when hydration works.

**Verified:** `npx tsc --noEmit` — no errors. `npm run build` — clean, all 16 pages generated.

---

### Hero Section Mobile Spacing — UNRESOLVED
**Last attempted:** 2026-05-10

**Symptoms (seen on iPhone via local network):**
1. Hero content tucks directly under the fixed navbar with no breathing room at the top.
2. No padding below the CTA button before the next section (Intro / parchment block).

**What was tried:**
- `components/home/Hero.module.css` — added `padding-top: var(--space-lg); padding-bottom: var(--space-lg)` to `.content` inside the `@media (max-width: 899px)` block. Did not visually resolve either complaint.

**Suspected root cause:**
On mobile, total content height (eyebrow + large heading + long subline + CTA) likely exceeds `calc(100dvh - var(--navbar-height-mobile))`, so the hero grows to `height: auto` and wraps content with no spare space for `align-items: center` to act. The CSS padding on `.content` may be being overridden somewhere, or the gap is being absorbed by the hero's `overflow: hidden` on desktop leaking into mobile, or the issue is that the `.bg` / `.overlay` absolutely-positioned layers extend beyond the content area and clip visually.

**Next steps to investigate:**
- Inspect the hero element on device to confirm actual rendered height and padding values.
- Check whether `overflow: hidden` on `.hero` is clipping the bottom padding on mobile.
- Consider switching from `padding` on `.content` to adding an explicit `margin-top` on the eyebrow and `margin-bottom` on the CTA, which are harder to clip.
- Consider adding `padding-bottom` directly to `.hero` on mobile (outside of the content flow) so it always produces space below the CTA regardless of content height.

---

## Launch Day — 2026-05-20

### Git Backup & Version Control
- All work committed to local git repo (3 commits on `main`)
- `.gitignore` updated to exclude macOS `Icon\r` artifact (using `Icon?` pattern)
- Mirror backup created on external drive: `/Volumes/StuartExternal1TB/portfolio2026_Backup.git`
- GitHub private repo created at `github.com/stuartRealise/portfolio_2026` (later made public — see below)
- Local git user email updated to `stuart@aitken-interactive.co.uk` to match GitHub/Vercel account

### Bug Fix — Duplicate React Key (credentials timeline)
- **Problem:** Console error `Encountered two children with the same key, 2020-2023` — multiple credentials in `site.json` shared the same `year` value, which was being used as the React list key
- **Fix:** Added stable `id` fields (`cred-and-digital`, `cred-visitscotland`, etc.) to each credential entry in `content/site.json`; updated `app/about/page.tsx` to key off `item.id`; added `id: string` to `SiteCredential` interface in `lib/content.ts`

### Vercel Deployment
- Site deployed to Vercel (Hobby plan) via GitHub integration
- Custom domain `aitken-interactive.co.uk` pointed at Vercel by updating the `@` A record at 123-reg DNS from `92.205.0.98` → `216.198.79.1`
- MX records left untouched — email at `stuart@aitken-interactive.co.uk` unaffected
- SSL certificate issued automatically by Vercel
- **Deployment blocked issue:** Resolved by making the GitHub repo public (Hobby plan doesn't support collaborators on private repos) and fixing the local git author email to match the Vercel account

### Bug Fix — Image Path Case Mismatches (19 files)
- **Problem:** macOS filesystem is case-insensitive so all image paths worked locally, but Vercel runs on Linux (case-sensitive) causing images to 404 in production
- **Files fixed:** `Hero.tsx`, `app/page.tsx`, `app/services/page.tsx`, `content/work.json`, and 5 case study JSON files (`mod-rp`, `efl`, `opus2`, `rocktrust`, `service-blueprint-architect`)
- **Examples:** `Homepage.jpg` → `homepage.jpg`, `EFL_logo.svg` → `EFL_LOGO.svg`, `opus2/logo.svg` → `Opus2/Logo.svg`, `Problem.png` → `problem.png`, `DesignSystems.png` → `Designsystems.png`

### Site Status
**Live at:** `https://aitken-interactive.co.uk`
All pages, navigation, case studies, and images confirmed loading in production.

---

## Post-Launch Updates — 2026-05-20 (continued)

### Contact Modal — General Enquiry + Layout Fix
- **Problem 1:** No option to contact without selecting a specific service
- **Problem 2:** Two stacked service cards were causing vertical overflow/scrollbars on desktop
- **Problem 3:** No contact number field on any form

**Changes:**
- Added `general-enquiry` as a third active service in `content/services.json` with fields: Name, Email address, Contact number, Enquiry
- `ContactModal.module.css` — widened panel from 640px to 900px; switched `.serviceCards` to `flex-direction: row` on desktop (≥700px), stacking to column on mobile; hid verbose `.cardDesc` on desktop for a clean 3-column card layout
- `ContactModal.tsx` — added `_to: stuart@aitken-interactive.co.uk` and `_replyto` to every Formspree submission
- `StaticContactModal.tsx` (iOS fallback) — replaced Company field with Contact number; added `_to` hidden field

### Formspree Integration
- Formspree account created and form endpoint added to Vercel environment variables as `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
- All submissions route to `stuart@aitken-interactive.co.uk`
- Redeploy triggered after env var addition to activate the endpoint
