import { PinnedScene } from '@/components/sections/PinnedScene'
import { SceneLayer } from '@/components/ui/Scrub'
import { Button } from '@/components/ui/Primitives'
import { branches } from '@/content/branches'

/*
 * The three national branches as a pinned horizontal scene — one full screen
 * each, travelling sideways as the page scrolls down.
 *
 * Typographic rather than photographic, and that is a content decision rather
 * than a design one: every photograph on file was taken by IES Korea. Putting
 * Korean programme photography behind a panel headed "IES United States" would
 * be a picture that claims something untrue, so the panels are built from the
 * one visual each branch genuinely owns — its country code, set at display
 * scale — and the ambient globe behind the whole site, which is doing the
 * international work already. When U.S. and U.K. photography exists, a
 * `ScrubImage` slots into the layer the code currently occupies.
 *
 * Each panel carries its own accent. The section's point is that the three are
 * different places under one mission, and colour is the fastest way to say it.
 */
const ACCENTS = ['var(--color-gold)', 'var(--color-sky)', 'var(--color-clay)'] as const
const GLOWS = ['200, 169, 107', '142, 184, 232', '217, 152, 120'] as const

const glowFor = (rgb: string) =>
  `radial-gradient(ellipse 80% 70% at 50% 50%, rgba(${rgb}, 0.13) 0%, rgba(${rgb}, 0.05) 48%, transparent 78%)`

export function NetworkScene() {
  return (
    <PinnedScene label="The three national branches" vhPerPanel={118} wordmark="Network">
      {branches.map((branch, index) => {
        const accent = ACCENTS[index % ACCENTS.length]
        return (
          <div
            key={branch.slug}
            className="relative flex w-full items-center self-stretch"
            style={{ backgroundImage: glowFor(GLOWS[index % GLOWS.length]) }}
          >
            {/* Furthest back, slowest: the country code at display scale.
                aria-hidden — the branch's name is read out in full below, and
                "K R" is not a second piece of information. */}
            <SceneLayer
              hidden
              effect="scrub-parallax-x"
              depth="38px"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <span
                className="font-serif leading-none select-none"
                style={{
                  fontSize: 'min(46vw, 28rem)',
                  letterSpacing: '0.04em',
                  color: accent,
                  opacity: 0.07,
                }}
              >
                {branch.code}
              </span>
            </SceneLayer>

            {/* Nearest, fastest, and fading at both edges of the crossing. Two
                nested layers because one element has one transform: the outer
                carries the fade, the inner the travel. */}
            <SceneLayer
              effect="scrub-band"
              travel="0px"
              className="relative mx-auto w-full max-w-3xl px-6 sm:px-8"
            >
              <SceneLayer effect="scrub-parallax-x" depth="120px">
                <p
                  className="flex items-center gap-4 text-[0.625rem] font-medium tracking-[0.3em] uppercase"
                  style={{ color: accent }}
                >
                  <span aria-hidden className="h-px w-10 shrink-0 bg-current opacity-45" />
                  {String(index + 1).padStart(2, '0')} — {branch.country}
                </p>

                <h3
                  className="mt-8 font-serif leading-[0.95] text-paper"
                  style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', letterSpacing: '-0.02em' }}
                >
                  {branch.name}
                </h3>

                <p
                  className="mt-6 text-[0.75rem] font-medium tracking-[0.2em] uppercase"
                  style={{ color: accent }}
                >
                  {branch.status}
                </p>

                <p className="text-lead mt-8 max-w-2xl leading-relaxed font-light text-mist">
                  {branch.summary}
                </p>

                <dl className="mt-10 grid max-w-xl grid-cols-1 gap-x-10 gap-y-5 border-t border-mist/15 pt-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-[0.5625rem] font-medium tracking-[0.28em] text-mist/80 uppercase">
                      Established
                    </dt>
                    <dd className="mt-1.5 font-serif text-lg text-paper">{branch.established}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.5625rem] font-medium tracking-[0.28em] text-mist/80 uppercase">
                      Headquarters
                    </dt>
                    <dd className="mt-1.5 font-serif text-lg text-paper">{branch.headquarters}</dd>
                  </div>
                </dl>

                <div className="mt-10">
                  <Button to={`/global-network/${branch.slug}`} variant="ghost" arrow>
                    Explore {branch.name}
                  </Button>
                </div>
              </SceneLayer>
            </SceneLayer>
          </div>
        )
      })}
    </PinnedScene>
  )
}
