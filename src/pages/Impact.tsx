import { Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { GhostTitle } from '@/components/ui/Cinematic'
import { Counter } from '@/components/ui/Counter'
import { Split, Statement } from '@/components/ui/Editorial'
import { HorizontalStory } from '@/components/sections/HorizontalStory'
import { MaskedText } from '@/components/ui/MaskedText'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { CallToAction } from '@/components/sections/CallToAction'
import { PhotoStrip, VideoSection } from '@/components/sections/Media'
import { fieldPhotos, impactIntro, impactStats, impactStories } from '@/content/impact'
import { organizationVideos } from '@/content/videos'
import { site } from '@/content/site'
import { TimelineScene } from '@/components/sections/TimelineScene'
import { Scrub } from '@/components/ui/Scrub'
import { useSeo } from '@/lib/seo'

export default function Impact() {
  useSeo({
    title: 'Impact',
    description:
      'Membership, chapters, schools represented, and people reached across the IES network — with the programs and milestones behind the figures.',
    path: '/impact',
  })

  return (
    <>
      <PageHero
        eyebrow="Impact"
        ghost="Impact"
        title="What the network has actually done."
        lead={impactIntro}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Impact' }]}
      />

      {/* ====================================================== STATISTICS */}
      {/* Dark rather than the bright `paper` interlude this used to be — see the
          note on the matching section in Home.tsx. */}
      {/* ========================================================== FIGURES */}
      {/*
       * ON PAPER, AND SPLIT RATHER THAN GRIDDED.
       *
       * This was a three-column grid of six figures on the dark ground — six
       * equal cells, which is the layout that says "here are some numbers" and
       * nothing about which of them matters. The page is called Impact; the
       * numbers are the argument, and an argument needs an order.
       *
       * So: the reading ground, a sticky standfirst on the left saying what
       * the figures are and are not, and the figures themselves as a hairline
       * register down the right — largest first, each one carrying the
       * sentence that says what it counts. The caveat about how they are
       * gathered sits with the claim rather than three screens below it, which
       * is the whole point of putting it on paper.
       */}
      <Section tone="paper" className="overflow-hidden">
        <Container size="wide" className="relative">
          <GhostTitle>Figures</GhostTitle>
          <div className="relative z-10">
            <Split
              aside={
                <>
                  <Reveal>
                    <Eyebrow tone="navy">Organization-Wide Statistics</Eyebrow>
                  </Reveal>
                  <MaskedText
                    as="h2"
                    className="text-h2 mt-8 max-w-[11ch] text-navy"
                    text={['Counted, not', 'estimated.']}
                  />
                  <Reveal delay={120}>
                    <p className="mt-8 max-w-[38ch] text-[0.9375rem] leading-relaxed text-navy-600">
                      {site.statisticsNote} Figures are reported by national branches and
                      consolidated by the Global Foundation. Where a figure cannot be supported
                      from internal records, it is not published.
                    </p>
                  </Reveal>
                </>
              }
            >
              <dl>
                {impactStats.map((stat, i) => (
                  <Reveal key={stat.label + stat.value} delay={Math.min(i, 6) * 70}>
                    {/* Figure and label on one baseline rather than stacked in a
                        cell: the pairing is what a ledger row is for, and
                        proximity is what makes it read as a pair. */}
                    <div
                      /* `auto` for the figure track, with a floor. A fixed
                         track sized to a typical figure is wrong twice over:
                         `736,000+` overruns it and lands on top of its own
                         label, and `3` leaves most of it empty. `auto` sizes
                         to the widest figure in the list and the floor keeps
                         the short ones from collapsing against the label. */
                      className="grid items-baseline gap-x-10 gap-y-2 border-t py-7 sm:grid-cols-[auto_minmax(0,1fr)]"
                      style={{ borderColor: 'var(--rule)' }}
                    >
                      <dd className="min-w-[6rem] font-serif leading-[0.85] font-medium tracking-[-0.03em] text-navy [font-size:clamp(2.5rem,4.6vw,4rem)]">
                        <Counter stat={stat} suffixClassName="text-[var(--accent)]" />
                      </dd>
                      <div>
                        <dt className="text-label font-semibold text-[var(--accent)] uppercase">
                          {stat.label}
                        </dt>
                        {stat.note && (
                          <p className="mt-2 max-w-[42ch] text-[0.9375rem] leading-relaxed text-navy-600">
                            {stat.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </Split>
          </div>
        </Container>
      </Section>

      {/* =================================================== IMPACT STORIES */}
      {/*
       * The four stories, panned rather than stacked.
       *
       * They were four cards, each a two-column grid inside a bordered box, and
       * they had the specific failure that long cards always have: the fourth
       * one sat below three near-identical rectangles, so by the time a reader
       * reached it they had already learned that this part of the page was a
       * list to be skimmed. These are the pieces of evidence the whole page
       * rests on — each one deserves the screen while it is being read.
       *
       * The metrics travel with their story as a two-column dossier at the
       * foot of the panel, which is where a fact belongs relative to the claim
       * it supports.
       */}
      <HorizontalStory
        id="stories"
        label="Impact stories"
        eyebrow="Impact Stories"
        title="The work behind the numbers."
        lead="Statistics describe the scale of the network. These describe what it is for."
        wordmark="Stories"
        panels={impactStories.map((story) => ({
          id: story.id,
          eyebrow: story.branch,
          title: story.title,
          body: story.summary,
          facts: story.metrics?.map((metric) => ({
            label: metric.label,
            value: metric.value,
          })),
        }))}
      />

      {/* The detail behind each story, on paper, for the reader who wants it.
          The pan carries the claim; this carries the argument. */}
      <Section tone="bone">
        <Container size="wide">
          <Reveal>
            <Eyebrow tone="navy">In Detail</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <Statement tone="dark" as="h2" className="mt-8">
              How each of these actually runs.
            </Statement>
          </Reveal>

          <div className="mt-20 space-y-20">
            {impactStories.map((story, i) => (
              <Split
                key={story.id}
                sticky={false}
                aside={
                  <Reveal>
                    <span className="font-serif text-[0.9375rem] text-navy/45 tabular-nums lining-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-4 font-serif text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.12] tracking-[-0.02em] text-navy">
                      {story.title}
                    </h3>
                    <p className="text-label-sm mt-4 font-semibold text-[var(--accent)] uppercase">
                      {story.branch}
                    </p>
                  </Reveal>
                }
              >
                <Reveal delay={100}>
                  <p className="border-t pt-7 leading-relaxed text-navy-600" style={{ borderColor: 'var(--rule)' }}>
                    {story.detail}
                  </p>
                </Reveal>
              </Split>
            ))}
          </div>
        </Container>
      </Section>

      {/* ====================================================== IN THE FIELD */}
      <PhotoStrip
        photos={fieldPhotos}
        eyebrow="In the Field"
        title="The work as it happens"
        lead="Photographs from IES programs — forums in session, volunteers mid-shift, a petition on the public record. The full set, event by event, is on Our Work."
      />

      {/* ============================================================= FILM */}
      <VideoSection
        videos={organizationVideos}
        eyebrow="Film"
        title="The organization in its own words"
        lead="From the IES YouTube channel. Nothing loads from YouTube until you press play."
      />

      {/* ========================================================= TIMELINE */}
      {/* Horizontal, because the content already is. Reading the history left
          to right while scrolling down makes the passage of time and the
          passage of the page the same gesture — and unlike the vertical spine
          this replaces, several entries are on screen at once, so what a
          visitor sees is a sequence rather than a stack of dates. */}
      <Section tone="deep" size="compact" >
        <Container size="wide">
          <Scrub effect="scrub-rise">
            <SectionHeading
              eyebrow="Timeline"
              title="From April 2023 onward"
              lead="The sequence of the organization’s development, from a single student initiative to an international network."
            />
          </Scrub>
        </Container>
      </Section>

      <TimelineScene />

      <Section tone="deep" size="compact" >
        <Container size="wide">
          <Scrub effect="scrub-rise">
            <p className="max-w-2xl text-sm leading-relaxed text-mist">
              Entries marked “date to be confirmed” are sequenced correctly but await
              verification against internal records before publication.
            </p>
          </Scrub>
        </Container>
      </Section>

      <CallToAction
        title="Add to what comes next"
        body="The next set of figures depends on students who take on real responsibility this year."
        actions={[
          { label: 'Join IES', to: '/join', variant: 'primary' },
          { label: 'Partner With Us', to: '/partners' },
        ]}
      />
    </>
  )
}
