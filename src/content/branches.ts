import type { Branch, BranchSlug } from './types'

/**
 * The three national branches.
 *
 * IES Korea's programs and partners below are drawn from the organization's
 * published record (ie-society.com and the Korean Wikipedia entry). U.S. and
 * U.K. content describes each branch's current phase and must be confirmed by
 * that branch's leadership before publication. Nothing here should describe a
 * branch as a separately incorporated entity.
 */

export const branches: Branch[] = [
  {
    slug: 'korea',
    name: 'IES Korea',
    country: 'Korea',
    code: 'KR',
    role: 'Original branch and operational headquarters',
    summary:
      'Where IES began in April 2023, and the branch carrying most of its programming, chapters, and daily operations.',
    intro:
      'The original branch and the operational headquarters. Founded in Seoul on 20 April 2023, it is the largest student-led ethics organization in South Korea, and the source of the programs the rest of the network works from — ethics forums, policy advocacy, and sustained service partnerships.',
    established: '20 April 2023',
    headquarters: 'Seoul, Republic of Korea',
    status: 'Headquarters',
    point: { lat: 37.5665, lon: 126.978 },
    facts: [
      { label: 'Established', value: '20 April 2023, Seoul' },
      { label: 'Role in the network', value: 'Original branch · Operational headquarters' },
      { label: 'National president', value: 'Ryan Jimyung Cha' },
      { label: 'Languages of operation', value: 'Korean and English' },
    ],
    sections: [
      {
        title: 'National leadership',
        body: 'A national president leads an executive team across education, projects, external partnerships, and media, alongside chapter leaders at participating schools.',
        items: [
          'Ryan Jimyung Cha — President, IES Korea (since January 2026)',
          'Executive departments: education, projects, external partnerships, media',
          'Chapter leadership teams at participating schools',
        ],
      },
      {
        title: 'Ethics forums',
        body: 'A recurring series of moderated forums on contested questions, prepared and led by students, often with outside speakers.',
        items: [
          'Medical ethics',
          'AI and technology ethics',
          'Military ethics and leadership',
          'Environmental ethics',
          'Human rights',
        ],
      },
      {
        title: 'Policy advocacy',
        body: 'IES Korea takes positions into formal civic channels rather than stopping at discussion — as far as the National Assembly of Korea.',
        items: [
          'Petition to the National Assembly on regulating generative AI for children under 12',
          'Public statements and informative publications',
          'Press conferences and open debate',
        ],
      },
      {
        title: 'Community service',
        body: 'Returning to the same organizations on a schedule, so mentorship is actually possible.',
        items: [
          'Nanoom Korea',
          'Jiguchon Children’s Center',
          'Guro Happy Children’s Center',
          'Grassroots fundraising campaigns',
          'Community fairs and outreach',
        ],
      },
      {
        title: 'School chapters',
        body: 'The largest concentration of chapters in the network. Each is student-led, runs under the shared guidelines, and reports periodically to the branch.',
        items: [
          'Chapter leadership teams at participating schools',
          'Termly programming plans reviewed by the national branch',
          'Shared branding, conduct, and participant safety standards',
        ],
      },
    ],
    contactEmail: 'theiesociety@gmail.com',
    social: [
      { label: 'Website', href: 'https://ie-society.com/' },
      { label: 'Instagram', href: 'https://www.instagram.com/iesnational/', handle: '@iesnational' },
      { label: 'YouTube', href: 'https://www.youtube.com/@InterscholasticEthicsSocie-r8w' },
    ],
  },
  {
    slug: 'united-states',
    name: 'IES United States',
    country: 'United States',
    code: 'US',
    role: 'Building the IES network across the United States',
    summary:
      'Bringing IES into U.S. schools and communities, through outreach, chapter formation, and partnerships.',
    intro:
      'IES in the American school context. Led by two co-presidents, the branch is building a base of school chapters, a U.S. programming calendar, and partnerships with schools, universities, and community organizations — to the standards shared across the network.',
    established: 'Established as a national branch under the IES Global Foundation',
    headquarters: 'United States',
    status: 'Active',
    point: { lat: 38.9072, lon: -77.0369 },
    facts: [
      { label: 'Role in the network', value: 'National branch' },
      { label: 'National co-presidents', value: 'Aden Lee · Onew Choi' },
      { label: 'Primary focus', value: 'Chapter formation and school outreach' },
      { label: 'Language of operation', value: 'English' },
    ],
    sections: [
      {
        title: 'National leadership',
        body: 'Two co-presidents share national strategy, chapter development, and coordination with the Global Foundation.',
        items: ['Aden Lee — Co-President, IES United States', 'Onew Choi — Co-President, IES United States'],
      },
      {
        title: 'Growth strategy',
        body: 'Growth is sequenced on purpose: a few strong founding chapters first, prove the model in American schools, then expand regionally through students who have already run one.',
        items: [
          'Founding chapters at schools with committed student leadership',
          'Regional clusters rather than scattered single chapters',
          'Leadership pipeline from chapter officers to national roles',
        ],
      },
      {
        title: 'School outreach',
        body: 'Aimed at students and faculty advisors who want structured ethical inquiry, service, and civic engagement that existing school activities do not offer.',
        items: [
          'Introductory sessions for interested student groups',
          'Chapter guidelines and branding resources',
          'Support from national leadership through the first year of programming',
        ],
      },
      {
        title: 'Opportunities for U.S.-based students',
        body: 'Several levels, depending on how much responsibility you want.',
        items: [
          'Membership and participation in national events',
          'Founding or joining a school chapter',
          'National branch operations and leadership roles',
          'Cross-branch collaboration with Korea and the United Kingdom',
        ],
      },
    ],
    contactEmail: 'theiesociety@gmail.com',
  },
  {
    slug: 'united-kingdom',
    name: 'IES UK Society',
    country: 'United Kingdom',
    code: 'GB',
    role: 'Building the IES network across the United Kingdom',
    summary:
      'The newest branch: founding chapters, student leadership, and relationships with U.K. schools.',
    intro:
      'The newest branch in the network. The priority is foundational: recruiting student leaders, opening the first chapters, and building relationships with schools that want a serious setting for ethical inquiry — the network’s standards, adapted to U.K. schools.',
    established: 'Established as a national branch under the IES Global Foundation',
    headquarters: 'United Kingdom',
    status: 'Establishing',
    point: { lat: 51.5072, lon: -0.1276 },
    facts: [
      { label: 'Role in the network', value: 'National branch' },
      { label: 'National president', value: 'Jimin Lee' },
      { label: 'Current phase', value: 'Founding chapters and leadership recruitment' },
      { label: 'Language of operation', value: 'English' },
    ],
    sections: [
      {
        title: 'National leadership',
        body: 'A national president leads, with further officer roles confirmed as the founding team fills out.',
        items: ['Jimin Lee — President, IES UK Society'],
      },
      {
        title: 'Expansion plan',
        body: 'Built deliberately rather than quickly: a small founding cohort of chapters with committed leadership first, then a national programming calendar once they run consistently.',
        items: [
          'Phase one — founding student leadership team',
          'Phase two — first school chapters and introductory programming',
          'Phase three — national events and school partnerships',
        ],
      },
      {
        title: 'Recruitment priorities',
        body: 'Students who want responsibility rather than a title — willing to organise sessions, carry a chapter through a full academic year, and keep to the network’s conduct and safety standards.',
        items: [
          'Founding chapter leaders',
          'National branch officers',
          'Faculty advisors and school contacts',
        ],
      },
      {
        title: 'Upcoming initiatives',
        body: 'The network’s core model adapted for local schools, with cross-branch sessions connecting U.K. students to the rest of IES.',
        items: [
          'Introductory ethics discussion series',
          'School outreach and information sessions',
          'Participation in cross-branch international panels',
        ],
      },
    ],
    contactEmail: 'theiesociety@gmail.com',
  },
]

export const branchBySlug = (slug: string): Branch | undefined =>
  branches.find((branch) => branch.slug === (slug as BranchSlug))

export const futureExpansion = {
  title: 'Future Expansion',
  body: 'IES expands into new countries only through qualified national leadership, institutional partnerships, and programming that can be sustained locally.',
  detail:
    'A branch opens only when there is leadership capable of sustaining it, a realistic plan for local programming, and institutions to support it. We do not announce countries before that.',
  criteria: [
    'Qualified national leadership already in place',
    'A realistic first-year programming plan',
    'Institutional or school partnerships to support the work',
    'Capacity to meet IES conduct and participant safety standards',
  ],
}
