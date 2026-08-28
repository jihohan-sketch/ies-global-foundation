import { Link } from 'react-router-dom'
import type { Branch, NewsArticle, Person } from '@/content/types'
import { Card } from '@/components/ui/Primitives'
import { formatDate, initials } from '@/lib/utils'
import { image, SIZES } from '@/lib/images'

/* ------------------------------------------------------------- BranchCard */

export function BranchCard({ branch, index }: { branch: Branch; index: number }) {
  return (
    <Card interactive className="group h-full">
      <Link
        to={`/global-network/${branch.slug}`}
        className="flex h-full flex-col"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="font-serif text-sm text-mist">
            {String(index + 1).padStart(2, '0')}
          </span>
          {/* The status, as a tracked capital rather than an outlined chip.
              A pill inside a rule-panel reintroduces exactly the boxed look
              the panel exists to avoid, and the status is metadata — it should
              be findable, not framed. */}
          <span className="text-label-sm font-semibold text-[var(--accent)] uppercase">
            {branch.status}
          </span>
        </div>

        <h3 className="text-h3 mt-8 transition-colors duration-300 group-hover:text-[var(--accent)]">
          {branch.name}
        </h3>

        <p className="mt-3 text-sm font-medium tracking-wide text-[var(--accent)]/85">
          {branch.role}
        </p>

        <p className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-mist">
          {branch.summary}
        </p>

        <span className="mt-8 pb-2 inline-flex items-center gap-2 text-[0.75rem] font-medium tracking-[0.14em] text-paper uppercase transition-colors group-hover:text-[var(--accent)]">
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

/*
 * A leadership profile as a portrait with a name under it, not a bordered card.
 *
 * The old card was carrying six things at once — portrait, name, Korean name,
 * title, branch, affiliations, bio, and a bordered "Responsibilities" tray at
 * the foot — inside a box with a visible edge, and the result was that a page
 * of them read as a spreadsheet with pictures. The brief asks for "large
 * portraits with NAME / ROLE / SHORT DESCRIPTION" and for hover to reveal the
 * rest, which is exactly the right call: on a leadership page a visitor is
 * scanning for *who these people are*, and the answer to that is a face and a
 * name.
 *
 * So the resting state is three things: portrait, name, role. Everything else —
 * the bio, the affiliations, the responsibilities — lives in a panel that
 * rises over the lower part of the portrait on hover and focus.
 *
 * ---------------------------------------------------------------------------
 * WHY THE DETAIL IS STILL IN THE DOCUMENT
 *
 * The panel is hidden with `opacity` and a `translate`, never with `display` or
 * `visibility`, and it carries no `aria-hidden`. That matters: a screen reader
 * reads the whole profile in order regardless of hover, and the text is
 * findable by the browser's own find-in-page. A reveal that removes content
 * from the accessibility tree is not progressive disclosure, it is deletion
 * with an animation on it.
 *
 * `group-focus-within` alongside `group-hover` is the same commitment for a
 * keyboard: tabbing into the card opens it, because "hover to see the rest" is
 * not an instruction a keyboard user can follow.
 */
export function PersonCard({ person, branchName }: { person: Person; branchName?: string }) {
  const hasDetail =
    Boolean(person.bio) ||
    person.responsibilities.length > 0 ||
    (person.affiliations?.length ?? 0) > 0

  return (
    /*
     * `tabIndex` on a plain div, deliberately.
     *
     * The card is not a link — nothing on this page navigates anywhere — so
     * there is no natural focus target to hang `group-focus-within` off, and
     * without one the reveal is a mouse-only feature. The detail is in the DOM
     * and read in full by a screen reader either way; this is what gives a
     * sighted keyboard user the same view a mouse user gets.
     */
    <div
      className="group relative h-full overflow-hidden bg-navy-700/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      tabIndex={hasDetail ? 0 : undefined}
    >
      {/* Square and uncropped — the source files are 512×512, so this is the
          whole photograph at close to native size, bled to the edge rather than
          punched into an avatar circle. */}
      {person.photo ? (
        <img
          {...image(person.photo)}
          sizes={SIZES.portrait}
          alt=""
          loading="lazy"
          className="aspect-[4/5] w-full object-cover object-top transition-transform duration-[900ms] ease-[var(--ease-cinema)] group-hover:scale-[1.03] group-focus-within:scale-[1.03]"
        />
      ) : (
        <div
          aria-hidden
          className="flex aspect-[4/5] w-full items-center justify-center bg-navy-700"
        >
          <span className="font-serif text-5xl text-[var(--accent)]/70">
            {initials(person.name)}
          </span>
        </div>
      )}

      {/* The resting label. Sits on a scrim for the same reason the gallery
          captions do — a portrait's lower third can be a dark suit or a lit
          wall, and type over a photograph needs a known ground. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(5,10,20,0.95),rgba(5,10,20,0.7)_45%,transparent)] p-6 pt-16 transition-opacity duration-500 group-hover:opacity-0 group-focus-within:opacity-0">
        <h3 className="font-serif text-[1.375rem] leading-tight text-paper">
          {person.name}
          {person.koreanName && (
            <span className="ml-2 text-base text-mist">{person.koreanName}</span>
          )}
        </h3>
        <p className="text-label-sm mt-2 font-semibold text-[var(--accent)] uppercase">
          {person.title}
        </p>
        {branchName && <p className="mt-1 text-[0.8125rem] text-slate">{branchName}</p>}
      </div>

      {/* The reveal. */}
      {hasDetail && (
        /* `justify-start`, not `justify-end`. Bottom-aligning a scrollable
           column starts it scrolled to the end, which put a reader at the
           bottom of the responsibilities list with the name and role clipped
           off the top — the two things the panel exists to expand on. */
        <div className="absolute inset-0 flex translate-y-3 flex-col justify-start overflow-y-auto bg-navy/94 p-6 opacity-0 transition-all duration-500 ease-[var(--ease-cinema)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:p-7">
          <h3 className="font-serif text-[1.25rem] leading-tight text-paper">{person.name}</h3>
          <p className="text-label-sm mt-1.5 font-semibold text-[var(--accent)] uppercase">
            {person.title}
          </p>

          {person.bio && (
            <p className="mt-4 text-[0.875rem] leading-relaxed text-mist">{person.bio}</p>
          )}

          {person.affiliations && person.affiliations.length > 0 && (
            <ul className="mt-4 space-y-1">
              {person.affiliations.map((item) => (
                <li key={item} className="text-[0.8125rem] text-slate">
                  {item}
                </li>
              ))}
            </ul>
          )}

          {person.responsibilities.length > 0 && (
            <div className="mt-5 border-t border-mist/20 pt-4">
              <p className="text-label-sm font-semibold text-slate uppercase">Responsibilities</p>
              <ul className="mt-2.5 space-y-1.5">
                {person.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.8125rem] text-paper">
                    <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-[var(--accent)]/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------ ArticleCard */

/*
 * A news item as a row in an index, not a tile in a grid.
 *
 * The brief on this section is unusually specific and it is right: news is the
 * one part of a site like this that people arrive at *looking for something*.
 * A cinematic treatment fights that. Someone scanning for "did they announce a
 * new president" wants twenty titles they can read in one pass, and the old
 * card gave them three per screen behind a 16:9 photograph, a category, a date,
 * a two-line summary and a branch — five pieces of chrome around one title.
 *
 * So the row is: DATE · CATEGORY on one line, the title large enough to scan
 * beneath it, and an arrow. The summary stays but is demoted; the photograph
 * moves to a hover preview, which is the one genuinely useful thing the image
 * was doing and costs nothing when nobody hovers.
 *
 * `featured` keeps its meaning — the lead story shows its picture inline rather
 * than on hover, because the top of a news index is the one place an image is
 * doing editorial work rather than decorating a link.
 */
export function ArticleCard({
  article,
  featured = false,
}: {
  article: NewsArticle
  featured?: boolean
}) {
  if (featured) {
    return (
      <Link
        to={`/news/${article.slug}`}
        className="group grid gap-8 border-b border-mist/20 pb-10 focus-visible:outline-2 focus-visible:outline-offset-4 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14"
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: '16 / 10' }}>
          {article.cover ? (
            <img
              {...image(article.cover)}
              sizes={SIZES.half}
              alt={article.coverAlt ?? ''}
              loading="eager"
              /* Crop biased upward rather than centred — see the note that used
                 to live on the card slot: these photographs are taller than the
                 frame and a centred crop takes the band off the top, which on a
                 photograph of people is where the faces are. */
              className="h-full w-full object-cover object-[50%_28%] transition-transform duration-[900ms] ease-[var(--ease-cinema)] group-hover:scale-[1.03]"
            />
          ) : (
            <GeneratedCover seed={article.slug} label={article.category} />
          )}
        </div>

        <div>
          <ArticleMeta article={article} />
          <h3 className="text-h3 mt-4 max-w-[22ch] transition-colors duration-300 group-hover:text-[var(--accent)]">
            {article.title}
          </h3>
          <p className="mt-4 max-w-[52ch] text-mist">{article.summary}</p>
          <span className="text-label-sm mt-6 inline-flex items-center gap-3 font-semibold text-paper uppercase">
            Read the story
            <span
              aria-hidden
              className="transition-transform duration-300 ease-[var(--ease-cinema)] group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/news/${article.slug}`}
      className="group relative grid items-baseline gap-x-8 gap-y-2 border-b border-mist/18 py-7 transition-colors duration-300 hover:border-[var(--accent)]/45 focus-visible:outline-2 focus-visible:outline-offset-4 lg:grid-cols-[15rem_minmax(0,1fr)_auto]"
    >
      <ArticleMeta article={article} />

      <div className="min-w-0">
        <h3 className="font-serif text-[clamp(1.25rem,2vw,1.625rem)] leading-snug transition-colors duration-300 group-hover:text-[var(--accent)]">
          {article.title}
        </h3>
        <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-slate">
          {article.summary}
        </p>
      </div>

      {/*
       * The hover preview.
       *
       * Absolutely positioned and `pointer-events-none`, so it can never come
       * between the cursor and the row it belongs to — a preview that steals
       * its own hover flickers. It is decorative: the row already carries the
       * title, the date and the category as text, so nothing is lost when it
       * does not appear, which is the case on every touch device and for every
       * keyboard user.
       *
       * `hidden xl:block`: below that width there is no empty gutter for it to
       * occupy and it would land on top of the title.
       */}
      {article.cover && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-24 hidden h-32 w-48 -translate-y-1/2 overflow-hidden opacity-0 transition-all duration-500 ease-[var(--ease-cinema)] group-hover:opacity-100 xl:block"
        >
          <img
            {...image(article.cover)}
            sizes="192px"
            alt=""
            loading="lazy"
            className="h-full w-full scale-105 object-cover object-[50%_28%] transition-transform duration-[900ms] ease-[var(--ease-cinema)] group-hover:scale-100"
          />
        </span>
      )}

      <span
        aria-hidden
        className="hidden text-[var(--accent)] transition-transform duration-300 ease-[var(--ease-cinema)] group-hover:translate-x-1.5 lg:block"
      >
        →
      </span>
    </Link>
  )
}

/** `12 MARCH 2026 · APPOINTMENTS` — the row's tertiary line. */
function ArticleMeta({ article }: { article: NewsArticle }) {
  return (
    <div className="text-label-sm flex flex-wrap items-center gap-x-3 gap-y-1 font-semibold uppercase">
      <time dateTime={article.date} className="text-mist tabular-nums lining-nums">
        {formatDate(article.date)}
      </time>
      <span aria-hidden className="h-0.5 w-3 rounded-full bg-[var(--accent)]/60" />
      <span className="text-[var(--accent)]">{article.category}</span>
    </div>
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
