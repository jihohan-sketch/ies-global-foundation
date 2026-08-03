import { Card, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { CallToAction } from '@/components/sections/CallToAction'
import { chapterExpectations, chapterFaqs, chapterSteps } from '@/content/join'
import { useSeo } from '@/lib/seo'

export default function StartChapter() {
  useSeo({
    title: 'Start a Chapter',
    description:
      'The seven-step process for establishing an IES chapter at your school, the expectations chapters hold to, and answers to common questions.',
    path: '/start-a-chapter',
  })

  return (
    <>
      <PageHero
        eyebrow="Start a Chapter"
        title="Bring IES to your school."
        lead="The most demanding way into IES, and the one with the most ownership. Here is what it involves."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Start a Chapter' }]}
      />

      {/* ========================================================= PROCESS */}
      <Section>
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="The Process"
              title="Seven steps, in order"
              lead="Each step exists because chapters that skip it tend not to survive their first year."
            />
          </Reveal>

          <ol className="mt-16 space-y-px">
            {chapterSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 70} as="li">
                <div className="grid gap-6 border-t border-mist/15 py-8 sm:grid-cols-[4rem_1fr_1.2fr] sm:gap-12">
                  <span className="font-serif text-2xl text-[var(--accent)]/80">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-serif text-[1.375rem] leading-snug">{step.title}</h2>
                  <p className="leading-relaxed font-light text-mist">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ==================================================== EXPECTATIONS */}
      <Section tone="deep" className="border-y border-mist/12">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Chapter Expectations"
              title="What an IES chapter agrees to"
              lead="The conditions of carrying the IES name. Chapters that fall short are supported first, and closed if that does not work."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {chapterExpectations.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <Card className="h-full p-7">
                  <h3 className="font-serif text-lg text-[var(--accent)]">{item.title}</h3>
                  <p className="mt-3.5 text-[0.9375rem] leading-relaxed font-light text-mist">
                    {item.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================= FAQ */}
      <Section>
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
            <Reveal>
              <Eyebrow>Common Questions</Eyebrow>
            </Reveal>

            <div className="space-y-px">
              {chapterFaqs.map((faq, i) => (
                <Reveal key={faq.question} delay={i * 80}>
                  <details className="group border-t border-mist/15 py-6">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-serif text-xl transition-colors group-open:text-[var(--accent)] marker:hidden">
                      {faq.question}
                      <span
                        aria-hidden
                        className="mt-1 shrink-0 text-mist transition-transform duration-300 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-4 max-w-2xl leading-relaxed font-light text-mist">
                      {faq.answer}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <CallToAction
        title="Submit an initial interest form"
        body="Tell us who you are, which school you attend, and why you want an IES chapter there. That is enough to start."
        actions={[
          { label: 'Start the conversation', to: '/contact?topic=chapter', variant: 'primary' },
          { label: 'See Our Work', to: '/our-work' },
        ]}
      />
    </>
  )
}
