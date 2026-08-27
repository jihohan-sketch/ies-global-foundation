import { PinnedScene } from '@/components/sections/PinnedScene'
import { SceneLayer } from '@/components/ui/Scrub'
import { ScrubImage } from '@/components/ui/ScrubImage'
import { Button } from '@/components/ui/Primitives'
import { workCategories } from '@/content/work'
import type { WorkCategory } from '@/content/types'

/*
 * The five areas of IES work as a pinned horizontal scene, each panel a
 * photograph of that work actually happening.
 *
 * The images are the ones already curated against each category in
 * `content/work.ts` — real programmes, with the alt text written for them —
 * rather than anything chosen to look good here. That matters more than usual
 * in a section like this: the whole claim of the section is "this is what we
 * do", and a decorative stock photograph would quietly turn it into "this is
 * what we would like to look like".
 *
 * ---------------------------------------------------------------------------
 * THE DISSOLVE
 *
 * Every layer in a panel carries its own fade window, and they disagree on
 * purpose. The photograph comes up first and slowest and leaves last; the
 * index, the heading, the summary, the chips and the button each start a beat
 * later than the one above and start dimming a beat earlier, so a panel
 * assembles from the top down as it arrives and comes apart the same way as it
 * leaves. `PinnedScene` fades the whole cell around all of it.
 *
 * None of it costs an element. `scrub-fade` is opacity only, so it rides on the
 * same node as the parallax rather than needing a wrapper, and `SceneLayer`'s
 * `as` renders the heading or the paragraph itself.
 *
 * ---------------------------------------------------------------------------
 * WHY THE PHOTOGRAPHS FADE AT THEIR OWN EDGES
 *
 * Full-bleed images in a horizontal pan meet each other at a hard vertical
 * line, and the section reads as a slideshow cutting between slides. Each image
 * is masked to nothing before its panel edge, so neighbouring panels dissolve
 * through the navy ground instead of butting — the same reason the Three A's
 * panels use a radial glow rather than a flat tint.
 */

/* Wide enough that neither the parallax shift nor the settle can ever expose an
   edge of the photograph, since both move it within its frame. */
const EDGE_FADE =
  'linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%)'

/*
 * `image` is optional on a work category — the type says so, and the layout on
 * /our-work adapts when it is missing. A panel here cannot: the photograph is
 * the panel. So a category without one is left out of the scene rather than
 * given an empty frame, and the numbering below counts what is actually shown.
 * All five currently qualify.
 */
type PhotographedCategory = WorkCategory & { image: string; imageAlt: string }

const scenes = workCategories.filter(
  (category): category is PhotographedCategory => Boolean(category.image && category.imageAlt),
)

export function WorkScene() {
  return (
    <PinnedScene label="What IES does" vhPerPanel={112}>
      {scenes.map((category, index) => (
        <div key={category.id} className="relative flex w-full items-center self-stretch">
          {/*
           * Furthest back and slowest. The negative horizontal inset gives the
           * parallax somewhere to travel: the layer shifts by up to half its
           * depth either way, and without the slack that shift would drag the
           * photograph's edge into the panel.
           */}
          <SceneLayer
            hidden
            effect="scrub-parallax-x scrub-fade"
            depth="34px"
            /* The longest, gentlest window in the panel — the photograph is the
               ground everything else arrives onto, so it is already there when
               the type starts and still there when the type has gone. */
            fadeIn={0.4}
            fadeOut={0.4}
            className="pointer-events-none absolute inset-y-0 -inset-x-10"
            style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
          >
            <ScrubImage
              fill
              driven="scene"
              effect={undefined}
              weight="subtle"
              src={category.image}
              alt={category.imageAlt}
              /* Every panel of this scene is within a screen or two of the
                 viewport for most of the scene's length, so lazy loading would
                 land them visibly late. */
              eager={index < 2}
            />
          </SceneLayer>

          {/*
           * The scrim, weighted hard to the left where the type sits and
           * releasing across to the right so the photograph stays a
           * photograph. Two layers: a horizontal wash for legibility and a
           * gentle floor over the whole panel to hold the image back into the
           * site's near-black ground.
           *
           * The balance here is the whole section. Too little and the headline
           * fights the picture; too much — which is where this started, at 45%
           * image opacity under a 0.94 wash — and the panel reads as a dark
           * rectangle with type on it, which throws away the one thing the
           * section exists to show.
           */}
          {/* The scrims dissolve on the same window as the photograph they are
              holding back. Left at full strength they would go on darkening a
              panel whose picture had already faded out, which reads as the
              transition leaving a stain behind it. */}
          <SceneLayer
            hidden
            effect="scrub-fade"
            fadeIn={0.4}
            fadeOut={0.4}
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(5,10,20,0.95)_0%,rgba(5,10,20,0.88)_30%,rgba(5,10,20,0.46)_62%,rgba(5,10,20,0.16)_100%)]"
          />
          <SceneLayer
            hidden
            effect="scrub-fade"
            fadeIn={0.4}
            fadeOut={0.4}
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,10,20,0.55),transparent_45%)]"
          />

          {/* Nearest and fastest. The travel lives here; every fade below is
              opacity on the element that is actually fading. */}
          <div className="relative mx-auto w-full max-w-[88rem] px-6 sm:px-8">
            <SceneLayer effect="scrub-parallax-x" depth="112px" className="max-w-xl">
              <SceneLayer
                as="p"
                effect="scrub-fade"
                fadeIn={0.18}
                fadeOut={0.42}
                className="flex items-center gap-4 text-[0.625rem] font-medium tracking-[0.3em] text-[var(--accent)] uppercase"
              >
                <span aria-hidden className="h-px w-10 shrink-0 bg-current opacity-45" />
                {String(index + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}
              </SceneLayer>

              <SceneLayer
                as="h3"
                effect="scrub-fade"
                offset={0.03}
                fadeIn={0.22}
                fadeOut={0.36}
                className="mt-8 font-serif leading-[1] text-paper"
                style={{ fontSize: 'clamp(2.25rem, 5.6vw, 4.5rem)', letterSpacing: '-0.02em' }}
              >
                {category.title}
              </SceneLayer>

              <SceneLayer
                as="p"
                effect="scrub-fade"
                offset={0.06}
                fadeIn={0.26}
                fadeOut={0.3}
                className="text-lead mt-8 leading-relaxed font-light text-mist"
              >
                {category.summary}
              </SceneLayer>

              <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2">
                {category.examples.slice(0, 3).map((example, chip) => (
                  /* The chips stagger against each other as well as against the
                     block above them — three of them arriving together is the
                     one place in the panel where a row would land flat. */
                  <SceneLayer
                    key={example}
                    as="li"
                    effect="scrub-fade"
                    offset={0.09 + chip * 0.02}
                    fadeIn={0.28}
                    fadeOut={0.26}
                    className="border border-mist/18 px-3 py-1.5 text-[0.6875rem] font-light text-mist/80"
                  >
                    {example}
                  </SceneLayer>
                ))}
              </ul>

              <SceneLayer
                effect="scrub-fade"
                offset={0.16}
                fadeIn={0.3}
                fadeOut={0.22}
                className="mt-10"
              >
                <Button to={`/our-work#${category.id}`} variant="ghost" arrow>
                  See this work
                </Button>
              </SceneLayer>
            </SceneLayer>
          </div>
        </div>
      ))}
    </PinnedScene>
  )
}
