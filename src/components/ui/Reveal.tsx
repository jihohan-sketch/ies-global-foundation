import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { cx } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  /** Stagger in milliseconds. */
  delay?: number
  className?: string
  as?: ElementType
}

/**
 * Gentle fade-and-rise on first scroll into view. Disabled automatically by the
 * `prefers-reduced-motion` rule in index.css, which also makes content visible.
 */
export function Reveal({ children, delay = 0, className, as: Tag = 'div' }: RevealProps) {
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
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  )
}
