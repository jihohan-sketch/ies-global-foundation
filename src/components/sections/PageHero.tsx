import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Container, Eyebrow } from '@/components/ui/Primitives'
import { GhostTitle } from '@/components/ui/Cinematic'
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
  ghost,
  crumbs,
  meta,
  children,
}: {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  /**
   * One word, set at display scale behind the masthead as texture. Decorative
   * and `aria-hidden` — see `GhostTitle`. Keep it to a single word: the ghost
   * never wraps, so anything longer runs off the viewport on a phone.
   *
   * Deliberately not derived from `eyebrow`. Several eyebrows are phrases
   * ("News & Updates", "National Branch · Korea") that make poor ghosts, and a
   * page's texture word is an editorial choice rather than a transformation.
   */
  ghost?: string
  crumbs?: Crumb[]
  meta?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-mist/12 pt-40 pb-20 sm:pt-48 sm:pb-24">
      {/* Sits against the section rather than the container, so it can run past
          the text column's left edge and be cropped by the viewport. */}
      {ghost && (
        <GhostTitle className="top-28 left-6 sm:left-8" >
          {ghost}
        </GhostTitle>
      )}
      <Container size="wide" className="relative z-10">
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
