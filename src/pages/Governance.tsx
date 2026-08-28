import { Link } from 'react-router-dom'
import { Card, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { OrgChart } from '@/components/sections/OrgChart'
import { CallToAction } from '@/components/sections/CallToAction'
import { governance } from '@/content/legal'
import { site } from '@/content/site'
import { useSeo } from '@/lib/seo'

export default function Governance() {
  useSeo({
    title: 'Governance',
    description:
      'How IES is organized: the Global Foundation, national branches, school chapters, and external partners — and the standards that govern what IES claims.',
    path: '/governance',
  })

  return (
    <>
      <PageHero
        eyebrow="Governance"
        ghost="Charter"
        title="What each part of IES is — and is not."
        lead={governance.intro}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Governance' }]}
      />

      {/* ========================================================= ENTITIES */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Organizational Distinctions"
              title="Four distinct things, often confused"
              lead="Youth organizations frequently blur these lines. We would rather be explicit."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {governance.entities.map((entity, i) => (
              <Reveal key={entity.title} delay={i * 100}>
                <Card className="h-full">
                  <h2 className="text-h3">{entity.title}</h2>
                  <p className="mt-5 leading-relaxed text-mist">{entity.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ======================================================== STRUCTURE */}
      <Section tone="deep" >
        <Container size="wide">
          <Reveal>
            <SectionHeading eyebrow="Structure" title="How the network is arranged" />
          </Reveal>
          <Reveal delay={140}>
            <OrgChart className="mt-16" />
          </Reveal>
        </Container>
      </Section>

      {/* ======================================================= PRINCIPLES */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Standards of Accuracy"
              title="What we will not claim"
              lead="These principles govern what appears on this website and in any material carrying the IES name."
            />
          </Reveal>

          <div className="mt-14 space-y-px">
            {governance.principles.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 90}>
                <div className="grid gap-6 border-t border-mist/15 py-9 lg:grid-cols-[auto_1fr_1.4fr] lg:gap-14">
                  <span className="font-serif text-sm text-[var(--accent)]/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif text-[1.375rem] leading-snug">{principle.title}</h3>
                  <p className="leading-relaxed text-mist">{principle.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <Card className="mt-14">
              <Eyebrow>Legal Status</Eyebrow>
              <p className="mt-6 leading-relaxed text-mist">{site.legalNote}</p>
              <p className="mt-4 leading-relaxed text-mist">
                Related policies:{' '}
                <Link to="/privacy" className="text-[var(--accent)] underline underline-offset-6 hover:text-[var(--accent)]">
                  Privacy Policy
                </Link>
                ,{' '}
                <Link to="/terms" className="text-[var(--accent)] underline underline-offset-6 hover:text-[var(--accent)]">
                  Terms of Use
                </Link>
                , and{' '}
                <Link
                  to="/participant-safety"
                  className="text-[var(--accent)] underline underline-offset-6 hover:text-[var(--accent)]"
                >
                  Participant Safety
                </Link>
                .
              </p>
            </Card>
          </Reveal>
        </Container>
      </Section>

      <CallToAction
        eyebrow="Questions"
        title="Ask us anything about how IES works"
        body="Schools, partners, and parents are welcome to ask how the organization is structured and what any role involves."
        actions={[
          { label: 'Contact Us', to: '/contact', variant: 'primary' },
          { label: 'Leadership', to: '/leadership' },
        ]}
      />
    </>
  )
}
