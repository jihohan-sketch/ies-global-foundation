import type { Person } from './types'

/**
 * ⚠ REVIEW BEFORE PUBLISHING
 *
 * Every biography below is a DRAFT written from the responsibilities of the
 * role, not from personal claims. Each person must review and approve their own
 * name, title, and biography before this page goes live. Do not add a person or
 * a title here unless the role is genuinely held — the brief is explicit that
 * titles must not be created to fill the page.
 *
 * To add a headshot: drop the file in `public/leadership/` and set
 * `photo: '/leadership/filename.jpg'`. Without a photo, a monogram is rendered.
 */

export const people: Person[] = [
  /* ---------------------------------------------------------------- Founding */
  {
    id: 'joseph-hahmmin-kang',
    name: 'Joseph Hahmmin Kang',
    koreanName: '강함민',
    title: 'Co-Founder · 2nd President',
    tier: 'founding',
    photo: '/leadership/joseph-hahmmin-kang.jpg',
    affiliations: [
      'Executive Representative, Shin-Kang Foundation',
      'Student, Seoul International School',
    ],
    bio: 'Co-founded IES in Seoul in April 2023. Co-President to August 2025, then 2nd President to January 2026. Set the standards branches and chapters now operate under.',
    responsibilities: [
      'Organizational direction and long-term strategy',
      'Mission, standards, and institutional identity',
      'International coordination across national branches',
      'Development of new branches and chapters',
    ],
  },
  {
    id: 'jaesuh-joshua-shin',
    name: 'Jaesuh Joshua Shin',
    koreanName: '신재서',
    title: 'Co-Founder · 1st President',
    tier: 'founding',
    photo: '/leadership/jaesuh-joshua-shin.jpg',
    affiliations: ['Chairman, Shin-Kang Foundation', 'Student, Seoul Foreign School'],
    bio: 'Co-founded IES in Seoul in April 2023. Co-President to August 2025, then 1st President to October 2025. Designed IES programming and grew the school chapter network.',
    responsibilities: [
      'Program design and organizational planning',
      'School chapter development',
      'Operational standards across the network',
      'Support for national branch leadership',
    ],
  },

  /* -------------------------------------------- Global Foundation officers */
  {
    id: 'sean-han',
    name: 'Sean Han',
    title: 'Head of Marketing',
    tier: 'global',
    photo: '/leadership/sean-han.jpg',
    bio: 'Sean Han leads marketing for the Global Foundation, responsible for how IES presents itself across Korea, the United States, and the United Kingdom. The remit covers the organization’s brand, this website, and its social channels, together with the approval process every public statement passes through before publication. Much of the work is consistency: a chapter in Seoul, a founding team in the United States, and a branch in London all describe the same organization, and it should read that way to a school deciding whether to work with IES. They also set the standards branches follow in building their own communications.',
    responsibilities: [
      'Brand consistency across branches and chapters',
      'Website and social content management',
      'Publication approval workflow',
    ],
  },

  /* ---------------------------------------------------- National — IES Korea */
  {
    id: 'ryan-cha',
    name: 'Ryan Jimyung Cha',
    koreanName: '차지명',
    title: '3rd President, IES Korea',
    tier: 'national',
    branch: 'korea',
    bio: '3rd President since January 2026, leading IES Korea — the original branch and operational headquarters. Runs national programming and the Korean chapter network.',
    responsibilities: [
      'National leadership of IES Korea',
      'Oversight of Korean school chapters',
      'National programming and events',
      'Coordination with the Global Foundation',
    ],
  },

  /* -------------------------------------------- National — IES United States */
  {
    id: 'aden-lee',
    name: 'Aden Lee',
    title: 'Co-President, IES United States',
    tier: 'national',
    branch: 'united-states',
    bio: 'Co-President of IES United States. Focused on establishing founding chapters and adapting IES programming to American schools without loosening shared standards.',
    responsibilities: [
      'National strategy for IES United States',
      'Chapter formation and school outreach',
      'Support for chapter leadership teams',
      'Coordination with the Global Foundation',
    ],
  },
  {
    id: 'onew-choi',
    name: 'Onew Choi',
    title: 'Co-President, IES United States',
    tier: 'national',
    branch: 'united-states',
    bio: 'Co-President of IES United States. Builds the branch’s programming calendar and its relationships with schools and community organizations.',
    responsibilities: [
      'National programming and events',
      'School and community partnerships',
      'Student leadership pathways',
      'Cross-branch collaboration',
    ],
  },

  /* ------------------------------------------ National — IES UK Society */
  {
    id: 'jimin-lee',
    name: 'Jimin Lee',
    title: 'President, IES UK Society',
    tier: 'national',
    branch: 'united-kingdom',
    bio: 'President of IES UK Society, the newest branch. Recruiting the first national officers and founding chapters, and leading the branch’s early programming.',
    responsibilities: [
      'National leadership of IES UK Society',
      'Founding chapter establishment',
      'Recruitment of national branch officers',
      'School outreach and early programming',
    ],
  },
]

/**
 * Offices of the Global Foundation.
 *
 * Roles are listed with their responsibilities so the structure is clear.
 * Set `holder` to a name from `people` ONLY when the appointment is genuine —
 * an office with no holder renders as "Appointment to be confirmed" rather
 * than inventing a person.
 */
export const globalOffices: {
  title: string
  scope: string
  responsibilities: string[]
  holder?: string
}[] = [
  {
    title: 'Head of Marketing',
    scope: 'Brand and digital presence',
    responsibilities: [
      'Brand consistency across branches and chapters',
      'Website and social content management',
      'Publication approval workflow',
    ],
    holder: 'sean-han',
  },
]

export const leadershipIntro = {
  founding:
    'Founded in Seoul on 20 April 2023 by two students, who led it jointly and then each served a term as president.',
  global:
    'The Foundation handles international coordination, partnerships, branding, and branch development. Offices are filled as we grow — unfilled ones are shown as pending, not padded out.',
  national: 'Each branch is led by students in that country, to the same shared standards.',
}

export const foundingLeadership = people.filter((p) => p.tier === 'founding')
export const globalLeadership = people.filter((p) => p.tier === 'global')
export const nationalLeadership = people.filter((p) => p.tier === 'national')
export const personById = (id: string) => people.find((p) => p.id === id)
