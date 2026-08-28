import { PinnedScene } from '@/components/sections/PinnedScene'
import { SceneLayer } from '@/components/ui/Scrub'
import { timeline } from '@/content/impact'
import { cx } from '@/lib/utils'

/*
 * The organisation's history as a ribbon you travel along sideways.
 *
 * Of everything on this site, a timeline is the content that most wants this
 * treatment: it is already a sequence, it is already directional, and reading
 * it left to right while scrolling down makes the passage of time and the
 * passage of the page the same gesture.
 *
 * Panels are card-width rather than screen-width, so three or four entries are
 * visible at once and the spine visibly runs between them. One entry per screen
 * would turn a continuous history into a slideshow of unrelated dates — and the
 * relationship *between* entries is the thing a timeline is for.
 *
 * Because the panels are narrow, the pan covers far less ground per panel than
 * a full-screen scene does, so `vhPerPanel` is a fraction of the usual: the
 * scroll distance has to match the travel or the ribbon crawls.
 *
 * ---------------------------------------------------------------------------
 * WHAT MOVES AND WHAT DOES NOT
 *
 * The spine and its nodes sit on the panel cell, outside the scrubbed layers,
 * and never fade or drift. They are the one continuous thing in the section —
 * a chronology drawn in segments that fade in and out per entry reads as a
 * broken rule, not as a timeline. The date, title and body are what travel and
 * fade; the line they hang off holds still.
 *
 * The entry is built as two equal halves so the boundary between them falls on
 * the exact vertical centre of the cell, which is where the cell centres it and
 * therefore where the spine is. Stacking the parts and hoping they balance puts
 * the node a few pixels off the line, and a node a few pixels off the line is
 * the only thing anyone will see.
 */
export function TimelineScene() {
  return (
    <PinnedScene
      label="From April 2023 onward"
      panelWidth="auto"
      vhPerPanel={46}
      runOut={20}
      trackClassName="px-6 sm:px-12"
      panelClassName="w-[19rem] sm:w-[24rem] pr-8 sm:pr-12"
    >
      {timeline.map((entry) => (
        <div
          key={entry.title}
          className="relative flex w-full items-center"
        >
          {/* Drawn per panel and edge to edge, so the segments meet and the
              line runs unbroken for the length of the track. */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-mist/22"
          />
          <span
            aria-hidden
            className={cx(
              'absolute top-1/2 left-0 block -translate-y-1/2 rounded-full border bg-navy',
              entry.milestone
                ? 'h-4 w-4 border-[var(--accent)] bg-[var(--accent)]/25'
                : 'h-2.5 w-2.5 border-mist/50',
            )}
          />

          <SceneLayer effect="scrub-band" travel="0px" className="relative w-full">
            <SceneLayer effect="scrub-parallax-x" depth="54px" className="flex h-[26rem] flex-col">
              {/* `basis-0` on both halves, so they split the box exactly rather
                  than in proportion to their contents. */}
              <div className="flex flex-1 basis-0 flex-col justify-end pb-9 pl-8">
                <time
                  className={cx(
                    'text-[0.75rem] font-medium tracking-[0.14em] uppercase',
                    entry.milestone ? 'text-[var(--accent)]' : 'text-mist',
                  )}
                >
                  {entry.date}
                </time>
                <h3
                  className={cx(
                    'mt-3 font-serif',
                    entry.milestone ? 'text-h3' : 'text-[1.25rem]',
                  )}
                >
                  {entry.title}
                </h3>
              </div>

              <div className="flex-1 basis-0 pt-9 pl-8">
                <p className="text-[0.9375rem] leading-relaxed text-mist">
                  {entry.body}
                </p>
              </div>
            </SceneLayer>
          </SceneLayer>
        </div>
      ))}
    </PinnedScene>
  )
}
