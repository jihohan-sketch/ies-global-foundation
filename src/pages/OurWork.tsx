import { Card, Container, Eyebrow, Section } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { CallToAction } from '@/components/sections/CallToAction'
import { ActivityFeed } from '@/components/sections/Activities'
import { activities, activityPhotoCount } from '@/content/activities'
import { pillars, workCategories } from '@/content/work'
import { cx } from '@/lib/utils'
import { useSeo } from '@/lib/seo'

/** The bullet list of example work, shared by both category layouts. */
function ExampleList({ examples, className }: { examples: string[]; className?: string }) {
  return (
    <ul className={cx('space-y-px', className)}>
      {examples.map((example) => (
        <li
          key={example}
          className="flex items-start gap-4 border-t border-mist/12 py-4 text-[0.9375rem] font-light text-paper/85"
        >
          <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-[var(--accent)]/60" />
          {example}
        </li>
      ))}
    </ul>
  )
}

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

                  {/* With a photograph in the other column the examples move here,
                      so a category never loses its list to having an image. */}
                  {category.image && <ExampleList examples={category.examples} className="mt-10" />}
                </Reveal>

                <Reveal delay={120} className={alternate ? 'lg:order-1' : undefined}>
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.imageAlt ?? ''}
                      loading="lazy"
                      decoding="async"
                      className="w-full border border-mist/15 object-cover"
                      style={{ aspectRatio: '4 / 3' }}
                    />
                  ) : (
                    <Card className="h-full p-8 sm:p-10">
                      <p className="text-[0.625rem] font-medium tracking-[0.2em] text-mist/70 uppercase">
                        Examples of this work
                      </p>
                      <ExampleList examples={category.examples} className="mt-6" />
                    </Card>
                  )}
                </Reveal>
              </div>
            </Container>
          </Section>
        )
      })}

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
