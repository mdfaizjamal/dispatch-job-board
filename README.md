# Dispatch — a job board

Dispatch is a small job board built as a "departures board" for open roles:
scan what's open, filter down to what matters, post a role, and keep a
shortlist of the ones worth a second look.

Live demo: **_add your Vercel URL here after deploying_**

---

## 1. Features

### Browse the board
The home page (`/`) lists every open role in a departures-board style table:
requisition ID, title, company, location, type, and status. Rows animate in
with a short "flip" on load, echoing an airport board.

### Search
A single search box filters roles live, matching against title, company,
location, and tags — no page reload, no submit button.

### Filter
Two dropdowns narrow the list by **category** (Engineering, Design,
Marketing, Support) and **job type** (Full-time, Part-time, Contract).
Filters combine with search and with each other.

### Sort
Roles can be sorted **Newest first** (default), or alphabetically by
**Title** or **Company**.

### Job detail pages
Each role has its own page at `/jobs/[id]` with the full description,
"What you'll do," "What you'll bring," tags, salary, and an **Apply by
email** button that opens a pre-addressed, pre-subjected email draft in the
visitor's own mail client — no backend required.

### Post a role
The `/post` page is a validated form (required title, company, location,
description, and a valid email) that publishes a new listing straight to
the top of the board and redirects to its detail page. New listings get the
next sequential requisition ID automatically (e.g. `REQ-1048`).

### Save roles for later
Every row has a save toggle (☆ / ★). Saved roles are collected on the
`/saved` page. This is per-device: it uses the browser's `localStorage`, so
nothing is shared between visitors and nothing requires a login.

### Empty states
Both the board and the saved list show a clear, actionable message when
there's nothing to show, instead of a blank page.

### Responsive, accessible layout
The layout adapts from a single mobile column to a full multi-column table
on desktop. Interactive elements have visible keyboard focus rings, and
`prefers-reduced-motion` is respected for the load-in animation.

---

## 2. How data works (and its limits)

This project has **no external database** by design, to keep it a single
deployable static-friendly app:

- On first load, the board is seeded with sample listings from
  `lib/jobsData.js`.
- Any role you post, and any role you save, is written to the browser's
  `localStorage` (see `lib/useJobs.js`).
- That means: data is **per-browser, per-device**. Posting a job on your
  laptop won't show up on your phone. Clearing site data resets the board
  back to the seed listings.

This is intentional for a lightweight demo/assessment project. If you want
real, shared data next, see [Section 6](#6-where-to-go-next).

---

## 3. Tech stack

| Layer      | Choice                                   |
|------------|-------------------------------------------|
| Framework  | Next.js 14 (App Router)                   |
| UI         | React 18                                  |
| Styling    | Tailwind CSS                              |
| Fonts      | IBM Plex Mono (display) + Inter (body), via `next/font` |
| Persistence| Browser `localStorage` (no backend)       |
| Hosting    | Vercel                                    |
| CI/CD      | GitHub Actions                            |

---

## 4. Project structure

```
job-board/
├── app/
│   ├── layout.js          Root layout, fonts, metadata
│   ├── globals.css        Tailwind + base styles
│   ├── page.js            Home page — the board
│   ├── jobs/[id]/page.js  Job detail page
│   ├── post/page.js       Post-a-role form
│   └── saved/page.js      Saved roles page
├── components/
│   ├── Header.js          Top nav
│   ├── FilterBar.js       Search/filter/sort controls
│   ├── JobRow.js          One row on the board
│   ├── Badge.js           Small status/tag pill
│   └── EmptyState.js      "Nothing here" state
├── lib/
│   ├── jobsData.js        Seed listings, category/type lists
│   └── useJobs.js         Hook: reads/writes jobs + saved IDs in localStorage
├── .github/workflows/
│   └── ci-cd.yml          CI (lint+build) and CD (deploy to Vercel)
└── public/                Static assets
```

---

## 5. Running it locally

You'll need [Node.js](https://nodejs.org) 18.18 or newer.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the app
# http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build (also run in CI)
npm run start   # run the production build locally
npm run lint     # check code style
```

---

## 6. Where to go next

Ideas if you continue building this out:

- Swap `localStorage` for a real database (Postgres via
  [Vercel Postgres](https://vercel.com/storage/postgres) or
  [Supabase](https://supabase.com)) and move job reads/writes into API
  routes, so listings are shared across everyone, not per-device.
- Add authentication so only the poster can edit/close their own listing.
- Add pagination or infinite scroll once the board has real volume.
- Add a proper "closed" state for roles that have been filled.

---

## 7. Deployment

See `DEPLOYMENT.md` for the full step-by-step: pushing to GitHub, wiring up
the GitHub Actions CI/CD pipeline, and connecting Vercel.
