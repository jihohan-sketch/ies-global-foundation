import { Container, Section } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import type { LegalDocument } from '@/content/legal'
import { useSeo } from '@/lib/seo'

/** Shared template for Privacy Policy, Terms of Use, and Participant Safety. */
export function LegalPage({ document }: { document: LegalDocument }) {
  useSeo({
    title: document.title,
    description: document.intro,
    path: `/${document.slug}`,
  })

  return (
    <>
      <PageHero
        eyebrow={document.eyebrow}
        title={document.title}
        lead={document.intro}
        crumbs={[{ label: 'Home', href: '/' }, { label: document.title }]}
        meta={
          <p className="text-[0.6875rem] font-medium tracking-[0.18em] text-mist uppercase">
            Last reviewed — {document.updated}
          </p>
        }
      />

      <Section>
        <Container size="narrow">
          <div className="space-y-14">
            {document.sections.map((section, i) => (
              <Reveal key={section.heading} delay={i * 60}>
                <div className="border-t border-mist/15 pt-8">
                  <h2 className="font-serif text-[1.5rem] leading-snug">{section.heading}</h2>

                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="mt-5 leading-[1.8] text-mist"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.list && (
                    <ul className="mt-6 space-y-3">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="flex gap-4 leading-relaxed text-paper/80"
                        >
                          <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-[var(--accent)]/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-16 border-t border-mist/15 pt-6 text-sm leading-relaxed text-mist">
              Questions about this policy can be sent to{' '}
              <a
                href="mailto:theiesociety@gmail.com"
                className="text-[var(--accent)] underline underline-offset-6 hover:text-[var(--accent)]"
              >
                theiesociety@gmail.com
              </a>
              .
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
