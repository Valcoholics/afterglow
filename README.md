# Afterglow

A spatial DJ library browser: timeline (day phases) → mood constellation
(performance contexts) → track details. It helps a DJ prep a gig in ~10
minutes instead of 30+, and surfaces forgotten material along the way.

Built for the Music Hackspace hackathon in Lisbon.

## The app

A Next.js 16 app rendering a 73-track demo library as an interactive
constellation with a timeline and per-track detail view.

### Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build / deploy

```bash
npm run build   # production build
npm run start   # serve the production build
```

Deployed on Vercel (auto-detected Next.js, no configuration required).
Every push to `main` deploys; branches get preview URLs.

### Layout

| Path            | What it is                                          |
|-----------------|-----------------------------------------------------|
| `src/`          | App source (components, data, spatial layout logic) |
| `public/`       | Static assets                                       |
| `td-export/`    | TouchDesigner export data (points, distances, scheme)|
| `scripts/`      | `export-touchdesigner.mjs` — regenerates `td-export/`|
| `docs/`         | Full project knowledge base (see below)             |

## Knowledge base

The complete project brief — vision, problem, mood taxonomy, UX, MVP
scope, demo story, judge context, and the sprint plan — lives in
[`docs/`](docs/). Start with **[`docs/README.md`](docs/README.md)**, which
is the annotated entry point and reading roadmap; from there the numbered
files (`docs/00-project-overview.md` onward) build on each other in order.

Quick pointers:

- **What & why:** [`docs/00-project-overview.md`](docs/00-project-overview.md), [`docs/01-problem-and-users.md`](docs/01-problem-and-users.md)
- **How it works:** [`docs/02-core-concept.md`](docs/02-core-concept.md), [`docs/03-mood-taxonomy.md`](docs/03-mood-taxonomy.md)
- **Design:** [`docs/04-ux-and-spatial-interaction.md`](docs/04-ux-and-spatial-interaction.md)
- **Scope:** [`docs/05-mvp-and-scope.md`](docs/05-mvp-and-scope.md)
- **Demo:** [`docs/06-demo-story.md`](docs/06-demo-story.md)
- **Build plan:** [`docs/IMPLEMENTATION-BRIEF.md`](docs/IMPLEMENTATION-BRIEF.md), [`docs/24-HOUR-SPRINT.md`](docs/24-HOUR-SPRINT.md)
