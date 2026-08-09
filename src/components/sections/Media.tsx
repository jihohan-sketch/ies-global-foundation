import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { RailItem, ScrollRail } from '@/components/ui/ScrollRail'
import { cx } from '@/lib/utils'
import type { ActivityPhoto, Video } from '@/content/types'

const YEAR_MONTH = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' })

function published(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`)
  return Number.isNaN(date.valueOf()) ? iso : YEAR_MONTH.format(date)
}

/**
 * A YouTube video that stays unloaded until asked for.
 *
 * The page makes **no request to YouTube** — not for the player, not for a
 * thumbnail — until the visitor presses play. That is deliberate: this site
 * carries no third-party scripts and no cookie banner (see the contact form for
 * the same reasoning), and a grid of autoloading embeds would quietly introduce
 * both. The trade is that there is no preview frame, so the facade has to say
 * clearly what it will play.
 */
export function VideoEmbed({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <figure className="overflow-hidden border border-mist/15 bg-navy-700/40">
        <iframe
          /* nocookie serves the player without setting tracking cookies until
             playback, which is the least a visitor should have to accept for
             pressing play. */
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="block aspect-video w-full"
        />
      </figure>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group flex aspect-video w-full flex-col justify-between border border-mist/18 bg-navy-700/45 p-6 text-left transition-colors duration-300 hover:border-gold/45 focus-visible:outline-2 focus-visible:outline-offset-3"
    >
      <span className="flex items-center gap-3 text-[0.625rem] font-medium tracking-[0.2em] text-mist/70 uppercase">
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/60 text-[var(--accent)] transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)]/12"
        >
          ▶
        </span>
        {published(video.date)}
        {video.language === 'ko' && <span className="text-mist/50">· in Korean</span>}
      </span>

      <span>
        <span className="block font-serif text-[1.0625rem] leading-snug text-paper">
          {video.title}
        </span>
        {video.note && (
          <span className="mt-2 block text-[0.8125rem] leading-relaxed font-light text-mist">
            {video.note}
          </span>
        )}
        <span className="mt-3 block text-[0.6875rem] tracking-[0.12em] text-mist/60 uppercase">
          Play on YouTube
        </span>
      </span>
    </button>
  )
}

export function VideoGrid({ videos, className }: { videos: Video[]; className?: string }) {
  if (videos.length === 0) return null
  return (
    <div className={cx('grid gap-5 sm:grid-cols-2', className)}>
      {videos.map((video, i) => (
        <Reveal key={video.youtubeId} delay={i * 80}>
          <VideoEmbed video={video} />
        </Reveal>
      ))}
    </div>
  )
}

/** A titled run of film. */
export function VideoSection({
  videos,
  eyebrow,
  title,
  lead,
  tone = 'navy',
}: {
  videos: Video[]
  eyebrow: string
  title: string
  lead?: string
  tone?: 'navy' | 'deep'
}) {
  if (videos.length === 0) return null
  return (
    <Section id="film" tone={tone} className="border-t border-mist/12">
      <Container size="wide">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
        </Reveal>
        <VideoGrid videos={videos} className="mt-14" />
      </Container>
    </Section>
  )
}

export interface GalleryItem {
  id: string
  src: string
  alt: string
  title: string
  kind: string
  href: string
}

/**
 * The home page gallery: one photograph per programme, on a rail that advances
 * itself.
 *
 * Each card is a link into the activity it shows, so the gallery answers "what
 * do you actually do" and then takes you to the answer in full. The photographs
 * keep a single aspect ratio here — unlike the activity grids, where they keep
 * their own — because a rail of mismatched heights reads as broken rather than
 * as variety.
 */
export function GalleryRail({ items }: { items: GalleryItem[] }) {
  /* Rendered twice, which is what makes the loop seamless: the rail wraps by
     subtracting half its scroll width, so the second half has to repeat the
     first. The copies are hidden from assistive technology and taken out of the
     tab order — a screen reader should hear thirteen programmes, not twenty-six,
     and `aria-hidden` on something still focusable is its own bug. */
  const loop = [...items, ...items]

  return (
    /* Not "what IES does" — the home page already has a rail under that label,
       and two regions sharing one name is indistinguishable to a screen reader. */
    <ScrollRail label="programme photographs" autoAdvance="continuous" pxPerSecond={38}>
      {loop.map((item, index) => {
        const i = index % items.length
        const duplicate = index >= items.length
        return (
          <RailItem key={`${item.id}-${index}`} size="wide">
            {/* Deliberately not wrapped in `Reveal`.
                A scroll reveal keys off intersection with the viewport, which is
                the wrong signal for something that arrives by the rail scrolling
                sideways: cards that have never been in view sit at opacity 0, and
                their fade-in transition stalls when the rail brings them in. The
                rail's own movement is the animation here — it does not need a
                second one fighting it. */}
            <Link
              to={item.href}
              aria-hidden={duplicate || undefined}
              tabIndex={duplicate ? -1 : undefined}
              className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              <figure className="overflow-hidden border border-mist/18 bg-navy-700/45 transition-colors duration-300 group-hover:border-gold/45">
                <img
                  src={item.src}
                  alt={duplicate ? '' : item.alt}
                  /* The first three are in view on arrival; the rest wait until
                     the rail reaches them. The second copy is never the first
                     thing seen, so all of it can wait. */
                  loading={!duplicate && i < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full object-cover"
                  style={{ aspectRatio: '3 / 2' }}
                />
                <figcaption className="border-t border-mist/12 p-6">
                  <span className="text-[0.625rem] font-medium tracking-[0.2em] text-mist/70 uppercase">
                    {item.kind}
                  </span>
                  <span className="mt-3 block font-serif text-[1.1875rem] leading-snug transition-colors duration-300 group-hover:text-[var(--accent)]">
                    {item.title}
                  </span>
                </figcaption>
              </figure>
            </Link>
          </RailItem>
        )
      })}
    </ScrollRail>
  )
}

/**
 * The gallery as it appears on the home page.
 *
 * No display headline. The photographs are the statement, and a band of real
 * documentary images reads as evidence on its own — a large caption over the top
 * of it only competes. What is left is a label, one line of provenance, and the
 * route to the full record.
 *
 * The heading still exists for the document outline, just not visibly: removing
 * it outright would leave a whole section of the page unnamed in a screen
 * reader's list of headings.
 */
export function GallerySection({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) return null
  return (
    <Section tone="deep" className="border-y border-mist/12" size="compact">
      <Container size="wide">
        <h2 className="sr-only">Programmes and activities</h2>

        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4">
            <Eyebrow>Programmes</Eyebrow>
            <p className="text-[0.9375rem] font-light text-mist">
              Photographed at the programmes themselves, across {items.length} initiatives.{' '}
              <Link
                to="/our-work"
                className="text-paper underline decoration-mist/40 underline-offset-4 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
              >
                See the full record
              </Link>
            </p>
          </div>
        </Reveal>

        <div className="mt-10">
          <GalleryRail items={items} />
        </div>
      </Container>
    </Section>
  )
}

/**
 * A band of photographs from across the network.
 *
 * Captions are the photographs' own alt text, so what is written under an image
 * cannot drift from what the image is recorded as showing.
 */
export function PhotoStrip({
  photos,
  eyebrow,
  title,
  lead,
}: {
  photos: ActivityPhoto[]
  eyebrow: string
  title: string
  lead?: string
}) {
  if (photos.length === 0) return null
  return (
    <Section className="border-t border-mist/12">
      <Container size="wide">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-h2 mt-6 max-w-3xl">{title}</h2>
          {lead && <p className="text-lead mt-7 max-w-3xl font-light text-mist">{lead}</p>}
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 70}>
              <figure>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full border border-mist/15 object-cover"
                  style={{ aspectRatio: '4 / 3' }}
                />
                <figcaption className="mt-3 text-[0.8125rem] leading-relaxed font-light text-mist/75">
                  {photo.alt}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
