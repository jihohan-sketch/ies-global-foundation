import type { Pillar, WorkCategory } from './types'

/** The three organizational pillars. */
export const pillars: Pillar[] = [
  {
    id: 'education',
    title: 'Education',
    summary:
      'Creating opportunities for students to explore ethics, leadership, public policy, debate, philosophy, technology, and global affairs.',
    body: 'Students get plenty of chances to perform academically and few to think seriously about hard questions without a grade attached. IES builds settings where that thinking is the point, and where students defend their reasoning.',
    points: [
      'Moderated ethics discussions and public forums',
      'Debate, philosophy, and public policy sessions',
      'Responsible technology and AI education',
      'Student-led research and writing',
    ],
  },
  {
    id: 'well-being',
    title: 'Well-Being',
    summary:
      'Supporting young people and communities through service, mentorship, inclusion, and initiatives that promote personal and social well-being.',
    body: 'Reflection that never leaves the seminar room is incomplete. This pillar covers the work IES does with communities — mentorship, service partnerships, inclusion — and the well-being of its own students.',
    points: [
      'Children’s center programs and mentorship',
      'Volunteer and community outreach initiatives',
      'Inclusion and accessibility in programming',
      'Peer support within chapters and branches',
    ],
  },
  {
    id: 'civil-responsibility',
    title: 'Civil Responsibility and Governance',
    summary:
      'Encouraging informed civic participation, ethical decision-making, responsible leadership, and constructive engagement with social institutions.',
    body: 'Students are citizens before they are voters. This pillar builds the habits that make participation substantive rather than symbolic: understanding how institutions work, engaging them, and owning the consequences.',
    points: [
      'Governance and policy education',
      'Student-led civic campaigns and petitions',
      'Community problem-solving projects',
      'Ethical decision-making in leadership roles',
    ],
  },
]

/** Detailed programme areas shown on the Our Work page. */
export const workCategories: WorkCategory[] = [
  {
    id: 'education-and-ethics',
    title: 'Education and Ethics',
    summary:
      'Structured settings where students engage hard questions directly — in discussion, argument, and writing. Sessions are student-led, with preparation expected rather than passive attendance.',
    examples: [
      'Ethics discussions on contested contemporary issues',
      'Public forums open to students across schools',
      'Debate and philosophy sessions',
      'Workshops on argument, evidence, and reasoning',
      'Student-led research projects',
      'Responsible technology and AI education',
    ],
    image: '/activities/environmental-ethics-forum/chamber.jpg',
    imageAlt:
      "IES students seated at the desks of a council chamber with printed briefs in front of them during the Environmental Ethics Forum.",
  },
  {
    id: 'community-service',
    title: 'Community Service',
    summary:
      'Sustained relationships with community organizations rather than one-off volunteering. Programs are built around what partners actually need, and measured by whether students keep showing up.',
    examples: [
      'Children’s center educational programs',
      'Mentorship for younger students',
      'Volunteer initiatives with local organizations',
      'Scholarship-related service work',
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
      'Real responsibility with real consequences. Students in IES roles run programs, manage teams, represent the organization, and answer for the results.',
    examples: [
      'Executive and national branch leadership roles',
      'Chapter leadership and officer positions',
      'Public speaking and moderation practice',
      'Project and event management',
      'International collaboration across branches',
    ],
    image: '/activities/nanoom-korea-scholarship/ceremony.jpg',
    imageAlt:
      "An IES student speaking at a lectern during the Nanoom Korea scholarship presentation.",
  },
  {
    id: 'civic-responsibility',
    title: 'Civic Responsibility',
    summary:
      'Programs that treat students as participants in public life — understanding institutions well enough to engage them, and telling informed advocacy from performance.',
    examples: [
      'Policy awareness sessions',
      'Student petitions and campaigns',
      'Governance education',
      'Community problem-solving initiatives',
      'Youth participation in public issues',
    ],
    image: '/activities/environmental-ethics-forum/assembly.jpg',
    imageAlt:
      "IES students with Minister Sunghwan Kim beneath the Environmental Ethics Forum banner at the Nowon-gu Council chamber.",
  },
  {
    id: 'global-collaboration',
    title: 'Global Collaboration',
    summary:
      'The work only an international network can do. Cross-branch programming puts students from three countries in the same conversation, where local assumptions get tested.',
    examples: [
      'Cross-branch events and joint sessions',
      'International panels and forums',
      'Shared campaigns across branches',
      'Guest speakers reaching the whole network',
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
    body: 'Moderated public discussions where students take positions on contested questions and defend them.',
    href: '/our-work#education-and-ethics',
  },
  {
    title: 'Community Service Initiatives',
    body: 'Sustained partnerships with children’s centers and community organizations across the network.',
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
    title: 'Youth-led but professionally structured',
    body: 'Every role is held by a student. Every role also comes with defined responsibilities, reporting expectations, and standards that hold across borders.',
  },
  {
    title: 'International but locally grounded',
    body: 'Branches run their own programming in their own national context. What they share is a mission, an identity, and a set of standards — not a template.',
  },
  {
    title: 'Focused on both ideas and action',
    body: 'Ethical inquiry that stops at discussion is incomplete, and service without reflection is thin. IES insists on both.',
  },
  {
    title: 'Built around ethical leadership, not prestige',
    body: 'Positions in IES exist because work needs doing. We do not create titles to decorate applications.',
  },
  {
    title: 'Open to collaboration',
    body: 'We work with schools, universities, nonprofits, community centers, and public institutions rather than operating in isolation.',
  },
]
