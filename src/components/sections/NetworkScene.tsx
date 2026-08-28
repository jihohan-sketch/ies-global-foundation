import { PinnedScene } from '@/components/sections/PinnedScene'
import { SceneLayer } from '@/components/ui/Scrub'
import { Button } from '@/components/ui/Primitives'
import { branches } from '@/content/branches'
import type { Branch } from '@/content/types'

/**
 * A branch's position as an atlas would print it — `37.5665° N, 126.9780° E`.
 *
 * This is the one piece of information on the panel that is *about travelling*
 * rather than about an organisation, and it is here for that reason: three
 * panels that differ only in their prose read as three paragraphs, and three
 * panels carrying three sets of coordinates read as three places. The number
 * is already in `branches.ts`, driving the marker on the globe behind this very
 * scene — it is being printed, not invented.
 */
const coordinates = ({ lat, lon }: Branch['point']) =>
  `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lon).toFixed(4)}° ${
    lon >= 0 ? 'E' : 'W'
  }`

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
 * Each panel used to carry its own accent — gold, sky, clay — on the argument
 * that "the three are different places under one mission, and colour is the
 * fastest way to say it". It is, and it was the wrong thing to say fastest:
 * three accents in one pan makes the *branches* look like three organisations
 * rather than one foundation, which is the exact opposite of the section's
 * heading. One blue across all three, and the difference between them is
 * carried where it belongs — in the country code, the coordinates and the copy.
 *
 * The glow behind each panel still steps, but in depth rather than in hue: the
 * three sit at slightly different strengths, so the pan has a rise and fall
 * across it without ever changing colour.
 */
const GLOW_STRENGTHS = [0.16, 0.12, 0.09] as const

const glowFor = (strength: number) =>
  `radial-gradient(ellipse 80% 70% at 50% 50%, rgba(200, 169, 107, ${strength}) 0%, rgba(200, 169, 107, ${
    strength * 0.38
  }) 48%, transparent 78%)`

export function NetworkScene() {
  return (
    <PinnedScene
      label="The three national branches"
      /* 88 and 16, from 96 and 30. The pan is unchanged in kind — three
         branches, one screen each, in order — and the reading of each panel is
         not what the last 8vh was buying. The run-out is the bigger cut: 30vh
         of held frame after the third panel has landed is most of a screen in
         which the reader keeps scrolling and nothing moves, which is the exact
         failure the run-out exists to prevent at the *start* of a panel. 16 is
         enough to read the last dossier without the scene going quiet. */
      vhPerPanel={88}
      runOut={16}
      wordmark="Network"
    >
      {branches.map((branch, index) => {
        const accent = 'var(--color-gold)' 
        return (
          <div
            key={branch.slug}
            className="relative flex w-full items-center self-stretch"
            style={{ backgroundImage: glowFor(GLOW_STRENGTHS[index % GLOW_STRENGTHS.length]) }}
          >
            {/* Furthest back, slowest: the country code at display scale.
                aria-hidden — the branch's name is read out in full below, and
                "K R" is not a second piece of information. */}
            <SceneLayer
              hidden
              effect="scrub-parallax-x scrub-fade"
              depth="38px"
              /* Widest window in the panel — the country code is the ground the
                 dossier sits on, lit before it arrives and after it goes. */
              fadeIn={0.42}
              fadeOut={0.42}
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

            {/* Nearest and fastest. The travel is on the column — one element,
                one transform — and each line below fades on its own window, a
                beat later in and a beat earlier out than the one above it, so
                the dossier assembles and comes apart in reading order. */}
            <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-8">
              <SceneLayer effect="scrub-parallax-x" depth="120px">
                <SceneLayer
                  as="p"
                  effect="scrub-fade"
                  fadeIn={0.18}
                  fadeOut={0.44}
                  className="flex items-center gap-4 text-[0.75rem] font-semibold tracking-[0.14em] uppercase"
                  style={{ color: accent }}
                >
                  <span aria-hidden className="h-px w-10 shrink-0 bg-current opacity-45" />
                  {String(index + 1).padStart(2, '0')} — {branch.country}
                </SceneLayer>

                <SceneLayer
                  as="h3"
                  effect="scrub-fade"
                  offset={0.03}
                  fadeIn={0.22}
                  fadeOut={0.38}
                  className="mt-6 font-serif leading-[0.95] text-paper"
                  style={{ fontSize: 'clamp(2.25rem, 5.6vw, 4.5rem)', letterSpacing: '-0.02em' }}
                >
                  {branch.name}
                </SceneLayer>

                <SceneLayer
                  as="p"
                  effect="scrub-fade"
                  offset={0.05}
                  fadeIn={0.24}
                  fadeOut={0.34}
                  className="mt-5 text-[0.75rem] font-medium tracking-[0.2em] uppercase"
                  style={{ color: accent }}
                >
                  {branch.status}
                </SceneLayer>

                <SceneLayer
                  as="p"
                  effect="scrub-fade"
                  offset={0.08}
                  fadeIn={0.26}
                  fadeOut={0.3}
                  className="text-lead mt-5 max-w-2xl leading-relaxed text-mist"
                >
                  {branch.summary}
                </SceneLayer>

                {/*
                 * The dossier.
                 *
                 * Two columns from `lg` up rather than the old two-cell strip,
                 * because the panel has a full viewport of width and was using
                 * a third of it. Everything in here is already on file: the
                 * coordinates come off the same point that places this branch's
                 * marker on the globe turning behind the panel, the facts are
                 * the branch's own reviewed list, and the programme areas are
                 * the titles of the sections its own page is built from.
                 *
                 * Nothing is written at the component level. A panel headed
                 * "IES United Kingdom" that named a programme the U.K. branch
                 * does not run would be a lie told in display type.
                 *
                 * Two blocks are held back in the 640–768 band, and that is a
                 * hard constraint rather than an editorial preference: a pinned
                 * panel is exactly one viewport tall and clips what does not
                 * fit, so on a short screen the choice is between showing less
                 * and cutting a sentence in half.
                 *
                 * Below 640 they are back. The scene stops pinning there and
                 * becomes a vertical stack (see index.css), which removes the
                 * clip that was the only reason to withhold them — a phone now
                 * gets the whole dossier rather than the least of it.
                 */}
                <SceneLayer
                  effect="scrub-fade"
                  offset={0.11}
                  fadeIn={0.28}
                  fadeOut={0.26}
                  className="mt-7 grid gap-x-12 gap-y-6 border-t border-mist/15 pt-6 lg:grid-cols-[1.15fr_1fr]"
                >
                  {/* Two columns of facts, not one. Stacked, four rows of
                      label-and-value plus a five-item programme list overran a
                      laptop viewport, and a panel that is a full screen tall by
                      definition cannot afford to be taller than one. */}
                  <dl className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-slate uppercase">
                        Position
                      </dt>
                      {/* Tabular figures: three coordinate readouts stacked
                          across three panels should hold the same rhythm as
                          they pass, and proportional digits make them wobble. */}
                      <dd className="mt-1.5 font-sans text-[0.8125rem] tracking-[0.08em] tabular-nums text-paper">
                        {coordinates(branch.point)}
                      </dd>
                    </div>
                    {/* The third fact used to be `hidden sm:block` outright.
                        It is back below `sm`, where the scene is now a vertical
                        stack and a panel can be as tall as it needs to be; it
                        stays hidden only in the 640–768 band, which is still a
                        pinned panel clipped to one screen. */}
                    {branch.facts.slice(0, 3).map((fact, factIndex) => (
                      <div
                        key={fact.label}
                        className={factIndex === 2 ? 'block max-sm:block sm:hidden md:block' : undefined}
                      >
                        <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-slate uppercase">
                          {fact.label}
                        </dt>
                        <dd className="mt-1.5 font-serif text-[1rem] leading-snug text-paper">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Same reasoning as the fact above: visible in the mobile
                      stack, withheld only from the clipped tablet panel. */}
                  <div className="block sm:hidden md:block">
                    <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-slate uppercase">
                      Programme areas
                    </p>
                    <ul className="mt-3.5 space-y-2">
                      {branch.sections.map((section) => (
                        <li
                          key={section.title}
                          className="flex items-baseline gap-3 text-[0.875rem] text-mist"
                        >
                          <span
                            aria-hidden
                            className="mt-2 h-px w-4 shrink-0"
                            style={{ backgroundColor: accent, opacity: 0.55 }}
                          />
                          {section.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SceneLayer>

                <SceneLayer
                  effect="scrub-fade"
                  offset={0.15}
                  fadeIn={0.3}
                  fadeOut={0.22}
                  className="mt-8"
                >
                  <Button to={`/global-network/${branch.slug}`} variant="ghost" arrow>
                    Explore {branch.name}
                  </Button>
                </SceneLayer>
              </SceneLayer>
            </div>
          </div>
        )
      })}
    </PinnedScene>
  )
}
