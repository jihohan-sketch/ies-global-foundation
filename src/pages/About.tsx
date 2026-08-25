import { Card, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { GhostTitle } from '@/components/ui/Cinematic'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { CallToAction } from '@/components/sections/CallToAction'
import { OrgChart } from '@/components/sections/OrgChart'
import { branches } from '@/content/branches'
import { site, values } from '@/content/site'
import { differentiators, pillars } from '@/content/work'
import { useSeo } from '@/lib/seo'

export default function About() {
  useSeo({
    title: 'About',
    description:
      'IES was founded in April 2023 as a student-led initiative in Korea and has grown into an international youth network. Learn how the Global Foundation connects its national branches.',
    path: '/about',
  })

  return (
    <>
      <PageHero
        eyebrow="About IES"
        ghost="About"
        title="An international youth organization built around ethical leadership."
        lead="IES began in Korea in April 2023. It is now a network of branches, chapters, and student leaders across three countries."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* ======================================================= OUR STORY */}
      <Section>
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[0.6fr_1.4fr] lg:gap-24">
            <Reveal>
              <Eyebrow>Our Story</Eyebrow>
            </Reveal>

            <Reveal delay={100} className="space-y-7">
              <p className="text-lead font-light text-paper/90">
                Founded in April 2023, IES began as a student-led initiative in Korea focused
                on ethics, education, and youth service.
              </p>
              <p className="leading-relaxed font-light text-mist">
                What started as a local community grew into a network involving students from
                dozens of schools and multiple countries. Growth was not the original aim. It
                followed from the fact that the model worked: students given a serious setting
                for ethical inquiry, and a real expectation that inquiry would lead to action,
                kept showing up — and then wanted to build the same thing at their own schools.
              </p>
              <p className="leading-relaxed font-light text-mist">
                As IES expanded beyond Korea, the IES Global Foundation was established to
                connect national branches under one international identity and shared mission.
                The Foundation coordinates; it does not centralise. {site.headquartersStatement}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ====================================================== WHY IES EXISTS */}
      <Section tone="deep" className="border-y border-mist/12">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <Eyebrow>Why IES Exists</Eyebrow>
              <h2 className="text-h2 mt-6">
                Students are taught to succeed. They are rarely asked to decide what success is
                for.
              </h2>
            </Reveal>

            <Reveal delay={120} className="space-y-6">
              <p className="leading-relaxed font-light text-mist">
                Schools are effective at encouraging academic achievement. They offer far fewer
                opportunities to engage seriously with ethics, responsibility, service, and
                civic leadership — the questions that determine what an education is eventually
                used for.
              </p>
              <p className="leading-relaxed font-light text-mist">
                IES was founded to create those opportunities: settings where students argue
                about difficult questions and are expected to defend their reasoning, and
                programs where the conclusions they reach are put to work in their communities.
              </p>
              <p className="leading-relaxed font-light text-mist">
                The organization is youth-led by design. Students do not participate in someone
                else's programming; they run it, and they answer for the results.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ================================================ MISSION AND VISION */}
      <Section>
        <Container size="wide">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <Card className="h-full p-10 sm:p-14">
                <Eyebrow>Mission</Eyebrow>
                <p className="mt-8 font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.35]">
                  {site.mission}
                </p>
              </Card>
            </Reveal>

            <Reveal delay={120}>
              <Card className="h-full p-10 sm:p-14">
                <Eyebrow>Vision</Eyebrow>
                <p className="mt-8 font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.35]">
                  {site.vision}
                </p>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ========================================================== VALUES */}
      {/* Dark rather than the bright `paper` interlude this used to be — see the
          note on the matching section in Home.tsx. */}
      <Section tone="deep" className="overflow-hidden border-y border-mist/12">
        <Container size="wide" className="relative">
          <GhostTitle className="-top-[0.5em] -translate-y-1/2">Values</GhostTitle>
          <div className="relative z-10 grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
            <Reveal>
              <Eyebrow>Core Values</Eyebrow>
              <p className="metal mt-8 font-serif text-[clamp(3rem,7vw,5.5rem)] leading-none">
                {values.primary.title}
              </p>
              <p className="mt-8 max-w-md leading-relaxed font-light text-mist">
                {values.primary.body}
              </p>
            </Reveal>

            <Reveal delay={140}>
              <p className="text-[0.625rem] font-medium tracking-[0.3em] text-mist/80 uppercase">
                Supporting Values
              </p>
              <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {values.supporting.map((value) => (
                  <li key={value.title} className="border-t border-mist/15 pt-4">
                    <h3 className="font-serif text-lg">{value.title}</h3>
                    <p className="mt-1.5 text-sm font-light text-mist">{value.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ========================================================= PILLARS */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Organizational Pillars"
              title="Three areas of work, held together."
              lead="Every IES program sits within one of these pillars, and the strongest ones sit across all three."
            />
          </Reveal>

          <div className="mt-16 space-y-px">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.id} delay={i * 110}>
                <div className="grid gap-8 border-t border-mist/15 py-10 lg:grid-cols-[auto_1fr_1fr] lg:gap-16">
                  <span className="font-serif text-sm text-[var(--accent)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-h3">{pillar.title}</h3>
                    <p className="mt-4 leading-relaxed font-light text-mist">
                      {pillar.summary}
                    </p>
                  </div>
                  <div>
                    <p className="leading-relaxed font-light text-paper/78">{pillar.body}</p>
                    <ul className="mt-6 space-y-2">
                      {pillar.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-[0.9375rem] font-light text-mist"
                        >
                          <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-[var(--accent)]/60" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================================================== DIFFERENTIATORS */}
      <Section tone="deep" className="border-y border-mist/12">
        <Container size="wide">
          <Reveal>
            <SectionHeading eyebrow="What Makes IES Different" title="Five commitments we hold to." />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <Card className="h-full p-8">
                  <h3 className="font-serif text-xl leading-snug">{item.title}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed font-light text-mist">
                    {item.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ====================================================== STRUCTURE */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Organizational Structure"
              title="How the network fits together."
              lead="The Global Foundation sets international direction and coordinates branches. Each branch runs its own local work within that shared mission and standard."
            />
          </Reveal>

          <Reveal delay={140}>
            <OrgChart className="mt-16" />
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              <Card className="p-8">
                <h3 className="font-serif text-xl">The Global Foundation is responsible for</h3>
                <ul className="mt-5 space-y-2.5">
                  {[
                    'International coordination between branches',
                    'Cross-border initiatives and joint programming',
                    'Global partnerships and institutional relationships',
                    'Branding, identity, and organizational standards',
                    'Branch development and responsible future expansion',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-[0.9375rem] font-light text-mist">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-[var(--accent)]/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-8">
                <h3 className="font-serif text-xl">National branches are responsible for</h3>
                <ul className="mt-5 space-y-2.5">
                  {[
                    'Local programming and national events',
                    'Approving and supporting school chapters',
                    'National leadership and officer roles',
                    'Outreach to schools and community organizations',
                    'Meeting IES conduct and participant safety standards',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-[0.9375rem] font-light text-mist">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-[var(--accent)]/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-10 max-w-3xl border-t border-mist/15 pt-6 text-sm leading-relaxed font-light text-mist/75">
              IES currently maintains national branches in {branches.map((b) => b.country).join(', ')}.
              Branches are organizational units of the same international network, not independent
              legal entities.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CallToAction
        title="Help Build the Next Chapter of IES"
        body="Whether you are a student, educator, organization, or prospective partner, there is a place for you within our global network."
        actions={[
          { label: 'Join IES', to: '/join', variant: 'primary' },
          { label: 'Partner With Us', to: '/partners' },
        ]}
      />
    </>
  )
}
