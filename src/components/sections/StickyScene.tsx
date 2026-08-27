import { useEffect, useRef, type ReactNode } from 'react'
import { PINNED, observeScroll } from '@/lib/scroll'
import { cx } from '@/lib/utils'

/*
 * A section that holds the viewport while the page scrolls through it.
 *
 * The section is tall; the frame inside it is one screen and sticks. So the
 * picture stays still while the scrollbar keeps its ordinary meaning — the page
 * scrolls exactly as far as the section is tall, nothing is captured, and
 * stopping halfway leaves the scene wherever the scroll position says. This is
 * not scroll-jacking, and the distinction is worth keeping: the wheel is never
 * intercepted, only *interpreted*.
 *
 * One registration drives the whole scene. `--p` is written on the frame, and
 * custom properties inherit, so every `SceneLayer` below it reads the same
 * number and takes its own slice of it. A scene with fifteen moving parts costs
 * the engine one entry.
 *
 * ---------------------------------------------------------------------------
 * REDUCED MOTION
 *
 * This runs for everyone, including visitors with
 * `prefers-reduced-motion: reduce`. It used to collapse the pin and the extra
 * height there, which meant the hero and the mission — the two scenes the page
 * is built around — were replaced by static blocks for anyone with the setting
 * on, and the site they saw was a different and much plainer one.
 *
 * The frame publishes `data-motion-always`, which the reduced-motion block in
 * index.css reads to keep this subtree's scrub values live, and the scroll
 * registration below is marked `always` so the engine keeps writing progress
 * rather than parking it. Both halves are needed: without the second the frame
 * is handed a resting `--p` of 1 and every layer in the scene renders at its
 * *end* state for the whole pin, which looks like a bug rather than a choice.
 *
 * It is the site owner's decision, and the same one already taken for the
 * `.reveal` entrances, for `ScrollRail`'s drift, and for `PinnedScene`. Nothing
 * here plays on a timer: the wheel is the timeline, the visitor drives it at
 * their own speed, and stopping stops it.
 */
export function StickyScene({
  children,
  /**
   * Section height in viewport heights. The scroll budget for the scene, and
   * the one knob that trades directly against page length.
   *
   * 100 is no pin at all — the frame releases the moment it lands. 180 gives
   * most of a screen of held time, which is about the least that reads as
   * deliberate. Past ~260 a visitor starts to wonder whether the page has
   * stopped responding.
   */
  vh = 180,
  className,
  frameClassName,
  id,
  label,
  pastAt = 0.5,
}: {
  children: ReactNode
  vh?: number
  className?: string
  /** Classes for the one-screen frame that actually pins. */
  frameClassName?: string
  id?: string
  /** Names the scene for assistive tech. */
  label?: string
  /**
   * Progress past which the scene counts as having moved on, published to the
   * DOM as `data-scene-past` on the frame.
   *
   * This exists for one reason, and it is a correctness one rather than a
   * decorative one. A layer that has dissolved to `opacity: 0` is *still there*
   * — still clickable, still in the tab order — so a hero whose buttons have
   * faded leaves two invisible targets sitting over a draggable globe and two
   * stops for anyone tabbing through the page. Layers carrying `scene-exit`
   * are taken out of both once this flips. See the SCROLL SCRUB section of
   * index.css.
   */
  pastAt?: number
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const frame = frameRef.current
    if (!section || !frame) return

    // Measured on the tall section, written onto the frame: the section is what
    // has the scroll distance, the frame is what the content hangs off.
    return observeScroll(section, {
      ...PINNED,
      target: frame,
      /* See the note on reduced motion at the top of this file. */
      always: true,
      onProgress: (p) => {
        /* A discrete flip, not a per-frame write. `toggleAttribute` with an
           explicit second argument is a no-op when the state already matches,
           so this costs nothing on the frames either side of the crossing. */
        frame.toggleAttribute('data-scene-past', p >= pastAt)
      },
    })
  }, [pastAt])

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-label={label}
      className={cx('relative', className)}
      style={{ height: `${vh}vh` }}
    >
      <div
        ref={frameRef}
        /* `data-motion-always` — see the note at the top of this file and the
           reduced-motion block in index.css. It is what keeps every `.scrub`
           below this point reading live progress. */
        data-motion-always
        className={cx(
          'relative flex w-full flex-col justify-center overflow-hidden sticky top-0 h-dvh',
          frameClassName,
        )}
      >
        {children}
      </div>
    </section>
  )
}
