import { Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { Split } from '@/components/ui/Editorial'
import { HorizontalStory } from '@/components/sections/HorizontalStory'
import { GhostTitle } from '@/components/ui/Cinematic'
import { LitText, MaskedText } from '@/components/ui/MaskedText'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { CallToAction } from '@/components/sections/CallToAction'
import { LeadershipMessages } from '@/components/sections/LeadershipMessages'
import { OrgChart } from '@/components/sections/OrgChart'
import { branches } from '@/content/branches'
import { site, threeAs, values } from '@/content/site'
import { differentiators } from '@/content/work'
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
        lead="The question was where you could take ethics seriously. Three years on: 1,200+ students across three countries."
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

      {/* ============================================= WHY IES EXISTS, AND HOW */}
      {/*
       * ONE SECTION WHERE THERE WERE TWO.
       *
       * "Our Story" and "Why IES Exists" were consecutive sections carrying one
       * idea between them: the organisation exists because school rewards
       * achievement and rarely asks what it is for, and it began when two
       * students decided to do something about that. Split across two screens,
       * the reason arrived after the history it explains.
       *
       * The claim leads now, in the left column, and the history follows in the
       * right as the answer to it. Nothing was cut — every sentence from both
       * sections is still here.
       */}
      <Section tone="deep">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <Reveal>
              <Eyebrow>Why IES Exists</Eyebrow>
              <h2 className="text-h2 mt-6 max-w-[18ch]">
                Students are taught to succeed. They are rarely asked to decide what success is
                for.
              </h2>
            </Reveal>

            <Reveal delay={120} className="space-y-7">
              <p className="text-lead text-paper">
                Schools are good at encouraging academic achievement. IES was founded for the
                rest of it — and for putting what a student concludes to work in their
                community.
              </p>
              <p className="leading-relaxed text-mist">
                It began in April 2023 as a student-led initiative in Korea, and grew into a
                network across dozens of schools and several countries. Growth was never the
                aim; it followed from the model working — students kept showing up, then
                wanted the same thing at their own schools.
              </p>
              <p className="leading-relaxed text-mist">
                As IES grew beyond Korea, the Global Foundation was established to connect the
                branches under one identity — it coordinates, it does not centralise. IES Korea
                remains the original branch and operational headquarters.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ============================================ FOUNDER AND PRESIDENT */}
      {/*
       * The two signed messages, placed after "Why IES Exists" and before
       * Values.
       *
       * They belong here and not next to "Our Story", which is the obvious
       * slot and the wrong one: the founder's message covers the same April
       * 2023 room the story does, and running them back to back makes the
       * second read as a restatement of the first. Set after the institutional
       * case instead, the pair does something the surrounding page cannot —
       * it puts a name and a face behind the argument the sections above make
       * in the organisation's voice, immediately before the values that
       * argument rests on.
       */}
      <LeadershipMessages />

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

      {/* ================================================= WHAT WE STAND FOR */}
      {/*
       * THE THREE A'S AND THE VALUES, IN ONE SECTION.
       *
       * The Three A's are the organisation's own framework — the test every
       * programme is held to, unchanged since 2023 — and they used to be a
       * three-panel pinned scene on the home page, three screens of sideways
       * scroll for three sentences. They belong here, where a reader has come
       * to find out what IES actually believes, and they belong on the reading
       * ground rather than in a scene.
       *
       * The nine values follow as a register beneath them rather than as their
       * own section. That is the relationship they actually have: the A's are
       * the framework, the values are the vocabulary, and running them as two
       * separate movements of the page made a reader compare two lists instead
       * of reading one idea.
       */}
      <Section tone="paper" className="overflow-hidden">
        <Container size="wide" className="relative">
          <GhostTitle>Ethics</GhostTitle>
          <div className="relative z-10">
            <Split
              aside={
                <Reveal>
                  <Eyebrow tone="navy">What We Stand For</Eyebrow>
                  <p className="mt-8 font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-none font-medium tracking-[-0.035em] text-navy">
                    The Three A’s
                  </p>
                  <p className="mt-8 max-w-[36ch] leading-relaxed text-navy-600">
                    The test every IES programme is held to — unchanged since 2023, applied
                    the same way in every branch.
                  </p>
                </Reveal>
              }
            >
              {/* `dt`/`dd`, so each pair is a described term rather than two
                  stacked paragraphs that only look related. Separated by a
                  hairline on the top edge — no boxes, as everywhere else. */}
              <dl>
                {threeAs.map((item, i) => (
                  <Reveal key={item.title} delay={Math.min(i, 3) * 80}>
                    <div
                      className="grid gap-x-10 gap-y-3 border-t py-8 sm:grid-cols-[minmax(0,15rem)_1fr]"
                      style={{ borderColor: 'var(--rule)' }}
                    >
                      <div>
                        <dt className="font-serif text-[1.5rem] leading-snug text-navy">
                          {item.title}
                        </dt>
                        <p className="text-label-sm mt-2 font-semibold text-[var(--accent)] uppercase">
                          {item.subtitle}
                        </p>
                      </div>
                      <dd className="leading-relaxed text-navy-600">{item.body}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>

              {/*
               * The values, as one register under the framework.
               *
               * Equity is set first and named as the one that organises the
               * rest — it is the value the third A is built on — and the other
               * eight follow as a plain tracked list. Eight equally-weighted
               * cells said all nine mattered the same amount, which is not
               * what the organisation says about them.
               */}
              <Reveal delay={240}>
                <div className="mt-16 border-t pt-8" style={{ borderColor: 'var(--rule)' }}>
                  <p className="text-label font-semibold text-navy/55 uppercase">Core Values</p>
                  <p className="mt-6 max-w-[52ch] leading-relaxed text-navy-600">
                    <strong className="font-semibold text-navy">{values.primary.title}</strong>{' '}
                    — {values.primary.body}
                  </p>
                  <p className="mt-6 max-w-[62ch] text-[0.9375rem] leading-relaxed text-navy-600">
                    {values.supporting.map((value) => value.title).join(' · ')}
                  </p>
                </div>
              </Reveal>
            </Split>
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
              lead="The Foundation coordinates and sets the standard. Each branch runs its own local work."
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
                  ],
                },
                {
                  heading: 'National branches are responsible for',
                  items: [
                    'Local programming and national events',
                    'Approving and supporting school chapters',
                    'National leadership and officer roles',
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
              IES has national branches in {branches.map((b) => b.country).join(', ')}.
              Branches are units of the same network, not independent legal entities.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CallToAction
        title="Every role here is held by a student."
        body="The fastest route in is your own school — and if there is no chapter there yet, that is the opening."
        actions={[
          { label: 'Join IES', to: '/join', variant: 'primary' },
          { label: 'Partner With Us', to: '/partners' },
        ]}
      />
    </>
  )
}
