import { Suspense, lazy, type ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { LegalPage } from '@/pages/LegalPage'
import { participantSafety, privacyPolicy, termsOfUse } from '@/content/legal'
import retired from '@/content/redirects.json'
import Home from '@/pages/Home'

const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const split = (element: ReactNode) => <Suspense fallback={null}>{element}</Suspense>

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={split(<Contact />)} />
        <Route path="privacy" element={<LegalPage document={privacyPolicy} />} />
        <Route path="terms" element={<LegalPage document={termsOfUse} />} />
        <Route path="participant-safety" element={<LegalPage document={participantSafety} />} />

        {/* Retired routes. Vercel redirects these at the edge; these cover
            client-side navigation and local development. */}
        {retired.routes.map((r) => (
          <Route
            key={r.from}
            path={r.from.slice(1)}
            element={<Navigate replace to={{ pathname: '/', hash: r.to }} />}
          />
        ))}

        <Route path="*" element={split(<NotFound />)} />
      </Route>
    </Routes>
  )
}
