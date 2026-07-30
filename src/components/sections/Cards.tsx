import { Link } from 'react-router-dom'
import type { Branch, NewsArticle, Person } from '@/content/types'
import { Card } from '@/components/ui/Primitives'
import { formatDate, initials } from '@/lib/utils'

/* ------------------------------------------------------------- BranchCard */

export function BranchCard({ branch, index }: { branch: Branch; index: number }) {
  return (
    <Card interactive className="group h-full">
      <Link
        to={`/global-network/${branch.slug}`}
        className="flex h-full flex-col p-8 sm:p-10"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="font-serif text-sm text-mist/60">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="border border-gold/35 px-3 py-1 text-[0.625rem] font-medium tracking-[0.16em] text-gold uppercase">
            {branch.status}
          </span>
        </div>

        <h3 className="text-h3 mt-8 transition-colors duration-300 group-hover:text-gold-300">
          {branch.name}
        </h3>

        <p className="mt-3 text-sm font-medium tracking-wide text-gold/85">{branch.role}</p>

        <p className="mt-5 flex-1 text-[0.9375rem] leading-relaxed font-light text-mist">
          {branch.summary}
        </p>

        <span className="mt-8 inline-flex items-center gap-2 text-[0.75rem] font-medium tracking-[0.14em] text-paper/85 uppercase transition-colors group-hover:text-gold">
          View branch
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </Link>
    </Card>
  )
}

/* ------------------------------------------------------------- PersonCard */

export function PersonCard({ person, branchName }: { person: Person; branchName?: string }) {
  return (
    /* @container, not a viewport breakpoint: the same card sits in a two-up
       grid on Leadership and a three-up grid on Home, so it has to decide
       between portrait-beside-text and portrait-above-text from its own
       width rather than the window's. */
    <Card className="@container h-full overflow-hidden">
      <div className="flex h-full flex-col">
        <div className="flex flex-col @md:flex-row">
          {/* Square and uncropped — the source files are 512×512, so this is
              the whole photograph at close to native size, bled to the card
              edge rather than punched into an avatar circle. */}
          <div className="shrink-0 @md:w-[38%] @md:max-w-[17rem]">
            {person.photo ? (
              <img
                src={person.photo}
                alt=""
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div
                aria-hidden
                className="flex aspect-square w-full items-center justify-center border-b border-mist/12 bg-navy-700/60 @md:border-r @md:border-b-0"
              >
                <span className="font-serif text-4xl text-gold/70">{initials(person.name)}</span>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 p-8">
            <h3 className="font-serif text-xl leading-tight">
              {person.name}
              {person.koreanName && (
                <span className="ml-2 text-base font-light text-mist">{person.koreanName}</span>
              )}
            </h3>
            <p className="mt-1.5 text-[0.8125rem] font-medium tracking-wide text-gold">
              {person.title}
            </p>
            {branchName && <p className="mt-0.5 text-xs font-light text-mist">{branchName}</p>}

            {person.affiliations && person.affiliations.length > 0 && (
              <ul className="mt-5 space-y-1">
                {person.affiliations.map((item) => (
                  <li key={item} className="text-[0.8125rem] font-light text-mist/80">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-6 text-[0.9375rem] leading-relaxed font-light text-mist">
              {person.bio}
            </p>
          </div>
        </div>

        {/* Full card width rather than tucked into the text column: a long list
            would otherwise stretch the right side while the square portrait
            leaves the left side empty. */}
        {person.responsibilities.length > 0 && (
          <div className="mt-auto border-t border-mist/12 p-8">
            <p className="text-[0.625rem] font-medium tracking-[0.2em] text-mist/70 uppercase">
              Responsibilities
            </p>
            <ul className="mt-3 grid gap-2 @2xl:grid-cols-2 @2xl:gap-x-8">
              {person.responsibilities.map((item) => (
                <li key={item} className="flex gap-3 text-[0.875rem] font-light text-paper/78">
                  <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-gold/60" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  )
}

/* ------------------------------------------------------------ ArticleCard */

export function ArticleCard({
  article,
  featured = false,
}: {
  article: NewsArticle
  featured?: boolean
}) {
  return (
    <Card interactive className="group h-full">
      <Link to={`/news/${article.slug}`} className="flex h-full flex-col">
        <div
          className="relative overflow-hidden border-b border-mist/12"
          style={{ aspectRatio: featured ? '16 / 9' : '3 / 2' }}
        >
          {article.cover ? (
            <img
              src={article.cover}
              alt={article.coverAlt ?? ''}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <GeneratedCover seed={article.slug} label={article.category} />
          )}
        </div>

        <div className="flex flex-1 flex-col p-7 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.6875rem] font-medium tracking-[0.16em] uppercase">
            <span className="text-gold">{article.category}</span>
            <span aria-hidden className="h-px w-5 bg-mist/30" />
            <time dateTime={article.date} className="font-light text-mist normal-case">
              {formatDate(article.date)}
            </time>
          </div>

          <h3
            className={`mt-5 font-serif leading-snug transition-colors duration-300 group-hover:text-gold-300 ${
              featured ? 'text-h3' : 'text-[1.3rem]'
            }`}
          >
            {article.title}
          </h3>

          <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed font-light text-mist">
            {article.summary}
          </p>

          <span className="mt-7 text-[0.6875rem] font-medium tracking-[0.16em] text-mist/70 uppercase">
            {article.branch}
          </span>
        </div>
      </Link>
    </Card>
  )
}

/**
 * Deterministic placeholder cover for articles without photography.
 * Keeps the news index visually consistent until real images are supplied.
 */
function GeneratedCover({ seed, label }: { seed: string; label: string }) {
  const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const angle = hash % 60

  return (
    <div className="relative h-full w-full bg-navy-700">
      {/* A single seeded wash — enough to tell two coverless articles apart,
          without the grid and second gradient this used to stack up. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${angle + 120}deg, rgba(200,169,107,0.12), transparent 60%)`,
        }}
      />
      <span className="absolute bottom-5 left-6 font-serif text-sm tracking-wide text-paper/45">
        {label}
      </span>
    </div>
  )
}
