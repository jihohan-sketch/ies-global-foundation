import { useEffect, useRef, type ElementType, type ReactNode } from 'react'
import { WINDOWS, observeScroll, type ScrubOptions, type ScrubWindow } from '@/lib/scroll'
import { cx } from '@/lib/utils'

/*
 * The scroll-scrubbed counterpart to `Reveal`.
 *
 * `Reveal` fires once when an element appears and then it is over. This one
 * stays tied to the wheel for as long as the element is on screen: scroll
 * halfway through it and the effect is halfway done, scroll back and it comes
 * back. That difference is the whole point — the site should feel driven,
 * not merely decorated.
 *
 * Nothing here computes anything. The component registers its node with the
 * engine, the engine writes `--p`, and a class in index.css turns that number
 * into transform and opacity. Which means an effect is a stylesheet change,
 * not a component change.
 */

/**
 * The knobs every preset reads, as props rather than as raw custom properties.
 *
 * They were on `SceneLayer` only, which meant a `Scrub` wanting a different
 * travel had to hand-write `style={{ '--scrub-travel': … }}` — and TypeScript
 * rejects a custom property in a `CSSProperties` literal, so every one of those
 * needed a cast as well. Shared here, both components plumb them the same way
 * and no caller touches a custom property by hand.
 */
export interface ScrubTuning {
  /** `--scrub-travel` — how far the translate presets move. */
  travel?: string
  /** `--scrub-depth` — the layer's parallax depth. Small is far away. */
  depth?: string
  /** `--scrub-fade` — the share of `scrub-dissolve`'s window spent leaving. */
  fade?: number
  /** `--scrub-grow` — the scale delta for `scrub-open` / `scrub-expand`. */
  grow?: number
  /**
   * `--scrub-span` — the horizontal sweep for `scrub-cross` and
   * `scrub-converge`. Signed: a negative span comes from the other side. In
   * `vw`, so the gesture scales with the frame it crosses.
   */
  span?: string
  /**
   * `--scrub-length` — how much of the scene the effect occupies, 0 → 1.
   *
   * The other half of `offset`. Offset says when a beat starts; without a
   * length every beat then runs to the end of the scene, which is how a pinned
   * scene ends up with one interminable effect and two dead stretches. Give
   * each beat a length and it finishes, holds, and leaves room for the next.
   *
   * Inherits, so setting it on a wrapper gives every `.scrub` inside — every
   * word of a `MaskedText`, say — the same duration off its own offset.
   */
  length?: number
}

/** Merges the tuning props into a style object, under whatever the caller set. */
function tune(style: React.CSSProperties | undefined, tuning: ScrubTuning, offset: number) {
  const vars: Record<string, string | number> = { ...style }
  if (offset) vars['--scrub-offset'] = offset
  if (tuning.travel) vars['--scrub-travel'] = tuning.travel
  if (tuning.depth) vars['--scrub-depth'] = tuning.depth
  if (tuning.fade) vars['--scrub-fade'] = tuning.fade
  if (tuning.grow) vars['--scrub-grow'] = tuning.grow
  if (tuning.span) vars['--scrub-span'] = tuning.span
  if (tuning.length) vars['--scrub-length'] = tuning.length
  return Object.keys(vars).length ? (vars as React.CSSProperties) : undefined
}

export interface ScrubProps extends ScrubTuning {
  /** Optional: a rule or a spacer that only needs the transform has no content. */
  children?: ReactNode
  /** One or more scrub preset classes — see the SCRUB section of index.css. */
  effect?: string
  window?: ScrubWindow
  /**
   * Shifts the effect within its window, 0 → 1. Gives a row of elements a
   * stagger that is a *distance* rather than a delay: at 0.08 each sibling
   * finishes arriving a little later up the screen, which is what makes a
   * staggered group read as one movement under a fast scroll instead of
   * unravelling into a queue.
   */
  offset?: number
  className?: string
  as?: ElementType
  /** Escape hatch for a bespoke window. Overrides `window`. */
  anchors?: Pick<ScrubOptions, 'start' | 'end'>
  reduced?: number
  /** Merged under the scrub's own custom properties, never over them. */
  style?: React.CSSProperties
}

export function Scrub({
  children,
  effect,
  window: windowName = 'enter',
  offset = 0,
  className,
  as: Tag = 'div',
  anchors,
  reduced,
  style,
  ...tuning
}: ScrubProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const range = anchors ?? WINDOWS[windowName]
    return observeScroll(node, { start: range.start, end: range.end, reduced })
  }, [windowName, anchors, reduced])

  return (
    <Tag ref={ref} className={cx('scrub', effect, className)} style={tune(style, tuning, offset)}>
      {children}
    </Tag>
  )
}

/**
 * A layer *inside* a scene, driven by the scene's progress rather than its own.
 *
 * Custom properties inherit, so a `StickyScene` writing `--p` once on its frame
 * hands the same number to every descendant for free. Each layer then picks its
 * own preset, its own travel and its own offset out of that one value — which
 * is exactly what §6's parallax needs, and it costs one registration for the
 * whole scene instead of one per element.
 *
 * Outside a scene this renders inert: no ancestor writes `--p`, the fallback of
 * 0 applies, and the element sits at the start of its effect forever. It is
 * only ever correct inside something that drives it.
 */
export function SceneLayer({
  children,
  effect,
  offset = 0,
  hidden,
  className,
  style,
  as: Tag = 'div',
  ...tuning
}: ScrubTuning & {
  children?: ReactNode
  effect?: string
  /** Marks the layer as scenery — `aria-hidden`, for washes and vignettes. */
  hidden?: boolean
  /**
   * Where in the scene this layer's own 0 → 1 begins. The scene's beat sheet:
   * give each layer a later offset and they sequence, rather than all running
   * across the full length of the pin together.
   */
  offset?: number
  className?: string
  /** Merged under the layer's own custom properties, never over them. */
  style?: React.CSSProperties
  as?: ElementType
}) {
  return (
    <Tag
      aria-hidden={hidden || undefined}
      className={cx('scrub', effect, className)}
      style={tune(style, tuning, offset)}
    >
      {children}
    </Tag>
  )
}
