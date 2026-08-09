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
    title: 'Co-Founder · Vice Chairman · Director of Global Operations',
    tier: 'founding',
    spotlight: true,
    photo: '/leadership/joseph-hahmmin-kang.jpg',
    affiliations: ['Student, Seoul International School'],
    bio: 'Co-founded IES in Seoul in April 2023. Co-President to August 2025, then 2nd President to January 2026, setting the standards branches and chapters now operate under. Now Vice Chairman of the Global Foundation and its Director of Global Operations, holding the organization to those standards and coordinating the work that runs between the national branches.',
    responsibilities: [
      'Organizational direction and long-term strategy',
      'Mission, standards, and institutional identity',
      'International coordination across national branches',
      'Development of new branches and chapters',
    ],
  },
  {
    id: 'yura-shin',
    name: 'Yura Shin',
    title: 'Vice Chairman · Director of Global Outreach',
    tier: 'global',
    spotlight: true,
    photo: '/leadership/yura-shin.jpg',
    bio: 'Directs the Foundation’s outreach — schools asking what a chapter involves, organizations proposing a partnership, and students in countries where IES has no branch yet. Decides how those conversations open, which are worth carrying forward, and who takes each one on. As Vice Chairman she also works on the Foundation’s direction and the standards that growth is held to, alongside the President.',
    responsibilities: [
      'Governance and long-term direction of the Foundation',
      'First contact for schools, partners, and prospective chapters',
      'Outreach in countries without a national branch',
      'Handover of new relationships to the relevant branch or office',
    ],
  },
  {
    id: 'jaesuh-joshua-shin',
    name: 'Jaesuh Joshua Shin',
    koreanName: '신재서',
    title: 'Co-Founder',
    tier: 'founding',
    photo: '/leadership/jaesuh-joshua-shin.jpg',
    affiliations: ['Student, Seoul Foreign School'],
    bio: 'Co-founded IES in Seoul in April 2023. Co-President to August 2025, then 1st President to October 2025, designing IES programming and growing the school chapter network.',
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
    title: 'President · Director of Global Marketing',
    tier: 'global',
    photo: '/leadership/sean-han.jpg',
    bio: 'Sean Han is President of the Global Foundation and its Director of Global Marketing. As President they lead the Foundation’s offices and its work with the national branches. As Director of Global Marketing they are responsible for how IES presents itself across Korea, the United States, and the United Kingdom: the organization’s brand, this website, and its social channels, together with the approval process every public statement passes through before publication. Much of that work is consistency — a chapter in Seoul, a founding team in the United States, and a branch in London all describe the same organization, and it should read that way to a school deciding whether to work with IES. They also set the standards branches follow in building their own communications.',
    responsibilities: [
      'Executive leadership of the Global Foundation',
      'Coordination across the Foundation’s offices',
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

  /* ------------------------------------------------- Board of Directors */
  {
    id: 'hyundoo-cho',
    name: 'Hyundoo Cho',
    koreanName: '조현두',
    title: 'Member of the Board of Directors',
    tier: 'board',
    photo: '/leadership/hyundoo-cho.jpg',
    bio: 'Serves on the board of directors of the IES Global Foundation. The board is the adult oversight a student-led organization is accountable to: it reviews how the Foundation is run, holds it to its own standards, and advises the students who lead it. Directors do not run programming — that stays with the students.',
    responsibilities: [
      'Oversight of the Foundation’s governance and conduct',
      'Review of how the Foundation is run against its own standards',
      'Guidance for the students leading the Foundation and its branches',
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
  /**
   * Shown in place of the holder's biography when that holder already has a
   * PersonCard elsewhere on the Leadership page — the founders do. Their
   * founding biography covers how IES started; this covers what the office
   * they now hold actually does, so the card says something new.
   */
  holderNote?: string
}[] = [
  {
    title: 'President',
    scope: 'Foundation leadership',
    responsibilities: [
      'Executive leadership of the Global Foundation',
      'Coordination across the Foundation’s offices',
      'Support for national branch leadership',
    ],
    holder: 'sean-han',
  },
  {
    title: 'Director of Global Marketing',
    scope: 'Brand and digital presence',
    responsibilities: [
      'Brand consistency across branches and chapters',
      'Website and social content management',
      'Publication approval workflow',
    ],
    holder: 'sean-han',
  },
  {
    title: 'Vice Chairman',
    scope: 'Foundation governance',
    responsibilities: [
      'Governance and long-term direction of the Foundation',
      'Growth of the network and the standards it is held to',
      'Support for the President and the national branches',
    ],
    holder: 'yura-shin',
  },
  {
    title: 'Director of Global Outreach',
    scope: 'External relationships',
    responsibilities: [
      'First contact for schools, partners, and prospective chapters',
      'Outreach in countries without a national branch',
      'Handover of new relationships to the relevant branch or office',
    ],
    holder: 'yura-shin',
    holderNote:
      'Outreach exists because growth arrives as an inquiry from outside — a teacher who saw a forum, a charity looking for student volunteers, a student in a country with no branch. Shin decides which of those IES can genuinely support, makes sure a school knows what it is taking on before it commits, and hands each one to whoever will carry it. An approach that goes unanswered, or is passed to a branch with no capacity for it, costs the network more than never having been made. As Vice Chairman she also answers for whether that growth stays inside the standards the rest of the network works to.',
  },
  {
    title: 'Vice Chairman',
    scope: 'Foundation governance',
    responsibilities: [
      'Governance and long-term direction of the Foundation',
      'Continuity with the standards IES was founded on',
      'Support for the President and the national branches',
    ],
    holder: 'joseph-hahmmin-kang',
    holderNote:
      'As Vice Chairman, Kang holds the organization to the standards he set as president — the conduct rules, the chapter guidelines, and the reporting each branch answers to. As Director of Global Operations he runs the work that crosses borders: coordination between Korea, the United States, and the United Kingdom, the reporting cycle the branches keep to, and the logistics behind programming that runs in more than one country at once. The role exists because three branches working to one set of standards need someone accountable for whether that is actually happening.',
  },
  {
    title: 'Director of Global Operations',
    scope: 'International coordination',
    responsibilities: [
      'Coordination between national branches',
      'Operational standards and reporting cycles',
      'Cross-border programming logistics',
    ],
    holder: 'joseph-hahmmin-kang',
  },
]

export const leadershipIntro = {
  foundation:
    'The officers who run the Foundation day to day, across governance, international operations, and outreach.',
  board:
    'IES is run by students. The board is the oversight they answer to — it reviews how the Foundation is governed and advises the students leading it, without taking over the work.',
  founding:
    'Founded in Seoul on 20 April 2023 by two students, who led it jointly and then each served a term as president.',
  global:
    'The Foundation handles international coordination, partnerships, branding, and branch development. Offices are filled as we grow — unfilled ones are shown as pending, not padded out.',
  national: 'Each branch is led by students in that country, to the same shared standards.',
}

/** The opening group on the Leadership page, in array order. */
export const spotlightLeadership = people.filter((p) => p.spotlight)
export const foundingLeadership = people.filter((p) => p.tier === 'founding')
export const boardLeadership = people.filter((p) => p.tier === 'board')
export const globalLeadership = people.filter((p) => p.tier === 'global')
export const nationalLeadership = people.filter((p) => p.tier === 'national')
export const personById = (id: string) => people.find((p) => p.id === id)
