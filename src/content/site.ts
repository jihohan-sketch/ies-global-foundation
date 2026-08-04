import type { ContactChannel, NavItem, SocialLink } from './types'

/**
 * Organisation-level copy, navigation and contact details.
 *
 * Contacts and social links below are the organization's real, published
 * channels (sourced from ie-society.com and linktr.ee/iesnational). Replace
 * `contact@`-style addresses only once dedicated mailboxes actually exist.
 * See REVIEW.md.
 */

export const site = {
  name: 'IES Global Foundation',
  /** Full legal/most formal name of the organization. */
  fullName: 'Interscholastic Ethics Society',
  koreanName: '세계청소년사회윤리재단',
  shortName: 'IES',
  tagline: 'Building Ethical Leaders Across Borders',
  /** The organization's existing, well-established motto. */
  motto: 'Ethics in Action',
  founded: '20 April 2023',
  foundedYear: 2023,
  url: 'https://iesglobalfoundation.org',
  /** The Korea branch's established website. */
  nationalSite: 'https://ie-society.com/',

  descriptor:
    'An international youth-led foundation connecting national branches through education, service, and civic responsibility.',

  mission:
    'IES helps young people lead with integrity, engage difficult ethical questions, and create change through education, service, and collaboration.',

  missionShort:
    'Building ethical leaders through education, service, and global collaboration.',

  /** The organization's own long-standing formulation of its purpose. */
  missionMotto: 'Turn dialogue into service.',

  vision:
    'An international network of young leaders who meet global challenges with curiosity, responsibility, empathy, and ethical judgment.',

  /** Used verbatim wherever the Korea / Foundation relationship is described. */
  headquartersStatement:
    'IES Korea is the original branch and operational headquarters. The Global Foundation coordinates the international network.',

  /** Shown beneath every statistics block. */
  statisticsNote:
    'Figures are current as of the latest reporting period, reviewed by branch leadership.',

  copyright: '© 2026 IES Global Foundation. All rights reserved.',

  legalNote:
    'The Interscholastic Ethics Society is a student-led nonprofit founded in Seoul, South Korea. The IES Global Foundation coordinates its international network of national branches, which are organizational units of that network rather than separately incorporated entities.',
} as const

/**
 * The organization's established values framework, used alongside the
 * Education / Well-Being / Civil Responsibility pillars.
 */
export const threeAs = [
  {
    title: 'Applied Ethics',
    subtitle: 'Ideas into Action',
    body: 'Ethical reasoning is finished only when it changes what someone does. Every forum ends in a commitment, not a conclusion.',
  },
  {
    title: 'Academic Vitality',
    subtitle: 'Fostering Intellectual Curiosity',
    body: 'Students prepare, argue from evidence, and take hard questions seriously rather than settle them quickly.',
  },
  {
    title: 'Advancing Equity',
    subtitle: 'Advocating for a Fair Future',
    body: 'Equity shapes which communities we serve, and how leadership is earned and shared.',
  },
] as const

export const values = {
  primary: {
    title: 'Equity',
    body: 'Equity organizes everything else. It shapes who we invite in, which communities we serve, and how leadership is earned and shared.',
  },
  supporting: [
    { title: 'Integrity', body: 'Doing careful, honest work — especially when no one is checking.' },
    { title: 'Responsibility', body: 'Owning outcomes, not only intentions.' },
    { title: 'Service', body: 'Contributing to communities on their terms, not ours.' },
    { title: 'Collaboration', body: 'Working across schools, branches, and borders.' },
    { title: 'Intellectual Curiosity', body: 'Taking difficult questions seriously.' },
    { title: 'Global Citizenship', body: 'Understanding local action in an international context.' },
    { title: 'Respect', body: 'Engaging disagreement without diminishing people.' },
    { title: 'Compassion', body: 'Recognising the human stakes behind every issue.' },
  ],
} as const

export const primaryNav: NavItem[] = [
  { label: 'About', href: '/about', description: 'Our story, structure, and purpose' },
  { label: 'Global Network', href: '/global-network', description: 'Korea, United States, United Kingdom' },
  { label: 'Our Work', href: '/our-work', description: 'Programs across five areas' },
  { label: 'Leadership', href: '/leadership', description: 'Global and national leadership' },
  { label: 'Impact', href: '/impact', description: 'Results, stories, and timeline' },
  { label: 'Partners', href: '/partners', description: 'Institutional collaboration' },
  { label: 'News', href: '/news', description: 'Announcements and updates' },
  { label: 'Contact', href: '/contact', description: 'Reach the right team' },
]

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Organization',
    items: [
      { label: 'About IES', href: '/about' },
      { label: 'Leadership', href: '/leadership' },
      { label: 'Governance', href: '/governance' },
      { label: 'Impact', href: '/impact' },
      { label: 'News', href: '/news' },
    ],
  },
  {
    title: 'Network',
    items: [
      { label: 'Global Network', href: '/global-network' },
      { label: 'IES Korea', href: '/global-network/korea' },
      { label: 'IES United States', href: '/global-network/united-states' },
      { label: 'IES UK Society', href: '/global-network/united-kingdom' },
      { label: 'Start a Chapter', href: '/start-a-chapter' },
    ],
  },
  {
    title: 'Get Involved',
    items: [
      { label: 'Join IES', href: '/join' },
      { label: 'Our Work', href: '/our-work' },
      { label: 'Partner With Us', href: '/partners' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export const legalNav: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Participant Safety', href: '/participant-safety' },
]

/**
 * ⚠ theiesociety@gmail.com is the organization's real published address and is
 * used for every channel until dedicated mailboxes are created. Do not list a
 * `partnerships@` or `media@` address here before it exists.
 */
const PRIMARY_EMAIL = 'theiesociety@gmail.com'

export const contactChannels: ContactChannel[] = [
  {
    label: 'General Inquiries',
    email: PRIMARY_EMAIL,
    description: 'Questions about IES, membership, or programs.',
  },
  {
    label: 'Partnerships',
    email: PRIMARY_EMAIL,
    description: 'Schools, universities, nonprofits, and institutional collaboration.',
  },
  {
    label: 'Media',
    email: PRIMARY_EMAIL,
    description: 'Press inquiries, interviews, and organizational statements.',
  },
  {
    label: 'Chapters',
    email: PRIMARY_EMAIL,
    description: 'Starting, joining, or supporting a school chapter.',
  },
]

export const branchContacts: ContactChannel[] = [
  {
    label: 'IES Korea',
    email: PRIMARY_EMAIL,
    description: 'Original branch and primary operational headquarters.',
  },
  {
    label: 'IES United States',
    email: PRIMARY_EMAIL,
    description: 'U.S. programs, chapters, and student leadership.',
  },
  {
    label: 'IES UK Society',
    email: PRIMARY_EMAIL,
    description: 'U.K. programs, chapters, and school outreach.',
  },
]

export const socials: SocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/iesnational/', handle: '@iesnational' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/interscholastic-ethics-society',
  },
  { label: 'YouTube', href: 'https://www.youtube.com/@InterscholasticEthicsSocie-r8w' },
]

/**
 * Each national branch's own site, as supplied by the organization.
 *
 * These are separate properties, run by the branches themselves — they are
 * listed as outbound links, never framed as part of this site. `domain` is
 * shown alongside the branch name so a visitor can see where a link goes
 * before following it.
 */
export const branchSites: { label: string; href: string; domain: string }[] = [
  { label: 'IES Korea', href: 'https://ie-society.com/', domain: 'ie-society.com' },
  { label: 'IES United States', href: 'https://iesusa.space/', domain: 'iesusa.space' },
  {
    label: 'IES United Kingdom',
    href: 'https://iesunitedkingdom.lovable.app/',
    domain: 'iesunitedkingdom.lovable.app',
  },
]

/** Membership application form published by IES Korea. */
export const membershipFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLScwPEue468afeSbfPTASYbFtm1Fiq7VM-Ex5tLJo7Ewx4rB4g/viewform'
