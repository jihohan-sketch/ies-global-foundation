import { useEffect, useRef, useState, type ReactNode } from 'react'
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
 * distance always agree: each panel gets one viewport of scroll to cross.
 */
export function PinnedPan({
  children,
  label,
  className,
}: {
  children: ReactNode[]
  /** Names the section for assistive tech. */
  label: string
  className?: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = wrap.getBoundingClientRect()
      const distance = track.scrollWidth - window.innerWidth
      if (distance <= 0) {
        setOffset(0)
        return
      }
      // 0 when the top of the section reaches the top of the viewport, 1 when
      // its bottom does. Clamped so the track parks at both ends instead of
      // overshooting while the section is off screen.
      const travel = rect.height - window.innerHeight
      const progress = travel <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / travel))
      setOffset(progress * distance)
    }

    // rAF-coalesced: scroll fires far more often than the screen refreshes, and
    // writing a transform per event is how this kind of section starts to jank.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [children.length])

  return (
    <section
      ref={wrapRef}
      aria-label={label}
      className={cx('relative', className)}
      /* One viewport of scroll per panel, plus one to read the last one. */
      style={{ height: `${(children.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ transform: `translate3d(${-offset}px, 0, 0)` }}
        >
          {children}
        </div>
      </div>
    </section>
  )
}
