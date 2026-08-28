import { useNavigate } from 'react-router-dom'
import { Globe, type GlobeMarker } from '@/components/Globe'
import { Button, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { GhostTitle, SectionIndex, Seam, Vignette } from '@/components/ui/Cinematic'
import { LitText, MaskedText } from '@/components/ui/MaskedText'
import { SceneLayer, Scrub } from '@/components/ui/Scrub'
import { PersonCard } from '@/components/sections/Cards'
import { CallToAction } from '@/components/sections/CallToAction'
import { StickyScene } from '@/components/sections/StickyScene'
import { SectionRail, type RailSection } from '@/components/layout/SectionRail'
import { NetworkScene } from '@/components/sections/NetworkScene'
import { MissionScene } from '@/components/sections/MissionScene'
import { ImpactLedger } from '@/components/sections/ImpactLedger'
import { WorkScene } from '@/components/sections/WorkScene'
import { GallerySection } from '@/components/sections/Media'
import { NamedPartners } from '@/components/sections/NamedPartners'
import { ValuePanels } from '@/components/sections/ValuePanels'
import { galleryItems } from '@/content/activities'
import { branches } from '@/content/branches'
import { headlineStats } from '@/content/impact'
import { personById } from '@/content/leadership'
import { site, values } from '@/content/site'
import { useSeo } from '@/lib/seo'

/*
 * The page's movements, in order, for the left-margin rail.
 *
 * Kept here rather than inside `SectionRail` because it is a fact about *this
 * page* — the rail is a component, the running order is editorial. Every id
 * below has to exist on a section in the markup; a missing one is silently
 * skipped by the observer rather than throwing, which is the right failure for
 * a decorative indicator but does mean this list is worth reading against the
 * page when a section moves.
 */
const railSections: readonly RailSection[] = [
  { id: 'origin', label: 'Introduction' },
  { id: 'network', label: 'Global Presence' },
  { id: 'programmes', label: 'Programmes' },
  { id: 'organizations', label: 'Organizations' },
  { id: 'impact', label: 'Impact' },
  { id: 'our-work', label: 'Our Work' },
  { id: 'mission', label: 'Mission' },
  { id: 'three-as', label: 'Ethics in Action' },
  { id: 'leadership', label: 'Leadership' },
]

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
      <SectionRail sections={railSections} />

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
        /* 165, down from 185. The hero's last beat — the figures rising into
           the space the type left — lands at `offset={0.46}` and is settled
           well before the scene releases, so the final third of the old pin
           was a held frame with nothing left to do in it. */
        vh={165}
        label="IES Global Foundation"
        className="bg-navy"
        /* `xl:pt-44`, not `pt-36`. At xl the header is not one bar but two —
           the 6rem primary row plus the nav rail under it — which comes to
           roughly 9.5rem before the rail collapses on scroll. At 9rem the
           hero's eyebrow landed *inside* the rail, so "Founded 20 April 2023 ·
           Seoul" sat on top of the Gallery and Leadership links on the first
           screen of the site. 11rem clears the pair with air to spare. */
        frameClassName="bg-navy pt-32 pb-28 xl:pt-44 xl:pb-32"
      >
        {/* --- The world. Furthest back, and the only layer still moving when
            the scene releases. It opens *into* full size rather than past it —
            a canvas scaled beyond 1 is resampled, and this one has the frame to
            itself at exactly the moment that would show.

            SIZED TO FIT, WHICH IS THE WHOLE POINT.

            This was `min(155vmin, 72rem)` — a 1152px box in an 837px viewport,
            putting the drawn sphere at about 102% of the frame with its top and
            bottom cut off. The intent was "a piece of a world rather than a
            small ball on a page", and what it produced was neither: a circle
            whose silhouette leaves the frame stops reading as a sphere and
            becomes a faint field of graticule behind the type. The curved edge
            is the only thing that says *globe*, and it was the part not on
            screen.

            NOTE THE TWO FACTORS BETWEEN THIS NUMBER AND WHAT IS DRAWN, because
            they are not obvious and they compound:

              · `scrub-open` holds the layer at `1 − grow` at rest — 0.86 here.
              · `Globe` draws its sphere at about 0.86 of its own box, leaving
                the remainder for the atmosphere glow.

            The exact figure, since the brief asks for one and the two factors
            are easy to get wrong by eye:

              sphere diameter = box × (1 − 2·SPHERE_INSET) × (1 − grow)
                              = box × 0.88 × 0.86
                              = box × 0.757

            At `95vh` the box is 0.95 of the frame, so the sphere sits at
            **72% of the hero's height at rest** — inside the 65–75% the brief
            asks for, horizon visible all the way round with air above and
            below — and opens toward 84% as the scene runs, which is the "opens
            into full size" move this layer has always made.

            Both constants are load-bearing and both live elsewhere:
            `SPHERE_INSET` in Globe.tsx and `grow` on the `SceneLayer` below.
            Change either and this number moves.

            `86vw` keeps it inside a narrow screen, where the binding constraint
            is width rather than height.

            Opacity up from .70/.80 — enough that the continents and graticule
            read as structure rather than as texture, short of the point where
            it starts competing with the headline sitting on it. */}
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
            /* Up from 0.86/0.96. The brief asks for the globe to be *clearly*
               visible and to hold roughly 65–75% of the hero's height, which
               the sizing below already does — what it did not do was survive
               the wash sitting over its middle. At full opacity the continents
               read as structure behind the type rather than as a texture the
               eye keeps trying to resolve. */
            className="h-[min(95vh,86vw,50rem)] w-[min(95vh,86vw,50rem)] opacity-[0.94] sm:opacity-100"
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
          /* Re-fitted to the smaller headline: 26rem of wash was sized to a
             type block a third taller than the one there now, and left over
             the globe it is no longer protecting. Lighter, too — the band only
             has to hold the type off the graticule, and at 0.82 it was flatting
             the middle of the sphere into a grey stripe. */
          className="pointer-events-none absolute inset-x-0 top-[calc(50%-9.5rem)] h-[19rem] bg-[linear-gradient(to_bottom,transparent,rgba(5,10,20,0.7)_30%,rgba(5,10,20,0.7)_70%,transparent)]"
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

            <SceneLayer
              effect="scrub-dissolve-x"
              offset={0.12}
              fade={0.54}
              travel="-72px"
              /* The ceremonial line leaves *across* the frame as well as up —
                 the one gesture in the scene that moves sideways, on the line
                 that says "Across Borders". Small: 4vw over the whole exit is a
                 drift, and anything more turns a departure into a slide. */
              span="4vw"
            >
              {/*
               * The site's one genuinely ceremonial line, so it takes the
               * cinematic register: wide-tracked serif capitals, second line
               * filled with the metallic gradient.
               *
               * Tracking is applied to the right of every glyph, the last one
               * included, which pushes a centred line half a step left. Each
               * line takes that step back with its own negative margin.
               *
               * SIZE. Both lines are down about 30% from where they were
               * (3.6rem / 5.4rem at the cap). At the old size the headline
               * measured 91% of the viewport width and ran edge to edge across
               * the middle of the globe, so the sphere was only ever visible in
               * the corners. The register is unchanged — same face, same
               * tracking, same metal on the second line — it simply no longer
               * occupies the whole frame, which is what lets the thing behind
               * it be seen. The lower bounds come down further still, because
               * a phone has the least room to spare and the globe has to
               * survive there too.
               */}
              <h1 className="mt-10 font-serif font-light uppercase">
                <span className="block -mr-[0.18em] text-[clamp(1.05rem,3.2vw,2.5rem)] leading-[1.3] tracking-[0.18em] text-paper/92">
                  Building Ethical Leaders
                </span>
                <span className="metal mt-3 block -mr-[0.2em] text-[clamp(1.35rem,4.6vw,3.75rem)] leading-[1.12] tracking-[0.2em]">
                  Across Borders
                </span>
              </h1>
            </SceneLayer>

            <SceneLayer effect="scrub-dissolve" offset={0.06} fade={0.34} travel="-42px">
              {/*
               * SECOND IN THE HIERARCHY, AND NOW SET LIKE IT.
               *
               * 15px light grey under a 60px headline is not a supporting line,
               * it is a caption — and it was carrying the only plain-English
               * sentence on the first screen explaining what this organisation
               * actually is. At `text-lead` in `paper/90` it reads as the
               * second thing on the page rather than the fifth.
               *
               * `max-w-2xl` over the old `max-w-xl` because the line got
               * bigger; the measure is what matters, not the box, and 36rem at
               * 22px was breaking a two-line sentence into four.
               */}
              <p className="text-lead mx-auto mt-8 max-w-2xl text-center text-paper/90">
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
              <div className="pointer-events-auto mt-12 flex flex-wrap justify-center gap-4">
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
            three-up layout denied it.

            ABSOLUTELY POSITIONED, AND THAT IS A BUG FIX RATHER THAN A LAYOUT
            PREFERENCE.

            This block used to sit in the flow underneath the type column. The
            frame centres its content, so those ~160px counted toward the
            centred stack even though the figures are invisible until the scene
            is nearly half over — and once the stack grew taller than the frame's
            content box (which it did as soon as the descriptor was set at lead
            size), the overflow split evenly top and bottom and pushed the
            eyebrow *up into the fixed header*. On a 1470×760 window "Founded 20
            April 2023 · Seoul" was rendering across the nav rail's GLOBAL
            NETWORK and OUR WORK.

            Out of the flow, the type column centres on its own and the figures
            arrive where the note above says they do — in the space the type has
            left, at the foot of the frame. The `bottom-24` clears the scroll cue
            below it, and the two never share the screen anyway: the cue is gone
            by 0.16 and these do not begin arriving until 0.46. */}
        <Container
          size="wide"
          className="pointer-events-none absolute inset-x-0 bottom-24 z-10"
        >
          <SceneLayer effect="scrub-rise" offset={0.46} travel="44px">
            {/*
             * TERTIARY, AND THE LABEL IS NOW THE READABLE HALF.
             *
             * `dt` was `sr-only` and the visible label was a 9px caption under
             * the figure, which inverted the pair: a sighted reader met `42+`
             * with no idea what it counted until they had decoded a line of
             * tracked capitals below it. The label is real markup again, at a
             * legible size, and the figure carries the accent on its suffix the
             * same way the impact ledger does — one treatment for a statistic
             * across the whole site.
             */}
            <dl className="mx-auto grid max-w-4xl grid-cols-2 gap-x-8 gap-y-8 border-t border-mist/20 pt-8 sm:grid-cols-4">
              {headlineStats.slice(0, 4).map((stat) => (
                <div key={stat.label} className="text-center">
                  <dd className="font-serif text-[1.875rem] font-medium text-paper tabular-nums lining-nums sm:text-[2.25rem]">
                    {stat.value.toLocaleString('en-US')}
                    <span className="text-[var(--accent)]">{stat.suffix}</span>
                  </dd>
                  <dt className="text-label-sm mt-2 font-semibold text-mist uppercase">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </SceneLayer>
        </Container>

        {/* --- The invitation to leave.
            A hero that pins for most of two screens has one honest problem: a
            held frame and a page that has not moved yet look identical, so a
            visitor can read a stopped page as a finished one. This says which
            it is, and then gets out of the way — `fade={0.16}` means it is gone
            within the first sixth of the scene, before the type has finished
            clearing. It is the shortest-lived layer in the hero on purpose:
            once the page is demonstrably moving, an instruction to move it is
            just something else on the screen.

            Absolutely positioned rather than in flow, so it cannot push the
            type block off centre, and `hidden` because it is scenery — a
            screen-reader user is not navigating by scroll cue. */}
        <SceneLayer
          hidden
          effect="scrub-dissolve"
          fade={0.16}
          travel="-14px"
          className="pointer-events-none absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-3"
        >
          <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-slate uppercase">
            Scroll to explore
          </span>
          {/* A rule that fades out downward rather than an arrow glyph: the
              hero's whole register is hairlines and tracked capitals, and a ↓
              is the one piece of UI furniture in it. */}
          <span className="block h-12 w-px bg-[linear-gradient(to_bottom,var(--accent),transparent)] opacity-70" />
        </SceneLayer>

        <Seam edge="bottom" />
      </StickyScene>

      {/* ==================================================== INTRODUCTION */}
      {/* Back to ordinary vertical scrolling, and deliberately so — the hero
          was a held shot, this is a page again. The heading is one of the two
          statements on this page that assemble themselves; everything else
          here simply rises. */}
      <Section id="origin" tone="deep" className="overflow-hidden border-y border-mist/12">
        <Container size="wide" className="relative">
          <GhostTitle>Origin</GhostTitle>
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
                <p className="text-lead text-paper/90">
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
                className="leading-relaxed text-mist"
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
            <p className="max-w-2xl text-sm leading-relaxed text-mist">
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
      <GallerySection id="programmes" items={galleryItems} />

      {/* ============================================== ORGANIZATIONS */}
      {/* Directly after the photographs on purpose: the images show the work,
          and this says who was in the room for it. Separated they are two
          claims; together they are one piece of evidence. */}
      <NamedPartners id="organizations" />

      {/* ================================================== IMPACT SNAPSHOT */}
      {/*
       * Dark, not the bright `paper` interlude this used to be. A full-bleed
       * white slab between two near-black sections is a cut, and the page reads
       * as a sequence of shots rather than a stack of slides — the one thing a
       * cut here destroys.
       *
       * The figures themselves moved out into `ImpactLedger`, where they are set
       * at display scale on full-width rows instead of packed into a grid at
       * subheading size. See the note at the top of that file.
       */}
      <ImpactLedger />

      {/* ======================================================== OUR WORK */}
      {/* Second horizontal scene, and the photographic one. Five areas of work,
          each panel a picture of that work actually happening. */}
      <Section id="our-work" size="compact" className="overflow-hidden">
        <Container size="wide">
          <Scrub effect="scrub-rise">
            <SectionHeading
              index="05"
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
      {/*
       * The page's biggest statement, and the only one given a screen of its own
       * to be made in. `MissionScene` pins, crosses `Reflection` and `Action`
       * past each other, assembles the sentence they were lifted out of, and
       * then lays the three pillars out as a full-width ledger rather than as
       * three bordered cards. Its beat sheet is documented in that file.
       */}
      <MissionScene />

      {/* ========================================================== VALUES */}
      {/* Quiet on purpose, and placed here on purpose: it is the last flat
          stretch before the third and final horizontal scene. */}
      <Section tone="deep" className="overflow-hidden border-y border-mist/12" size="compact">
        <Container size="wide" className="relative">
          <GhostTitle>Equity</GhostTitle>
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
                <p className="mt-8 max-w-md leading-relaxed text-mist">
                  {values.primary.body}
                </p>
              </Scrub>
            </div>

            <div>
              <Scrub effect="scrub-rise" offset={0.08}>
                <p className="text-[0.75rem] font-semibold tracking-[0.14em] text-mist uppercase">
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
                    <p className="mt-1.5 text-sm text-mist">{value.body}</p>
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
      <Section id="three-as" size="compact">
        <Container size="wide">
          <Scrub effect="scrub-rise">
            <SectionHeading
              index="06"
              eyebrow="Ethics in Action"
              title="The Three A’s"
              lead="The framework IES has worked from since 2023, carried into every branch."
            />
          </Scrub>
        </Container>
      </Section>

      <ValuePanels />

      {/* ====================================================== LEADERSHIP */}
      <Section id="leadership" tone="deep" className="overflow-hidden border-t border-mist/12">
        <Container size="wide">
          <Scrub effect="scrub-rise">
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
          </Scrub>

          {/* Four-up, where it used to be two.
              `PersonCard` was a landscape card that set its portrait *beside*
              the text and needed half the row to do it; it is a portrait tile
              now, and four across is both the number of people in the preview
              and the shape that reads as a row of faces rather than as two
              large panels. */}
          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
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
