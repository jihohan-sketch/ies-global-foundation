import type { ReactNode } from 'react'
import { Globe, type GlobeMarker } from '@/components/Globe'
import { Button, Container, Eyebrow } from '@/components/ui/Primitives'
import { Seam, Vignette } from '@/components/ui/Cinematic'
import { branches } from '@/content/branches'
import { headlineStats } from '@/content/impact'
import { image } from '@/lib/images'
import { cx } from '@/lib/utils'

/* ==========================================================================
   HOME HERO
   ==========================================================================

   SIMPLIFIED. WHAT CAME OUT, AND WHY EACH THING WENT.

   The hero this replaces was already down to one screen and two columns, which
   was the right structure. What it was not was quiet. On the right it carried a
   three-frame photo cluster, each frame with a caption and a venue that arrived
   on hover; on the left, a 48-word paragraph; underneath, four figures. Six
   separate pieces of copy, three of them behind an interaction, all competing
   for the same first three seconds.

   None of that was badly made. It was simply too much for the one job a first
   screen has, which is to be understood at a glance.

     THE PARAGRAPH   48 words → 26, in two short sentences. It still answers
                     what IES is and what students actually do; it no longer
                     asks for a second read to get there.
     THE PHOTOGRAPHS 3 → 1. The cluster was a composition a reader had to
                     parse. One large frame is an image they receive. The one
                     kept is the student at the microphone — the only picture on
                     the site of the act the organisation is actually about.
     THE CAPTIONS    Gone from the frame, down to a single quiet line beneath
                     it. A hover that reveals a venue is a nice detail on a
                     gallery tile and a distraction on the first screen; it also
                     meant the venue did not exist at all for a touch reader.
     THE FIGURES     4 → 3. Members, chapters, branches — scale, reach, and
                     spread, with nothing that repeats another. "Schools
                     represented" and "people reached" are on the Impact page,
                     which is where a visitor who wants the fuller count goes.

   What did not change: the slogan, the globe, the ground, and the two actions.
   The globe is still the identity and still the ground rather than the subject
   — dimmed, offset right, read through and around the photograph.

   NOTHING HERE PINS. The entrances are a CSS stagger rather than the site's
   `Reveal`: a first screen should assemble once and be finished, and it should
   not wait on React and an IntersectionObserver to become legible.
   ========================================================================== */

const markers: GlobeMarker[] = branches.map((branch) => ({
  id: branch.slug,
  label: branch.name,
  lat: branch.point.lat,
  lon: branch.point.lon,
}))

/*
 * The photograph, and why it is this one.
 *
 * A student at a microphone, mid-sentence, reading from her own brief in a
 * working council chamber. Of every image the site holds it is the only one
 * that shows the thing the sentence beside it claims — a student arguing a
 * prepared position in public. A service photograph would be warmer and a
 * photograph of six students across a table from a general is better evidence
 * that this is a real organisation, but neither of those is what the headline
 * is about, and the point of cutting three frames to one is that the one left
 * has to be the argument rather than a sample of the range.
 *
 * The caption is not decoration. An uncaptioned photograph on a foundation
 * site is indistinguishable from stock, which is precisely the charge a
 * student-run organisation has to answer; naming the venue is what turns a
 * picture into a record.
 */
const shot = {
  src: '/activities/environmental-ethics-forum/speaking.jpg',
  alt: 'An IES student speaking into a chamber microphone from a prepared brief during the Environmental Ethics Forum, with a second student following the text behind her.',
  caption: 'Environmental Ethics Forum',
  place: 'Nowon-gu Council, Seoul',
} as const

/** The three figures the first screen carries. Order is the order shown. */
const HERO_STATS: readonly string[] = ['Members', 'Chapters', 'National branches']

const stats = HERO_STATS.map((label) => headlineStats.find((s) => s.label === label)).filter(
  (s): s is (typeof headlineStats)[number] => Boolean(s),
)

/* --------------------------------------------------------------- Enter */

/**
 * The first-screen entrance: a CSS animation with a stagger, no observer.
 *
 * Deliberately not `Reveal`. See the FIRST-SCREEN ENTRANCE note in index.css —
 * the short version is that `Reveal` cannot paint until React has hydrated and
 * an IntersectionObserver has fired, which is a poor trade for the one block of
 * content that is on screen before anything has scrolled.
 */
function Enter({
  delay = 0,
  className,
  children,
}: {
  delay?: number
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cx('hero-in', className)}
      style={{ '--hero-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ Hero */

export function HomeHero() {
  return (
    <section
      aria-label="IES Global Foundation"
      className="relative isolate overflow-hidden bg-navy"
    >
      {/* ------------------------------------------------------- the world */}
      {/*
       * Offset to 58% rather than centred, and bled off the right edge.
       *
       * Centred, the sphere's brightest band runs straight under the headline
       * and the type needs a wash across the middle of the frame to hold it
       * off — a fix that flattens the globe into a grey stripe to protect text
       * that should not be sitting there in the first place. Pushed right, the
       * type column sits over the dark left field and needs no wash at all;
       * what shows past the photograph is the limb and the graticule, which is
       * the part that reads as *globe*.
       */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-[58%] -z-10 -translate-x-1/2 -translate-y-1/2 max-lg:left-[64%] max-lg:opacity-45"
      >
        <Globe
          markers={markers}
          intensity={0.7}
          className="h-[min(104vh,74rem)] w-[min(104vh,74rem)] opacity-[0.85]"
        />
      </div>

      {/* One low warm wash behind the photograph. The ground here is near-black
          and the section it opens is about people, so a frame lit only by a
          blue globe reads cold whatever is photographed in it. Gold at 9% is
          under the threshold where it would be seen as a colour and over the
          one where the corner stops feeling lit. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_58%_54%_at_74%_38%,rgba(200,169,107,0.09),transparent_70%)]"
      />

      <Vignette className="-z-10" />

      {/* The reading scrim: solid on the left where the sentence is, gone by
          the middle of the frame. One gradient replaces both a horizontal wash
          and any opacity reduction on the globe. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(5,11,22,0.96)_0%,rgba(5,11,22,0.86)_26%,rgba(5,11,22,0.45)_52%,rgba(5,11,22,0.2)_74%,transparent_100%)] max-lg:bg-[linear-gradient(to_bottom,rgba(5,11,22,0.94)_0%,rgba(5,11,22,0.7)_48%,rgba(5,11,22,0.9)_100%)]"
      />

      <Container
        size="wide"
        className={cx(
          'relative z-10 flex min-h-dvh flex-col justify-center',
          /* Clears the header at every width. At xl the bar is two rows — the
             6rem primary row plus the nav rail under it — which comes to about
             9.5rem before the rail collapses on scroll. */
          'pt-28 pb-14 sm:pt-32 sm:pb-16 xl:pt-40',
        )}
      >
        <div className="grid items-center gap-y-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-x-14 xl:gap-x-20">
          {/* ------------------------------------------------- the argument */}
          <div className="max-w-2xl lg:max-w-none">
            <Enter>
              {/* "Founded 20 April 2023 · Seoul" — the exact date is a fact for
                  the About page, not for a label above a slogan. City and year
                  say the same thing in half the width. */}
              <Eyebrow>Seoul · 2023</Eyebrow>
            </Enter>

            <Enter delay={80}>
              {/*
               * The ceremonial register: wide-tracked serif capitals, the
               * second line filled with the sheen gradient, left-aligned so the
               * eyebrow, the sentence, the buttons and the figures below all
               * share one spine.
               *
               * Tracking is applied to the right of every glyph, the last one
               * included, so each line takes that trailing step back with a
               * negative margin — otherwise the two lines do not agree on where
               * the left edge is.
               */}
              <h1 className="mt-6 font-serif font-normal uppercase">
                <span className="block -mr-[0.16em] text-[clamp(1rem,1.9vw,1.625rem)] leading-[1.3] tracking-[0.16em] text-paper">
                  Building Ethical Leaders
                </span>
                <span className="sheen mt-2 block -mr-[0.18em] text-[clamp(1.5rem,3.1vw,2.75rem)] leading-[1.12] tracking-[0.15em]">
                  Across Borders
                </span>
              </h1>
            </Enter>

            <Enter delay={140}>
              {/*
               * THE SENTENCE THAT HAS TO DO THE EXPLAINING, AT HALF THE LENGTH.
               *
               * It was 48 words across two clauses apiece — true, complete, and
               * a paragraph. A visitor does not read a paragraph before they
               * have decided the site is worth reading. Two short sentences
               * carry the same two facts: what IES is, and what students in it
               * actually do. Everything cut — the founding city, the year, the
               * word "moderated", "in their own communities" — is either in the
               * eyebrow above or on the About page one click away.
               *
               * The first clause stays emphasised because "a student-run ethics
               * society" is the single fact everything else on the site depends
               * on.
               */}
              <p className="text-lead mt-6 max-w-[42ch] text-paper">
                A <strong className="font-semibold text-paper">student-run ethics society</strong>{' '}
                in Korea, the United States, and the United Kingdom. Students argue hard
                questions in public — then act on what they decide.
              </p>
            </Enter>

            <Enter delay={200}>
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <Button to="/our-work" variant="primary" arrow>
                  See What We Do
                </Button>
                <Button to="/join" variant="secondary">
                  Join IES
                </Button>
              </div>
            </Enter>
          </div>

          {/* ------------------------------------------------- the evidence */}
          {/*
           * One photograph, and the caption underneath it rather than inside
           * it.
           *
           * Three frames needed a fixed-height grid and `object-cover` to crop
           * three different source shapes into a composition. One frame needs
           * none of that — it is given an aspect ratio and left alone, which is
           * both less machinery and a better picture, because nothing is being
           * cropped to fit a cell.
           *
           * `loading="eager"` and `fetchpriority="high"`: it is the first
           * screen's only image, so there is nothing to prioritise it against
           * and no reason to defer it.
           */}
          <Enter delay={120}>
            <figure className="relative">
              <div className="overflow-hidden rounded-[3px] border border-mist/15 bg-navy-700/50">
                <img
                  {...image(shot.src)}
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  alt={shot.alt}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  /* The source is 1564×1506 — near square — so every frame
                     this sits in is wider than it and the crop is entirely
                     vertical; `object-position` only matters on the y axis
                     here. 36% rather than centre keeps the speaker's head and
                     the microphone in frame and spends the crop on the desk
                     in the foreground, which is the part carrying nothing. */
                  className="aspect-[4/3] w-full object-cover object-[center_36%] lg:aspect-[5/4]"
                />
              </div>
              {/* Outside the frame and set small. Inside it, a caption needs a
                  scrim to sit on and starts competing with the photograph for
                  the same corner; beneath it, it reads as what it is — a line
                  of record under a picture. */}
              <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.75rem] leading-tight">
                <span className="font-semibold tracking-[0.06em] text-mist uppercase">
                  {shot.caption}
                </span>
                <span className="text-[var(--accent)]">{shot.place}</span>
              </figcaption>
            </figure>
          </Enter>
        </div>

        {/* ----------------------------------------------------- the scale */}
        {/*
         * Three figures, on screen from the first frame.
         *
         * A visitor deciding whether a student organisation is serious is
         * asking a question of scale, and the answer costs 90px. Three rather
         * than four because each of these says something the others do not —
         * how many students, how many chapters, how many countries — where the
         * fourth was another way of saying "a lot". The label is the readable
         * half: `1,200+` above `MEMBERS` at a legible size beats a display
         * figure over a 9px tracked caption a reader meets with no idea what it
         * counts.
         */}
        <Enter delay={260}>
          <dl className="mt-12 grid grid-cols-3 gap-x-6 border-t border-mist/20 pt-7 sm:gap-x-10 lg:mt-14">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="font-serif text-[1.75rem] leading-none font-medium text-paper tabular-nums lining-nums sm:text-[2.125rem]">
                  {stat.value.toLocaleString('en-US')}
                  <span className="text-[var(--accent)]">{stat.suffix}</span>
                </dd>
                <dt className="text-label-sm mt-2.5 font-semibold text-mist uppercase">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Enter>
      </Container>

      <Seam edge="bottom" />
    </section>
  )
}
