import { Link } from 'react-router-dom'
import { footerNav, legalNav, site, socials } from '@/content/site'
import { Container, Rule } from '@/components/ui/Primitives'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="bg-navy border-t border-mist/12">
      <Container size="wide">
        <div className="grid gap-14 py-20 lg:grid-cols-[1.4fr_2fr] lg:gap-20">
          {/* ----------------------------------------------------- Identity */}
          <div>
            <Logo subtitle="full" />
            <p className="text-h3 mt-8 max-w-sm font-serif text-paper/90">
              {site.tagline}
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed font-light text-mist">
              {site.headquartersStatement}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="border border-mist/25 px-4 py-2 text-[0.6875rem] font-medium tracking-[0.16em] text-paper/80 uppercase transition-colors hover:border-gold/60 hover:text-gold"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------- Navigation */}
          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-[0.6875rem] font-sans font-medium tracking-[0.24em] text-gold uppercase">
                  {group.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        to={item.href}
                        className="text-sm font-light text-paper/72 transition-colors hover:text-paper"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Rule />

        {/* -------------------------------------------------------- Legal */}
        <div className="py-8">
          <p className="max-w-4xl text-xs leading-relaxed font-light text-mist/70">
            {site.legalNote}
          </p>

          <div className="mt-6 flex flex-col gap-4 border-t border-mist/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-light text-mist/70">{site.copyright}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-xs font-light text-mist/70 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  )
}
