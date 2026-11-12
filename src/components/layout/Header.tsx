import { Link } from 'react-router-dom'
import { sectionNav } from '@/content/site'
import { Logo } from './Logo'

/**
 * Sticky header with the four section anchors. On small screens the anchors
 * drop to a second row rather than hiding behind a menu button — there are
 * only four, and they are the whole navigation.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="container-page flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between md:py-4">
        <Link to="/" className="self-start rounded-sm" aria-label="IES Global Foundation, home">
          <Logo />
        </Link>
        <nav aria-label="Sections">
          <ul className="-mx-2 flex flex-wrap items-center gap-x-1 gap-y-0 text-[0.875rem] font-medium text-ink-soft md:mx-0 md:gap-x-2">
            {sectionNav.map((item) => (
              <li key={item.id}>
                <Link
                  to={{ pathname: '/', hash: item.id }}
                  className="inline-block rounded-sm px-2 py-1.5 transition-colors hover:text-gold-800"
                >
                  {'short' in item ? (
                    <>
                      <span className="sm:hidden" aria-hidden>
                        {item.short}
                      </span>
                      <span className="max-sm:sr-only">{item.label}</span>
                    </>
                  ) : (
                    item.label
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
