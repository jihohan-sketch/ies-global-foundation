import { useEffect } from 'react'
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
        /*
         * `instant`, not `smooth`.
         *
         * This runs on *arrival* — a fresh load or a cross-page link — so
         * there is no continuity to preserve; the visitor has not seen the top
         * of the page and is not being carried anywhere they were looking. And
         * the home page is over 23,000px tall, which is where the smooth
         * version fell apart: an anchor near the end asked the browser to
         * animate twenty thousand pixels, which it caps and which any layout
         * shift on the way cancels outright. Measured, `/#leadership` was
         * still sitting at scrollY 0 more than two seconds after load.
         *
         * Smooth scrolling belongs on in-page jumps the visitor makes while
         * already reading, which is a different code path.
         */
        target.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}

/*
 * THE ACCENT NO LONGER MOVES.
 *
 * There used to be four of these, re-pointed per route — gold for home and
 * about, sky for the network, sage for the work, clay for the invitations —
 * on the argument that a page should "read as its own place". It does read as
 * its own place; it just stops reading as the same organisation. A mark's
 * accent is worth something precisely because it is invariant: seeing the IES
 * blue on the sixth page has to be recognition rather than decoration, and it
 * cannot be if the fifth page was green.
 *
 * `--accent` is still a variable and still the only thing any component reads,
 * because it does still change — not by route, but by *ground*. `Section` sets
 * `data-ground="light"` on its paper and bone tones, and the rule in index.css
 * swaps the blue for its dark counterpart there. That is a legibility flip
 * rather than an identity one.
 */

export function Layout() {
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
      <main id="main" className="relative z-10 flex-1">
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
