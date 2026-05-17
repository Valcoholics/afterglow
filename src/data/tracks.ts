// Afterglow data model.
//
// A track is NOT a single (time, role, crowd) triple. It carries a *sparse*
// set of weighted tags on each dimension — only the values that apply, each
// with a 1-10 confidence. Absence means "not tagged," not "scored 0".
//
// Storage (this file + library.json) is deliberately separate from spatial
// encoding (src/lib/spatial.ts). This file is the source of truth; swap
// library.json and everything downstream re-derives.

import raw from "./library.json";

export type Phase =
  | "warm-up"
  | "pool-party"
  | "festival-brunch"
  | "afterglow"
  | "sunrise-reset"
  | "club"
  | "late-night-warehouse";

export type Role = "opener" | "bridge" | "reset" | "home-stretch";
export type Crowd = "arrivals" | "lock-in" | "wanderers";

export interface WeightedTag<T extends string> {
  value: T;
  confidence: number; // 1-10
}

export interface Track {
  id: number;
  artist: string;
  title: string;
  duration: string;
  genre: string;
  bpm: string;
  key: string;
  playCount: number;
  tags: {
    time: WeightedTag<Phase>[];
    role: WeightedTag<Role>[];
    crowd: WeightedTag<Crowd>[];
  };
}

// ── Per-context gradient themes ───────────────────────────────────
// Every context owns ONE coherent gradient theme so that all sub-colors
// in the grid stay within the same family:
//   • ramp   — the main 2-stop gradient (warm/cool by time of day).
//              Roles sample positions along it; the heat scale uses it.
//   • accent — a complementary hue from the theme. The Crowd axis uses
//              this so crowd facets stay distinguishable from roles
//              without leaving the theme.
type RGB = [number, number, number];
export interface Theme {
  rampLo: RGB;
  rampHi: RGB;
  accent: RGB;
}

export const THEMES: Record<Phase, Theme> = {
  // Demo context — tuned. Amber → magenta, teal accent.
  afterglow: { rampLo: [255, 176, 64], rampHi: [214, 64, 152], accent: [56, 196, 198] },
  "sunrise-reset": { rampLo: [74, 86, 196], rampHi: [120, 196, 255], accent: [255, 168, 120] },
  "warm-up": { rampLo: [120, 52, 28], rampHi: [255, 150, 56], accent: [96, 168, 220] },
  "pool-party": { rampLo: [255, 206, 84], rampHi: [64, 206, 196], accent: [232, 96, 156] },
  "festival-brunch": { rampLo: [240, 110, 170], rampHi: [255, 168, 110], accent: [110, 200, 180] },
  club: { rampLo: [122, 76, 220], rampHi: [222, 80, 168], accent: [120, 220, 180] },
  "late-night-warehouse": { rampLo: [70, 76, 102], rampHi: [150, 162, 196], accent: [196, 150, 110] },
};

export function theme(phase: Phase): Theme {
  return THEMES[phase] ?? THEMES.afterglow;
}

const rgbStr = ([r, g, b]: RGB) => `rgb(${r}, ${g}, ${b})`;
const lerp = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
];
// Scale brightness toward black for low confidence.
const dim = (c: RGB, k: number): RGB => [
  Math.round(c[0] * k),
  Math.round(c[1] * k),
  Math.round(c[2] * k),
];

// Every Time/Setting context. Afterglow is the demo context.
export const PHASES: {
  id: Phase;
  name: string;
}[] = [
  { id: "afterglow", name: "Afterglow" },
  { id: "sunrise-reset", name: "Sunrise Reset" },
  { id: "warm-up", name: "Warm-up" },
  { id: "festival-brunch", name: "Festival Brunch" },
  { id: "pool-party", name: "Pool Party" },
  { id: "club", name: "Club" },
  { id: "late-night-warehouse", name: "Late Night Warehouse" },
];

// A context only shows in the picker once it has enough real material to
// browse — derived from the data, not a hand-set flag, so it self-corrects
// as the library grows. A near-empty grid is a dead demo moment; gate it
// out until it's worth entering.
export const MIN_CORE_TO_BROWSE = 3;

export function contextIsBrowsable(phase: Phase): boolean {
  return (
    TRACKS.filter((t) => membership(t, phase) === "core").length >=
    MIN_CORE_TO_BROWSE
  );
}

// A context's representative swatch (mid-point of its ramp).
export function phaseSwatch(phase: Phase): string {
  const t = theme(phase);
  return rgbStr(lerp(t.rampLo, t.rampHi, 0.5));
}

// Roles are POSITIONS along the active context's gradient ramp.
// Opener 0% → Bridge 33% → Reset 66% → Home Stretch 100%.
export const ROLES: { id: Role; label: string; pos: number }[] = [
  { id: "opener", label: "Opener", pos: 0 },
  { id: "bridge", label: "Bridge", pos: 1 / 3 },
  { id: "reset", label: "Reset", pos: 2 / 3 },
  { id: "home-stretch", label: "Home Stretch", pos: 1 },
];

export const CROWDS: { id: Crowd; label: string; blurb: string }[] = [
  { id: "arrivals", label: "Arrivals", blurb: "Still coming in. Split focus." },
  { id: "lock-in", label: "Lock-in", blurb: "All here. Fully present." },
  { id: "wanderers", label: "Wanderers", blurb: "Present but distributed." },
];

const rolePos = (id: Role) =>
  ROLES.find((r) => r.id === id)?.pos ?? 0.5;

// A role's color WITHIN the active context theme: its gradient position,
// brightness modulated by fit confidence (8 → dim, 10 → full).
export function roleColor(id: Role, phase: Phase, conf = 10): string {
  const t = theme(phase);
  const base = lerp(t.rampLo, t.rampHi, rolePos(id));
  const k = 0.55 + 0.45 * Math.max(0, Math.min(1, (conf - 8) / 2));
  return rgbStr(dim(base, k));
}

// Crowd uses the theme's complementary ACCENT, brightness by confidence.
// Slight hue spread per crowd so the three are still tellable apart.
export function crowdColor(id: Crowd, phase: Phase, conf = 10): string {
  const t = theme(phase);
  const idx = CROWDS.findIndex((c) => c.id === id); // 0,1,2
  // Nudge the accent toward the ramp a touch, differently per crowd.
  const blended = lerp(t.accent, t.rampHi, idx * 0.16);
  const k = 0.55 + 0.45 * Math.max(0, Math.min(1, (conf - 8) / 2));
  return rgbStr(dim(blended, k));
}

// Heat ramp for the non-faceted view: the context's own gradient,
// low fit → rampLo, high fit → rampHi.
export function heat(conf: number, phase: Phase): string {
  const t = theme(phase);
  const f = Math.max(0, Math.min(1, (conf - 1) / 9));
  return rgbStr(lerp(t.rampLo, t.rampHi, f));
}

export const FACET_MATCH_THRESHOLD = 8; // a facet only counts if conf ≥ 8

export const DEFAULT_PHASE: Phase = "afterglow";

// ── Adapter ───────────────────────────────────────────────────────
// Assigns stable ids (the JSON has none) and types the raw import.
// If the JSON shape changes, this is the only place that needs to.
export const TRACKS: Track[] = (raw.tracks as Omit<Track, "id">[]).map(
  (t, i) => ({ ...t, id: i + 1 })
);

// ── Session edits (the learning loop) ─────────────────────────────
// Re-tagging is how you learn where a track belongs: change a tag, watch
// the node move, because position IS the tag centroid. Edits are a sparse
// overlay (trackId → replacement tags) held in React state only — never
// written back, so library.json stays the pristine source of truth and
// every graded run starts clean. `effectiveTracks` applies the overlay.
export type TagDim = "time" | "role" | "crowd";
export type TrackTags = Track["tags"];
export type EditMap = Record<number, TrackTags>;

export function effectiveTracks(edits: EditMap): Track[] {
  return TRACKS.map((t) =>
    edits[t.id] ? { ...t, tags: edits[t.id] } : t
  );
}

// Set one (dimension, value) to a confidence. confidence 0 removes the tag
// entirely (an absent tag ≠ a zero — see the data-model note up top), so
// this also covers "this track is no longer a Bridge at all." Returns a new
// tags object; never mutates.
export function setTag<T extends string>(
  tags: TrackTags,
  dim: TagDim,
  value: T,
  confidence: number
): TrackTags {
  const c = Math.max(0, Math.min(10, Math.round(confidence)));
  const arr = tags[dim] as WeightedTag<string>[];
  const without = arr.filter((x) => x.value !== value);
  const next =
    c === 0 ? without : [...without, { value, confidence: c }];
  return { ...tags, [dim]: next };
}

export function phaseName(id: Phase): string {
  return PHASES.find((p) => p.id === id)?.name ?? id;
}
export function roleLabel(id: Role): string {
  return ROLES.find((r) => r.id === id)?.label ?? id;
}
export function crowdLabel(id: Crowd): string {
  return CROWDS.find((c) => c.id === id)?.label ?? id;
}

// Confidence of a track for a given Time/Setting (0 if not tagged).
export function timeConfidence(t: Track, phase: Phase): number {
  return t.tags.time.find((x) => x.value === phase)?.confidence ?? 0;
}

export function roleConfidence(t: Track, role: Role): number {
  return t.tags.role.find((x) => x.value === role)?.confidence ?? 0;
}
export function crowdConfidence(t: Track, crowd: Crowd): number {
  return t.tags.crowd.find((x) => x.value === crowd)?.confidence ?? 0;
}

// Facet selection: a set of roles and/or crowds the DJ is filtering on.
export interface FacetSelection {
  roles: Role[];
  crowds: Crowd[];
}

// Match logic: OR within an axis, AND across axes, gated at ≥8.
//   (Opener OR Bridge) AND Lock-in
// An empty axis imposes no constraint. Returns false if nothing selected.
export function matchesFacets(t: Track, sel: FacetSelection): boolean {
  const hasSel = sel.roles.length > 0 || sel.crowds.length > 0;
  if (!hasSel) return false;
  const roleOk =
    sel.roles.length === 0 ||
    sel.roles.some(
      (r) => roleConfidence(t, r) >= FACET_MATCH_THRESHOLD
    );
  const crowdOk =
    sel.crowds.length === 0 ||
    sel.crowds.some(
      (c) => crowdConfidence(t, c) >= FACET_MATCH_THRESHOLD
    );
  return roleOk && crowdOk;
}

// For a matched track, the in-theme facet color + confidence that should
// drive its glow: the strongest selected facet it satisfies. The color is
// already gradient-themed for `phase` and brightness-ramped by confidence.
export function dominantFacet(
  t: Track,
  sel: FacetSelection,
  phase: Phase
): { color: string; conf: number } | null {
  let best: { color: string; conf: number } | null = null;
  for (const r of sel.roles) {
    const c = roleConfidence(t, r);
    if (c >= FACET_MATCH_THRESHOLD && (!best || c > best.conf))
      best = { color: roleColor(r, phase, c), conf: c };
  }
  for (const cr of sel.crowds) {
    const c = crowdConfidence(t, cr);
    if (c >= FACET_MATCH_THRESHOLD && (!best || c > best.conf))
      best = { color: crowdColor(cr, phase, c), conf: c };
  }
  return best;
}

// The single highest-confidence Time/Setting — drives node color.
export function dominantPhase(t: Track): Phase {
  return t.tags.time.reduce((best, x) =>
    x.confidence > best.confidence ? x : best
  ).value;
}

// Overall tagging confidence (mean across every weighted tag) — drives
// node size. More/stronger tags → bigger node.
export function meanConfidence(t: Track): number {
  const all = [...t.tags.time, ...t.tags.role, ...t.tags.crowd];
  return all.reduce((s, x) => s + x.confidence, 0) / all.length;
}

// Membership of a track in a context (the selected playlist).
//   "core"  — strong fit (confidence ≥ 8): a definitive set track
//   "edge"  — tentative fit (6–7): experimental / rediscovery
//   "out"   — not tagged, OR scored 1–5 (DJ judged it doesn't belong here)
//
// TAGGING SEMANTICS (team note): a confidence of 6–7 means "this kind of
// works here but it's a stretch" (an edge/rediscovery candidate), 8+ means
// "this is definitively a [context] track." 1–5 means "I considered it and
// it doesn't belong in this set" — treated the same as untagged ("out"), so
// a low score never masquerades as a rediscovery. Keep this in mind when
// tagging the full 150-track library so core/edge stays meaningful.
export const CORE_THRESHOLD = 8;
export const EDGE_THRESHOLD = 6;
export type Membership = "core" | "edge" | "out";

export function membership(t: Track, phase: Phase): Membership {
  const c = timeConfidence(t, phase);
  if (c >= CORE_THRESHOLD) return "core";
  if (c >= EDGE_THRESHOLD) return "edge";
  return "out"; // untagged (0) or scored 1–5
}

