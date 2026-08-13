import { useMemo, useState } from 'react'
import { Container, Eyebrow, Section } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { RailItem, ScrollRail } from '@/components/ui/ScrollRail'
import { PageHero } from '@/components/sections/PageHero'
import { ArticleCard } from '@/components/sections/Cards'
import { CallToAction } from '@/components/sections/CallToAction'
import { newsCategories, sortedArticles } from '@/content/news'
import { useSeo } from '@/lib/seo'
import { cx } from '@/lib/utils'

const ALL = 'All'

export default function News() {
  useSeo({
    title: 'News',
    description:
      'Announcements, leadership appointments, event recaps, partnerships, and organizational updates from across the IES network.',
    path: '/news',
  })

  const [filter, setFilter] = useState<string>(ALL)

  const filtered = useMemo(
    () => (filter === ALL ? sortedArticles : sortedArticles.filter((a) => a.category === filter)),
    [filter],
  )

  const [lead, ...rest] = filtered

  return (
    <>
      <PageHero
        eyebrow="News & Updates"
        title="From across the network"
        lead="Announcements, appointments, event recaps, partnerships, and program launches from across the network."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'News' }]}
      />

      <Section>
        <Container size="wide">
          {/* ------------------------------------------------------ Filters */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-2 border-b border-mist/15 pb-6">
              <span className="mr-3 text-[0.625rem] font-medium tracking-[0.2em] text-mist/80 uppercase">
                Filter
              </span>
              {[ALL, ...newsCategories].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  aria-pressed={filter === category}
                  className={cx(
                    'inline-flex min-h-11 items-center border px-4 py-2 text-[0.75rem] font-medium tracking-[0.08em] transition-all duration-300',
                    filter === category
                      ? 'border-[var(--accent)]/60 bg-[var(--accent)]/10 text-[var(--accent)]'
                      : 'border-mist/20 text-paper/70 hover:border-mist/45 hover:text-paper',
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Filtering rewrites the list silently; this announces the outcome to
              screen readers, who otherwise get no confirmation the click landed. */}
          <p aria-live="polite" className="sr-only">
            {filtered.length === 1
              ? '1 article'
              : `${filtered.length} articles`}
            {filter === ALL ? '' : ` in ${filter}`}
          </p>

          {/* The filter row is the only thing between the page title and the
              article headings, and it is not a heading — which left the list
              reachable only by jumping from h1 straight to an h3. Named here
              instead of shown: the section needs a level, not a label. */}
          <h2 className="sr-only">Articles</h2>

          {filtered.length === 0 ? (
            <Reveal>
              <p className="py-24 text-center font-light text-mist">
                No articles in this category yet.
              </p>
            </Reveal>
          ) : (
            <>
              {/* --------------------------------------------- Lead article */}
              {lead && (
                <Reveal className="mt-12">
                  <ArticleCard article={lead} featured />
                </Reveal>
              )}

              {/* ------------------------------------------------- The rest */}
              {rest.length > 0 && (
                <ScrollRail label="more updates" className="mt-6">
                  {rest.map((article, i) => (
                    <RailItem key={article.slug}>
                      <Reveal delay={i * 80} className="h-full">
                        <ArticleCard article={article} />
                      </Reveal>
                    </RailItem>
                  ))}
                </ScrollRail>
              )}
            </>
          )}
        </Container>
      </Section>

      {/* ========================================================== NOTICE */}
      <Section tone="deep" size="compact" className="border-t border-mist/12">
        <Container size="wide">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
              <h2>
                <Eyebrow>Media Inquiries</Eyebrow>
              </h2>
              <div>
                <p className="leading-relaxed font-light text-mist">
                  Journalists seeking comment or interviews should contact the Foundation’s
                  media address. Requests involving students under 18 follow our participant
                  safety policy.
                </p>
                <a
                  href="mailto:theiesociety@gmail.com"
                  className="mt-6 inline-block font-serif text-xl text-[var(--accent)] underline underline-offset-8 transition-colors hover:text-[var(--accent)]"
                >
                  theiesociety@gmail.com
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CallToAction
        title="Stay close to the network"
        body="Follow the branches, or get in touch about something you would like to see covered."
        actions={[
          { label: 'Contact Us', to: '/contact', variant: 'primary' },
          { label: 'Global Network', to: '/global-network' },
        ]}
      />
    </>
  )
}
