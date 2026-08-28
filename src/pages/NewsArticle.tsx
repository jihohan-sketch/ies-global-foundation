import { Link, Navigate, useParams } from 'react-router-dom'
import { Container, Section } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { ArticleCard } from '@/components/sections/Cards'
import { CallToAction } from '@/components/sections/CallToAction'
import { articleBySlug, sortedArticles } from '@/content/news'
import type { ArticleBlock } from '@/content/types'
import { useSeo } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import { image, SIZES } from '@/lib/images'

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'heading':
      return <h2 className="text-h3 mt-14 mb-6 first:mt-0">{block.text}</h2>
    case 'quote':
      return (
        <blockquote className="my-12 border-l border-[var(--accent)]/50 pl-8">
          <p className="font-serif text-[clamp(1.375rem,2.4vw,1.75rem)] leading-[1.4] text-paper/95 italic">
            {block.text}
          </p>
          {block.attribution && (
            <cite className="mt-5 block text-[0.75rem] font-medium tracking-[0.16em] text-[var(--accent)] uppercase not-italic">
              {block.attribution}
            </cite>
          )}
        </blockquote>
      )
    case 'list':
      return (
        <ul className="my-8 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-4 leading-relaxed text-mist">
              <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-[var(--accent)]/60" />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'paragraph':
    default:
      return (
        <p className="mb-6 text-[1.0625rem] leading-[1.8] text-paper/85">
          {block.text}
        </p>
      )
  }
}

export default function NewsArticle() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? articleBySlug(slug) : undefined

  useSeo({
    title: article ? article.title : 'Article',
    description: article ? article.summary : 'IES news article.',
    path: `/news/${slug ?? ''}`,
    type: 'article',
    publishedTime: article?.date,
  })

  if (!article) return <Navigate to="/news" replace />

  const related = sortedArticles.filter((a) => a.slug !== article.slug).slice(0, 3)

  return (
    <>
      {/* ========================================================= MASTHEAD */}
      <article>
        <header className="relative border-b border-mist/12 pt-40 pb-16 sm:pt-48">
          <Container size="narrow" className="relative">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-mist">
                <li>
                  <Link to="/" className="transition-colors hover:text-[var(--accent)]">
                    Home
                  </Link>
                </li>
                <li aria-hidden className="text-mist/40">
                  /
                </li>
                <li>
                  <Link to="/news" className="transition-colors hover:text-[var(--accent)]">
                    News
                  </Link>
                </li>
              </ol>
            </nav>

            <Reveal>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.6875rem] font-medium tracking-[0.18em] uppercase">
                <span className="text-[var(--accent)]">{article.category}</span>
                <span aria-hidden className="h-px w-6 bg-mist/30" />
                <time dateTime={article.date} className="text-mist normal-case">
                  {formatDate(article.date)}
                </time>
                <span aria-hidden className="h-px w-6 bg-mist/30" />
                <span className="text-mist normal-case">{article.branch}</span>
              </div>

              <h1 className="text-h1 mt-8">{article.title}</h1>
              <p className="text-lead mt-8 text-mist">{article.summary}</p>
            </Reveal>
          </Container>
        </header>

        {/* ------------------------------------------------------- Cover */}
        {article.cover && (
          <Container size="wide" className="relative -mt-0">
            <img
              {...image(article.cover)}
              sizes={SIZES.wide}
              alt={article.coverAlt ?? ''}
              className="mt-14 w-full border border-mist/15 object-cover"
              style={{ aspectRatio: '21 / 9' }}
            />
          </Container>
        )}

        {/* -------------------------------------------------------- Body */}
        <Section size="default">
          <Container size="narrow">
            <Reveal>
              <div>
                {article.body.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-mist/15 pt-8">
                <p className="text-sm text-mist">
                  Published by {article.branch} ·{' '}
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                </p>
                <Link
                  to="/news"
                  className="text-[0.75rem] font-medium tracking-[0.14em] text-paper/80 uppercase transition-colors hover:text-[var(--accent)]"
                >
                  ← All news
                </Link>
              </div>
            </Reveal>
          </Container>
        </Section>
      </article>

      {/* ========================================================== RELATED */}
      {related.length > 0 && (
        <Section tone="deep" className="border-t border-mist/12" size="compact">
          <Container size="wide">
            <Reveal>
              <h2 className="text-h3">More from the network</h2>
            </Reveal>
            {/* A list, not a three-up grid — `ArticleCard` is a full-width
                editorial row now, and three of them side by side would put a
                15rem date column inside a 380px cell. */}
            <ol className="mt-8 border-t border-mist/18">
              {related.map((item, i) => (
                <li key={item.slug}>
                  <Reveal delay={i * 90}>
                    <ArticleCard article={item} />
                  </Reveal>
                </li>
              ))}
            </ol>
          </Container>
        </Section>
      )}

      <CallToAction
        title="Join a Growing Global Network"
        body="Students, educators, and organizations across Korea, the United States, and the United Kingdom."
        actions={[
          { label: 'Join IES', to: '/join', variant: 'primary' },
          { label: 'Partner With Us', to: '/partners' },
        ]}
      />
    </>
  )
}
