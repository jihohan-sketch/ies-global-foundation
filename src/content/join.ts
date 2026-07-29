import type { FaqItem, JoinPathway, ProcessStep } from './types'

export const joinIntro =
  'There is more than one way into IES, and they ask for different levels of commitment. Choose the one that matches what you actually want to take on — every pathway below leads to real responsibility rather than a membership list.'

export const joinPathways: JoinPathway[] = [
  {
    id: 'member',
    title: 'Join as a Member',
    audience: 'Students',
    description:
      'For students who want access to IES events, programs, and opportunities without immediately taking on a leadership role.',
    points: [
      'Attend forums, workshops, and discussions',
      'Participate in service initiatives',
      'Receive announcements from your national branch',
      'Move into chapter or branch roles when you are ready',
    ],
    cta: { label: 'Apply for membership', href: '/contact?topic=membership' },
  },
  {
    id: 'chapter',
    title: 'Join a School Chapter',
    audience: 'Students at schools with an IES chapter',
    description:
      'For students whose school already has an IES chapter. Chapters run their own programming and are the most direct way to be involved week to week.',
    points: [
      'Participate in chapter programming',
      'Take on an officer role',
      'Lead sessions and service projects',
      'Represent your chapter to the national branch',
    ],
    cta: { label: 'Find your chapter', href: '/contact?topic=chapter' },
  },
  {
    id: 'start-chapter',
    title: 'Start a Chapter',
    audience: 'Students without an IES chapter at their school',
    description:
      'For students who want to establish IES at their school. This is the most demanding pathway and the one with the most ownership.',
    points: [
      'Build a founding chapter team',
      'Receive chapter guidelines and branding resources',
      'Design your school’s first year of programming',
      'Work directly with your national branch',
    ],
    cta: { label: 'See the process', href: '/start-a-chapter' },
  },
  {
    id: 'branch',
    title: 'Join a National Branch',
    audience: 'Students seeking national-level responsibility',
    description:
      'For students interested in national leadership or operations — running programs across schools rather than within one.',
    points: [
      'National officer and director roles',
      'Programming, outreach, and partnerships',
      'Support for chapter leadership teams',
      'Cross-branch collaboration',
    ],
    cta: { label: 'Enquire about branch roles', href: '/contact?topic=branch' },
  },
  {
    id: 'collaborate',
    title: 'Volunteer or Collaborate',
    audience: 'Adults, educators, organizations, professionals',
    description:
      'For educators, organizations, and professionals who want to support IES programming as speakers, advisors, or partners.',
    points: [
      'Speak at forums and workshops',
      'Advise a school chapter',
      'Host or co-run a service initiative',
      'Establish an institutional partnership',
    ],
    cta: { label: 'Partner with IES', href: '/partners' },
  },
]

export const chapterSteps: ProcessStep[] = [
  {
    title: 'Submit an initial interest form',
    body: 'Tell us who you are, which school you attend, and why you want an IES chapter there. This is a first conversation, not an application to be judged.',
  },
  {
    title: 'Meet with the relevant national branch',
    body: 'You meet the branch responsible for your country. The meeting covers what IES actually asks of a chapter and whether the timing works for your school year.',
  },
  {
    title: 'Identify a founding chapter team',
    body: 'A chapter needs more than one committed person. You assemble a founding team with defined roles before approval proceeds.',
  },
  {
    title: 'Receive chapter guidelines and branding resources',
    body: 'You are given the standards your chapter operates under, along with the branding and programming resources shared across the network.',
  },
  {
    title: 'Submit an annual plan',
    body: 'A realistic plan for your first year: what you will run, roughly when, and who is responsible for each part.',
  },
  {
    title: 'Complete approval',
    body: 'The national branch reviews the founding team and annual plan, and confirms the chapter.',
  },
  {
    title: 'Launch the chapter',
    body: 'You begin programming with support from your national branch through the first year.',
  },
]

export const chapterExpectations = [
  {
    title: 'Uphold IES values',
    body: 'Equity, integrity, and respect are not decorative. They govern how your chapter treats participants and communities.',
  },
  {
    title: 'Maintain active leadership',
    body: 'A chapter needs officers who are genuinely doing the work, and a plan for handing over before they graduate.',
  },
  {
    title: 'Conduct meaningful programming',
    body: 'Sessions and projects with substance. A chapter that exists only on paper will be closed.',
  },
  {
    title: 'Submit periodic updates',
    body: 'Regular reporting to your national branch on activity, membership, and any difficulties.',
  },
  {
    title: 'Follow branding and conduct standards',
    body: 'Use IES identity as issued, and hold to the conduct standards that apply across the network.',
  },
  {
    title: 'Protect participant safety',
    body: 'Follow the participant safety policy in all programming, particularly any work involving younger children.',
  },
  {
    title: 'Avoid misrepresenting IES',
    body: 'Do not claim affiliations, statuses, or approvals the organization does not have.',
  },
]

export const chapterFaqs: FaqItem[] = [
  {
    question: 'How long does approval take?',
    answer:
      'It depends primarily on how quickly you can assemble a founding team and produce a workable annual plan. The national branch review itself is short; the preparation is the substantive part.',
  },
  {
    question: 'Does my school need to formally recognise the chapter?',
    answer:
      'Requirements differ by country and school. Your national branch will tell you what is needed in your context, including whether a faculty advisor is required.',
  },
  {
    question: 'What if there is no IES branch in my country yet?',
    answer:
      'Contact the Global Foundation directly. New national branches are established when there is qualified leadership, a realistic programming plan, and institutional support — not before.',
  },
  {
    question: 'Is there a cost to start a chapter?',
    answer:
      'Contact your national branch for current requirements. Any costs and expectations are stated in writing before a chapter is approved.',
  },
]
