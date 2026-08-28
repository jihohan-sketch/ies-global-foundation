import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Globe, type GlobeMarker } from '@/components/Globe'
import { Button, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
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
        ghost="Network"
        title="One society, three countries."
        lead="Korea is the original branch and the operational headquarters. The United States and the United Kingdom run their own programming, approve their own chapters, and are held to the same standards."
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
                <p className="mt-2 text-center text-xs text-mist">
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

              {/*
               * HAIRLINE ROWS, NOT BOXES.
               *
               * These were three bordered panels stacked with a gap — three
               * cards doing the job of a list of three. The selected state was
               * carried by a border colour and a background tint, which is a
               * lot of ink to say "this one", and on the unselected two it
               * read as though they were also selectable *panels* rather than
               * entries in a set.
               *
               * A shared rule between rows and a solid mark in the accent
               * says the same thing with less: the mark is the only thing that
               * moves, and it is the brightest object in the column, so the
               * selection is findable without being outlined.
               */}
              <div className="mt-8">
                {branches.map((branch, i) => {
                  const selected = branch.slug === activeId
                  return (
                    <Reveal key={branch.slug} delay={i * 90}>
                      <button
                        type="button"
                        onClick={() => setActiveId(branch.slug)}
                        aria-pressed={selected}
                        className={cx(
                          'group grid w-full grid-cols-[0.5rem_minmax(0,1fr)_auto] items-baseline gap-x-5 border-t py-6 text-left transition-colors duration-500 ease-[var(--ease-cinema)]',
                          selected ? 'border-[var(--accent)]/45' : 'hover:border-mist/40',
                        )}
                      >
                        {/* The mark. `scaleY` on a fixed bar rather than a
                            height change, so the selection animates on the
                            compositor and the row's baseline never moves. */}
                        <span
                          aria-hidden
                          className={cx(
                            'block h-[1.4rem] w-0.5 origin-center rounded-full transition-transform duration-500 ease-[var(--ease-cinema)]',
                            selected
                              ? 'scale-y-100 bg-[var(--accent)]'
                              : 'scale-y-0 bg-mist/50 group-hover:scale-y-50',
                          )}
                        />
                        <span className="min-w-0">
                          <span
                            className={cx(
                              'block font-serif text-[1.5rem] leading-tight transition-colors duration-500',
                              selected ? 'text-[var(--accent)]' : 'text-paper group-hover:text-mist',
                            )}
                          >
                            {branch.name}
                          </span>
                          <span className="mt-1.5 block text-[0.8125rem] text-slate">
                            {branch.role}
                          </span>
                        </span>
                        <span className="text-label-sm font-semibold text-slate uppercase">
                          {branch.code}
                        </span>
                      </button>
                    </Reveal>
                  )
                })}
              </div>

              {/* The selected branch, as a summary under the list rather than
                  as a card beside it — it belongs to the row above it, and a
                  box would detach it from the thing that selects it. */}
              <Reveal delay={280}>
                <div className="mt-10 border-t pt-8" style={{ borderColor: 'var(--rule-strong)' }}>
                  <h2 className="font-serif text-[1.75rem] leading-tight text-paper">
                    {active.name}
                  </h2>
                  <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-mist">
                    {active.summary}
                  </p>
                  {activeLeaders.length > 0 && (
                    <div className="mt-8 border-t pt-5">
                      <p className="text-label-sm font-semibold text-slate uppercase">
                        National Leadership
                      </p>
                      <ul className="mt-3.5 space-y-2">
                        {activeLeaders.map((person) => (
                          <li key={person.id} className="text-[0.9375rem] text-paper">
                            {person.name}
                            <span className="text-slate"> — {person.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-9">
                    <Button to={`/global-network/${active.slug}`} variant="secondary" arrow>
                      Open branch profile
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ======================================================== BRANCH LIST */}
      <Section tone="deep" >
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

                  <p className="leading-relaxed text-mist">{branch.summary}</p>

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
              <p className="text-lead text-paper">{futureExpansion.body}</p>
              <p className="mt-6 leading-relaxed text-mist">
                {futureExpansion.detail}
              </p>

              <ul className="mt-9 grid gap-4 sm:grid-cols-2">
                {futureExpansion.criteria.map((item) => (
                  <li
                    key={item}
                    className="border-t border-mist/18 pt-4 text-[0.9375rem] text-paper"
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
        title="Three countries. Room for more."
        body="A fourth branch opens when there are students to lead it and a plan it can be held to — not when it would look good to announce one."
        actions={[
          { label: 'Join IES', to: '/join', variant: 'primary' },
          { label: 'Start a Chapter', to: '/start-a-chapter' },
        ]}
      />
    </>
  )
}
