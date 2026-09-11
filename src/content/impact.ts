import type { ActivityPhoto, ImpactStory, Stat, TimelineEntry } from './types'

/**
 * ⚠ REVIEW BEFORE PUBLISHING — every number below must be supportable from
 * internal records. These are the figures supplied in the project brief.
 * Update `reportingPeriod` whenever the figures are refreshed.
 */

export const reportingPeriod = 'Latest organizational reporting period'

/** Headline figures shown on the home page. */
export const headlineStats: Stat[] = [
  { value: 1200, suffix: '+', label: 'Members' },
  { value: 42, suffix: '+', label: 'Schools represented' },
  { value: 23, suffix: '+', label: 'Chapters' },
  { value: 736000, suffix: '+', label: 'People reached' },
  { value: 3, label: 'National branches' },
]

/** Fuller breakdown shown on the Impact page. */
export const impactStats: Stat[] = [
  { value: 1200, suffix: '+', label: 'Members', note: 'Students participating across all branches' },
  { value: 42, suffix: '+', label: 'Schools represented', note: 'Institutions with participating students' },
  { value: 23, suffix: '+', label: 'Chapters', note: 'Student-led chapters under IES standards' },
  { value: 3, label: 'National branches', note: 'Korea, United States, United Kingdom' },
  { value: 736000, suffix: '+', label: 'People reached', note: 'Across programs and campaigns' },
]

export const impactIntro =
  'The figures show the scale of the network; the stories show what it is for.'

export const impactStories: ImpactStory[] = [
  {
    id: 'childrens-center',
    title: 'Children’s Center Educational Sessions',
    branch: 'IES Korea',
    summary:
      'A recurring mentorship and education partnership with a local children’s center — not a one-off visit.',
    detail:
      'Volunteers plan sessions around what the center says it needs, and the same students return each time — which is what makes mentorship possible. It is now the model IES uses for service partnerships elsewhere.',
    metrics: [
      { value: 'Recurring', label: 'Session cadence' },
      { value: 'Korea', label: 'Branch' },
    ],
  },
  {
    id: 'ethics-forums',
    title: 'International Youth Ethics Forums',
    branch: 'Cross-branch',
    summary:
      'Moderated forums putting students from several schools — and now several countries — into structured argument.',
    detail:
      'Prepared, moderated, and led by students: you arrive having done the reading and defend a position under questioning. An argument that goes unchallenged in one country rarely survives students from another.',
    metrics: [
      { value: '3', label: 'Branches participating' },
      { value: 'Student-led', label: 'Format' },
    ],
  },
  {
    id: 'chapter-growth',
    title: 'School Chapter Network Growth',
    branch: 'Network-wide',
    summary:
      'From one student initiative in Korea to chapters across dozens of schools, all under shared guidelines.',
    detail:
      'Growth is governed, not opportunistic. A chapter is approved once it has a founding team, an annual plan, and leaders willing to answer for it.',
    metrics: [
      { value: '23+', label: 'Chapters' },
      { value: '42+', label: 'Schools represented' },
    ],
  },
  {
    id: 'partnerships',
    title: 'Educational and Community Partnerships',
    branch: 'Network-wide',
    summary:
      'Relationships with schools, community organizations, and institutions that give student programming real footing.',
    detail:
      'Partnerships give IES reach a student organization cannot generate alone, and give partners a reliable volunteer base — to the same conduct and safety standards as our own programming.',
  },
]

/**
 * ⚠ REVIEW BEFORE PUBLISHING — only the April 2023 founding date is confirmed
 * in the brief. All other entries are sequenced but undated placeholders and
 * must be given verified dates, or removed, before launch.
 */
export const timeline: TimelineEntry[] = [
  {
    date: '20 April 2023',
    title: 'IES is founded in Seoul',
    body: 'Founded by Jaesuh Joshua Shin and Joseph Hahmmin Kang, who lead it jointly as co-presidents.',
    milestone: true,
  },
  {
    date: '2023 – 2025',
    title: 'Chapter network and programming take shape',
    body: 'Ethics forums on medical, environmental, military, AI, and human rights questions become recurring, alongside service partnerships with Nanoom Korea and Jiguchon Children’s Center.',
  },
  {
    /* Dated from the petition record itself, which is reproduced on Our Work:
       the consent window ran 6 November to 6 December 2025. */
    date: 'November – December 2025',
    title: 'Petition to the National Assembly',
    body: 'IES petitions the National Assembly of Korea on regulating generative AI for children under 12. The consent window closed with 514 signatures — its clearest move from discussion into formal civic process.',
    milestone: true,
  },
  {
    date: 'August 2025',
    title: 'Jaesuh Joshua Shin becomes 1st President',
    body: 'The co-presidency ends and IES moves to a single-president structure.',
  },
  {
    date: 'October 2025',
    title: 'Joseph Hahmmin Kang becomes 2nd President',
    body: 'Growing the chapter network and external partnerships.',
  },
  {
    date: 'January 2026',
    title: 'Ryan Jimyung Cha becomes 3rd President',
    body: 'Leading IES Korea — the branch carrying most of the programming and operations.',
    milestone: true,
  },
  {
    date: 'Date to be confirmed',
    title: 'Growth beyond Korea',
    body: 'Students outside Korea start taking part, prompting work on a structure for more than one country.',
  },
  {
    date: 'Date to be confirmed',
    title: 'IES United States established',
    body: 'Established under co-presidential leadership.',
    milestone: true,
  },
  {
    date: 'Date to be confirmed',
    title: 'IES UK Society established',
    body: 'Starting with founding leadership and first chapters.',
    milestone: true,
  },
  {
    date: 'Date to be confirmed',
    title: 'IES Global Foundation established',
    body: 'Formed to connect the branches under one identity, shared standards, and coordinated programming.',
    milestone: true,
  },
]

/**
 * Photographs shown on the Impact page, chosen to show the work in progress
 * rather than the group photograph at the end of it.
 *
 * These reference files already under `public/activities/`, so nothing is
 * shipped twice, and the captions are the same alt text used there — a caption
 * on this page cannot drift from what the photograph is recorded as showing.
 * The full set, event by event, is on Our Work.
 */
export const fieldPhotos: ActivityPhoto[] = [
  {
    src: '/activities/environmental-ethics-forum/podium.jpg',
    alt: 'Two IES students speaking from the twin podiums of the Nowon-gu Council chamber at the Environmental Ethics Forum.',
  },
  {
    src: '/activities/guro-happy-childrens-center/lesson.jpg',
    alt: 'An IES volunteer teaching at a whiteboard while children sit on the floor of the Guro Happy Children’s Center.',
  },
  {
    src: '/activities/nanoom-korea-partnership/loading.jpg',
    alt: 'IES volunteers in Nanoom Korea vests loading crates during an outdoor distribution.',
  },
  /* The petition record itself is deliberately not here: it is a wide document
     screenshot, and this strip crops to 4/3, which makes its text unreadable.
     It appears uncropped as the lead image of its own entry on Our Work. */
  {
    src: '/activities/nanoom-korea-partnership/home-visit.jpg',
    alt: 'IES volunteers seated with residents during a Nanoom Korea home visit.',
  },
  {
    src: '/activities/jiguchon-childrens-center/lesson.jpg',
    alt: 'An IES volunteer leading a lesson at the Jiguchon Children’s Center while children sit at the tables.',
  },
  {
    src: '/activities/camp-humphreys-cadets/discussion.jpg',
    alt: 'IES students in conversation with a US Army officer at Camp Humphreys.',
  },
  {
    src: '/activities/nanoom-korea-scholarship/ceremony.jpg',
    alt: 'An IES student speaking at a lectern during the Nanoom Korea scholarship presentation.',
  },
  {
    src: '/activities/un-human-rights-office-visit/delegation.jpg',
    alt: 'IES students at the UN Office of the High Commissioner for Human Rights in Seoul.',
  },
  {
    src: '/activities/environmental-ethics-forum/chamber.jpg',
    alt: 'IES students at the council desks with printed briefs during the Environmental Ethics Forum.',
  },
]
