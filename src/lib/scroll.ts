import { useEffect, useRef, type RefObject } from 'react'
import { prefersReducedMotion } from '@/lib/utils'

/*
 * THE SCROLL ENGINE
 *
 * One scroll listener, one rAF loop, one geometry cache for the whole site.
 * Elements register themselves; on every frame the engine writes each one a
 * single CSS custom property holding its scroll progress, 0 → 1. Everything
 * visual — the fades, the travel, the scale, the blur, the horizontal pans —
 * is then plain CSS reading that number.
 *
 * Three rules hold this together, and breaking any one of them is how a
 * scroll-driven site starts to jank:
 *
 *   1. **A frame never reads layout.** Geometry is measured only when it can
 *      actually have changed (resize, or a ResizeObserver firing), and every
 *      measurement for the frame happens in one batch *before* the first write.
 *      Interleaving a read after a write forces the browser to redo layout it
 *      had just finished.
 *   2. **A frame never re-renders React.** Progress lands on the DOM as a
 *      custom property, not in state. A hundred registered elements cost a
 *      hundred `setProperty` calls, not a hundred reconciliations.
 *   3. **Only transform and opacity move.** The engine writes a number; the CSS
 *      that consumes it is responsible for staying on the compositor.
 *
 * Everything scroll-driven on the site goes through here. `Reveal` is the one
 * deliberate exception: it is a one-shot IntersectionObserver fade with no
 * progress to track, and putting it on a per-frame loop would buy nothing.
 */

/* ------------------------------------------------------------------ anchors */

/**
 * A pair of alignment points: where on the *element* and where in the
 * *viewport*, each as a fraction (0 = top, 1 = bottom).
 *
 * `[0, 1]` reads "the element's top edge, at the bottom of the viewport".
 * Progress hits 0 at the `start` pairing and 1 at the `end` pairing, so the two
 * together describe exactly which stretch of scrolling the effect occupies.
 */
export type ScrollAnchor = readonly [element: number, viewport: number]

/**
 * The default window: 0 as the element's top enters from below, 1 as its
 * bottom leaves past the top. A full crossing of the viewport — what parallax
 * and enter/exit fades want.
 */
export const THROUGH = {
  start: [0, 1] as ScrollAnchor,
  end: [1, 0] as ScrollAnchor,
}

/**
 * The pinned window: 0 as the element's top reaches the top of the viewport, 1
 * as its bottom reaches the bottom. For a section taller than the viewport this
 * is precisely the stretch during which a `sticky` child stays put, which is
 * what makes it the right window for anything driving a pinned scene.
 */
export const PINNED = {
  start: [0, 0] as ScrollAnchor,
  end: [1, 1] as ScrollAnchor,
}

/**
 * An entrance: 0 as the top enters from below, 1 once the element has risen a
 * third of the way up the viewport. Arrives and then stays arrived, rather than
 * continuing to move for the whole crossing.
 */
export const ENTER = {
  start: [0, 1] as ScrollAnchor,
  end: [0, 0.35] as ScrollAnchor,
}

/* ------------------------------------------------------------------ options */

export interface ScrubOptions {
  /** Alignment at which progress is 0. Defaults to `THROUGH.start`. */
  start?: ScrollAnchor
  /** Alignment at which progress is 1. Defaults to `THROUGH.end`. */
  end?: ScrollAnchor
  /** Custom property to write. Defaults to `--p`. */
  property?: string
  /**
   * Where to write it. Defaults to the observed node itself; pass a different
   * element to measure one box and drive another — a sticky child reading the
   * progress of the tall section that pins it, for instance.
   */
  target?: HTMLElement
  /**
   * Called with progress on every frame it changes, after the property is
   * written. For the rare effect that cannot be expressed in CSS. It runs
   * inside the frame, so it is held to the same rules: no layout reads, no
   * state updates.
   */
  onProgress?: (progress: number) => void
  /**
   * The value to park at under `prefers-reduced-motion`, written once at
   * registration. `1` — the settled, arrived state — is almost always right;
   * a symmetric enter/exit effect wants `0.5`, its neutral middle.
   */
  reduced?: number
  /**
   * Track even under `prefers-reduced-motion`.
   *
   * For scroll *indicators* rather than scroll effects — a progress hairline,
   * a position marker in a long document. The distinction is whether the
   * element is reporting where the visitor is or performing for them: the
   * reader moved the page either way, and withholding the readout from someone
   * who asked for less motion tells them less about a document they are
   * already navigating.
   *
   * Anything that moves *content* stays gated. If you find yourself reaching
   * for this to keep a parallax alive, that is the wrong call.
   */
  always?: boolean
}

/* -------------------------------------------------------------------- state */

interface Entry {
  node: HTMLElement
  target: HTMLElement
  property: string
  start: ScrollAnchor
  end: ScrollAnchor
  onProgress?: (progress: number) => void
  /** Scroll positions, in document coordinates, at which progress is 0 and 1. */
  from: number
  to: number
  /** Last value written, to skip redundant writes. `-1` forces the next one. */
  applied: number
  /** Whether the element is near enough to the viewport to be worth updating. */
  active: boolean
  /** Set when geometry needs re-measuring before the next write. */
  dirty: boolean
}

const entries = new Set<Entry>()
const byNode = new WeakMap<Element, Entry>()

let frame = 0
let listening = false
let viewport = 0

let observer: IntersectionObserver | null = null
let resizer: ResizeObserver | null = null

/**
 * Progress is quantised before it is written. Below about a thousandth the
 * change is invisible, and a value that keeps changing by nothing keeps
 * invalidating a composited layer for no reason.
 */
const PRECISION = 1000

/*
 * How far outside the viewport an element stays registered as active.
 *
 * Generous on purpose: an element that becomes active only as it appears has
 * missed the part of its own window that happens off screen, and lands on the
 * first visible frame with a jump. A screen of margin either way means every
 * element is already tracking correctly by the time anyone can see it.
 */
const ACTIVE_MARGIN = '100% 0px 100% 0px'

/* ---------------------------------------------------------------- measuring */

/** Reads layout. Only ever called from the read phase of a frame. */
function measure(entry: Entry) {
  const rect = entry.node.getBoundingClientRect()
  const top = rect.top + window.scrollY
  const height = rect.height

  // The scroll position at which the element anchor meets the viewport anchor.
  entry.from = top + height * entry.start[0] - viewport * entry.start[1]
  entry.to = top + height * entry.end[0] - viewport * entry.end[1]
  entry.dirty = false
  entry.applied = -1
}

/** Writes one entry's progress. Never reads layout. */
function write(entry: Entry) {
  const span = entry.to - entry.from
  /*
   * A zero span means the two anchors resolve to the same scroll position —
   * an element shorter than the window it was given, most often. There is no
   * progression to express, so it parks at its arrived state rather than
   * dividing by zero.
   */
  const raw = span === 0 ? 1 : (window.scrollY - entry.from) / span
  const progress = Math.round(Math.min(1, Math.max(0, raw)) * PRECISION) / PRECISION

  if (progress === entry.applied) return
  entry.applied = progress
  entry.target.style.setProperty(entry.property, String(progress))
  entry.onProgress?.(progress)
}

/* --------------------------------------------------------------- the frame */

function update() {
  frame = 0

  /*
   * Read phase, then write phase — in that order, never interleaved. Both
   * loops walk the same set; splitting them is what keeps a frame down to at
   * most one layout pass no matter how many elements are registered.
   */
  for (const entry of entries) {
    if (entry.active && entry.dirty) measure(entry)
  }
  for (const entry of entries) {
    if (entry.active) write(entry)
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(update)
}

/**
 * Marks every entry for re-measurement. Cheap — it sets flags; the reads
 * themselves happen in the next frame's read phase, batched.
 */
function invalidate() {
  viewport = window.innerHeight
  for (const entry of entries) entry.dirty = true
  schedule()
}

/* ------------------------------------------------------------ registration */

function start() {
  if (listening) return
  listening = true
  viewport = window.innerHeight

  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', invalidate)

  /*
   * An element's own box can move without the window resizing — images and web
   * fonts landing above it, a disclosure opening, the reveal animations on the
   * way down. Observing each node catches its own changes; observing the
   * document element catches everything that shifts it from above.
   */
  observer = new IntersectionObserver(
    (records) => {
      for (const record of records) {
        const entry = byNode.get(record.target)
        if (!entry) continue
        entry.active = record.isIntersecting
        entry.node.toggleAttribute('data-scrub-active', record.isIntersecting)
        if (record.isIntersecting) {
          // Re-measure on the way in: whatever moved while it was parked is
          // exactly what would otherwise show up as a jump on the first frame.
          entry.dirty = true
        } else {
          /*
           * Park at the nearer end rather than freezing mid-effect. Leaving it
           * where it was means an element scrolled past at speed keeps a
           * half-finished opacity for as long as it stays off screen, and
           * shows it on the way back.
           */
          entry.dirty = false
          write(entry)
        }
      }
      schedule()
    },
    { rootMargin: ACTIVE_MARGIN },
  )

  resizer = new ResizeObserver(invalidate)
  resizer.observe(document.documentElement)
}

function stop() {
  if (!listening || entries.size > 0) return
  listening = false

  if (frame) cancelAnimationFrame(frame)
  frame = 0

  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', invalidate)
  observer?.disconnect()
  observer = null
  resizer?.disconnect()
  resizer = null
}

/**
 * Registers an element for scroll-progress tracking. Returns the unregister
 * function — call it on unmount.
 *
 * Under `prefers-reduced-motion` nothing is registered at all: the property is
 * written once at its resting value and the element is left alone. That is a
 * deliberate departure from the carve-out the one-shot `.reveal` animations
 * have. A reveal is an 18px rise that runs once; scrubbed motion runs
 * continuously and tracks the wheel, which is the form most likely to affect
 * someone with vestibular sensitivity.
 */
export function observeScroll(node: HTMLElement, options: ScrubOptions = {}): () => void {
  const property = options.property ?? '--p'
  const target = options.target ?? node

  if (prefersReducedMotion() && !options.always) {
    target.style.setProperty(property, String(options.reduced ?? 1))
    return () => target.style.removeProperty(property)
  }

  const entry: Entry = {
    node,
    target,
    property,
    start: options.start ?? THROUGH.start,
    end: options.end ?? THROUGH.end,
    onProgress: options.onProgress,
    from: 0,
    to: 0,
    applied: -1,
    /*
     * Active until the IntersectionObserver says otherwise. Starting inactive
     * would leave anything already on screen at first paint — the hero, above
     * all — unwritten until the observer's first callback lands.
     */
    active: true,
    dirty: true,
  }

  entries.add(entry)
  byNode.set(node, entry)
  start()
  observer?.observe(node)
  resizer?.observe(node)

  // Measured and written synchronously, so the element is never painted once
  // at its unstyled default and then corrected on the next frame. The active
  // flag is set here too rather than waiting for the observer's first callback,
  // which lands a frame late — long enough for the hero to paint unpromoted.
  viewport = window.innerHeight
  measure(entry)
  write(entry)
  node.toggleAttribute('data-scrub-active', true)

  return () => {
    entries.delete(entry)
    byNode.delete(node)
    observer?.unobserve(node)
    resizer?.unobserve(node)
    node.removeAttribute('data-scrub-active')
    target.style.removeProperty(property)
    stop()
  }
}

/* ------------------------------------------------------------------ windows */

/**
 * Which stretch of scrolling the effect occupies.
 *
 * - `enter` — arrives as it comes up the screen, then holds. The default, and
 *   the right answer for most copy.
 * - `through` — runs the full crossing of the viewport, so it also *leaves*.
 *   For parallax and for anything that should fade back out on the way past.
 * - `pinned` — from the element's top hitting the top of the viewport to its
 *   bottom hitting the bottom. For a tall section driving a sticky child.
 */
export type ScrubWindow = 'enter' | 'through' | 'pinned'

export const WINDOWS = { enter: ENTER, through: THROUGH, pinned: PINNED }

/* --------------------------------------------------------------------- hook */

/**
 * The engine as a hook, for components that need the number rather than a
 * preset — a pinned scene translating a track, a counter reading up to its
 * figure.
 *
 * Measures `ref` and writes to `targetRef` if one is given, which is how a
 * sticky child gets the progress of the tall section that pins it.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  options: ScrubOptions & { window?: ScrubWindow; targetRef?: RefObject<HTMLElement | null> } = {},
) {
  const { window: windowName = 'through', targetRef, ...rest } = options
  /* Kept in a ref so a caller can pass an inline arrow without re-registering
     on every render — the callback is read at frame time, not at bind time. */
  const onProgress = useRef(rest.onProgress)
  onProgress.current = rest.onProgress

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const range = WINDOWS[windowName]
    return observeScroll(node, {
      start: rest.start ?? range.start,
      end: rest.end ?? range.end,
      property: rest.property,
      target: targetRef?.current ?? rest.target,
      reduced: rest.reduced,
      onProgress: (p) => onProgress.current?.(p),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, targetRef, windowName, rest.property, rest.reduced, rest.start, rest.end])
}
