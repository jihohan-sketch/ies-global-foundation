import { PageHeader } from '@/components/ui/PageHeader'
import type { LegalDocument } from '@/content/legal'
import { site } from '@/content/site'
import { useSeo } from '@/lib/seo'

/** Shared template for Privacy Policy, Terms of Use, and Participant Safety. */
export function LegalPage({ document }: { document: LegalDocument }) {
  useSeo({ title: document.title, description: document.intro, path: `/${document.slug}` })

  return (
    <>
      <PageHeader eyebrow={document.eyebrow} title={document.title}>
        <p>{document.intro}</p>
      </PageHeader>
      <div className="container-page pb-24">
        <div className="max-w-[44rem] space-y-12">
          {document.sections.map((section) => (
            <section key={section.heading} className="border-t pt-8">
              <h2 className="text-h3 text-navy">{section.heading}</h2>
              {section.paragraphs?.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 text-ink-soft">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-soft marker:text-gold-600">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <p className="border-t pt-6 text-[0.9375rem] text-ink-soft">
            Questions about this policy can be sent to{' '}
            <a href={`mailto:${site.email}`} className="link text-navy">
              {site.email}
            </a>
            .
          </p>
        </div>
      </div>
    </>
  )
}
