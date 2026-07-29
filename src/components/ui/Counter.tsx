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
    const duration = 1700

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          // easeOutQuint — fast start, long settle
          const eased = 1 - Math.pow(1 - progress, 5)
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
      <span className="tabular-nums">{formatNumber(display)}</span>
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
          tone === 'dark' ? 'text-gold' : 'text-navy-600'
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
