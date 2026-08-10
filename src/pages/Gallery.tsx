import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Eyebrow, Section } from '@/components/ui/Primitives'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { CallToAction } from '@/components/sections/CallToAction'
import { GalleryImage, Lightbox, VideoEmbed } from '@/components/sections/Media'
import { activities } from '@/content/activities'
import { channelUrl, organizationVideos } from '@/content/videos'
import { useSeo } from '@/lib/seo'
import { cx } from '@/lib/utils'
import type { Video } from '@/content/types'

interface Shot {
  src: string
  alt: string
  activityId: string
  activityTitle: string
  href: string
}

/** Every photograph on the site, tagged with the activity it documents. */
const allPhotos: Shot[] = activities.flatMap((activity) =>
  activity.photos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
    activityId: activity.id,
    activityTitle: activity.title,
    href: `/our-work#${activity.id}`,
  })),
)

/** Every video, whether it documents one activity or the organization at large. */
const allVideos: (Video & { activityTitle?: string; href?: string })[] = [
  ...activities.flatMap((activity) =>
    (activity.videos ?? []).map((video) => ({
      ...video,
      activityTitle: activity.title,
      href: `/our-work#${activity.id}`,
    })),
  ),
  ...organizationVideos,
]

/** Filters are built from the content, so a new activity appears on its own. */
const filters = [
  { id: 'all', label: 'Everything' },
  ...activities
    .filter((activity) => activity.photos.length > 0)
    .map((activity) => ({ id: activity.id, label: activity.title })),
]

export default function Gallery() {
  useSeo({
    title: 'Gallery',
    description:
      'Every photograph and every film from IES programmes — ethics forums, service partnerships, scholarships, and civic advocacy, documented at the events themselves.',
    path: '/gallery',
  })

  const [active, setActive] = useState('all')
  const [viewing, setViewing] = useState<number | null>(null)

  const photos = useMemo(
    () => (active === 'all' ? allPhotos : allPhotos.filter((p) => p.activityId === active)),
    [active],
  )

  /* The lightbox indexes into the filtered set, so stepping through it stays
     inside the programme being looked at. Changing the filter closes it, since
     the index it was holding no longer means the same photograph. */
  const changeFilter = (id: string) => {
    setViewing(null)
    setActive(id)
  }

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The complete record"
        lead={`Every photograph and every film IES has published — ${allPhotos.length} photographs across ${activities.length} programmes, and ${allVideos.length} videos. Nothing here is stock imagery, and every photograph was taken at the programme it shows.`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />

      {/* ========================================================== FILTERS */}
      <Section size="compact">
        <Container size="wide">
          <Reveal>
            <Eyebrow>Photographs</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            {/* A plain wrapping row of toggles rather than a select: with a dozen
                programmes it stays scannable, and every option is one tap away
                instead of two. */}
            <div
              role="group"
              aria-label="Filter photographs by programme"
              className="mt-8 flex flex-wrap gap-2"
            >
              {filters.map((filter) => {
                const selected = filter.id === active
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => changeFilter(filter.id)}
                    aria-pressed={selected}
                    className={cx(
                      'min-h-11 rounded-[3px] border px-4 py-2 text-[0.8125rem] font-light transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3',
                      selected
                        ? 'border-[var(--accent)] bg-[var(--accent)]/12 text-[var(--accent)]'
                        : 'border-mist/25 text-paper/80 hover:border-[var(--accent)]/60 hover:text-paper',
                    )}
                  >
                    {filter.label}
                  </button>
                )
              })}
            </div>
          </Reveal>

          <p className="mt-6 text-sm font-light text-mist/70" aria-live="polite">
            {photos.length} {photos.length === 1 ? 'photograph' : 'photographs'}
            {active !== 'all' && ' in this programme'}
          </p>

          {/* Captions are the photographs' own alt text throughout, so nothing
              written under an image can drift from what it is recorded as
              showing. */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, i) => (
              <figure key={photo.src} className="flex flex-col">
                {/* A button, not a div with a click handler: enlarging a
                    photograph has to be reachable by keyboard, and the browser
                    gives that away free on the right element. */}
                <button
                  type="button"
                  onClick={() => setViewing(i)}
                  aria-label={`Enlarge: ${photo.alt}`}
                  className="group block cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)]"
                >
                  <GalleryImage
                    src={photo.src}
                    alt={photo.alt}
                    eager={i < 6}
                    zoomOnHover
                    className="transition-colors duration-300 group-hover:border-gold/45"
                  />
                </button>
                <figcaption className="mt-3 text-[0.8125rem] leading-relaxed font-light text-mist/75">
                  {photo.alt}
                  {active === 'all' && (
                    <>
                      {' '}
                      <Link
                        to={photo.href}
                        className="whitespace-nowrap text-paper/70 underline decoration-mist/30 underline-offset-4 transition-colors hover:text-[var(--accent)]"
                      >
                        {photo.activityTitle}
                      </Link>
                    </>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>

          <Lightbox
            shots={photos.map((photo) => ({
              src: photo.src,
              alt: photo.alt,
              caption: `${photo.alt} — ${photo.activityTitle}`,
            }))}
            index={viewing}
            onClose={() => setViewing(null)}
            onIndex={setViewing}
          />
        </Container>
      </Section>

      {/* =========================================================== VIDEOS */}
      <Section tone="deep" className="border-y border-mist/12">
        <Container size="wide">
          <Reveal>
            <Eyebrow>Film</Eyebrow>
            <h2 className="text-h2 mt-6 max-w-3xl">Every video, in one place</h2>
            <p className="text-lead mt-7 max-w-3xl font-light text-mist">
              Embedded from the{' '}
              <a
                href={channelUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-paper underline decoration-mist/40 underline-offset-4 transition-colors hover:text-[var(--accent)]"
              >
                IES YouTube channel
              </a>
              , never re-hosted. Nothing loads from YouTube until you press play.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {allVideos.map((video, i) => (
              <Reveal key={video.youtubeId} delay={Math.min(i, 5) * 70}>
                <VideoEmbed video={video} />
                {video.activityTitle && (
                  <p className="mt-3 text-[0.8125rem] font-light text-mist/70">
                    <Link
                      to={video.href ?? '/our-work'}
                      className="underline decoration-mist/30 underline-offset-4 transition-colors hover:text-[var(--accent)]"
                    >
                      {video.activityTitle}
                    </Link>
                  </p>
                )}
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CallToAction
        title="Read what happened"
        body="Each programme has its own entry — what it was, who took part, and what came of it."
        actions={[
          { label: 'Our Work', to: '/our-work', variant: 'primary' },
          { label: 'See Our Impact', to: '/impact' },
        ]}
      />
    </>
  )
}
