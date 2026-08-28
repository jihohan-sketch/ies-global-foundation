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
export function ImpactLedger({ index = '04' }: { index?: string } = {}) {
  return (
    <section
      id="impact"
      aria-label="Impact snapshot"
      /*
       * ON PAPER, WHICH IS THE POINT OF THIS SECTION IN THE NEW ARRANGEMENT.
       *
       * The ledger is the one place on the home page where the reader is being
       * asked to *believe a number*, and belief is a different mode from the
       * cinema either side of it. A light slab in the middle of a dark page
       * does two things at once: it separates the claim from the atmosphere
       * around it, and it puts the figures on the ground that figures are
       * normally printed on. It is also, structurally, the moment the home
       * page stops being a film and becomes a document — which is exactly
       * where it belongs, between the photographs and the work.
       */
      data-ground="light"
      className="section-edge relative overflow-hidden bg-paper py-16 text-navy sm:py-20 lg:py-24"
    >
      <Container size="wide" className="relative">
        <GhostTitle>Scale</GhostTitle>

        <div className="relative z-10">
          <Scrub effect="scrub-rise">
            <SectionHeading
              index={index}
              eyebrow="Impact Snapshot"
              tone="dark"
              title="Scale, measured honestly."
            />
          </Scrub>

          <dl className="mt-12">
            {headlineStats.map((stat, i) => {
              const note = stat.note ?? noteFor.get(stat.label)
              return (
              <div key={stat.label} className="relative">
                <Scrub effect="scrub-rule" className="block h-px w-full bg-navy/16" />

                <div
                  className="flex flex-col gap-x-10 gap-y-3 py-6 lg:flex-row lg:items-baseline lg:py-7"
                  /* One step of indent per row. Capped by the array length in
                     practice — five rows at 1.6% is a 6.4% drift, which is a
                     diagonal you can feel and not one you have to measure.
                     Halved from 2.2%: the label column is now a fixed track
                     rather than a floated right edge, and an indent that moves
                     the figure without moving the label was pulling the two
                     halves of a row apart. */
                  style={{ paddingLeft: `${i * 1.6}%` }}
                >
                  {/* The figure. `scrub-figure` scales it into place from its
                      own baseline corner rather than translating it — see the
                      note on that preset in index.css.

                      NO LONGER `sheen`, AND THAT IS THE POINT OF THIS SECTION.

                      The sheen gradient runs from a dark warm stop through a
                      highlight and back down, which is beautiful on two
                      ceremonial words and actively destructive on a numeral:
                      the first and last digits of `736,000+` were landing at
                      roughly 3:1 against the ground while the middle sat at 9,
                      so the largest claim on the page had its ends dissolving.
                      A statistic has to be read, and a gradient that varies the
                      contrast across the glyphs is the opposite of readable.

                      Paper white at 500 instead, with the accent carried by the
                      suffix alone — the `+` and the label stay gold, so the
                      section keeps its colour without spending it on the part
                      that has to be legible. Weight is up from 300 to 500 for
                      the same reason it is everywhere else on the site. */}
                  <Scrub effect="scrub-figure" className="min-w-0 lg:shrink-0">
                    {/*
                      DOWN FROM 10vw / 8.5rem, AND THE REASON IS THE NEW HERO.
                      Four of these five figures are now on screen in the first
                      viewport, at the size a headline statistic wants. Printing
                      them again at 144px makes the ledger a louder repeat of
                      something the visitor has already been told, and it is not
                      what this section is for: the ledger's own contribution is
                      the *note* under each figure, which is the only place on
                      the page that says what is being counted. At 7vw the
                      numeral still leads the row and the sentence explaining it
                      is no longer a footnote to it — and five rows come down
                      from 202px each to about 150.
                    */}
                    <dd className="font-serif leading-[0.85] font-medium tracking-[-0.03em] text-navy [font-size:clamp(2.75rem,7vw,6rem)]">
                      <Counter stat={stat} suffixClassName="text-[var(--accent)]" />
                    </dd>
                  </Scrub>

                  {/*
                   * The label column, left-aligned on a fixed track.
                   *
                   * It used to be right-aligned against the viewport edge,
                   * which put five labels on a ragged left edge a long way from
                   * the figures they belonged to — on a wide monitor the label
                   * for `3` sat some 900px from the numeral. Reading a ledger
                   * means pairing a figure with its name, and the pairing was
                   * being made harder by the layout that existed to present it.
                   *
                   * So the label simply follows the figure on the baseline, and
                   * the labels do *not* line up in a column. That is deliberate:
                   * a fixed label track would reintroduce the same gap for `3`
                   * that it closes for `736,000+`, and the rows are already
                   * indented on a diagonal, so there was no column to preserve.
                   * Proximity is what makes a pair read as a pair.
                   */}
                  <Scrub effect="scrub-rise" offset={0.08} className="min-w-0 lg:pb-3">
                    <dt className="text-label font-semibold text-[var(--accent)] uppercase">
                      {stat.label}
                    </dt>
                    {note && (
                      <p className="mt-2.5 max-w-[34ch] text-sm leading-relaxed text-navy-600">
                        {note}
                      </p>
                    )}
                  </Scrub>
                </div>
              </div>
              )
            })}
            <Scrub effect="scrub-rule" className="block h-px w-full bg-navy/16" />
          </dl>

          <Scrub effect="scrub-rise" offset={0.1}>
            <p className="mt-10 max-w-3xl text-xs leading-relaxed text-navy-600">
              {site.statisticsNote}{' '}
              <Link
                to="/impact"
                className="text-navy underline underline-offset-4 transition-colors hover:text-[var(--accent)]"
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
