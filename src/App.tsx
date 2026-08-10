import { Suspense, lazy, type ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { LegalPage } from '@/pages/LegalPage'
import { participantSafety, privacyPolicy, termsOfUse } from '@/content/legal'
import Home from '@/pages/Home'

/* Home ships in the initial bundle; every other route is code-split. */
const About = lazy(() => import('@/pages/About'))
const GlobalNetwork = lazy(() => import('@/pages/GlobalNetwork'))
const BranchDetail = lazy(() => import('@/pages/BranchDetail'))
const OurWork = lazy(() => import('@/pages/OurWork'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const Leadership = lazy(() => import('@/pages/Leadership'))
const Impact = lazy(() => import('@/pages/Impact'))
const Partners = lazy(() => import('@/pages/Partners'))
const News = lazy(() => import('@/pages/News'))
const NewsArticle = lazy(() => import('@/pages/NewsArticle'))
const Contact = lazy(() => import('@/pages/Contact'))
const Join = lazy(() => import('@/pages/Join'))
const StartChapter = lazy(() => import('@/pages/StartChapter'))
const Governance = lazy(() => import('@/pages/Governance'))
const NotFound = lazy(() => import('@/pages/NotFound'))

/** Loading state for split routes — a quiet hairline, not a spinner. */
function RouteFallback() {
  return (
    <div className="flex min-h-dvh items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
      <span aria-hidden className="relative block h-px w-40 overflow-hidden bg-mist/20">
        <span className="absolute inset-y-0 left-0 w-1/3 animate-[ies-slide_1.2s_ease-in-out_infinite] bg-gold" />
      </span>
      <style>{`@keyframes ies-slide{0%{transform:translateX(-100%)}100%{transform:translateX(320%)}}`}</style>
    </div>
  )
}

/** Wraps a code-split page in its Suspense boundary. */
const split = (element: ReactNode) => <Suspense fallback={<RouteFallback />}>{element}</Suspense>

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="about" element={split(<About />)} />
        <Route path="global-network" element={split(<GlobalNetwork />)} />
        <Route path="global-network/:slug" element={split(<BranchDetail />)} />
        <Route path="our-work" element={split(<OurWork />)} />
        <Route path="gallery" element={split(<Gallery />)} />
        <Route path="leadership" element={split(<Leadership />)} />
        <Route path="impact" element={split(<Impact />)} />
        <Route path="partners" element={split(<Partners />)} />
        <Route path="news" element={split(<News />)} />
        <Route path="news/:slug" element={split(<NewsArticle />)} />
        <Route path="contact" element={split(<Contact />)} />
        <Route path="join" element={split(<Join />)} />
        <Route path="start-a-chapter" element={split(<StartChapter />)} />
        <Route path="governance" element={split(<Governance />)} />

        <Route path="privacy" element={<LegalPage document={privacyPolicy} />} />
        <Route path="terms" element={<LegalPage document={termsOfUse} />} />
        <Route path="participant-safety" element={<LegalPage document={participantSafety} />} />

        <Route path="*" element={split(<NotFound />)} />
      </Route>
    </Routes>
  )
}
