import { Link } from 'react-router-dom'
import { Button, Container, Eyebrow } from '@/components/ui/Primitives'
import { primaryNav } from '@/content/site'
import { useSeo } from '@/lib/seo'

export default function NotFound() {
  useSeo({
    title: 'Page not found',
    description: 'The page you were looking for could not be found.',
    path: '/404',
  })

  return (
    <section className="relative flex min-h-dvh items-center pt-32 pb-24">
      <Container className="relative">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="text-h1 mt-8 max-w-2xl">This page could not be found.</h1>
        <p className="text-lead mt-7 max-w-xl font-light text-mist">
          The link may be out of date, or the page may have moved as the site has grown. The
          sections below cover everything on this website.
        </p>

        <div className="mt-11 flex flex-wrap gap-4">
          <Button to="/" variant="primary" arrow>
            Return home
          </Button>
          <Button to="/contact" variant="secondary">
            Report a broken link
          </Button>
        </div>

        <nav aria-label="Site sections" className="mt-16 border-t border-mist/15 pt-8">
          <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-[0.9375rem] font-light text-paper/75 transition-colors hover:text-[var(--accent)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  )
}
