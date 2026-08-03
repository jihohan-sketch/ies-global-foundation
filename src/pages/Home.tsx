import { Link } from 'react-router-dom'
import { Globe, type GlobeMarker } from '@/components/Globe'
import { Button, Card, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { RailItem, ScrollRail } from '@/components/ui/ScrollRail'
import { StatBlock } from '@/components/ui/Counter'
import { BranchCard, PersonCard } from '@/components/sections/Cards'
import { CallToAction } from '@/components/sections/CallToAction'
import { branches } from '@/content/branches'
import { headlineStats } from '@/content/impact'
import { foundingLeadership, nationalLeadership } from '@/content/leadership'
import { site, threeAs, values } from '@/content/site'
import { featuredWork, pillars } from '@/content/work'
import { useSeo } from '@/lib/seo'

const markers: GlobeMarker[] = branches.map((branch) => ({
  id: branch.slug,
  label: branch.name,
  lat: branch.point.lat,
  lon: branch.point.lon,
}))

export default function Home() {
  useSeo({
    title: 'IES Global Foundation — Building Ethical Leaders Across Borders',
    description:
      'The IES Global Foundation connects students, schools, and national branches in Korea, the United States, and the United Kingdom through education, service, civic responsibility, and international collaboration.',
    path: '/',
  })

  const leadershipPreview = [foundingLeadership[0], nationalLeadership[0], foundingLeadership[1]].filter(
    Boolean,
  )

  return (
    <>
      {/* ============================================================ HERO */}
      {/* Opaque on purpose: this hero has its own full-intensity globe, so the
          shared backdrop is masked out here rather than doubling up. */}
      <section className="relative flex min-h-dvh items-center overflow-hidden bg-navy pt-32 pb-20">
        {/* Globe sits behind the copy on small screens, beside it on large. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center lg:left-auto lg:w-[58%] lg:justify-end lg:pr-[2vw]"
        >
          <Globe
            markers={markers}
            intensity={1}
            className="h-[min(140vw,54rem)] w-[min(140vw,54rem)] opacity-45 sm:opacity-55 lg:opacity-100"
          />
        </div>

        {/* Kept, unlike the other overlays: this one earns its place by holding
            the headline legible over the globe rather than decorating it. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(7,26,51,0.92)_0%,rgba(7,26,51,0.7)_45%,transparent_80%)]"
        />

        <Container size="wide" className="relative">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Founded 20 April 2023 · Korea · United States · United Kingdom</Eyebrow>
            </Reveal>

            <Reveal delay={110}>
              <h1 className="text-display mt-8">
                Building Ethical
                <br />
                Leaders <span className="text-[var(--accent)] italic">Across Borders</span>
              </h1>
            </Reveal>

            <Reveal delay={220}>
              <p className="text-lead mt-9 max-w-xl font-light text-mist">
                Connecting students, schools, and national branches through education,
                service, and international collaboration.
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-11 flex flex-wrap gap-4">
                <Button to="/global-network" variant="primary" arrow>
                  Explore Our Global Network
                </Button>
                <Button to="/our-work" variant="secondary">
                  Discover Our Work
                </Button>
              </div>
            </Reveal>

            <Reveal delay={420}>
              <dl className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-mist/15 pt-8">
                {headlineStats.slice(0, 3).map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="font-serif text-3xl text-paper sm:text-4xl">
                        {stat.value.toLocaleString('en-US')}
                        {stat.suffix}
                      </span>
                      <span className="mt-2 block text-[0.6875rem] font-medium tracking-[0.16em] text-mist uppercase">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ==================================================== INTRODUCTION */}
      <Section tone="deep" className="border-y border-mist/12">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <Reveal>
              <Eyebrow>Introduction</Eyebrow>
              <h2 className="text-h2 mt-6">A Global Network Rooted in Ethical Leadership</h2>
            </Reveal>

            <Reveal delay={120} className="space-y-6">
              <p className="text-lead font-light text-paper/90">
                Founded in Seoul on 20 April 2023, the{' '}
                <span className="text-paper">Interscholastic Ethics Society</span> has grown
                from Korea’s largest student-led ethics organization into an international
                youth network.
              </p>
              <p className="leading-relaxed font-light text-mist">
                {site.headquartersStatement}
              </p>
              <div className="pt-4">
                <Button to="/about" variant="ghost" arrow>
                  Learn about IES
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ========================================================= NETWORK */}
      <Section id="network">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Global Presence"
              title="One Foundation. Three National Branches."
              lead="Each branch brings the mission into its own community, connected by one international vision."
            />
          </Reveal>

          <ScrollRail label="the national branches" className="mt-16">
            {branches.map((branch, i) => (
              <RailItem key={branch.slug}>
                <Reveal delay={i * 110} className="h-full">
                  <BranchCard branch={branch} index={i} />
                </Reveal>
              </RailItem>
            ))}
          </ScrollRail>

          <Reveal delay={200}>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed font-light text-mist/80">
              The Foundation does not replace the branches. It connects them — shared
              standards and cross-border programming, each in its own national context.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ================================================== IMPACT SNAPSHOT */}
      <Section tone="paper" size="compact">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-20">
            <Reveal>
              <Eyebrow tone="navy">Impact Snapshot</Eyebrow>
              <h2 className="text-h2 mt-6 text-navy">Scale, measured honestly.</h2>
            </Reveal>

            <Reveal delay={120}>
              {/* Three across, not five: `736,000+` is the widest figure in the
                  set and overruns a fifth of this column between 1024px and
                  1400px, colliding with the figure beside it. */}
              <dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
                {headlineStats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <StatBlock stat={stat} tone="light" />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <p className="mt-14 border-t border-navy/12 pt-6 text-xs font-light text-navy-700/60">
              {site.statisticsNote}{' '}
              <Link to="/impact" className="text-navy underline underline-offset-4 hover:text-[var(--accent)]">
                See the full impact report
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ========================================================= MISSION */}
      <Section size="tall">
        <Container className="relative">
          <Reveal className="text-center">
            <Eyebrow className="justify-center">Our Mission</Eyebrow>
            <h2 className="text-h1 mx-auto mt-10 max-w-4xl font-serif leading-[1.15]">
              We help young people turn ethical reflection into{' '}
              <span className="text-[var(--accent)] italic">meaningful action.</span>
            </h2>
            <p className="text-lead mx-auto mt-10 max-w-2xl font-light text-mist">
              Reflection that never leaves the seminar room is incomplete, and service
              without reflection is thin.
            </p>
          </Reveal>

          <ScrollRail label="the organizational pillars" className="mt-20">
            {pillars.map((pillar, i) => (
              <RailItem key={pillar.id}>
                <Reveal delay={i * 120} className="h-full">
                <Card className="h-full p-8 sm:p-10">
                  <span className="font-serif text-sm text-[var(--accent)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-h3 mt-6">{pillar.title}</h3>
                  <p className="mt-5 text-[0.9375rem] leading-relaxed font-light text-mist">
                    {pillar.summary}
                  </p>
                </Card>
                </Reveal>
              </RailItem>
            ))}
          </ScrollRail>
        </Container>
      </Section>

      {/* ========================================================== VALUES */}
      <Section tone="deep" className="border-y border-mist/12" size="compact">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
            <Reveal>
              <Eyebrow>Core Value</Eyebrow>
              <h2 className="mt-8 font-serif text-[clamp(3.5rem,9vw,7rem)] leading-none text-[var(--accent)]">
                {values.primary.title}
              </h2>
              <p className="mt-8 max-w-md leading-relaxed font-light text-mist">
                {values.primary.body}
              </p>
            </Reveal>

            <Reveal delay={140}>
              <p className="text-[0.6875rem] font-medium tracking-[0.24em] text-mist/70 uppercase">
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

      {/* ======================================================= THREE A'S */}
      <Section size="compact">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Ethics in Action"
              title="The Three A’s"
              lead="The framework IES has worked from since 2023, carried into every branch."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {threeAs.map((item, i) => (
              <Reveal key={item.title} delay={i * 110}>
                <Card className="h-full p-8 sm:p-10">
                  <span className="font-serif text-4xl text-[var(--accent)]/80">A{i + 1}</span>
                  <h3 className="text-h3 mt-6">{item.title}</h3>
                  <p className="mt-2 text-[0.8125rem] font-medium tracking-[0.12em] text-[var(--accent)] uppercase">
                    {item.subtitle}
                  </p>
                  <p className="mt-5 text-[0.9375rem] leading-relaxed font-light text-mist">
                    {item.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* =================================================== FEATURED WORK */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Our Work"
              title="From Reflection to Action"
              lead="Forums, service, leadership programs, partnerships, and student-led civic engagement."
            />
          </Reveal>

          <div className="mt-16 border-t border-mist/15">
            {featuredWork.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <Link
                  to={item.href}
                  className="group grid grid-cols-[auto_1fr] items-center gap-6 border-b border-mist/15 py-7 transition-colors hover:bg-navy-700/40 sm:grid-cols-[4rem_1fr_auto] sm:gap-10 sm:px-4"
                >
                  <span className="font-serif text-sm text-[var(--accent)]/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block font-serif text-[1.375rem] transition-colors group-hover:text-[var(--accent)] sm:text-[1.6rem]">
                      {item.title}
                    </span>
                    <span className="mt-2 block max-w-xl text-[0.9375rem] font-light text-mist">
                      {item.body}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="col-start-2 text-mist transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent)] sm:col-start-3"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ====================================================== LEADERSHIP */}
      <Section tone="deep" className="border-t border-mist/12">
        <Container size="wide">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeading
                eyebrow="Leadership"
                title="Students holding real responsibility."
                lead="Students lead at every level — founding, Foundation, and each national branch."
                className="max-w-2xl"
              />
              <Button to="/leadership" variant="secondary">
                All Leadership
              </Button>
            </div>
          </Reveal>

          {/* Two-up at most: a third column would put every card under the
              width PersonCard needs to set its portrait beside the text. */}
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {leadershipPreview.map((person, i) => (
              <Reveal key={person.id} delay={i * 110}>
                <PersonCard person={person} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CallToAction
        title="Join a Growing Global Network"
        body="Whether you are a student, educator, organization, or prospective partner, there is a place for you within our global network."
        actions={[
          { label: 'Join IES', to: '/join', variant: 'primary' },
          { label: 'Start a Chapter', to: '/start-a-chapter' },
          { label: 'Partner With Us', to: '/partners' },
        ]}
      />
    </>
  )
}
