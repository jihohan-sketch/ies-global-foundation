import { Card, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { PersonCard } from '@/components/sections/Cards'
import { CallToAction } from '@/components/sections/CallToAction'
import { branches } from '@/content/branches'
import {
  foundingLeadership,
  globalOffices,
  leadershipIntro,
  nationalLeadership,
  personById,
} from '@/content/leadership'
import { initials } from '@/lib/utils'
import { useSeo } from '@/lib/seo'

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
        title="Students holding real responsibility."
        lead="IES is led by students at every level. Roles exist because work needs doing — we do not create titles to fill a page."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Leadership' }]}
      />

      {/* =============================================== FOUNDING LEADERSHIP */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Founding Leadership"
              title="The founders of IES"
              lead={leadershipIntro.founding}
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {foundingLeadership.map((person, i) => (
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
                              src={holder.photo}
                              alt=""
                              loading="lazy"
                              className="aspect-square w-28 shrink-0 self-start rounded-[3px] object-cover sm:w-32"
                            />
                          ) : (
                            <span
                              aria-hidden
                              className="flex aspect-square w-28 shrink-0 items-center justify-center self-start rounded-[3px] border border-[var(--accent)]/35 font-serif text-2xl text-[var(--accent)] sm:w-32"
                            >
                              {initials(holder.name)}
                            </span>
                          )}
                          <div className="min-w-0">
                            <p className="text-[0.9375rem] font-light text-paper/90">
                              {holder.name}
                              {holder.koreanName && (
                                <span className="ml-2 font-light text-mist">
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
                            {/* Only officers whose sole appearance is this card
                                carry their biography here. A founder or a
                                national officer already has a PersonCard
                                further up or down the same page, and printing
                                the same paragraph twice reads as a bug. */}
                            {holder.tier === 'global' && (
                              <p className="mt-4 text-[0.875rem] leading-relaxed font-light text-mist">
                                {holder.bio}
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="text-[0.8125rem] font-light text-mist/70 italic">
                          Appointment to be confirmed.
                        </p>
                      )}
                    </div>

                    <ul className="mt-5 space-y-2">
                      {group.flatMap((office) => office.responsibilities).map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-[0.875rem] font-light text-mist"
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
            <p className="mt-16 max-w-2xl border-t border-mist/15 pt-6 text-sm leading-relaxed font-light text-mist/70">
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
                <p className="leading-relaxed font-light text-mist">
                  Leadership positions within IES carry defined responsibilities and reporting
                  expectations. National branches are organizational units of the same
                  international network — they are not independent legal entities, and holding a
                  national title does not confer authority beyond the responsibilities described
                  here.
                </p>
                <p className="leading-relaxed font-light text-mist">
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
