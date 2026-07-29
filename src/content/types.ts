/**
 * Content model for the IES Global Foundation website.
 *
 * Every editable piece of the site is typed here and authored in the sibling
 * files (`site.ts`, `branches.ts`, `leadership.ts`, …). Components never hold
 * copy of their own, so a future CMS only has to satisfy these shapes.
 */

export type BranchSlug = 'korea' | 'united-states' | 'united-kingdom'

export interface NavItem {
  label: string
  href: string
  /** Rendered in the mega-menu / mobile drawer beneath the label. */
  description?: string
}

export interface SocialLink {
  label: string
  href: string
  handle?: string
}

export interface ContactChannel {
  label: string
  email: string
  description: string
}

/** A single geographic marker on the globe. */
export interface GeoPoint {
  /** Degrees north, -90…90 */
  lat: number
  /** Degrees east, -180…180 */
  lon: number
}

export interface Branch {
  slug: BranchSlug
  /** e.g. "IES Korea" */
  name: string
  /** e.g. "Korea" */
  country: string
  /** ISO 3166-1 alpha-2, used for the flag-free country tag. */
  code: string
  /** Short role line shown on the home page card. */
  role: string
  /** One-sentence summary used on cards and the network map. */
  summary: string
  /** Full introduction shown at the top of the branch page. */
  intro: string
  established: string
  headquarters: string
  status: 'Headquarters' | 'Active' | 'Establishing'
  point: GeoPoint
  /** Key/value facts rendered as a definition list. */
  facts: { label: string; value: string }[]
  /** Section blocks on the branch page. */
  sections: { title: string; body: string; items?: string[] }[]
  contactEmail: string
  social?: SocialLink[]
  /** Leadership entries are matched by `branch` on the Person record. */
}

export type LeadershipTier = 'founding' | 'global' | 'national'

export interface Person {
  id: string
  name: string
  /** Name in Korean, shown alongside the romanised name where available. */
  koreanName?: string
  title: string
  tier: LeadershipTier
  /** Only set for national leadership. */
  branch?: BranchSlug
  /** Path or URL to a headshot. Falls back to a monogram when omitted. */
  photo?: string
  /** 60–100 words. */
  bio: string
  responsibilities: string[]
  /** Optional public contact. */
  email?: string
  linkedin?: string
}

export interface Pillar {
  id: string
  title: string
  summary: string
  body: string
  points: string[]
}

export interface WorkCategory {
  id: string
  title: string
  summary: string
  examples: string[]
  /** Optional photograph. Layout adapts when absent. */
  image?: string
  imageAlt?: string
}

export interface Stat {
  /** Numeric portion, used by the count-up animation. */
  value: number
  /** Rendered after the number, e.g. "+" or "k". */
  suffix?: string
  prefix?: string
  label: string
  /** Optional clarifying note shown beneath the label. */
  note?: string
}

export interface ImpactStory {
  id: string
  title: string
  branch: string
  summary: string
  detail: string
  metrics?: { value: string; label: string }[]
}

export interface TimelineEntry {
  date: string
  title: string
  body: string
  /** Marks organisation-defining moments for stronger visual weight. */
  milestone?: boolean
}

export type NewsCategory =
  | 'Announcement'
  | 'Leadership'
  | 'Event'
  | 'Partnership'
  | 'Program'
  | 'Community Service'
  | 'Organizational Update'

export interface NewsArticle {
  slug: string
  title: string
  /** ISO 8601 date, e.g. "2026-05-14". */
  date: string
  category: NewsCategory
  branch: string
  summary: string
  /** Optional cover image path. A generated cover is used when absent. */
  cover?: string
  coverAlt?: string
  /** Article body as an ordered list of blocks. */
  body: ArticleBlock[]
  featured?: boolean
}

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'list'; items: string[] }

export interface PartnerCategory {
  title: string
  description: string
  examples: string[]
}

export interface JoinPathway {
  id: string
  title: string
  audience: string
  description: string
  points: string[]
  cta: { label: string; href: string }
}

export interface ProcessStep {
  title: string
  body: string
}

export interface FaqItem {
  question: string
  answer: string
}
