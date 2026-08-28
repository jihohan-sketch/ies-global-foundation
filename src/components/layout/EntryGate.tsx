import { useEffect, useRef, useState } from 'react'
import { site } from '@/content/site'
import { prefersReducedMotion } from '@/lib/utils'

/** Only the first arrival in a browsing session sees the curtain. */
const SEEN_KEY = 'ies:entry-seen'

/** How long the curtain holds once the page is ready, in ms. */
const HOLD = 1400

/** Length of the curtain's fade-out, in ms. Must match the class below. */
const FADE = 900

/**
 * The curtain the site opens with: the mark drawing itself over the motto,
 * then dissolving into the page.
 *
 * Three deliberate constraints, because an entry animation is the easiest thing
 * on a site to get self-indulgently wrong:
 *
 *   1. **It is not a gate.** There is nothing to click and nothing to dismiss.
 *      Visitors here include schools, parents and partner institutions, and
 *      making any of them press "Enter" before they can read a safeguarding
 *      policy is a cost with no matching benefit.
 *   2. **Once per session.** Sitting through it on every navigation would turn
 *      a flourish into an obstacle, so `sessionStorage` remembers it played.
 *      A read can throw outright in a locked-down browser, so both the read and
 *      the write are guarded and failure means "show it", never a blank page.
 *   3. **It cannot strand anyone.** The timer starts on mount rather than on a
 *      `load` event, so a stalled font or image cannot leave the curtain up.
 *      Under `prefers-reduced-motion` it never mounts at all.
 *
 * While it is up the page underneath is inert to a screen reader — but the
 * curtain itself is `aria-hidden` too, and focus is never moved into it, so a
 * keyboard or screen-reader visitor simply starts on a page that is already
 * theirs. Nothing here is in the tab order.
 */
export function EntryGate() {
  /* Resolved once, synchronously, before first paint — deciding this in an
     effect would flash the curtain for one frame at the top of every route. */
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false
    if (prefersReducedMotion()) return false
    try {
      return sessionStorage.getItem(SEEN_KEY) !== '1'
    } catch {
      /* Storage disabled or partitioned. Playing the curtain is the graceful
         failure; suppressing the whole site is not. */
      return true
    }
  })
  const [leaving, setLeaving] = useState(false)
  const ringRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (!show) return

    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* Nothing to do — the curtain will simply play again next time. */
    }

    const toFade = window.setTimeout(() => setLeaving(true), HOLD)
    const toDrop = window.setTimeout(() => setShow(false), HOLD + FADE)

    return () => {
      window.clearTimeout(toFade)
      window.clearTimeout(toDrop)
    }
  }, [show])

  /* The body must not scroll behind the curtain: a wheel event during it lands
     on a page the visitor cannot see, and they arrive somewhere they did not
     choose. Restored in the same effect's cleanup so an unmount mid-curtain —
     a fast-refresh, an error boundary — cannot leave the page frozen. */
  useEffect(() => {
    if (!show) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [show])

  /* Measure the ring so the trace covers exactly its own circumference. Doing
     this from the DOM rather than from `2πr` in a constant means the animation
     stays correct if the radius is ever edited. */
  useEffect(() => {
    const ring = ringRef.current
    if (!ring) return
    const length = ring.getTotalLength()
    ring.style.setProperty('--trace-length', String(length))
    ring.style.strokeDasharray = String(length)
  }, [show])

  if (!show) return null

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-navy"
      style={{
        animation: leaving
          ? `ies-gate-out ${FADE}ms var(--ease-cinema) forwards`
          : undefined,
      }}
    >
      {/* The mark, reduced to its ring and drawn once. The full LogoMark is
          three separate arcs with round caps, which cannot be traced as one
          continuous stroke — this is a single circle standing in for it. */}
      <svg viewBox="0 0 100 100" className="h-16 w-16" fill="none">
        <circle
          ref={ringRef}
          cx="50"
          cy="50"
          r="38"
          stroke="var(--color-gold)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            strokeDashoffset: 'var(--trace-length, 300)',
            animation: 'ies-gate-trace 1500ms var(--ease-cinema) forwards',
            transformOrigin: '50% 50%',
            transform: 'rotate(-90deg)',
          }}
        />
      </svg>

      <p
        className="text-cinema mt-10 -mr-[0.2em] font-serif font-normal text-paper"
        style={{ animation: 'ies-gate-rise 1100ms var(--ease-cinema) 300ms both' }}
      >
        {site.motto}
      </p>

      <p
        className="mt-6 text-[0.75rem] font-semibold tracking-[0.14em] text-slate uppercase"
        style={{ animation: 'ies-gate-rise 1100ms var(--ease-cinema) 600ms both' }}
      >
        {site.shortName} Global Foundation
      </p>
    </div>
  )
}
