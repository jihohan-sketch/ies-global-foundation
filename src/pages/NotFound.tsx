import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { useSeo } from '@/lib/seo'

export default function NotFound() {
  useSeo({ title: 'Page not found', description: 'This page does not exist.', path: '' })
  return (
    <div className="pb-24">
      <PageHeader eyebrow="404" title="This page could not be found.">
        <p>It may have moved when the site was reorganized.</p>
      </PageHeader>
      <div className="container-page">
        <Link to="/" className="link font-medium text-navy">
          Go to the IES Global Foundation home page
        </Link>
      </div>
    </div>
  )
}
