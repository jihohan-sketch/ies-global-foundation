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

   WHAT CHANGED, AND WHY IT IS A DIFFERENT COMPONENT RATHER THAN A TWEAK.

   The hero this replaces was a `StickyScene` pinned for 165vh — 1,249px on a
   813px window — in which a centred slogan dissolved off a rotating globe and
   the four headline figures rose into the space it left at 46% of the way
   through the pin. Read as a film it was well made. Read as the first screen of
   a website it had three problems, and they are the ones the brief names:

     · IT COST A SCREEN AND A HALF TO SAY ONE THING. A visitor had to scroll
       past most of two viewports before the page delivered any second idea.
     · THE ONLY EVIDENCE WAS INVISIBLE. The figures — the single strongest
       reason to believe a student organisation is real — did not exist in the
       first viewport. They were a reward for scrolling through the pin.
     · THERE WERE NO PEOPLE IN IT. A globe is a diagram of an ambition. This is
       an organisation whose entire proposition is *students doing this
       themselves*, and the first screen showed none of them.

   So: one screen, two columns, and the world moved behind the people rather
   than in front of them.

     LEFT   the argument — what IES is, in one readable sentence, and the two
            things a visitor can do about it.
     RIGHT  the evidence — three photographs of the work actually happening,
            each captioned with where and when.
     FOOT   the scale — the four headline figures, on screen from the first
            frame instead of at 46% of a pin.

   The globe is still here and still the identity; it is now the ground the
   composition sits on rather than the subject of it. Dimmed, offset behind the
   photographs, and read through the gaps between them. `intensity` is down from
   1 to 0.62 for the same reason: it is atmosphere now, and atmosphere that
   competes with a photograph of a face loses on merit.

   NOTHING HERE PINS, and that is the single biggest cut on the page. The
   entrances are a CSS stagger rather than the site's `Reveal` — a first screen
   should assemble once and then be finished, and it should not wait on React
   and an IntersectionObserver to become legible. Scroll-scrubbing is still the
   site's language everywhere below; it simply is not the language of the
   thing that is already on screen.
   ========================================================================== */

const markers: GlobeMarker[] = branches.map((branch) => ({
  id: branch.slug,
  label: branch.name,
  lat: branch.point.lat,
  lon: branch.point.lon,
}))

/*
 * The three photographs, and the choice is editorial rather than aesthetic.
 *
 * Each one has to answer a different objection a visitor arrives with, and
 * between them they have to show students of both the "arguing" and the
 * "serving" halves of the proposition — because the sentence beside them
 * claims both.
 *
 *   speaking  — a student at a microphone, mid-sentence, reading from her own
 *               brief in a working council chamber. The one image on the site
 *               that shows the actual act the organisation is about. It is the
 *               large frame for that reason.
 *   table     — six students across a table from a US Army general. Answers
 *               "is this a real organisation or a club with a logo".
 *   service   — volunteers on the floor with children at a partner centre.
 *               The warmth, and the second half of the sentence.
 *
 * Captions are not decoration. An uncaptioned photograph on a foundation site
 * is indistinguishable from stock, which is the exact charge this hero exists
 * to answer; naming the venue and the month is what makes it evidence.
 */
const shots = [
  {
    src: '/activities/environmental-ethics-forum/speaking.jpg',
    alt: 'An IES student speaking into a chamber microphone from a prepared brief during the Environmental Ethics Forum, with a second student following the text behind her.',
    caption: 'Environmental Ethics Forum',
    place: 'Nowon-gu Council, Seoul',
    className: 'col-span-3 row-span-2',
    sizes: '(max-width: 1024px) 55vw, 27vw',
  },
  {
    src: '/activities/camp-humphreys-cadets/table.jpg',
    alt: 'Six IES students with laptops and briefing papers along one side of a conference table, in session with a US Army officer.',
    caption: 'Session with US Army leadership',
    place: 'Camp Humphreys, Pyeongtaek',
    className: 'col-span-2',
    sizes: '(max-width: 1024px) 38vw, 18vw',
  },
  {
    src: '/activities/jiguchon-childrens-center/activity.jpg',
    alt: 'IES student volunteers seated among children around a low table during a session at Jiguchon Children’s Center.',
    caption: 'Recurring mentorship',
    place: 'Jiguchon Children’s Center',
    className: 'col-span-2',
    sizes: '(max-width: 1024px) 38vw, 18vw',
  },
] as const

/* ---------------------------------------------------------------- Shot */

/**
 * One photograph in the cluster.
 *
 * The caption lives *inside* the frame rather than under it, and only fully
 * arrives on hover. Three frames each carrying two permanent lines of type
 * would turn the evidence column into a second body of text competing with the
 * one beside it — so at rest the caption is a single small line held down by a
 * gradient, and the venue joins it when the cursor asks.
 *
 * `group-hover` moves three things at once and each is small: the picture takes
 * a 3% step in, the hairline warms to the accent, and the caption block lifts.
 * One gesture, three confirmations — which is what makes a hover read as the
 * frame responding rather than as an animation firing.
 */
function Shot({
  src,
  alt,
  caption,
  place,
  className,
  sizes,
  priority,
}: {
  src: string
  alt: string
  caption: string
  place: string
  className?: string
  sizes: string
  priority?: boolean
}) {
  return (
    <figure
      className={cx(
        'group relative overflow-hidden rounded-[3px] border border-mist/15 bg-navy-700/50',
        'transition-colors duration-500 ease-[var(--ease-cinema)] hover:border-[var(--accent)]/55',
        className,
      )}
    >
      <img
        {...image(src)}
        sizes={sizes}
        alt={alt}
        loading="eager"
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-cinema)] group-hover:scale-[1.03]"
      />

      {/* The scrim is the caption's ground, not a darkening of the picture —
          it is short, sits on the bottom edge only, and is what lets a light
          photograph carry white type without the whole frame being dimmed. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,rgba(5,11,22,0.92),rgba(5,11,22,0.55)_45%,transparent)]"
      />

      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <span className="block text-[0.6875rem] leading-tight font-semibold tracking-[0.08em] text-paper uppercase">
          {caption}
        </span>
        {/* `grid-rows-[0fr]` → `[1fr]`, so the venue has no height at rest and
            no magic pixel value to keep in sync with its own font size. */}
        <span className="grid grid-rows-[0fr] transition-all duration-500 ease-[var(--ease-cinema)] group-hover:grid-rows-[1fr]">
          <span className="overflow-hidden">
            <span className="block pt-1 text-[0.6875rem] leading-tight text-[var(--accent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {place}
            </span>
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

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
       * and the old hero needed a wash across the middle of the frame to hold
       * the type off it — a fix that flattened the globe into a grey stripe to
       * protect text that should not have been sitting there in the first
       * place. Pushed right, the type column sits over the dark left field and
       * needs no wash at all; what shows through the gaps between the
       * photographs is the limb and the graticule, which is the part that
       * reads as *globe*.
       *
       * Not draggable here. The drag belongs on Global Network, where turning
       * the world is the point; in a hero it is an affordance competing with
       * three photographs for the same square inches.
       */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-[58%] -z-10 -translate-x-1/2 -translate-y-1/2 max-lg:left-[64%] max-lg:opacity-45"
      >
        {/* No `onSelect`, and no `draggable`. Both were carried over from the
            pinned hero and neither can fire: the wrapper is
            `pointer-events-none` so the photographs above it stay hoverable,
            which makes a click handler on the globe a promise the layer cannot
            keep. Turning and selecting belong on Global Network, where the
            world is the subject rather than the ground. */}
        <Globe
          markers={markers}
          intensity={0.7}
          className="h-[min(104vh,74rem)] w-[min(104vh,74rem)] opacity-[0.85]"
        />
      </div>

      {/* One low warm wash behind the photographs, and it is doing a job the
          brief names: the ground here is near-black and the section it opens is
          about people, so a frame lit only by a blue globe reads cold no matter
          what is photographed in it. Gold at 9% is under the threshold where it
          would be seen as a colour and over the one where the corner stops
          feeling lit. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_58%_54%_at_74%_38%,rgba(200,169,107,0.09),transparent_70%)]"
      />

      <Vignette className="-z-10" />

      {/* The reading scrim: solid on the left where the sentence is, gone by
          the middle of the frame. One gradient replaces both the horizontal
          wash and the opacity reduction the old hero needed. */}
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
        <div className="grid items-center gap-y-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-x-14 xl:gap-x-20">
          {/* ------------------------------------------------- the argument */}
          <div className="max-w-2xl lg:max-w-none">
            <Enter>
              <Eyebrow>Founded 20 April 2023 · Seoul</Eyebrow>
            </Enter>

            <Enter delay={80}>
              {/*
               * The ceremonial register is unchanged — wide-tracked serif
               * capitals, the second line filled with the sheen gradient —
               * but it is left-aligned now and a step larger.
               *
               * Centred was correct when the headline was the only thing on
               * the screen and the globe was symmetrical behind it. In a
               * two-column composition a centred column has no edge to hang
               * off, and the eyebrow, the sentence, the buttons and the
               * figures below all want the same left margin. Aligning them
               * gives the whole column one spine.
               *
               * Tracking is applied to the right of every glyph, the last one
               * included, so each line takes that trailing step back with a
               * negative margin — otherwise the two lines do not agree on
               * where the left edge is.
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
               * THE SENTENCE THAT HAS TO DO THE EXPLAINING.
               *
               * The line above is ceremony and says nothing checkable; this is
               * where a visitor finds out what IES actually is. Second in the
               * hierarchy and set like it, with the first clause emphasised
               * because "a student-run ethics society" is the single fact
               * everything else on the site depends on.
               */}
              <p className="text-lead mt-6 max-w-[46ch] text-paper">
                A <strong className="font-semibold text-paper">student-run ethics society</strong>{' '}
                founded in Seoul in 2023, now working across Korea, the United States, and the
                United Kingdom. Students run moderated forums on contested questions, then take
                what they conclude into service in their own communities.
              </p>
            </Enter>

            <Enter delay={200}>
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                {/* "See What We Run" read as jargon — it is the language of an
                    operator describing their own portfolio, not of a visitor
                    asking a question. "See What We Do" is what the section it
                    leads to is actually called. */}
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
           * A fixed-height grid rather than three aspect-ratio boxes.
           *
           * The three source photographs are 1564×1506, 1600×1200 and
           * 1362×1398 — three different shapes. Left to size themselves they
           * produce a ragged cluster; given one height and `object-cover` they
           * crop to a composition. The tall frame takes three of five columns
           * and both rows, which is the proportion that makes it read as *the*
           * photograph with two supporting it rather than as three tiles.
           */}
          <Enter delay={120}>
            {/* All three frames are above the fold, so all three load eagerly —
                lazy-loading a first-screen image only guarantees it arrives
                after the visitor is already looking at the space it should be
                in. Only the large frame gets `fetchpriority`: prioritising all
                three prioritises none of them. */}
            <div className="grid h-[clamp(15rem,44vw,20rem)] grid-cols-5 grid-rows-2 gap-2.5 sm:gap-3 lg:h-[min(56vh,30rem)]">
              {shots.map((shot, i) => (
                <Shot key={shot.src} {...shot} priority={i === 0} />
              ))}
            </div>
          </Enter>
        </div>

        {/* ----------------------------------------------------- the scale */}
        {/*
         * ON SCREEN FROM THE FIRST FRAME, which is the whole change.
         *
         * These are the same four figures the old hero had; they were simply
         * unreachable without scrolling most of a pinned scene. A visitor
         * deciding whether a student organisation is serious is asking a
         * question of scale, and the answer costs 90px.
         *
         * The label is the readable half. `1,200+` above `MEMBERS` at a legible
         * size beats a display figure over a 9px tracked caption, which is what
         * this was — a number a sighted reader met with no idea what it counted.
         */}
        <Enter delay={260}>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-mist/20 pt-7 sm:grid-cols-4 sm:gap-x-10 lg:mt-14">
            {headlineStats.slice(0, 4).map((stat) => (
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
