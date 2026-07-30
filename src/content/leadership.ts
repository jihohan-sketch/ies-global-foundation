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
    bio: 'Joseph Hahmmin Kang co-founded IES in Seoul on 20 April 2023 and served as Co-President through August 2025, then as the organization’s 2nd President from October 2025 to January 2026. That work has focused on defining what IES stands for, establishing the standards that branches and chapters operate under, and building the structure that allows students in different countries to work toward the same mission. They continue to guide the organization’s long-term development and international coordination.',
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
    bio: 'Jaesuh Joshua Shin co-founded IES in Seoul on 20 April 2023, served as Co-President through August 2025, and was the organization’s 1st President from August to October 2025. Their contributions span the design of IES programming, the growth of the school chapter network, and the operational practices that keep activity consistent across a widening set of schools and countries. They remain involved in organizational planning and in supporting national branches as they establish their own programs and leadership teams.',
    responsibilities: [
      'Program design and organizational planning',
      'School chapter development',
      'Operational standards across the network',
      'Support for national branch leadership',
    ],
  },

  /* -------------------------------------------- Global Foundation officers */
  {
    id: 'jiho-han',
    name: 'Jiho Han',
    title: 'Vice President of Marketing',
    tier: 'global',
    bio: 'Jiho Han serves as Vice President of Marketing for the Global Foundation, responsible for how IES presents itself across branches and chapters. The role covers brand consistency, the organization’s website and social channels, and the approval process that keeps published material accurate. With the network now spanning three countries, much of the work is making sure a chapter in one country and a branch in another describe the same organization in the same terms.',
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
    bio: 'Ryan Jimyung Cha has served as the organization’s 3rd President since January 2026, leading IES Korea — the original national branch and primary operational headquarters. They lead national programming, oversee the branch’s school chapters, and work with chapter leaders to keep activity consistent across participating schools. Because IES Korea carries the largest share of the organization’s day-to-day operations, the role also involves close coordination with the Global Foundation on standards, cross-border programming, and the development of the wider network.',
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
    bio: 'Aden Lee serves as Co-President of IES United States, sharing responsibility for the branch’s national strategy and growth. The role centers on establishing founding school chapters, supporting the students who lead them, and adapting IES programming to the American school context without departing from the standards shared across the network. They work alongside the branch’s other co-president and with the Global Foundation on branch development and cross-border initiatives.',
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
    bio: 'Onew Choi serves as Co-President of IES United States, working with the branch’s other co-president on national leadership and expansion. Their responsibilities include developing the branch’s programming calendar, building relationships with schools and community organizations, and creating clear pathways for U.S.-based students to take on meaningful responsibility within IES. They also represent the branch in cross-branch collaboration with IES Korea and IES UK Society.',
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
    bio: 'Jimin Lee serves as President of IES UK Society, the newest branch in the network. The role is currently foundational: recruiting a national leadership team, establishing the first U.K. school chapters, and building relationships with schools that want a serious setting for ethical inquiry and civic engagement. They lead the branch’s early programming and work with the Global Foundation to ensure U.K. activity meets the network’s standards from the outset.',
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
    title: 'Director of Global Operations',
    scope: 'International coordination',
    responsibilities: [
      'Coordination between national branches',
      'Operational standards and reporting cycles',
      'Cross-border programming logistics',
    ],
  },
  {
    title: 'Vice President of Marketing',
    scope: 'Brand and digital presence',
    responsibilities: [
      'Brand consistency across branches and chapters',
      'Website and social content management',
      'Publication approval workflow',
    ],
    holder: 'jiho-han',
  },
  {
    title: 'Director of Partnerships',
    scope: 'Institutional relationships',
    responsibilities: [
      'Relationships with schools, universities, and nonprofits',
      'Partnership agreements and expectations',
      'Support for branch-level partnerships',
    ],
  },
]

export const leadershipIntro = {
  founding:
    'IES was founded in Seoul on 20 April 2023 by two students, who led it jointly as co-presidents and then each served a term as president. They remain responsible for the organization’s direction, standards, and international development.',
  global:
    'The Global Foundation is responsible for international coordination, cross-border initiatives, global partnerships, branding, branch development, and future expansion. Offices are filled as the organization grows; those not yet appointed are shown as pending rather than filled for appearance.',
  national:
    'Each national branch is led by students in that country. National leadership manages local programming, chapters, and outreach while remaining aligned with the Foundation’s mission and standards.',
}

export const foundingLeadership = people.filter((p) => p.tier === 'founding')
export const globalLeadership = people.filter((p) => p.tier === 'global')
export const nationalLeadership = people.filter((p) => p.tier === 'national')
export const personById = (id: string) => people.find((p) => p.id === id)
