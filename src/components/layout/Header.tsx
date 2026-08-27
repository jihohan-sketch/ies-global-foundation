import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { PINNED, observeScroll } from '@/lib/scroll'
import { primaryNav, site } from '@/content/site'
import { branches } from '@/content/branches'
import { Button, Container } from '@/components/ui/Primitives'
import { Logo } from './Logo'
import { cx } from '@/lib/utils'

/* The drawer sits at z-40 and the header at z-50, so the toggle stays visible
   above the overlay and belongs inside the focus cycle rather than outside it. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * How far through the document the visitor is, as a hairline under the header.
 *
 * Measures `document.body` on the pinned window — 0 with the body's top at the
 * top of the viewport, 1 with its bottom at the bottom — which is exactly the
 * definition of document scroll progress, so no second scroll system is needed
 * for it.
 *
 * `always`, because this reports a position rather than performing a movement.
 * On a site with several sections that are deliberately many screens long, the
 * scrollbar is the only other thing telling anyone how much is left, and it is
 * the first thing a trackpad hides.
 */
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = ref.current
    if (!bar) return
    return observeScroll(document.body, { ...PINNED, target: bar, always: true })
  }, [])

  return (
    /*
     * At the very top of the viewport, not under the header.
     *
     * Under the header it was a second horizontal line a few pixels below the
     * header's own border — two rules doing one job, and the reading was
     * ambiguous: neither one obviously meant "position in the document". On the
     * top edge there is nothing else for it to be.
     */
    <div aria-hidden className="absolute inset-x-0 top-0 h-px overflow-hidden">
      <div ref={ref} className="scroll-progress h-full w-full bg-[var(--accent)]/60" />
    </div>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close the drawer on navigation — keyed on the location's key, not its
     pathname. Tapping the entry for the page you are already on is a
     navigation the visitor expects to dismiss the menu, but the pathname does
     not change, so the drawer stayed open over the page with body scroll still
     locked behind it. */
  useEffect(() => setOpen(false), [location.key])

  /* Lock scroll behind the overlay. */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  /* Moves focus into the drawer on open, keeps Tab inside it, and hands focus
     back to the toggle on Escape. Without the trap, tabbing walks straight
     through the overlay into the page behind it. */
  useEffect(() => {
    if (!open) return

    const drawer = drawerRef.current
    drawer?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }

      if (e.key !== 'Tab') return

      const nodes = [
        toggleRef.current,
        ...Array.from(drawer?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
      ].filter((node): node is HTMLElement => node !== null && node.tabIndex !== -1)

      if (nodes.length === 0) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (active && !nodes.includes(active)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-navy"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        {/*
         * The scrim, as its own layer rather than a background on the header.
         *
         * Transparent while the menu is open, even when scrolled: the header
         * sits above the overlay so its toggle stays clickable and stays inside
         * the focus cycle, and painting a band there would cut across an
         * otherwise full-bleed field and break the one impression the overlay
         * exists to give.
         *
         * It fades rather than switching — a scrim that appears the instant the
         * page moves 24px is a flicker, not a response. See `.header-scrim`.
         */}
        <div
          aria-hidden
          className={cx(
            'header-scrim transition-opacity duration-700 ease-[var(--ease-cinema)]',
            scrolled && !open ? 'opacity-100' : 'opacity-0',
          )}
        />

        <Container size="wide" className="relative">
          {/* ------------------------------------------------- Primary row */}
          {/* Three tracks, not `justify-between`: the wordmark is centred on the
              *viewport*, which only holds if the flanking columns are equal
              regardless of what they contain. With space-between it drifted
              left or right as the quote and the actions changed width. */}
          <div
            className={cx(
              'grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-500',
              scrolled ? 'h-18 py-3' : 'h-24 py-5',
            )}
          >
            {/* The ambient epigraph. Decorative texture in the reference
                language, and treated as such: it repeats the motto already in
                the footer, so it is hidden from assistive tech rather than
                read out on every page. */}
            <p
              aria-hidden
              className={cx(
                'hidden min-w-0 flex-col gap-0.5 leading-tight transition-opacity duration-500 xl:flex',
                /* Also clears for the overlay: the epigraph is ambient texture
                   for the page, and the menu is not the page. */
                scrolled || open ? 'opacity-0' : 'opacity-100',
              )}
            >
              <span className="truncate font-serif text-[0.9375rem] text-paper/70 italic">
                {site.missionMotto}
              </span>
              <span className="text-[0.5625rem] font-medium tracking-[0.28em] text-mist/60 uppercase">
                {site.motto}
              </span>
            </p>

            <Link
              to="/"
              aria-label="IES Global Foundation — home"
              className="col-start-2 justify-self-center"
            >
              <Logo />
            </Link>

            <div className="col-start-3 flex shrink-0 items-center justify-end gap-3">
              {/* Wrapped rather than given `hidden` directly: Button's base class
                  sets `inline-flex`, and utility order in the stylesheet — not
                  the class attribute — decides which display rule wins. */}
              {/* Withdrawn while the menu is open — the overlay carries its own
                  pair of these, and two live "Join IES" controls a few hundred
                  pixels apart is one too many. `invisible` rather than
                  `hidden` so the row keeps its width and the toggle beside it
                  does not slide sideways as the menu opens. */}
              <span
                className={cx(
                  'hidden transition-opacity duration-300 sm:block',
                  open && 'invisible opacity-0',
                )}
              >
                <Button to="/join" variant="secondary" className="px-6 py-3">
                  Join IES
                </Button>
              </span>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? 'Close menu' : 'Open menu'}
                /* No longer `xl:hidden`. The nav rail below collapses the
                   moment the page is scrolled, which used to leave a desktop
                   visitor with no navigation at all beyond the first screen —
                   the rail is the shortcut, this is the way in, and both belong
                   at every width. */
                className="flex h-11 w-11 items-center justify-center rounded-full border border-mist/55 transition-colors hover:border-gold/60"
              >
                <span className="relative block h-3 w-5">
                  <span
                    className={cx(
                      'absolute left-0 block h-px w-5 bg-paper transition-all duration-300',
                      open ? 'top-1.5 rotate-45' : 'top-0',
                    )}
                  />
                  <span
                    className={cx(
                      'absolute left-0 block h-px w-5 bg-paper transition-all duration-300',
                      open ? 'top-1.5 -rotate-45' : 'top-3',
                    )}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* ---------------------------------------------------- Nav rail */}
          {/*
           * The nav in the reference register: wide-tracked capitals spread
           * edge to edge under a hairline, rather than a cluster of links.
           *
           * It collapses on scroll — `grid-rows-[0fr]` to `[1fr]` rather than a
           * height, so nothing here carries a magic pixel value that breaks
           * when a label is added. The inner element needs `overflow-hidden`
           * for that to clip, and `invisible` at the collapsed end keeps the
           * links out of the tab order rather than merely out of sight.
           */}
          <div
            className={cx(
              'hidden grid-rows-[1fr] transition-all duration-500 ease-[var(--ease-cinema)] xl:grid',
              scrolled && 'grid-rows-[0fr] opacity-0',
              /* Withdrawn while the menu is open, for the same reason the Join
                 button above is: the overlay carries the whole of this nav at
                 display size, and leaving the rail up meant two live copies of
                 every link on screen at once — the rail's ABOUT sitting
                 directly on top of the overlay's. `invisible` alongside the
                 fade so the duplicate links leave the tab order too. */
              open && 'invisible opacity-0',
            )}
          >
            <nav
              aria-label="Primary"
              className={cx('overflow-hidden', scrolled && 'invisible')}
            >
              <ul className="flex items-center justify-between border-t border-mist/12 pt-4 pb-5">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      tabIndex={scrolled ? -1 : undefined}
                      className={({ isActive }) =>
                        cx(
                          'relative block py-1 text-[0.6875rem] font-medium whitespace-nowrap uppercase transition-colors duration-300',
                          /* Tracking this wide needs the trailing step taken
                             back, or every label sits a notch left of centre in
                             its own slot. */
                          'tracking-[0.24em] -mr-[0.24em]',
                          'after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-[var(--accent)] after:transition-all after:duration-500',
                          isActive
                            ? 'text-[var(--accent)] after:w-[calc(100%-0.24em)]'
                            : 'text-paper/70 hover:text-paper after:w-0 hover:after:w-[calc(100%-0.24em)]',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>

        {/* Outside the Container so the line runs the full width of the
            viewport rather than stopping at the content gutters, and hidden
            while the menu is open — the overlay is not the document. */}
        {!open && <ScrollProgress />}
      </header>

      {/* --------------------------------------------------------- Overlay */}
      {/*
       * The menu as a held frame over the page, not a panel beside it.
       *
       * Three things make it read that way rather than as a modal. It is
       * translucent and blurred, so the page is still visibly *there* behind
       * it — the visitor has paused the site, not left it. The entries are set
       * in the cinematic register (wide-tracked serif capitals, centred) and
       * nothing else shares the screen with them. And they arrive in sequence
       * on a stagger, which turns opening the menu into a movement instead of
       * a state change.
       *
       * `backdrop-blur` needs something translucent above it to blur *through*:
       * at `bg-navy` the filter is computed and then hidden behind an opaque
       * fill. The tint below is the ground at 72%, which is dark enough for the
       * type to clear AA against the brightest thing the page can put behind it
       * (a lit photograph) and still light enough that the page reads through.
       */}
      <div
        id="mobile-nav"
        ref={drawerRef}
        role="dialog"
        aria-modal={open || undefined}
        aria-label="Site menu"
        className={cx(
          'fixed inset-0 z-40 overflow-y-auto bg-navy/72 backdrop-blur-2xl transition-all duration-500 ease-[var(--ease-cinema)]',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        aria-hidden={!open}
      >
        {/* `min-h-full` with `place-items-center`, not `h-full`: the column
            centres in the viewport when it fits and scrolls from the top when
            it does not, which is what a nine-entry menu on a short laptop
            window needs. */}
        <div className="grid min-h-full place-items-center px-6 py-28">
          <div className="w-full max-w-3xl">
            <nav aria-label="Site" className="flex flex-col items-center">
              {primaryNav.map((item, i) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  tabIndex={open ? 0 : -1}
                  className={({ isActive }) =>
                    cx(
                      /* Tracked at 0.22em, and the trailing step taken back so
                         a centred label sits on the centre line rather than
                         half a step left of it. */
                      'block py-2.5 -mr-[0.22em] font-serif font-light tracking-[0.22em] uppercase',
                      'text-[clamp(1.125rem,3.2vw,1.875rem)] leading-tight',
                      'transition-[color,opacity,transform] duration-500 ease-[var(--ease-cinema)]',
                      isActive ? 'text-[var(--accent)]' : 'text-paper/80 hover:text-paper',
                    )
                  }
                  style={{
                    /* Delay on the way in only. Closing, every entry leaves at
                       once — a staggered exit makes dismissing the menu feel
                       like it is refusing to go. */
                    transitionDelay: open ? `${120 + i * 40}ms` : '0ms',
                    opacity: open ? 1 : 0,
                    transform: open ? 'none' : 'translateY(14px)',
                  }}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* The rest of the overlay arrives after the last entry has. */}
            <div
              className="transition-all duration-500 ease-[var(--ease-cinema)]"
              style={{
                transitionDelay: open ? `${120 + primaryNav.length * 40}ms` : '0ms',
                opacity: open ? 1 : 0,
                transform: open ? 'none' : 'translateY(14px)',
              }}
            >
              <div className="mx-auto mt-12 h-px w-full max-w-md bg-mist/15" />

              <p className="mt-10 text-center text-[0.5625rem] font-medium tracking-[0.3em] text-mist/80 uppercase">
                National Branches
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-x-10 gap-y-3">
                {branches.map((branch) => (
                  <Link
                    key={branch.slug}
                    to={`/global-network/${branch.slug}`}
                    tabIndex={open ? 0 : -1}
                    className="text-sm font-light text-paper/72 transition-colors hover:text-[var(--accent)]"
                  >
                    {branch.name}
                  </Link>
                ))}
              </div>

              <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button to="/join" variant="primary">
                  Join IES
                </Button>
                <Button to="/partners" variant="secondary">
                  Partner With Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
