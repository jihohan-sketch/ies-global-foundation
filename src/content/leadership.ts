/**
 * LEADERSHIP DATA — the one file to edit when people change.
 *
 * Every person who appears anywhere on the site is a record here. A record
 * renders only when `approved` is true, and each field renders only when it is
 * filled in. Leave a field empty rather than guessing: the layout is complete
 * without it.
 *
 * Rules (from the website brief):
 *   - Never infer a surname or invent a title.
 *   - Never turn an expected graduation year into an appointment date.
 *   - `years` on a service record is filled only when the dates are verified.
 *   - Current branch presidents are `branch-representative`. They are not
 *     former leaders and not Council members unless separately appointed.
 *   - Council categories (`council-active`, `council-alumni`) stay empty until
 *     leadership formally confirms appointments.
 *
 * Open confirmations for each person are tracked in
 * REVIEW.md, not in this file or on the page.
 *
 * Photos: put the file in `src/assets/leadership/` and set
 * `photo: '/leadership/<file>.jpg'`. Only use a photo whose identity is
 * confirmed. Without one, the profile renders as a clean text-only card.
 */

export type LeadershipCategory =
  /** Formally appointed member of the IES Leadership Council, currently serving. */
  | 'council-active'
  /** Former Council member who has stepped back from active service. */
  | 'council-alumni'
  /** Co-founders, shown in the Founding leadership row. */
  | 'founding'
  /** Current student leaders of a national branch. */
  | 'branch-representative'

export type BranchAffiliation = 'korea' | 'united-states' | 'foundation'

export interface ServiceRecord {
  /** The role exactly as held, e.g. "Co-President". */
  role: string
  /** Where it was held, e.g. "IES" or "IES Korea". */
  organization: string
  /** Verified service years only, e.g. "2023–2026". Omit if not verified. */
  years?: string
}

export interface LeadershipProfile {
  id: string
  /** Preferred full display name, as the person confirms it. */
  name: string
  /** Path under src/assets, e.g. '/leadership/name.jpg'. Confirmed identity only. */
  photo?: string
  /** Confirmed current Council, Foundation, or branch role. */
  currentRole?: string
  /** Prior IES leadership, most significant first. The first is shown on the card. */
  formerRoles: ServiceRecord[]
  /** One short sentence describing the person's current contribution. */
  contribution?: string
  branch: BranchAffiliation
  category: LeadershipCategory
  /** `confirmed` once leadership has confirmed the person's place in this category. */
  membershipStatus: 'confirmed' | 'pending'
  /** Lower numbers first, within a category. */
  order: number
  /** Profile publication approval. Nothing renders until this is true. */
  approved: boolean
}

export const leadership: LeadershipProfile[] = [
  /* ------------------------------------------------------------ Founding */
  {
    id: 'joseph-hahmmin-kang',
    name: 'Joseph Hahmmin Kang',
    photo: '/leadership/joseph-hahmmin-kang.jpg',
    currentRole: 'Director of Global Operations, IES Global Foundation',
    formerRoles: [
      { role: 'Co-President, then 2nd President', organization: 'IES', years: '2023–2026' },
      { role: 'Co-founder', organization: 'IES', years: '2023' },
    ],
    contribution: 'Coordinates the work that runs between the national branches.',
    branch: 'foundation',
    category: 'founding',
    membershipStatus: 'confirmed',
    order: 1,
    approved: true,
  },
  {
    id: 'jaesuh-joshua-shin',
    name: 'Jaesuh Joshua Shin',
    photo: '/leadership/jaesuh-joshua-shin.jpg',
    formerRoles: [
      { role: 'Co-President, then 1st President', organization: 'IES' },
      { role: 'Co-founder', organization: 'IES', years: '2023' },
    ],
    branch: 'foundation',
    category: 'founding',
    membershipStatus: 'confirmed',
    order: 2,
    approved: true,
  },

  /* ------------------------------------------- Current branch presidents */
  {
    id: 'ryan-cha',
    name: 'Ryan Jimyung Cha',
    photo: '/leadership/ryan-cha.jpg',
    currentRole: 'President, IES Korea',
    formerRoles: [],
    branch: 'korea',
    category: 'branch-representative',
    membershipStatus: 'confirmed',
    order: 1,
    approved: true,
  },
  {
    id: 'aden-lee',
    name: 'Aden Lee',
    photo: '/leadership/aden-lee.jpg',
    currentRole: 'Co-President, Internal Operations, IES United States',
    formerRoles: [],
    branch: 'united-states',
    category: 'branch-representative',
    membershipStatus: 'confirmed',
    order: 2,
    approved: true,
  },
  {
    id: 'onew-choi',
    name: 'Onew Choi',
    photo: '/leadership/onew-choi.jpg',
    currentRole: 'Co-President, External Operations, IES United States',
    formerRoles: [],
    branch: 'united-states',
    category: 'branch-representative',
    membershipStatus: 'confirmed',
    order: 3,
    approved: true,
  },

  /* ------------------------------------------- Awaiting confirmation */
  {
    // Full display name and actual role to be confirmed before publishing.
    id: 'yura',
    name: 'Yura Shin',
    formerRoles: [],
    branch: 'foundation',
    category: 'founding',
    membershipStatus: 'pending',
    order: 3,
    approved: false,
  },
]

/** "Co-President, IES · 2023–2026" — years only when verified. */
export const formatService = (s: ServiceRecord) =>
  `${s.role}, ${s.organization}${s.years ? ` · ${s.years}` : ''}`

const published = (category: LeadershipCategory) =>
  leadership
    .filter((p) => p.approved && p.category === category)
    .sort((a, b) => a.order - b.order)

export const councilMembers = published('council-active')
export const councilAlumni = published('council-alumni')
export const foundingLeaders = published('founding')
export const branchRepresentatives = published('branch-representative')

/**
 * The Council roster is formally confirmed once it has at least one approved,
 * confirmed member. Until then the section shows "Council formation in
 * progress" and the Founding leadership row only.
 */
export const councilConfirmed = councilMembers.some((p) => p.membershipStatus === 'confirmed')
