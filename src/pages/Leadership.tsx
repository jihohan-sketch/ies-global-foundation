import { Card, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { PersonCard } from '@/components/sections/Cards'
import { CallToAction } from '@/components/sections/CallToAction'
import { PeopleRibbon } from '@/components/sections/PeopleRibbon'
import { branches } from '@/content/branches'
import {
  boardLeadership,
  foundingLeadership,
  globalLeadership,
  globalOffices,
  leadershipIntro,
  nationalLeadership,
  personById,
  spotlightLeadership,
} from '@/content/leadership'
import { cx, initials } from '@/lib/utils'
import { useSeo } from '@/lib/seo'
import { image, SIZES } from '@/lib/images'

/*
 * One person can hold several offices. Rendering one card per office then
 * repeats their portrait, name and biography, which reads as a duplication bug
 * rather than as two posts — so offices sharing a holder are shown as a single
 * card. Unfilled offices always stand on their own.
 */
const officeGroups = globalOffices.reduce<(typeof globalOffices)[]>((groups, office) => {
  const existing = office.holder
    ? groups.find((group) => group[0].holder === office.holder)
    : undefined
  if (existing) existing.push(office)
  else groups.push([office])
  return groups
}, [])

/** The people this page already renders a full PersonCard for. */
const carded = [...spotlightLeadership, ...foundingLeadership, ...boardLeadership]
const cardedIds = new Set(carded.map((p) => p.id))

/*
 * The ribbon's cast: everyone who leads IES anywhere, de-duplicated, in the
 * order the page introduces them.
 *
 * The whole cast rather than only the ones with a full card, for two reasons.
 * It is what the scene claims to be — a ribbon headed "the people who lead
 * IES" that quietly omits every branch lead is making a claim it does not
 * keep. And it is what makes the pan work: four panels over a screen and a
 * half of scrolling barely move, which reads as a page that has stopped
 * responding rather than as a held frame.
 *
 * The de-duplication is load-bearing. `spotlight` lifts a person into the
 * opening group without changing their tier, so a spotlit founder appears in
 * two of these lists. The card sections cope because each is a different
 * heading; one pan is one list, and the same face twice in it reads as a bug.
 */
const ribbonPeople = [
  ...spotlightLeadership,
  ...foundingLeadership,
  ...globalLeadership,
  ...boardLeadership,
  ...nationalLeadership,
].filter((person, i, all) => all.findIndex((other) => other.id === person.id) === i)
const hasPersonCard = (person: { id: string }) => cardedIds.has(person.id)

/*
 * Columns follow the count, so a row is always full. A card left alone on a
 * row sits at a fraction of the width with empty space beside it, which reads
 * as a card that failed to load rather than as a deliberate layout.
 */
/*
 * Column counts went up by one at every size, because the card underneath
 * changed shape: `PersonCard` used to be a wide panel with the portrait beside
 * the text and could not survive a narrow column, and it is now a 4:5 portrait
 * tile whose text sits over the image. Two of those on a desktop row is a
 * poster, not a directory.
 *
 * Two columns on a phone rather than one, for the same reason: a column of
 * full-width portraits makes a fifteen-person page fifteen screens long.
 */
const gridFor = (count: number) =>
  cx(
    'mt-14 grid grid-cols-2 gap-3 sm:gap-4',
    count === 2 && 'lg:grid-cols-2',
    count > 2 && 'md:grid-cols-3 lg:grid-cols-4',
  )

export default function Leadership() {
  useSeo({
    title: 'Leadership',
    description:
      'Founding leadership, IES Global Foundation offices, and the national leadership of IES Korea, IES United States, and IES UK Society.',
    path: '/leadership',
  })

  return (
    <>
      <PageHero
        eyebrow="Leadership"
        ghost="Leaders"
        title="Students holding real responsibility."
        lead="IES is led by students at every level. Roles exist because work needs doing — we do not create titles to fill a page."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Leadership' }]}
      />

      {/* =========================================================== RIBBON

          Who these people are, at a glance and at a size worth looking at.
          The reading stays in the cards below — see the note in PeopleRibbon
          for why a pinned pan is the wrong place for a biography. */}
      <PeopleRibbon
        people={ribbonPeople}
        label="The people who lead IES"
        wordmark="Leaders"
      />

      {/* ============================================= FOUNDATION LEADERSHIP */}
      {/* Deliberately not headed "founders": this group is who runs the
          Foundation now, and not everyone in it is a founder. Each card's own
          title says which a person is. */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Foundation Leadership"
              title="Leading the Foundation"
              lead={leadershipIntro.foundation}
            />
          </Reveal>

          <div className={gridFor(spotlightLeadership.length)}>
            {spotlightLeadership.map((person, i) => (
              <Reveal key={person.id} delay={i * 120}>
                <PersonCard person={person} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================================================= GLOBAL FOUNDATION */}
      <Section tone="deep" className="border-y border-mist/12">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Global Foundation Leadership"
              title="Offices of the Foundation"
              lead={leadershipIntro.global}
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {officeGroups.map((group, i) => {
              const holder = group[0].holder ? personById(group[0].holder) : undefined
              const officeTitle = group.map((office) => office.title).join(' · ')
              return (
                <Reveal key={officeTitle} delay={i * 100}>
                  <Card className="h-full p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-xl">{officeTitle}</h3>
                        <p className="mt-1.5 text-[0.75rem] font-medium tracking-[0.14em] text-[var(--accent)] uppercase">
                          {group.map((office) => office.scope).join(' · ')}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-mist/12 pt-5">
                      {holder ? (
                        /* Same square, uncropped portrait as PersonCard at a
                           smaller size, with the name set beside it — a filled
                           office should read as a person holding it, not as a
                           line of text. */
                        <div className="flex flex-col gap-5 sm:flex-row">
                          {holder.photo ? (
                            <img
                              {...image(holder.photo)}
                              sizes={SIZES.portrait}
                              alt=""
                              loading="lazy"
                              className="aspect-square w-full shrink-0 self-start rounded-[3px] object-cover sm:w-56"
                            />
                          ) : (
                            <span
                              aria-hidden
                              className="flex aspect-square w-full shrink-0 items-center justify-center self-start rounded-[3px] border border-[var(--accent)]/35 font-serif text-4xl text-[var(--accent)] sm:w-56"
                            >
                              {initials(holder.name)}
                            </span>
                          )}
                          <div className="min-w-0">
                            <p className="text-[0.9375rem] text-paper/90">
                              {holder.name}
                              {holder.koreanName && (
                                <span className="ml-2 text-mist">
                                  {holder.koreanName}
                                </span>
                              )}
                              {/* Only when it says something the heading above
                                  does not — otherwise it is the same line twice. */}
                              {holder.title !== officeTitle && (
                                <span className="mt-0.5 block text-[0.8125rem] text-mist">
                                  {holder.title}
                                </span>
                              )}
                            </p>
                            {/* Officers whose sole appearance is this card carry
                                their biography here. Anyone with a PersonCard
                                further up the same page would otherwise repeat
                                that paragraph, which reads as a bug — they get
                                the office's own note instead, which describes
                                the post rather than the person.

                                Keyed on whether a card is actually rendered
                                above, not on tier: the opening pair mixes
                                founders with Foundation officers, so tier alone
                                stopped answering the question. */}
                            <p className="mt-4 text-[0.875rem] leading-relaxed text-mist">
                              {hasPersonCard(holder)
                                ? group.map((office) => office.holderNote).find(Boolean)
                                : holder.bio}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[0.8125rem] text-mist italic">
                          Appointment to be confirmed.
                        </p>
                      )}
                    </div>

                    <ul className="mt-5 space-y-2">
                      {group.flatMap((office) => office.responsibilities).map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-[0.875rem] text-mist"
                        >
                          <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-[var(--accent)]/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* =============================================== FOUNDING LEADERSHIP */}
      {/* Every founder, including any also shown in the opening group above —
          holding an office now does not make someone less of a founder, and a
          founders section missing a founder is just wrong. */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Founding Leadership"
              title="The founders of IES"
              lead={leadershipIntro.founding}
            />
          </Reveal>

          <div className={gridFor(foundingLeadership.length)}>
            {foundingLeadership.map((person, i) => (
              <Reveal key={person.id} delay={i * 120}>
                <PersonCard person={person} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================================================ BOARD OF DIRECTORS */}
      {boardLeadership.length > 0 && (
        <Section tone="deep" className="border-y border-mist/12">
          <Container size="wide">
            <Reveal>
              <SectionHeading
                eyebrow="Board of Directors"
                title="Oversight of the Foundation"
                lead={leadershipIntro.board}
              />
            </Reveal>

            <div className={gridFor(boardLeadership.length)}>
              {boardLeadership.map((person, i) => (
                <Reveal key={person.id} delay={i * 120}>
                  <PersonCard person={person} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* =============================================== NATIONAL LEADERSHIP */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="National Leadership"
              title="Who leads each branch"
              lead={leadershipIntro.national}
            />
          </Reveal>

          <div className="mt-16 space-y-20">
            {branches.map((branch) => {
              const leaders = nationalLeadership.filter((p) => p.branch === branch.slug)
              if (leaders.length === 0) return null

              return (
                <div key={branch.slug}>
                  <Reveal>
                    <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-mist/15 pb-5">
                      <h3 className="text-h3">{branch.name}</h3>
                      <span className="text-[0.6875rem] font-medium tracking-[0.16em] text-[var(--accent)] uppercase">
                        {branch.status}
                      </span>
                    </div>
                  </Reveal>

                  <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    {leaders.map((person, i) => (
                      <Reveal key={person.id} delay={i * 110}>
                        <PersonCard person={person} branchName={branch.name} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <Reveal delay={160}>
            <p className="mt-16 max-w-2xl border-t border-mist/15 pt-6 text-sm leading-relaxed text-mist">
              Additional national officers are listed once appointments are finalised and
              confirmed by the relevant branch.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ============================================================ NOTICE */}
      <Section tone="deep" size="compact" className="border-t border-mist/12">
        <Container size="wide">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
              <Eyebrow>Governance Note</Eyebrow>
              <div className="space-y-5">
                <p className="leading-relaxed text-mist">
                  Leadership positions within IES carry defined responsibilities and reporting
                  expectations. National branches are organizational units of the same
                  international network — they are not independent legal entities, and holding a
                  national title does not confer authority beyond the responsibilities described
                  here.
                </p>
                <p className="leading-relaxed text-mist">
                  Questions about the organization’s structure or the scope of any role can be
                  directed to the Global Foundation.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CallToAction
        title="Take on a role within IES"
        body="Chapter officers, national branch positions, and Foundation roles open as the network grows."
        actions={[
          { label: 'Join IES', to: '/join', variant: 'primary' },
          { label: 'Contact Us', to: '/contact' },
        ]}
      />
    </>
  )
}
