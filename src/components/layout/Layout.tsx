import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { prefersReducedMotion } from '@/lib/utils'

/**
 * Scroll and focus on navigation.
 *
 * An in-page anchor scrolls smoothly (unless reduced motion is requested) and
 * then moves keyboard focus to the section, so the next Tab continues from
 * there. Arriving on a new page starts at the top.
 */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    const samePage = lastPath.current === pathname
    lastPath.current = pathname

    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        const smooth = samePage && !prefersReducedMotion()
        target.scrollIntoView({ behavior: smooth ? 'smooth' : ('instant' as ScrollBehavior) })
        if (samePage) target.focus({ preventScroll: true })
        return
      }
    }
    if (!samePage) window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    // `key` changes on every navigation, so re-clicking the same anchor
    // after scrolling away still scrolls back to it.
  }, [pathname, hash, key])

  return null
}

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-navy focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
