import { Link } from 'react-router-dom'
import { hero } from '@/content/home'

/**
 * Successive teams drawn as overlapping terms. Each solid bar is a term in
 * office; it overlaps the next at the handover, then continues as a dotted
 * line — the former leader's continuing support.
 */
function HandoverFigure() {
  const rows = [
    { y: 46, start: 24, end: 196 },
    { y: 116, start: 164, end: 330 },
    { y: 186, start: 298, end: 416 },
  ]
  return (
    <figure className="fade-in w-full max-w-[30rem] lg:justify-self-end">
      <svg viewBox="0 0 440 220" className="h-auto w-full" aria-hidden focusable="false">
        {rows.map((r, i) => (
          <g key={r.y}>
            {r.end < 416 && (
              <line
                x1={r.end}
                y1={r.y}
                x2={416}
                y2={r.y}
                stroke="var(--color-gold-600)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="0.5 10"
              />
            )}
            <line
              x1={r.start}
              y1={r.y}
              x2={r.end}
              y2={r.y}
              stroke="var(--color-navy-500)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {i < rows.length - 1 && (
              <path
                d={`M${r.end - 16} ${r.y + 12} V${rows[i + 1].y - 12}`}
                stroke="var(--color-gold-800)"
                strokeWidth="1.5"
                markerEnd="url(#handover-arrow)"
              />
            )}
          </g>
        ))}
        <defs>
          <marker
            id="handover-arrow"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M1 1 L9 5 L1 9" fill="none" stroke="var(--color-gold-800)" strokeWidth="1.6" />
          </marker>
        </defs>
      </svg>
      <figcaption>
        <span className="sr-only">
          Diagram: successive leadership teams overlap at each handover, and former leaders keep
          supporting the teams that follow.
        </span>
        <ul aria-hidden className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-slate">
          <li className="flex items-center gap-2">
            <span className="block h-[5px] w-6 rounded-full bg-navy-500" /> Term in office
          </li>
          <li className="flex items-center gap-2">
            <span className="block h-px w-4 bg-gold-800" />
            <span className="-ml-2 text-gold-800">↓</span> Handover
          </li>
          <li className="flex items-center gap-2">
            <span className="block w-6 border-t-[3px] border-dotted border-gold-600" /> Continuing
            support
          </li>
        </ul>
      </figcaption>
    </figure>
  )
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="bg-paper">
      <div className="container-page grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:py-28">
        <div className="fade-in">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-heading" className="text-display mt-5 max-w-[16ch] text-navy">
            {hero.headline}
          </h1>
          <p className="text-lead mt-7 max-w-[38rem] text-ink-soft">{hero.body}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              to={{ pathname: '/', hash: hero.primary.anchor }}
              className="inline-flex items-center gap-2 rounded-sm bg-navy px-6 py-3.5 text-[0.9375rem] font-medium text-paper transition-colors hover:bg-navy-600"
            >
              {hero.primary.label}
            </Link>
            <Link
              to={{ pathname: '/', hash: hero.secondary.anchor }}
              className="link text-[0.9375rem] font-medium text-navy"
            >
              {hero.secondary.label}
            </Link>
          </div>
        </div>
        <HandoverFigure />
      </div>
    </section>
  )
}
