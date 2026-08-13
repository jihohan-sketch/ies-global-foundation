# Pre-Publication Review Checklist

Every factual claim on this website is listed below. **Founding leadership and
the relevant national branch president must sign off on each section before the
site goes live.**

Sources used to build the current content:

- <https://ie-society.com/> — IES Korea's existing website
- <https://iesusa.space/> — IES United States' website
- <https://linktr.ee/iesnational> — official link hub
- Korean Wikipedia: 세계청소년사회윤리재단

All photography and every activity date, venue and named guest on this site came
from the first two. Nothing here is stock imagery and nothing was inferred.

---

## 1. Verified from published sources — confirm still current

These are drawn from the organization's own published material. Confirm nothing
has changed since.

| Claim | Where | Status |
| --- | --- | --- |
| Full name: Interscholastic Ethics Society (세계청소년사회윤리재단) | `content/site.ts` | ✅ published |
| Founded 20 April 2023, Seoul | site-wide | ✅ published |
| Founders: Jaesuh Joshua Shin (신재서), Joseph Hahmmin Kang (강함민) | `content/leadership.ts` | ✅ published |
| Presidency: Shin (1st, Aug–Oct 2025), Kang (2nd, Oct 2025–Jan 2026), Ryan Jimyung Cha (3rd, Jan 2026–) | `content/leadership.ts`, `content/impact.ts` | ✅ published |
| Motto "Ethics in Action"; mission "Turn dialogue into service" | `content/site.ts` | ✅ published |
| Three A's: Applied Ethics, Academic Vitality, Advancing Equity | `content/site.ts` | ✅ published |
| Ethics forums on medical, AI, military, environmental, human rights | `content/branches.ts` | ✅ published |
| Petition to National Assembly re: generative AI for under-12s | `content/branches.ts`, `content/impact.ts`, `content/activities.ts` | ✅ published — dated from the petition record itself: consent window 6 Nov – 6 Dec 2025, closing at 514 signatures |
| Service partners: Nanoom Korea, Jiguchon Children's Center, Guro Happy Children's Center | `content/partners.ts` | ✅ published |
| Collaborators: YMUN Korea, UN OHCHR, National Assembly of Korea, Korea Legacy Committee | `content/partners.ts` | ✅ published |
| Email theiesociety@gmail.com; Instagram @iesnational; LinkedIn; YouTube | `content/site.ts` | ⚠️ **two Instagram handles in circulation** — see below |
| Student-led nonprofit organization | `content/legal.ts`, `content/site.ts` | ⚠️ per Wikipedia — **confirm registration** |

---

## 2. Must be verified before launch

### Statistics — `src/content/impact.ts`

Taken from the project brief, **not** from a verified source. Every figure needs
a supporting internal record, or must be removed.

- [ ] 1,200+ members
- [ ] 42+ schools represented
- [ ] 23+ chapters
- [ ] 736,000+ people reached
- [ ] 3 national branches / 3 countries
- [ ] Set `reportingPeriod` to the actual period the figures cover

Note: ie-society.com currently shows these as animated counters that read `0+`
in a static fetch, so the live values there could not be read. Cross-check.

### Timeline — `src/content/impact.ts`

Entries still reading **"Date to be confirmed"** must be dated or deleted:

- [ ] Petition to the National Assembly
- [ ] Growth beyond Korea
- [ ] IES United States established
- [ ] IES UK Society established
- [ ] IES Global Foundation established

### Leadership — `src/content/leadership.ts`

- [ ] **Every biography is a draft.** Each person must read and approve their own
      name, romanisation, Korean name, title, and bio.
- [ ] Confirm Aden Lee and Onew Choi are Co-Presidents of IES United States
- [ ] Confirm Jimin Lee is President of IES UK Society
- [ ] Fill or remove the Global Foundation offices in `globalOffices` — offices
      with no `holder` render as "Appointment to be confirmed" by design
- [ ] Pronouns: all bios use they/them because no pronouns were supplied.
      Replace with each person's actual pronouns.
- [x] Headshots are in `public/leadership/` with `photo:` set, sourced from
      ie-society.com and iesusa.space. Two gaps and one defect remain:
  - [x] **Jimin Lee** — found on the IES UK Society site and now in place.
  - [ ] **Sean Han** is the only person left without a sourced photograph. The
        existing file predates this pass and appears on none of the three branch
        sites. Confirm it is the right person and cleared for use.
  - [ ] **Ryan Jimyung Cha** is shipped at 320×320 from a 170px source, the only
        one published anywhere. It is visibly soft next to the others. Replace
        with a proper file — this is the sitting National President.

### Photography — `src/content/activities.ts`, `public/activities/`

70 photographs and 13 activity entries were taken from IES Korea's own site.
Every entry's title, date, venue and named guests follow the branch's published
wording; nothing was inferred. Before launch:

- [ ] **Consent for identifiable people.** Several photographs show children at
      the Jiguchon and Guro Happy children's centres, and others show named
      students and serving officers. Written permission from the centres, from
      guardians of any identifiable minor, and from adults appearing in a
      recognisable way should be on file. This is the single largest open risk in
      this section — it is a legal question under PIPA, not an editorial one.
- [ ] **Right to publish.** Confirm IES holds or has been granted the rights to
      each photograph. Two candidates were deliberately **excluded** during this
      pass and must not be reinstated without a licence: a Yonhap News image of
      Major General Lombardo, and a Yale MUN logo.
- [ ] `ROK–US Cherry Blossom Ball` carries **no date** — the branch has never
      published one. Date it or remove the entry.
- [ ] **Bioethics forum guest's name.** The branch site gives both "Dr. Hyunju
      Lee" (timeline, and the event's own speaker card, which also states
      endocrinologist, Santa Fe Springs, California) and "Dr. Hyunju Kim"
      (speaker list). This site uses **Lee**. Confirm with the guest.
- [ ] **AI ethics forum guest's name.** Published as both "ROKAF General Kim
      Tae-wook" and "General Taewook Kim". This site uses the former. Settle the
      romanisation and use one form everywhere.
- [ ] Confirm the ₩1,000,000 scholarship figure and the 500+ figure for the YMUN
      Korea community fair against internal records.
- [ ] The bioethics forum has only one usable photograph (the online session).
      Request more from the branch, or leave it as is.
- [ ] **Guest portraits.** Four activities show the guest's own portrait beside
      the event details (`portrait` on the entry): Dr. Hyunju Lee, the ROKAF
      general, Major General Charles Lombardo (official US Army portrait), and
      Minister Sunghwan Kim (at a Ministry of Environment podium). None carries a
      visible credit. Confirm the source and licence of each, or drop the field —
      the Minister's in particular looks like a press photograph.

### Video — the YouTube channel

Fifteen videos on <https://www.youtube.com/@InterscholasticEthicsSocie-r8w> are
now on the site as **embeds, not copies**: nine on the activities they document
(four on the Environmental Ethics Forum, five on the National Assembly petition)
and six on Impact under "Film". Nothing loads from YouTube until a visitor
presses play, so the site still makes no third-party request on page load and
still needs no cookie banner.

- [ ] Confirm all fifteen are meant to stay public, and that everyone appearing
      in them has consented — the same question as for the photographs, and the
      five Korean petition-campaign videos are advocacy material.
- [ ] The channel is the only place these live. If a video is unlisted or
      deleted, the embed becomes a dead frame; there is no fallback.

### Self-hosted video — `public/activities/ymun-korea-community-fair/`, `public/media/`

Separately, four video **files** were imported and **none is rendered**, because
nobody has watched them in this pass — there is no video tooling in this
environment to play or transcode them. Now that the YouTube channel supplies the
site's video properly, the case for keeping these is weaker.

- [ ] **Watch `fair-1.mp4`, `fair-2.mp4`, `fair-3.mp4`** (from IES Korea's Drive,
      labelled Yale MUN XIII Community Fair). If they are what the label says and
      the people in them have consented, wire them into the YMUN entry. If not,
      delete them — they are 13 MB of repository weight otherwise.
- [ ] `public/media/kr-hero.mp4` is IES Korea's homepage hero video (12 MB). This
      site leads with the interactive globe instead, so there is nowhere for it to
      go as things stand. Use it or delete it.
- A fifth clip on IES Korea's Drive (`1suaPm3s0k91wq_4N62aSCqbGJ-Hgqea9`) was
  **not** imported: 90 MB QuickTime, unlabelled, and past the size at which it
  belongs in git. Compress it first if it is wanted.

### Brand assets — `public/brand/`

Eight files from IES Korea's site: the current mark, the founding mark, the 2nd
and 3rd administrations' marks, the IES United States mark, the Korean wordmark,
and a banner. Nothing renders them — the site draws its own mark in
`components/layout/LogoMark.tsx`. They are here as the identity archive.

- [ ] Confirm which mark is currently canonical, and whether the historical ones
      should appear anywhere on this site at all.

### IES Korea roster — headshots staged, not wired

Twenty further headshots are in `public/leadership/`, cropped and named, but no
`Person` record references them. Each needs a confirmed title and an approved
biography first (see the leadership items above). Names, Korean names, roles and
schools below are as **IES Korea publishes them** — none of it is inferred.

| File | Name | Korean | Published role | School / chapter |
| --- | --- | --- | --- | --- |
| `brian-cho.jpg` | Brian Cho | 조재우 | Vice President & Co-Director, Education | Saint Paul Preparatory Seoul |
| `sua-bae.jpg` | Sua Bae | 배수아 | Secretary; Co-Director, IES Publications | Korea International School |
| `connor-seong.jpg` | Connor Seong | 성지훈 | Co-Director | Seoul International School |
| `olivia-lee.jpg` | Olivia Lee | 이하윤 | Co-Director | Yongsan International School of Seoul |
| `caylee-park.jpg` | Caylee Park | 박소윤 | Co-Director | Yongsan International School of Seoul |
| `meiko-wessley-lopez.jpg` | Meiko Wessley Lopez | 마이코 | Deputy Director | Yongsan International School of Seoul |
| `elaine-jeong.jpg` | Elaine Jeong | 정** | Co-Director | Yongsan International School of Seoul |
| `vivien-gong.jpg` | Vivien Gong | 공** | Co-Director | Yongsan International School of Seoul |
| `jacob-sung.jpg` | Jacob Sung | 성시윤 | Co-Director | Seoul International School |
| `isabel-jeong.jpg` | Isabel Jeong | 정재이 | Co-Director | Chadwick International |
| `helen-huh.jpg` | Helen Huh | 허윤지 | Co-Director | Seoul International School |
| `bill-cho.jpg` | Bill Cho | 조현우 | Co-President | IES Saint Paul Preparatory Seoul Chapter |
| `ian-kim.jpg` | Ian Kim | 김이헌 | Co-President | IES Saint Paul Preparatory Seoul Chapter |
| `ray-roh.jpg` | Ray Roh | — | *role not published* | — |
| `joe-shin.jpg` | Joe Shin | — | *role not published* | — |
| `eason-advisor.jpg` | *given name only* | — | Senior Advisor | — |
| `joshua-ko-advisor.jpg` | Joshua Ko | — | Senior Advisor | — |
| `charles-lombardo.jpg` | Charles Lombardo | — | US Army Major General; partner, not IES staff | — |
| `commissioner-yongjin-kim.jpg` | Yongjin Kim | — | Commissioner; listed as a forthcoming forum guest | — |
| `general-burwell-bell.jpg` | Burwell B. Bell III | — | General (retd.); listed as a forthcoming forum guest | — |

- [ ] Two names are published with the family name masked (정**, 공**) and two
      have no published role at all. Get full names and titles, or leave them off.
- [ ] The last three are **not IES members** — they are partners and invited
      guests. If they are shown anywhere, it must be as guests, and the
      `Person`/`tier` model has no category for that today.
- [ ] `elaine-jeong.jpg` is only 160×160 and `commissioner-yongjin-kim.jpg` 250×250
      — the largest their sources allow. Both need better files before use.

### Instagram — `src/content/site.ts`, `src/content/branches.ts`, `index.html`

- [ ] **Decide which handle is correct.** ie-society.com and this site both link
      `instagram.com/iesnational`. The official link hub, `linktr.ee/iesnational`,
      links `instagram.com/intethicsociety` instead. Both URLs respond, which
      proves nothing — Instagram answers for handles that do not exist. One of
      these is wrong on a page the organization controls, and it appears in three
      places here plus the Organization JSON-LD.
- Instagram media cannot be fetched without a logged-in session, and working
  around that is not something to do. A Drive folder of 47 screenshots of the
  Instagram feed was reviewed instead (see below).
- [ ] If there is more on the account than the feed shows — Stories, archived
      posts, or the original files behind the posts — **export the originals**
      rather than screenshotting. Screenshots arrive at roughly a third of the
      resolution the same photograph already has on ie-society.com.

### Reviewed and mostly declined — "IES Joseph Media Collection" Drive folder

50 files, owned by `jacobsung29@gmail.com`. Perceptual hashing against the 70
photographs already on the site found:

- **3 videos** byte-identical to the clips already in
  `public/activities/ymun-korea-community-fair/`.
- **40 of 47 screenshots** the same photographs already published, at lower
  resolution — Instagram crops of images taken from ie-society.com at full size.
- **6 more** near-identical alternate frames of group shots already represented
  (the Environmental Ethics Forum group photo alone had four variants).
- **1 genuinely new photograph**, now the lead image on the Camp Humphreys entry:
  six students with Major General Lombardo and the unit colours.

Nothing was lost by declining the rest, and adding it would have meant publishing
worse copies of photographs already on the site.

### Branch content — `src/content/branches.ts`

- [ ] IES United States: growth strategy, outreach, and opportunities need
      confirmation by the branch's co-presidents
- [ ] IES UK Society: expansion phases and recruitment priorities need
      confirmation by the branch president
- [ ] Confirm "IES UK Society" is the correct formal name

### News — `src/content/news.ts`

- [ ] **All six articles are structural placeholders.** They describe plausible
      activity but are not records of real events. Rewrite or delete every one
      before launch — do not publish them as reporting.
- Note: no photograph has been attached to any of them, deliberately. Real
  photography on a placeholder article would make an invented record look
  documented. Rewrite the articles first, then add covers.

### Legal — `src/content/legal.ts`

- [ ] Privacy Policy, Terms of Use, and Participant Safety are **drafts, not
      legal advice.** Have them checked against Korea (PIPA), the UK (UK GDPR /
      Data Protection Act 2018), and applicable U.S. state law.
- [ ] Set `lastReviewed` to the real review date
- [ ] Confirm the nonprofit description matches actual registration in Korea
- [ ] **Web3Forms as a processor.** The contact and join forms send submissions
      through Web3Forms, so personal data — including data from minors — leaves
      the organization before it reaches the inbox, and crosses a border doing
      it. The Privacy Policy now says so under "How form submissions reach us",
      and offers email as an alternative. Whether that disclosure is sufficient
      under PIPA and UK GDPR (lawful basis, overseas transfer, a processor
      agreement) is a question for whoever reviews these drafts.

---

## 3. Configuration before deploy

- [ ] Replace `site.url` in `src/content/site.ts` with the real domain
- [ ] Update the canonical URL and OG URLs in `index.html`
- [ ] Run `npm run sitemap` (or set `SITE_ORIGIN`) after the domain is final
- [ ] **Confirm the Web3Forms inbox.** Both forms deliver through the access key
      in `src/lib/forms.ts`, which currently forwards to theiesociety@gmail.com
      and jiho.han@valorschool.org. Register the key against the addresses that
      should actually receive applications, or set `VITE_WEB3FORMS_KEY` in Vercel
      to a key that does. Send one test submission from each form after deploy —
      a wrong key fails silently from the visitor's side apart from the mail
      fallback.
- [ ] Consider dedicated mailboxes (`partnerships@`, `media@`) — every channel
      currently routes to theiesociety@gmail.com
- [ ] Add analytics only with a cookie/consent notice where law requires one
- [ ] Replace `public/og-image.svg` with a PNG if any target platform rejects SVG
      social cards

---

## 4. Things this site deliberately does **not** claim

Keep it that way unless you have documentation:

- No registered charity or NGO status outside Korea
- No claim that national branches are separately incorporated
- No partner logos (`partnerLogos` is empty until written permission exists)
- No awards, rankings, or accreditations
- No named country as a confirmed future branch
