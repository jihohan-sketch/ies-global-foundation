import { useEffect, useRef, useState } from 'react'
import { cx, prefersReducedMotion } from '@/lib/utils'

/*
 * WHERE YOU ARE, DOWN THE LEFT EDGE.
 *
 * A page built out of pinned scenes has a problem ordinary pages do not: for
 * several screens at a time the wheel moves and the *section* does not change,
 * so the usual signals — a heading passing the top of the screen, the scrollbar
 * shrinking — stop meaning anything. The visitor knows the page is responding
 * (a panel is travelling sideways) but not where they are in it.
 *
 * This is the answer, and it is deliberately the smallest one that works: one
 * hairline per section down the left margin, the current one three times the
 * length of the others and in the accent. It says the same thing the headings
 * say. It just keeps saying it while a scene is holding.
 *
 * ---------------------------------------------------------------------------
 * THE MIDLINE, MEASURED RATHER THAN OBSERVED
 *
 * The obvious build is an `IntersectionObserver` with a `-50% 0px -50%` root
 * margin — the standard scroll-spy trick, and it was the first thing here. It
 * collapses the root to a zero-height band at the middle of the screen, and a
 * zero-height band is exactly the case where "does this rectangle intersect" is
 * least well behaved: on this page it delivered its first records and then went
 * quiet, leaving the rail stuck on whichever section happened to be crossing
 * the middle at mount.
 *
 * So the rail measures instead. Section tops are cached and only re-read when
 * they can have changed; a scroll does arithmetic on the cache and nothing
 * else. That is the same contract the scroll engine in `lib/scroll.ts` holds
 * itself to — a frame never reads layout — and it makes the answer exact: the
 * active section is the last one whose top has passed the middle of the
 * viewport, which is a definition rather than a heuristic.
 *
 * It reads the same document position under `prefers-reduced-motion` as it does
 * without, and deliberately: this reports where the visitor is rather than
 * performing for them, and withholding it from someone who asked for less
 * motion tells them less about a page they are already navigating. Same
 * distinction the engine draws with its `always` flag.
 */

export interface RailSection {
  id: string
  label: string
}

export function SectionRail({ sections }: { sections: readonly RailSection[] }) {
  /* The id, not the index: sections are keyed by identity so a section added to
     the middle of the page cannot silently relabel the active one. */
  const [active, setActive] = useState<string | null>(null)
  /* Held in a ref as well, so the frame can compare without the effect having
     to re-subscribe every time the value changes. */
  const current = useRef<string | null>(null)

  useEffect(() => {
    /** Document-coordinate top of each section, in the order given. */
    let tops: number[] = []
    let frame = 0

    const measure = () => {
      tops = sections.map((section) => {
        const node = document.getElementById(section.id)
        /* A missing id parks that entry past the end of the document rather
           than at 0, so a mistyped id drops out of the running instead of
           winning every comparison and pinning the rail to the top. */
        return node ? node.getBoundingClientRect().top + window.scrollY : Number.POSITIVE_INFINITY
      })
    }

    const pick = () => {
      frame = 0
      const midline = window.scrollY + window.innerHeight / 2
      /* Walking backwards: the answer is the *last* section that has started,
         and the first match from the end is it. */
      let found: string | null = current.current
      for (let i = tops.length - 1; i >= 0; i--) {
        if (tops[i] <= midline) {
          found = sections[i].id
          break
        }
      }
      if (found !== current.current) {
        current.current = found
        setActive(found)
      }
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(pick)
    }

    const remeasure = () => {
      measure()
      schedule()
    }

    measure()
    pick()

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', remeasure)
    /* Section tops move without the window resizing — images and web fonts
       landing above them, a route transition settling. Watching the document
       element catches all of it in one subscription. */
    const resizer = new ResizeObserver(remeasure)
    resizer.observe(document.documentElement)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', remeasure)
      resizer.disconnect()
    }
  }, [sections])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    /*
     * `aria-hidden`, and the buttons are unreachable by keyboard.
     *
     * This is a duplicate route to headings that are already in the document,
     * already in order, and already reachable — a screen-reader user navigating
     * by heading has a better version of this than the rail is. Putting six
     * more tab stops in front of the page to offer the same six destinations
     * is noise, and the "skip to content" link exists precisely to get past
     * that kind of thing. Hidden from the tree, it costs nothing and duplicates
     * nothing.
     *
     * Two widths, because the rail has two parts and they need different room.
     *
     * The ticks need only the gutter, so they appear at `2xl` — the widest
     * container on the site is 88rem, which leaves about 64px of margin there.
     * The labels need roughly a hundred more pixels than that, and at 1536 they
     * would be set on top of the first column of copy. So they wait for 1700,
     * and between the two widths the rail is ticks alone: still a readable
     * position indicator, just an unlabelled one.
     */
    <nav
      aria-hidden
      className="pointer-events-none fixed top-1/2 left-5 z-30 hidden -translate-y-1/2 2xl:block"
    >
      <ul className="flex flex-col gap-4">
        {sections.map((section) => {
          const isActive = active === section.id
          return (
            <li key={section.id}>
              <button
                type="button"
                tabIndex={-1}
                onClick={() => go(section.id)}
                className="pointer-events-auto group flex items-center gap-3"
              >
                {/* Fixed width, scaled — see `.rail-tick`. The active entry's
                    tick is three times the length of a resting one, which is
                    the whole indicator: no dot, no fill, no colour change large
                    enough to catch the eye while you are reading past it. */}
                <span
                  className={cx(
                    'rail-tick block h-px w-7',
                    isActive ? 'bg-[var(--accent)]' : 'bg-mist/30 group-hover:bg-mist/60',
                  )}
                  style={{ '--tick': isActive ? 1 : 0.3 } as React.CSSProperties}
                />
                {/*
                 * The label is the key to the ticks, and it is deliberately
                 * not always on: nine names down the left margin is a second
                 * navigation competing with the page. The current one is
                 * legible because you may want to know where you are; the rest
                 * arrive under the cursor because that is when you are asking.
                 *
                 * There are no numbers here. The sections print their own
                 * indices beside their headings, and a rail numbering them a
                 * second time — from a list that includes two sections which
                 * print no index at all — would be two numbering schemes
                 * disagreeing in the same eyeline.
                 */}
                <span
                  className={cx(
                    'hidden text-[0.5625rem] font-medium tracking-[0.26em] whitespace-nowrap uppercase min-[1700px]:block',
                    'transition-[opacity,color] duration-500 ease-[var(--ease-cinema)]',
                    isActive
                      ? 'text-[var(--accent)] opacity-100'
                      : 'text-mist/70 opacity-0 group-hover:opacity-100',
                  )}
                >
                  {section.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
