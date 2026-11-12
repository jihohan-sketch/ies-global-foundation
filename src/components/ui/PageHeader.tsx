import type { ReactNode } from 'react'

/** Title block for the secondary pages (contact, policies, 404). */
export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="container-page pt-16 pb-10 md:pt-24">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="text-display mt-4 max-w-[18ch] text-navy">{title}</h1>
      {children && <div className="text-lead mt-6 max-w-[42rem] text-ink-soft">{children}</div>}
    </div>
  )
}
