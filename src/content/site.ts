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

  /*
   * THE SENTENCE UNDER THE HEADLINE, AND THE MOST IMPORTANT COPY ON THE SITE.
   *
   * It was "An international youth-led foundation connecting national branches
   * through education, service, and civic responsibility." Every word of that
   * is true and none of it is information: a visitor who reads it still cannot
   * say what IES *is*, what happens at one of its events, or who takes part.
   * It describes a category, not an organisation.
   *
   * The replacement answers the first three questions the brief asks a visitor
   * should be able to answer in one screen — what is it, who runs it, what
   * does it actually do — using only facts already published elsewhere on this
   * site: the founding date and city, the three countries, the forum format
   * (see workCategories), and the commitment that a forum ends in service
   * rather than in a conclusion (see threeAs).
   */
  descriptor:
    'A student-run ethics society founded in Seoul in April 2023, now working across Korea, the United States, and the United Kingdom. Students run moderated forums on contested questions, then take what they conclude into service in their own communities.',

  /*
   * "Create change" was doing no work here, and neither was "lead with
   * integrity" — both are the kind of phrase every youth organisation writes,
   * which is precisely why neither distinguishes this one. What IES actually
   * insists on is the join between the two halves: argue the question
   * properly, then be accountable for what you decided. That is a claim a
   * reader can check, and it is the one the Three A's, the forum format and
   * the service partnerships all rest on.
   */
  mission:
    'IES exists so that students argue hard questions properly — with preparation, in public, against people who disagree — and are then held to what they concluded.',

  missionShort: 'Argue it properly. Then be accountable for it.',

  /** The organization's own long-standing formulation of its purpose. */
  missionMotto: 'Turn dialogue into service.',

  /*
   * A vision has to describe a *destination*, and the old one described a
   * temperament ("curiosity, responsibility, empathy, ethical judgment") that
   * could be claimed by any organisation working with young people. This one
   * names the thing IES is actually building toward and can be measured
   * against: chapters that run themselves, in more than one country, to one
   * standard.
   */
  vision:
    'Student-led chapters in every country IES reaches, each running its own programming, each held to the same standard for how a question is argued and what happens afterwards.',

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
  { label: 'Gallery', href: '/gallery', description: 'Every photograph and film' },
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
      { label: 'Gallery', href: '/gallery' },
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
