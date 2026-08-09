# IES Global Foundation — Website

The international website of the **IES Global Foundation**, the body coordinating
the national branches of the Interscholastic Ethics Society in Korea, the United
States, and the United Kingdom.

> **Read [REVIEW.md](./REVIEW.md) before publishing.** It lists every factual
> claim on the site and who has to sign it off.

---

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
| `npm run sitemap` | Rewrites `public/sitemap.xml` from routes + content |

Stack: React 19, TypeScript, Vite, Tailwind CSS v4, React Router.

---

## Editing content — start here

**No component contains copy.** Everything editable lives in `src/content/`, so
updating the site does not mean touching layout code.

| File | What it controls |
| --- | --- |
| `site.ts` | Name, mission, vision, values, Three A's, navigation, contacts, socials |
| `branches.ts` | The three national branches — facts, sections, contacts |
| `leadership.ts` | People, biographies, Foundation offices |
| `work.ts` | The three pillars and the five programme areas |
| `activities.ts` | Documented programme activity, with photography |
| `impact.ts` | Statistics, impact stories, timeline |
| `news.ts` | News articles |
| `partners.ts` | Partner categories, named partners, logos |
| `join.ts` | Join pathways, chapter process, expectations, FAQs |
| `legal.ts` | Privacy, Terms, Participant Safety, Governance |

`types.ts` defines the shape of everything. If TypeScript is happy, the site will
render.

### Common tasks

**Add a news article** — append to `articles` in `news.ts`. Sorting, filtering,
the article page, and the sitemap all update automatically.

```ts
{
  slug: 'a-url-safe-slug',
  title: 'Headline',
  date: '2026-08-14',          // ISO; the site sorts on this
  category: 'Announcement',    // see NewsCategory in types.ts
  branch: 'IES Korea',
  summary: 'One or two sentences.',
  body: [
    { type: 'paragraph', text: '…' },
    { type: 'heading', text: '…' },
    { type: 'list', items: ['…'] },
    { type: 'quote', text: '…', attribution: '…' },
  ],
}
```

Without a `cover` image the site generates a deterministic patterned cover, so
the news index never looks broken.

**Add an activity** — append to `activities` in `activities.ts`, newest first.
The entry appears on Our Work (whole network) and on its branch page, and the
`workCategory` field files it under one of the five programme areas.

```ts
{
  id: 'a-url-safe-slug',       // also the anchor: /our-work#a-url-safe-slug
  title: 'As the branch itself titles it',
  kind: 'Ethics Forum',        // see ActivityKind in types.ts
  branch: 'korea',
  date: 'March 14, 2026',      // omit rather than invent one
  location: 'Where it happened',
  participants: 'Guests, partners, institutions',
  summary: 'One or two sentences.',
  body: ['A paragraph.', 'Another.'],
  photos: [{ src: '/activities/<id>/lead.jpg', alt: 'What is in the frame.' }],
  workCategory: 'civic-responsibility',
}
```

Photographs live in `public/activities/<id>/`. Resize to 1600px on the long edge
before committing — the originals off the branch sites run to 5 MB each. `alt` is
required, not optional: these images are records of events, and a caption that
overstates what a photograph shows is a factual claim like any other. The first
photo in the array is the wide lead image; the rest form the grid beneath it —
the column count adapts, and four photos lay out 2×2 rather than 3+1.

Where the branch publishes the guest's own portrait, set `portrait` as well. It
renders beside the event details rather than in the grid, because a supplied
studio portrait is not a record of the event.

Two directories hold media that nothing renders yet, and REVIEW.md says why:
`public/brand/` (the historical IES marks) and the video files under
`public/media/` and `public/activities/ymun-korea-community-fair/`. Delete them
rather than leave them if the review decides against using them — they are the
largest files in the repository.

**Give a work area a photograph** — set `image` and `imageAlt` on the entry in
`work.ts`. Pointing it at a file already under `public/activities/` avoids
shipping the same photograph twice. The examples list moves alongside the prose
rather than disappearing.

**Add a leader** — append to `people` in `leadership.ts` with `tier` set to
`founding`, `global`, or `national` (and `branch` for national roles). Drop a
headshot in `public/leadership/` and set `photo: '/leadership/name.jpg'`; without
one, a monogram is used.

**Fill a Foundation office** — set `holder` on the entry in `globalOffices` to a
person's `id`. Offices with no holder render as "Appointment to be confirmed"
rather than being quietly hidden — deliberate, so the page never invents titles.

**Add a fourth branch** — append to `branches` in `branches.ts`. The globe, the
network page, the org chart, the footer, and the sitemap all pick it up; only
`BranchSlug` in `types.ts` needs the new slug added.

**Change statistics** — `headlineStats` and `impactStats` in `impact.ts`. The
count-up animation reads the `value` field.

---

## Design system

Tokens live at the top of `src/index.css` under `@theme`. Change them there and
the whole site follows.

| Token | Value |
| --- | --- |
| `--color-navy` | `#071A33` primary |
| `--color-navy-700` | `#0D294D` secondary |
| `--color-paper` | `#F7F9FC` |
| `--color-gold` | `#C8A96B` accent — used sparingly |
| `--color-mist` | `#AAB4C2` muted |
| `--color-sky` | `#8EB8E8` |

Type: Cormorant Garamond (headings) + Inter (body). Sizes are fluid via
`clamp()` — `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`.

Reusable pieces: `Container`, `Section`, `Eyebrow`, `SectionHeading`, `Button`,
`Card`, `Rule` in `components/ui/Primitives.tsx`; `Reveal` for scroll-in;
`Counter`/`StatBlock` for animated figures; `PageHero`, `Cards`, `CallToAction`,
`OrgChart`, `ContactForm` in `components/sections/`.

### The globe

`components/Globe.tsx` draws an orthographic wireframe globe on canvas —
graticule, schematic continents, branch markers, and animated great-circle arcs
between them. It is interactive on the Global Network page (hover, click,
rotate-to-marker) and decorative in the hero.

Two things worth knowing:

- The continent outlines are **deliberately coarse**. The globe is a brand
  element, not a map; no borders are drawn.
- The render loop pauses when the canvas scrolls off screen. It is *not* gated on
  `document.hidden` — some embedding contexts report a document as permanently
  hidden, which would leave the globe blank.

All motion respects `prefers-reduced-motion`.

---

## Contact form

`components/sections/ContactForm.tsx`. Set `VITE_CONTACT_ENDPOINT` in `.env` to
any URL accepting a JSON POST:

```
VITE_CONTACT_ENDPOINT=https://your-endpoint.example/contact
```

With no endpoint configured it opens a pre-filled mail draft, so a message is
never silently dropped. Spam protection is a hidden honeypot field plus a
minimum time-on-form check — no third-party script, no CAPTCHA.

---

## SEO

Per-page titles, descriptions, canonicals, and Open Graph tags come from the
`useSeo` hook (`src/lib/seo.ts`) called at the top of each page. Organization
JSON-LD is in `index.html`. `public/sitemap.xml` is generated by
`scripts/generate-sitemap.mjs`, which reads slugs out of the content files.

---

## Deploying

Static build — `dist/` works on Vercel, Netlify, Cloudflare Pages, or GitHub
Pages. Because routing is client-side, **all paths must rewrite to
`/index.html`** or deep links will 404.

Netlify (`public/_redirects`):

```
/*  /index.html  200
```

Vercel (`vercel.json`):

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

### Site origin

The canonical link, `og:url`, `og:image`, JSON-LD, `sitemap.xml` and
`robots.txt` all need an absolute URL. That origin is resolved once, at build
time, by `scripts/site-origin.mjs`:

| Source | When it applies |
|---|---|
| `SITE_ORIGIN` | Explicit override — set this once the real domain is live |
| `VERCEL_PROJECT_PRODUCTION_URL` | Vercel production builds |
| `VERCEL_URL` | Vercel preview builds |
| `https://iesglobalfoundation.org` | Local builds, which are never crawled |

So a Vercel deploy advertises its own URL with no configuration. Once
`iesglobalfoundation.org` is registered and pointed at the deployment, set
`SITE_ORIGIN` in the Vercel project's environment variables and redeploy.

This matters because the failure is silent: a canonical pointing at a domain
that does not resolve tells search engines the real page lives elsewhere, and an
unreachable `og:image` means no preview card when the link is shared. The site
itself looks perfectly fine either way.

Note that the origin must always be absolute — Vite resolves URLs in
`index.html` as build assets, so a root-relative `/` makes it try to read the
project directory and the build fails.

### Contact form

`VITE_CONTACT_ENDPOINT` sets where the contact form POSTs. Unset, the form falls
back to opening a pre-filled mail draft, so it never silently drops a message.
`VITE_`-prefixed variables are **baked into the client bundle and publicly
readable** — fine for an endpoint URL, never for a secret.

---

## Accessibility

Skip link, semantic landmarks, labelled form fields, visible gold focus rings,
`aria-pressed` on filters and selectors, and a decorative-vs-interactive
distinction on the globe (`aria-hidden` in the hero, labelled `img` role when
interactive). Colour pairings hold WCAG AA against the navy background.
