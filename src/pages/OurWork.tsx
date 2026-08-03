import { Card, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { CallToAction } from '@/components/sections/CallToAction'
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
        title="From Reflection to Action"
        lead="Ethical inquiry joined to practical leadership: forums, service, leadership programs, partnerships, and student-led civic engagement."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Our Work' }]}
      />

      {/* ========================================================== PILLARS */}
      <Section size="compact">
        <Container size="wide">
          <Reveal>
            <Eyebrow>Organizational Pillars</Eyebrow>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.id} delay={i * 110} className="h-full">
                <Card className="h-full p-8">
                  <h2 className="font-serif text-xl text-[var(--accent)]">{pillar.title}</h2>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed font-light text-mist">
                    {pillar.summary}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ====================================================== CATEGORIES */}
      {workCategories.map((category, index) => {
        const alternate = index % 2 === 1
        return (
          <Section
            key={category.id}
            id={category.id}
            tone={alternate ? 'deep' : 'navy'}
            className="border-t border-mist/12"
          >
            <Container size="wide">
              <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
                <Reveal className={alternate ? 'lg:order-2' : undefined}>
                  <span className="font-serif text-sm text-[var(--accent)]/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-h2 mt-6">{category.title}</h2>
                  <p className="text-lead mt-7 font-light text-mist">{category.summary}</p>
                </Reveal>

                <Reveal delay={120} className={alternate ? 'lg:order-1' : undefined}>
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.imageAlt ?? ''}
                      loading="lazy"
                      className="w-full border border-mist/15 object-cover"
                      style={{ aspectRatio: '4 / 3' }}
                    />
                  ) : (
                    <Card className="h-full p-8 sm:p-10">
                      <p className="text-[0.625rem] font-medium tracking-[0.2em] text-mist/70 uppercase">
                        Examples of this work
                      </p>
                      <ul className="mt-6 space-y-px">
                        {category.examples.map((example) => (
                          <li
                            key={example}
                            className="flex items-start gap-4 border-t border-mist/12 py-4 text-[0.9375rem] font-light text-paper/85"
                          >
                            <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-[var(--accent)]/60" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  )}
                </Reveal>
              </div>
            </Container>
          </Section>
        )
      })}

      {/* ==================================================== PHOTO NOTICE */}
      <Section size="compact" className="border-t border-mist/12">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow="Photography"
              title="Real programs, documented."
              lead="Photographs come from IES events, chapter sessions, and service work. We do not use stock imagery."
            />
            <p className="mt-8 max-w-2xl text-sm leading-relaxed font-light text-mist/70">
              To add photography for a work area, place the image in
              <code className="mx-1.5 border border-mist/20 px-1.5 py-0.5 font-mono text-xs text-paper/80">
                public/work/
              </code>
              and set the <code className="font-mono text-xs text-paper/80">image</code> field on
              the matching entry in{' '}
              <code className="font-mono text-xs text-paper/80">src/content/work.ts</code>. The
              layout switches automatically.
            </p>
          </Reveal>
        </Container>
      </Section>

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
