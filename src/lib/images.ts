/*
 * RESPONSIVE IMAGES
 *
 * Every photograph on the site used to be served at its full desktop size to
 * everyone. 112 files, 26MB, no `srcset` anywhere — a phone on cellular
 * downloaded the same 1600px frame a desktop did, for a slot a few hundred
 * pixels wide. This module is the fix, and it is deliberately shaped so that
 * nothing in `content/` had to change.
 *
 * ---------------------------------------------------------------------------
 * WHY A LOOKUP RATHER THAN IMPORTS
 *
 * The content files describe photographs as strings — `/activities/foo/bar.jpg`
 * — because they are editorial records, not code. Turning each one into an
 * `import` would have meant a module graph in `activities.ts`, which is the
 * wrong shape for a file a human edits to add an event.
 *
 * So the images moved from `public/` (copied verbatim, unprocessed) to
 * `src/assets/` (part of the build, so `vite-imagetools` can see them), and
 * this module rebuilds the old public-style path as the key. The content files
 * kept every string they had.
 *
 * ---------------------------------------------------------------------------
 * THE WIDTHS
 *
 * 480 / 960 / 1600. The largest is the biggest slot on the site (a full-bleed
 * scene on a wide monitor); 960 covers the card grids at 2x and most tablets;
 * 480 is a phone. There is no 2400 step because no source is that wide —
 * imagetools would upscale, which costs bytes and buys nothing.
 *
 * WebP throughout, including the `src`.
 *
 * The first version of this kept a JPEG at `src` as a fallback, which sounds
 * prudent and is not: the only browser that parses `srcset` but not WebP is
 * IE11, which cannot run this site regardless — React 19, container queries,
 * `color-mix`. What it actually did was add 100 files and 8MB to every deploy
 * for a visitor who does not exist. `src` now points at the middle rung, so a
 * browser ignoring `srcset` still gets a sensible file rather than the largest.
 */

/** The generated WebP ladder for each asset, as a ready-made `srcset` string. */
const srcsets = import.meta.glob<string>('../assets/**/*.{jpg,jpeg,png}', {
  eager: true,
  query: '?w=480;960;1600&format=webp&as=srcset',
  import: 'default',
})

/** The middle rung on its own, for `src`. */
const fallbacks = import.meta.glob<string>('../assets/**/*.{jpg,jpeg,png}', {
  eager: true,
  query: '?w=960&format=webp',
  import: 'default',
})

/**
 * Glob keys arrive relative to this file (`../assets/activities/x/y.jpg`).
 * Re-key them to the path the content files already use (`/activities/x/y.jpg`)
 * so nothing outside this module needs to know the assets moved.
 */
function publicStyleKey(globKey: string): string {
  return globKey.replace(/^\.\.\/assets/, '')
}

const bySrcset = new Map<string, string>()
const byFallback = new Map<string, string>()

for (const [key, value] of Object.entries(srcsets)) bySrcset.set(publicStyleKey(key), value)
for (const [key, value] of Object.entries(fallbacks)) byFallback.set(publicStyleKey(key), value)

export interface ResponsiveImage {
  src: string
  srcSet?: string
}

/**
 * Resolves a content-file image path to a `src`/`srcSet` pair.
 *
 * Unknown paths pass straight through as `src`, which is not a fallback so much
 * as a requirement: `partnerLogos` takes arbitrary paths supplied per partner,
 * and anything genuinely external has no build-time variants by definition.
 * Returning it untouched means an unrecognised path renders exactly as it did
 * before this module existed, rather than breaking.
 */
export function image(path: string | undefined): ResponsiveImage {
  if (!path) return { src: '' }
  const srcSet = bySrcset.get(path)
  if (!srcSet) return { src: path }
  return { src: byFallback.get(path) ?? path, srcSet }
}

/*
 * `sizes` presets.
 *
 * A `srcset` without `sizes` makes the browser assume the image fills the
 * viewport, so it picks the largest file every time and the whole ladder is
 * wasted. These describe the slots the site actually has; pass the one that
 * matches the layout the `<img>` sits in.
 *
 * They are approximations on purpose — `sizes` is a hint the browser uses
 * before layout exists, and over-describing it with exact breakpoints makes it
 * brittle without making it more accurate.
 *
 * Measured at a 1470px viewport, against the slots as they actually render —
 * the first cut of these was written by eye and got two of them wrong by more
 * than a rung. Where a preset had to choose, it errs *generous*: over-declaring
 * costs a step of file size, under-declaring costs sharpness on a 2x screen,
 * and only one of those is visible.
 */
export const SIZES = {
  /** A tile in a three-up grid — the gallery, the news cards. Renders ~430px. */
  card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw',
  /** A half-width editorial photograph — the activity lead and its grid. ~710px. */
  half: '(max-width: 1024px) 100vw, 50vw',
  /** A portrait tile — the leadership rail, person cards, small thumbs. */
  portrait: '(max-width: 640px) 60vw, (max-width: 1024px) 33vw, 320px',
  /** A photograph running the full content column. ~1344px on an article. */
  wide: '(max-width: 1024px) 100vw, 88rem',
  /** A frame in the photo reel. Reads as full-bleed, renders ~630px. */
  reel: '(max-width: 640px) 86vw, 640px',
  /** A genuinely full-bleed scene. */
  full: '100vw',
} as const
