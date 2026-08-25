import { useEffect, type CSSProperties } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { EntryGate } from './EntryGate'
import { GlobeBackdrop } from '@/components/GlobeBackdrop'

/** Resets scroll position on navigation, honouring in-page anchors. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      /*
       * By id, not by selector. `querySelector('#4-pillars')` throws — a hash
       * only has to be a valid element id, and plenty of valid ids (leading
       * digit, a colon, a space) are not valid CSS selectors. The throw
       * happened inside this effect, which took the whole page down with it:
       * any inbound link carrying such a hash rendered a blank site.
       */
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
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
  const { pathname } = useLocation()

  return (
    <div className="relative flex min-h-dvh flex-col bg-navy">
      <ScrollManager />
      {/* Above everything, including the header, and removes itself. */}
      <EntryGate />
      {/* Sits at z-0; the content below is lifted to z-10 so it paints on top —
          without that, positioned-but-unlayered content would fall behind it. */}
      <GlobeBackdrop />
      <Header />
      <main
        id="main"
        className="relative z-10 flex-1"
        style={{ '--accent': `var(--color-${accent})` } as CSSProperties}
      >
        {/*
         * Keyed on the path so React tears the old page down and mounts the new
         * one, which restarts the arrival animation — a CSS animation on a
         * surviving element does not replay, and without the key a navigation
         * would fade in exactly once, on the first page anyone landed on.
         *
         * Not keyed on `location.key`: an in-page anchor is a new key on the
         * same path, and remounting the page underneath someone who clicked a
         * jump link would throw away the scroll target they were jumping to.
         */}
        <div key={pathname} className="route-enter">
          <Outlet />
        </div>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}
