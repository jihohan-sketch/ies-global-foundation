import type { Video } from './types'

/**
 * Video published on the organization's own YouTube channel.
 *
 * The channel is the canonical home for IES film. Nothing here is re-hosted:
 * every entry is an embed, and no request reaches YouTube until a visitor
 * presses play. Titles and dates are exactly as published.
 *
 * Footage that documents a specific event lives on that activity's entry in
 * `activities.ts` instead. What is left here is the organization talking about
 * itself — introductions, founder statements, and the annual addresses.
 */
export const channelUrl = 'https://www.youtube.com/@InterscholasticEthicsSocie-r8w'

export const organizationVideos: Video[] = [
  {
    youtubeId: '73PdmuED4ik',
    title: 'Who We Are | Interscholastic Ethics Society (IES)',
    date: '2026-07-26',
    note: 'The current introduction to the organization.',
  },
  {
    youtubeId: '4RTfS-7dPWs',
    title: 'Jaesuh Shin — The Vision Behind IES',
    date: '2026-03-02',
    note: 'The co-founder on why the society was started.',
  },
  {
    youtubeId: '9Est-ZE0e3A',
    title: 'Introducing the Interscholastic Ethics Society | A Three-Year Journey in Applied Ethics',
    date: '2026-02-06',
  },
  {
    youtubeId: 'fLin_u1ADxA',
    title: '2026 New Year Address | IES Co-Founder Joseph Hahmmin Kang',
    date: '2026-01-01',
  },
  {
    youtubeId: 'cGLEUMniGrk',
    title: 'Passing the Torch | IES Handover & 2026 Address',
    date: '2025-12-22',
    note: 'The handover from the second presidency to the third.',
  },
  {
    youtubeId: 'q2bHOkfVyGU',
    title: 'Interscholastic Ethics Society | Building a Movement for Change',
    date: '2025-09-06',
  },
]
