import type { LeadershipMessage, Person } from './types'

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
    bio: 'Co-founded IES in Seoul in April 2023. Co-President to August 2025, then 2nd President to January 2026, setting the standards branches and chapters now run under. As Vice Chairman and Director of Global Operations, he holds the organization to those standards and coordinates the work that runs between branches.',
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
    bio: 'Directs the Foundation’s outreach — schools asking what a chapter involves, organizations proposing a partnership, students in countries with no branch yet. She decides how those conversations open, which are worth carrying forward, and who takes each one on. As Vice Chairman she also works on the Foundation’s direction alongside the President.',
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
    bio: 'Co-founded IES in Seoul in April 2023. Co-President to August 2025, then 1st President to October 2025, designing IES programming and growing the chapter network.',
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
    spotlight: true,
    photo: '/leadership/sean-han.jpg',
    bio: 'President of the Global Foundation and its Director of Global Marketing. As President, leads the Foundation’s offices and its work with the national branches. As Director of Global Marketing, responsible for how IES presents itself across Korea, the United States, and the United Kingdom — the brand, this website, the social channels, and the approval every public statement passes through. Much of that is consistency: a chapter in Seoul, a founding team in the United States, and a branch in London all describe the same organization, and it should read that way to a school deciding whether to work with IES.',
    responsibilities: [
      'Executive leadership of the Global Foundation',
      'Coordination across the Foundation’s offices',
      'Brand consistency across branches and chapters',
      'Website and social content management',
      'Publication approval workflow',
    ],
  },
  {
    id: 'jaehoo-lee',
    name: 'Jaehoo Lee',
    title: 'Business Analyst',
    tier: 'global',
    spotlight: true,
    photo: '/leadership/jaehoo-lee.jpg',
    bio: 'Business Analyst for the Global Foundation. His work is the Foundation itself rather than the branches: what its own records show, what its programmes take to run, and whether a figure it puts in front of a school or a partner is backed by something. He turns that into the analysis the President works from — where the Foundation’s effort is actually going, what it has the capacity to commit to, and what it should hold off on until the numbers say otherwise.',
    responsibilities: [
      'Analysis and reporting for the Global Foundation',
      'Review of the Foundation’s figures before they are published',
      'Cost and capacity analysis for Foundation programmes',
      'Analysis supporting the President’s decisions',
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
    photo: '/leadership/ryan-cha.jpg',
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
    photo: '/leadership/aden-lee.jpg',
    bio: 'Co-President of IES United States. Establishing founding chapters and adapting IES programming to American schools without loosening shared standards.',
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
    photo: '/leadership/onew-choi.jpg',
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
    photo: '/leadership/jimin-lee.jpg',
    bio: 'President of IES UK Society, the newest branch. Recruiting the first national officers and founding chapters, and leading its early programming.',
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
    affiliations: ['Chairman, Nanoom Korea (사단법인 나눔코리아)'],
    bio: 'Chairman of Nanoom Korea, a non-profit supporting isolated older people, single-parent and multicultural families, North Korean defectors, and young children through home visits, living costs, medicine, and scholarships. It is one of the partners IES Korea returns to, so he brings the board a direct view of the work students do there. The board reviews governance and advises the students leading IES; it does not run the programming.',
    responsibilities: [
      'Oversight of the Foundation’s governance and conduct',
      'Review of how the Foundation is run against its own standards',
      'Guidance for the students leading the Foundation and its branches',
    ],
  },
]

/**
 * ⚠ REVIEW BEFORE PUBLISHING — DRAFT, WRITTEN FOR APPROVAL
 *
 * The two signed messages on the About page. Both are drafts: they were
 * assembled from facts already published elsewhere on this site — the founding
 * date and city, the two founders, the three branches, the figures in
 * `impact.ts`, and the forum-then-service model in `work.ts` — and nothing in
 * them is a claim the site does not already make. No new fact, figure,
 * programme, or achievement has been introduced.
 *
 * They still have to be read and approved, in their own words, by the person
 * whose name is under them before this page goes live. A message is the one
 * thing on the site written in the first person; the person it is signed by
 * owns it.
 *
 * Order here is the order they render. The founder speaks first because his
 * message is about where IES came from and the president's is about where it
 * is now — that is the sequence, not a ranking.
 */
export const leadershipMessages: LeadershipMessage[] = [
  {
    personId: 'joseph-hahmmin-kang',
    label: 'Founder’s Message',
    signature: 'Co-Founder · Vice Chairman, IES Global Foundation',
    body: [
      'In April 2023 there were two of us and one complaint: our schools were very good at teaching us how to win an argument, and had almost nothing to say about which arguments were worth winning.',
      'So we booked a room. The rule was that you arrived having done the reading, you argued in front of people who disagreed with you, and you did not get to leave with only an opinion — you left with something you had committed to do.',
      'That rule is the whole organisation. Everything since — the chapters, the three national branches, the forums running in countries I have never been to — is that same room, repeated by students I have never met.',
      'I now hold IES to the standards I set while I was its president. The one that matters is the oldest: a conclusion you are not willing to act on was never a conclusion.',
    ],
  },
  {
    personId: 'sean-han',
    label: 'President’s Message',
    signature: 'President, IES Global Foundation',
    body: [
      'IES is much larger than the room it started in — 1,200+ students, 23+ chapters, and three national branches. Every role in it, including this one, is held by a student.',
      'That is the part people find hardest to believe, so it is the part we are most careful about. We do not publish a figure we cannot show you the work behind, and we do not open a chapter a branch has no capacity to support.',
      'What I answer for is that a chapter in Seoul, a founding team in the United States, and a branch in London are describing the same organisation — and holding to the same standard for how a question is argued and what happens afterwards.',
      'If that is something you want to be part of, the fastest way in is your own school. If there is no chapter there yet, that is the opening.',
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
    holderNote:
      'The President answers for what the Foundation actually does — the offices under him, the work that runs between them, and whether the branches are being supported rather than only supervised. As Director of Global Marketing he also owns what IES says in public: the website, the social channels, and the approval every statement passes through before it goes out. Students in three countries produce a great deal of public material, and someone has to be accountable for whether it is accurate and whether it reads as one organisation.',
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
      'Growth arrives as an inquiry from outside — a teacher who saw a forum, a charity looking for volunteers, a student in a country with no branch. Shin decides which IES can genuinely support, makes sure a school knows what it is taking on, and hands each one to whoever will carry it. An approach left unanswered, or passed to a branch with no capacity for it, costs more than never having been made. As Vice Chairman she also answers for whether that growth stays inside the network’s standards.',
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
      'As Vice Chairman, Kang holds IES to the standards he set as president — the conduct rules, the chapter guidelines, the reporting each branch answers to. As Director of Global Operations he runs the work that crosses borders: coordination between the three branches, the reporting cycle they keep to, and the logistics behind programming that runs in more than one country at once. Three branches on one set of standards need someone accountable for whether that is actually happening.',
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
    'The officers who run the Foundation day to day — governance, international operations, outreach, and analysis.',
  board:
    'IES is run by students. The board is the oversight they answer to: it reviews governance and advises, without taking over the work.',
  founding:
    'Founded in Seoul on 20 April 2023 by two students, who led it jointly and then each served as president.',
  global:
    'International coordination, partnerships, branding, and branch development. Offices fill as we grow — unfilled ones are shown as pending, not padded out.',
  national: 'Each branch is led by students in that country, to the same shared standards.',
}

/**
 * The opening group on the Leadership page.
 *
 * Membership is the `spotlight` flag; order is array order, with one exception.
 * `people` is grouped by tier — founding first, then the Foundation's officers
 * — so the President sorts *below* the two Vice Chairmen, which is the one
 * ordering this group must not have. Naming the lead here rather than
 * reordering `people` keeps the tier grouping every other derived list
 * depends on intact.
 *
 * Anyone flagged `spotlight` still appears whether or not they are named
 * below; the list pins a front, it does not gate the group.
 */
const SPOTLIGHT_LEAD: readonly string[] = ['sean-han']

export const spotlightLeadership = people
  .filter((p) => p.spotlight)
  .sort((a, b) => {
    const rank = (id: string) => {
      const i = SPOTLIGHT_LEAD.indexOf(id)
      return i === -1 ? SPOTLIGHT_LEAD.length : i
    }
    return rank(a.id) - rank(b.id)
  })
export const foundingLeadership = people.filter((p) => p.tier === 'founding')
export const boardLeadership = people.filter((p) => p.tier === 'board')
export const globalLeadership = people.filter((p) => p.tier === 'global')
export const nationalLeadership = people.filter((p) => p.tier === 'national')
export const personById = (id: string) => people.find((p) => p.id === id)
