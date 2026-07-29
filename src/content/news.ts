import type { NewsArticle } from './types'

/**
 * ⚠ SAMPLE CONTENT — REPLACE BEFORE PUBLISHING
 *
 * The articles below are structural placeholders that demonstrate the news
 * template (categories, summaries, body blocks, featured flag). They describe
 * plausible organizational activity but are NOT records of real events and must
 * not be published as such. Delete or rewrite every entry with verified
 * reporting before the site goes live. See REVIEW.md.
 *
 * To add an article: append an object below. Newest first is not required —
 * the site sorts by `date`.
 */

export const articles: NewsArticle[] = [
  {
    slug: 'ies-global-foundation-established',
    title: 'IES Global Foundation Established to Connect National Branches',
    date: '2026-06-18',
    category: 'Organizational Update',
    branch: 'Global Foundation',
    featured: true,
    summary:
      'The Foundation formalises the relationship between IES Korea, IES United States, and IES UK Society under one international identity and a shared set of standards.',
    body: [
      {
        type: 'paragraph',
        text: 'IES has established the IES Global Foundation to coordinate its national branches under a single international identity. The Foundation does not replace the branches. It connects them — providing international direction, shared branding, branch coordination, cross-border programming, and partnership development, while national branches continue to manage their own local initiatives.',
      },
      {
        type: 'paragraph',
        text: 'The change formalises a structure that had been developing in practice since students outside Korea began participating in IES programming. As activity spread across countries, the organization needed a way to keep its identity and standards consistent without imposing a single national model on every branch.',
      },
      { type: 'heading', text: 'What the Foundation is responsible for' },
      {
        type: 'list',
        items: [
          'International coordination between national branches',
          'Cross-border initiatives and joint programming',
          'Global partnerships with institutions operating in more than one country',
          'Branding, standards, and organizational identity',
          'Branch development and responsible future expansion',
        ],
      },
      {
        type: 'paragraph',
        text: 'IES Korea remains the organization’s original branch and primary operational headquarters, carrying the largest share of programming and chapters. IES United States and IES UK Society extend the mission into their own national contexts.',
      },
      {
        type: 'quote',
        text: 'The Foundation exists so that a chapter in one country and a chapter in another are recognisably part of the same organization — without either being asked to pretend it operates in the same conditions.',
      },
    ],
  },
  {
    slug: 'ies-united-kingdom-launch',
    title: 'IES UK Society Begins Operations',
    date: '2026-05-07',
    category: 'Announcement',
    branch: 'IES UK Society',
    featured: true,
    summary:
      'The network’s newest national branch begins with founding leadership, first chapter recruitment, and outreach to U.K. schools.',
    body: [
      {
        type: 'paragraph',
        text: 'IES UK Society has begun operations as the third national branch in the IES network, led by President Jimin Lee. The branch’s first phase is foundational: recruiting a national leadership team, establishing founding school chapters, and building relationships with schools interested in structured programming around ethics, service, and civic engagement.',
      },
      {
        type: 'paragraph',
        text: 'The branch is being built deliberately rather than quickly. Rather than announcing a large number of chapters at launch, the U.K. team is prioritising a small founding cohort with committed leadership that can sustain programming through a full academic year.',
      },
      { type: 'heading', text: 'Current priorities' },
      {
        type: 'list',
        items: [
          'Completing the national leadership team',
          'Establishing founding school chapters',
          'Introductory ethics discussion series',
          'Participation in cross-branch international panels',
        ],
      },
      {
        type: 'paragraph',
        text: 'Students and schools in the United Kingdom interested in participating can contact the branch directly.',
      },
    ],
  },
  {
    slug: 'ies-united-states-co-presidents',
    title: 'IES United States Confirms Co-Presidential Leadership',
    date: '2026-04-22',
    category: 'Leadership',
    branch: 'IES United States',
    summary:
      'Aden Lee and Onew Choi share national leadership of the U.S. branch, with responsibility split across strategy, chapter development, and programming.',
    body: [
      {
        type: 'paragraph',
        text: 'IES United States has confirmed Aden Lee and Onew Choi as co-presidents of the national branch. The two share responsibility for national strategy, chapter formation, programming, and coordination with the IES Global Foundation.',
      },
      {
        type: 'paragraph',
        text: 'The co-presidential structure reflects the branch’s current stage. Establishing a national branch involves two distinct workloads — building outward toward schools and communities, and building inward toward the students who will run chapters — and the branch concluded that both deserve dedicated leadership attention.',
      },
      {
        type: 'paragraph',
        text: 'The branch’s growth strategy prioritises regional clusters of strong chapters over scattered single chapters, with a leadership pipeline that moves chapter officers into national roles.',
      },
    ],
  },
  {
    slug: 'cross-branch-ethics-forum',
    title: 'Cross-Branch Ethics Forum Brings Three Countries Into One Discussion',
    date: '2026-03-14',
    category: 'Event',
    branch: 'Cross-branch',
    featured: true,
    summary:
      'Students from Korea, the United States, and the United Kingdom prepared positions on a shared question and defended them under cross-examination.',
    body: [
      {
        type: 'paragraph',
        text: 'IES held a cross-branch ethics forum bringing together students from all three national branches. Participants prepared positions in advance, presented them, and took questions from students working in different national contexts.',
      },
      {
        type: 'paragraph',
        text: 'The format is the point. Arguments that pass without challenge inside one school — or one country — are frequently the ones least examined. Putting students from three educational systems into the same discussion exposes assumptions that would otherwise go unnoticed.',
      },
      { type: 'heading', text: 'Format' },
      {
        type: 'list',
        items: [
          'Prepared positions submitted in advance',
          'Student moderation throughout',
          'Structured cross-examination between branches',
          'Written reflections circulated to participating chapters',
        ],
      },
      {
        type: 'quote',
        text: 'Cross-border programming is the one thing a national organization cannot replicate. It is the clearest argument for why the Foundation exists.',
      },
    ],
  },
  {
    slug: 'childrens-center-partnership',
    title: 'Children’s Center Program Enters Its Next Term',
    date: '2026-02-02',
    category: 'Community Service',
    branch: 'IES Korea',
    summary:
      'IES Korea’s longest-running service partnership continues, with student volunteers returning on a recurring schedule to run educational sessions and mentorship.',
    body: [
      {
        type: 'paragraph',
        text: 'IES Korea’s children’s center program has entered another term. Student volunteers plan and deliver recurring educational sessions and mentorship, working from priorities the center identifies rather than from what is easiest to organise.',
      },
      {
        type: 'paragraph',
        text: 'The recurring structure is what distinguishes the program from conventional student volunteering. Mentorship depends on the same volunteers returning; a single visit, however well intentioned, cannot provide it.',
      },
      {
        type: 'paragraph',
        text: 'The program has become the reference model IES uses when other branches establish service partnerships in their own countries.',
      },
    ],
  },
  {
    slug: 'chapter-guidelines-update',
    title: 'Updated Chapter Guidelines Issued Across the Network',
    date: '2026-01-15',
    category: 'Program',
    branch: 'Global Foundation',
    summary:
      'Revised guidelines clarify chapter approval, annual planning, reporting expectations, and participant safety standards for all branches.',
    body: [
      {
        type: 'paragraph',
        text: 'The IES Global Foundation has issued updated chapter guidelines to all national branches. The revision clarifies how chapters are approved, what an annual plan must contain, how often chapters report to their national branch, and the conduct and participant safety standards that apply to all IES activity.',
      },
      { type: 'heading', text: 'What chapters are expected to maintain' },
      {
        type: 'list',
        items: [
          'Active student leadership with defined roles',
          'An annual plan submitted to the national branch',
          'Meaningful programming rather than nominal activity',
          'Periodic updates on activity and membership',
          'Adherence to branding, conduct, and participant safety standards',
        ],
      },
      {
        type: 'paragraph',
        text: 'The guidelines apply identically across Korea, the United States, and the United Kingdom. National branches remain responsible for approving and supporting chapters within their own country.',
      },
    ],
  },
]

export const sortedArticles = [...articles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
)

export const featuredArticles = sortedArticles.filter((a) => a.featured)

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug)

export const newsCategories = Array.from(new Set(articles.map((a) => a.category))).sort()
