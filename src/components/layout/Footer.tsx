import { Link } from 'react-router-dom'
import {
  branchSites,
  contactChannels,
  legalNav,
  primaryNav,
  site,
  socials,
} from '@/content/site'
import { Container, Rule } from '@/components/ui/Primitives'
import { Logo } from './Logo'
import { cx, prefersReducedMotion } from '@/lib/utils'

/**
 * Destinations that are not sections, and so are not in `primaryNav`: a
 * document shelf and three things to do. Listed here rather than pulled from
 * `footerNav`, whose three-column grouping the footer no longer uses.
 */
const SECONDARY_LINKS = [
  { label: 'Governance', href: '/governance' },
  { label: 'Start a Chapter', href: '/start-a-chapter' },
  { label: 'Join IES', href: '/join' },
  { label: 'Partner With Us', href: '/partners' },
] as const

/**
 * A labelled row in the contact column — the tiny caps label above its value,
 * both sitting on a hairline.
 *
 * The label is not a heading and not a `<dt>`: it names the value beside it and
 * nothing else, and the whole column is short enough that a screen reader
 * hearing "E-mail address, theiesociety@gmail.com" in sequence gets the
 * relationship for free. Where the value is a link, the label is folded into
 * its accessible name instead — see `aria-label` below — because "IES Global
 * Foundation on Instagram" is a useful thing to land on in a link list and
 * "Instagram" on its own is not.
 */
function ContactRow({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cx('border-t border-mist/15 py-4', className)}>
      <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-mist uppercase">
        {label}
      </p>
      <div className="mt-2 text-[0.8125rem] tracking-[0.06em] text-paper">{children}</div>
    </div>
  )
}

/**
 * Returns to the top of the document.
 *
 * A real `<button>` rather than an `href="#"`: there is no target to link to,
 * and a fragment link that goes nowhere leaves a dead entry in the history and
 * a `#` on every URL a visitor might then copy. The smooth behaviour is dropped
 * under reduced motion — a page-length glide is precisely the kind of movement
 * that setting exists to stop.
 */
function BackToTop() {
  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        })
      }
      className="group flex flex-col items-center gap-3 text-[0.75rem] font-semibold tracking-[0.14em] text-mist uppercase transition-colors duration-300 hover:text-paper"
    >
      <span
        aria-hidden
        className="flex h-11 w-11 items-center justify-center rounded-full border border-mist/30 transition-colors duration-300 group-hover:border-[var(--accent)]/70 group-hover:bg-[var(--accent)]/10"
      >
        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
          <path
            d="M8 13V3m0 0L3.5 7.5M8 3l4.5 4.5"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 ease-[var(--ease-cinema)] group-hover:-translate-y-[2px]"
          />
        </svg>
      </span>
      Back to Top
    </button>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-mist/12 bg-navy">
      <Container size="wide">
        {/* ------------------------------------------------------ Top band */}
        {/*
         * Three tracks: the site's own map on the left, the way out of it in
         * the middle, and the ways to reach a person on the right.
         *
         * `1fr auto 1fr` rather than three equal columns, so the return control
         * is centred on the *footer* regardless of how long the navigation
         * stack or the contact column happen to be. Below `lg` the three
         * stack, and the return moves to the end where it belongs on a phone —
         * the bottom of a long scroll is exactly where someone wants it.
         */}
        <div className="grid gap-14 py-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-16">
          {/* The primary navigation, in the cinematic register. The same nine
              destinations as the header rail and the overlay — a footer that
              invents its own taxonomy is a footer nobody trusts. */}
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="-mr-[0.24em] block py-1.5 font-serif text-[0.9375rem] tracking-[0.24em] text-mist uppercase transition-colors duration-300 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/*
             * The destinations that are not sections.
             *
             * Governance is a document shelf and the other three are things to
             * *do* rather than places to read, so they sit apart and in the
             * sans — but they still have to be here. The footer is where a
             * visitor goes looking for the page that was never in the menu, and
             * "Start a Chapter" reaches nobody if the only route to it is a
             * call to action two thirds of the way up the home page.
             */}
            <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-2 border-t border-mist/12 pt-6">
              {SECONDARY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-[0.8125rem] text-mist transition-colors duration-300 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Ordered last on narrow screens, centred on wide ones. */}
          <div className="order-last flex items-center justify-center lg:order-none lg:self-center">
            <BackToTop />
          </div>

          <div className="lg:max-w-sm lg:justify-self-end">
            <ContactRow label="E-mail Address" className="border-t-0 pt-0 lg:border-t lg:pt-4">
              <a
                href={`mailto:${contactChannels[0].email}`}
                className="break-all transition-colors hover:text-[var(--accent)]"
              >
                {contactChannels[0].email}
              </a>
            </ContactRow>

            <ContactRow label="Headquarters">Seoul, Republic of Korea</ContactRow>

            <ContactRow label="Founded">{site.founded}</ContactRow>

            {/* The socials as rows rather than as a cluster of chips: at this
                width a row reads as a directory entry, which is what it is. */}
            <ul>
              {socials.map((social) => (
                <li key={social.label}>
                  <ContactRow label={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${site.name} on ${social.label}`}
                      className="group inline-flex items-baseline gap-2 transition-colors hover:text-[var(--accent)]"
                    >
                      {social.handle ?? 'Follow'}
                      <span aria-hidden className="text-mist transition-colors group-hover:text-[var(--accent)]">
                        ↗
                      </span>
                    </a>
                  </ContactRow>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Rule />

        {/* ----------------------------------------------- Branch websites */}
        {/* The branches run their own sites; the navigation above links to
            their pages here, this band links out to the sites themselves. */}
        <div className="flex flex-col gap-5 py-8 lg:flex-row lg:items-baseline lg:gap-10">
          <h2 className="font-sans text-[0.6875rem] font-semibold tracking-[0.12em] whitespace-nowrap text-[var(--accent)] uppercase">
            Branch Websites
          </h2>
          <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3">
            {branchSites.map((branchSite) => (
              <li key={branchSite.href}>
                <a
                  href={branchSite.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-baseline gap-2 text-sm text-mist transition-colors hover:text-paper"
                >
                  {branchSite.label}
                  <span className="text-xs text-mist transition-colors group-hover:text-[var(--accent)]">
                    {branchSite.domain}
                    <span aria-hidden> ↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Rule />

        {/* ------------------------------------------------ Identity, legal */}
        <div className="grid gap-10 py-10 lg:grid-cols-[1.1fr_1.4fr] lg:gap-20">
          <div>
            <Logo subtitle="full" />
            <p className="mt-6 max-w-sm font-serif text-[1.0625rem] leading-snug text-paper">
              {site.tagline}
            </p>
          </div>
          <p className="text-xs leading-relaxed text-mist">{site.legalNote}</p>
        </div>

        <div className="flex flex-col gap-4 border-t border-mist/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-mist">{site.copyright}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-xs text-mist transition-colors hover:text-[var(--accent)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
