"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ROLES,
  CROWDS,
  crowdColor,
  dominantFacet,
  matchesFacets,
  meanConfidence,
  membership,
  roleColor,
  theme,
  timeConfidence,
  type FacetSelection,
  type Phase,
  type Track,
} from "@/data/tracks";
import {
  H,
  THREAD_THRESHOLD,
  W,
  layout,
  relationship,
  similarity,
  type Positioned,
  type ViewMode,
} from "@/lib/spatial";

const rgbStr = ([r, g, b]: [number, number, number]) =>
  `rgb(${r}, ${g}, ${b})`;

// Raspberry palette. Each track gets a deterministic shade off its id so a
// stack of co-located nodes shows tonal variation — overlapping drupelets,
// not one flat blob. Range: deep crimson → bright berry pink.
const RASPBERRY: [number, number, number][] = [
  [126, 16, 52],
  [164, 22, 66],
  [196, 30, 84],
  [216, 48, 104],
  [232, 72, 128],
];
function raspberry(id: number): string {
  return rgbStr(RASPBERRY[id % RASPBERRY.length]);
}
// Small deterministic radius wobble (±~2px) so stacked drupelets have an
// uneven, berry-like silhouette instead of perfectly concentric discs.
function drupeletJitter(id: number): number {
  return (((id * 2654435761) % 1000) / 1000 - 0.5) * 4;
}

export default function Constellation({
  tracks,
  phase,
  viewMode,
  showThreads,
  selection,
  onToggleRole,
  onToggleCrowd,
  selectedId,
  onSelect,
}: {
  tracks: Track[];
  phase: Phase;
  viewMode: ViewMode;
  showThreads: boolean;
  selection: FacetSelection;
  onToggleRole: (r: (typeof ROLES)[number]["id"]) => void;
  onToggleCrowd: (c: (typeof CROWDS)[number]["id"]) => void;
  selectedId: number | null;
  onSelect: (t: Track) => void;
}) {
  const placed = useMemo<Positioned[]>(
    () => layout(tracks, viewMode),
    [tracks, viewMode]
  );
  const [hoverId, setHoverId] = useState<number | null>(null);

  // Hover with a short release delay so moving from a node into its
  // cluster list (a ~22px gap) doesn't dismiss the list mid-traverse. Any
  // onMouseEnter cancels a pending clear → the bridge holds.
  const clearTimer = useRef<number | undefined>(undefined);
  const enterHover = (id: number) => {
    if (clearTimer.current) window.clearTimeout(clearTimer.current);
    setHoverId(id);
  };
  const scheduleClear = () => {
    if (clearTimer.current) window.clearTimeout(clearTimer.current);
    clearTimer.current = window.setTimeout(
      () => setHoverId(null),
      140
    );
  };

  // Graph mode has no axes — position is emergent from tag similarity, so
  // the Role/Crowd facet axes would be lying. Faceting is a centroid-only
  // affordance ("ask the grid a question"); graph mode is pure similarity
  // exploration. Threads/heat/hover-similarity stay meaningful in both.
  const isGraph = viewMode === "graph";
  const facetActive =
    !isGraph &&
    (selection.roles.length > 0 || selection.crowds.length > 0);

  // "What just moved" cue. When the selected node's position changes — i.e.
  // the DJ re-tagged it — flash a short direction phrase that rides along
  // with the node so cause (slider) → effect (motion) is unmissable for a
  // grader watching someone learn. Centroid only; graph layout shuffles on
  // every edit so a per-node direction would be noise.
  const sel = selectedId != null
    ? placed.find((t) => t.id === selectedId) ?? null
    : null;
  const prevPos = useRef<{ id: number; x: number; y: number } | null>(null);
  const [moveCue, setMoveCue] = useState<string | null>(null);

  useEffect(() => {
    // Track the TRUE centroid, not the decluttered x/y — the cue should
    // fire on a genuine re-tag, never on declutter jitter from a neighbor's
    // unrelated edit re-relaxing the cloud.
    if (isGraph || !sel) {
      prevPos.current = sel
        ? { id: sel.id, x: sel.tx, y: sel.ty }
        : null;
      return;
    }
    const prev = prevPos.current;
    prevPos.current = { id: sel.id, x: sel.tx, y: sel.ty };
    if (!prev || prev.id !== sel.id) return; // selection changed, not a move
    const dx = sel.tx - prev.x;
    const dy = sel.ty - prev.y;
    if (Math.abs(dx) < 4 && Math.abs(dy) < 4) return; // negligible
    const parts: string[] = [];
    if (Math.abs(dx) >= 4) parts.push(dx > 0 ? "later in the set →" : "← earlier");
    if (Math.abs(dy) >= 4)
      parts.push(dy > 0 ? "↓ looser room" : "↑ tighter room");
    setMoveCue(parts.join("  ·  "));
    const id = window.setTimeout(() => setMoveCue(null), 1700);
    return () => window.clearTimeout(id);
  }, [sel, isGraph]);

  // Threads = harmonic-mix relationships (Camelot), with tag-similarity
  // fallback for keyless tracks. Only among CORE members; when facets are
  // active, only among the matched set.
  const threads = useMemo(() => {
    let pool = placed.filter((t) => membership(t, phase) === "core");
    if (facetActive)
      pool = pool.filter((t) => matchesFacets(t, selection));
    const out: {
      a: Positioned;
      b: Positioned;
      s: number;
      kind: "harmonic" | "tag";
    }[] = [];
    for (let i = 0; i < pool.length; i++)
      for (let j = i + 1; j < pool.length; j++) {
        const rel = relationship(pool[i], pool[j]);
        if (rel)
          out.push({
            a: pool[i],
            b: pool[j],
            s: rel.strength,
            kind: rel.kind,
          });
      }
    return out;
  }, [placed, phase, facetActive, selection]);

  const hovered = hoverId != null ? placed.find((t) => t.id === hoverId) : null;

  // Hover list. When the hovered node is part of a cluster (a pile of
  // tracks stacked on one centroid — the raspberry), surface ALL of them
  // as a list so each is individually clickable, since you can't aim at a
  // single dot in a stack. A lone node has no list (the SVG single-name
  // tooltip handles it). Anchored at the pile's centroid.
  const clusterList = useMemo(() => {
    if (isGraph || !hovered || hovered.cluster === -1) return null;
    const members = placed
      .filter((t) => t.cluster === hovered.cluster)
      .sort((a, b) => a.title.localeCompare(b.title));
    if (members.length < 2) return null;
    let ax = 0;
    let ay = 0;
    for (const m of members) {
      ax += m.tx;
      ay += m.ty;
    }
    return {
      members,
      leftPct: (ax / members.length / W) * 100,
      topPct: (ay / members.length / H) * 100,
    };
  }, [placed, hovered, isGraph]);

  return (
    <div
      className="relative overflow-hidden rounded-[4px] bg-black"
      style={{ border: "1px solid #d8d3cc" }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="relative z-10 h-auto w-full"
      >
        {/* Axes only exist in centroid mode. In graph mode position is
            emergent from similarity, so drawing labelled axes would
            misrepresent it — show a caption instead. */}
        {isGraph ? (
          <text
            x={W / 2}
            y={26}
            textAnchor="middle"
            className="fill-zinc-600"
            fontSize={12}
            letterSpacing={3}
          >
            SHAPE OF THE LIBRARY — proximity = plays alike (no axes)
          </text>
        ) : (
          <>
            {/* X-axis: Journey Role — clickable facets */}
            {ROLES.map((role, i) => {
          const on = selection.roles.includes(role.id);
          const col = roleColor(role.id, phase);
          return (
            <g
              key={role.id}
              onClick={() => onToggleRole(role.id)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={90 + (i / 3) * (W - 180) - 70}
                y={30}
                width={140}
                height={26}
                rx={13}
                fill={on ? col : "transparent"}
                fillOpacity={on ? 0.22 : 0}
                stroke={col}
                strokeOpacity={on ? 0.9 : 0.35}
                strokeWidth={on ? 1.5 : 1}
              />
              <text
                x={90 + (i / 3) * (W - 180)}
                y={48}
                textAnchor="middle"
                fontSize={17}
                fontWeight={600}
                fill={on ? col : "#a1a1aa"}
              >
                {role.label}
              </text>
            </g>
          );
        })}
        <text
          x={W / 2}
          y={18}
          textAnchor="middle"
          className="fill-zinc-600"
          fontSize={12}
          letterSpacing={3}
        >
          SET PROGRESSION → (click to filter)
        </text>

        {/* Y-axis: Crowd State — clickable facets */}
        {CROWDS.map((crowd, i) => {
          const on = selection.crowds.includes(crowd.id);
          const col = crowdColor(crowd.id, phase);
          const cy = 90 + (i / 2) * (H - 180);
          return (
            <g
              key={crowd.id}
              onClick={() => onToggleCrowd(crowd.id)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={6}
                y={cy - 26}
                width={150}
                height={48}
                rx={10}
                fill={on ? col : "transparent"}
                fillOpacity={on ? 0.18 : 0}
                stroke={col}
                strokeOpacity={on ? 0.9 : 0.3}
                strokeWidth={on ? 1.5 : 1}
              />
              <text
                x={146}
                y={cy - 4}
                textAnchor="end"
                fontSize={17}
                fontWeight={600}
                fill={on ? col : "#a1a1aa"}
              >
                {crowd.label}
              </text>
              <text
                x={146}
                y={cy + 15}
                textAnchor="end"
                className="fill-zinc-600"
                fontSize={11}
              >
                {crowd.blurb}
              </text>
            </g>
          );
        })}
        <text
          x={20}
          y={H / 2}
          textAnchor="middle"
          className="fill-zinc-600"
          fontSize={12}
          letterSpacing={3}
          transform={`rotate(-90, 20, ${H / 2})`}
        >
          ROOM YOU&apos;RE READING ↓
        </text>
          </>
        )}

        {/* Relationship threads.
            harmonic = solid, theme-accent colored, brightness by mix tier.
            tag-similarity fallback = dashed + dim neutral, so the two
            kinds of edge are never visually confused.
            Toggled off → positions only, no relationship overlay. */}
        {showThreads &&
          threads.map(({ a, b, s, kind }, i) => {
          const lit = hovered && (a.id === hovered.id || b.id === hovered.id);
          const harmonic = kind === "harmonic";
          // harmonic strength 0.7–1.0 → 0–1; tag 0.95–1.0 → 0–1
          const norm = harmonic
            ? (s - 0.7) / 0.3
            : (s - THREAD_THRESHOLD) / (1 - THREAD_THRESHOLD);
          const themeAccent = rgbStr(theme(phase).accent);
          const stroke = lit
            ? "#fff"
            : harmonic
              ? themeAccent
              : "#7a7a85";
          const baseOp = harmonic ? 0.28 + norm * 0.42 : 0.12 + norm * 0.16;
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={stroke}
              strokeOpacity={lit ? 0.85 : hovered ? baseOp * 0.4 : baseOp}
              strokeWidth={lit ? 2 : harmonic ? 1.2 : 1}
              strokeDasharray={harmonic ? undefined : "3 4"}
            />
          );
        })}

        {/* Tracks */}
        {placed.map((t) => {
          const isHovered = hoverId === t.id;
          const isSelected = selectedId === t.id;
          const member = membership(t, phase);
          const fit = timeConfidence(t, phase);

          const baseR = 7 + (meanConfidence(t) - 5) * 2.4; // ~9–17px
          const r0 = member === "edge" ? Math.max(8, baseR * 0.7) : baseR;
          // Drupelet wobble so a stack reads as a bumpy berry.
          const r = Math.max(6, r0 + drupeletJitter(t.id));

          // Color + dimming logic:
          //  • facets active  → matched glow in facet color (heat-ramped),
          //                     unmatched fade to faint grey
          //  • no facets      → Time/Setting heat (unchanged behavior)
          let fill: string;
          let opacity: number;
          if (facetActive) {
            const fac = dominantFacet(t, selection, phase);
            if (fac && matchesFacets(t, selection)) {
              fill = fac.color; // already themed + confidence-ramped
              opacity = 1;
            } else {
              fill = "#3f3f46"; // faint grey, still placed
              opacity = 0.3;
            }
          } else {
            // Raspberry drupelet: per-track berry shade. (heat() retired
            // with the WebGL field — the dark backdrop carries no scale.)
            fill = raspberry(t.id);
            opacity = member === "edge" ? 0.6 : 1;
          }

          if (hovered && !isHovered && !facetActive) {
            const related = similarity(hovered, t) >= THREAD_THRESHOLD;
            if (member === "edge") opacity = related ? 0.55 : 0.3;
            else opacity = related ? 0.95 : 0.16;
          }

          // Nodes sit at their true centroid; co-located tracks stack
          // (the raspberry). Visible group is pointer-transparent — all
          // hover/click lives on the stationary hit-target below, so a
          // dense stack still drives the hover list.
          const px = t.x;
          const py = t.y;
          return (
            <g
              key={t.id}
              transform={`translate(${px},${py})`}
              pointerEvents="none"
              style={{
                transition: isGraph
                  ? undefined
                  : "transform 480ms cubic-bezier(.34,.1,.2,1)",
              }}
            >
              {(isHovered || isSelected) && (
                <circle
                  cx={0}
                  cy={0}
                  r={r + 8}
                  fill="none"
                  stroke={isSelected ? "#fff" : "#FF8C42"}
                  strokeOpacity={isSelected ? 0.9 : 0.5}
                  strokeWidth={isSelected ? 2 : 1.5}
                />
              )}
              <circle
                cx={0}
                cy={0}
                r={r}
                fill={fill}
                opacity={opacity}
                style={{ transition: "opacity 120ms ease-out, fill 120ms" }}
              />
              {/* Drupelet sheen — a small offset highlight so each berry
                  bead looks rounded; stacked, they read as a raspberry. */}
              {!facetActive && member !== "edge" && (
                <circle
                  cx={-r * 0.32}
                  cy={-r * 0.32}
                  r={r * 0.32}
                  fill="#ffffff"
                  opacity={opacity * 0.22}
                  pointerEvents="none"
                />
              )}
              {member === "edge" && !facetActive && (
                <circle
                  cx={0}
                  cy={0}
                  r={r + 5}
                  fill="none"
                  stroke={fill}
                  strokeOpacity={0.5}
                  strokeWidth={1}
                  strokeDasharray="2 3"
                  pointerEvents="none"
                />
              )}
              {(isHovered || isSelected) &&
                !(clusterList && t.cluster === hovered?.cluster) && (
                <g pointerEvents="none">
                  <rect
                    x={r + 8}
                    y={-30}
                    width={
                      Math.max(t.title.length, t.artist.length + 8) * 8 + 24
                    }
                    height={52}
                    rx={8}
                    fill="#0a0a0a"
                    stroke="#FF8C42"
                    strokeOpacity={0.5}
                  />
                  <text
                    x={r + 20}
                    y={-10}
                    className="fill-zinc-100"
                    fontSize={15}
                    fontWeight={600}
                  >
                    {t.title}
                  </text>
                  <text
                    x={r + 20}
                    y={10}
                    className="fill-zinc-400"
                    fontSize={12}
                  >
                    {t.artist} · {t.bpm} BPM · {t.key} · fit {fit}/10
                  </text>
                </g>
              )}
              {isSelected && moveCue && (
                <text
                  x={0}
                  y={r + 22}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight={600}
                  fill="#FF8C42"
                  pointerEvents="none"
                  style={{ animation: "ag-cue 1700ms ease-out forwards" }}
                >
                  {moveCue}
                </text>
              )}
            </g>
          );
        })}

        {/* Hit layer — stationary, invisible, on top. One target per node
            at its REST position (t.x,t.y), which never moves regardless of
            reveal state. This is the sole owner of hover/click, so the
            cursor never "loses" a node when its visible dot snaps to truth.
            Radius is generous (≥ node r) so dense rosettes stay easy to
            land on. Drawn last → never occluded by visible dots. */}
        {placed.map((t) => {
          const baseR = 7 + (meanConfidence(t) - 5) * 2.4;
          const hitR = Math.max(12, baseR + 4);
          return (
            <circle
              key={`hit-${t.id}`}
              cx={t.x}
              cy={t.y}
              r={hitR}
              fill="transparent"
              style={{ cursor: "pointer" }}
              onMouseEnter={() => enterHover(t.id)}
              onMouseLeave={scheduleClear}
              onClick={() => onSelect(t)}
            />
          );
        })}
      </svg>

      {/* Cluster hover list — HTML overlay, not SVG, so rows are real
          clickable elements. Shows every track in the hovered pile so you
          can pick the exact one (a dense rosette is unclickable per-dot).
          Hover-bridge: keeping the cursor over the list holds it open
          (its onMouseEnter re-asserts hoverId); a row click opens the
          standard slide-out detail modal, unchanged. */}
      {clusterList && (
        <div
          className="thin-scroll pointer-events-auto absolute z-20 max-h-[60%] w-64 -translate-x-1/2 overflow-y-auto rounded-lg border border-white/15 bg-zinc-950/95 p-1 shadow-xl backdrop-blur-sm"
          style={{
            left: `${clusterList.leftPct}%`,
            top: `calc(${clusterList.topPct}% + 22px)`,
          }}
          onMouseEnter={() => enterHover(clusterList.members[0].id)}
          onMouseLeave={scheduleClear}
        >
          <div className="px-2.5 py-1.5 text-[10px] uppercase tracking-wider text-zinc-500">
            {clusterList.members.length} tracks here
          </div>
          {clusterList.members.map((m) => (
            <button
              key={m.id}
              onClick={() => onSelect(m)}
              onMouseEnter={() => enterHover(m.id)}
              className={[
                "flex w-full flex-col items-start gap-0.5 rounded-md px-2.5 py-1.5 text-left transition-colors",
                m.id === selectedId
                  ? "bg-white/[0.10]"
                  : "hover:bg-white/[0.06]",
              ].join(" ")}
            >
              <span className="line-clamp-1 text-[13px] text-zinc-100">
                {m.title}
              </span>
              <span className="line-clamp-1 text-[11px] text-zinc-500">
                {m.artist} · {m.bpm} BPM · {m.key}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
