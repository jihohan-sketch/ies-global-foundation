import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { cx, prefersReducedMotion } from '@/lib/utils'

/*
 * Horizontal card rail.
 *
 * The distinction that matters: this scrolls *inside its own track*. The page
 * body never gains a horizontal scrollbar, and vertical scrolling is never
 * intercepted — a rail that hijacks the wheel is the pattern that makes people
 * seasick, and it is not this one.
 *
 * Reachable three ways, because a rail that only responds to a trackpad swipe
 * is invisible to half its audience:
 *   - pointer: drag / wheel-tilt, native
 *   - keyboard: the track is focusable, so arrow keys scroll it, and the
 *     buttons are real buttons in the tab order
 *   - touch: swipe, with scroll-snap holding cards on their edges
 *
 * `overscroll-x-contain` stops a fling at the end of the rail from turning into
 * a browser back-navigation gesture.
 */
export function ScrollRail({
  children,
  label,
  className,
  autoAdvance = false,
  intervalMs = 4500,
}: {
  children: ReactNode
  /** Names the region for screen readers — say what is in the rail. */
  label: string
  className?: string
  /**
   * Advance the rail on a timer, looping back to the start at the end.
   *
   * Comes with a real pause control, which is not decoration: WCAG 2.2.2 gives
   * anyone the right to stop motion that runs for more than five seconds. It
   * also stops on hover, on focus inside the track, and while the rail is off
   * screen, and it never starts at all under `prefers-reduced-motion` — a
   * carousel that keeps moving while someone is reading it is a bug.
   */
  autoAdvance?: boolean
  intervalMs?: number
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [overflowing, setOverflowing] = useState(false)
  /* Null until mount: the reduced-motion query cannot be read during render on
     the server, and starting "playing" then correcting would flash motion at
     exactly the people who asked for none. */
  const [playing, setPlaying] = useState<boolean | null>(null)
  /* Two independent reasons to hold the timer, kept apart on purpose: a single
     flag lets the viewport observer overwrite a hover pause and start the rail
     moving under the cursor. */
  const [onScreen, setOnScreen] = useState(false)
  const [interacting, setInteracting] = useState(false)

  const sync = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    // 2px of slack: sub-pixel layout means scrollLeft rarely lands exactly on
    // the maximum, which would otherwise leave the "next" button live forever.
    const max = track.scrollWidth - track.clientWidth
    setOverflowing(max > 2)
    setAtStart(track.scrollLeft <= 2)
    setAtEnd(track.scrollLeft >= max - 2)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    sync()
    /* Native listener rather than React's onScroll, and bound to the element
       itself: scroll does not bubble, and this keeps the button state tied to
       the thing that actually moved. */
    track.addEventListener('scroll', sync, { passive: true })
    const observer = new ResizeObserver(sync)
    observer.observe(track)
    for (const child of Array.from(track.children)) observer.observe(child)
    return () => {
      track.removeEventListener('scroll', sync)
      observer.disconnect()
    }
  }, [sync])

  const step = useCallback((direction: 1 | -1, wrap = false) => {
    const track = trackRef.current
    if (!track) return
    // Scroll by one card rather than a fixed pixel count, so the rail lands on
    // a snap point instead of halfway across one.
    const first = track.firstElementChild as HTMLElement | null
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || '0') || 0
    const distance = first ? first.getBoundingClientRect().width + gap : track.clientWidth * 0.8
    const behavior = prefersReducedMotion() ? 'auto' : 'smooth'

    if (wrap && direction === 1) {
      /* Scroll snapping means the rail's resting place is a snap point, which is
         usually short of the true maximum — with 13 cards the last snap sits 48px
         before the end. Testing `scrollLeft >= max` therefore never fires, and the
         rail dead-ends instead of looping. Measure the remaining distance instead.
         Landing exactly on the end first is intentional: it shows the final card
         in full, and the tick after that returns to the start. */
      const remaining = track.scrollWidth - track.clientWidth - track.scrollLeft
      if (remaining <= 4) {
        track.scrollTo({ left: 0, behavior })
        return
      }
      if (remaining < distance) {
        track.scrollTo({ left: track.scrollWidth - track.clientWidth, behavior })
        return
      }
    }
    track.scrollBy({ left: direction * distance, behavior })
  }, [])

  /* Decide once, on mount, whether the timer is allowed to run at all. */
  useEffect(() => {
    if (!autoAdvance) return
    setPlaying(!prefersReducedMotion())
  }, [autoAdvance])

  /* Only advance while on screen. The rail sits below the fold on arrival, and a
     carousel that has silently cycled to the end before anyone looks at it has
     wasted its whole point. Without IntersectionObserver, treat it as visible
     rather than never running. */
  useEffect(() => {
    if (!autoAdvance) return
    const track = trackRef.current
    if (!track) return
    if (!('IntersectionObserver' in window)) {
      setOnScreen(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.25 },
    )
    observer.observe(track)
    return () => observer.disconnect()
  }, [autoAdvance])

  useEffect(() => {
    if (!autoAdvance || playing !== true || interacting || !onScreen || !overflowing) return
    const timer = window.setInterval(() => step(1, true), intervalMs)
    return () => window.clearInterval(timer)
  }, [autoAdvance, playing, interacting, onScreen, overflowing, intervalMs, step])

  return (
    <div
      className={cx('relative', className)}
      /* Hover and keyboard focus both hold the timer. Someone reading a caption
         should not have it slide out from under them. */
      onMouseEnter={autoAdvance ? () => setInteracting(true) : undefined}
      onMouseLeave={autoAdvance ? () => setInteracting(false) : undefined}
      onFocusCapture={autoAdvance ? () => setInteracting(true) : undefined}
      onBlurCapture={autoAdvance ? () => setInteracting(false) : undefined}
    >
      {/* Controls sit above the rail, not floating over the cards — an arrow
          laid on top of a portrait covers the thing it is meant to reveal.
          Hidden entirely when everything already fits. */}
      {overflowing && (
        <div className="mb-5 flex justify-end gap-2">
          {/* The pause control is required, not optional garnish — see the note
              on `autoAdvance`. It leads the group so it is the first thing
              reached by tab, which is the point of it. */}
          {autoAdvance && playing !== null && (
            <RailButton
              label={playing ? `Pause ${label} slideshow` : `Play ${label} slideshow`}
              onClick={() => setPlaying((p) => !p)}
              disabled={false}
              pressed={playing}
            >
              {playing ? (
                <>
                  <path d="M7.5 4.5v11" />
                  <path d="M12.5 4.5v11" />
                </>
              ) : (
                <path d="M7 4.5l8 5.5-8 5.5z" />
              )}
            </RailButton>
          )}
          <RailButton label={`Scroll ${label} backwards`} onClick={() => step(-1)} disabled={atStart}>
            <path d="M12.5 4 6.5 10l6 6" />
          </RailButton>
          {/* With auto-advance the forwards button wraps rather than dead-ending,
              so it is never disabled — the rail is a loop, not a strip. */}
          <RailButton
            label={`Scroll ${label} forwards`}
            onClick={() => step(1, autoAdvance)}
            disabled={autoAdvance ? false : atEnd}
          >
            <path d="M7.5 4l6 6-6 6" />
          </RailButton>
        </div>
      )}

      <div
        ref={trackRef}
        // Focusable so the arrow keys work, and labelled so a screen reader
        // announces what it landed in. `group` is not used here — the buttons
        // are siblings, not children, of the scrolling element.
        tabIndex={0}
        role="region"
        aria-label={label}
        className={cx(
          'flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-3',
          // The scrollbar is suppressed because the buttons and the peeking
          // next card already say "there is more"; the track stays scrollable.
          '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]',
        )}
      >
        {children}
      </div>
    </div>
  )
}

function RailButton({
  children,
  label,
  onClick,
  disabled,
  pressed,
}: {
  children: ReactNode
  label: string
  onClick: () => void
  disabled: boolean
  pressed?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={pressed}
      /* 44px square: the platform minimum for a touch target, which these miss
         if sized to the glyph. */
      /* Was mist/25 on paper/80 — legible in a screenshot, invisible in use.
         The accent border and tinted ground make it read as a control. */
      className="flex h-11 w-11 items-center justify-center border border-[var(--accent)]/45 bg-[var(--accent)]/8 text-[var(--accent)] transition-colors duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent)]/18 disabled:pointer-events-none disabled:border-mist/15 disabled:bg-transparent disabled:text-mist/30"
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden
      >
        {children}
      </svg>
    </button>
  )
}

/**
 * One card in a rail.
 *
 * Fixed width at every breakpoint, deliberately. An earlier version let items
 * flex to fill from `lg`, which made a short rail stop overflowing and render
 * as an ordinary row on a wide screen — tidy, and completely invisible as a
 * rail. Holding the width means the track overflows whenever the content is
 * genuinely wider than the container, at any screen size, and the next card
 * always peeks past the right edge.
 */
export function RailItem({
  children,
  className,
  size = 'default',
}: {
  children: ReactNode
  className?: string
  /**
   * `wide` is for image cards, which need the extra width to be worth looking
   * at. It is a prop rather than a class passed in `className`, because two
   * `w-*` utilities on one element resolve by stylesheet order rather than by
   * the order they are written — the override silently loses about half the
   * time.
   */
  size?: 'default' | 'wide'
}) {
  return (
    <div
      className={cx(
        'shrink-0 snap-start',
        size === 'wide'
          ? 'w-[86vw] max-w-[28rem] sm:w-[28rem]'
          : 'w-[82vw] max-w-[24rem] sm:w-[24rem]',
        className,
      )}
    >
      {children}
    </div>
  )
}
