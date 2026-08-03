import { useEffect, type CSSProperties } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { GlobeBackdrop } from '@/components/GlobeBackdrop'

/** Resets scroll position on navigation, honouring in-page anchors. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}

/*
 * Section accent by route. Set once here rather than per page, so a page picks
 * up its colour by existing at a path — there is nothing to remember to pass
 * when a new section is written.
 *
 * Grouped by what the pages are for, not to spread the colours evenly: the
 * network and the documents that govern it are sky, the programming and what
 * it produced are sage, and the outward-facing invitations are clay. Home,
 * About and Leadership stay on brand gold — they are the site introducing
 * itself, and that is the colour it introduces itself in.
 */
const ROUTE_ACCENTS: Record<string, string> = {
  'global-network': 'sky',
  governance: 'sky',
  contact: 'sky',
  'our-work': 'sage',
  impact: 'sage',
  news: 'clay',
  partners: 'clay',
  join: 'clay',
  'start-a-chapter': 'clay',
}

function useRouteAccent() {
  const { pathname } = useLocation()
  // First segment only: /news/:slug and /global-network/:slug inherit the
  // accent of the section they belong to.
  const segment = pathname.split('/')[1] ?? ''
  return ROUTE_ACCENTS[segment] ?? 'gold'
}

export function Layout() {
  const accent = useRouteAccent()

  return (
    <div className="relative flex min-h-dvh flex-col bg-navy">
      <ScrollManager />
      {/* Sits at z-0; the content below is lifted to z-10 so it paints on top —
          without that, positioned-but-unlayered content would fall behind it. */}
      <GlobeBackdrop />
      <Header />
      <main
        id="main"
        className="relative z-10 flex-1"
        style={{ '--accent': `var(--color-${accent})` } as CSSProperties}
      >
        <Outlet />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}
