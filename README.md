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

---

## Accessibility

Skip link, semantic landmarks, labelled form fields, visible gold focus rings,
`aria-pressed` on filters and selectors, and a decorative-vs-interactive
distinction on the globe (`aria-hidden` in the hero, labelled `img` role when
interactive). Colour pairings hold WCAG AA against the navy background.
