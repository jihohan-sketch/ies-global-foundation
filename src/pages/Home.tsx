import { Button, Container, Section, SectionHeading } from '@/components/ui/Primitives'
import { GhostTitle, SectionIndex } from '@/components/ui/Cinematic'
import { LitText, MaskedText } from '@/components/ui/MaskedText'
import { Scrub } from '@/components/ui/Scrub'
import { PersonCard } from '@/components/sections/Cards'
import { Split } from '@/components/ui/Editorial'
import { CallToAction } from '@/components/sections/CallToAction'
import { HomeHero } from '@/components/sections/HomeHero'
import { SectionRail, type RailSection } from '@/components/layout/SectionRail'
import { NetworkScene } from '@/components/sections/NetworkScene'
import { MissionScene } from '@/components/sections/MissionScene'
import { ImpactLedger } from '@/components/sections/ImpactLedger'
import { WorkScene } from '@/components/sections/WorkScene'
import { GallerySection } from '@/components/sections/Media'
import { NamedPartners } from '@/components/sections/NamedPartners'
import { ValuePanels } from '@/components/sections/ValuePanels'
import { galleryItems } from '@/content/activities'
import { personById } from '@/content/leadership'
import { site } from '@/content/site'
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
  { id: 'origin', label: 'Who We Are' },
  { id: 'why', label: 'Why We Exist' },
  { id: 'network', label: 'Where We Are' },
  { id: 'programmes', label: 'What It Looks Like' },
  { id: 'organizations', label: 'Who We Work With' },
  { id: 'impact', label: 'Impact' },
  { id: 'our-work', label: 'What We Do' },
  { id: 'three-as', label: 'How We Work' },
  { id: 'leadership', label: 'Who Runs It' },
]


export default function Home() {
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
       * One screen, two columns: the argument on the left, photographs of the
       * work on the right, the four headline figures across the foot.
       *
       * This used to be a `StickyScene` pinned for 165vh — a slogan dissolving
       * off a rotating globe, with the figures arriving at 46% of the pin. The
       * full reasoning for the replacement lives at the top of `HomeHero`; the
       * short version is that it cost a screen and a half to say one thing, put
       * the only evidence behind a scroll, and showed no students on a page
       * about students.
       */}
      <HomeHero />

      {/* ====================================================== WHO WE ARE */}
      {/*
       * The narrative order this page now follows, and it is the brief's:
       *
       *   WHO WE ARE → WHY WE EXIST → WHAT WE DO → OUR WORK
       *              → IMPACT → GET INVOLVED
       *
       * The page used to run introduction → branches → photographs →
       * organisations → figures → work → values → framework → leadership,
       * which is an *inventory of the organisation* rather than an argument.
       * A visitor could reach the fourth section without having been told why
       * IES exists. Every section below now does one job in that sequence, and
       * each one is a headline, a sentence or two, and then the specifics.
       */}
      <Section id="origin" tone="deep" className="overflow-hidden">
        <Container size="wide" className="relative">
          <GhostTitle>Who</GhostTitle>
          <div className="relative z-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <Scrub effect="scrub-rise">
                <SectionIndex index="01" label="Who We Are" />
              </Scrub>
              <MaskedText
                className="text-h2 mt-5 text-paper"
                text={['Students who argue', 'for a living.']}
              />
            </div>

            <div className="space-y-6">
              <Scrub effect="scrub-rise" offset={0.05}>
                <p className="text-lead text-paper">
                  The Interscholastic Ethics Society was founded in Seoul on 20 April 2023 by
                  two students. It is now Korea’s largest student-led ethics organization and
                  runs in three countries.
                </p>
              </Scrub>
              {/* The one paragraph on this page that lights as it is read.
                  It is the sentence that explains the whole structure of the
                  organisation, and giving it the treatment is a way of saying
                  so without setting it larger than everything around it. */}
              <LitText
                offset={0.12}
                className="leading-relaxed text-mist"
                text="Every role in IES is held by a student — including the ones that carry real consequences. Adults advise; students decide, run the programmes, and answer for how they went."
              />
              <Scrub effect="scrub-rise" offset={0.18}>
                <p className="text-[0.9375rem] leading-relaxed text-mist">
                  {site.headquartersStatement}
                </p>
              </Scrub>
              <Scrub effect="scrub-rise" offset={0.22} className="pt-2">
                <Button to="/about" variant="ghost" arrow>
                  Learn about IES
                </Button>
              </Scrub>
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================================================== WHY WE EXIST */}
      {/*
       * The section the page was missing, and the reason the rest of it makes
       * sense. It is deliberately the shortest on the page: one statement, one
       * paragraph. Nothing here is new material — the argument is the one the
       * About page already makes, compressed to the two sentences a visitor
       * needs before they are shown the programmes.
       *
       * On paper, because it is the first thing on this page that has to be
       * *read* rather than watched, and because a light slab between the
       * introduction and the network is the cheapest possible way to say
       * "different kind of section".
       */}
      <Section id="why" tone="paper" className="overflow-hidden">
        <Container size="wide">
          <Split
            aside={
              <Scrub effect="scrub-rise">
                <SectionIndex index="02" label="Why We Exist" tone="dark" />
              </Scrub>
            }
          >
            <MaskedText
              as="h2"
              className="text-h2 max-w-[20ch] text-navy"
              text={['Students are taught to succeed.', 'They are rarely asked to', 'decide what success is for.']}
            />
            <Scrub effect="scrub-rise" offset={0.12}>
              <p className="text-lead mt-8 max-w-[52ch] text-navy-600">
                Schools are good at rewarding achievement and offer far fewer chances to
                take ethics, service and civic responsibility seriously. IES was founded to
                build those settings — and to insist that what a student concludes in one
                shows up in what they do afterwards.
              </p>
            </Scrub>
          </Split>
        </Container>
      </Section>

      {/* ========================================================= NETWORK */}
      {/* First horizontal scene. The three branches are a set of three
          comparable things, which is exactly the shape a sideways pan reads
          well — one at a time, in order, at the same size. The heading stays
          in the vertical flow above it so the section announces itself before
          the pin takes the viewport. */}
      {/* The qualifier that used to follow the pan — "the Foundation does not
          replace the branches" — is part of this heading now.
          It was a 185px section containing one paragraph, sitting between the
          end of a pinned scene and the start of a gallery, which is the shape
          this page had too much of: a whole movement of the page spent on a
          sentence. It belongs with the claim it qualifies, not a scene away
          from it. */}
      <Section id="network" size="compact" className="overflow-hidden">
        <Container size="wide">
          <Scrub effect="scrub-rise">
            <SectionHeading
              index="03"
              eyebrow="Where We Are"
              ghost="Network"
              title="One society, three countries."
              lead={
                <>
                  <span className="block">
                    Korea is the original branch and the operational headquarters. The United
                    States and the United Kingdom run their own programming to the same
                    standards.
                  </span>
                  <span className="mt-4 block text-[0.9375rem] text-mist">
                    The Foundation does not replace the branches. It sets the standards they
                    share and runs the programming that crosses between them; everything local
                    is the branch’s own.
                  </span>
                </>
              }
            />
          </Scrub>
        </Container>
      </Section>

      <NetworkScene />

      {/* ========================================================= GALLERY */}
      {/* Deliberately not directly under the hero. Who IES is and how the three
          branches relate come first; by this point a visitor has the context to
          read the photographs as evidence rather than as decoration. */}
      <GallerySection id="programmes" index="04" items={galleryItems} />

      {/* ============================================== ORGANIZATIONS */}
      {/* Directly after the photographs on purpose: the images show the work,
          and this says who was in the room for it. Separated they are two
          claims; together they are one piece of evidence. */}
      <NamedPartners id="organizations" index="05" />

      {/* ======================================================== OUR WORK */}
      {/* Second horizontal scene, and the photographic one. Five areas of work,
          each panel a picture of that work actually happening. */}
      <Section id="our-work" size="compact" className="overflow-hidden">
        <Container size="wide">
          <Scrub effect="scrub-rise">
            <SectionHeading
              index="06"
              eyebrow="What We Do"
              ghost="Work"
              title="Five kinds of work."
              lead="Ethics forums, community service, leadership roles with real consequences, civic campaigns, and programming that runs across all three branches."
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

      {/* ======================================================= THREE A'S */}
      {/* No longer a horizontal scene, and no longer preceded by a heading
          section of its own — it carries both now. Three values of two
          sentences each did not justify three screens of pin, and it was the
          third pan on the page; see the note at the top of `ValuePanels`. */}
      <ValuePanels id="three-as" index="07" />

      {/* ============================================================ IMPACT */}
      {/*
       * MOVED, AND THE MOVE IS THE POINT.
       *
       * The figures used to sit in the middle of the page, between the
       * photographs and the description of the work — which asked a visitor to
       * accept a number for something they had not yet been told the shape of.
       * A claim about scale only means anything once the reader knows what is
       * being counted, so the ledger now comes *after* the five programme
       * areas and the framework they are held to, and immediately before the
       * invitation to join. That is the order the brief asks for: what we do,
       * then what it added up to, then how to take part.
       */}
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
      <ImpactLedger index="08" />

      {/* ====================================================== LEADERSHIP */}
      <Section id="leadership" tone="deep" className="overflow-hidden">
        <Container size="wide">
          <Scrub effect="scrub-rise">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeading
                index="09"
                eyebrow="Who Runs It"
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

      {/*
       * THE CLOSING ASK, DESCRIBED RATHER THAN LABELLED.
       *
       * The three destinations are unchanged; what changed is that each one now
       * says who it is for before it says where it goes. The sentence that used
       * to carry all three conditions — "if your school already has a chapter …
       * if it does not … if you are an organization" — was doing the work of
       * three columns in one paragraph, above three buttons whose labels
       * repeated none of it. A reader had to hold the paragraph in their head
       * and map it onto the buttons themselves. See the `routes` note in
       * `CallToAction`.
       */}
      <CallToAction
        title="Three ways in."
        body="Every one of them leads to real responsibility rather than a membership list. Pick the one that matches what you actually want to take on."
        routes={[
          {
            audience: 'Students',
            title: 'Join as a student',
            body: 'If your school already has an IES chapter, join it — programming runs week to week, and officer roles open to members who want them.',
            linkLabel: 'See the pathways',
            to: '/join',
          },
          {
            audience: 'Students without a chapter',
            title: 'Start a chapter',
            body: 'The most demanding way in and the one with the most ownership. You will need a founding team and a plan for your school’s first year.',
            linkLabel: 'See the process',
            to: '/start-a-chapter',
          },
          {
            audience: 'Schools and organizations',
            title: 'Partner with us',
            body: 'Partnerships are scoped in writing, against the same conduct and participant safety standards as our own programming.',
            linkLabel: 'Start a conversation',
            to: '/partners',
          },
        ]}
        actions={[
          { label: 'Join IES', to: '/join', variant: 'primary' },
          { label: 'Contact the team', to: '/contact' },
        ]}
      />
    </>
  )
}
