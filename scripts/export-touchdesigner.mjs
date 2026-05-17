// Afterglow → TouchDesigner export.
//
// Reads src/data/library.json and writes a `td-export/` folder. Math here
// MIRRORS the web app (centroid layout + cosine similarity + heat ramp) so
// the point cloud and the web grid stay aligned.
//
//   node scripts/export-touchdesigner.mjs
//
// Two tiers of output:
//   MINIMAL (what was literally asked for — distances + values):
//     • points.csv      one row/track: id, artist, title, x, y, z, bpm, key
//     • distances.csv   every track pair: id_a, id_b, distance
//   EXTRA (only if the TD creator wants more):
//     • points-<context>.csv / points-all-contexts.csv  per-playlist clouds
//     • pairwise.csv    distance + cosine similarity + is_thread per context
//     • scheme.json     heat ramp stops + axis meanings + thresholds
//     • README.md       suggested TD wiring
//
// Minimal files use the CURRENT default context (afterglow) — the set
// being prepped. Change DEFAULT_CONTEXT below if needed.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "td-export");
mkdirSync(OUT, { recursive: true });

const { tracks: RAW } = JSON.parse(
  readFileSync(join(ROOT, "src/data/library.json"), "utf8")
);
const TRACKS = RAW.map((t, i) => ({ ...t, id: i + 1 }));

// ── Constants (in sync with src/data/tracks.ts + src/lib/spatial.ts) ──
const DEFAULT_CONTEXT = "afterglow";
const CONTEXTS = [
  "warm-up",
  "pool-party",
  "festival-brunch",
  "afterglow",
  "sunrise-reset",
  "club",
  "late-night-warehouse",
];
const ROLES = ["opener", "bridge", "reset", "home-stretch"]; // X 0..3
const CROWDS = ["arrivals", "lock-in", "wanderers"]; // Y 0..2
const CORE_THRESHOLD = 8;
const EDGE_THRESHOLD = 6; // 6–7 = edge; 1–5 treated as out (see tracks.ts)
const THREAD_THRESHOLD = 0.95; // tag-similarity fallback threshold

// Camelot harmonic mixing — MUST stay in sync with spatial.ts.
// Strict mixable set, two tiers: same=1, adjacent(±1 same letter,12↔1)=0.7.
// Relative maj/minor (same number, A↔B) is deliberately NOT an edge — a
// line means a tight, energy-matched mix only.
function parseCamelot(key) {
  const m = /^(\d{1,2})([AB])$/.exec(String(key).trim().toUpperCase());
  if (!m) return null;
  const n = parseInt(m[1], 10);
  if (n < 1 || n > 12) return null;
  return { n, letter: m[2] };
}
function harmonicTier(ka, kb) {
  const a = parseCamelot(ka);
  const b = parseCamelot(kb);
  if (!a || !b) return null;
  if (a.n === b.n && a.letter === b.letter) return "same";
  if (a.letter === b.letter) {
    const d = Math.abs(a.n - b.n);
    return d === 1 || d === 11 ? "adjacent" : null;
  }
  return null; // relative maj/minor no longer a harmonic edge
}
const TIER_STRENGTH = { same: 1, adjacent: 0.7 };
// Per-context heat ramps — MUST stay in sync with RAMPS in
// src/data/tracks.ts. Each: [cool low-fit] → [mid] → [hot high-fit ≈
// context identity color]. Drive node color off z_norm (fit/10):
// lo→mid for z_norm<0.5, mid→hi above.
const RAMPS = {
  afterglow: [[58, 44, 38], [173, 88, 48], [255, 140, 66]],
  "sunrise-reset": [[34, 44, 70], [74, 116, 196], [120, 168, 255]],
  "warm-up": [[60, 46, 28], [200, 132, 40], [255, 178, 64]],
  "festival-brunch": [[60, 32, 52], [186, 70, 140], [240, 110, 200]],
  "pool-party": [[58, 52, 28], [206, 168, 60], [255, 214, 92]],
  club: [[40, 32, 60], [124, 86, 200], [171, 132, 255]],
  "late-night-warehouse": [[28, 28, 38], [78, 78, 104], [134, 134, 168]],
};

const conf = (arr, val) => arr.find((x) => x.value === val)?.confidence ?? 0;

// Membership — MUST match membership() in src/data/tracks.ts so the point
// cloud and the web grid agree. ≥8 core, 6–7 edge, else out (untagged OR
// scored 1–5: the DJ judged it doesn't belong in this set).
const fitOf = (t, ctx) => conf(t.tags.time, ctx);
const memberOf = (fit) =>
  fit >= CORE_THRESHOLD ? "core" : fit >= EDGE_THRESHOLD ? "edge" : "out";
const inContext = (t, ctx) => memberOf(fitOf(t, ctx)) !== "out";

function weightedIdx(tagArr, order) {
  const sum = tagArr.reduce((s, x) => s + x.confidence, 0);
  if (!sum) return 0;
  return (
    tagArr.reduce((s, x) => s + order.indexOf(x.value) * x.confidence, 0) / sum
  );
}
function meanConf(t) {
  const all = [...t.tags.time, ...t.tags.role, ...t.tags.crowd];
  return all.reduce((s, x) => s + x.confidence, 0) / all.length;
}
function dominantContext(t) {
  return t.tags.time.reduce((b, x) => (x.confidence > b.confidence ? x : b))
    .value;
}
function vectorize(t) {
  return [
    ...CONTEXTS.map((c) => conf(t.tags.time, c)),
    ...ROLES.map((r) => conf(t.tags.role, r)),
    ...CROWDS.map((c) => conf(t.tags.crowd, c)),
  ];
}
function cosine(a, b) {
  const va = vectorize(a);
  const vb = vectorize(b);
  let d = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < va.length; i++) {
    d += va[i] * vb[i];
    na += va[i] * va[i];
    nb += vb[i] * vb[i];
  }
  return na && nb ? d / (Math.sqrt(na) * Math.sqrt(nb)) : 0;
}
// 3D point for a track within a context. X=role 0..3, Y=crowd 0..2,
// Z=fit 0..10. Z scaled by /3.33 in distance so it's comparable to X/Y.
function point3d(t, ctx) {
  return {
    x: weightedIdx(t.tags.role, ROLES),
    y: weightedIdx(t.tags.crowd, CROWDS),
    z: conf(t.tags.time, ctx),
  };
}
function dist3d(a, b) {
  return Math.sqrt(
    (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + ((a.z - b.z) / 3.33) ** 2
  );
}

const csvCell = (v) =>
  typeof v === "string" && /[",\n]/.test(v)
    ? `"${v.replace(/"/g, '""')}"`
    : String(v);
const toCSV = (rows) =>
  rows.map((r) => r.map(csvCell).join(",")).join("\n") + "\n";

// ════════════════════════════════════════════════════════════════
// MINIMAL — distances + values, default context only
// ════════════════════════════════════════════════════════════════
const inCtx = TRACKS.filter((t) => inContext(t, DEFAULT_CONTEXT));

const pointsRows = [
  ["id", "artist", "title", "x_role", "y_crowd", "z_fit", "bpm", "key"],
];
for (const t of inCtx) {
  const p = point3d(t, DEFAULT_CONTEXT);
  pointsRows.push([
    t.id,
    t.artist,
    t.title,
    +p.x.toFixed(4),
    +p.y.toFixed(4),
    p.z,
    t.bpm,
    t.key,
  ]);
}
writeFileSync(join(OUT, "points.csv"), toCSV(pointsRows));

const distRows = [["id_a", "id_b", "distance"]];
for (let i = 0; i < inCtx.length; i++)
  for (let j = i + 1; j < inCtx.length; j++) {
    distRows.push([
      inCtx[i].id,
      inCtx[j].id,
      +dist3d(
        point3d(inCtx[i], DEFAULT_CONTEXT),
        point3d(inCtx[j], DEFAULT_CONTEXT)
      ).toFixed(4),
    ]);
  }
writeFileSync(join(OUT, "distances.csv"), toCSV(distRows));

// ════════════════════════════════════════════════════════════════
// EXTRA — per-context clouds, similarity, scheme
// ════════════════════════════════════════════════════════════════
const fullHeader = [
  "context",
  "id",
  "artist",
  "title",
  "x_norm",
  "y_norm",
  "z_norm",
  "x_role_0_3",
  "y_crowd_0_2",
  "z_fit_0_10",
  "membership",
  "dominant_context",
  "mean_confidence",
  "bpm",
  "key",
  "duration",
  "genre",
];
const combined = [fullHeader];
for (const ctx of CONTEXTS) {
  const rows = [fullHeader];
  for (const t of TRACKS) {
    const fit = fitOf(t, ctx);
    if (memberOf(fit) === "out") continue;
    const p = point3d(t, ctx);
    const row = [
      ctx,
      t.id,
      t.artist,
      t.title,
      +(p.x / 3).toFixed(4),
      +(p.y / 2).toFixed(4),
      +(p.z / 10).toFixed(4),
      +p.x.toFixed(4),
      +p.y.toFixed(4),
      p.z,
      memberOf(fit),
      dominantContext(t),
      +meanConf(t).toFixed(3),
      t.bpm,
      t.key,
      t.duration,
      t.genre,
    ];
    rows.push(row);
    combined.push(row);
  }
  writeFileSync(join(OUT, `points-${ctx}.csv`), toCSV(rows));
}
writeFileSync(join(OUT, "points-all-contexts.csv"), toCSV(combined));

const pairHeader = [
  "context",
  "id_a",
  "id_b",
  "title_a",
  "title_b",
  "key_a",
  "key_b",
  "grid_dist_3d",
  "cosine_sim",
  "harmonic_tier", // same | adjacent | "" (none)
  "edge_kind", // harmonic | tag | none
  "edge_strength", // 0..1, drives line brightness in the app
  "is_thread", // 1 = the app draws a line
];
const pairRows = [pairHeader];
for (const ctx of CONTEXTS) {
  const c = TRACKS.filter((t) => inContext(t, ctx));
  for (let i = 0; i < c.length; i++)
    for (let j = i + 1; j < c.length; j++) {
      const A = c[i];
      const B = c[j];
      const sim = cosine(A, B);
      const keyed = parseCamelot(A.key) && parseCamelot(B.key);
      const tier = keyed ? harmonicTier(A.key, B.key) : null;
      let edgeKind = "none";
      let strength = 0;
      let isThread = 0;
      if (keyed) {
        if (tier) {
          edgeKind = "harmonic";
          strength = TIER_STRENGTH[tier];
          isThread = 1;
        }
      } else if (sim >= THREAD_THRESHOLD) {
        edgeKind = "tag";
        strength = sim;
        isThread = 1;
      }
      pairRows.push([
        ctx,
        A.id,
        B.id,
        A.title,
        B.title,
        A.key,
        B.key,
        +dist3d(point3d(A, ctx), point3d(B, ctx)).toFixed(4),
        +sim.toFixed(4),
        tier ?? "",
        edgeKind,
        +strength.toFixed(4),
        isThread,
      ]);
    }
}
writeFileSync(join(OUT, "pairwise.csv"), toCSV(pairRows));

writeFileSync(
  join(OUT, "scheme.json"),
  JSON.stringify(
    {
      heatRamps: {
        note:
          "One ramp PER context (different times of day = different " +
          "colors). Pick the ramp for the selected context, then drive " +
          "node color off z_norm (fit/10): interpolate lo→mid for " +
          "z_norm<0.5, mid→hi for z_norm>=0.5. Matches the web app.",
        byContext: Object.fromEntries(
          Object.entries(RAMPS).map(([ctx, [lo, mid, hi]]) => [
            ctx,
            { lo, mid, hi },
          ])
        ),
      },
      axes: {
        x: { meaning: "Journey Role", range: [0, 3], labels: ROLES },
        y: { meaning: "Crowd State", range: [0, 2], labels: CROWDS },
        z: { meaning: "Fit confidence to selected context", range: [0, 10] },
      },
      membership: {
        core: `fit >= ${CORE_THRESHOLD}`,
        edge: `${EDGE_THRESHOLD} <= fit < ${CORE_THRESHOLD}`,
        out: `fit < ${EDGE_THRESHOLD} or untagged (excluded)`,
      },
      threadThreshold: THREAD_THRESHOLD,
      contexts: CONTEXTS,
      defaultContext: DEFAULT_CONTEXT,
    },
    null,
    2
  ) + "\n"
);

writeFileSync(
  join(OUT, "README.md"),
  `# Afterglow → TouchDesigner export

Regenerate any time tags change:  \`node scripts/export-touchdesigner.mjs\`

## Start here (the literal ask: distances + values)

- **points.csv** — one row per track in the *${DEFAULT_CONTEXT}* set.
  x_role 0–3, y_crowd 0–2, z_fit 0–10, plus bpm/key. The values.
- **distances.csv** — every track pair: id_a, id_b, 3D euclidean distance
  (z scaled to be comparable to x/y). The distances.

That's everything that was asked for. The rest below is optional.

## Extra (only if you want it)

- **points-<context>.csv** / **points-all-contexts.csv** — the same cloud
  for every one of the 7 playlists, normalized 0–1 columns too. Filter the
  combined file by \`context\` to switch/animate between sets.
- **pairwise.csv** — adds cosine tag-similarity + \`is_thread\` (the web app
  draws a line at cosine ≥ ${THREAD_THRESHOLD}). Use similarity for spring
  forces / clustering, distance for spacing.
- **scheme.json** — \`heatRamps.byContext\` gives a lo/mid/hi color ramp
  for EACH context (different times of day = different color families).
  Pick the selected context's ramp, interpolate by z_norm (fit/10):
  lo→mid below 0.5, mid→hi above. Plus axis meanings + thresholds. This
  matches the web app exactly.

X = Journey Role (set progression, left→right).
Y = Crowd State (the room: Arrivals→Lock-in→Wanderers).
Z = how core the track is to this set (anchors forward, maybes recede).
`
);

console.log(
  `MINIMAL: points.csv (${pointsRows.length - 1} tracks) + distances.csv (${
    distRows.length - 1
  } pairs) — context "${DEFAULT_CONTEXT}"`
);
console.log(
  `EXTRA: ${CONTEXTS.length} per-context clouds + pairwise (${
    pairRows.length - 1
  } pairs) + scheme.json + README — all in td-export/`
);
