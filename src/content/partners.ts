import type { PartnerCategory } from './types'

export const partnersIntro =
  'IES works with institutions that give student programming real footing: schools that host chapters, organizations that host service work, and people willing to take young people seriously. Partners are held to the same conduct and safety standards as our own programming.'

export const partnerCategories: PartnerCategory[] = [
  {
    title: 'Schools',
    description:
      'Secondary schools hosting chapters, with space and faculty support.',
    examples: ['Chapter hosting', 'Faculty advisors', 'Joint school events'],
  },
  {
    title: 'Universities',
    description:
      'Forums, guest lectures, research mentorship, and student pathways.',
    examples: ['Guest lectures', 'Student research mentorship', 'Forum hosting'],
  },
  {
    title: 'Youth Organizations',
    description:
      'Leadership, civic engagement, and educational access for young people.',
    examples: ['Joint programming', 'Shared campaigns', 'Leadership exchanges'],
  },
  {
    title: 'Community Centers',
    description:
      'Local centers where volunteers run recurring education and mentorship.',
    examples: ['Educational sessions', 'Mentorship programs', 'Volunteer placements'],
  },
  {
    title: 'Nonprofits',
    description:
      'Service initiatives and community outreach with mission-aligned groups.',
    examples: ['Service projects', 'Outreach campaigns', 'Volunteer capacity'],
  },
  {
    title: 'Public Institutions',
    description:
      'Public bodies engaging students on governance, policy, and civic life.',
    examples: ['Governance education', 'Speaker sessions', 'Civic engagement projects'],
  },
  {
    title: 'Educational Platforms',
    description:
      'Support for IES workshops, curricula, and student resources.',
    examples: ['Workshop content', 'Learning resources', 'Educator training'],
  },
  {
    title: 'International Organizations',
    description:
      'Cross-border partners for international and cross-branch programming.',
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
    body: 'Who you are, what you do, and what you have in mind. A short message is enough.',
  },
  {
    title: 'Conversation',
    body: 'We meet you, and the branch that would carry the work. The point is to find out whether there is a real fit.',
  },
  {
    title: 'Scope and expectations',
    body: 'Who is responsible for what, what students will actually do, and which conduct and safety standards apply.',
  },
  {
    title: 'Launch and review',
    body: 'Work begins, with a scheduled review before either side extends it.',
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
    note: 'Where IES volunteers run recurring education and mentorship.',
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
    note: 'Outlets and institutions that have covered or recognised IES work.',
    organizations: [
      'The Korea Times',
      'Ministry of Climate, Energy and Environment',
      'Nowon-gu Council, Seoul',
    ],
  },
]
