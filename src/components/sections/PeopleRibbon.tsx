import { PinnedScene } from '@/components/sections/PinnedScene'
import { SceneLayer } from '@/components/ui/Scrub'
import { cx, initials } from '@/lib/utils'
import type { Person } from '@/content/types'
import { image, SIZES } from '@/lib/images'

/*
 * A ribbon of portraits travelling across a held frame.
 *
 * The second horizontal scene on the site, and deliberately not the same one
 * twice: the photo reel runs wide landscape frames with a caption under each,
 * this runs tall portraits at half the width with the name set *over* the
 * bottom of the picture. Same engine, same presets, different shape — which is
 * the difference between a house style and a tic.
 *
 * ---------------------------------------------------------------------------
 * WHAT THIS DELIBERATELY DOES NOT CARRY
 *
 * No biography. A pinned pan is the wrong place to read three hundred words:
 * the panel is moving, it leaves on its own schedule, and the text cannot be
 * linked to or searched. The ribbon says *who these people are* at a glance and
 * hands the reading to the cards below it, which stay exactly where they were.
 *
 * `scrub-skew-x` is off here for the same reason `PinnedScene` keeps it off
 * photographs generally — a sheared face reads as a rendering fault, not as
 * momentum.
 */
export function PeopleRibbon({
  people,
  label,
  wordmark,
  className,
}: {
  people: Person[]
  /** Names the scene for assistive tech. */
  label: string
  wordmark?: string
  className?: string
}) {
  if (people.length === 0) return null

  return (
    <PinnedScene
      label={label}
      className={cx('border-y border-mist/12 bg-navy', className)}
      panelWidth="auto"
      /* Narrower than the reel's frames and therefore more of them on screen:
         a group of people should read as a group. */
      panelClassName="w-[min(62vw,22rem)] px-[1vw]"
      /* Scaled off the panel width the same way the reel's is — a quarter of a
         viewport per panel wants roughly a quarter of the scroll budget. At 26
         a nine-strong cast tracks the wheel almost exactly one-to-one. */
      vhPerPanel={26}
      runOut={22}
      trackClassName="px-[16vw]"
      depth={1600}
      wordmark={wordmark}
    >
      {people.map((person) => {
        return (
        /* Outer turns, inner sizes — both write `transform`, so they cannot
           share an element. See the same split in PhotoReel. */
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
          key={person.id}
          effect="scrub-tilt"
          className="mx-auto w-full max-w-[22rem]"
        >
          {/* Square, because every portrait in `public/leadership` is square —
              all twenty-seven of them. The frame here used to be 3/4, which
              meant `object-cover` quietly shaved 25% off the sides of every
              face in the rail and read as a portrait shot far too tight. A
              frame that does not match the asset set is not art direction, it
              is a crop nobody chose. */}
          <SceneLayer effect="scrub-recede" as="figure" className="w-full">
            <span className="relative block overflow-hidden border border-mist/18 bg-navy-700/40">
              {person.photo ? (
                <img
                  {...image(person.photo)}
                  sizes={SIZES.portrait}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="block aspect-square w-full object-cover"
                />
              ) : (
                <span
                  aria-hidden
                  className="flex aspect-square w-full items-center justify-center font-serif text-6xl text-[var(--accent)]/60"
                >
                  {initials(person.name)}
                </span>
              )}

              {/* A wash under the name, not a bar: the portraits are lit
                  differently from one another and a flat panel would sit on
                  some of them and float over others. */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy via-navy/70 to-transparent"
              />

              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <span className="block font-serif text-[1.125rem] leading-tight text-paper">
                  {person.name}
                  {person.koreanName && (
                    <span className="ml-2 text-[0.9375rem] font-light text-mist">
                      {person.koreanName}
                    </span>
                  )}
                </span>
                <span className="mt-1.5 block text-[0.6875rem] font-medium tracking-[0.16em] text-[var(--accent)] uppercase">
                  {person.title}
                </span>
              </figcaption>
            </span>
          </SceneLayer>
        </SceneLayer>
        )
      })}
    </PinnedScene>
  )
}
