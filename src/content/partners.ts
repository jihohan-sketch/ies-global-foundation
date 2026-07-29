import type { PartnerCategory } from './types'

export const partnersIntro =
  'IES works with institutions that can give student programming real footing — schools that host chapters, organizations that host service work, and educators and professionals who are willing to take young people seriously. Partnerships are held to the same conduct and participant safety standards as our own programming.'

export const partnerCategories: PartnerCategory[] = [
  {
    title: 'Schools',
    description:
      'Secondary schools hosting IES chapters, providing space and faculty support for student-led programming.',
    examples: ['Chapter hosting', 'Faculty advisors', 'Joint school events'],
  },
  {
    title: 'Universities',
    description:
      'Academic institutions collaborating on forums, guest lectures, research mentorship, and student pathways.',
    examples: ['Guest lectures', 'Student research mentorship', 'Forum hosting'],
  },
  {
    title: 'Youth Organizations',
    description:
      'Organizations working with young people on leadership, civic engagement, and educational access.',
    examples: ['Joint programming', 'Shared campaigns', 'Leadership exchanges'],
  },
  {
    title: 'Community Centers',
    description:
      'Local centers where IES volunteers deliver recurring educational and mentorship programs.',
    examples: ['Educational sessions', 'Mentorship programs', 'Volunteer placements'],
  },
  {
    title: 'Nonprofits',
    description:
      'Mission-aligned organizations collaborating on service initiatives and community outreach.',
    examples: ['Service projects', 'Outreach campaigns', 'Volunteer capacity'],
  },
  {
    title: 'Public Institutions',
    description:
      'Public bodies and officials engaging students on governance, policy, and civic participation.',
    examples: ['Governance education', 'Speaker sessions', 'Civic engagement projects'],
  },
  {
    title: 'Educational Platforms',
    description:
      'Learning organizations and platforms supporting IES workshops, curricula, and student resources.',
    examples: ['Workshop content', 'Learning resources', 'Educator training'],
  },
  {
    title: 'International Organizations',
    description:
      'Organizations operating across borders, working with IES on cross-branch and international programming.',
    examples: ['International panels', 'Cross-border exchange', 'Joint initiatives'],
  },
]

export const collaborationAreas = [
  'Events and forums',
  'Student programs',
  'Guest speakers',
  'Service projects',
  'Research collaboration',
  'Youth engagement',
  'Educational campaigns',
  'International exchange',
]

export const partnershipProcess = [
  {
    title: 'Initial inquiry',
    body: 'Tell us who you are, what you do, and what kind of collaboration you have in mind. A short message is enough to start.',
  },
  {
    title: 'Conversation',
    body: 'We meet with you and, where relevant, the national branch that would carry the work. The purpose is to establish whether there is a genuine fit.',
  },
  {
    title: 'Scope and expectations',
    body: 'We agree on what each side is responsible for, what students will actually do, and the conduct and participant safety standards that apply.',
  },
  {
    title: 'Launch and review',
    body: 'The collaboration begins, with a scheduled review so both sides can assess whether it is working before extending it.',
  },
]

/**
 * ⚠ Partner logos may only be displayed with written permission from the
 * organization. Add entries here once permission is documented; the Partners
 * page hides the logo wall entirely while this array is empty.
 */
export const partnerLogos: { name: string; logo: string; href?: string }[] = []

/**
 * Organizations IES has publicly worked with, as documented on ie-society.com
 * and the organization's Korean Wikipedia entry.
 *
 * ⚠ Confirm each relationship is current, and that each organization is content
 * to be named here, before publishing.
 */
export const namedPartners: { group: string; note: string; organizations: string[] }[] = [
  {
    group: 'Community service partners',
    note: 'Organizations where IES volunteers deliver recurring educational and mentorship programs.',
    organizations: ['Nanoom Korea', 'Jiguchon Children’s Center', 'Guro Happy Children’s Center'],
  },
  {
    group: 'Institutional collaborators',
    note: 'Bodies IES has worked with on forums, advocacy, and youth programming.',
    organizations: [
      'Yale Model United Nations Korea (YMUN Korea)',
      'United Nations OHCHR',
      'National Assembly of Korea',
      'Korea Legacy Committee',
    ],
  },
  {
    group: 'Public and media recognition',
    note: 'Institutions and outlets that have covered or recognised IES work.',
    organizations: [
      'The Korea Times',
      'Ministry of Climate, Energy and Environment',
      'Nowon-gu Council, Seoul',
    ],
  },
]
