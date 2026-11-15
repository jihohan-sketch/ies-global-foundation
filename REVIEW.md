# Open confirmations — before production

Facts the website holds back or states conservatively until the project owner
confirms them. Nothing below appears on the page as a warning; each item is
either omitted or shown in its most conservative supported form.

Sources checked (November 2026): this repository's previous content,
<https://ie-society.com/> (`/about`, `/history`), and <https://iesusa.space/>
(`/leadership`, `/about`).

## Founding leadership (shown)

**Joseph Hahmmin Kang**

- [ ] Preferred display name: "Joseph Hahmmin Kang" (used by both branch sites)
      or "Joseph Kang"?
- [ ] Current role shown: *Director of Global Operations, IES Global Foundation*
      (agreed by the previous site and iesusa.space). His Vice Chair title is
      **not** shown: the previous site said "Vice Chairman" and iesusa.space says
      "Student Vice Chair". Which, if either, should appear?
- [ ] Service shown: *Co-President, then 2nd President, IES · 2023–2026*. This
      matches ie-society.com ("2023–2026/1") and the previous site (Co-President
      to Aug 2025, then President to Jan 2026). Confirm.
- [ ] Contribution sentence: *"Coordinates the work that runs between the
      national branches."* Confirm or replace.

**Jaesuh Joshua Shin**

- [ ] Preferred display name.
- [ ] Service end date. **No years are shown for his presidency** because the
      sources conflict: ie-society.com gives "2023–2026/1", but the previous
      site said 1st President until October 2025.
- [ ] Current role, if any, and a one-sentence current contribution. Both are
      omitted until confirmed.

## Current branch leadership (shown, separate from the Council)

- [ ] **Ryan Jimyung Cha**, shown as *President, IES Korea*. ie-society.com
      writes "Ryan (Jimyung) Cha" and "3rd President of IES National" (elected
      December 2025). Confirm display name and exact title.
- [ ] **Aden Lee**, shown as *Co-President, Internal Operations, IES United
      States* (exact title from iesusa.space).
- [ ] **Onew Choi**, shown as *Co-President, External Operations, IES United
      States* (exact title from iesusa.space).
- [ ] Confirm all three are still in office, and that each approves their name
      and existing portrait appearing here.

None of the three is labelled as a former leader or a Council member.

## IES Leadership Council — first formation (shown)

Confirmed November 2026: Joseph Hahmmin Kang, Jaesuh Joshua Shin, Sean Han,
Yura Shin. Yuchan Park and future officers go in the Executive Leadership Team
(`category: 'executive'`), not the Council.

- [ ] **Sean Han**: role shown as *President and Director of Global Marketing,
      IES Global Foundation* (the previous site's title). Confirm.
- [ ] **Yura Shin**: role shown as *Director of Global Outreach, IES Global
      Foundation*. Her Vice Chair title is not shown, because the sources
      conflict ("Vice Chairman" vs "Student Vice Chair").
- [ ] **Yuchan Park**: role shown as *Director of Technology, IES Global
      Foundation*. Confirm.

## Not shown until confirmed

- [ ] **Board of Directors** (Hyundoo Cho). Not shown. Decide whether it
      belongs on the page. The portrait is kept in `assets-archive/`.
- [ ] **IES UK Society.** The previous site listed a UK branch
      (iesunitedkingdom.lovable.app), and iesusa.space mentions the UK, but
      ie-society.com doesn't, and the brief lists only Korea and the United
      States. Add it to `branches` in `src/content/site.ts` once its national
      branch and website are confirmed.
- [ ] **Leadership and Succession Guide.** No term lengths, voting rules,
      eligibility standards, or link to the guide are published. Link it from
      the footer once it's adopted and an approved public version exists.

## Site-level

- [ ] **Contact address.** `theiesociety@gmail.com` is used (published on
      ie-society.com, and the contact form's delivery inbox). Note that
      iesusa.space uses a different address in its footer. Confirm this is the
      right public contact for the Foundation.
- [ ] **Social preview image** (`public/og-image.png`). It's kept as-is per the
      brief, but its artwork still reads "Building Ethical Leaders" and "Korea ·
      United States · United Kingdom". Approve a replacement when one exists.
- [ ] **Policy pages.** These are the existing drafts, unchanged except for
      removing references to an application form this site no longer has. They
      still say "To be confirmed at launch" as the review date and haven't been
      legally reviewed.
- [ ] **Redirects.** Retired routes redirect temporarily (`permanent: false` in
      `vercel.json`). Make them permanent after approval.
