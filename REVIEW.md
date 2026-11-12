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

## Not shown until confirmed

- [ ] **Yura**: full display name and actual role. iesusa.space lists "Yura
      Shin, Student Vice Chair, IES Global Foundation · Director of Global
      Outreach"; the previous site said "Vice Chairman". A record exists in
      `src/content/leadership.ts` with `approved: false`.
- [ ] **IES Leadership Council roster.** No appointments are published. The
      section shows "Council formation in progress" until at least one member is
      confirmed (`category: 'council-active'`, `membershipStatus: 'confirmed'`,
      `approved: true`).
- [ ] **Foundation officers from the previous site** (Sean Han, President ·
      Director of Global Marketing; Yuchan Park, Director of Technology) and the
      **Board of Directors** (Hyundoo Cho). The brief's structure has no place
      for these, so they're not shown. Decide whether any belong on the page,
      and in which category. Their portraits are kept in `assets-archive/`.
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
