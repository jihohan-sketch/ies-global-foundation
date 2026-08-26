import { Link } from 'react-router-dom'
import { Container, Section, SectionHeading } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { namedPartners } from '@/content/partners'

/**
 * The organizations IES has actually worked with, named on the home page.
 *
 * These names already existed on the Partners page, three sections down and
 * inside a horizontal scroll rail — which is to say they were being kept rather
 * than used. A visitor deciding whether a student organization is serious wants
 * to know who vouches for it, and that answer belongs on the first page.
 *
 * Two constraints carried over from `partners.ts`, and they are not cosmetic:
 *
 *   1. Every name here is drawn from that file, which is the single reviewed
 *      list. Nothing is added at the component level — a name on a home page is
 *      a public claim about another organization.
 *   2. The disclaimer travels with the names. Listing a collaboration is not a
 *      claim of endorsement, and the sentence saying so has to appear wherever
 *      the names do, not only on the page they came from.
 */

/** Flattened once at module scope — the source list is static. */
const organizations = namedPartners.flatMap((group) =>
  group.organizations.map((name) => ({ name, group: group.group })),
)

export function NamedPartners({ id }: { id?: string }) {
  return (
    <Section id={id} tone="deep" className="overflow-hidden border-y border-mist/12">
      <Container size="wide">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Organizations We Work With"
            ghost="Partners"
            title={`${organizations.length} institutions, named.`}
            lead="Community organizations, academic institutions, and public bodies that IES has worked alongside — not a logo wall, a record."
          />
        </Reveal>

        {/*
         * A numbered list rather than a scrolling marquee. A marquee asks to be
         * watched; a list this length asks to be read, and the names are the
         * entire point of the section. Two columns from `md` up, filling down
         * each column rather than across — `columns` keeps the numbering in
         * reading order without a second array.
         */}
        <ol className="mt-14 md:columns-2 md:gap-x-16">
          {organizations.map((organization, i) => (
            <li key={organization.name} className="break-inside-avoid">
              <Reveal delay={Math.min(i, 8) * 60}>
                <div className="flex items-baseline gap-5 border-t border-mist/12 py-5">
                  <span
                    aria-hidden
                    className="w-7 shrink-0 font-serif text-sm text-[var(--accent)]/70"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-[1.0625rem] leading-snug text-paper/90">
                      {organization.name}
                    </span>
                    <span className="mt-1.5 block text-[0.5625rem] font-medium tracking-[0.28em] text-mist/70 uppercase">
                      {organization.group}
                    </span>
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={200}>
          <p className="mt-12 max-w-3xl border-t border-mist/15 pt-6 text-xs leading-relaxed font-light text-mist/80">
            Naming an organization here records a collaboration; it does not imply that
            organization endorses IES or its positions.{' '}
            <Link
              to="/partners"
              className="text-paper underline underline-offset-4 hover:text-[var(--accent)]"
            >
              See how partnerships work
            </Link>
            .
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
