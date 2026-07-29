import type { Pillar, WorkCategory } from './types'

/** The three organizational pillars. */
export const pillars: Pillar[] = [
  {
    id: 'education',
    title: 'Education',
    summary:
      'Creating opportunities for students to explore ethics, leadership, public policy, debate, philosophy, technology, and global affairs.',
    body: 'Most students are given plenty of opportunities to perform academically and very few to think seriously about difficult questions without a grade attached. IES builds settings where that thinking is the point — structured discussions, forums, and workshops in which students engage real ethical and political problems and are expected to defend their reasoning.',
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
    body: 'Ethical reflection that never leaves the seminar room is incomplete. This pillar covers the work IES does with and for communities — mentorship, service partnerships, and inclusion initiatives — alongside attention to the well-being of the students inside the organization itself.',
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
    body: 'Students are citizens before they are voters. This pillar develops the habits that make civic participation substantive rather than symbolic: understanding how institutions actually work, engaging them constructively, and taking responsibility for decisions and their consequences.',
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
      'Structured settings where students engage difficult questions directly — in discussion, in argument, and in writing. Sessions are student-led and moderated, with preparation expected from participants rather than passive attendance.',
    examples: [
      'Ethics discussions on contested contemporary issues',
      'Public forums open to students across schools',
      'Debate and philosophy sessions',
      'Workshops on argument, evidence, and reasoning',
      'Student-led research projects',
      'Responsible technology and AI education',
    ],
  },
  {
    id: 'community-service',
    title: 'Community Service',
    summary:
      'Sustained relationships with community organizations rather than one-off volunteering. Programs are designed around what partner organizations actually need, and are measured by whether students show up consistently over time.',
    examples: [
      'Children’s center educational programs',
      'Mentorship for younger students',
      'Volunteer initiatives with local organizations',
      'Scholarship-related service work',
      'Community outreach and support drives',
    ],
  },
  {
    id: 'leadership-development',
    title: 'Leadership Development',
    summary:
      'Real responsibility with real consequences. Students who take on IES roles run programs, manage teams, represent the organization to partners, and answer for the results — the closest thing to institutional experience available at this stage.',
    examples: [
      'Executive and national branch leadership roles',
      'Chapter leadership and officer positions',
      'Public speaking and moderation practice',
      'Project and event management',
      'International collaboration across branches',
    ],
  },
  {
    id: 'civic-responsibility',
    title: 'Civic Responsibility',
    summary:
      'Programs that treat students as participants in public life. The emphasis is on understanding institutions well enough to engage them constructively, and on distinguishing informed advocacy from performance.',
    examples: [
      'Policy awareness sessions',
      'Student petitions and campaigns',
      'Governance education',
      'Community problem-solving initiatives',
      'Youth participation in public issues',
    ],
  },
  {
    id: 'global-collaboration',
    title: 'Global Collaboration',
    summary:
      'The work that only an international network can do. Cross-branch programming puts students from Korea, the United States, and the United Kingdom in the same conversation, where local assumptions get tested against other contexts.',
    examples: [
      'Cross-branch events and joint sessions',
      'International panels and forums',
      'Shared campaigns across branches',
      'Guest speakers reaching the whole network',
      'Cultural and educational exchange',
    ],
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
