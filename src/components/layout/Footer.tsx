import { Link } from 'react-router-dom'
import { branches, legalNav, site } from '@/content/site'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer data-ground="dark" className="bg-navy text-mist">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
        <div>
          <Logo variant="light" />
        </div>

        <div>
          <h2 className="eyebrow">Contact</h2>
          <ul className="mt-4 space-y-2 text-[0.9375rem]">
            <li>
              <a href={`mailto:${site.email}`} className="link text-paper">
                {site.email}
              </a>
            </li>
            <li>
              <Link to="/contact" className="link">
                Contact form
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow">Branches</h2>
          <ul className="mt-4 space-y-2 text-[0.9375rem]">
            {branches.map((b) => (
              <li key={b.id}>
                <a href={b.href} target="_blank" rel="noopener noreferrer" className="link">
                  {b.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow">Policies</h2>
          <ul className="mt-4 space-y-2 text-[0.9375rem]">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t">
        <p className="container-page py-6 text-[0.8125rem] text-mist">{site.copyright}</p>
      </div>
    </footer>
  )
}
