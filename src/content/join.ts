import type { FaqItem, JoinPathway, ProcessStep } from './types'

export const joinIntro =
  'Each pathway asks for a different level of commitment. Pick the one that matches what you want to take on — all of them lead to real responsibility, not a membership list.'

export const joinPathways: JoinPathway[] = [
  {
    id: 'member',
    title: 'Join as a Member',
    audience: 'Students',
    description:
      'For students who want access to events and programs without taking on a leadership role yet.',
    points: [
      'Attend forums, workshops, and discussions',
      'Participate in service initiatives',
      'Receive announcements from your national branch',
      'Move into chapter or branch roles when you are ready',
    ],
    cta: { label: 'Apply', href: '/contact?topic=membership' },
  },
  {
    id: 'chapter',
    title: 'Join a School Chapter',
    audience: 'Students at schools with an IES chapter',
    description:
      'For students whose school already has a chapter. Chapters run their own programming — the most direct way to be involved week to week.',
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
      'For students bringing IES to their school. The most demanding pathway, and the one with the most ownership.',
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
      'For students who want national leadership — running programs across schools, not within one.',
    points: [
      'National officer and director roles',
      'Programming, outreach, and partnerships',
      'Support for chapter leadership teams',
      'Cross-branch collaboration',
    ],
    cta: { label: 'Ask about roles', href: '/contact?topic=branch' },
  },
  {
    id: 'collaborate',
    title: 'Volunteer or Collaborate',
    audience: 'Adults, educators, organizations, professionals',
    description:
      'For educators, organizations, and professionals: speak, advise a chapter, or partner with us.',
    points: [
      'Speak at forums and workshops',
      'Advise a school chapter',
      'Host or co-run a service initiative',
      'Establish an institutional partnership',
    ],
    cta: { label: 'Partner with us', href: '/partners' },
  },
]

export const chapterSteps: ProcessStep[] = [
  {
    title: 'Submit an interest form',
    body: 'Who you are, your school, and why you want a chapter there. This is a first conversation, not a test.',
  },
  {
    title: 'Meet your national branch',
    body: 'What IES actually asks of a chapter, and whether the timing works for your school year.',
  },
  {
    title: 'Build a founding team',
    body: 'A chapter needs more than one committed person. Roles are defined before approval goes ahead.',
  },
  {
    title: 'Get the guidelines',
    body: 'The standards your chapter runs under, plus the branding and programming resources the network shares.',
  },
  {
    title: 'Submit an annual plan',
    body: 'A realistic plan for your first year: what you will run, roughly when, and who is responsible for each part.',
  },
  {
    title: 'Complete approval',
    body: 'The branch reviews your team and your plan, then confirms the chapter.',
  },
  {
    title: 'Launch',
    body: 'You start programming, with branch support through the first year.',
  },
]

export const chapterExpectations = [
  {
    title: 'Uphold IES values',
    body: 'Equity, integrity, and respect are not decorative. They govern how your chapter treats participants and communities.',
  },
  {
    title: 'Maintain active leadership',
    body: 'Officers who actually do the work, and a handover plan before they graduate.',
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
    body: 'Use the IES identity as issued, and keep to the network’s conduct standards.',
  },
  {
    title: 'Protect participant safety',
    body: 'Follow the participant safety policy, especially with younger children.',
  },
  {
    title: 'Avoid misrepresenting IES',
    body: 'Never claim affiliations, statuses, or approvals IES does not have.',
  },
]

export const chapterFaqs: FaqItem[] = [
  {
    question: 'How long does approval take?',
    answer:
      'Mostly on you: how fast you assemble a founding team and a workable plan. The branch review itself is short.',
  },
  {
    question: 'Does my school need to formally recognise the chapter?',
    answer:
      'It varies by country and school. Your branch will tell you what is needed, including whether you need a faculty advisor.',
  },
  {
    question: 'What if there is no IES branch in my country yet?',
    answer:
      'Contact the Global Foundation directly. New branches open when there is qualified leadership, a realistic plan, and institutional support — not before.',
  },
  {
    question: 'Is there a cost to start a chapter?',
    answer:
      'Ask your national branch. Any costs and expectations are stated in writing before a chapter is approved.',
  },
]
