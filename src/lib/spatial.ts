// Two spatial encodings over the one shared data model. The data never
// changes between them — only the function that decides (x, y).
//
//  • "centroid" — fixed axes. X = confidence-weighted role index
//    (Opener→Home Stretch), Y = confidence-weighted crowd arc
//    (Arrivals→Lock-in→Wanderers). Each track independent. Legible,
//    traceable, deterministic. Answers "where does this belong in a set?"
//
//  • "graph" — no axes. Each track is a vector across every tag slot
//    (confidence as the value); a seeded force simulation pulls similar
//    tracks together. Relational, emergent. Answers "what's like this?"

import {
  type Crowd,
  type Phase,
  type Role,
  type Track,
} from "@/data/tracks";

export type ViewMode = "centroid" | "graph";

export const W = 1100;
export const H = 720;
const PAD = 90;

const ROLE_IDX: Record<Role, number> = {
  opener: 0,
  bridge: 1,
  reset: 2,
  "home-stretch": 3,
};
const CROWD_IDX: Record<Crowd, number> = {
  arrivals: 0,
  "lock-in": 1,
  wanderers: 2,
};

const ALL_PHASES: Phase[] = [
  "warm-up",
  "pool-party",
  "festival-brunch",
  "afterglow",
  "sunrise-reset",
  "club",
  "late-night-warehouse",
];
const ALL_ROLES: Role[] = ["opener", "bridge", "reset", "home-stretch"];
const ALL_CROWDS: Crowd[] = ["arrivals", "lock-in", "wanderers"];

export interface Positioned extends Track {
  // Display position. In centroid mode this is the DECLUTTERED spot (nudged
  // off the true centroid just enough to not stack). In graph mode it's the
  // sim output and equals (tx, ty).
  x: number;
  y: number;
  // True position — exactly where the tags put the track. In centroid
  // mode x/y == tx/ty (nodes stack at truth, no displacement).
  tx: number;
  ty: number;
  // Cluster id: nodes sharing a centroid pile up; same id ties the pile
  // together so the hover list can enumerate it. -1 = singleton (or graph
  // mode, where every node is its own point).
  cluster: number;
}

// ── Shared: tag vector + cosine similarity (powers graph + threads) ──
export function vectorize(t: Track): number[] {
  const v: number[] = [];
  for (const p of ALL_PHASES)
    v.push(t.tags.time.find((x) => x.value === p)?.confidence ?? 0);
  for (const r of ALL_ROLES)
    v.push(t.tags.role.find((x) => x.value === r)?.confidence ?? 0);
  for (const c of ALL_CROWDS)
    v.push(t.tags.crowd.find((x) => x.value === c)?.confidence ?? 0);
  return v;
}

export function similarity(a: Track, b: Track): number {
  const va = vectorize(a);
  const vb = vectorize(b);
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < va.length; i++) {
    dot += va[i] * vb[i];
    na += va[i] * va[i];
    nb += vb[i] * vb[i];
  }
  return na && nb ? dot / (Math.sqrt(na) * Math.sqrt(nb)) : 0;
}

// Edges above this cosine threshold get drawn as relationship threads.
export const THREAD_THRESHOLD = 0.95;

// ── Harmonic mixing (Camelot wheel) ────────────────────────────────
// Keys look like "8A", "12B". Number 1–12 around the wheel, letter A
// (minor) / B (major). Strict mixable set, tiered by mix quality:
//   "same"     — identical key: perfect, energy-matched
//   "adjacent" — ±1 number, same letter (12↔1 wraps): the classic mix
//   null       — not harmonically compatible
//
// A line therefore means ONE thing: same key or the ±1 same-letter mix —
// the tight, energy-matched blends only. The relative maj/minor jump
// (same number, A↔B) is a real DJ move but a bigger mood shift, so it is
// deliberately NOT drawn here — it would dilute "a line = a tight mix".
export type HarmonicTier = "same" | "adjacent";

function parseCamelot(
  key: string
): { n: number; letter: "A" | "B" } | null {
  const m = /^(\d{1,2})([AB])$/.exec(key.trim().toUpperCase());
  if (!m) return null;
  const n = parseInt(m[1], 10);
  if (n < 1 || n > 12) return null;
  return { n, letter: m[2] as "A" | "B" };
}

export function harmonicTier(
  keyA: string,
  keyB: string
): HarmonicTier | null {
  const a = parseCamelot(keyA);
  const b = parseCamelot(keyB);
  if (!a || !b) return null; // one is missing/unparseable → no harmonic edge
  if (a.n === b.n && a.letter === b.letter) return "same";
  if (a.letter === b.letter) {
    const diff = Math.abs(a.n - b.n);
    if (diff === 1 || diff === 11) return "adjacent"; // 11 = 12↔1 wrap
  }
  // Same number / different letter (relative maj-minor) and everything
  // else is intentionally NOT a harmonic edge anymore.
  return null;
}

// Two tiers now. Spread kept wide so the brightness ramp still separates
// the perfect blend from the classic ±1 mix.
const TIER_STRENGTH: Record<HarmonicTier, number> = {
  same: 1,
  adjacent: 0.7,
};

// Unified relationship between two tracks for thread drawing.
//   kind "harmonic" — both have parseable keys; strength by Camelot tier
//   kind "tag"      — at least one keyless; strength = cosine tag-sim
//                     (only counts if ≥ THREAD_THRESHOLD)
// Returns null when there's no edge to draw.
export interface Relationship {
  kind: "harmonic" | "tag";
  strength: number; // 0..1
  tier?: HarmonicTier;
}

export function relationship(a: Track, b: Track): Relationship | null {
  const keyed = parseCamelot(a.key) && parseCamelot(b.key);
  if (keyed) {
    const tier = harmonicTier(a.key, b.key);
    if (!tier) return null;
    return { kind: "harmonic", strength: TIER_STRENGTH[tier], tier };
  }
  const s = similarity(a, b);
  if (s < THREAD_THRESHOLD) return null;
  return { kind: "tag", strength: s };
}

const px = (n: number) => Math.round(n);

// ── Centroid encoding ──────────────────────────────────────────────
function centroid(track: Track): Positioned {
  const rsum = track.tags.role.reduce((s, x) => s + x.confidence, 0) || 1;
  const csum = track.tags.crowd.reduce((s, x) => s + x.confidence, 0) || 1;

  const rx =
    track.tags.role.reduce(
      (s, x) => s + ROLE_IDX[x.value] * x.confidence,
      0
    ) / rsum; // 0..3
  const cy =
    track.tags.crowd.reduce(
      (s, x) => s + CROWD_IDX[x.value] * x.confidence,
      0
    ) / csum; // 0..2

  const x = px(PAD + (rx / 3) * (W - 2 * PAD));
  const y = px(PAD + (cy / 2) * (H - 2 * PAD));
  // x/y start AT the true position; declutter() moves x/y only.
  return { ...track, x, y, tx: x, ty: y, cluster: -1 };
}

// ── Declutter (capped collision relaxation) ────────────────────────
// The problem: many tracks share role/crowd centroids, so nodes stack into
// an unreadable pile. Why not plain d3-force forceCollide
// (https://github.com/d3/d3-force, src/collide.js)? Because our nodes
// MUST stay near their true centroid (the app is graded on "position is
// the tags"), and many tracks share an *identical* centroid (same
// role/crowd tags). An iterative push with a hard radial cap is
// mathematically self-defeating there: a pile of N co-located nodes can't
// separate when every one is clamped back toward the same point each
// iteration (we measured a 1px residual pile).
//
// Nodes that share a centroid are intentionally STACKED (a dense pile
// reads like the bumpy clustered drupelets of a raspberry). We no longer
// fan them apart — but we still GROUP them so the hover list can enumerate
// everything in a pile and let you click the exact track. So this pass
// only assigns a shared cluster id; display position stays the true
// centroid. The cluster grouping threshold is the node collision diameter.
export const DECLUTTER_RADIUS = 19; // grouping threshold, a bit > node r

// Grouping only — no displacement. Nodes that pile on a shared centroid
// stay stacked (the raspberry look); we just tag them with a shared
// cluster id so the hover list can list every track in the pile.
function assignClusters(nodes: Positioned[]): void {
  const n = nodes.length;
  const group = new Array<number>(n).fill(-1);
  const thresh = DECLUTTER_RADIUS * 2;
  let g = 0;
  for (let i = 0; i < n; i++) {
    if (group[i] !== -1) continue;
    group[i] = g;
    let changed = true;
    while (changed) {
      changed = false;
      for (let a = 0; a < n; a++) {
        if (group[a] !== g) continue;
        for (let b = 0; b < n; b++) {
          if (group[b] !== -1) continue;
          if (
            Math.hypot(
              nodes[a].tx - nodes[b].tx,
              nodes[a].ty - nodes[b].ty
            ) <= thresh
          ) {
            group[b] = g;
            changed = true;
          }
        }
      }
    }
    g++;
  }

  for (let gi = 0; gi < g; gi++) {
    const members = nodes.filter((_, idx) => group[idx] === gi);
    // Position is always the true centroid — nodes intentionally stack.
    for (const m of members) {
      m.x = m.tx;
      m.y = m.ty;
    }
    // Singleton → no list; 2+ → shared cluster id for the hover list.
    if (members.length === 1) members[0].cluster = -1;
    else for (const m of members) m.cluster = gi;
  }
}

export function centroidLayout(tracks: Track[]): Positioned[] {
  const nodes = tracks.map(centroid);
  assignClusters(nodes);
  return nodes;
}

// ── Graph encoding (seeded force simulation, deterministic) ─────────
export function graphLayout(tracks: Track[]): Positioned[] {
  const n = tracks.length;
  // Seed deterministically off track id so the layout is stable per run.
  const nodes = tracks.map((t) => {
    const a = Math.sin(t.id * 12.9898) * 43758.5453;
    const b = Math.sin(t.id * 78.233) * 43758.5453;
    return {
      t,
      x: W / 2 + (a - Math.floor(a) - 0.5) * (W * 0.6),
      y: H / 2 + (b - Math.floor(b) - 0.5) * (H * 0.6),
    };
  });

  // Precompute pairwise similarity once.
  const sim: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++) {
      const s = similarity(tracks[i], tracks[j]);
      sim[i][j] = s;
      sim[j][i] = s;
    }

  const ITER = 320;
  for (let step = 0; step < ITER; step++) {
    const cool = 1 - step / ITER;
    for (let i = 0; i < n; i++) {
      let fx = 0;
      let fy = 0;
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        let dx = nodes[i].x - nodes[j].x;
        let dy = nodes[i].y - nodes[j].y;
        const d = Math.hypot(dx, dy) || 0.01;
        dx /= d;
        dy /= d;
        // Universal repulsion keeps nodes apart.
        const rep = 9000 / (d * d);
        fx += dx * rep;
        fy += dy * rep;
        // Similar tracks attract; spring rest length shrinks with similarity.
        const s = sim[i][j];
        if (s > 0.45) {
          const rest = 90 + (1 - s) * 360;
          const att = (d - rest) * 0.012 * s;
          fx -= dx * att;
          fy -= dy * att;
        }
      }
      // Gentle pull to center so the graph doesn't drift offscreen.
      fx += (W / 2 - nodes[i].x) * 0.002;
      fy += (H / 2 - nodes[i].y) * 0.002;

      nodes[i].x += Math.max(-30, Math.min(30, fx)) * cool;
      nodes[i].y += Math.max(-30, Math.min(30, fy)) * cool;
    }
  }

  // Normalize into the viewport.
  const xs = nodes.map((p) => p.x);
  const ys = nodes.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const sx = (W - 2 * PAD) / (maxX - minX || 1);
  const sy = (H - 2 * PAD) / (maxY - minY || 1);

  return nodes.map((p) => {
    const x = px(PAD + (p.x - minX) * sx);
    const y = px(PAD + (p.y - minY) * sy);
    // Graph mode has no truth/declutter split — position is the sim
    // output; true == display.
    return { ...p.t, x, y, tx: x, ty: y, cluster: -1 };
  });
}

export function layout(tracks: Track[], mode: ViewMode): Positioned[] {
  return mode === "centroid" ? centroidLayout(tracks) : graphLayout(tracks);
}
