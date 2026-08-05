import { useEffect, useRef, type ReactNode } from 'react'
import { cx } from '@/lib/utils'

/*
 * A section that pins to the viewport while its contents pan sideways, driven
 * by how far the page has scrolled through it. Scroll down, move right.
 *
 * This is NOT scroll-jacking. The wheel keeps its normal speed and direction
 * and the scrollbar keeps its normal meaning — the page scrolls exactly as far
 * as the section is tall. All that changes is what is painted while passing
 * through it. Nothing is captured, and stopping mid-way leaves the panel
 * wherever the scroll position says it should be.
 *
 * Height is derived from the panel count so the pan distance and the scroll
 * distance always agree: each panel gets its share of scroll to cross.
 *
 * Everything below is built around one rule: a scroll frame must not read
 * layout and must not re-render. The offset used to live in React state, which
 * meant every frame reconciled three full-screen panels; the frame also called
 * `getBoundingClientRect()` and `scrollWidth` after writing a transform, which
 * forces the browser to redo layout it had just done. Both are gone — the
 * geometry is measured only when it can actually change, and a frame does
 * nothing but arithmetic and one transform write.
 */
export function PinnedPan({
  children,
  label,
  className,
  vhPerPanel = 120,
}: {
  children: ReactNode[]
  /** Names the section for assistive tech. */
  label: string
  className?: string
  /**
   * Viewport heights of scrolling spent crossing each panel — the pan's speed
   * dial. Higher is slower: the horizontal travel is fixed by the track width,
   * so stretching the scroll distance stretches the time it takes to cross.
   *
   * This is the one knob that trades directly against page length. At 120 the
   * three values cost under four screens of scroll and the panel keeps pace
   * with the wheel; at 260 they cost eight and the section reads as stuck,
   * since two turns of the wheel buy one screen of movement.
   */
  vhPerPanel?: number
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    let frame = 0
    /** Geometry, in document coordinates. Refreshed only on layout changes. */
    let top = 0
    let travel = 0
    let distance = 0
    let applied = -1

    const measure = () => {
      top = wrap.getBoundingClientRect().top + window.scrollY
      travel = wrap.offsetHeight - window.innerHeight
      distance = Math.max(0, track.scrollWidth - window.innerWidth)
    }

    const update = () => {
      frame = 0
      if (distance <= 0 || travel <= 0) {
        track.style.transform = 'translate3d(0px, 0, 0)'
        return
      }
      // 0 when the top of the section reaches the top of the viewport, 1 when
      // its bottom does. Clamped so the track parks at both ends instead of
      // overshooting while the section is off screen.
      const progress = Math.min(1, Math.max(0, (window.scrollY - top) / travel))
      const offset = Math.round(progress * distance)
      // Nothing moved: skip the write rather than dirtying a composited layer.
      if (offset === applied) return
      applied = offset
      track.style.transform = `translate3d(${-offset}px, 0, 0)`
    }

    // rAF-coalesced: scroll fires far more often than the screen refreshes, and
    // writing a transform per event is how this kind of section starts to jank.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const onResize = () => {
      measure()
      applied = -1
      onScroll()
    }

    measure()
    update()

    /*
     * A resize is not the only thing that moves this section. Images and web
     * fonts landing above it shift its top, and the reveal animations on the
     * way down change the height of what precedes it — so watch the box itself
     * rather than trusting the numbers taken at mount.
     */
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(wrap)
    resizeObserver.observe(document.documentElement)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [children.length])

  return (
    <section
      ref={wrapRef}
      aria-label={label}
      className={cx('relative', className)}
      /* Plus 30vh of run-out so the last panel can be read before the section
         releases, rather than sliding away as it lands. */
      style={{ height: `${children.length * vhPerPanel + 30}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ transform: 'translate3d(0px, 0, 0)' }}
        >
          {children}
        </div>
      </div>
    </section>
  )
}
