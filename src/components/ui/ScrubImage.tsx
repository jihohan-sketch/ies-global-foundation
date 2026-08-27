import { useCallback, useState } from 'react'
import { Scrub, SceneLayer } from '@/components/ui/Scrub'
import { cx } from '@/lib/utils'
import { image, SIZES } from '@/lib/images'

/*
 * A photograph that arrives as a shot rather than as a `<img>`.
 *
 * Two moves, tied to the same scroll progress and running against each other:
 * the frame opens upward from its bottom edge, and the picture inside settles
 * out of a slight oversize. Because the picture is still moving while the frame
 * is still opening, the eye reads depth — the image looks like it is *behind* an
 * aperture rather than like a box growing. Running either one alone reads as a
 * wipe.
 *
 * ---------------------------------------------------------------------------
 * THREE ELEMENTS, THREE JOBS, NO COLLISIONS
 *
 * An element has one `transform` and one `clip-path`, and this needs three
 * things that would all want to own them:
 *
 *   frame  — `clip-path`, scrubbed. The aperture.
 *   sheath — `opacity` and `filter`, transitioned once on load. The arrival of
 *            the file itself, which has nothing to do with scroll position.
 *   img    — `transform`, scrubbed. The settle.
 *
 * Collapsing any two of these into one element means a load transition fighting
 * a scroll frame for the same property, sixty times a second. They stay apart.
 */
export function ScrubImage({
  src,
  alt,
  aspectRatio = '4 / 3',
  eager = false,
  effect = 'scrub-mask',
  fill = false,
  className,
  imageClassName,
  offset,
  /**
   * Where the progress comes from.
   *
   * `self` registers the frame with the scroll engine and runs off its own
   * crossing of the viewport — the right answer for an image sitting in an
   * ordinary vertical section.
   *
   * `scene` reads the `--p` of the pinned scene or panel it sits inside
   * instead, and registers nothing. Inside a `PinnedScene` this is what ties an
   * image to its own panel's crossing rather than to a vertical position it
   * never really has.
   */
  driven = 'self',
  /** Softens the settle. `subtle` halves the travel for a supporting image. */
  weight = 'full',
}: {
  src: string
  alt: string
  /** Ignored when `fill` is set — a filled frame takes its size from its parent. */
  aspectRatio?: string
  eager?: boolean
  /**
   * The frame's own scrub preset. `scrub-mask` — the aperture opening — is
   * right for an image arriving in a vertical section. A filled panel
   * background usually wants none, with the movement supplied by a parallax
   * layer around it instead; pass `undefined` for that.
   */
  effect?: string
  /**
   * Fill the positioned parent instead of holding an aspect ratio: no border,
   * no reserved box, no aperture. For a photograph used as the ground of a
   * panel rather than as an object on the page.
   */
  fill?: boolean
  className?: string
  imageClassName?: string
  offset?: number
  driven?: 'self' | 'scene'
  weight?: 'full' | 'subtle'
}) {
  const [loaded, setLoaded] = useState(false)

  /* Covers the case the `onLoad` below cannot: an image already in cache is
     complete before React attaches the handler, and would otherwise sit at
     opacity 0 forever. */
  const attach = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete) setLoaded(true)
  }, [])

  const Frame = driven === 'self' ? Scrub : SceneLayer

  return (
    <Frame
      as="span"
      effect={effect}
      offset={offset}
      style={fill ? undefined : { aspectRatio }}
      className={cx(
        'block overflow-hidden',
        fill ? 'absolute inset-0 h-full w-full' : 'relative border border-mist/15 bg-navy-700/40',
        /* A slow breath on the empty frame while the photograph is on its way,
           so a not-yet-arrived image reads as coming rather than as failed. */
        !loaded && 'animate-[ies-placeholder_1.8s_ease-in-out_infinite]',
        className,
      )}
    >
      <span
        className={cx(
          'block h-full w-full transition-[opacity,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
          loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-[6px]',
        )}
      >
        <img
          ref={attach}
          {...image(src)}
          sizes={SIZES.full}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          /* Also settle on error, so a broken path shows its alt text rather
             than an invisible box that looks like a layout bug. */
          onError={() => setLoaded(true)}
          className={cx('scrub scrub-zoom h-full w-full object-cover', imageClassName)}
          style={weight === 'subtle' ? ({ '--scrub-grow': 0.04 } as React.CSSProperties) : undefined}
        />
      </span>
    </Frame>
  )
}
