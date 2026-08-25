import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { cx } from '@/lib/utils'

/**
 * Ceiling on the stagger, in milliseconds.
 *
 * Callers pass `delay={i * 120}`, which is the natural way to write a stagger
 * and is unbounded by construction: the eleventh card in a grid asked for
 * 1.2 seconds of delay before a fade that itself takes over a second, so the
 * back half of a long list sat invisible for two and a half seconds after
 * scrolling to it. Nobody wrote that intending it — it is what `i * 120` means
 * once `i` gets large, and it is invisible at the call site.
 *
 * Capping here rather than at each call site makes it an invariant of the
 * component: a stagger is a *shape*, and past about a third of a second the
 * shape is established and the remaining entries are only being kept waiting.
 */
const MAX_DELAY_MS = 360

interface RevealProps {
  children: ReactNode
  /** Stagger in milliseconds. Clamped to `MAX_DELAY_MS` — see above. */
  delay?: number
  /** Where the element travels in from. Defaults to a rise from below. */
  from?: 'bottom' | 'left' | 'right'
  className?: string
  as?: ElementType
}

/**
 * Fade-and-travel on first scroll into view, once per element.
 *
 * Note that this intentionally still runs under `prefers-reduced-motion` — see
 * the carve-out in index.css for why, and for how to undo it.
 */
export function Reveal({
  children,
  delay = 0,
  from = 'bottom',
  className,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={cx('reveal', className)}
      data-visible={visible}
      data-from={from === 'bottom' ? undefined : from}
      style={{ '--reveal-delay': `${Math.min(delay, MAX_DELAY_MS)}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  )
}
