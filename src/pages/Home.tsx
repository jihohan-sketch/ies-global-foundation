import { Link, useNavigate } from 'react-router-dom'
import { Globe, type GlobeMarker } from '@/components/Globe'
import { Button, Card, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { GhostTitle, Seam, Vignette } from '@/components/ui/Cinematic'
import { Reveal } from '@/components/ui/Reveal'
import { RailItem, ScrollRail } from '@/components/ui/ScrollRail'
import { StatBlock } from '@/components/ui/Counter'
import { BranchCard, PersonCard } from '@/components/sections/Cards'
import { CallToAction } from '@/components/sections/CallToAction'
import { GallerySection } from '@/components/sections/Media'
import { NamedPartners } from '@/components/sections/NamedPartners'
import { ValuePanels } from '@/components/sections/ValuePanels'
import { galleryItems } from '@/content/activities'
import { branches } from '@/content/branches'
import { headlineStats } from '@/content/impact'
import { personById } from '@/content/leadership'
import { site, values } from '@/content/site'
import { featuredWork, pillars } from '@/content/work'
import { useSeo } from '@/lib/seo'

const markers: GlobeMarker[] = branches.map((branch) => ({
  id: branch.slug,
  label: branch.name,
  lat: branch.point.lat,
  lon: branch.point.lon,
}))

export default function Home() {
  const navigate = useNavigate()

  useSeo({
    title: 'IES Global Foundation — Building Ethical Leaders Across Borders',
    description:
      'The IES Global Foundation connects students, schools, and national branches in Korea, the United States, and the United Kingdom through education, service, civic responsibility, and international collaboration.',
    path: '/',
  })

  /*
   * Named explicitly rather than indexed off the tier lists. Those lists are
   * ordered by the source array, so inserting anyone into `leadership.ts`
   * silently reshuffled who the home page featured — a positional pick is not
   * an editorial one. `filter(Boolean)` still guards against an id being
   * renamed out from under this.
   */
  const leadershipPreview = [
    personById('sean-han'),
    personById('joseph-hahmmin-kang'),
    personById('ryan-cha'),
    personById('jaesuh-joshua-shin'),
  ].filter((person) => person !== undefined)

  return (
    <>
      {/* ============================================================ HERO */}
      {/*
       * Staged rather than laid out: the globe is the subject, centred and
       * full-bleed, and the type sits *in* the frame with it rather than beside
       * it. That is the whole difference between a hero with an illustration in
       * it and a hero that reads as a shot.
       *
       * Opaque on purpose — this hero runs its own full-intensity globe, so the
       * shared ambient backdrop is masked out here rather than doubling up.
       */}
      <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden bg-navy pt-36 pb-16 xl:pt-44">
        {/* Centred and oversized, so the horizon runs off both edges. The
            visitor sees a piece of a world rather than a small ball on a page. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <Globe
            markers={markers}
            draggable
            onSelect={(slug) => navigate(`/global-network/${slug}`)}
            intensity={1}
            className="h-[min(155vmin,72rem)] w-[min(155vmin,72rem)] opacity-70 sm:opacity-80"
          />
        </div>

        {/* Two overlays doing two jobs. The vignette pulls the corners down so
            the globe reads as lit from within; the horizontal wash sits only
            behind the centre band, which is the strip the headline occupies.
            Neither may eat pointer events — the globe beneath is draggable. */}
        <Vignette />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 h-[26rem] -translate-y-1/2 bg-[linear-gradient(to_bottom,transparent,rgba(5,10,20,0.82)_28%,rgba(5,10,20,0.82)_72%,transparent)]"
        />

        {/* `pointer-events-none` on the whole column, restored only on the
            controls. Everywhere else in the hero the drag reaches the globe. */}
        <Container size="wide" className="pointer-events-none relative z-10">
          <div className="text-center">
            <Reveal>
              <Eyebrow className="justify-center">
                Founded 20 April 2023 · Seoul
              </Eyebrow>
            </Reveal>

            <Reveal delay={140}>
              {/*
               * The site's one genuinely ceremonial line, so it takes the
               * cinematic register: wide-tracked serif capitals, second line
               * filled with the metallic gradient.
               *
               * Tracking is applied to the right of every glyph, the last one
               * included, which pushes a centred line half a step left. Each
               * line takes that step back with its own negative margin.
               */}
              <h1 className="mt-9 font-serif font-light uppercase">
                <span className="block -mr-[0.18em] text-[clamp(1.5rem,4.6vw,3.6rem)] leading-[1.25] tracking-[0.18em] text-paper/92">
                  Building Ethical Leaders
                </span>
                <span className="metal mt-3 block -mr-[0.2em] text-[clamp(1.9rem,6.6vw,5.4rem)] leading-[1.1] tracking-[0.2em]">
                  Across Borders
                </span>
              </h1>
            </Reveal>

            <Reveal delay={280}>
              <p className="mx-auto mt-8 max-w-xl text-[0.9375rem] leading-relaxed font-light text-mist">
                {site.descriptor}
              </p>
            </Reveal>

            <Reveal delay={380}>
              <div className="pointer-events-auto mt-10 flex flex-wrap justify-center gap-4">
                <Button to="/global-network" variant="primary" arrow>
                  Explore the Network
                </Button>
                <Button to="/our-work" variant="secondary">
                  Discover Our Work
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>

        {/* Headline figures, pinned to the foot of the frame as a caption strip
            rather than stacked under the buttons. Four across at the widest,
            since `736,000+` needs the room the old three-up layout denied it. */}
        <Container size="wide" className="pointer-events-none relative z-10">
          <Reveal delay={520}>
            <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-8 border-t border-mist/12 pt-8 sm:grid-cols-4">
              {headlineStats.slice(0, 4).map((stat) => (
                <div key={stat.label} className="text-center">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-serif text-[1.75rem] text-paper sm:text-[2rem]">
                      {stat.value.toLocaleString('en-US')}
                      {stat.suffix}
                    </span>
                    <span className="mt-2 block text-[0.5625rem] font-medium tracking-[0.28em] text-mist/80 uppercase">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>

        <Seam edge="bottom" />
      </section>

      {/* ==================================================== INTRODUCTION */}
      <Section tone="deep" className="overflow-hidden border-y border-mist/12">
        <Container size="wide" className="relative">
          <GhostTitle className="-top-24">Origin</GhostTitle>
          <div className="relative z-10 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <Reveal>
              <SectionHeading
                index="01"
                eyebrow="Introduction"
                title="A Global Network Rooted in Ethical Leadership"
              />
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
      <Section id="network" className="overflow-hidden">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="Global Presence"
              ghost="Network"
              title="One Foundation. Three National Branches."
              lead="Each branch brings the mission into its own community, connected by one international vision."
            />
          </Reveal>

          {/* Three items: a grid, not a rail. A rail with exactly three cards
              clips the third at the container edge, which reads as a broken
              layout rather than as an invitation to scroll. */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {branches.map((branch, i) => (
              <Reveal key={branch.slug} delay={i * 110} className="h-full">
                <BranchCard branch={branch} index={i} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed font-light text-mist/80">
              The Foundation does not replace the branches. It connects them — shared
              standards and cross-border programming, each in its own national context.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ========================================================= GALLERY */}
      {/* Deliberately not directly under the hero. Who IES is and how the three
          branches relate come first; by this point a visitor has the context to
          read the photographs as evidence rather than as decoration. */}
      <GallerySection items={galleryItems} />

      {/* ============================================== ORGANIZATIONS */}
      {/* Directly after the photographs on purpose: the images show the work,
          and this says who was in the room for it. Separated they are two
          claims; together they are one piece of evidence. */}
      <NamedPartners />

      {/* ================================================== IMPACT SNAPSHOT */}
      {/*
       * Dark, not the bright `paper` interlude this used to be. A full-bleed
       * white slab between two near-black sections is a cut, and the page reads
       * as a sequence of shots rather than a stack of slides — the one thing a
       * cut here destroys. The figures get their separation from the raised
       * `deep` ground and the ghost behind them instead.
       */}
      <Section tone="deep" size="compact" className="overflow-hidden border-y border-mist/12">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-20">
            <Reveal>
              <SectionHeading
                index="04"
                eyebrow="Impact Snapshot"
                ghost="Scale"
                title="Scale, measured honestly."
              />
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
                      <StatBlock stat={stat} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <p className="mt-14 border-t border-mist/15 pt-6 text-xs font-light text-mist/80">
              {site.statisticsNote}{' '}
              <Link to="/impact" className="text-paper underline underline-offset-4 hover:text-[var(--accent)]">
                See the full impact report
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ========================================================= MISSION */}
      <Section size="tall" className="overflow-hidden">
        <Container className="relative">
          {/* Raised almost entirely above the heading and cropped by the
              section edge. Centred behind a centred headline it competed with
              it directly, which is the one place a ghost must never sit. */}
          <GhostTitle align="center" className="-top-[0.5em] -translate-y-1/2">
            Mission
          </GhostTitle>
          <Reveal className="relative z-10 text-center">
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

          <div className="relative z-10 mt-20 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.id} delay={i * 120} className="h-full">
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
            ))}
          </div>
        </Container>
      </Section>

      {/* ========================================================== VALUES */}
      <Section tone="deep" className="overflow-hidden border-y border-mist/12" size="compact">
        <Container size="wide" className="relative">
          <GhostTitle className="-top-24">Equity</GhostTitle>
          <div className="relative z-10 grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
            <Reveal>
              <Eyebrow>Core Value</Eyebrow>
              <h2 className="metal mt-8 font-serif text-[clamp(3.5rem,9vw,7rem)] leading-none">
                {values.primary.title}
              </h2>
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

      {/* ======================================================= THREE A'S */}
      <Section size="compact">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              index="05"
              eyebrow="Ethics in Action"
              title="The Three A’s"
              lead="The framework IES has worked from since 2023, carried into every branch."
            />
          </Reveal>
        </Container>
      </Section>

      <ValuePanels />

      {/* =================================================== FEATURED WORK */}
      <Section className="overflow-hidden">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              index="06"
              eyebrow="Our Work"
              ghost="Work"
              title="From Reflection to Action"
              lead="Forums, service, leadership programs, partnerships, and student-led civic engagement."
            />
          </Reveal>

          {/* Five items against a container that fits three, so this one always
              has somewhere to scroll. */}
          <ScrollRail label="what IES does" className="mt-16">
            {featuredWork.map((item, i) => (
              <RailItem key={item.title}>
                <Reveal delay={i * 70} className="h-full">
                  <Card interactive className="group h-full">
                    <Link to={item.href} className="flex h-full flex-col p-8">
                      <span className="font-serif text-sm text-[var(--accent)]/70">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="mt-6 block font-serif text-[1.375rem] leading-snug transition-colors duration-300 group-hover:text-[var(--accent)]">
                        {item.title}
                      </span>
                      <span className="mt-4 block flex-1 text-[0.9375rem] leading-relaxed font-light text-mist">
                        {item.body}
                      </span>
                      <span className="mt-8 inline-flex items-center gap-2 text-[0.6875rem] font-medium tracking-[0.2em] text-paper/85 uppercase transition-colors group-hover:text-[var(--accent)]">
                        Explore
                        <span
                          aria-hidden
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </Link>
                  </Card>
                </Reveal>
              </RailItem>
            ))}
          </ScrollRail>
        </Container>
      </Section>

      {/* ====================================================== LEADERSHIP */}
      <Section tone="deep" className="overflow-hidden border-t border-mist/12">
        <Container size="wide">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeading
                index="07"
                eyebrow="Leadership"
                ghost="Leaders"
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
