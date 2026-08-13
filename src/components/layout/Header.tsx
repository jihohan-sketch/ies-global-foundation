import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { primaryNav } from '@/content/site'
import { branches } from '@/content/branches'
import { Button, Container } from '@/components/ui/Primitives'
import { Logo } from './Logo'
import { cx } from '@/lib/utils'

/* The drawer sits at z-40 and the header at z-50, so the toggle stays visible
   above the overlay and belongs inside the focus cycle rather than outside it. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

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

  /* The drawer is hidden by CSS at the desktop breakpoint, but hiding it does
     not close it: `open` stayed true, the scroll lock stayed on, and the toggle
     that would undo it is hidden too. Anyone who opened the menu on a narrow
     window and then widened it was left on a page that would not scroll. */
  useEffect(() => {
    // Tailwind's `xl`, where the header switches to the inline nav.
    const desktop = window.matchMedia('(min-width: 80rem)')
    const onChange = () => {
      if (desktop.matches) setOpen(false)
    }
    onChange()
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  /* Lock scroll behind the mobile drawer. */
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

      <header
        className={cx(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          scrolled || open
            ? 'border-b border-mist/12 bg-navy/92 backdrop-blur-xl'
            : 'border-b border-transparent',
        )}
      >
        <Container size="wide">
          <div
            className={cx(
              'flex items-center justify-between transition-all duration-500',
              scrolled ? 'h-18 py-3' : 'h-24 py-5',
            )}
          >
            <Link to="/" aria-label="IES Global Foundation — home" className="shrink-0">
              <Logo />
            </Link>

            <nav
              aria-label="Primary"
              className="hidden min-w-0 flex-1 items-center justify-center gap-5 px-6 xl:flex 2xl:gap-7"
            >
              {primaryNav.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cx(
                      'relative py-2 text-[0.8125rem] font-medium tracking-[0.04em] whitespace-nowrap transition-colors duration-300',
                      'after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-400',
                      isActive
                        ? 'text-gold after:w-full'
                        : 'text-paper/78 hover:text-paper after:w-0 hover:after:w-full',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-4">
              {/* Wrapped rather than given `hidden` directly: Button's base class
                  sets `inline-flex`, and utility order in the stylesheet — not
                  the class attribute — decides which display rule wins. */}
              <span className="hidden lg:block">
                <Button to="/join" variant="primary" className="px-6 py-3">
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
                className="flex h-11 w-11 items-center justify-center border border-mist/55 transition-colors hover:border-gold/60 xl:hidden"
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
        </Container>
      </header>

      {/* ---------------------------------------------------- Mobile drawer */}
      <div
        id="mobile-nav"
        ref={drawerRef}
        role="dialog"
        aria-modal={open || undefined}
        aria-label="Site menu"
        className={cx(
          'fixed inset-0 z-40 bg-navy transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] xl:hidden',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        aria-hidden={!open}
      >
        <div className="h-24" />
        <div className="h-[calc(100dvh-6rem)] overflow-y-auto pb-16">
          <Container>
            <nav aria-label="Mobile" className="flex flex-col">
              {primaryNav.map((item, i) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  tabIndex={open ? 0 : -1}
                  className={({ isActive }) =>
                    cx(
                      'group border-b border-mist/12 py-5 transition-all duration-500',
                      isActive ? 'text-gold' : 'text-paper',
                    )
                  }
                  style={{
                    transitionDelay: open ? `${80 + i * 45}ms` : '0ms',
                    opacity: open ? 1 : 0,
                    transform: open ? 'none' : 'translateY(12px)',
                  }}
                >
                  <span className="font-serif text-h3 block">{item.label}</span>
                  {item.description && (
                    <span className="mt-1 block text-sm font-light text-mist">
                      {item.description}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="mt-10">
              <p className="text-[0.6875rem] font-medium tracking-[0.24em] text-gold uppercase">
                National Branches
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {branches.map((branch) => (
                  <Link
                    key={branch.slug}
                    to={`/global-network/${branch.slug}`}
                    tabIndex={open ? 0 : -1}
                    className="text-paper/80 transition-colors hover:text-gold"
                  >
                    {branch.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button to="/join" variant="primary" className="flex-1">
                Join IES
              </Button>
              <Button to="/partners" variant="secondary" className="flex-1">
                Partner With Us
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </>
  )
}
