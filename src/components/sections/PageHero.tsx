import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Container, Eyebrow } from '@/components/ui/Primitives'
import { GhostTitle } from '@/components/ui/Cinematic'
import { Reveal } from '@/components/ui/Reveal'
import { MaskedText } from '@/components/ui/MaskedText'
import { Scrub } from '@/components/ui/Scrub'

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
    /*
     * THE PAGE HEADING AS A FULL OPENING SHOT.
     *
     * It was a padded band with an eyebrow, an h1 and a lead stacked in the
     * top-left corner — correct, and completely flat. Three changes make it an
     * opening rather than a label:
     *
     *   · It is taller, and the type is set at the display step rather than
     *     the h1 step. A page's own title is the one piece of type on it that
     *     nothing else has to compete with.
     *   · The lead is *offset* into the second column rather than sitting
     *     under the title. A statement that runs edge to edge and an
     *     explanation that starts at the same left margin read as one block of
     *     text; separating them is what makes the pair read as headline and
     *     standfirst.
     *   · The title assembles word by word through `MaskedText` instead of
     *     fading in as a block, which ties the arrival to the scroll rather
     *     than to a timer.
     *
     * `overflow-hidden` is safe here — there is no sticky child anywhere in
     * this subtree. See the note in HorizontalStory for where it is not.
     */
    <section className="relative overflow-hidden pt-44 pb-24 sm:pt-52 sm:pb-32">
      {/* Sits against the section rather than the container, so it can run past
          the text column's left edge and be cropped by the viewport. */}
      {ghost && <GhostTitle className="!top-32 left-6 sm:left-8">{ghost}</GhostTitle>}

      <Container size="wide" className="relative z-10">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="text-label-sm flex flex-wrap items-center gap-2 font-semibold text-slate uppercase">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link to={crumb.href} className="transition-colors hover:text-[var(--accent)]">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-mist">{crumb.label}</span>
                  )}
                  {i < crumbs.length - 1 && (
                    <span aria-hidden className="text-slate/50">
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
        </Reveal>

        {/*
         * `MaskedText` only when the title is a plain string. A `ReactNode`
         * title — one carrying a `<span>` or a line break the caller has
         * placed — cannot be split into words, and forcing it through the
         * splitter would flatten the caller's markup. The fallback is the
         * same type at the same size, arriving as one block.
         */}
        {typeof title === 'string' ? (
          <MaskedText
            as="h1"
            className="text-h1 mt-9 max-w-[15ch] text-paper"
            text={title}
            lift="0.9em"
          />
        ) : (
          <Reveal delay={80}>
            <h1 className="text-h1 mt-9 max-w-[15ch] text-paper">{title}</h1>
          </Reveal>
        )}

        {/* The standfirst, offset into the right-hand half. On a phone the
            offset collapses and it simply follows the title. */}
        {(lead || meta || children) && (
          <div className="mt-14 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div aria-hidden className="hidden lg:block">
              {/* A hairline in the empty column, so the offset reads as a
                  deliberate spread rather than as a missing element. */}
              <Scrub effect="scrub-rule" className="mt-4 block h-px w-full bg-[var(--accent)]/45" />
            </div>
            <div className="min-w-0">
              {lead && <div className="text-lead measure-lead text-mist">{lead}</div>}
              {meta && <div className="mt-9">{meta}</div>}
              {children && <div className="mt-10">{children}</div>}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
