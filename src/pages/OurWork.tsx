import { Container, Eyebrow, Section } from '@/components/ui/Primitives'
import { IndexList, Split, Statement } from '@/components/ui/Editorial'
import { LitText, MaskedText } from '@/components/ui/MaskedText'
import { Scrub } from '@/components/ui/Scrub'
import { PageHero } from '@/components/sections/PageHero'
import { CallToAction } from '@/components/sections/CallToAction'
import { HorizontalStory } from '@/components/sections/HorizontalStory'
import { ActivityFeed } from '@/components/sections/Activities'
import { activities, activityPhotoCount } from '@/content/activities'
import { pillars, workCategories } from '@/content/work'
import { useSeo } from '@/lib/seo'

export default function OurWork() {
  useSeo({
    title: 'Our Work',
    description:
      'IES programs across education and ethics, community service, leadership development, civic responsibility, and global collaboration.',
    path: '/our-work',
  })

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        ghost="Work"
        title="From Reflection to Action"
        lead="Five areas of work: ethics forums, community service, leadership roles, civic campaigns, and cross-branch programming. Each one ends in something a student is answerable for."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Our Work' }]}
      />

      {/* ========================================================== PILLARS */}
      {/*
       * A light ground, and the first one a visitor meets on this page.
       *
       * The three pillars used to be three cards in a row, which said "here
       * are three equal things" and nothing else. They are not three equal
       * things to *look at* — they are the frame the rest of the page hangs
       * off — so they get the reading ground and the register that goes with
       * it: a sticky label column on the left, and the pillars themselves as a
       * numbered register down the right at heading scale.
       */}
      <Section tone="paper">
        <Container size="wide">
          <Split
            aside={
              <>
                <Scrub effect="scrub-rise">
                  <Eyebrow tone="navy">Organizational Pillars</Eyebrow>
                </Scrub>
                <MaskedText
                  as="h2"
                  className="text-h2 mt-8 max-w-[11ch] text-navy"
                  text={['Three pillars,', 'one standard.']}
                />
                <Scrub effect="scrub-rise" offset={0.1}>
                  <p className="mt-8 max-w-[38ch] text-navy-600">
                    Everything IES runs sits under one of these three. They are how a chapter
                    decides whether a proposed programme is IES work or simply a good idea.
                  </p>
                </Scrub>
              </>
            }
          >
            <IndexList
              tone="dark"
              items={pillars.map((pillar) => ({
                id: pillar.id,
                title: pillar.title,
                body: pillar.summary,
              }))}
            />
          </Split>
        </Container>
      </Section>

      {/* ======================================================= THE STANCE */}
      {/* One line, oversized, on the dark ground — the hinge between the frame
          above and the programmes below. */}
      <Section tone="navy" size="tall" className="overflow-hidden">
        <Container size="wide">
          <div className="lg:pl-[22%]">
            <MaskedText
              as="h2"
              className="font-serif text-[clamp(2.25rem,6vw,5rem)] leading-[1.04] font-medium tracking-[-0.03em] text-paper"
              text={['Reflection that never', 'leaves the seminar', 'room is incomplete.']}
            />
            <LitText
              offset={0.14}
              className="mt-12 max-w-[54ch] leading-relaxed text-mist"
              text="Every programme below ends in something a student is accountable for — a session delivered, a partnership kept, a position defended in public. The five areas are how that work is organised."
            />
          </div>
        </Container>
      </Section>

      {/* ==================================================== THE PROGRAMMES */}
      {/*
       * The page's centrepiece, and the reason the categories are no longer
       * five alternating two-column sections stacked vertically.
       *
       * Five comparable things read *far* better one at a time at full size
       * than as a column the reader scrolls past: in the vertical version the
       * fourth category was 4,000px down a page whose layout had already
       * repeated three times, so nobody reached it. Here each one takes the
       * screen in turn, at its own width, with its photograph bled to the
       * panel edge — and the whole set costs about the same scroll distance as
       * two of the old sections did.
       */}
      <HorizontalStory
        id="programmes"
        label="The five programme areas"
        index="01"
        eyebrow="Programme Areas"
        title="Five kinds of work, one mission."
        lead="Each area has its own methods and its own partners. What they share is the expectation that a student finishes what they started."
        wordmark="Programmes"
        panels={workCategories.map((category) => ({
          id: category.id,
          title: category.title,
          body: category.summary,
          points: category.examples.slice(0, 4),
          photo: category.image,
          photoAlt: category.imageAlt,
        }))}
      />

      {/* ================================================= THE FULL REGISTER */}
      {/*
       * The horizontal scene shows four examples per area; this is all of
       * them, on paper, in a form that can be read rather than watched. The
       * pan is for the first encounter — this is for the visitor who wants the
       * detail, and for anyone who arrived by search on a specific programme.
       */}
      <Section tone="bone">
        <Container size="wide">
          <Scrub effect="scrub-rise">
            <Eyebrow tone="navy">In Full</Eyebrow>
          </Scrub>
          <Scrub effect="scrub-rise" offset={0.06}>
            <Statement tone="dark" as="h2" className="mt-8">
              Every programme area, in full.
            </Statement>
          </Scrub>

          <div className="mt-20 space-y-24">
            {workCategories.map((category, index) => (
              <div key={category.id} id={category.id} className="scroll-mt-32">
                <Split
                  sticky={false}
                  aside={
                    <Scrub effect="scrub-rise">
                      <span className="font-serif text-[0.9375rem] text-navy/45 tabular-nums lining-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="mt-4 font-serif text-[clamp(1.625rem,2.8vw,2.375rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                        {category.title}
                      </h3>
                      <p className="mt-5 max-w-[40ch] text-[0.9375rem] leading-relaxed text-navy-600">
                        {category.summary}
                      </p>
                    </Scrub>
                  }
                >
                  <ul>
                    {category.examples.map((example, i) => (
                      <Scrub
                        key={example}
                        as="li"
                        effect="scrub-rise"
                        offset={Math.min(i, 6) * 0.04}
                        travel="26px"
                        className="flex items-baseline gap-5 border-t py-4 text-[0.9375rem] text-navy-600"
                        style={{ borderColor: 'var(--rule)' }}
                      >
                        <span
                          aria-hidden
                          className="text-[0.6875rem] font-semibold text-navy/35 tabular-nums"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {example}
                      </Scrub>
                    ))}
                  </ul>
                </Split>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ======================================================== ACTIVITIES */}
      <ActivityFeed
        activities={activities}
        tone="deep"
        eyebrow="Programs and Activities"
        title="Real programs, documented."
        lead={`Every entry below is an event the branch that ran it has published, photographed at the event itself — ${activityPhotoCount} photographs in total. We do not use stock imagery.`}
      />

      <CallToAction
        title="Do this work with us"
        body="Chapters, national branches, and partner organizations all run IES programming. Find the one that fits."
        actions={[
          { label: 'Join IES', to: '/join', variant: 'primary' },
          { label: 'See Our Impact', to: '/impact' },
        ]}
      />
    </>
  )
}
