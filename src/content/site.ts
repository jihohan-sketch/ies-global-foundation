/**
 * Site-wide settings: name, contact, branches, navigation.
 */

export const site = {
  name: 'IES Global Foundation',
  shortName: 'IES',
  /** Confirmed contact address — published on ie-society.com and used by the contact form. */
  email: 'theiesociety@gmail.com',
  copyright: `© ${new Date().getFullYear()} IES Global Foundation`,
  seo: {
    title: 'IES Global Foundation — Keeping IES strong beyond graduation',
    description:
      'IES Global Foundation connects IES Korea and IES United States and brings together founders and former leaders to support the students who lead next.',
  },
} as const

export interface Branch {
  id: 'korea' | 'united-states'
  name: string
  summary: string
  linkLabel: string
  href: string
  domain: string
}

/**
 * National branches, presented as equals. Add a country only once its
 * national branch and website are confirmed.
 */
export const branches: Branch[] = [
  {
    id: 'korea',
    name: 'IES Korea',
    summary: 'Student-led programs, events, and school chapters in Korea.',
    linkLabel: 'Visit IES Korea',
    href: 'https://ie-society.com/',
    domain: 'ie-society.com',
  },
  {
    id: 'united-states',
    name: 'IES United States',
    summary: 'Student-led programs, events, and school chapters in the United States.',
    linkLabel: 'Visit IES United States',
    href: 'https://iesusa.space/',
    domain: 'iesusa.space',
  },
]

/**
 * The four in-page anchors. `id` is the section's element id on the home page;
 * `short` is shown on narrow screens so the row fits on one line.
 */
export const sectionNav = [
  { id: 'purpose', label: 'Purpose' },
  { id: 'branches', label: 'Branches' },
  { id: 'council', label: 'Leadership Council', short: 'Council' },
  { id: 'continuity', label: 'Continuity' },
] as const

export const legalNav = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Participant Safety', href: '/participant-safety' },
]
