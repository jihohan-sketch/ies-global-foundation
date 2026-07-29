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
    role: 'Original national branch and operational headquarters',
    summary:
      'Where IES began in April 2023, and the branch that carries the largest share of the organization’s programming, chapters, and day-to-day operations.',
    intro:
      'IES Korea is the original national branch of IES and the organization’s primary operational headquarters. Founded in Seoul on 20 April 2023, it is the largest student-led ethics organization in South Korea and holds the deepest institutional history, the largest chapter network, and the programs that established the model now used across the network. Work developed in Korea — ethics forums, policy advocacy, and sustained community service partnerships — is regularly adapted by the newer branches.',
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
        body: 'IES Korea is led by a national president working with an executive team across departments — education, projects, external partnerships, and media — together with chapter leaders at participating schools. The branch coordinates directly with the Global Foundation on standards, branding, and cross-border programming.',
        items: [
          'Ryan Jimyung Cha — President, IES Korea (since January 2026)',
          'Executive departments: education, projects, external partnerships, media',
          'Chapter leadership teams at participating schools',
        ],
      },
      {
        title: 'Ethics forums',
        body: 'The branch’s flagship programming is a recurring series of moderated forums on contested questions, each prepared and led by students and frequently featuring outside speakers.',
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
        body: 'IES Korea takes positions into formal civic channels rather than stopping at discussion. Its advocacy work has reached the National Assembly of Korea.',
        items: [
          'Petition to the National Assembly on regulating generative AI for children under 12',
          'Public statements and informative publications',
          'Press conferences and open debate',
        ],
      },
      {
        title: 'Community service',
        body: 'The branch runs sustained service partnerships rather than one-off volunteering, returning to the same organizations on a recurring schedule so that mentorship is actually possible.',
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
        body: 'IES Korea maintains the largest concentration of school chapters in the network, across international and domestic schools nationwide. Each chapter is student-led, operates under the shared IES chapter guidelines, and submits periodic updates to the national branch.',
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
    role: 'Expanding ethical leadership and youth engagement across the United States',
    summary:
      'Extends the IES mission into U.S. schools and communities, with a growth strategy built around school outreach, chapter formation, and partnerships.',
    intro:
      'IES United States brings the IES mission into the American educational context. The branch is led by two co-presidents and is focused on building a durable base of school chapters, developing a U.S. programming calendar, and forming partnerships with schools, universities, and community organizations. It operates within its own national context while holding to the mission, standards, and identity shared across the network.',
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
        body: 'The branch is led by two co-presidents who share responsibility for national strategy, chapter development, and coordination with the Global Foundation.',
        items: ['Aden Lee — Co-President, IES United States', 'Onew Choi — Co-President, IES United States'],
      },
      {
        title: 'Growth strategy',
        body: 'U.S. growth is deliberately sequenced: establish a small number of strong founding chapters, prove the programming model in an American school context, then expand regionally through students who have already run successful chapter activity.',
        items: [
          'Founding chapters at schools with committed student leadership',
          'Regional clusters rather than scattered single chapters',
          'Leadership pipeline from chapter officers to national roles',
        ],
      },
      {
        title: 'School outreach',
        body: 'Outreach centers on students and faculty advisors who want structured opportunities for ethical inquiry, service, and civic engagement that existing school activities do not already provide.',
        items: [
          'Introductory sessions for interested student groups',
          'Chapter guidelines and branding resources',
          'Support from national leadership through the first year of programming',
        ],
      },
      {
        title: 'Opportunities for U.S.-based students',
        body: 'Students in the United States can participate at several levels depending on how much responsibility they want to take on.',
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
    role: 'Building a growing network of students and schools across the United Kingdom',
    summary:
      'The newest national branch, focused on establishing founding chapters, recruiting student leadership, and building relationships with U.K. schools.',
    intro:
      'IES UK Society is the newest national branch in the network. Its current priority is foundational: recruiting capable student leaders, establishing the first chapters, and building relationships with schools that want to give students a serious setting for ethical inquiry and civic engagement. The branch operates under the same mission and standards as the rest of the network, adapted to the U.K. school system.',
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
        body: 'The branch is led by a national president, with additional officer roles to be confirmed as the founding team is completed.',
        items: ['Jimin Lee — President, IES UK Society'],
      },
      {
        title: 'Expansion plan',
        body: 'The U.K. branch is building deliberately rather than quickly. The first phase is a small founding cohort of chapters with committed leadership, followed by a national programming calendar once those chapters are running consistently.',
        items: [
          'Phase one — founding student leadership team',
          'Phase two — first school chapters and introductory programming',
          'Phase three — national events and school partnerships',
        ],
      },
      {
        title: 'Recruitment priorities',
        body: 'The branch is looking for students who want responsibility rather than a title: people willing to organise sessions, sustain a chapter through a full academic year, and hold to the network’s conduct and safety standards.',
        items: [
          'Founding chapter leaders',
          'National branch officers',
          'Faculty advisors and school contacts',
        ],
      },
      {
        title: 'Upcoming initiatives',
        body: 'Initial U.K. programming will follow the network’s core model, adapted for local schools, with cross-branch sessions connecting U.K. students to the wider network.',
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
  body: 'IES intends to expand responsibly into additional countries through qualified national leadership, institutional partnerships, and sustainable local programming.',
  detail:
    'A new national branch is established only when there is leadership capable of sustaining it, a realistic plan for local programming, and institutional relationships to support it. We do not announce countries before those conditions are met.',
  criteria: [
    'Qualified national leadership already in place',
    'A realistic first-year programming plan',
    'Institutional or school partnerships to support the work',
    'Capacity to meet IES conduct and participant safety standards',
  ],
}
