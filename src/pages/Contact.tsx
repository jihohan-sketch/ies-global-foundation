import { useSearchParams } from 'react-router-dom'
import { ContactForm } from '@/components/sections/ContactForm'
import { PageHeader } from '@/components/ui/PageHeader'
import { branches, site } from '@/content/site'
import { useSeo } from '@/lib/seo'

export default function Contact() {
  useSeo({
    title: 'Contact',
    description:
      'Contact IES Global Foundation about the Foundation or the IES Leadership Council. For programs, events, chapters, or membership, contact IES Korea or IES United States.',
    path: '/contact',
  })
  const [params] = useSearchParams()
  const topic = params.get('topic') ?? 'general'

  return (
    <div className="pb-24">
      <PageHeader eyebrow="Contact" title="Contact the Foundation">
        <p>
          For programs, events, chapters, or membership, please contact the relevant national
          branch directly.
        </p>
      </PageHeader>
      <div className="container-page grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <ContactForm defaultTopic={topic} />
        <aside className="space-y-10">
          <div>
            <h2 className="eyebrow">Email</h2>
            <a href={`mailto:${site.email}`} className="link mt-3 inline-block text-navy">
              {site.email}
            </a>
          </div>
          <div>
            <h2 className="eyebrow">National branches</h2>
            <ul className="mt-3 space-y-2">
              {branches.map((b) => (
                <li key={b.id}>
                  <a href={b.href} target="_blank" rel="noopener noreferrer" className="link text-navy">
                    {b.name}
                    <span aria-hidden> ↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <span className="ml-2 text-[0.8125rem] text-slate">{b.domain}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
