import type { Activity, BranchSlug } from './types'

/**
 * Documented programme activity, with photography.
 *
 * Unlike `news.ts` — whose entries are still structural placeholders — every
 * entry here corresponds to an event IES Korea has published on its own site,
 * and every photograph was taken at the event it is attached to. Titles and
 * dates follow the branch's own wording so the two sites agree.
 *
 * Newest first. `date` is omitted rather than invented where the branch has not
 * published one; the layout simply leaves it out.
 */
export const activities: Activity[] = [
  {
    id: 'camp-humphreys-cadets',
    title: 'Second Meeting with General Lombardo and Cadets',
    kind: 'Institutional Engagement',
    branch: 'korea',
    date: 'April 2, 2026',
    location: 'Camp Humphreys, Pyeongtaek',
    participants: 'US Army Major General Charles Lombardo and cadets',
    workCategory: 'leadership-development',
    summary:
      'A second working meeting with Major General Charles Lombardo and cadets, continuing the military and leadership ethics partnership begun at the 2025 forum.',
    body: [
      'The first meeting produced a forum. The second was built to test whether the ideas from it survive contact with people who carry the decisions professionally. Students spent the day with Major General Lombardo and a group of cadets, working through questions of command responsibility, obedience, and the limits of orders.',
      'What makes the exchange worth repeating is the asymmetry. Students bring reading and argument; cadets bring the expectation of acting on incomplete information under real consequence. Neither side gets to keep its assumptions unexamined.',
    ],
    photos: [
      {
        src: '/activities/camp-humphreys-cadets/discussion.jpg',
        alt: 'Two IES students in suits speaking with a US Army officer in the lobby of a building at Camp Humphreys.',
      },
      {
        src: '/activities/camp-humphreys-cadets/tour.jpg',
        alt: 'An IES student in conversation with a uniformed US Army officer during the visit.',
      },
      {
        src: '/activities/camp-humphreys-cadets/briefing.jpg',
        alt: 'IES students seated at desks with laptops and papers during a briefing session.',
      },
    ],
  },
  {
    id: 'environmental-ethics-forum',
    title: 'Fourth Ethics Forum — Environmental Ethics',
    kind: 'Ethics Forum',
    branch: 'korea',
    date: 'March 14, 2026',
    location: 'Nowon-gu Council Main Conference Hall, Seoul',
    participants: 'Minister Sunghwan Kim, Climate, Energy and Environment',
    workCategory: 'civic-responsibility',
    summary:
      'The fourth in the Ethics Forum series, held in a council chamber with Minister Sunghwan Kim, on ethical policy for a sustainable future.',
    body: [
      'The forum ran under the banner “Ethical Policy for a Sustainable Future,” and the venue was part of the argument: students took positions from the seats of a working municipal council chamber rather than a classroom. Environmental questions were treated as policy problems with distributional consequences, not as sentiment.',
      'Minister Sunghwan Kim, whose portfolio covers climate, energy and environment, joined the session. Students had prepared briefs in advance; the expectation, as at every IES forum, was that a position be defended rather than announced.',
    ],
    photos: [
      {
        src: '/activities/environmental-ethics-forum/assembly.jpg',
        alt: 'Ten IES students standing with Minister Sunghwan Kim beneath a banner reading “Environmental Ethics Forum — Ethical Policy for a Sustainable Future”.',
      },
      {
        src: '/activities/environmental-ethics-forum/chamber.jpg',
        alt: 'IES students seated at the desks of a council chamber with printed briefs and microphones in front of them.',
      },
      {
        src: '/activities/environmental-ethics-forum/delegates.jpg',
        alt: 'Two IES students at a council desk, one speaking into a microphone while the other reads from a brief.',
      },
      {
        src: '/activities/environmental-ethics-forum/group.jpg',
        alt: 'The forum participants photographed together in the council chamber at the close of the session.',
      },
    ],
  },
  {
    id: 'cherry-blossom-ball',
    title: 'ROK–US Cherry Blossom Ball',
    kind: 'Institutional Engagement',
    branch: 'korea',
    location: 'Seoul',
    participants: 'At the invitation of Major General Charles Lombardo',
    workCategory: 'leadership-development',
    summary:
      'IES was invited to the annual ROK–US Cherry Blossom Ball, at the request of Major General Charles Lombardo, to recognise selected individuals in the line of service.',
    body: [
      'The invitation came directly from Major General Charles Lombardo. IES students attended the annual ROK–US Cherry Blossom Ball and took part in recognising selected individuals in the line of service — a ceremonial role rather than a speaking one.',
      'It is included here because it is the kind of engagement that is easy to misrepresent. Students were guests and presenters at someone else\'s event; the value was in being trusted with that, not in having organised it.',
    ],
    photos: [
      {
        src: '/activities/cherry-blossom-ball/ceremony.jpg',
        alt: 'Seven IES students holding certificates on stage between two US Army officers, with US, Korean and command flags behind them.',
      },
      {
        src: '/activities/cherry-blossom-ball/delegation.jpg',
        alt: 'The IES delegation in formal dress outside the venue at night, with UN, Korean and US flags flying behind them.',
      },
      {
        src: '/activities/cherry-blossom-ball/reception.jpg',
        alt: 'IES students seated at a banquet table during the reception.',
      },
    ],
  },
  {
    id: 'ymun-korea-community-fair',
    title: 'Yale Model United Nations Korea XIII Community Fair',
    kind: 'Institutional Engagement',
    branch: 'korea',
    date: 'November 29, 2025',
    participants: 'Yale Model United Nations Korea (YMUNK)',
    workCategory: 'global-collaboration',
    summary:
      'IES was registered as a nonprofit partner organisation of YMUN Korea XIII and ran a stand at its annual community fair, introducing the society to over 500 prospective members.',
    body: [
      'Registering as a nonprofit partner of Yale Model United Nations Korea put IES in front of an audience it had no other route to: more than 500 students already interested in international affairs, gathered in one room.',
      'The stand was run by the two co-founders. What it offered was deliberately unglamorous — what the society does, what a chapter is expected to run, and what a member is expected to prepare. Recruitment that oversells the commitment produces members who leave.',
    ],
    photos: [
      {
        src: '/activities/ymun-korea-community-fair/fair.jpg',
        alt: 'An IES student presenting the society\'s display boards at the community fair stand.',
      },
      {
        src: '/activities/ymun-korea-community-fair/founders.jpg',
        alt: 'The two IES co-founders behind the society\'s stand, with display boards and pin badges laid out on the table.',
      },
    ],
  },
  {
    id: 'national-assembly-petition',
    title: 'National Assembly Petition',
    kind: 'Civic Advocacy',
    branch: 'korea',
    date: 'November 7 – December 6, 2025',
    location: 'National Assembly of the Republic of Korea',
    workCategory: 'civic-responsibility',
    summary:
      'A formal petition to the National Assembly on the regulation of generative AI use by children under twelve, open for consent for thirty days.',
    body: [
      'The petition was filed through the National Assembly\'s own consent system under the field of science, technology, information and communication, and asked for regulation of generative AI use by children under the age of twelve. The consent window ran from 6 November to 6 December 2025 and closed with 514 signatures.',
      'It did not become law, and the site does not claim otherwise. What it demonstrates is procedural: students identified an under-regulated question, used the mechanism a citizen actually has, and put their names to a public record. That is the difference the civic programme is trying to teach between advocacy and performance.',
    ],
    photos: [
      {
        src: '/activities/national-assembly-petition/petition.jpg',
        alt: 'The National Assembly petition record, showing the title “Petition regarding regulation of the use of generative AI by children under 12 years of age”, a consent period of 2025-11-06 to 2025-12-06, and 514 individuals.',
      },
      {
        src: '/activities/national-assembly-petition/assembly.jpg',
        alt: 'The briefing room podium of the National Assembly of the Republic of Korea, flanked by the national flag and the Assembly standard.',
      },
    ],
  },
  {
    id: 'military-ethics-forum',
    title: 'Third Ethics Forum — Military and Leadership Ethics',
    kind: 'Ethics Forum',
    branch: 'korea',
    date: 'September 26, 2025',
    participants: 'US Army Major General Charles Lombardo',
    workCategory: 'leadership-development',
    summary:
      'The third Ethics Forum, on leadership and governance ethics, with US Army Major General Charles Lombardo.',
    body: [
      'Leadership ethics is the easiest subject in the programme to discuss badly, because the vocabulary is available to anyone and the stakes are abstract until they are not. Holding the session with a serving general removed that comfort.',
      'The discussion covered command responsibility, the duty to refuse, and what accountability means when a decision cannot be undone. It also began a working relationship: the same partnership produced a second meeting with cadets at Camp Humphreys in April 2026.',
    ],
    photos: [
      {
        src: '/activities/military-ethics-forum/delegation.jpg',
        alt: 'Three IES students standing with Major General Charles Lombardo after the forum.',
      },
      {
        src: '/activities/military-ethics-forum/meeting.jpg',
        alt: 'IES students seated around a meeting table with laptops during the leadership ethics session.',
      },
    ],
  },
  {
    id: 'guro-happy-childrens-center',
    title: 'Guro Happy Children’s Center',
    kind: 'Community Service',
    branch: 'korea',
    date: 'Partnership established September 2025 — ongoing',
    location: 'Guro-gu, Seoul',
    workCategory: 'community-service',
    summary:
      'A standing volunteer partnership with a children’s centre serving multicultural families in Guro-gu, running lessons and activity sessions.',
    body: [
      'Multicultural families in Korea routinely meet obstacles that other families do not: language barriers, unfamiliar administrative systems, and limited access to resources that are nominally universal. The Guro Happy Children\'s Center works with children from those families, and IES volunteers run sessions there on a standing schedule.',
      'Volunteers teach rather than supervise. Sessions are prepared in advance and led by students, which is also the point at which the well-being pillar stops being a slogan: a volunteer who has not prepared wastes a child\'s afternoon.',
    ],
    photos: [
      {
        src: '/activities/guro-happy-childrens-center/lesson.jpg',
        alt: 'An IES volunteer teaching at a whiteboard while around ten children sit on the floor of the centre watching.',
      },
      {
        src: '/activities/guro-happy-childrens-center/group.jpg',
        alt: 'IES volunteers running a group activity with children in the centre\'s main room.',
      },
      {
        src: '/activities/guro-happy-childrens-center/classroom.jpg',
        alt: 'An IES volunteer talking with a group of children beside the centre\'s bookshelves.',
      },
    ],
  },
  {
    id: 'nanoom-korea-scholarship',
    title: 'Nanoom Korea Education Scholarship Initiative',
    kind: 'Scholarship',
    branch: 'korea',
    date: 'August 13–14, 2025',
    location: 'Saint Paul Preparatory Seoul',
    participants: 'Nanoom Korea',
    workCategory: 'community-service',
    summary:
      'IES fully funded a ₩1,000,000 scholarship for the education of disadvantaged students, presented jointly with Nanoom Korea.',
    body: [
      'Months of fundraising produced ₩1,000,000, which IES committed in full to a scholarship administered with Nanoom Korea. The funds were directed to students of clear academic promise facing financial barriers — a small sum against the problem, and a real one against a specific student\'s year.',
      'The handover was run as an event rather than a transfer, with a presentation to the assembled school. Students who raised the money explained where it came from and where it was going, which is the part of fundraising most easily skipped.',
    ],
    photos: [
      {
        src: '/activities/nanoom-korea-scholarship/presentation.jpg',
        alt: 'IES students and a Nanoom Korea representative holding a banner reading “IES x 나눔코리아 글로벌 인재육성 장학금 전달식”, dated 2025.08.14.',
      },
      {
        src: '/activities/nanoom-korea-scholarship/assembly.jpg',
        alt: 'A speaker addressing seated students in a school gymnasium during the scholarship event.',
      },
      {
        src: '/activities/nanoom-korea-scholarship/ceremony.jpg',
        alt: 'An IES student speaking at a lectern in front of a screen showing the scholarship presentation title.',
      },
      {
        src: '/activities/nanoom-korea-scholarship/recipients.jpg',
        alt: 'A presenter addressing the audience during the scholarship handover.',
      },
    ],
  },
  {
    id: 'ai-technology-ethics-forum',
    title: 'Second Ethics Forum — AI and Technology Ethics',
    kind: 'Ethics Forum',
    branch: 'korea',
    date: 'August 9–10, 2025',
    participants: 'ROKAF General Kim Tae-wook',
    workCategory: 'education-and-ethics',
    summary:
      'The second Ethics Forum, on military and AI ethics, with a retired Republic of Korea Air Force general as guest speaker.',
    body: [
      'The second forum took the question that most student discussion of AI avoids: what happens when an automated system is placed inside a chain of command. The guest speaker, a Republic of Korea Air Force general with a forty-year career, could answer from the operational side rather than the theoretical one.',
      'Sessions ran over two days, with the lecture followed by open discussion. The subject has since become a recurring thread in IES programming, including the National Assembly petition on generative AI and children.',
    ],
    photos: [
      {
        src: '/activities/ai-technology-ethics-forum/lecture.jpg',
        alt: 'The guest speaker addressing seated students, with a slide behind him introducing his forty-year Air Force career.',
      },
      {
        src: '/activities/ai-technology-ethics-forum/briefing.jpg',
        alt: 'Students seated in the hall watching the speaker\'s introductory slide.',
      },
      {
        src: '/activities/ai-technology-ethics-forum/audience.jpg',
        alt: 'A view from the back of the hall over the audience towards the lit stage and screen.',
      },
    ],
  },
  {
    id: 'un-human-rights-office-visit',
    title: 'UN Human Rights Office Visit',
    kind: 'Institutional Engagement',
    branch: 'korea',
    date: 'June 25–26, 2025',
    location: 'UN Office of the High Commissioner for Human Rights, Seoul',
    participants: 'Invitation arranged by Peace Makers Korea',
    workCategory: 'global-collaboration',
    summary:
      'IES was invited to the UN Human Rights Office of the High Commissioner in Seoul over two days, an opportunity arranged by then-partner Peace Makers Korea.',
    body: [
      'The invitation to the OHCHR office in Seoul came through Peace Makers Korea, a partner at the time. Over two days students met staff and were briefed on how the office\'s human rights mandate is actually exercised — reporting, monitoring, and the slow work between a violation and a response.',
      'For an organisation whose Three A\'s include advancing equity, the visit was a useful correction to scale. Human rights work at institutional level is procedural and unglamorous, and students left with a clearer sense of where a student society can and cannot be useful.',
    ],
    photos: [
      {
        src: '/activities/un-human-rights-office-visit/delegation.jpg',
        alt: 'Four IES students in formal dress in front of a UN-branded backdrop at the OHCHR office in Seoul.',
      },
      {
        src: '/activities/un-human-rights-office-visit/briefing.jpg',
        alt: 'Three IES students standing with an OHCHR staff member in front of the UN backdrop.',
      },
      {
        src: '/activities/un-human-rights-office-visit/office.jpg',
        alt: 'The IES group photographed with OHCHR staff during the two-day visit.',
      },
    ],
  },
  {
    id: 'bioethics-forum',
    title: 'First Ethics Forum — Bioethics',
    kind: 'Ethics Forum',
    branch: 'korea',
    date: 'March 27, 2025',
    participants: 'Dr. Hyunju Lee, M.D.',
    workCategory: 'education-and-ethics',
    summary:
      'The first Ethics Forum, on medical and biomedical ethics, with a practising physician as guest speaker.',
    body: [
      'The forum that started the series was held online, with Dr. Hyunju Lee — an endocrinologist with more than twenty years in practice — as guest speaker. The subject was medical and biomedical ethics: consent, allocation, and the decisions clinicians make when no option is clean.',
      'Two things about it set the pattern for everything after. The guest was a working professional rather than an academic speaker, and students were expected to have read enough to ask something specific. As the host put it at the time, the point was to bring students who are interested in ethical questions together with professionals who have to answer them.',
    ],
    photos: [
      {
        src: '/activities/bioethics-forum/session.jpg',
        alt: 'A grid of participants in the online bioethics forum session, with the guest speaker in the top-left tile.',
      },
    ],
  },
  {
    id: 'jiguchon-childrens-center',
    title: 'Jiguchon Children’s Center',
    kind: 'Community Service',
    branch: 'korea',
    date: 'Partnership established January 11, 2025 — visits every two weeks',
    location: 'Seoul',
    workCategory: 'community-service',
    summary:
      'A fortnightly volunteer programme at a children’s centre for multicultural families, teaching Korean policy and the ethical principles behind it.',
    body: [
      'The Jiguchon partnership is the oldest of the service commitments and the one that best explains what IES means by sustained rather than occasional volunteering: visits are scheduled once every two weeks, and have been since January 2025.',
      'The core of the programme is teaching children about Korean policy and the ethical values behind it — their rights, the principles of fairness and equality, and how ethical reasoning shapes laws and social norms. For children in multicultural families, who meet those systems on worse terms than their classmates, that knowledge is practical rather than abstract.',
    ],
    photos: [
      {
        src: '/activities/jiguchon-childrens-center/children.jpg',
        alt: 'IES volunteers and children from the centre gathered together in a corridor lined with the children\'s artwork.',
      },
      {
        src: '/activities/jiguchon-childrens-center/session.jpg',
        alt: 'Children seated at tables facing a screen while IES volunteers run a session at the centre.',
      },
      {
        src: '/activities/jiguchon-childrens-center/volunteers.jpg',
        alt: 'A teaching session in progress at the centre, with a slide displayed on the screen behind the children.',
      },
      {
        src: '/activities/jiguchon-childrens-center/activity.jpg',
        alt: 'An IES volunteer leading an activity with a group of children standing around him.',
      },
    ],
  },
  {
    id: 'nanoom-korea-partnership',
    title: 'Nanoom Korea',
    kind: 'Community Service',
    branch: 'korea',
    date: 'Partnership established January 11, 2025 — ongoing',
    workCategory: 'community-service',
    summary:
      'A standing partnership with Nanoom Korea covering service visits and the funding of education scholarships.',
    body: [
      'Nanoom Korea is the partner behind both a service programme and a scholarship. Students visit in person for hands-on work — kitchen shifts, home visits, and assistance for older residents — and separately raise and direct funds through the organisation.',
      'Keeping both halves in one partnership is deliberate. Fundraising that never puts a student in the room tends to drift towards the abstract, and service without any resource behind it runs out of what it can actually change.',
    ],
    photos: [
      {
        src: '/activities/nanoom-korea-partnership/meeting.jpg',
        alt: 'IES students seated around a meeting table with a Nanoom Korea representative speaking, the walls behind him covered with photographs of the organisation\'s work.',
      },
      {
        src: '/activities/nanoom-korea-partnership/visit.jpg',
        alt: 'An IES volunteer in a Nanoom Korea vest assisting an elderly resident during a home visit.',
      },
      {
        src: '/activities/nanoom-korea-partnership/handover.jpg',
        alt: 'An IES volunteer in a Nanoom Korea vest washing up during a kitchen service shift.',
      },
    ],
  },
]

/** Activities for one branch, newest first (source order). */
export const activitiesByBranch = (branch: BranchSlug) =>
  activities.filter((activity) => activity.branch === branch)

/** Activities filed under one `workCategories` entry. */
export const activitiesByWorkCategory = (workCategory: string) =>
  activities.filter((activity) => activity.workCategory === workCategory)

export const activityById = (id: string) => activities.find((activity) => activity.id === id)

/** Total photographs on file — used for the Our Work photography note. */
export const activityPhotoCount = activities.reduce((n, a) => n + a.photos.length, 0)
