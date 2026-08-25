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

export interface ScrubProps {
  children: ReactNode
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
}: ScrubProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const range = anchors ?? WINDOWS[windowName]
    return observeScroll(node, { start: range.start, end: range.end, reduced })
  }, [windowName, anchors, reduced])

  return (
    <Tag
      ref={ref}
      className={cx('scrub', effect, className)}
      style={offset ? { ...style, '--scrub-offset': offset } : style}
    >
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
  travel,
  depth,
  fade,
  grow,
  hidden,
  className,
  style,
  as: Tag = 'div',
}: {
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
  /** `--scrub-travel` — how far the translate presets move. */
  travel?: string
  /** `--scrub-depth` — the layer's parallax depth. Small is far away. */
  depth?: string
  /** `--scrub-fade` — the share of `scrub-dissolve`'s window spent leaving. */
  fade?: number
  /** `--scrub-grow` — the scale delta for `scrub-open` / `scrub-expand`. */
  grow?: number
  className?: string
  /** Merged under the layer's own custom properties, never over them. */
  style?: React.CSSProperties
  as?: ElementType
}) {
  const vars: Record<string, string | number> = { ...style }
  if (offset) vars['--scrub-offset'] = offset
  if (travel) vars['--scrub-travel'] = travel
  if (depth) vars['--scrub-depth'] = depth
  if (fade) vars['--scrub-fade'] = fade
  if (grow) vars['--scrub-grow'] = grow

  return (
    <Tag
      aria-hidden={hidden || undefined}
      className={cx('scrub', effect, className)}
      style={Object.keys(vars).length ? (vars as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
