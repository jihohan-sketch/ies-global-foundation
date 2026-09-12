import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { primaryNav, secondaryNav } from '@/content/site'
import { branches } from '@/content/branches'
import { Button, Container } from '@/components/ui/Primitives'
import { Logo } from './Logo'
import { cx } from '@/lib/utils'

/* The drawer sits at z-40 and the header at z-50, so the toggle stays visible
   above the overlay and belongs inside the focus cycle rather than outside it. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/*
 * WHICH GROUND IS UNDER THE HEADER RIGHT NOW.
 *
 * The redesign puts light sections into a page whose header is drawn for a
 * dark one, and a fixed bar has to cross them. Three ways to handle that, and
 * only the third survives contact with a full-bleed page:
 *
 *   · Leave it. The wordmark and the menu toggle are near-white; over `paper`
 *     they sit at about 1.2:1. Not an option.
 *   · Paint an opaque dark bar always. This is what the scrim tried to do, and
 *     over a light section a blurred dark band with a masked edge reads as a
 *     smear across the top of the page rather than as chrome.
 *   · Flip the bar. Below, and what this hook is for.
 *
 * IMPLEMENTED AS AN INTERSECTION OBSERVER WITH A ONE-PIXEL ROOT, not as a
 * scroll handler calling `elementFromPoint`. The observer's root margin
 * collapses the viewport to a band at the header's own height, so a light
 * section "intersects" exactly while it is behind the bar — no work per frame,
 * no layout read, and the browser does the hit-testing. A scroll handler doing
 * the same thing costs a forced layout on every frame of every scroll on every
 * page, to answer a question whose answer changes a handful of times per page.
 *
 * The observed set is re-collected on navigation, since each route brings its
 * own sections. `MutationObserver` would catch late-mounted ones too, but
 * sections are not added after paint anywhere on this site, and the cost of
 * watching the whole document for that case is not worth paying.
 */
const HEADER_BAND = 96

function useGroundUnderHeader() {
  const { pathname } = useLocation()
  const [onLight, setOnLight] = useState(false)

  useEffect(() => {
    setOnLight(false)
    if (!('IntersectionObserver' in window)) return

    /* Deferred one frame: this runs on the route's first commit, and the
       incoming page's sections are not in the document until it has painted. */
    let observer: IntersectionObserver | null = null
    const raf = requestAnimationFrame(() => {
      const lightSections = document.querySelectorAll('[data-ground="light"]')
      if (lightSections.length === 0) return

      /* Sections that are currently crossing the band. A `Set` rather than a
         boolean because two of them can touch the band at once — the foot of
         one and the head of the next, during the pixel or two where they meet.
         Counting them means the flip never flickers at a section boundary. */
      const crossing = new Set<Element>()

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) crossing.add(entry.target)
            else crossing.delete(entry.target)
          }
          setOnLight(crossing.size > 0)
        },
        { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - HEADER_BAND)}px 0px` },
      )

      for (const section of lightSections) observer.observe(section)
    })

    return () => {
      cancelAnimationFrame(raf)
      observer?.disconnect()
    }
  }, [pathname])

  return onLight
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  /*
   * Whether the bar is currently sitting over a light section — see
   * `useGroundUnderHeader`. Everything in the bar that carries a colour reads
   * this, because a near-white wordmark over an off-white section is not a
   * styling preference, it is unreadable.
   */
  const onLight = useGroundUnderHeader()
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

      {/*
       * `data-on-light` is what the wordmark, the nav links, the toggle and
       * the JOIN IES button read to flip their own ink. It is set on the
       * header rather than passed down because several of those live inside
       * `Logo`, which has no reason to know about scroll position.
       */}
      <header
        data-on-light={onLight && !open ? '' : undefined}
        className="fixed inset-x-0 top-0 z-50 [--bar-ink:var(--color-paper)] [--bar-ink-dim:var(--color-mist)] data-on-light:[--bar-ink:var(--color-navy)] data-on-light:[--bar-ink-dim:var(--color-navy-600)]"
      >
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
        {/* Two scrims, cross-faded. The light one is the same gradient in
            paper rather than navy, so the bar dissolves into whichever ground
            it is over instead of stamping a dark band across a white one. */}
        <div
          aria-hidden
          className={cx(
            'header-scrim transition-opacity duration-500 ease-[var(--ease-cinema)]',
            scrolled && !open && !onLight ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          aria-hidden
          className={cx(
            'header-scrim header-scrim-light transition-opacity duration-500 ease-[var(--ease-cinema)]',
            scrolled && !open && onLight ? 'opacity-100' : 'opacity-0',
          )}
        />

        {/*
         * ONE ROW, AND THAT IS THE CHANGE.
         *
         * The bar used to be two: a primary row carrying an ambient epigraph on
         * the left, the wordmark centred, and the actions on the right — and
         * beneath it a second row holding the navigation, which collapsed the
         * moment the page was scrolled. Plus a scroll-progress hairline along
         * the very top edge. Five distinct pieces of chrome, two of them
         * decorative, occupying 150px of every screen before a word of the page
         * had been read.
         *
         * What a visitor needs from a header is: whose site this is, where they
         * can go, and the one thing the organisation wants them to do. That is
         * three things, and they fit on one line — mark left, navigation right,
         * the ask at the end of it. Nothing here collapses on scroll, so the
         * navigation is available for the whole page rather than only its first
         * screen, which is what the menu button was compensating for.
         *
         * WHAT WENT, AND WHY:
         *   THE EPIGRAPH  A serif motto and a tracked tagline in the top-left
         *                 corner, repeating what the footer already says and
         *                 hidden from assistive tech because of it. Ambient
         *                 texture is the first thing to cut from a bar that is
         *                 asking for attention it does not need.
         *   THE PROGRESS  A hairline reporting how far down the document the
         *                 reader is. It made sense on a home page of eleven
         *                 movements and several pinned scenes; the longest page
         *                 on the site is now an ordinary scroll, and the
         *                 scrollbar already answers the question.
         *   THE CENTRING  A centred wordmark needs equal flanking columns to
         *                 stay centred, which is what forced the three-track
         *                 grid and the epigraph that filled the left one. Left
         *                 is where a reader looks for a mark, and it costs
         *                 nothing to hold it there.
         */}
        <Container size="wide" className="relative">
          <div
            className={cx(
              'flex items-center justify-between gap-6 transition-all duration-500',
              scrolled ? 'h-18 py-3' : 'h-22 py-4',
            )}
          >
            <Link to="/" aria-label="IES Global Foundation — home" className="shrink-0">
              <Logo variant="auto" />
            </Link>

            <div className="flex shrink-0 items-center gap-6 xl:gap-9">
              {/* The navigation, inline and permanent from `xl`. Below that the
                  menu button is the navigation, which is what it is for. */}
              {/* Withdrawn while the overlay is up: the overlay carries the
                  whole of this nav at display size, and leaving the row in
                  place put its ABOUT directly above the overlay's. `invisible`
                  alongside the fade so the duplicate links leave the tab order
                  too. */}
              <nav
                aria-label="Primary"
                className={cx(
                  'hidden transition-opacity duration-300 xl:block',
                  open && 'invisible opacity-0',
                )}
              >
                <ul className="flex items-center gap-x-9">
                  {primaryNav.map((item) => (
                    <li key={item.href}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          cx(
                            /* 12px / 600 / 0.1em. Navigation is the one piece
                               of text on a site that is never *read* — it is
                               recognised, at speed, out of the corner of the
                               eye — and wide tracking is precisely what stops a
                               word being recognisable as a shape. */
                            'relative block py-1 text-[0.75rem] font-semibold whitespace-nowrap uppercase transition-colors duration-300',
                            'tracking-[0.1em] -mr-[0.1em]',
                            /* 2px, and it stays put under the active item. A
                               hairline underline is a hover flourish; the
                               active marker has to be visible without being
                               looked for. */
                            'after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-[var(--accent)] after:transition-all after:duration-500',
                            isActive
                              ? 'text-[var(--accent)] after:w-[calc(100%-0.1em)]'
                              : 'text-[var(--bar-ink)]/85 hover:text-[var(--bar-ink)] after:w-0 hover:after:w-[calc(100%-0.1em)]',
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex shrink-0 items-center gap-3">
                {/* Wrapped rather than given `hidden` directly: Button's base
                    class sets `inline-flex`, and utility order in the
                    stylesheet — not the class attribute — decides which display
                    rule wins. */}
                {/* Withdrawn while the menu is open — the overlay carries its
                    own pair of these. `invisible` rather than `hidden` so the
                    row keeps its width and the toggle beside it does not slide
                    sideways as the menu opens. */}
                <span
                  className={cx(
                    'hidden transition-opacity duration-300 sm:block',
                    open && 'invisible opacity-0',
                  )}
                >
                  {/* Outlined in whatever ink the bar is currently using, so
                      the one persistent call to action survives a light section
                      without a second variant being threaded through Button. */}
                  <Button
                    to="/join"
                    variant="secondary"
                    /* `!` on the colour: `Button`'s `secondary` variant already
                       sets a text colour, and between two utilities of the same
                       property it is stylesheet order — not class-attribute
                       order — that decides, so without it the label stayed
                       paper white and vanished over a light section. */
                    className="border-[var(--bar-ink)]/40 px-6 py-3 !text-[var(--bar-ink)] hover:border-[var(--accent)]/70 hover:!text-[var(--accent)]"
                  >
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
                  /* Present at every width. Below `xl` it is the navigation;
                     at and above it, it is the way to the destinations the bar
                     does not carry — leadership, gallery, partners, news, and
                     the three branches. */
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--bar-ink)]/40 transition-colors duration-500 hover:border-[var(--accent)]/70"
                >
                  <span className="relative block h-3 w-5">
                    <span
                      className={cx(
                        'absolute left-0 block h-px w-5 bg-[var(--bar-ink)] transition-all duration-300',
                        open ? 'top-1.5 rotate-45' : 'top-0',
                      )}
                    />
                    <span
                      className={cx(
                        'absolute left-0 block h-px w-5 bg-[var(--bar-ink)] transition-all duration-300',
                        open ? 'top-1.5 -rotate-45' : 'top-3',
                      )}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Container>
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
            it does not, which is what a full menu on a short laptop window
            needs. */}
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
                      'block py-2.5 -mr-[0.22em] font-serif font-normal tracking-[0.22em] uppercase',
                      'text-[clamp(1.125rem,3.2vw,1.875rem)] leading-tight',
                      'transition-[color,opacity,transform] duration-500 ease-[var(--ease-cinema)]',
                      isActive ? 'text-[var(--accent)]' : 'text-paper hover:text-paper',
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

              {/*
               * THE SECOND TIER, AND THE OVERLAY IS WHERE IT LIVES.
               *
               * The header rail carries five destinations now rather than nine
               * — see the note on `primaryNav`. These four are the rest, and
               * they are set smaller and in a row rather than at display size
               * in the column, which is the whole point: the column is the
               * first-visit path, and this is everything else, one click away
               * and visibly a second rank rather than hidden.
               *
               * A row rather than a dropdown on the rail. A hover menu is the
               * obvious alternative and it has no answer on a touch screen,
               * where there is no hover to open it with.
               */}
              <p className="mt-10 text-center text-[0.6875rem] font-semibold tracking-[0.12em] text-mist uppercase">
                More
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-x-9 gap-y-3">
                {secondaryNav.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    tabIndex={open ? 0 : -1}
                    className={({ isActive }) =>
                      cx(
                        '-mr-[0.14em] font-serif text-[1.0625rem] tracking-[0.14em] uppercase transition-colors duration-300',
                        isActive ? 'text-[var(--accent)]' : 'text-paper/85 hover:text-[var(--accent)]',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div className="mx-auto mt-11 h-px w-full max-w-md bg-mist/15" />

              <p className="mt-10 text-center text-[0.6875rem] font-semibold tracking-[0.12em] text-mist uppercase">
                National Branches
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-x-10 gap-y-3">
                {branches.map((branch) => (
                  <Link
                    key={branch.slug}
                    to={`/global-network/${branch.slug}`}
                    tabIndex={open ? 0 : -1}
                    className="text-sm text-mist transition-colors hover:text-[var(--accent)]"
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
