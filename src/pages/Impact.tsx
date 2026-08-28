import { Card, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { GhostTitle } from '@/components/ui/Cinematic'
import { Counter } from '@/components/ui/Counter'
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
      <Section tone="deep" className="overflow-hidden border-y border-mist/12">
        <Container size="wide" className="relative">
          <GhostTitle>Figures</GhostTitle>
          <Reveal className="relative z-10">
            <Eyebrow>Organization-Wide Statistics</Eyebrow>
          </Reveal>

          {/*
           * THE FIGURES, AT THE SIZE THE PAGE IS NAMED AFTER.
           *
           * Two problems here, and the second was the more serious.
           *
           * These were set at `text-h2` — the same size as the section heading
           * above them — on the one page whose entire subject is the numbers.
           * They are now display-scale, in the same treatment the home page's
           * ledger uses: paper-white digits with the accent carried by the
           * suffix alone, so a `+` reads as gold without any part of the number
           * itself dropping contrast.
           *
           * And the markup was saying the label twice. The `<dt>` was
           * `sr-only` while `StatBlock` rendered a second, visible copy inside
           * the `<dd>` — so a screen reader heard "Members, 1,200, Members" and
           * the description list had a term that was not the visible term. The
           * `<dt>` is the label now, visible, where it belongs; the `<dd>` is
           * the figure and nothing else.
           */}
          <dl className="relative z-10 mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {impactStats.map((stat, i) => (
              <Reveal key={stat.label + stat.value} delay={i * 80}>
                <div className="border-t border-mist/20 pt-6">
                  <dd className="font-serif leading-[0.85] font-medium tracking-[-0.03em] text-paper [font-size:clamp(3rem,5.2vw,4.75rem)]">
                    <Counter stat={stat} suffixClassName="text-[var(--accent)]" />
                  </dd>
                  <dt className="text-label mt-4 font-semibold text-[var(--accent)] uppercase">
                    {stat.label}
                  </dt>
                  {stat.note && (
                    <p className="mt-2.5 max-w-[32ch] text-sm leading-relaxed text-mist">
                      {stat.note}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={200}>
            <p className="mt-14 max-w-3xl text-xs leading-relaxed text-mist">
              {site.statisticsNote} Figures are reported by national branches and consolidated by
              the Global Foundation. Where a figure cannot be supported from internal records, it
              is not published.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ==================================================== IMPACT STORIES */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Impact Stories"
              title="The work behind the numbers"
              lead="Statistics describe the scale of the network. These describe what it is for."
            />
          </Reveal>

          <div className="mt-16 space-y-6">
            {impactStories.map((story, i) => (
              <Reveal key={story.id} delay={i * 100}>
                <Card className="p-8 sm:p-10">
                  <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
                    <div>
                      <span className="text-[0.75rem] font-semibold tracking-[0.13em] text-[var(--accent)] uppercase">
                        {story.branch}
                      </span>
                      <h3 className="text-h3 mt-4">{story.title}</h3>

                      {story.metrics && (
                        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                          {story.metrics.map((metric) => (
                            <div key={metric.label}>
                              <dt className="text-[0.75rem] font-semibold tracking-[0.13em] text-mist uppercase">
                                {metric.label}
                              </dt>
                              <dd className="mt-1 font-serif text-xl text-paper">
                                {metric.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </div>

                    <div className="space-y-5">
                      <p className="text-lead text-paper/90">{story.summary}</p>
                      <p className="leading-relaxed text-mist">{story.detail}</p>
                    </div>
                  </div>
                </Card>
              </Reveal>
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
      <Section tone="deep" size="compact" className="border-t border-mist/12">
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

      <Section tone="deep" size="compact" className="border-b border-mist/12">
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
