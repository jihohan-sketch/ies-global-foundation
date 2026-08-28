import { Link } from 'react-router-dom'
import { PinnedScene } from '@/components/sections/PinnedScene'
import { SceneLayer } from '@/components/ui/Scrub'
import { GalleryImage } from '@/components/sections/Media'
import { cx } from '@/lib/utils'
import { SIZES } from '@/lib/images'

/*
 * THE REEL — a run of photographs travelling across a held frame.
 *
 * The signature moment for a page whose subject is its pictures. Everything it
 * does comes out of `PinnedScene` and the horizontal preset set in index.css;
 * there is no scroll listener here, no rAF loop and no geometry read. The page
 * scrolls exactly as far as the section is tall, and the wheel keeps its own
 * speed and direction throughout.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS DOES NOT REPLACE THE GRID
 *
 * A reel is a *reading*, not an archive. It shows a dozen pictures in an order
 * somebody chose, at a size worth looking at — which is the right way to meet a
 * body of work and the wrong way to find one photograph in it. Anything that
 * needs filtering, counting or linking stays in the grid underneath, where it
 * is searchable, linkable and reachable one tap at a time.
 *
 * Put the two the other way round — a pan you have to sit through before you
 * can search — and it stops being a signature moment and becomes a toll.
 */

export interface ReelShot {
  src: string
  alt: string
  /** The programme the photograph documents. */
  caption: string
  /** Where to read about it. */
  href: string
}

export function PhotoReel({
  shots,
  wordmark,
  className,
}: {
  shots: ReelShot[]
  /** One word across the foot of the frame — see `PinnedScene`. */
  wordmark?: string
  className?: string
}) {
  if (shots.length === 0) return null

  return (
    <PinnedScene
      label={`${shots.length} photographs, panned`}
      className={cx('border-y border-mist/12 bg-navy-700', className)}
      /*
       * `auto`, not `screen`. A reel is a ribbon you travel along: several
       * frames are in view at once, the ones at the edges are turning away, and
       * that peripheral vision is what tells you there is more coming. Forcing
       * one photograph per screen would turn a continuous run into a slideshow
       * of unrelated pictures.
       */
      panelWidth="auto"
      panelClassName="w-[min(76vw,42rem)] px-[1.4vw]"
      /*
       * 46 rather than the 120 a full-screen panel wants, because these panels
       * are around half a viewport wide: the scroll budget has to follow the
       * distance actually being travelled, and at 120 a nine-frame reel would
       * cost eleven screens and read as stuck.
       */
      vhPerPanel={46}
      runOut={26}
      /* Inset so the first and last frame start and finish inside the viewport
         rather than flush against its edges. */
      trackClassName="px-[12vw]"
      /* Turns the row into one cylinder — see `depth` on PinnedScene for why
         this number lives on the frame and not on the track. */
      depth={1600}
      wordmark={wordmark}
    >
      {shots.map((shot, i) => {
        return (
        /*
         * Two nested layers rather than one, and the split is load-bearing:
         * `scrub-tilt` is a `rotateY` and `scrub-recede` is a `scale`, and both
         * write `transform`. On one element the second would simply win. The
         * outer turns, the inner sizes, and the composition happens in the
         * layer tree where it costs nothing.
         */
        /*
         * `max-w` + `mx-auto` rather than a width. A no-op as things stand —
         * the panel is already exactly this wide — and kept as the cap that
         * makes it one: it is the only thing standing between this and a
         * full-bleed image several times the size of anything else on the page
         * if the panel ever loses its width.
         *
         * It used to be load-bearing, as the whole of the fallback for
         * `prefers-reduced-motion`, back when `PinnedScene` stacked its panels
         * there. It no longer stacks — see the note at the top of that file.
         */
        <SceneLayer
          key={shot.src}
          effect="scrub-tilt"
          className="mx-auto w-full max-w-[42rem]"
        >
          <SceneLayer effect="scrub-recede" as="figure" className="w-full">
            {/* The frame opens along the direction of travel while the picture
                inside settles out of its oversize — a reveal rather than a
                wipe. */}
            <SceneLayer effect="scrub-curtain" className="block">
              <GalleryImage
                src={shot.src}
                alt={shot.alt}
                sizes={SIZES.reel}
                /* The first two are on screen the moment the section is, so
                   they are not a lazy-load candidate — they are the LCP. */
                eager={i < 2}
                aspectRatio="3 / 2"
                className="border-mist/20"
              />
            </SceneLayer>

            <figcaption className="mt-5 flex items-baseline gap-4">
              <span className="font-serif text-sm text-[var(--accent)]/70 tabular-nums lining-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <Link
                  to={shot.href}
                  className="font-serif text-[1.0625rem] leading-snug text-paper underline decoration-mist/25 underline-offset-4 transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  {shot.caption}
                </Link>
                <span className="mt-1.5 block text-[0.8125rem] leading-relaxed text-mist">
                  {shot.alt}
                </span>
              </span>
            </figcaption>
          </SceneLayer>
        </SceneLayer>
        )
      })}
    </PinnedScene>
  )
}
