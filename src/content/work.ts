import type { Pillar, WorkCategory } from './types'

/** The three organizational pillars. */
export const pillars: Pillar[] = [
  {
    id: 'education',
    title: 'Education',
    summary:
      'Ethics, leadership, public policy, debate, philosophy, technology, and global affairs.',
    body: 'Students get plenty of chances to perform academically and few to think hard without a grade attached. IES builds settings where that thinking is the point.',
    points: [
      'Moderated ethics discussions and public forums',
      'Debate, philosophy, and public policy sessions',
      'Responsible technology and AI education',
    ],
  },
  {
    id: 'well-being',
    title: 'Well-Being',
    summary:
      'Service, mentorship, and inclusion — for the communities we work with, and for our own students.',
    body: 'Reflection that never leaves the seminar room is incomplete. This is the work IES does with communities — mentorship, service, inclusion — and the well-being of its own students.',
    points: [
      'Children’s center programs and mentorship',
      'Volunteer and community outreach initiatives',
      'Inclusion and accessibility in programming',
    ],
  },
  {
    id: 'civil-responsibility',
    title: 'Civil Responsibility and Governance',
    summary:
      'Informed civic participation, ethical decisions, and real engagement with institutions.',
    body: 'Students are citizens before they are voters. This builds the habits that make participation real: understanding institutions, engaging them, and owning the consequences.',
    points: [
      'Governance and policy education',
      'Student-led civic campaigns and petitions',
      'Community problem-solving projects',
    ],
  },
]

/** Detailed programme areas shown on the Our Work page. */
export const workCategories: WorkCategory[] = [
  {
    id: 'education-and-ethics',
    title: 'Education and Ethics',
    summary:
      'Hard questions taken on directly, in discussion and in writing. Student-led, and you come prepared.',
    examples: [
      'Ethics discussions on contested contemporary issues',
      'Public forums open to students across schools',
      'Debate and philosophy sessions',
      'Workshops on argument, evidence, and reasoning',
    ],
    image: '/activities/environmental-ethics-forum/chamber.jpg',
    imageAlt:
      "IES students seated at the desks of a council chamber with printed briefs in front of them during the Environmental Ethics Forum.",
  },
  {
    id: 'community-service',
    title: 'Community Service',
    summary:
      'Sustained partnerships, not one-off volunteering — built around what partners actually need.',
    examples: [
      'Children’s center educational programs',
      'Mentorship for younger students',
      'Volunteer initiatives with local organizations',
      'Community outreach and support drives',
    ],
    image: '/activities/guro-happy-childrens-center/lesson.jpg',
    imageAlt:
      "An IES volunteer teaching at a whiteboard while children sit on the floor of the Guro Happy Children's Center.",
  },
  {
    id: 'leadership-development',
    title: 'Leadership Development',
    summary:
      'Students run programs, manage teams, represent IES, and answer for the results.',
    examples: [
      'Executive and national branch leadership roles',
      'Chapter leadership and officer positions',
      'Public speaking and moderation practice',
      'Project and event management',
    ],
    image: '/activities/nanoom-korea-scholarship/ceremony.jpg',
    imageAlt:
      "An IES student speaking at a lectern during the Nanoom Korea scholarship presentation.",
  },
  {
    id: 'civic-responsibility',
    title: 'Civic Responsibility',
    summary:
      'Understanding institutions well enough to engage them, and telling advocacy from performance.',
    examples: [
      'Policy awareness sessions',
      'Student petitions and campaigns',
      'Governance education',
      'Community problem-solving initiatives',
    ],
    image: '/activities/environmental-ethics-forum/assembly.jpg',
    imageAlt:
      "IES students with Minister Sunghwan Kim beneath the Environmental Ethics Forum banner at the Nowon-gu Council chamber.",
  },
  {
    id: 'global-collaboration',
    title: 'Global Collaboration',
    summary:
      'Students from three countries in one conversation, where local assumptions get tested.',
    examples: [
      'Cross-branch events and joint sessions',
      'International panels and forums',
      'Shared campaigns across branches',
      'Cultural and educational exchange',
    ],
    image: '/activities/un-human-rights-office-visit/delegation.jpg',
    imageAlt:
      "Four IES students in front of a UN-branded backdrop at the Office of the High Commissioner for Human Rights in Seoul.",
  },
]

/** Featured work shown on the home page. Ids reference `workCategories`. */
export const featuredWork = [
  {
    title: 'Youth Ethics Forums',
    body: 'Students take positions on contested questions and defend them in public.',
    href: '/our-work#education-and-ethics',
  },
  {
    title: 'Community Service Initiatives',
    body: 'Sustained partnerships with children’s centers and community organizations.',
    href: '/our-work#community-service',
  },
  {
    title: 'School Chapter Programs',
    body: 'Student-led chapters running their own programming under shared IES standards.',
    href: '/our-work#leadership-development',
  },
  {
    title: 'International Partnerships',
    body: 'Collaboration with schools, universities, nonprofits, and public institutions.',
    href: '/partners',
  },
  {
    title: 'Civic Engagement',
    body: 'Policy awareness, governance education, and student-led campaigns on public issues.',
    href: '/our-work#civic-responsibility',
  },
]

export const differentiators = [
  {
    title: 'Youth-led, properly structured',
    body: 'Every role is held by a student, with defined responsibilities, reporting, and standards that hold across borders.',
  },
  {
    title: 'International but locally grounded',
    body: 'Branches run their own programming in their own context. What they share is a mission and a set of standards — not a template.',
  },
  {
    title: 'Both ideas and action',
    body: 'Inquiry that stops at discussion is incomplete; service without reflection is thin. IES insists on both.',
  },
  {
    title: 'Leadership, not prestige',
    body: 'Positions in IES exist because work needs doing. We do not create titles to decorate applications.',
  },
  {
    title: 'Open to collaboration',
    body: 'We work with schools, universities, nonprofits, and public institutions — not in isolation.',
  },
]
