import { useEffect, useRef, useState } from 'react'
import { formatNumber, prefersReducedMotion } from '@/lib/utils'
import type { Stat } from '@/content/types'

/**
 * Counts up once, when the figure scrolls into view. Large figures are shown
 * in full (736,000) rather than abbreviated — the number is the point.
 */
export function Counter({ stat, className }: { stat: Stat; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(prefersReducedMotion() ? stat.value : 0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplay(stat.value)
      return
    }

    const node = ref.current
    if (!node || !('IntersectionObserver' in window)) {
      setDisplay(stat.value)
      return
    }

    let frame = 0

    /*
     * Long enough to actually be a count.
     *
     * This was 1700ms on an easeOutQuint, and the pairing was the problem: a
     * fifth-power ease-out is 97% done in its first 500ms, so the figure
     * effectively jumped to its value and then spent 1.2s creeping through the
     * last 3% where the digits no longer change. It read as a static number,
     * which is the one thing a counter must not do.
     */
    const duration = 2600

    const observer = new IntersectionObserver(
      ([entry]) => {
        /*
         * `top < 0` alongside the intersection test: an element the viewport
         * jumped clean over — an anchor link, a restored scroll position, the
         * End key — never intersects and never would again, which used to
         * leave the figure reading 0 permanently. Landing past it means the
         * count is moot, so it takes its value without animating.
         */
        if (!entry.isIntersecting) {
          if (entry.boundingClientRect.top < 0) {
            observer.disconnect()
            setDisplay(stat.value)
          }
          return
        }
        observer.disconnect()

        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          /*
           * easeInOutSine — eases off both ends and is very nearly linear
           * through the middle, so the digits climb at a steady readable rate
           * instead of front-loading. A counter is one of the few things that
           * wants a near-linear curve: the middle of the animation is the part
           * that carries the information.
           */
          const eased = -(Math.cos(Math.PI * progress) - 1) / 2
          setDisplay(stat.value * eased)
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [stat.value])

  return (
    <span ref={ref} className={className}>
      {stat.prefix}
      {/* `lining-nums` alongside `tabular-nums`: Tailwind's numeric utilities compose
          into one `font-variant-numeric`, and a class beats the zero-specificity
          `:where()` base rule that gives the rest of the serif its lining figures.
          Without it a counter would slide back to Cormorant's old-style digits. */}
      <span className="tabular-nums lining-nums">{formatNumber(display)}</span>
      {stat.suffix}
    </span>
  )
}

export function StatBlock({
  stat,
  tone = 'dark',
}: {
  stat: Stat
  tone?: 'dark' | 'light'
}) {
  return (
    <div className="flex flex-col">
      <Counter
        stat={stat}
        className={`text-h2 font-serif ${tone === 'dark' ? 'text-paper' : 'text-navy'}`}
      />
      <span
        className={`mt-3 text-[0.8125rem] font-medium tracking-[0.14em] uppercase ${
          tone === 'dark' ? 'text-[var(--accent)]' : 'text-navy-600'
        }`}
      >
        {stat.label}
      </span>
      {stat.note && (
        <span
          className={`mt-2 text-sm font-light ${tone === 'dark' ? 'text-mist/75' : 'text-navy-700/65'}`}
        >
          {stat.note}
        </span>
      )}
    </div>
  )
}
