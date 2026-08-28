import { Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { Split } from '@/components/ui/Editorial'
import { HorizontalStory } from '@/components/sections/HorizontalStory'
import { GhostTitle } from '@/components/ui/Cinematic'
import { LitText, MaskedText } from '@/components/ui/MaskedText'
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
        title="Two students, one question, April 2023."
        lead="They wanted somewhere to argue ethics properly — prepared, in public, against people who disagreed. Three years on that is a society of 1,200+ students across three countries, and every role in it is still held by a student."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* ====================================================== THE STATEMENT */}
      {/*
       * ONE SENTENCE, AND NOTHING ELSE ON THE SCREEN.
       *
       * The About page used to open on a two-column grid of three paragraphs,
       * which is a perfectly good way to present history and a poor way to
       * begin. A reader arriving at "About" is asking one question — *what is
       * this organisation for* — and the organisation has had a four-word
       * answer to it since 2023.
       *
       * So the answer goes first, at display scale, with the explanation
       * arriving underneath as the reader scrolls into it. Nothing here is
       * newly written: `missionMotto` is the existing motto, already used in
       * the header epigraph and the footer, and the supporting line is the
       * mission statement that was three sections further down.
       *
       * `MaskedText` is the site's one self-assembling headline treatment and
       * the note on that component asks for at most two per page. This is the
       * first; the second is the Values heading further down.
       */}
      <Section className="overflow-hidden" size="tall">
        <Container size="wide">
          <Reveal>
            <Eyebrow>The Idea</Eyebrow>
          </Reveal>

          <MaskedText
            as="h2"
            className="mt-10 max-w-[14ch] font-serif text-[clamp(2.75rem,8.5vw,7rem)] leading-[0.98] font-medium tracking-[-0.03em] text-paper"
            text={[site.missionMotto]}
          />

          {/* Deliberately offset to the right and held to a narrow measure.
              A statement that runs edge to edge and an explanation that starts
              at the same left margin read as one block of text; starting the
              explanation two-thirds across says plainly that it is subordinate
              to the line above it, before a word of it is read. */}
          <div className="mt-14 lg:mt-20 lg:pl-[46%]">
            <LitText
              offset={0.08}
              className="text-lead text-paper"
              text={site.mission}
            />
            <Reveal delay={140}>
              <p className="mt-6 text-mist">{site.vision}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ======================================================= OUR STORY */}
      <Section tone="deep">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[0.6fr_1.4fr] lg:gap-24">
            <Reveal>
              <Eyebrow>Our Story</Eyebrow>
            </Reveal>

            <Reveal delay={100} className="space-y-7">
              <p className="text-lead text-paper">
                Founded in April 2023, IES began as a student-led initiative in Korea focused
                on ethics, education, and youth service.
              </p>
              <p className="leading-relaxed text-mist">
                What started as a local community grew into a network involving students from
                dozens of schools and multiple countries. Growth was not the original aim. It
                followed from the fact that the model worked: students given a serious setting
                for ethical inquiry, and a real expectation that inquiry would lead to action,
                kept showing up — and then wanted to build the same thing at their own schools.
              </p>
              <p className="leading-relaxed text-mist">
                As IES expanded beyond Korea, the IES Global Foundation was established to
                connect national branches under one international identity and shared mission.
                The Foundation coordinates; it does not centralise. {site.headquartersStatement}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ====================================================== WHY IES EXISTS */}
      <Section>
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
              <p className="leading-relaxed text-mist">
                Schools are effective at encouraging academic achievement. They offer far fewer
                opportunities to engage seriously with ethics, responsibility, service, and
                civic leadership — the questions that determine what an education is eventually
                used for.
              </p>
              <p className="leading-relaxed text-mist">
                IES was founded to create those opportunities: settings where students argue
                about difficult questions and are expected to defend their reasoning, and
                programs where the conclusions they reach are put to work in their communities.
              </p>
              <p className="leading-relaxed text-mist">
                The organization is youth-led by design. Students do not participate in someone
                else's programming; they run it, and they answer for the results.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/*
       * MISSION AND VISION USED TO SIT HERE AS A PAIR OF BORDERED CARDS.
       *
       * They have moved to the statement section at the top of the page, which
       * is where a reader looks for them. Repeating both verbatim in the middle
       * of the page was the clearest example on the site of a section that
       * existed because the content had to go somewhere rather than because the
       * page needed it there — and two large bordered cards side by side is
       * exactly the "TITLE / TEXT / CARD / CARD" shape the redesign is meant to
       * get rid of.
       */}

      {/* ========================================================== VALUES */}
      {/* Dark rather than the bright `paper` interlude this used to be — see the
          note on the matching section in Home.tsx. */}
      {/* ========================================================== VALUES */}
      {/*
       * The reading ground, and the asymmetric split the site uses for a
       * "one thing that organises the others" relationship. The eight
       * supporting values were an eight-cell grid, which gave every one of
       * them the same weight as Equity — the value that is supposed to
       * organise the rest.
       */}
      <Section tone="paper" className="overflow-hidden">
        <Container size="wide" className="relative">
          <GhostTitle>Values</GhostTitle>
          <div className="relative z-10">
            <Split
              aside={
                <Reveal>
                  <Eyebrow tone="navy">Core Values</Eyebrow>
                  <p className="mt-8 font-serif text-[clamp(3rem,7vw,5.5rem)] leading-none font-medium tracking-[-0.035em] text-navy">
                    {values.primary.title}
                  </p>
                  <p className="mt-8 max-w-[36ch] leading-relaxed text-navy-600">
                    {values.primary.body}
                  </p>
                </Reveal>
              }
            >
              <Reveal delay={140}>
                <p className="text-label font-semibold text-navy/55 uppercase">
                  Supporting Values
                </p>
              </Reveal>
              <ul className="mt-8 grid gap-x-14 sm:grid-cols-2">
                {values.supporting.map((value, i) => (
                  <Reveal
                    key={value.title}
                    as="li"
                    delay={Math.min(i, 7) * 60}
                    className="border-t py-5"
                  >
                    <h3 className="font-serif text-[1.25rem] text-navy">{value.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-navy-600">
                      {value.body}
                    </p>
                  </Reveal>
                ))}
              </ul>
            </Split>
          </div>
        </Container>
      </Section>

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
                    <p className="mt-4 leading-relaxed text-mist">
                      {pillar.summary}
                    </p>
                  </div>
                  <div>
                    <p className="leading-relaxed text-paper">{pillar.body}</p>
                    <ul className="mt-6 space-y-2">
                      {pillar.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-[0.9375rem] text-mist"
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
      {/*
       * Five commitments, panned.
       *
       * They were six cells of a three-column card grid — five commitments and
       * a hole — set at 20px in boxes, which is the layout that guarantees
       * nobody reads past the second. Each of these is a *claim about how the
       * organisation behaves*, which is the kind of sentence that has to be
       * read one at a time and at a size that says it is meant seriously.
       */}
      <HorizontalStory
        label="What makes IES different"
        eyebrow="What Makes IES Different"
        title="Five commitments we hold to."
        lead="Not aspirations. Each of these is a rule the organisation can be held to, and each one rules something out."
        wordmark="Different"
        panels={differentiators.map((item, i) => ({
          id: `differentiator-${i}`,
          title: item.title,
          body: item.body,
        }))}
      />

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

          {/*
           * WHO DOES WHAT, AS TWO COLUMNS OF A SPREAD RATHER THAN TWO CARDS.
           *
           * The pair is a comparison — the whole point is reading one list
           * against the other — and two bordered boxes side by side actively
           * work against that: the border draws a wall down the middle of the
           * exact comparison the reader is trying to make. A shared hairline
           * above each column and nothing else lets the eye cross freely.
           */}
          <Reveal delay={200}>
            <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-20">
              {[
                {
                  heading: 'The Global Foundation is responsible for',
                  items: [
                    'International coordination between branches',
                    'Cross-border initiatives and joint programming',
                    'Global partnerships and institutional relationships',
                    'Branding, identity, and organizational standards',
                    'Branch development and responsible future expansion',
                  ],
                },
                {
                  heading: 'National branches are responsible for',
                  items: [
                    'Local programming and national events',
                    'Approving and supporting school chapters',
                    'National leadership and officer roles',
                    'Outreach to schools and community organizations',
                    'Meeting IES conduct and participant safety standards',
                  ],
                },
              ].map((column) => (
                <div key={column.heading}>
                  <h3 className="border-t pt-6 font-serif text-[1.375rem] leading-snug text-paper">
                    {column.heading}
                  </h3>
                  <ul className="mt-7 space-y-4">
                    {column.items.map((item) => (
                      <li key={item} className="flex gap-4 text-[0.9375rem] leading-relaxed text-mist">
                        <span
                          aria-hidden
                          className="mt-3 h-px w-4 shrink-0 bg-[var(--accent)]/60"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-10 max-w-3xl border-t border-mist/15 pt-6 text-sm leading-relaxed text-slate">
              IES currently maintains national branches in {branches.map((b) => b.country).join(', ')}.
              Branches are organizational units of the same international network, not independent
              legal entities.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CallToAction
        title="Every role here is held by a student."
        body="Including the ones that carry consequences. If you want one, the fastest route in is your own school — and if there is no chapter there yet, that is the opening."
        actions={[
          { label: 'Join IES', to: '/join', variant: 'primary' },
          { label: 'Partner With Us', to: '/partners' },
        ]}
      />
    </>
  )
}
