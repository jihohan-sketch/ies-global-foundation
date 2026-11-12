import type { ReactNode } from 'react'
import { cx } from '@/lib/utils'

/**
 * A home-page section. `tabIndex={-1}` lets the header's anchor links move
 * keyboard focus here after scrolling.
 */
export function Section({
  id,
  labelledBy,
  tone = 'paper',
  children,
}: {
  id: string
  labelledBy: string
  tone?: 'paper' | 'bone'
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      tabIndex={-1}
      className={cx('border-t py-20 md:py-28', tone === 'bone' ? 'bg-bone' : 'bg-paper')}
    >
      <div className="container-page">{children}</div>
    </section>
  )
}

export function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="text-h2 text-navy">
      {children}
    </h2>
  )
}
