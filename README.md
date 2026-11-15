# IES Global Foundation — Website

A single-page introduction to IES Global Foundation: why it exists, how it
relates to IES Korea and IES United States, the IES Leadership Council, and how
leadership continues from one generation of students to the next.

Program catalogs, events, chapters, membership, and impact live on the branch
sites ([ie-society.com](https://ie-society.com/), [iesusa.space](https://iesusa.space/)).
This site links to them and does not repeat them.

> **Read [REVIEW.md](./REVIEW.md) before publishing.** It lists the facts that
> still need confirmation from the project owner.

## Running it

```bash
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server at <http://localhost:5173> |
| `npm run build` | Regenerates the sitemap, typechecks, builds to `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run typecheck` | TypeScript only |
| `npm run lint` | oxlint |

Stack: React 19, TypeScript, Vite, Tailwind CSS v4, React Router.

## Editing content

| What | Where |
| --- | --- |
| Home page wording | `src/content/home.ts` |
| People (Council, founders, branch presidents) | `src/content/leadership.ts` |
| Branches, contact address, navigation, page title/description | `src/content/site.ts` |
| Policy pages | `src/content/legal.ts` |
| Retired routes and where they redirect | `src/content/redirects.json` (mirror changes into `vercel.json`) |

### People

Each person is one record in `src/content/leadership.ts`. A record renders only
when `approved: true`, and each field renders only when it is filled in, so a
missing fact never leaves a broken layout.

- `category` decides where a person appears: `council-active` and
  `council-alumni` (the Council roster), `founding` (Founding leadership row),
  `executive` (Executive Leadership Team row, below the Council: officers
  who support the organization but aren't Council members), and
  `branch-representative` (Current branch leadership row under Branches).
- While there is no confirmed `council-active` member, the Council section shows
  "Council formation in progress" and the Founding leadership row only.
- `formerRoles[].years` is for **verified** service years only. Never derive
  them from graduation years.
- Portraits go in `src/assets/leadership/` and are referenced as
  `photo: '/leadership/<file>.jpg'`. Only use a photo whose identity is
  confirmed. Portraits from the previous site that are not in use are kept in
  `assets-archive/` (outside the build).

## Structure

```
src/
  pages/Home.tsx              Hero → Purpose → Branches → Council → Continuity
  components/home/            One file per home-page section, plus PersonCard
  components/layout/          Header (four anchors), Footer, Layout
  pages/Contact.tsx           Contact form (Web3Forms) + email + branch links
  pages/LegalPage.tsx         Privacy, Terms, Participant Safety
```

## Forms

`src/components/sections/ContactForm.tsx` posts to **Web3Forms**, which emails
the submission to the inbox the access key belongs to. If that fails, the
visitor gets a pre-filled `mailto:` draft. The key in `src/lib/forms.ts` is a
public identifier, not a secret; set `VITE_WEB3FORMS_KEY` to rotate it.

## Deploying

Static build, hosted on Vercel. `vercel.json` rewrites every path to
`/index.html` (client-side routing), sends the security headers, and redirects
the previous site's routes to the matching home-page section. The redirects are
currently temporary (`permanent: false`); switch them to permanent once the
redesign is approved.

The absolute origin used by the canonical link, Open Graph tags, sitemap, and
robots.txt is resolved at build time by `scripts/site-origin.mjs`
(`SITE_ORIGIN` → `VERCEL_PROJECT_PRODUCTION_URL` → `VERCEL_URL` → fallback).
Set `SITE_ORIGIN` once a custom domain is live.
