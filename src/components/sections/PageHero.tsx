import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Container, Eyebrow } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'

interface Crumb {
  label: string
  href?: string
}

/** Standard interior-page masthead. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  meta,
  children,
}: {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  crumbs?: Crumb[]
  meta?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="relative border-b border-mist/12 pt-40 pb-20 sm:pt-48 sm:pb-24">
      <Container size="wide" className="relative">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-light text-mist">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link
                      to={crumb.href}
                      className="transition-colors hover:text-[var(--accent)]"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-paper/70">{crumb.label}</span>
                  )}
                  {i < crumbs.length - 1 && (
                    <span aria-hidden className="text-mist/40">
                      /
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-h1 mt-7 max-w-4xl">{title}</h1>
          {lead && (
            <div className="text-lead mt-8 max-w-2xl font-light text-mist">{lead}</div>
          )}
          {meta && <div className="mt-8">{meta}</div>}
          {children && <div className="mt-10">{children}</div>}
        </Reveal>
      </Container>
    </section>
  )
}
