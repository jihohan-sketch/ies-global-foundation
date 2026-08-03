import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { cx } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  /** Stagger in milliseconds. */
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
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  )
}
