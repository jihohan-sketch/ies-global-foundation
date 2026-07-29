import type { ImpactStory, Stat, TimelineEntry } from './types'

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
  { value: 23, suffix: '+', label: 'Chapters', note: 'Student-led chapters operating under IES standards' },
  { value: 3, label: 'National branches', note: 'Korea, United States, United Kingdom' },
  { value: 736000, suffix: '+', label: 'People reached', note: 'Cumulative reach across programs and campaigns' },
  { value: 3, label: 'Countries', note: 'Where IES maintains a national branch' },
]

export const impactIntro =
  'IES measures itself by whether students take on real responsibility and whether communities are better served because of it. The figures below describe the scale of the network; the stories that follow describe what that scale is actually for.'

export const impactStories: ImpactStory[] = [
  {
    id: 'childrens-center',
    title: 'Children’s Center Educational Sessions',
    branch: 'IES Korea',
    summary:
      'A sustained mentorship and education partnership with a local children’s center, run by student volunteers on a recurring schedule rather than as a one-off visit.',
    detail:
      'Student volunteers plan and deliver sessions at a local children’s center, working from what the center identifies as useful rather than from what is convenient to organise. The program is deliberately recurring: the same students return, which is what makes mentorship possible at all. It has become the model IES uses when establishing service partnerships in other branches.',
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
      'Moderated forums bringing students from multiple schools — and increasingly multiple countries — into structured argument about contested questions.',
    detail:
      'Forums are prepared, moderated, and led by students. Participants are expected to arrive having done the reading and to defend a position under questioning. The cross-branch format matters: an argument that goes unchallenged in one national context rarely survives contact with students working from a different one.',
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
      'Growth from a single student initiative in Korea to chapters across dozens of schools, each operating under shared guidelines and conduct standards.',
    detail:
      'Chapter growth is governed rather than opportunistic. A chapter is approved once it has a founding team, an annual plan, and leadership willing to be accountable for it. Chapters submit periodic updates to their national branch, which is what allows the network to grow without the identity of IES thinning out.',
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
      'Working relationships with schools, community organizations, and educational institutions that give student programming an institutional footing.',
    detail:
      'Partnerships give IES programming reach and credibility that a student organization cannot generate alone, and give partner organizations a reliable volunteer and programming base. Each partnership is held to the same conduct and participant safety standards as internal programming.',
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
    body: 'The Interscholastic Ethics Society begins as a student-led initiative in Seoul, founded by Jaesuh Joshua Shin and Joseph Hahmmin Kang and led by them jointly as co-presidents.',
    milestone: true,
  },
  {
    date: '2023 – 2025',
    title: 'Chapter network and programming take shape',
    body: 'Ethics forums on medical, environmental, military, AI, and human rights questions become recurring, alongside sustained service partnerships with Nanoom Korea and Jiguchon Children’s Center and a series of grassroots fundraising campaigns.',
  },
  {
    date: 'Date to be confirmed',
    title: 'Petition to the National Assembly',
    body: 'IES submits a petition to the National Assembly of Korea on the regulation of generative AI for children under 12 — the organization’s clearest move from discussion into formal civic process.',
    milestone: true,
  },
  {
    date: 'August 2025',
    title: 'Jaesuh Joshua Shin becomes 1st President',
    body: 'The co-presidency concludes and the organization moves to a single-president structure, with Shin serving as 1st President.',
  },
  {
    date: 'October 2025',
    title: 'Joseph Hahmmin Kang becomes 2nd President',
    body: 'Kang takes over as 2nd President, continuing the development of the chapter network and the organization’s external partnerships.',
  },
  {
    date: 'January 2026',
    title: 'Ryan Jimyung Cha becomes 3rd President',
    body: 'Cha assumes the presidency, leading IES Korea as the branch carrying the largest share of the organization’s programming and operations.',
    milestone: true,
  },
  {
    date: 'Date to be confirmed',
    title: 'Growth beyond Korea',
    body: 'Students outside Korea begin participating, prompting work on a structure that could support activity in more than one country.',
  },
  {
    date: 'Date to be confirmed',
    title: 'IES United States established',
    body: 'A national branch is established in the United States under co-presidential leadership.',
    milestone: true,
  },
  {
    date: 'Date to be confirmed',
    title: 'IES UK Society established',
    body: 'A national branch is established in the United Kingdom, beginning with founding leadership and first chapters.',
    milestone: true,
  },
  {
    date: 'Date to be confirmed',
    title: 'IES Global Foundation established',
    body: 'The Global Foundation is formed to connect the national branches under one international identity, shared standards, and coordinated programming.',
    milestone: true,
  },
]
