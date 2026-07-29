import { Card, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { StatBlock } from '@/components/ui/Counter'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { CallToAction } from '@/components/sections/CallToAction'
import { impactIntro, impactStats, impactStories, timeline } from '@/content/impact'
import { site } from '@/content/site'
import { useSeo } from '@/lib/seo'
import { cx } from '@/lib/utils'

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
        title="What the network has actually done."
        lead={impactIntro}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Impact' }]}
      />

      {/* ====================================================== STATISTICS */}
      <Section tone="paper">
        <Container size="wide">
          <Reveal>
            <Eyebrow tone="navy">Organization-Wide Statistics</Eyebrow>
          </Reveal>

          <dl className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {impactStats.map((stat, i) => (
              <Reveal key={stat.label + stat.value} delay={i * 80}>
                <div className="border-t border-navy/15 pt-7">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <StatBlock stat={stat} tone="light" />
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={200}>
            <p className="mt-14 max-w-3xl text-xs leading-relaxed font-light text-navy-700/60">
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
                      <span className="text-[0.625rem] font-medium tracking-[0.2em] text-gold uppercase">
                        {story.branch}
                      </span>
                      <h3 className="text-h3 mt-4">{story.title}</h3>

                      {story.metrics && (
                        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                          {story.metrics.map((metric) => (
                            <div key={metric.label}>
                              <dt className="text-[0.625rem] font-medium tracking-[0.18em] text-mist/70 uppercase">
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
                      <p className="text-lead font-light text-paper/90">{story.summary}</p>
                      <p className="leading-relaxed font-light text-mist">{story.detail}</p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========================================================= TIMELINE */}
      <Section tone="deep" className="border-y border-mist/12">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Timeline"
              title="From April 2023 onward"
              lead="The sequence of the organization’s development, from a single student initiative to an international network."
            />
          </Reveal>

          <ol className="relative mt-16 ml-0 sm:ml-4">
            {/* Vertical spine */}
            <span
              aria-hidden
              className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-gold/45 via-mist/20 to-transparent sm:left-[9px]"
            />

            {timeline.map((entry, i) => (
              <Reveal key={entry.title} delay={i * 70} as="li">
                <div className="relative grid gap-3 pb-12 pl-9 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:pl-12">
                  <span
                    aria-hidden
                    className={cx(
                      'absolute top-2 left-0 block rounded-full border transition-colors sm:left-0.5',
                      entry.milestone
                        ? 'h-4 w-4 border-gold bg-gold/25'
                        : 'h-2.5 w-2.5 translate-x-[3px] border-mist/50 bg-navy',
                    )}
                  />

                  <time
                    className={cx(
                      'text-[0.75rem] font-medium tracking-[0.14em] uppercase',
                      entry.milestone ? 'text-gold' : 'text-mist/70',
                    )}
                  >
                    {entry.date}
                  </time>

                  <div>
                    <h3
                      className={cx(
                        'font-serif',
                        entry.milestone ? 'text-h3' : 'text-[1.25rem]',
                      )}
                    >
                      {entry.title}
                    </h3>
                    <p className="mt-3 max-w-2xl leading-relaxed font-light text-mist">
                      {entry.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed font-light text-mist/70">
              Entries marked “date to be confirmed” are sequenced correctly but await
              verification against internal records before publication.
            </p>
          </Reveal>
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
