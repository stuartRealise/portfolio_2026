# Aitken Interactive — Portfolio

Portfolio site for Stuart Aitken / Aitken Interactive, a UX strategy and decision design consultancy.

Built with Next.js 16 (App Router), TypeScript, and CSS Modules. All content is driven by JSON files in `/content/`.

## Stack

- **Next.js 16** — App Router, SSG for case studies via `generateStaticParams`
- **TypeScript** throughout
- **CSS Modules** + CSS Custom Properties (brand token system, no Tailwind)
- **Fonts**: Playfair Display, DM Sans, DM Mono via `next/font/google`
- **Formspree** for contact form submission
- **Vercel** for deployment

## Local development

```bash
npm install
cp .env.local.example .env.local   # add your Formspree endpoint
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

All site content lives in `/content/`:

| File | Purpose |
|------|---------|
| `site.json` | Global data: bio, social links, about credentials, values |
| `services.json` | Service definitions + intake form field config |
| `work.json` | Work index (5 entries, 3 featured) |
| `contact.json` | General enquiry form fields + messages |
| `case-studies/*.json` | One file per case study slug |

To add a new case study: create `content/case-studies/your-slug.json` following the existing structure, then add it to `content/work.json`.

## Environment variables

```
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

## Deploy

Push to GitHub and connect to Vercel. No extra config required — the `next.config.ts` image remote patterns and turbopack root are already set.
