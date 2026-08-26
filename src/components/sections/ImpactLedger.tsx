import { Link } from 'react-router-dom'
import { Scrub } from '@/components/ui/Scrub'
import { Counter } from '@/components/ui/Counter'
import { GhostTitle } from '@/components/ui/Cinematic'
import { Container, SectionHeading } from '@/components/ui/Primitives'
import { headlineStats, impactStats } from '@/content/impact'
import { site } from '@/content/site'

/*
 * The notes belong to the fuller breakdown on the Impact page, and the home
 * page shows the headline set — but they are the same figures under the same
 * labels, so a row here can borrow the sentence that explains it rather than
 * having a new one written for it. Matched on the label, which is the only
 * thing the two lists share, and absent is a perfectly good answer: a figure
 * with no note simply shows its label.
 *
 * Nothing is composed here. Every string still comes out of `impact.ts`, which
 * is the one reviewed source for anything numeric on this site.
 */
const noteFor = new Map(
  impactStats.filter((stat) => stat.note).map((stat) => [stat.label, stat.note]),
)

/*
 * THE FIGURES, AT THE SIZE THEY DESERVE.
 *
 * These were a five-up grid of 2rem numerals — the same size as a subheading,
 * in a layout that made `736,000+` and `3` look like equally weighted cells in
 * a table. They are the most concrete claim on the page and they were the
 * quietest thing on it.
 *
 * Here each figure gets a full-width row and display type: the numeral runs to
 * 11vw, the label sits beside it in tracked capitals, and the note explains
 * itself underneath. Nothing is boxed. The rule above each row draws itself in
 * from the left as the row arrives, so the ledger builds downward line by line
 * rather than landing as a block.
 *
 * ---------------------------------------------------------------------------
 * TWO THINGS THAT ARE NOT COSMETIC
 *
 * The counters are unchanged — `Counter` already counts up once when the figure
 * reaches the viewport, and reusing it means there is still exactly one
 * implementation of "a number that arrives" on the site.
 *
 * And the row indents progressively, one step per figure. That is what keeps a
 * column of five oversized numerals from reading as a receipt: the eye is given
 * a diagonal to travel rather than a stack to total. It is also why the largest
 * figure is not sorted to the top — the order is the order in `impact.ts`,
 * which is the order the organisation itself uses, and re-ranking a foundation's
 * own figures by size is an editorial claim nobody asked for.
 */
export function ImpactLedger() {
  return (
    <section
      id="impact"
      aria-label="Impact snapshot"
      className="relative overflow-hidden border-y border-mist/12 bg-navy-700 py-16 sm:py-20 lg:py-24"
    >
      <Container size="wide" className="relative">
        <GhostTitle className="-top-24">Scale</GhostTitle>

        <div className="relative z-10">
          <Scrub effect="scrub-rise">
            <SectionHeading
              index="04"
              eyebrow="Impact Snapshot"
              title="Scale, measured honestly."
            />
          </Scrub>

          <dl className="mt-16">
            {headlineStats.map((stat, i) => {
              const note = stat.note ?? noteFor.get(stat.label)
              return (
              <div key={stat.label} className="relative">
                <Scrub effect="scrub-rule" className="block h-px w-full bg-mist/18" />

                <div
                  className="flex flex-col gap-x-12 gap-y-3 py-8 sm:flex-row sm:items-baseline sm:justify-between lg:py-10"
                  /* One step of indent per row. Capped by the array length in
                     practice — five rows at 2.2% is an 8.8% drift, which is a
                     diagonal you can feel and not one you have to measure. */
                  style={{ paddingLeft: `${i * 2.2}%` }}
                >
                  {/* The figure. `scrub-figure` scales it into place from its
                      own baseline corner rather than translating it — see the
                      note on that preset in index.css. */}
                  <Scrub effect="scrub-figure" className="min-w-0">
                    <dd className="metal font-serif leading-[0.82] font-light tracking-[-0.035em] [font-size:clamp(3.25rem,11vw,9.5rem)]">
                      <Counter stat={stat} />
                    </dd>
                  </Scrub>

                  <Scrub
                    effect="scrub-converge"
                    offset={0.08}
                    span="4vw"
                    className="sm:max-w-md sm:text-right"
                  >
                    <dt className="text-[0.6875rem] font-medium tracking-[0.3em] text-paper uppercase">
                      {stat.label}
                    </dt>
                    {note && (
                      <p className="mt-3 text-sm leading-relaxed font-light text-mist/80">
                        {note}
                      </p>
                    )}
                  </Scrub>
                </div>
              </div>
              )
            })}
            <Scrub effect="scrub-rule" className="block h-px w-full bg-mist/18" />
          </dl>

          <Scrub effect="scrub-rise" offset={0.1}>
            <p className="mt-10 max-w-3xl text-xs leading-relaxed font-light text-mist/80">
              {site.statisticsNote}{' '}
              <Link
                to="/impact"
                className="text-paper underline underline-offset-4 transition-colors hover:text-[var(--accent)]"
              >
                See the full impact report
              </Link>
              .
            </p>
          </Scrub>
        </div>
      </Container>
    </section>
  )
}
