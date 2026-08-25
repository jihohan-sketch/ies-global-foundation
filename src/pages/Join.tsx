import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { CallToAction } from '@/components/sections/CallToAction'
import { JoinForm } from '@/components/sections/JoinForm'
import { joinIntro, joinPathways } from '@/content/join'
import { branches } from '@/content/branches'
import { membershipFormUrl } from '@/content/site'
import { useSeo } from '@/lib/seo'

export default function Join() {
  useSeo({
    title: 'Join IES',
    description:
      'Join as a member, join a school chapter, start a chapter, take on a national branch role, or collaborate with IES as an educator or organization.',
    path: '/join',
  })

  /* The pathway a visitor picked upstairs, carried into the form so they do not
     have to restate a choice they already made by clicking. Named apart from
     the `pathway` the list below maps over, which shadows it inside that loop. */
  const [selectedPathway, setSelectedPathway] = useState('member')
  const formRef = useRef<HTMLDivElement>(null)

  function applyFor(id: string) {
    setSelectedPathway(id)
    /* `block: 'start'` with the `scroll-padding-top` set in index.css lands the
       heading clear of the fixed header rather than underneath it. */
    formRef.current?.scrollIntoView({ block: 'start' })
  }

  return (
    <>
      <PageHero
        eyebrow="Join IES"
        ghost="Join"
        title="Five ways in. All of them real."
        lead={joinIntro}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Join IES' }]}
      />

      {/* ========================================================= PATHWAYS */}
      <Section>
        <Container size="wide">
          <div className="space-y-px">
            {joinPathways.map((pathway, i) => (
              <Reveal key={pathway.id} delay={i * 80}>
                <div
                  id={pathway.id}
                  className="grid gap-8 border-t border-mist/15 py-12 lg:grid-cols-[auto_1fr_1.1fr_auto] lg:gap-14"
                >
                  <span className="font-serif text-sm text-[var(--accent)]/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <h2 className="text-h3">{pathway.title}</h2>
                    <p className="mt-3 text-[0.75rem] font-medium tracking-[0.14em] text-[var(--accent)] uppercase">
                      {pathway.audience}
                    </p>
                  </div>

                  <div>
                    <p className="leading-relaxed font-light text-mist">
                      {pathway.description}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {pathway.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-[0.9375rem] font-light text-paper/80"
                        >
                          <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-[var(--accent)]/60" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:self-center">
                    {pathway.id === 'member' ? (
                      <Button href={membershipFormUrl} variant="primary" arrow>
                        Membership form
                      </Button>
                    ) : pathway.cta.href.startsWith('/contact') ? (
                      /* The pathways that used to hand off to the contact page now
                         scroll to the form below with this pathway already chosen.
                         `start-chapter` and `collaborate` keep their links: those
                         lead somewhere with more to read, not to a form. */
                      <Button onClick={() => applyFor(pathway.id)} variant="secondary" arrow>
                        {pathway.cta.label}
                      </Button>
                    ) : (
                      <Button to={pathway.cta.href} variant="secondary" arrow>
                        {pathway.cta.label}
                      </Button>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ====================================================== WHICH BRANCH */}
      <Section tone="deep" className="border-y border-mist/12">
        <Container size="wide">
          <Reveal>
            <Eyebrow>Which Branch Applies to You</Eyebrow>
            <h2 className="text-h2 mt-6 max-w-2xl">
              Applications are handled by the branch in your country.
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed font-light text-mist">
              If you are outside Korea, the United States, or the United Kingdom, contact the
              Global Foundation directly — we will tell you honestly whether there is a route in
              at the moment.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {branches.map((branch, i) => (
              <Reveal key={branch.slug} delay={i * 100}>
                <Card className="h-full p-8">
                  <h3 className="text-h3">{branch.name}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed font-light text-mist">
                    {branch.role}
                  </p>
                  <a
                    href={`mailto:${branch.contactEmail}`}
                    className="mt-6 inline-block text-sm text-[var(--accent)] underline underline-offset-6 transition-colors hover:text-[var(--accent)]"
                  >
                    {branch.contactEmail}
                  </a>
                  <div className="mt-6 border-t border-mist/12 pt-5">
                    <Link
                      to={`/global-network/${branch.slug}`}
                      className="text-[0.6875rem] font-medium tracking-[0.16em] text-paper/75 uppercase transition-colors hover:text-[var(--accent)]"
                    >
                      Branch profile →
                    </Link>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ====================================================== EXPECTATIONS */}
      <Section size="compact">
        <Container size="wide">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
              <Eyebrow>Before You Apply</Eyebrow>
              <div className="space-y-5">
                <p className="text-lead font-light text-paper/90">
                  IES roles come with expectations, not just titles.
                </p>
                <p className="leading-relaxed font-light text-mist">
                  Members are expected to participate, chapter officers to run programming
                  through a full academic year, and national officers to be accountable for
                  outcomes across schools. We would rather you join the pathway you can actually
                  sustain than the one that sounds most impressive.
                </p>
                <p className="leading-relaxed font-light text-mist">
                  All participants agree to our conduct and participant safety standards.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ============================================================ APPLY */}
      <Section id="apply" tone="deep" className="border-t border-mist/12">
        <Container size="wide">
          {/* The ref sits on the outer grid rather than the heading, so the
              scroll lands on the whole panel and the form is already in view. */}
          <div ref={formRef} className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Apply"
                title="Send your application"
                lead="Tell us who you are and which pathway you are after. Applications go to the branch in your country, and someone will reply within a few working days."
              />
              <p className="mt-8 max-w-md text-[0.9375rem] leading-relaxed font-light text-mist">
                If you already know which chapter or officer you need, writing to your branch
                directly is just as good — the addresses are above.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <JoinForm defaultPathway={selectedPathway} />
            </Reveal>
          </div>
        </Container>
      </Section>

      <CallToAction
        title="Start where you are"
        body="A message to the branch in your country is enough to begin."
        actions={[
          { label: 'Contact Us', to: '/contact?topic=membership', variant: 'primary' },
          { label: 'Start a Chapter', to: '/start-a-chapter' },
        ]}
      />
    </>
  )
}
