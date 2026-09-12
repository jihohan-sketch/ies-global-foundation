import { Container, Eyebrow, Section, SectionHeading, Button } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { IndexList, Split } from '@/components/ui/Editorial'
import { NamedPartners } from '@/components/sections/NamedPartners'
import { PageHero } from '@/components/sections/PageHero'
import { CallToAction } from '@/components/sections/CallToAction'
import {
  partnerCategories,
  partnerLogos,
  partnersIntro,
  partnershipProcess,
} from '@/content/partners'
import { useSeo } from '@/lib/seo'

export default function Partners() {
  useSeo({
    title: 'Partners',
    description:
      'IES works with schools, universities, youth organizations, community centers, nonprofits, public institutions, and international organizations.',
    path: '/partners',
  })

  return (
    <>
      <PageHero
        eyebrow="Partners"
        ghost="Partners"
        title="Institutions that make student work possible."
        lead={partnersIntro}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Partners' }]}
      >
        <Button href="mailto:theiesociety@gmail.com" variant="primary" arrow>
          Partner With IES
        </Button>
      </PageHero>

      {/* =================================================== NAMED PARTNERS */}
      {/*
       * Named collaborations lead, ahead of the categories. A visitor asking
       * whether IES is serious wants the institutions, not the taxonomy — the
       * eight categories describe what a partnership *can* be, which only
       * becomes interesting once you believe some already exist.
       *
       * The names were a horizontal rail of four bordered cards, each holding a
       * group heading, a note and a list — which meant the reader met the list
       * of organisations as a set of boxes to be dragged through rather than as
       * a record to be read, and most of the names were off-screen at any
       * moment. `NamedPartners` sets the same names, from the same source, as a
       * numbered register in two columns with the group beside each name.
       */}
      <NamedPartners showLink={false} />

      {/* ======================================================= CATEGORIES */}
      {/* ===================================================== CATEGORIES */}
      {/*
       * Eight kinds of collaboration, as a register on paper.
       *
       * This was a four-across card grid of eight boxes, each with a heading,
       * a paragraph and a nested list — thirty-odd lines of type in a 300px
       * column, eight times, at one weight. The information is genuinely
       * useful to the one reader it is for (someone at an institution working
       * out whether their organisation is the kind IES works with), and that
       * reader is *scanning for their own category*. A register with the
       * category set at heading scale is findable in a second; a grid of
       * equally-weighted boxes is not findable at all.
       */}
      <Section tone="paper" className="overflow-hidden">
        <Container size="wide">
          <Split
            aside={
              <Reveal>
                <Eyebrow tone="navy">Who We Work With</Eyebrow>
                <h2 className="text-h2 mt-8 max-w-[11ch] text-navy">
                  Eight kinds of collaboration
                </h2>
                <p className="mt-8 max-w-[38ch] leading-relaxed text-navy-600">
                  Each partnership is scoped in writing and held to the same safety and conduct
                  standards as our own programs.
                </p>
              </Reveal>
            }
          >
            <IndexList
              tone="dark"
              items={partnerCategories.map((category) => ({
                id: category.title,
                title: category.title,
                body: (
                  <>
                    {category.description}
                    {/* The examples ride under the description as one tracked
                        line rather than as a nested bulleted list. They are
                        instances of the category, not steps — and a list of
                        five one-line items inside a register row rebuilds the
                        card this section exists to remove. */}
                    <span className="text-label-sm mt-3 block font-semibold text-navy/45 uppercase">
                      {category.examples.join(' · ')}
                    </span>
                  </>
                ),
              }))}
            />
          </Split>
        </Container>
      </Section>

      {partnerLogos.length > 0 && (
        <Section tone="paper" size="compact" >
          <Container size="wide">
            <Reveal>
              <Eyebrow tone="navy">Current Partners</Eyebrow>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 items-center gap-10 sm:grid-cols-3 lg:grid-cols-5">
              {partnerLogos.map((partner) => (
                <img
                  key={partner.name}
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  className="h-10 w-full object-contain opacity-70 transition-opacity hover:opacity-100"
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ========================================================= PROCESS */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="How It Works"
              title="A short, deliberate process"
              lead="Better to scope a partnership properly than start one that quietly lapses."
            />
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {partnershipProcess.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <div className="border-t border-mist/18 pt-6">
                  <span className="font-serif text-sm text-[var(--accent)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-serif text-xl">{step.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-14 max-w-2xl border-t border-mist/15 pt-6 text-sm leading-relaxed text-mist">
              Logos appear only with written permission. IES implies no endorsement,
              affiliation, or accreditation that has not been agreed in writing.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CallToAction
        eyebrow="Partnerships"
        title="Partner With IES"
        body="Tell us who you are and what you have in mind."
        actions={[
          { label: 'Contact the partnerships team', to: '/contact?topic=partnership', variant: 'primary' },
          { label: 'See Our Work', to: '/our-work' },
        ]}
      />
    </>
  )
}
