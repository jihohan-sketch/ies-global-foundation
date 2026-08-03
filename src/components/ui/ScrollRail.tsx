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
}: {
  children: ReactNode
  /** Names the region for screen readers — say what is in the rail. */
  label: string
  className?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [overflowing, setOverflowing] = useState(false)

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

  const step = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    // Scroll by one card rather than a fixed pixel count, so the rail lands on
    // a snap point instead of halfway across one.
    const first = track.firstElementChild as HTMLElement | null
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || '0') || 0
    const distance = first ? first.getBoundingClientRect().width + gap : track.clientWidth * 0.8
    track.scrollBy({
      left: direction * distance,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }

  return (
    <div className={cx('relative', className)}>
      {/* Controls sit above the rail, not floating over the cards — an arrow
          laid on top of a portrait covers the thing it is meant to reveal.
          Hidden entirely when everything already fits. */}
      {overflowing && (
        <div className="mb-5 flex justify-end gap-2">
          <RailButton label={`Scroll ${label} backwards`} onClick={() => step(-1)} disabled={atStart}>
            <path d="M12.5 4 6.5 10l6 6" />
          </RailButton>
          <RailButton label={`Scroll ${label} forwards`} onClick={() => step(1)} disabled={atEnd}>
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
}: {
  children: ReactNode
  label: string
  onClick: () => void
  disabled: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      /* 44px square: the platform minimum for a touch target, which these miss
         if sized to the glyph. */
      className="flex h-11 w-11 items-center justify-center border border-mist/25 text-paper/80 transition-colors duration-200 hover:border-[var(--accent)]/60 hover:text-[var(--accent)] disabled:pointer-events-none disabled:opacity-30"
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
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cx('w-[82vw] max-w-[24rem] shrink-0 snap-start sm:w-[24rem]', className)}>
      {children}
    </div>
  )
}
