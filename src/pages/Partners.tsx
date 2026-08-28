import { Card, Container, Eyebrow, Section, SectionHeading, Button } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { RailItem, ScrollRail } from '@/components/ui/ScrollRail'
import { PageHero } from '@/components/sections/PageHero'
import { CallToAction } from '@/components/sections/CallToAction'
import {
  collaborationAreas,
  namedPartners,
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

      {/* Named collaborations lead, ahead of the categories. A visitor asking
          whether IES is serious wants the institutions, not the taxonomy — the
          eight categories describe what a partnership *can* be, which only
          becomes interesting once you believe some already exist. */}
      {/* =================================================== NAMED PARTNERS */}
      <Section className="overflow-hidden">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              ghost="Named"
              eyebrow="Organizations We Work With"
              title="Named collaborations"
              lead="We work alongside community organizations, academic institutions, and public bodies — the relationships behind our service work."
            />
          </Reveal>

          <ScrollRail label="partner organizations" className="mt-14">
            {namedPartners.map((group, i) => (
              <RailItem key={group.group}>
                <Reveal delay={i * 100} className="h-full">
                <Card className="h-full p-8">
                  <h3 className="font-serif text-xl text-[var(--accent)]">{group.group}</h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-mist">
                    {group.note}
                  </p>
                  <ul className="mt-6 space-y-px">
                    {group.organizations.map((organization) => (
                      <li
                        key={organization}
                        className="border-t border-mist/12 py-3 text-[0.9375rem] text-paper/85"
                      >
                        {organization}
                      </li>
                    ))}
                  </ul>
                </Card>
                </Reveal>
              </RailItem>
            ))}
          </ScrollRail>

          <Reveal delay={200}>
            <p className="mt-10 max-w-3xl text-sm leading-relaxed text-mist">
              Naming an organization here records a collaboration; it does not imply that
              organization endorses IES or its positions.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ======================================================= CATEGORIES */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Who We Work With"
              title="Eight kinds of collaboration"
              lead="Each partnership is scoped in writing and held to the same safety and conduct standards as our own programs."
            />
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {partnerCategories.map((category, i) => (
              <Reveal key={category.title} delay={i * 70}>
                <Card className="h-full p-7">
                  <h3 className="font-serif text-lg text-[var(--accent)]">{category.title}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist">
                    {category.description}
                  </p>
                  <ul className="mt-5 space-y-1.5 border-t border-mist/12 pt-4">
                    {category.examples.map((example) => (
                      <li key={example} className="text-[0.8125rem] text-paper/70">
                        {example}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* =========================================================== LOGOS */}
      {partnerLogos.length > 0 && (
        <Section tone="paper" size="compact" className="border-y border-mist/12">
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

      {/* ==================================================== COLLABORATION */}
      <Section tone="deep" className="border-y border-mist/12">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
            <Reveal>
              <Eyebrow>Collaboration Areas</Eyebrow>
              <h2 className="text-h2 mt-6">Where partnerships usually start</h2>
              <p className="mt-6 leading-relaxed text-mist">
                Most collaborations begin with a single concrete thing — a speaker, a service
                day, a joint forum — and grow from there once both sides know the work is
                reliable.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <ul className="grid gap-px sm:grid-cols-2">
                {collaborationAreas.map((area) => (
                  <li
                    key={area}
                    className="border-t border-mist/15 py-5 text-[1.0625rem] text-paper/85"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ========================================================= PROCESS */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="How It Works"
              title="A short, deliberate process"
              lead="We would rather scope a partnership properly than start one that quietly lapses."
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
              Partner logos are displayed only with written permission from the organization
              concerned. IES does not imply endorsement, affiliation, or accreditation that has
              not been agreed in writing.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CallToAction
        eyebrow="Partnerships"
        title="Partner With IES"
        body="Tell us who you are and what you have in mind. A short message is enough to start the conversation."
        actions={[
          { label: 'Contact the partnerships team', to: '/contact?topic=partnership', variant: 'primary' },
          { label: 'See Our Work', to: '/our-work' },
        ]}
      />
    </>
  )
}
