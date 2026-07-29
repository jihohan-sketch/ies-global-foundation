# Pre-Publication Review Checklist

Every factual claim on this website is listed below. **Founding leadership and
the relevant national branch president must sign off on each section before the
site goes live.**

Sources used to build the current content:

- <https://ie-society.com/> — IES Korea's existing website
- <https://linktr.ee/iesnational> — official link hub
- Korean Wikipedia: 세계청소년사회윤리재단

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
| Petition to National Assembly re: generative AI for under-12s | `content/branches.ts`, `content/impact.ts` | ✅ published — **needs a date** |
| Service partners: Nanoom Korea, Jiguchon Children's Center, Guro Happy Children's Center | `content/partners.ts` | ✅ published |
| Collaborators: YMUN Korea, UN OHCHR, National Assembly of Korea, Korea Legacy Committee | `content/partners.ts` | ✅ published |
| Email theiesociety@gmail.com; Instagram @iesnational; LinkedIn; YouTube | `content/site.ts` | ✅ published |
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
- [ ] Add headshots to `public/leadership/` and set `photo:` on each person

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

### Legal — `src/content/legal.ts`

- [ ] Privacy Policy, Terms of Use, and Participant Safety are **drafts, not
      legal advice.** Have them checked against Korea (PIPA), the UK (UK GDPR /
      Data Protection Act 2018), and applicable U.S. state law.
- [ ] Set `lastReviewed` to the real review date
- [ ] Confirm the nonprofit description matches actual registration in Korea

---

## 3. Configuration before deploy

- [ ] Replace `site.url` in `src/content/site.ts` with the real domain
- [ ] Update the canonical URL and OG URLs in `index.html`
- [ ] Run `npm run sitemap` (or set `SITE_ORIGIN`) after the domain is final
- [ ] Set `VITE_CONTACT_ENDPOINT` so the contact form POSTs somewhere; without
      it the form falls back to opening a mail draft
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
