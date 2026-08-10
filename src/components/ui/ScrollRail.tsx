import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { cx, prefersReducedMotion } from '@/lib/utils'

/**
 * Time constant for the drift's speed ramp, in milliseconds.
 *
 * This is a time *constant*, not a duration: the ramp below closes a fixed
 * proportion of the remaining gap per millisecond, so it settles after roughly
 * four or five of these. 90 puts a full stop at about 420ms — quick enough that
 * a cursor landing on a card feels like it stopped the rail, slow enough to
 * read as easing rather than a cut. 260 was tried first and was a mistake: it
 * left the rail visibly creeping for a second and a half after the hover, which
 * reads as the pause not having worked.
 */
const RAMP_MS = 90

/**
 * Below this fraction of full speed, call it stopped. Without it the ramp
 * chases an asymptote and the loop never parks. At 38px/s this threshold is
 * 0.4px per second — three seconds to cross a pixel.
 */
const RAMP_FLOOR = 0.01

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
  pxPerSecond = 40,
}: {
  children: ReactNode
  /** Names the region for screen readers — say what is in the rail. */
  label: string
  className?: string
  /**
   * Move the rail on its own.
   *
   * `'step'` jumps a card at a time on a timer. `'continuous'` drifts at a
   * constant speed instead, which is what a gallery wants — a stepped rail
   * spends most of its life motionless and then lurches, and reads as stiff.
   *
   * Continuous mode has two requirements the caller has to meet:
   *   - **render the children twice.** The wrap works by subtracting half the
   *     scroll width, which is seamless only if the second half repeats the
   *     first. Mark the copies `aria-hidden` and take them out of the tab order.
   *   - accept that scroll snapping is off. Snap points fight a continuous
   *     `scrollLeft`, dragging it back to the nearest card every frame.
   *
   * Either mode comes with a real pause control, which is not decoration: WCAG
   * 2.2.2 gives anyone the right to stop motion that runs for more than five
   * seconds. It also holds on hover, on focus inside the track, and while the
   * rail is off screen.
   *
   * On `prefers-reduced-motion` it keeps moving anyway. That is the site owner's
   * call, the same one already made for the scroll reveals and the globe, and it
   * is a real trade-off rather than an oversight: continuous drift is the form of
   * motion most likely to affect someone with vestibular sensitivity, and the
   * pause button is the whole of their mitigation. To restore the default,
   * initialise `playing` to `!prefersReducedMotion()` below.
   */
  autoAdvance?: false | 'step' | 'continuous'
  /** `'step'` mode only. */
  intervalMs?: number
  /** `'continuous'` mode only. Calm is the point; 40 is roughly a card every 12s. */
  pxPerSecond?: number
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [overflowing, setOverflowing] = useState(false)
  const continuous = autoAdvance === 'continuous'
  /* Null until mount so the buttons render nothing until the mode is settled;
     see the note on `autoAdvance` about reduced motion. */
  const [playing, setPlaying] = useState<boolean | null>(null)
  /* Two independent reasons to hold the timer, kept apart on purpose: a single
     flag lets the viewport observer overwrite a hover pause and start the rail
     moving under the cursor. */
  /* Starts true, and the observer below only ever takes it away. Starting false
     and waiting to be told otherwise meant a single missed callback left the rail
     motionless forever, with nothing on screen to explain why. Failing open costs
     at most a few frames of off-screen work. */
  const [onScreen, setOnScreen] = useState(true)
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

  /* Starts moving on mount regardless of `prefers-reduced-motion` — see the note
     on `autoAdvance` for whose call that is and how to reverse it. */
  useEffect(() => {
    if (!autoAdvance) return
    setPlaying(true)
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

  const running = autoAdvance && playing === true && !interacting && onScreen && overflowing

  /* Stepped mode: one card per tick. */
  useEffect(() => {
    if (!running || continuous) return
    const timer = window.setInterval(() => step(1, true), intervalMs)
    return () => window.clearInterval(timer)
  }, [running, continuous, intervalMs, step])

  /*
   * Current fraction of full speed, held across effect runs.
   *
   * The rail used to cut straight from full speed to nothing the instant a
   * cursor crossed it, and back again on the way out — correct, and it read as
   * a stutter rather than as a pause, because nothing physical stops like that.
   * Easing it in and out is what makes the hover feel like the rail responding
   * rather than the animation being killed.
   */
  const rateRef = useRef(0)

  /* Continuous mode: drift a fraction of a pixel per frame.
     The wrap subtracts one copy of the children — which is why the caller has
     to render them twice — and because both halves are identical, the seam is
     invisible. */
  const drifting = continuous && overflowing
  /* Separated from `drifting` so that stopping does not tear the loop down: it
     has to keep running long enough to ease the speed back to zero. */
  const wanted = playing === true && !interacting && onScreen ? 1 : 0

  useEffect(() => {
    if (!drifting) {
      rateRef.current = 0
      return
    }
    // Already stopped and asked to stay stopped: no frames needed at all.
    if (wanted === 0 && rateRef.current === 0) return

    const track = trackRef.current
    if (!track) return

    let frame = 0
    let previous = performance.now()
    /*
     * The position is accumulated here as a float rather than read back off the
     * element each frame, and that is the whole reason this works.
     *
     * At 38px/s a frame advances about 0.6px, and assigning that to `scrollLeft`
     * gets rounded to the nearest device pixel. Reading it back as the next
     * frame's base therefore loses the remainder every time, the value floors
     * straight back to where it started, and the rail sits perfectly still —
     * which is exactly what it did before this was fixed.
     */
    let position = track.scrollLeft
    let written = position

    /*
     * The wrap distance is one copy of the children, which is *not* half the
     * scroll width.
     *
     * `scrollWidth` spans 2N cards but only 2N−1 gaps — there is no gap after
     * the last one — so half of it falls half a gap short of a whole copy. With
     * 13 cards at 448px and a 24px gap that is 6124 against a true period of
     * 6136, and the rail hitched 12px backwards on every loop. Adding one gap
     * before halving restores the missing half-gap at each end.
     */
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || '0') || 0

    const tick = (now: number) => {
      /* Clamped: coming back to a backgrounded tab hands over a delta of many
         seconds, which would teleport the rail. */
      const elapsed = Math.min(now - previous, 50)
      previous = now

      /* If the element has moved somewhere we did not put it, a person did —
         dragged, flicked, or used the arrows — so continue from where they left
         it instead of yanking it back. */
      if (Math.abs(track.scrollLeft - written) > 2) position = track.scrollLeft

      /*
       * Ease the speed toward what is wanted rather than jumping to it.
       *
       * An exponential approach, so the result does not depend on the frame
       * rate: each millisecond closes a fixed proportion of the remaining gap.
       * It leaves and arrives gently at both ends, which is the shape a glide
       * to a halt actually has.
       */
      rateRef.current += (wanted - rateRef.current) * (1 - Math.exp(-elapsed / RAMP_MS))
      if (wanted === 0 && rateRef.current < RAMP_FLOOR) rateRef.current = 0

      const period = (track.scrollWidth + gap) / 2
      position += (pxPerSecond * rateRef.current * elapsed) / 1000
      if (period > 0 && position >= period) position -= period

      track.scrollLeft = position
      written = track.scrollLeft

      // Fully stopped: park the loop instead of burning a frame on nothing.
      if (wanted === 0 && rateRef.current === 0) return
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [drifting, wanted, pxPerSecond])

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
          {/* Neither arrow dead-ends once the rail loops, so neither is disabled
              there — a greyed-out button on a loop is just a lie. */}
          <RailButton
            label={`Scroll ${label} backwards`}
            onClick={() => step(-1)}
            disabled={autoAdvance ? false : atStart}
          >
            <path d="M12.5 4 6.5 10l6 6" />
          </RailButton>
          <RailButton
            label={`Scroll ${label} forwards`}
            onClick={() => step(1, autoAdvance === 'step')}
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
          'flex gap-6 overflow-x-auto overscroll-x-contain pb-3',
          /* Snapping and a continuous drift are incompatible: the snap engine
             pulls `scrollLeft` back to the nearest card on every frame the timer
             nudges it forward, and the rail sits there vibrating. */
          continuous ? 'snap-none' : 'snap-x snap-mandatory',
          /* Soft edges, so cards enter and leave rather than being sliced off at
             the container. Only when the rail actually overflows — a mask on a
             rail that fits would fade the first and last card for no reason. */
          overflowing &&
            '[mask-image:linear-gradient(to_right,transparent_0,black_3rem,black_calc(100%-3rem),transparent_100%)]',
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
