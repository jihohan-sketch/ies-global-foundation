/**
 * ⚠ DRAFT POLICY TEXT — REQUIRES REVIEW BEFORE PUBLICATION
 *
 * The policies below are drafted to be accurate to how IES describes itself on
 * this site and deliberately claim no legal status. They are NOT legal advice
 * and have not been reviewed by a qualified adviser. Before launch, have them
 * checked against the data-protection and safeguarding requirements of each
 * country where IES operates — at minimum Korea (PIPA), the United Kingdom
 * (UK GDPR / Data Protection Act), and the relevant U.S. state law.
 */

export interface LegalSection {
  heading: string
  paragraphs?: string[]
  list?: string[]
}

export interface LegalDocument {
  slug: string
  title: string
  eyebrow: string
  intro: string
  updated: string
  sections: LegalSection[]
}

export const lastReviewed = 'To be confirmed at launch'

export const privacyPolicy: LegalDocument = {
  slug: 'privacy',
  title: 'Privacy Policy',
  eyebrow: 'Legal',
  updated: lastReviewed,
  intro:
    'This policy explains what information the IES Global Foundation collects through this website, why we collect it, and what we do with it. We collect as little as possible.',
  sections: [
    {
      heading: 'Information we collect',
      paragraphs: [
        'We collect information you give us directly — your name, email address, school or organization, and the content of your message — when you submit the contact or application form, or email us.',
        'We do not require an account to use this website, and we do not ask for personal information beyond what is needed to answer your inquiry.',
      ],
    },
    {
      heading: 'How form submissions reach us',
      paragraphs: [
        'The forms on this website are delivered by Web3Forms, a form-to-email service operating outside your country. What you submit passes through their systems on its way to our inbox; they forward it and do not use it for their own purposes. If you would rather not use the form, email us directly at theiesociety@gmail.com instead — it reaches the same place.',
      ],
    },
    {
      heading: 'How we use it',
      list: [
        'To respond to your inquiry and route it to the relevant branch or team',
        'To process applications for membership, chapter, or branch roles',
        'To maintain records of partnerships and organizational correspondence',
      ],
    },
    {
      heading: 'What we do not do',
      list: [
        'We do not sell personal information',
        'We do not share your details with third parties for marketing',
        'We do not use your message content for any purpose other than responding to it',
      ],
    },
    {
      heading: 'Analytics and cookies',
      paragraphs: [
        'This website uses no advertising cookies and no cross-site tracking. If analytics are enabled, they are configured to collect aggregate usage data only, and a consent notice is shown where local law requires one.',
      ],
    },
    {
      heading: 'Young people',
      paragraphs: [
        'IES works with students, including minors. Where a participant is below the age at which they can consent to data processing in their country, we expect inquiries to be made with the knowledge of a parent, guardian, or school. We do not knowingly collect more information about a minor than is needed to respond to them.',
      ],
    },
    {
      heading: 'Retention',
      paragraphs: [
        'Inquiries are kept only as long as needed to handle them and to maintain a reasonable record of organizational activity. You can ask us to delete your information at any time.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'Depending on where you live, you may have the right to access, correct, or delete the information we hold about you, or to object to its processing. To exercise any of these rights, contact us and we will respond.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [
        'Questions about this policy can be sent to theiesociety@gmail.com.',
      ],
    },
  ],
}

export const termsOfUse: LegalDocument = {
  slug: 'terms',
  title: 'Terms of Use',
  eyebrow: 'Legal',
  updated: lastReviewed,
  intro:
    'These terms govern use of this website. They do not create a membership agreement — participation in IES programs is governed separately by the terms provided to participants.',
  sections: [
    {
      heading: 'About this website',
      paragraphs: [
        'This is the official website of the IES Global Foundation, the international body coordinating the IES national branch network. Information published here describes the organization and its activity.',
        'The Interscholastic Ethics Society is a student-led nonprofit organization founded in Seoul, South Korea, on 20 April 2023. The IES Global Foundation coordinates its international network. National branches are organizational units of that network rather than separately incorporated entities.',
      ],
    },
    {
      heading: 'Accuracy',
      paragraphs: [
        'We take care that information on this site is accurate at the time of publication, including statistics, leadership, and programs. Figures are drawn from internal reporting and are updated as reporting periods close. If you believe something here is inaccurate, please tell us.',
      ],
    },
    {
      heading: 'Use of our name and identity',
      list: [
        'The IES name, wordmark, and identity may not be used without written permission',
        'No individual, chapter, or organization may represent themselves as speaking for IES without authorisation',
        'Chapters may use IES branding only within the guidelines issued to them',
      ],
    },
    {
      heading: 'Acceptable use',
      paragraphs: [
        'Do not use this website to submit unlawful, misleading, or abusive content, to attempt unauthorised access, or to interfere with its operation.',
      ],
    },
    {
      heading: 'External links',
      paragraphs: [
        'This site links to external organizations and social platforms. We are not responsible for the content or practices of external sites.',
      ],
    },
    {
      heading: 'Changes',
      paragraphs: [
        'We may update these terms as the organization develops. The current version always appears on this page.',
      ],
    },
  ],
}

export const participantSafety: LegalDocument = {
  slug: 'participant-safety',
  title: 'Participant Safety',
  eyebrow: 'Policy',
  updated: lastReviewed,
  intro:
    'IES programming involves students, including minors. This policy sets out the standards every branch, chapter, and partner is expected to meet, and how to raise a concern.',
  sections: [
    {
      heading: 'Our commitments',
      list: [
        'Programming is designed so that participants are never isolated with a single adult or older participant without oversight',
        'Chapters and branches follow the safety requirements of their own country and school',
        'Partner organizations are held to the same standards as internal programming',
        'Concerns are taken seriously, recorded, and acted on',
      ],
    },
    {
      heading: 'Conduct expectations',
      paragraphs: [
        'All participants — members, chapter officers, national officers, volunteers, and partners — are expected to treat others with respect, to engage disagreement without diminishing people, and to avoid any conduct that could place a participant at risk.',
      ],
      list: [
        'No harassment, bullying, discrimination, or intimidation',
        'No conduct that exploits a difference in age, position, or authority',
        'No misrepresentation of a person’s role or authority within IES',
        'Compliance with the safeguarding rules of any host school or organization',
      ],
    },
    {
      heading: 'Working with younger children',
      paragraphs: [
        'Several IES programs involve mentorship and educational work with younger children. These programs run under the supervision and requirements of the host organization, and volunteers follow that organization’s safeguarding procedures in full.',
      ],
    },
    {
      heading: 'Raising a concern',
      paragraphs: [
        'Concerns about the conduct of any IES participant, chapter, or event should be raised with the relevant national branch or directly with the Global Foundation at theiesociety@gmail.com. Concerns can be raised confidentially.',
        'Where a concern indicates a risk of harm, it is escalated immediately and, where appropriate, to the relevant authorities or the host school or organization.',
      ],
    },
    {
      heading: 'Consequences',
      paragraphs: [
        'Breaches of this policy may result in removal from a role, closure of a chapter, or termination of a partnership. IES will not maintain a chapter or relationship that cannot meet these standards.',
      ],
    },
  ],
}

export const legalDocuments = [privacyPolicy, termsOfUse, participantSafety]

export const governance = {
  intro:
    'This page describes how IES is organized and what each part of the organization is and is not. It exists because clarity about structure is part of operating credibly.',
  entities: [
    {
      title: 'IES Global Foundation',
      body: 'The international body that coordinates the IES network. It is responsible for international coordination, cross-border initiatives, global partnerships, branding, standards, branch development, and future expansion. It does not run local programming.',
    },
    {
      title: 'National branches',
      body: 'IES Korea, IES United States, and IES UK Society. Each is an organizational unit of the same international network, led by students in that country, responsible for local programming, chapters, and outreach. They are not independent legal entities.',
    },
    {
      title: 'School chapters',
      body: 'Student-led groups at individual schools, approved and supported by their national branch. Chapters operate under shared guidelines and may use IES branding only as issued to them.',
    },
    {
      title: 'External partners',
      body: 'Schools, universities, nonprofits, community centers, and public institutions that collaborate with IES. Partnership does not imply endorsement, accreditation, or affiliation beyond what has been agreed in writing.',
    },
  ],
  principles: [
    {
      title: 'Accurate representation',
      body: 'IES describes itself as a student-led nonprofit organization founded in South Korea. It does not claim registered charitable or NGO status in any other country, and nothing on this site should be read as such a claim.',
    },
    {
      title: 'Defined authority',
      body: 'A title within IES carries the responsibilities described for that role and no authority beyond them. National leadership does not speak for the Foundation, and the Foundation does not run branch programming.',
    },
    {
      title: 'Verifiable reporting',
      body: 'Published figures come from internal branch reporting consolidated by the Foundation. Where a figure cannot be supported from records, it is not published.',
    },
    {
      title: 'Reviewed publication',
      body: 'Substantive changes to this website — leadership, statistics, branch information, and organizational claims — are reviewed by founding leadership and the relevant national branch president before publication.',
    },
  ],
}
