import { useEffect } from 'react'
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

export function Layout() {
  return (
    <div className="relative flex min-h-dvh flex-col bg-navy">
      <ScrollManager />
      {/* Sits at z-0; the content below is lifted to z-10 so it paints on top —
          without that, positioned-but-unlayered content would fall behind it. */}
      <GlobeBackdrop />
      <Header />
      <main id="main" className="relative z-10 flex-1">
        <Outlet />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}
