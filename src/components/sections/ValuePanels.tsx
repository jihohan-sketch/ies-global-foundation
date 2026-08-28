import { Container, Section, SectionHeading } from '@/components/ui/Primitives'
import { Scrub } from '@/components/ui/Scrub'
import { threeAs } from '@/content/site'

/* ==========================================================================
   THE THREE A'S
   ==========================================================================

   FROM THREE PINNED SCREENS TO ONE, AND THE ARGUMENT IS ABOUT WHAT THE PAN IS
   FOR RATHER THAN ABOUT SAVING PIXELS.

   This was a `PinnedScene`: three viewport-sized panels travelling sideways,
   2,407px of scroll — three full screens of wheel — to deliver three sentences.
   That is the worst content-to-distance ratio on the page, and it was the
   *third* horizontal pan a visitor met, after the branches and the five areas
   of work. By the third repetition the device has stopped saying "these are
   distinct places, look at them one at a time" and started saying "this page is
   long".

   The pan earns its cost when the panels are things you compare *in sequence*
   and each has enough in it to fill a screen — three countries with their own
   coordinates and dossiers, five areas of work each with a photograph. Three
   values of two sentences each are the opposite case: they are one framework
   with three faces, they want to be read together, and putting them a screen
   apart is what stops a reader ever holding all three at once.

   So they are a ledger now: three columns, side by side, comparable at a
   glance, about 700px instead of 2,400. Nothing was cut — every word of
   `threeAs` is still here, and so is the giant ghost initial that gave each
   panel its room. The initial simply sits behind its own column now instead of
   behind its own screen.

   The heading moved inside, too. It used to be a separate `Section` above the
   pin, which was another 280px of page and a hard cut between "reading" and
   "panning"; with no pin to announce, the section can introduce itself the way
   every other one on the site does.
   ========================================================================== */

/*
 * ONE ACCENT, AND NO PER-COLUMN COLOUR — carried over from the pinned version,
 * where the reasoning was the same.
 *
 * These three used to be sky, sage and clay: a different colour per value.
 * Three colours across three faces of one framework makes them look like three
 * unrelated ideas, which is the opposite of what the section is for. Gold
 * throughout, and what distinguishes the columns is what should: the words.
 */

export function ValuePanels({ id, index = '07' }: { id?: string; index?: string }) {
  return (
    <Section id={id} className="overflow-hidden border-y border-mist/12">
      {/* The glow, once across the whole row rather than once per panel. Three
          radial washes in a row on one ground band at each other's edges; one
          wide ellipse behind all three reads as a single lit space, which is
          what a framework should look like. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(200,169,107,0.11),transparent_72%)]"
      />

      <Container size="wide" className="relative">
        <Scrub effect="scrub-rise">
          <SectionHeading
            index={index}
            eyebrow="How We Work"
            ghost="Ethics"
            title="The Three A’s"
            lead="The test every IES programme is held to, unchanged since 2023 and applied the same way in every branch."
          />
        </Scrub>

        {/*
         * `divide-x` from `md` up rather than three bordered cards.
         *
         * The site's rule is that grouping is carried by hairlines and
         * whitespace, never by boxes — a row of three tinted rectangles is an
         * inventory, and the eye counts them before it reads any of them. The
         * dividers between the columns do the same grouping at no visual
         * weight, and they are also what makes the row read as *one* framework
         * split three ways rather than as three separate claims.
         */}
        <dl className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3 md:gap-x-0 md:divide-x md:divide-mist/15">
          {threeAs.map((item, i) => (
            <Scrub
              key={item.title}
              effect="scrub-rise"
              offset={i * 0.06}
              /* `group` for the hover, `relative` so the ghost initial below
                 has this column to position against rather than the section. */
              className="group relative md:px-8 lg:px-10 md:first:pl-0 md:last:pr-0"
            >
              {/* The initial, kept from the pinned version and doing the same
                  job at a third of the size: it is the room the column stands
                  in. `aria-hidden` — it is the letter the title already starts
                  with, and a screen reader announcing a lone "A" helps nobody. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-6 -left-1 font-serif leading-none text-[var(--accent)] opacity-[0.07] transition-opacity duration-700 ease-[var(--ease-cinema)] select-none group-hover:opacity-[0.12]"
                style={{ fontSize: 'clamp(6rem,11vw,9rem)' }}
              >
                {item.title.charAt(0)}
              </span>

              <div className="relative">
                <p className="text-label-sm font-semibold text-[var(--accent)] uppercase">
                  Value {String(i + 1).padStart(2, '0')} / {String(threeAs.length).padStart(2, '0')}
                </p>

                {/* `dt`/`dd`, so the pair is a described term rather than two
                    stacked paragraphs that only look related. */}
                <dt className="mt-5 font-serif text-[clamp(1.625rem,2.4vw,2.125rem)] leading-[1.08] font-normal text-paper">
                  {item.title}
                </dt>

                <p className="text-label-sm mt-3 font-semibold text-mist uppercase">
                  {item.subtitle}
                </p>

                {/* The rule is the only thing that moves on hover. A column
                    that lights up in full reads as a tile reacting; a hairline
                    warming under the title reads as the column acknowledging
                    the cursor, which is the register the rest of the site
                    uses. */}
                <span
                  aria-hidden
                  className="mt-6 block h-px w-10 bg-mist/30 transition-all duration-500 ease-[var(--ease-cinema)] group-hover:w-20 group-hover:bg-[var(--accent)]"
                />

                <dd className="mt-6 leading-relaxed text-mist">{item.body}</dd>
              </div>
            </Scrub>
          ))}
        </dl>
      </Container>
    </Section>
  )
}
