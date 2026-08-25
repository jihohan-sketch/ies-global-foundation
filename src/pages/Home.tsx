import { Link, useNavigate } from 'react-router-dom'
import { Globe, type GlobeMarker } from '@/components/Globe'
import { Button, Card, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { GhostTitle, SectionIndex, Seam, Vignette } from '@/components/ui/Cinematic'
import { LitText, MaskedText } from '@/components/ui/MaskedText'
import { SceneLayer, Scrub } from '@/components/ui/Scrub'
import { StatBlock } from '@/components/ui/Counter'
import { PersonCard } from '@/components/sections/Cards'
import { CallToAction } from '@/components/sections/CallToAction'
import { StickyScene } from '@/components/sections/StickyScene'
import { NetworkScene } from '@/components/sections/NetworkScene'
import { WorkScene } from '@/components/sections/WorkScene'
import { GallerySection } from '@/components/sections/Media'
import { NamedPartners } from '@/components/sections/NamedPartners'
import { ValuePanels } from '@/components/sections/ValuePanels'
import { galleryItems } from '@/content/activities'
import { branches } from '@/content/branches'
import { headlineStats } from '@/content/impact'
import { personById } from '@/content/leadership'
import { site, values } from '@/content/site'
import { pillars } from '@/content/work'
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
       * Not a hero with an animation on it — the opening shot of a sequence.
       *
       * The section is a little over two screens tall and the frame inside it
       * pins, so everything that follows is one continuous move driven by the
       * wheel: the type clears, the world it was sitting on grows into the
       * frame, and the figures rise into the space the type left. Scroll back
       * up and it reassembles exactly. Nothing here is on a timer.
       *
       * All of it costs the scroll engine one registration. `StickyScene`
       * writes `--p` once on the frame; custom properties inherit, so every
       * layer below reads the same number and takes its own slice out of it
       * via `offset` and `fade`. Those two props are the scene's beat sheet.
       *
       * Opaque on purpose — this hero runs its own full-intensity globe, so the
       * shared ambient backdrop is masked out here rather than doubling up.
       */}
      <StickyScene
        vh={215}
        label="IES Global Foundation"
        className="bg-navy"
        frameClassName="bg-navy pt-32 pb-14 xl:pt-36"
      >
        {/* --- The world. Furthest back, and the only layer still moving when
            the scene releases. Centred and oversized, so the horizon runs off
            both edges: the visitor sees a piece of a world rather than a small
            ball on a page. It opens *into* full size rather than past it — a
            canvas scaled beyond 1 is resampled, and this one has the frame to
            itself at exactly the moment that would show. */}
        <SceneLayer
          hidden
          effect="scrub-open"
          grow={0.14}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <Globe
            markers={markers}
            draggable
            onSelect={(slug) => navigate(`/global-network/${slug}`)}
            intensity={1}
            className="h-[min(155vmin,72rem)] w-[min(155vmin,72rem)] opacity-70 sm:opacity-80"
          />
        </SceneLayer>

        {/* Two overlays doing two jobs. The vignette pulls the corners down so
            the globe reads as lit from within and stays for the whole scene;
            the horizontal wash sits only behind the centre band, which is the
            strip the headline occupies — so it leaves when the headline does,
            rather than greying the globe for the rest of the shot.

            Placed with `top-[calc(50%-13rem)]` rather than the obvious
            `top-1/2 -translate-y-1/2`: the scrub owns this element's transform,
            and a Tailwind translate utility on the same node is a second
            authority on the same property. Neither may eat pointer events —
            the globe beneath is draggable. */}
        <Vignette />
        <SceneLayer
          hidden
          effect="scrub-dissolve"
          offset={0.14}
          fade={0.44}
          travel="0px"
          className="pointer-events-none absolute inset-x-0 top-[calc(50%-13rem)] h-[26rem] bg-[linear-gradient(to_bottom,transparent,rgba(5,10,20,0.82)_28%,rgba(5,10,20,0.82)_72%,transparent)]"
        />

        {/* --- The type, clearing from the outside in.
            The eyebrow goes first and fastest, the supporting line and the
            controls follow, and the headline holds longest because it is the
            thing the visitor came to read. Each line travels a little further
            than the one before, which is what makes the group read as one
            movement rather than four things switching off in sequence.

            `pointer-events-none` on the whole column, restored only on the
            controls: everywhere else in the hero the drag reaches the globe. */}
        <Container size="wide" className="pointer-events-none relative z-10">
          <div className="text-center">
            <SceneLayer effect="scrub-dissolve" fade={0.28} travel="-26px">
              <Eyebrow className="justify-center">
                Founded 20 April 2023 · Seoul
              </Eyebrow>
            </SceneLayer>

            <SceneLayer effect="scrub-dissolve" offset={0.12} fade={0.54} travel="-72px">
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
            </SceneLayer>

            <SceneLayer effect="scrub-dissolve" offset={0.06} fade={0.34} travel="-42px">
              <p className="mx-auto mt-8 max-w-xl text-[0.9375rem] leading-relaxed font-light text-mist">
                {site.descriptor}
              </p>
            </SceneLayer>

            {/* `scene-exit`: these dissolve, and a dissolved button is still a
                click target and still a tab stop. See index.css. */}
            <SceneLayer
              effect="scrub-dissolve"
              offset={0.04}
              fade={0.3}
              travel="-34px"
              className="scene-exit"
            >
              <div className="pointer-events-auto mt-10 flex flex-wrap justify-center gap-4">
                <Button to="/global-network" variant="primary" arrow>
                  Explore the Network
                </Button>
                <Button to="/our-work" variant="secondary">
                  Discover Our Work
                </Button>
              </div>
            </SceneLayer>
          </div>
        </Container>

        {/* --- The figures, arriving into the space the type has left.
            The one layer in this scene that enters rather than leaves, and held
            back until the headline is most of the way gone — an arrival only
            reads as an arrival if there is somewhere for it to arrive. Four
            across at the widest, since `736,000+` needs the room the old
            three-up layout denied it. */}
        <Container size="wide" className="pointer-events-none relative z-10">
          <SceneLayer effect="scrub-rise" offset={0.46} travel="44px">
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
          </SceneLayer>
        </Container>

        <Seam edge="bottom" />
      </StickyScene>

      {/* ==================================================== INTRODUCTION */}
      {/* Back to ordinary vertical scrolling, and deliberately so — the hero
          was a held shot, this is a page again. The heading is one of the two
          statements on this page that assemble themselves; everything else
          here simply rises. */}
      <Section tone="deep" className="overflow-hidden border-y border-mist/12">
        <Container size="wide" className="relative">
          <GhostTitle className="-top-24">Origin</GhostTitle>
          <div className="relative z-10 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <div>
              <Scrub effect="scrub-rise">
                <SectionIndex index="01" label="Introduction" />
              </Scrub>
              <MaskedText
                className="text-h2 mt-6 text-paper"
                text={['A Global Network Rooted', 'in Ethical Leadership']}
              />
            </div>

            <div className="space-y-6">
              <Scrub effect="scrub-rise" offset={0.05}>
                <p className="text-lead font-light text-paper/90">
                  Founded in Seoul on 20 April 2023, the{' '}
                  <span className="text-paper">Interscholastic Ethics Society</span> has grown
                  from Korea’s largest student-led ethics organization into an international
                  youth network.
                </p>
              </Scrub>
              {/* The one paragraph on this page that lights as it is read.
                  It is the sentence that explains the whole structure of the
                  organisation, and giving it the treatment is a way of saying
                  so without setting it larger than everything around it. */}
              <LitText
                offset={0.12}
                className="leading-relaxed font-light text-mist"
                text={site.headquartersStatement}
              />
              <Scrub effect="scrub-rise" offset={0.18} className="pt-4">
                <Button to="/about" variant="ghost" arrow>
                  Learn about IES
                </Button>
              </Scrub>
            </div>
          </div>
        </Container>
      </Section>

      {/* ========================================================= NETWORK */}
      {/* First horizontal scene. The three branches are a set of three
          comparable things, which is exactly the shape a sideways pan reads
          well — one at a time, in order, at the same size. The heading stays
          in the vertical flow above it so the section announces itself before
          the pin takes the viewport. */}
      <Section id="network" size="compact" className="overflow-hidden">
        <Container size="wide">
          <Scrub effect="scrub-rise">
            <SectionHeading
              index="02"
              eyebrow="Global Presence"
              ghost="Network"
              title="One Foundation. Three National Branches."
              lead="Each branch brings the mission into its own community, connected by one international vision."
            />
          </Scrub>
        </Container>
      </Section>

      <NetworkScene />

      <Section size="compact" className="overflow-hidden">
        <Container size="wide">
          <Scrub effect="scrub-rise">
            <p className="max-w-2xl text-sm leading-relaxed font-light text-mist/80">
              The Foundation does not replace the branches. It connects them — shared
              standards and cross-border programming, each in its own national context.
            </p>
          </Scrub>
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
            <Scrub effect="scrub-rise">
              <SectionHeading
                index="03"
                eyebrow="Impact Snapshot"
                ghost="Scale"
                title="Scale, measured honestly."
              />
            </Scrub>

            {/* Three across, not five: `736,000+` is the widest figure in the
                set and overruns a fifth of this column between 1024px and
                1400px, colliding with the figure beside it.

                Each figure carries its own offset, so the row assembles left to
                right as the section rises rather than landing as a block. */}
            <dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
              {headlineStats.map((stat, i) => (
                <Scrub key={stat.label} effect="scrub-rise" offset={Math.min(i, 5) * 0.045}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <StatBlock stat={stat} />
                  </dd>
                </Scrub>
              ))}
            </dl>
          </div>

          <Scrub effect="scrub-rise" offset={0.1}>
            <p className="mt-14 border-t border-mist/15 pt-6 text-xs font-light text-mist/80">
              {site.statisticsNote}{' '}
              <Link to="/impact" className="text-paper underline underline-offset-4 hover:text-[var(--accent)]">
                See the full impact report
              </Link>
              .
            </p>
          </Scrub>
        </Container>
      </Section>

      {/* ======================================================== OUR WORK */}
      {/* Second horizontal scene, and the photographic one. Five areas of work,
          each panel a picture of that work actually happening. */}
      <Section size="compact" className="overflow-hidden">
        <Container size="wide">
          <Scrub effect="scrub-rise">
            <SectionHeading
              index="04"
              eyebrow="Our Work"
              ghost="Work"
              title="From Reflection to Action"
              lead="Forums, service, leadership programs, partnerships, and student-led civic engagement."
            />
          </Scrub>
        </Container>
      </Section>

      <WorkScene />

      {/* ========================================================= MISSION */}
      {/* The page's biggest statement, and the second and last place a headline
          assembles itself. Held at the centre of its own near-full screen with
          nothing else in it — the whitespace is the emphasis. */}
      <Section size="tall" className="overflow-hidden">
        <Container className="relative">
          {/* Raised almost entirely above the heading and cropped by the
              section edge. Centred behind a centred headline it competed with
              it directly, which is the one place a ghost must never sit. */}
          <GhostTitle align="center" className="-top-[0.5em] -translate-y-1/2">
            Mission
          </GhostTitle>
          <div className="relative z-10 text-center">
            <Scrub effect="scrub-rise">
              <Eyebrow className="justify-center">Our Mission</Eyebrow>
            </Scrub>

            <MaskedText
              className="text-h1 mx-auto mt-10 max-w-4xl font-serif leading-[1.15]"
              stagger={0.045}
              text={[
                'We help young people turn ethical',
                <>
                  reflection into{' '}
                  <span className="text-[var(--accent)] italic">meaningful action.</span>
                </>,
              ]}
            />

            <LitText
              offset={0.22}
              className="text-lead mx-auto mt-10 max-w-2xl font-light text-mist"
              text="Reflection that never leaves the seminar room is incomplete, and service without reflection is thin."
            />
          </div>

          <div className="relative z-10 mt-20 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Scrub key={pillar.id} effect="scrub-rise" offset={i * 0.06} className="h-full">
                <Card className="h-full p-8 sm:p-10">
                  <span className="font-serif text-sm text-[var(--accent)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-h3 mt-6">{pillar.title}</h3>
                  <p className="mt-5 text-[0.9375rem] leading-relaxed font-light text-mist">
                    {pillar.summary}
                  </p>
                </Card>
              </Scrub>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========================================================== VALUES */}
      {/* Quiet on purpose, and placed here on purpose: it is the last flat
          stretch before the third and final horizontal scene. */}
      <Section tone="deep" className="overflow-hidden border-y border-mist/12" size="compact">
        <Container size="wide" className="relative">
          <GhostTitle className="-top-24">Equity</GhostTitle>
          <div className="relative z-10 grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
            <div>
              <Scrub effect="scrub-rise">
                <Eyebrow>Core Value</Eyebrow>
              </Scrub>
              <Scrub effect="scrub-rise" offset={0.06}>
                <h2 className="metal mt-8 font-serif text-[clamp(3.5rem,9vw,7rem)] leading-none">
                  {values.primary.title}
                </h2>
              </Scrub>
              <Scrub effect="scrub-rise" offset={0.12}>
                <p className="mt-8 max-w-md leading-relaxed font-light text-mist">
                  {values.primary.body}
                </p>
              </Scrub>
            </div>

            <div>
              <Scrub effect="scrub-rise" offset={0.08}>
                <p className="text-[0.625rem] font-medium tracking-[0.3em] text-mist/80 uppercase">
                  Supporting Values
                </p>
              </Scrub>
              <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {values.supporting.map((value, i) => (
                  <Scrub
                    key={value.title}
                    as="li"
                    effect="scrub-rise"
                    offset={0.1 + Math.min(i, 7) * 0.025}
                    className="border-t border-mist/15 pt-4"
                  >
                    <h3 className="font-serif text-lg">{value.title}</h3>
                    <p className="mt-1.5 text-sm font-light text-mist">{value.body}</p>
                  </Scrub>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ======================================================= THREE A'S */}
      {/* Third horizontal scene, and the most abstract of the three — by this
          point the visitor has been taught how the pan behaves twice. */}
      <Section size="compact">
        <Container size="wide">
          <Scrub effect="scrub-rise">
            <SectionHeading
              index="05"
              eyebrow="Ethics in Action"
              title="The Three A’s"
              lead="The framework IES has worked from since 2023, carried into every branch."
            />
          </Scrub>
        </Container>
      </Section>

      <ValuePanels />

      {/* ====================================================== LEADERSHIP */}
      <Section tone="deep" className="overflow-hidden border-t border-mist/12">
        <Container size="wide">
          <Scrub effect="scrub-rise">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeading
                index="06"
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
          </Scrub>

          {/* Two-up at most: a third column would put every card under the
              width PersonCard needs to set its portrait beside the text. */}
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {leadershipPreview.map((person, i) => (
              <Scrub key={person.id} effect="scrub-rise" offset={i * 0.06}>
                <PersonCard person={person} />
              </Scrub>
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
