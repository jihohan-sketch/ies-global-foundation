import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Globe, type GlobeMarker } from '@/components/Globe'
import { Button, Card, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { CallToAction } from '@/components/sections/CallToAction'
import { branches, futureExpansion } from '@/content/branches'
import { nationalLeadership } from '@/content/leadership'
import { site } from '@/content/site'
import { useSeo } from '@/lib/seo'
import { cx } from '@/lib/utils'

const markers: GlobeMarker[] = branches.map((branch) => ({
  id: branch.slug,
  label: branch.name,
  lat: branch.point.lat,
  lon: branch.point.lon,
}))

export default function GlobalNetwork() {
  useSeo({
    title: 'Global Network',
    description:
      'IES maintains national branches in Korea, the United States, and the United Kingdom. Explore each branch, its leadership, and its programs.',
    path: '/global-network',
  })

  const [activeId, setActiveId] = useState<string>(branches[0].slug)
  const active = branches.find((b) => b.slug === activeId) ?? branches[0]
  const activeLeaders = nationalLeadership.filter((p) => p.branch === active.slug)

  return (
    <>
      <PageHero
        eyebrow="Global Network"
        title="One Foundation. Multiple National Branches."
        lead="Students across three countries, joined by one commitment to ethical leadership. Each branch works in its own context, to the same standards."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Global Network' }]}
      />

      {/* ==================================================== INTERACTIVE MAP */}
      {/* Opaque: the interactive globe below is the feature here, so the shared
          backdrop is masked out rather than showing a second sphere behind it. */}
      <Section className="overflow-hidden bg-navy">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            {/* --------------------------------------------------- Globe */}
            <Reveal className="order-2 lg:order-1">
              <div className="relative">
                <Globe
                  markers={markers}
                  interactive
                  activeId={activeId}
                  onSelect={setActiveId}
                  className="mx-auto aspect-square w-full max-w-2xl"
                />
                <p className="mt-2 text-center text-xs font-light text-mist/60">
                  Select a marker to view that branch. The globe is a schematic
                  representation and is not a cartographic reference.
                </p>
              </div>
            </Reveal>

            {/* ------------------------------------------------- Selector */}
            <div className="order-1 lg:order-2">
              <Reveal>
                <Eyebrow>Select a Branch</Eyebrow>
              </Reveal>

              <div className="mt-8 space-y-3">
                {branches.map((branch, i) => {
                  const selected = branch.slug === activeId
                  return (
                    <Reveal key={branch.slug} delay={i * 90}>
                      <button
                        type="button"
                        onClick={() => setActiveId(branch.slug)}
                        aria-pressed={selected}
                        className={cx(
                          'w-full border px-6 py-5 text-left transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
                          selected
                            ? 'border-[var(--accent)]/55 bg-navy-700/70'
                            : 'border-mist/18 bg-navy-700/25 hover:border-mist/40 hover:bg-navy-700/45',
                        )}
                      >
                        <span className="flex items-center justify-between gap-4">
                          <span
                            className={cx(
                              'font-serif text-xl transition-colors',
                              selected ? 'text-[var(--accent)]' : 'text-paper',
                            )}
                          >
                            {branch.name}
                          </span>
                          <span className="text-[0.625rem] font-medium tracking-[0.16em] text-mist uppercase">
                            {branch.code}
                          </span>
                        </span>
                        <span className="mt-2 block text-[0.8125rem] font-light text-mist">
                          {branch.role}
                        </span>
                      </button>
                    </Reveal>
                  )
                })}
              </div>

              {/* Detail panel for the selected branch */}
              <Reveal delay={280}>
                <Card className="mt-8 p-8">
                  <h2 className="font-serif text-h3">{active.name}</h2>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed font-light text-mist">
                    {active.summary}
                  </p>

                  {activeLeaders.length > 0 && (
                    <div className="mt-6 border-t border-mist/12 pt-5">
                      <p className="text-[0.625rem] font-medium tracking-[0.2em] text-mist/70 uppercase">
                        National Leadership
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {activeLeaders.map((person) => (
                          <li key={person.id} className="text-sm font-light text-paper/85">
                            {person.name}
                            <span className="text-mist"> — {person.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-7">
                    <Button to={`/global-network/${active.slug}`} variant="secondary" arrow>
                      Open branch profile
                    </Button>
                  </div>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ======================================================== BRANCH LIST */}
      <Section tone="deep" className="border-y border-mist/12">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="The Branches"
              title="Same mission. Different national contexts."
              lead={site.headquartersStatement}
            />
          </Reveal>

          <div className="mt-16 space-y-px">
            {branches.map((branch, i) => (
              <Reveal key={branch.slug} delay={i * 100}>
                <Link
                  to={`/global-network/${branch.slug}`}
                  className="group grid gap-6 border-t border-mist/15 py-10 transition-colors hover:bg-navy/40 lg:grid-cols-[auto_1fr_1.2fr_auto] lg:items-start lg:gap-12 lg:px-4"
                >
                  <span className="font-serif text-sm text-[var(--accent)]/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <h3 className="text-h3 transition-colors group-hover:text-[var(--accent)]">
                      {branch.name}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--accent)]/85">{branch.status}</p>
                  </div>

                  <p className="leading-relaxed font-light text-mist">{branch.summary}</p>

                  <span
                    aria-hidden
                    className="text-mist transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* =================================================== FUTURE EXPANSION */}
      <Section>
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <Reveal>
              <Eyebrow>{futureExpansion.title}</Eyebrow>
              <h2 className="text-h2 mt-6">Growth on conditions, not on announcements.</h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="text-lead font-light text-paper/90">{futureExpansion.body}</p>
              <p className="mt-6 leading-relaxed font-light text-mist">
                {futureExpansion.detail}
              </p>

              <ul className="mt-9 grid gap-4 sm:grid-cols-2">
                {futureExpansion.criteria.map((item) => (
                  <li
                    key={item}
                    className="border-t border-mist/18 pt-4 text-[0.9375rem] font-light text-paper/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button href="mailto:theiesociety@gmail.com" variant="secondary">
                  Enquire about a new branch
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CallToAction
        title="Join a Growing Global Network"
        body="Students, schools, and organizations across three countries — and room for more."
        actions={[
          { label: 'Join IES', to: '/join', variant: 'primary' },
          { label: 'Start a Chapter', to: '/start-a-chapter' },
        ]}
      />
    </>
  )
}
