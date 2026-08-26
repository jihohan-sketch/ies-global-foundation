import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ArrowLink, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Primitives'
import { CinemaLine } from '@/components/ui/Cinematic'
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
      <span className="flex items-center gap-3 text-[0.625rem] font-medium tracking-[0.2em] text-mist/80 uppercase">
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/60 text-[var(--accent)] transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)]/12"
        >
          ▶
        </span>
        {published(video.date)}
        {video.language === 'ko' && <span className="text-mist/80">· in Korean</span>}
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
        <span className="mt-3 block text-[0.6875rem] tracking-[0.12em] text-mist/80 uppercase">
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

/**
 * A photograph that fades and settles as it arrives.
 *
 * Keyed off the image's own `load` event rather than a scroll observer, which
 * matters for two reasons. It cannot strand a photograph at opacity 0 if an
 * observer callback goes missing — the failure mode that made the first version
 * of the home rail render blank. And because the images are lazily loaded, the
 * load event *is* the moment they scroll into view, so the effect arrives with
 * the scroll for free.
 *
 * The ref callback checks `complete` because a cached image can finish decoding
 * before React attaches the handler, and would then never fade in at all.
 */
export function GalleryImage({
  src,
  alt,
  eager = false,
  className,
  aspectRatio = '4 / 3',
  zoomOnHover = false,
}: {
  src: string
  alt: string
  eager?: boolean
  className?: string
  aspectRatio?: string
  zoomOnHover?: boolean
}) {
  const [loaded, setLoaded] = useState(false)

  const attach = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete) setLoaded(true)
  }, [])

  return (
    <span
      className={cx(
        'relative block overflow-hidden border border-mist/15 bg-navy-700/40',
        /* A slow breath on the empty frame while the photograph is on its way.
           The gallery holds 67 full-size originals and they arrive over several
           seconds; without this the page is a field of flat rectangles that
           look like the images failed rather than like they are coming. */
        !loaded && 'animate-[ies-placeholder_1.8s_ease-in-out_infinite]',
        className,
      )}
      style={{ aspectRatio }}
    >
      <img
        ref={attach}
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        /* Also settle on error, so a broken path shows its alt text rather than
           an invisible box that looks like a layout bug. */
        onError={() => setLoaded(true)}
        className={cx(
          'h-full w-full object-cover',
          'transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
          loaded ? 'scale-100 opacity-100 blur-0' : 'scale-[1.04] opacity-0 blur-[6px]',
          zoomOnHover && 'group-hover:scale-[1.04]',
        )}
      />
    </span>
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
    <ScrollRail label="programme photographs" autoAdvance="continuous" pxPerSecond={38} curve>
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
              <figure className="border border-mist/18 bg-navy-700/45 transition-colors duration-300 group-hover:border-gold/45">
                {/* The first three are in view on arrival; the rest wait until
                    the rail reaches them. The second copy is never the first
                    thing seen, so all of it can wait. */}
                <GalleryImage
                  src={item.src}
                  alt={duplicate ? '' : item.alt}
                  eager={!duplicate && i < 3}
                  aspectRatio="3 / 2"
                  zoomOnHover
                  className="border-0"
                />
                <figcaption className="border-t border-mist/12 p-6">
                  <span className="text-[0.625rem] font-medium tracking-[0.2em] text-mist/80 uppercase">
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
export function GallerySection({ items, id }: { items: GalleryItem[]; id?: string }) {
  if (items.length === 0) return null
  return (
    <Section id={id} tone="deep" className="border-y border-mist/12" size="compact">
      <Container size="wide">
        {/*
         * Centred, and the only section on the home page that is.
         *
         * Everything else there is a left-aligned column with a rule and an
         * index — the register of a document. A rail is not a column: it runs
         * the full width, it has no left edge to hang a heading off, and a
         * left-aligned title above a centred band of photographs reads as two
         * pieces of layout rather than one. The title, the line under it and
         * the link below all sit on the rail's own centre line instead.
         */}
        <Reveal>
          <div className="text-center">
            <CinemaLine as="h2" className="text-[clamp(1.25rem,2.6vw,1.875rem)] text-paper/90">
              Programmes
            </CinemaLine>
            <p className="mx-auto mt-5 max-w-xl text-[0.9375rem] font-light text-mist">
              Photographed at the programmes themselves, across {items.length} initiatives.
            </p>
          </div>
        </Reveal>

        <div className="mt-12">
          <GalleryRail items={items} />
        </div>

        {/* Closes the section rather than opening one — the rail has already
            made the case, and this is the way out of it. */}
        <Reveal>
          <div className="mt-12 flex justify-center">
            <ArrowLink to="/our-work">See the full record</ArrowLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

export interface LightboxShot {
  src: string
  alt: string
  caption?: string
}

/**
 * Full-size viewer for one photograph out of a set.
 *
 * Deliberately a real dialog rather than a styled overlay: focus moves in on
 * open and returns to the thumbnail that opened it on close, Escape closes,
 * the arrow keys move through the set, and the page behind it cannot scroll.
 * A gallery that swallows the keyboard is worse than one with no lightbox.
 */
export function Lightbox({
  shots,
  index,
  onClose,
  onIndex,
}: {
  shots: LightboxShot[]
  index: number | null
  onClose: () => void
  onIndex: (next: number) => void
}) {
  const open = index !== null
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreTo = useRef<Element | null>(null)

  /*
   * Opening and closing only — deliberately keyed on `open` alone.
   *
   * This used to sit in one effect with the key handler, which depended on
   * `index` and on the callbacks the parent rebuilds every render. Stepping to
   * the next photograph therefore tore the whole thing down and put it back:
   * body scroll was unlocked and re-locked, and focus was handed back to the
   * thumbnail behind the overlay before being pulled into the panel again —
   * which scrolls the page underneath to wherever that thumbnail sits. Arrowing
   * through a set left the page at a different scroll position than it started.
   */
  useEffect(() => {
    if (!open) return
    restoreTo.current = document.activeElement
    panelRef.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
      /* Returning focus is not a nicety — without it a keyboard user lands back
         at the top of the document and has to walk the whole grid again. */
      if (restoreTo.current instanceof HTMLElement) restoreTo.current.focus()
    }
  }, [open])

  /* The key handler, separately: it genuinely does depend on the current index,
     and re-binding a listener is free — unlike moving focus and the scroll lock
     above, which are not. */
  useEffect(() => {
    if (index === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onIndex((index + 1) % shots.length)
      if (event.key === 'ArrowLeft') onIndex((index - 1 + shots.length) % shots.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, shots.length, onClose, onIndex])

  /*
   * Fetch the neighbours in the background, so stepping through the set is
   * instant instead of a wait on a full-size photograph.
   *
   * This is the difference between the viewer feeling smooth and feeling
   * broken. These are 1600px originals: pressing the arrow used to swap in a
   * `src` that had never been requested, leaving the frame empty for as long as
   * it took to arrive. Decoding the next one before it is asked for means the
   * swap below has pixels ready and happens within a frame.
   */
  useEffect(() => {
    if (index === null) return
    for (const offset of [1, -1]) {
      const neighbour = shots[(index + offset + shots.length) % shots.length]
      if (neighbour) {
        const preload = new Image()
        preload.src = neighbour.src
      }
    }
  }, [index, shots])

  if (index === null) return null
  const shot = shots[index]

  /*
   * Rendered into `document.body` rather than in place.
   *
   * `position: fixed` and a high `z-index` are not enough on their own: the grid
   * that opens this sits inside a section that establishes a stacking context, so
   * everything within it paints as one layer and the site header — at a far lower
   * z-index — still covered these controls. A portal leaves that context entirely,
   * which is the only reliable way to put a modal above the page.
   */
  return createPortal(
    <div
      /* The overlay fades and settles in rather than appearing outright — a
         full-screen panel arriving in one frame reads as a jump cut, and it is
         the moment the eye most needs help following where it went. */
      className="animate-[ies-lightbox-in_320ms_cubic-bezier(0.22,1,0.36,1)_both] fixed inset-0 z-[100] flex flex-col bg-navy/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Photograph ${index + 1} of ${shots.length}`}
    >
      {/* The backdrop closes on click; the panel inside stops the bubble so a
          click on the photograph itself does not dismiss it. */}
      <button
        type="button"
        aria-label="Close photograph"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative flex h-full flex-col focus-visible:outline-none"
      >
        <div className="flex items-center justify-between gap-4 px-6 py-5 sm:px-10">
          <span className="text-[0.6875rem] font-medium tracking-[0.2em] text-mist/80 uppercase">
            {index + 1} / {shots.length}
          </span>
          <div className="flex gap-2">
            <LightboxButton
              label="Previous photograph"
              onClick={() => onIndex((index - 1 + shots.length) % shots.length)}
            >
              <path d="M12.5 4 6.5 10l6 6" />
            </LightboxButton>
            <LightboxButton
              label="Next photograph"
              onClick={() => onIndex((index + 1) % shots.length)}
            >
              <path d="M7.5 4l6 6-6 6" />
            </LightboxButton>
            <LightboxButton label="Close photograph" onClick={onClose}>
              <path d="M5 5l10 10M15 5L5 15" />
            </LightboxButton>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center px-6 pb-4 sm:px-10">
          {/*
           * Deliberately *not* keyed by `src`.
           *
           * It used to be, which remounted the element on every step and
           * replayed a 600ms fade from nothing. That reads as a blink: the
           * photograph being left is gone instantly, and the one arriving takes
           * over half a second to become legible — on a set you are arrowing
           * through, most of the time is spent looking at neither.
           *
           * Swapping `src` on one element lets the browser hold the current
           * frame until the next has decoded, so the change is a clean cut with
           * nothing empty in between. Paired with the neighbour preloading
           * above, that cut lands within a frame of the key press.
           */}
          <img
            src={shot.src}
            alt={shot.alt}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <p
          /* Keyed, so the caption cross-fades as the set is stepped through.
             The photograph cuts and the words under it fade — text that swaps
             instantly under a changing image is the part that reads as jarring. */
          key={shot.src}
          className="animate-[ies-caption-in_420ms_cubic-bezier(0.22,1,0.36,1)_both] px-6 pb-8 text-center text-[0.8125rem] leading-relaxed font-light text-mist/80 sm:px-10"
        >
          {shot.caption ?? shot.alt}
        </p>
      </div>
    </div>,
    document.body,
  )
}

function LightboxButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-mist/30 bg-navy-700/60 text-paper transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)]"
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden
      >
        {children}
      </svg>
    </button>
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
                <GalleryImage src={photo.src} alt={photo.alt} eager={i < 3} />
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
