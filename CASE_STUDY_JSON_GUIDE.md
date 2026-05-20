# Case Study JSON Guide

This is your practical guide for adding and editing case studies safely.

## 1) How the system works

Your case study content is split into two places:

- `content/work.json`
- `content/case-studies/<slug>.json`

`work.json` controls listings and navigation:

- Home page featured cards
- `/work` grid cards
- Next-project card order on case study pages

Each `content/case-studies/<slug>.json` controls the full `/work/<slug>` page content.

## 2) The slug rule (most important)

For each project, these should all match:

1. Filename: `content/case-studies/<slug>.json`
2. `work.json` item: `"slug": "<slug>"`
3. Case-study JSON field: `"slug": "<slug>"`
4. URL: `/work/<slug>`

If these do not match, pages can link to the wrong content or 404.

## 3) What each JSON field controls

| Field | File | Used in UI |
|---|---|---|
| `slug` | `work.json` | Links to `/work/[slug]`, next-project order |
| `title` | `work.json` | Card title on home + `/work` |
| `client`, `year` | `work.json` | Card metadata line |
| `tags` | `work.json` | Tag pills on cards (first 2 shown) |
| `indexImage` | `work.json` | Card image + next-project background |
| `indexTeaser` | `work.json` | Card teaser text |
| `featured` | `work.json` | Included on home “Selected Work” section |
| `title` | `case-studies/<slug>.json` | Case-study page H1 + browser page title |
| `summary` | `case-studies/<slug>.json` | SEO/meta description |
| `heroImage` | `case-studies/<slug>.json` | Hero background |
| `client`, `role`, `duration`, `year` | `case-studies/<slug>.json` | Hero metadata strip |
| `sections.oversight` | `case-studies/<slug>.json` | Intro blurb + key facts strip |
| `sections.problem` | `case-studies/<slug>.json` | Problem section |
| `sections.decision` | `case-studies/<slug>.json` | Decision section + inline images |
| `sections.methods` | `case-studies/<slug>.json` | Methods + steps grid |
| `sections.solution` | `case-studies/<slug>.json` | Solution + image carousel |
| `sections.outcomes` | `case-studies/<slug>.json` | Metrics strip + outcomes narrative |
| `sections.reflection` | `case-studies/<slug>.json` | Reflection section |
| `gallery` | `case-studies/<slug>.json` | Project Gallery with lightbox |

## 4) Safe editing workflow

1. Copy an existing case-study JSON as a template.
2. Choose the new slug in kebab-case.
3. Create `content/case-studies/<new-slug>.json`.
4. Set `"slug": "<new-slug>"` inside that JSON.
5. Add a matching entry in `content/work.json` with the same slug.
6. Decide `featured: true/false` for homepage inclusion.
7. Run validator:

```bash
npm run validate:case-studies
```

8. Run site and click through:

```bash
npm run dev
```

Then test:

- `/work`
- `/work/<new-slug>`
- homepage Selected Work cards
- next-project link at bottom of case study

## 5) Current gotchas already in this repo

- `work.json` includes slug `test`.
- `content/case-studies/test.json` currently has `"slug": "saas-onboarding-churn"` inside.

This mismatch should be fixed to keep content management clean.

## 6) Validation script included

Script file:

- `scripts/validate-case-studies.mjs`

Command:

```bash
npm run validate:case-studies
```

It checks:

- `work.json` has valid/unique slugs
- every work slug has a matching case-study file
- every case-study file has a matching work slug
- each case-study JSON has required top-level keys
- each case-study JSON `slug` matches its filename
- required sections exist
