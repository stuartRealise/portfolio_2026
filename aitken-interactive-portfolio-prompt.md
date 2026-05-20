# Claude Code Prompt — Aitken Interactive Portfolio Site

> Hand this entire document to Claude Code as your initial prompt. It is a complete architectural and design specification. Do not summarise it — paste it in full.
>
> **Resuming a session?** Read `PROGRESS.md` first. It tells you exactly what phase was completed, what is in progress, and what to do next. Do not re-do completed phases. Pick up from the `## Next` section.

---

## Session Management — Read This First

This is a large build. It is broken into **12 phases**. You must complete one phase at a time, in order. After each phase:

1. Run `npx tsc --noEmit` — fix any TypeScript errors before proceeding
2. Confirm the phase works as expected (no console errors, renders correctly)
3. **Write a diary entry to `PROGRESS.md`** using the format below
4. Tell the user which phase is complete and what to type to continue in a new session

### PROGRESS.md format

Maintain this file at the project root. Append a new entry after every phase. Never delete previous entries.

```markdown
# Build Progress — Aitken Interactive

## Phase [N] — [Phase Name] ✅
**Completed:** [date/session]
**What was built:**
- [bullet list of files created or modified]
**Decisions made:**
- [any non-obvious choices, e.g. "used CSS scroll listener instead of IntersectionObserver for parallax due to iOS quirk"]
**Known issues / TODOs:**
- [anything deferred or imperfect]

## Next
Start Phase [N+1] — [Phase Name].
First task: [specific first action for the next session]
```

### How to resume in a new session

Tell Claude Code:
> "Read PROGRESS.md and continue from the Next section."

That is sufficient. Claude Code will read the diary, understand the current state, and continue without re-doing completed work.

---

## Build Phases

Complete these in order. Do not skip ahead.

| Phase | Name | Key Deliverables |
|-------|------|-----------------|
| 1 | Scaffold & Brand System | Next.js init, global CSS tokens, fonts, reset |
| 2 | Layout Shell | Navbar, Footer, ContactModalContext (wiring only) |
| 3 | Content System | All JSON files seeded, `lib/content.ts` typed helpers |
| 4 | Home Page | All 6 sections, no parallax or animation yet |
| 5 | About Page | All sections, static |
| 6 | Services Page | Active services + coming-soon grid |
| 7 | Work Index Page | Editorial grid, card component |
| 8 | Case Study Page | All 7 sections rendered from JSON, carousel |
| 9 | Contact Modal | Two-step flow, dynamic fields, Formspree, accessibility |
| 10 | Lightbox | Full-screen image modal, keyboard nav |
| 11 | Parallax & Animations | Scroll reveals, parallax sections, navbar transition |
| 12 | Polish & Deployment | Mobile nav, reduced-motion, README, `next build` pass |

Each phase is independently committable. After each phase the site should be in a working, non-broken state — even if some features are stubs.

---

## Project Overview

Build a **Next.js 14+ portfolio website** for **Stuart Aitken / Aitken Interactive** — a UX strategy and decision design consultancy. The site must feel like a **luxury editorial publication**: cinematic, spacious, typographically authoritative, and scroll-driven. The primary visual reference is [omaivillas.com/villas/omai-zile/](https://omaivillas.com/villas/omai-zile/) — study it carefully before writing a single line of code. Replicate its pace, parallax language, full-bleed imagery, typography scale, and section cadence. Do not copy its content — translate its visual grammar into Stuart's brand.

The site must be **Vercel-ready** from day one. Content lives in **JSON files** that function as a lightweight CMS — all copy, metadata, case study content, services, and gallery data must be editable without touching component code.

---

## Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript throughout
- **Styling:** CSS Modules + CSS Custom Properties (brand token system defined below). No Tailwind. No CSS-in-JS.
- **Fonts:** Google Fonts — `Playfair Display` (display/headings), `DM Sans` (body), `DM Mono` (labels, tags, metadata). Load via `next/font/google`.
- **Images:** `next/image` for all images. Unsplash placeholder images throughout (use `https://images.unsplash.com/photo-[id]?w=1600&q=80` format). Choose contextually relevant Unsplash images — dark interiors, architectural details, screens and devices, strategic meetings, design process — not generic stock.
- **Parallax:** Implement using `IntersectionObserver` + CSS `transform: translateY()` driven by scroll position. No parallax libraries. Keep it smooth and performant with `will-change: transform` and `requestAnimationFrame`.
- **Forms:** Formspree (`https://formspree.io/f/YOUR_FORM_ID` — leave as placeholder constant in a config file)
- **Animations:** CSS transitions and keyframes for page-load reveals. Use `IntersectionObserver` to trigger fade-up animations when sections enter the viewport. No animation libraries.
- **Lightbox/Modal:** Custom built. No third-party modal libraries.

---

## Brand Token System

Implement these as CSS custom properties on `:root`. **Always use semantic tokens in component styles — never primitive hex values directly.**

```css
:root {
  /* Primitives */
  --color-sienna:     #B8401A;
  --color-charcoal:   #1C1E1A;
  --color-stone:      #4a4b47;
  --color-mid-grey:   #62635e;
  --color-warm-grey:  #7C7D77;
  --color-parchment:  #ece9e3;
  --color-surface:    #d7d1c5;
  --color-white:      #ffffff;

  /* Semantic */
  --color-brand-primary:    var(--color-sienna);
  --color-brand-authority:  var(--color-charcoal);
  --color-text-primary:     var(--color-stone);
  --color-text-secondary:   var(--color-mid-grey);
  --color-text-muted:       var(--color-warm-grey);
  --color-text-inverse:     var(--color-parchment);
  --color-text-on-primary:  var(--color-white);
  --color-surface-base:     var(--color-parchment);
  --color-surface-raised:   var(--color-white);
  --color-surface-subtle:   var(--color-surface);
  --color-surface-inverse:  var(--color-charcoal);
  --color-border-default:   var(--color-surface);
  --color-border-strong:    var(--color-mid-grey);

  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'DM Mono', monospace;

  /* Spacing scale */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  --space-2xl: 12rem;

  /* Type scale */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;
  --text-2xl: 2rem;
  --text-3xl: 3rem;
  --text-4xl: 4rem;
  --text-5xl: 6rem;
  --text-hero: clamp(4rem, 10vw, 9rem);
}
```

### Typography Rules
- **H1:** `Playfair Display`, `--text-hero` or `--text-5xl`, `--color-brand-authority`, `font-weight: 400` (not bold — let the typeface carry authority)
- **H2:** `Playfair Display`, `--text-3xl` to `--text-4xl`, `--color-brand-authority`
- **H3:** `Playfair Display`, `--text-xl`, `--color-brand-authority`
- **Section labels / eyebrows:** `DM Mono`, `--text-xs`, `letter-spacing: 0.2em`, `text-transform: uppercase`, `--color-text-muted` — these appear above headings like "Services —" or "01 — Work"
- **Body copy:** `DM Sans`, `--text-base` or `--text-lg`, `--color-text-primary`, `line-height: 1.7`
- **Captions / metadata:** `DM Mono`, `--text-xs`, `--color-text-muted`

### Sienna Accent Rules
- Left-border decorative rule on H2 sections: `4px solid var(--color-brand-primary)`
- CTA button fill
- Active nav indicator (thin underline or dot)
- Hover states on links
- Section number prefixes (e.g. "01", "02")
- **Never** use as a background fill larger than a button

---

## File & Folder Architecture

```
/
├── app/
│   ├── layout.tsx              # Root layout — nav, modal provider, fonts
│   ├── page.tsx                # Home page
│   ├── about/
│   │   └── page.tsx
│   ├── work/
│   │   ├── page.tsx            # Work index — editorial grid
│   │   └── [slug]/
│   │       └── page.tsx        # Individual case study
│   ├── services/
│   │   └── page.tsx
│   └── globals.css             # CSS custom properties + resets
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky top nav
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── ContactModal.tsx    # Universal contact modal
│   │   ├── Lightbox.tsx        # Full-screen image lightbox
│   │   ├── ParallaxSection.tsx # Reusable parallax image section
│   │   ├── SectionLabel.tsx    # Eyebrow label (DM Mono, uppercase)
│   │   ├── ServiceCard.tsx
│   │   ├── CaseStudyCard.tsx   # Work index card
│   │   └── ImageCarousel.tsx   # Horizontal swipe carousel
│   └── home/
│       ├── Hero.tsx
│       ├── Intro.tsx
│       ├── ServicesTeaser.tsx
│       ├── WorkTeaser.tsx
│       └── CtaBanner.tsx
│
├── content/                    # ← ALL EDITABLE CONTENT LIVES HERE
│   ├── site.json               # Global: name, tagline, bio, nav, social
│   ├── services.json           # All 6 service slots (2 active, 4 placeholder)
│   ├── work.json               # Work index metadata + slugs
│   ├── case-studies/
│   │   ├── project-one.json
│   │   ├── project-two.json
│   │   ├── project-three.json
│   │   ├── project-four.json
│   │   └── project-five.json
│   └── contact.json            # Form field definitions per service
│
├── lib/
│   ├── content.ts              # Typed helpers to read content JSON
│   └── constants.ts            # Formspree endpoint, site URL, etc.
│
└── public/
    └── logo.svg                # Placeholder — Stuart will replace
```

---

## Content JSON Schemas

### `content/site.json`
```json
{
  "name": "Stuart Aitken",
  "company": "Aitken Interactive",
  "title": "Decision Designer & UX Strategist",
  "tagline": "Better products start with better decisions.",
  "bio": "Aitken Interactive helps founders and product leaders build better SaaS products — through UX strategy, design systems, and the design thinking that prevents costly product mistakes before they happen. I am a designer by nature, an empath, and a creator of things. With over 20 years of experience, I have learned that when decisions are evidenced and substantiated with real customers, products win in the market.",
  "domain": "aitken-interactive.co.uk",
  "social": {
    "linkedin": "https://linkedin.com/in/stuartaitken"
  }
}
```

### `content/services.json`
```json
[
  {
    "id": "decision-intelligence-audit",
    "slug": "decision-intelligence-audit",
    "status": "active",
    "name": "Decision Intelligence Audit",
    "shortName": "Decision Audit",
    "tagline": "Certainty under ambiguity. In 72 hours.",
    "description": "When a critical decision is stalling your business, I embed with your team, interrogate the evidence, and deliver a rigorous, structured report that gives you the clarity to act. In 72 hours, I transform ambiguity into actionable intelligence.",
    "duration": "72 hours",
    "deliverable": "Evidence-based decision report",
    "intakeFields": [
      { "name": "name", "label": "Your name", "type": "text", "required": true },
      { "name": "email", "label": "Email address", "type": "email", "required": true },
      { "name": "company", "label": "Company", "type": "text", "required": true },
      { "name": "decision", "label": "Describe the decision you're facing", "type": "textarea", "required": true },
      { "name": "urgency", "label": "When do you need resolution?", "type": "select", "options": ["Within 2 weeks", "Within a month", "Within 3 months", "No hard deadline"], "required": true },
      { "name": "notes", "label": "Anything else I should know?", "type": "textarea", "required": false }
    ]
  },
  {
    "id": "heuristic-evaluation",
    "slug": "heuristic-evaluation",
    "status": "active",
    "name": "Heuristic Evaluation",
    "shortName": "UX Evaluation",
    "tagline": "What your UX is really costing you.",
    "description": "Executive leaders rarely see the full cost of poor UX — until it's too late. In 72 hours I conduct a structured heuristic evaluation of your product and deliver a clear, commercially-framed report that connects UX failures directly to revenue risk and missed opportunity.",
    "duration": "72 hours",
    "deliverable": "Commercially-framed UX impact report",
    "intakeFields": [
      { "name": "name", "label": "Your name", "type": "text", "required": true },
      { "name": "email", "label": "Email address", "type": "email", "required": true },
      { "name": "company", "label": "Company", "type": "text", "required": true },
      { "name": "productUrl", "label": "Product URL (if applicable)", "type": "url", "required": false },
      { "name": "context", "label": "What's the business context?", "type": "textarea", "required": true },
      { "name": "audience", "label": "Who are your primary users?", "type": "text", "required": true },
      { "name": "notes", "label": "Any areas of particular concern?", "type": "textarea", "required": false }
    ]
  },
  {
    "id": "service-03", "status": "coming-soon", "name": "Coming Soon", "tagline": "A new service is in development.", "description": ""
  },
  {
    "id": "service-04", "status": "coming-soon", "name": "Coming Soon", "tagline": "A new service is in development.", "description": ""
  },
  {
    "id": "service-05", "status": "coming-soon", "name": "Coming Soon", "tagline": "A new service is in development.", "description": ""
  },
  {
    "id": "service-06", "status": "coming-soon", "name": "Coming Soon", "tagline": "A new service is in development.", "description": ""
  }
]
```

### `content/case-studies/[slug].json` — Schema
Each case study JSON must conform to this structure:
```json
{
  "slug": "project-slug",
  "title": "Project Title",
  "client": "Client Name",
  "logoUrl": "/images/logos/client-logo.svg",
  "heroImage": "https://images.unsplash.com/photo-XXXXX?w=1600&q=80",
  "summary": "One sentence describing the engagement.",
  "role": "UX Strategy Lead",
  "duration": "6 weeks",
  "year": "2024",
  "tags": ["UX Strategy", "Decision Design", "SaaS"],
  "indexImage": "https://images.unsplash.com/photo-XXXXX?w=800&q=80",
  "indexTeaser": "Short editorial teaser shown on the work index.",
  "sections": {
    "oversight": {
      "blurb": "Full paragraph describing the project and its context.",
      "keyFacts": [
        { "label": "Client", "value": "Client Name" },
        { "label": "Role", "value": "UX Strategy Lead" },
        { "label": "Duration", "value": "6 weeks" },
        { "label": "Year", "value": "2024" }
      ]
    },
    "problem": {
      "heading": "The Problem",
      "body": "Full description of the problem faced. Multiple paragraphs supported.",
      "images": []
    },
    "decision": {
      "heading": "The Decision",
      "body": "Description of the strategic decision made in response to the problem.",
      "images": []
    },
    "methods": {
      "heading": "Methods",
      "body": "Detailed description of the methods used.",
      "steps": [
        {
          "number": "01",
          "title": "Step title",
          "description": "Step description.",
          "image": "https://images.unsplash.com/photo-XXXXX?w=1200&q=80",
          "imageCaption": "Caption for this step image."
        }
      ]
    },
    "solution": {
      "heading": "The Solution",
      "body": "Description of the solution implemented.",
      "images": [
        {
          "url": "https://images.unsplash.com/photo-XXXXX?w=1200&q=80",
          "caption": "Figure 1 — caption text."
        }
      ]
    },
    "outcomes": {
      "heading": "Outcomes",
      "body": "Narrative description of results.",
      "metrics": [
        { "value": "47%", "label": "Increase in conversion rate" },
        { "value": "3.2×", "label": "Return on project investment" },
        { "value": "12 hrs", "label": "Weekly decision time saved" }
      ]
    },
    "reflection": {
      "heading": "Reflection",
      "body": "Personal reflection: lessons learned, what I'd do differently, future improvements."
    }
  },
  "gallery": [
    {
      "url": "https://images.unsplash.com/photo-XXXXX?w=1600&q=80",
      "caption": "Caption text."
    }
  ]
}
```

Seed **5 placeholder case studies** using this schema with realistic-sounding fictional content that fits Stuart's consultancy (SaaS products, UX strategy, decision-making). Use contextually relevant Unsplash images.

---

## Navigation

**Sticky top navbar.** Starts transparent over the hero (white logo/links). Transitions to `--color-surface-base` background with `--color-brand-authority` text on scroll (after ~80px). Smooth `transition: background 0.3s ease`.

```
[Logo/Wordmark]                    Home  About  My Work  My Services  Contact
```

- Logo: `public/logo.svg` loaded via `next/image`. Placeholder: styled text wordmark — "Aitken" in `Playfair Display` + "Interactive" in `DM Mono`.
- Links: `DM Mono`, `--text-xs`, `letter-spacing: 0.15em`, `text-transform: uppercase`
- Active link: thin `2px` underline in `--color-brand-primary`
- **Contact** link: does not navigate — fires the `ContactModal` instead
- Mobile: hamburger menu. Full-screen overlay menu in `--color-surface-inverse` with links in large `Playfair Display`

---

## Pages — Detailed Specification

---

### 1. Home (`/`)

**Section 1 — Hero**
- Full viewport height (`100vh`)
- Large Unsplash still image as background (`next/image` with `fill` and `object-fit: cover`)
- Dark overlay gradient: `linear-gradient(to bottom, rgba(28,30,26,0.5) 0%, rgba(28,30,26,0.3) 60%, rgba(28,30,26,0.7) 100%)`
- Centred text stack on the image:
  - Eyebrow label: `DM Mono` — `"Decision Designer — Aitken Interactive"`
  - H1: `Playfair Display`, `--text-hero`, white — `"Better products start with better decisions."`
  - Subline: `DM Sans`, `--text-lg`, parchment at 80% opacity — Stuart's positioning statement (one sentence)
  - CTA button: `"Start a conversation"` — opens ContactModal. Sienna fill, white text, no border-radius (sharp corners are more authoritative)
- Scroll indicator: animated downward chevron, bottom-centre, white

**Section 2 — Introduction (Parchment background)**
- Two-column layout at desktop: large pull-quote left, body text right
- Pull quote: `Playfair Display`, `--text-3xl`, `--color-brand-authority`, with a `4px` left border in `--color-brand-primary`
- Pull quote text: *"I have learned that when decisions are evidenced and substantiated with real customers, products win in the market."*
- Right column: Stuart's full bio paragraph

**Section 3 — Parallax break (full-bleed)**
- Full-width image section, `60vh` tall
- Parallax scroll effect: the image scrolls at 60% of page scroll speed (CSS or JS implementation)
- Dark overlay, centred text: section label `"— Services"` + short punchy line

**Section 4 — Services Teaser (Charcoal background)**
- Section label: `"01 — What I Do"`
- Heading: `"Two services. Both deliver in 72 hours."`
- Show the 2 active services as large cards — dark surface, parchment text, Sienna accent rule on hover
- Each card: service name, tagline, duration badge, brief description, `"Learn more →"` link
- Below the 2 cards: a muted row of 4 "coming soon" placeholder slots, visually subdued (lower opacity, `"Coming Soon"` label)
- CTA: `"Explore all services →"`

**Section 5 — Work Teaser (Parchment background)**
- Section label: `"02 — Selected Work"`
- Heading in large `Playfair Display`
- Show 3 featured case study cards in a horizontal scroll on mobile, 3-column grid on desktop
- Each card: full-bleed project image, client name, project title, tags, year
- Hover: image scales subtly (1.03), overlay fades in with project tagline
- CTA: `"View all work →"`

**Section 6 — CTA Banner (Charcoal background)**
- Full-width dark panel
- Large heading: `"Have a decision to make?"`, `Playfair Display`, parchment
- Subline: `DM Sans`, warm grey
- Two buttons: `"Get the Audit"` + `"Get the Evaluation"` — both open ContactModal pre-filled with that service selected

---

### 2. About (`/about`)

**Hero:** Full-bleed image (`70vh`), parallax, with Stuart's name and title overlaid. Fade-up animation on scroll.

**Section — Who I Am:**
- Large editorial section. Generous whitespace. Pull quote + portrait image (Unsplash placeholder — atmospheric, not a headshot).
- Full bio text from `site.json`
- Sienna accent rule on pull quote

**Section — Experience / Credentials (Charcoal background):**
- Timeline-style layout: key milestones listed with year, role, context
- `DM Mono` for years, `Playfair Display` for role titles
- Placeholder content: 5–6 milestone entries

**Section — Values:**
- 3-column cards on parchment
- Each: a single value name in `Playfair Display`, a short description in `DM Sans`
- Placeholder values: *Evidence Over Assumption*, *Clarity Under Pressure*, *Design as Strategy*

**CTA:** Same charcoal CTA banner as home — `"Work with me"`

---

### 3. My Work (`/work`)

**Hero:** Minimal. Dark charcoal full-width panel, `50vh`. Large `Playfair Display` heading: *"Selected Work"*. Section label above it. No image.

**Editorial Introduction:**
- 2–3 sentences of scene-setting editorial copy below the hero on parchment. `DM Sans`, `--text-lg`, generous line height.

**Work Grid:**
- Masonry-style or alternating-layout grid (not a uniform grid — vary proportions like a magazine spread)
- Each case study entry:
  - Full-bleed image (tall portrait OR wide landscape, alternating)
  - Category tags (`DM Mono`, small, `--color-brand-primary`)
  - Project title (`Playfair Display`, large)
  - Client name + year (`DM Mono`, muted)
  - 1-sentence teaser
  - `"Read the case study →"` link
- Hover on entire card: subtle lift shadow + image scale
- Click navigates to `/work/[slug]`

---

### 4. Case Study (`/work/[slug]`)

Generated from `content/case-studies/[slug].json`. This is the most important page — give it the full editorial treatment.

**Hero:**
- Full-bleed image (`85vh`), parallax
- Dark overlay
- Overlaid: client name (`DM Mono`, small, `--color-brand-primary`), project title (`Playfair Display`, `--text-hero`), role + year + duration as a metadata strip at the bottom of the hero

**Section — Oversight:**
- Parchment background
- Large blurb paragraph in `Playfair Display` italic at `--text-xl`
- Below: a clean facts strip — `Client / Role / Duration / Year` — displayed as a 4-column bar with `DM Mono` labels and `DM Sans` values, separated by thin `--color-border-default` rules
- Client logo if provided

**Section — Problem (Charcoal background):**
- Section number: `"01"` in `Playfair Display`, massive, `--color-brand-primary`, low opacity — decorative background numeral
- Heading: `"The Problem"`
- Body copy

**Section — Decision (Parchment):**
- Section number: `"02"`
- Heading: `"The Decision"`
- Body copy
- If images: full-bleed image break with caption

**Section — Methods (Charcoal):**
- Section number: `"03"`
- Heading: `"Methods"`
- Body intro paragraph
- Steps rendered as a numbered vertical sequence: each step has a number badge, title, description, and optional image (full-width below the text)
- Images open in Lightbox on click

**Section — Solution (Parchment):**
- Section number: `"04"`
- Heading: `"The Solution"`
- Body copy
- Images displayed in a horizontal swipe carousel (the `ImageCarousel` component). Images clickable to open Lightbox.

**Section — Outcomes (Charcoal):**
- Section number: `"05"`
- Heading: `"Outcomes"`
- **Metrics strip:** Large numbers in `Playfair Display`, `--text-4xl`, `--color-brand-primary` — displayed as a 3-column strip with labels below in `DM Mono`. This is the visual centrepiece of the section.
- Below metrics: body narrative copy

**Section — Reflection (Parchment):**
- Section number: `"06"`
- Heading: `"Reflection"`
- Body copy in `DM Sans`, `--text-lg`
- Concluding pull quote if appropriate
- Sienna left-border rule

**Gallery (if present):**
- Full-width section at the bottom of the case study
- Heading: `"Project Gallery"`
- Grid of images with `figure` + `figcaption` elements
- `DM Mono` captions below each image
- Click any image → opens `Lightbox` with full-screen modal, arrow navigation between images, caption shown, keyboard-accessible (ESC to close, arrows to navigate), close button top-right

**Next Case Study:**
- At the very bottom: a full-width teaser card for the next case study with a background image — `"Next project →"`

---

### 5. My Services (`/services`)

**Hero:** Full-bleed parallax image (`70vh`). Overlay heading: `"What I Offer"`. Section label: `"Services"`.

**Active Services (2):**
For each active service, render a large alternating section (image left + text right, then text left + image right):
- Service name in large `Playfair Display`
- Tagline in `Playfair Display` italic
- Full description
- Duration badge: `"72 hour turnaround"` — styled as a pill/badge in `--color-brand-primary`
- Deliverable line
- CTA: `"Enquire about this service"` — opens `ContactModal` with this service pre-selected
- Contextually relevant Unsplash image

**Coming Soon Grid:**
- Below the active services: a muted 4-column grid of the placeholder service slots
- Each: subdued card, `"Coming Soon"` label in `DM Mono`, service number
- Visual language: lower opacity, dashed border in `--color-border-default`

---

## Contact Modal

**This modal must be universally accessible from any page at any time.**

### Architecture
- Managed by a `ContactModalContext` (React Context + `useContext`) at the root layout level
- Any component can call `openContactModal(serviceId?: string)` to open it
- The `Contact` nav link calls `openContactModal()` with no pre-selection
- Service CTAs call `openContactModal('decision-intelligence-audit')` or `openContactModal('heuristic-evaluation')`

### Behaviour
1. **Step 1 — Service Selection:** If no `serviceId` is pre-passed, show a full-screen service picker. Two large cards — one per active service — with name, tagline, and a short description. Visual language: charcoal background, parchment text, Sienna on hover. Click one to advance.
2. **Step 2 — Intake Form:** The form fields are loaded dynamically from `content/services.json` → `intakeFields` array for the chosen service. Render each field by its `type` (text, email, textarea, select, url).
3. **Submission:** POST to Formspree. Show loading state (spinner on button). On success: replace form with a thank-you message. On error: show inline error without losing form data.

### Accessibility Requirements (non-negotiable)
- Modal must trap focus when open (`focus-trap` pattern — cycle through focusable elements with Tab/Shift+Tab)
- `aria-modal="true"`, `role="dialog"`, `aria-labelledby` pointing to the modal heading
- `ESC` key closes the modal
- Return focus to the trigger element on close
- Background page scrolling locked when modal is open (`overflow: hidden` on `body`)
- Close button has `aria-label="Close contact form"`

### Visual Design
- Full-screen overlay: `rgba(28,30,26,0.92)` backdrop
- Modal panel: `--color-surface-raised` (white), max-width `640px`, centred
- Header: service name in `Playfair Display`, close button top-right
- Progress indicator: `"Step 1 of 2"` in `DM Mono`, small, muted
- Inputs: clean, minimal. Border-bottom only (no box border). `DM Sans`. Focus state: `--color-brand-primary` border
- Submit button: `--color-brand-primary` fill, white text, `DM Mono` label, `letter-spacing: 0.1em`, uppercase, sharp corners

---

## Lightbox Component

A full-screen image modal triggered by clicking any image in case study galleries or method step images.

- Backdrop: `rgba(28,30,26,0.97)` — near-black, image is the focus
- Image: `next/image`, `object-fit: contain`, maximum height 90vh, centred
- Caption: below image, `DM Mono`, `--text-sm`, `--color-text-muted`
- Navigation: left/right arrow buttons. Keyboard: left/right arrow keys
- Close: `×` button top-right, `ESC` key
- Accessible: `role="dialog"`, `aria-label="Image lightbox"`, focus trapped

---

## Parallax Component (`ParallaxSection`)

Reusable component used throughout:

```typescript
interface ParallaxSectionProps {
  imageUrl: string;
  imageAlt: string;
  height?: string;         // default: '60vh'
  overlayOpacity?: number; // default: 0.4
  children?: React.ReactNode; // optional overlaid content
}
```

Implementation: `position: relative`, child image `position: absolute, inset: 0`, `transform: translateY(var(--parallax-offset))` driven by a scroll listener using `requestAnimationFrame`. Parallax offset = `scrollY * 0.3` (30% of scroll speed). Clamp the value to prevent over-travel.

---

## Footer

- Charcoal background
- Three columns: Brand (logo + tagline + copyright), Navigation (same 5 links), Connect (LinkedIn link, email)
- Bottom bar: `DM Mono`, `--text-xs`, `--color-text-muted` — `"© 2025 Aitken Interactive. All rights reserved."`
- Sienna accent: thin `1px` top border in `--color-brand-primary`

---

## Animations & Motion

All animations must respect `prefers-reduced-motion`. Wrap all animation declarations in:
```css
@media (prefers-reduced-motion: no-preference) { ... }
```

**Page load:** Hero text fades up with staggered delay:
- Eyebrow label: `opacity 0 → 1`, `translateY(20px → 0)`, `0.6s ease`, delay `0.2s`
- H1: same, delay `0.4s`
- Subline: same, delay `0.6s`
- CTA: same, delay `0.8s`

**Scroll reveals:** All sections fade up on entry:
- `opacity: 0; transform: translateY(40px)` → `opacity: 1; transform: translateY(0)`
- Triggered by `IntersectionObserver` with `threshold: 0.15`
- Duration: `0.7s`, `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

**Hover states:**
- Nav links: `color` transitions, `0.2s ease`
- Cards: `box-shadow` + `transform: translateY(-4px)`, `0.3s ease`
- Buttons: `background-color` darken on hover, `0.2s ease`
- Images in carousels: `transform: scale(1.03)` on parent hover, `0.4s ease`, `overflow: hidden` on parent

---

## Performance & Accessibility Baseline

- All images must have descriptive `alt` text (use placeholder descriptions that make sense in context)
- `next/image` with appropriate `sizes` attribute on all images
- Semantic HTML throughout: `<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<figure>`, `<figcaption>`
- Skip-to-main-content link as the first focusable element in the DOM
- Colour contrast: all text/background pairs must meet WCAG AA minimum (the brand system is pre-audited — stick to it)
- No `outline: none` without a replacement focus indicator
- All interactive elements reachable and operable by keyboard

---

## Constants File (`lib/constants.ts`)

```typescript
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
export const SITE_URL = 'https://aitken-interactive.co.uk';
export const SITE_NAME = 'Aitken Interactive';
```

---

## Seed Data Instructions

Populate **5 case study JSON files** with realistic placeholder content appropriate for a UX strategy / decision design consultancy. Suggested fictional projects:

1. **Reducing churn for a B2B SaaS onboarding flow** — Heuristic evaluation + redesign
2. **Build vs buy decision for a Series A fintech** — Decision Intelligence Audit
3. **Design system consolidation for a scale-up** — Systems strategy
4. **Executive dashboard for a healthcare SaaS** — UX strategy + testing
5. **Pricing page redesign for a PLG product** — Decision audit + UX

Each must have plausible metrics in the Outcomes section. Use contextually relevant Unsplash photos — screens, whiteboards, devices, strategy sessions, design artefacts.

---

## Deployment

- `vercel.json` at root with no custom config needed (Next.js auto-detected)
- `.env.local.example` file listing: `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
- `README.md` with: local setup instructions, content editing guide (how to edit JSON files), logo replacement instructions, Formspree setup guide, Vercel deployment steps

---

## Phase Completion Protocol

After finishing each phase:
1. Run `npx tsc --noEmit` and fix all errors
2. Visually verify the phase works (run `npm run dev`, check in browser)
3. Write the diary entry to `PROGRESS.md` as specified above
4. **Stop and tell the user:** *"Phase [N] — [Name] is complete. PROGRESS.md has been updated. To continue in a new session, open this project in Claude Code and say: 'Read PROGRESS.md and continue from the Next section.'"*
5. Do not begin the next phase unless the user explicitly says to continue in the same session

---

## Definition of Done

Before considering this complete, verify:
- [ ] All 5 pages render without errors
- [ ] ContactModal opens from nav and all CTAs, pre-selects service correctly
- [ ] Case study at `/work/[slug]` renders all 7 sections from JSON data
- [ ] Lightbox opens on gallery/method images, arrow navigation works, ESC closes
- [ ] Parallax effect visible and smooth on all ParallaxSection instances
- [ ] Scroll reveal animations fire correctly on all sections
- [ ] Navbar transitions from transparent to filled on scroll
- [ ] Mobile menu works and closes on link click
- [ ] All form fields from `intakeFields` render correctly per service
- [ ] Formspree submission shows loading → success/error states
- [ ] `prefers-reduced-motion` disables all animations
- [ ] Focus trap works in ContactModal and Lightbox
- [ ] No TypeScript errors (`npx tsc --noEmit` passes)
- [ ] `next build` completes without errors

---

*End of specification. Hand this document to Claude Code in full.*
