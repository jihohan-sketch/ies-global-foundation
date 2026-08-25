import { PinnedScene } from '@/components/sections/PinnedScene'
import { SceneLayer } from '@/components/ui/Scrub'
import { threeAs } from '@/content/site'

/*
 * The Three A's as a pinned horizontal scene: the section sticks to the
 * viewport and the three values travel sideways as the page scrolls down, one
 * full screen each.
 *
 * Each panel carries its own accent rather than inheriting the route's — the
 * point of the section is that the three differ from one another.
 *
 * Inside each panel, three layers move at three speeds against `--p`, which
 * `PinnedScene` re-points to *this panel's* own crossing. The initial drifts
 * slowest because it is the furthest back; the type moves fastest because it is
 * nearest; and the whole text block fades up as the panel reaches centre and
 * back down as it leaves, so a panel arrives as a scene rather than sliding
 * past as a slide. The spread is deliberately narrow — past about 140px the
 * layers stop reading as one space and start reading as separate things sliding
 * over each other.
 */
/*
 * A glow rather than a flat wash. A panel filled edge to edge with a tint meets
 * its neighbour at a hard vertical line, and the pan reads as a slideshow
 * cutting between slides — which is the one thing this section must not do. A
 * radial that falls to nothing before the panel edge lets each colour dissolve
 * into the next as they cross, so the boundary is never visible even though the
 * two panels are unmistakably different places.
 */
const PANELS = [
  { accent: 'var(--color-sky)', glow: '142, 184, 232' },
  { accent: 'var(--color-sage)', glow: '143, 191, 168' },
  { accent: 'var(--color-clay)', glow: '217, 152, 120' },
] as const

const glowFor = (rgb: string) =>
  `radial-gradient(ellipse 78% 68% at 50% 50%, rgba(${rgb}, 0.17) 0%, rgba(${rgb}, 0.07) 46%, transparent 76%)`

export function ValuePanels() {
  return (
    <PinnedScene label="The Three A’s" className="border-y border-mist/12">
      {threeAs.map((item, index) => {
        const panel = PANELS[index % PANELS.length]
        return (
          <div
            key={item.title}
            className="relative flex w-full items-center self-stretch"
            style={{ backgroundImage: glowFor(panel.glow) }}
          >
            {/* Furthest back: the initial, set enormous and barely visible.
                aria-hidden — it is the same letter the heading already starts
                with, and a screen reader announcing a lone "A" helps nobody. */}
            <SceneLayer
              hidden
              effect="scrub-parallax-x"
              depth="44px"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <span
                className="font-serif leading-none select-none"
                style={{ fontSize: 'min(58vw, 34rem)', color: panel.accent, opacity: 0.06 }}
              >
                {item.title.charAt(0)}
              </span>
            </SceneLayer>

            {/* Nearest: the type. Two layers because one element has one
                transform — the outer carries the fade, the inner the travel. */}
            <SceneLayer
              effect="scrub-band"
              travel="0px"
              className="relative mx-auto w-full max-w-3xl px-6 sm:px-8"
            >
              <SceneLayer effect="scrub-parallax-x" depth="128px" className="text-center">
                <p
                  className="text-[0.6875rem] font-medium tracking-[0.24em] uppercase"
                  style={{ color: panel.accent }}
                >
                  {item.title.charAt(0)} · Value {String(index + 1).padStart(2, '0')} /{' '}
                  {String(threeAs.length).padStart(2, '0')}
                </p>

                <h3
                  className="mt-8 font-serif leading-[0.95] text-paper"
                  style={{ fontSize: 'clamp(2.75rem, 8vw, 6.5rem)', letterSpacing: '-0.02em' }}
                >
                  {item.title}
                </h3>

                <p
                  className="mt-6 text-[0.75rem] font-medium tracking-[0.2em] uppercase"
                  style={{ color: panel.accent }}
                >
                  {item.subtitle}
                </p>

                <p className="text-lead mx-auto mt-10 max-w-2xl leading-relaxed font-light text-mist">
                  {item.body}
                </p>
              </SceneLayer>
            </SceneLayer>
          </div>
        )
      })}
    </PinnedScene>
  )
}
