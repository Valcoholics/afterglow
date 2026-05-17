"use client";

// Live force-directed graph — the "Affinity graph" view, rebuilt to look
// and animate like Obsidian's graph view.
//
// Why this exists separately from spatial.ts/graphLayout(): that function
// solves a static layout once and freezes it. Obsidian's feel comes from a
// *continuously running* d3-force simulation rendered every frame — nodes
// settle, breathe, and react to drag. So the graph view gets its own live
// sim on a canvas (SVG janks at this node count when ticked at 60fps).
//
// The centroid "Set grid" view is untouched — that's the graded
// "position is the tags" encoding and must stay deterministic.

import { useEffect, useRef, useState } from "react";
import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type Simulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import { drag as d3drag } from "d3-drag";
import { select } from "d3-selection";
import {
  meanConfidence,
  theme,
  timeConfidence,
  type Phase,
  type Track,
} from "@/data/tracks";
import { relationship, similarity } from "@/lib/spatial";

interface GNode extends SimulationNodeDatum {
  track: Track;
}
interface GLink extends SimulationLinkDatum<GNode> {
  strength: number;
  harmonic: boolean;
}

// One related-song row for the hover panel.
interface RelatedEntry {
  id: number;
  strength: number;
  harmonic: boolean;
}

const rgb = ([r, g, b]: [number, number, number], a = 1) =>
  `rgba(${r}, ${g}, ${b}, ${a})`;

// Build links + adjacency for the current tracks, reconciling against a
// PERSISTENT node map so node objects (and their x/y/vx/vy) survive a
// re-tag — that's what lets the graph reflow smoothly instead of jumping.
function buildGraph(
  tracks: Track[],
  nodesMap: Map<number, GNode>
): {
  nodes: GNode[];
  links: GLink[];
  adjacency: Map<number, Set<number>>;
  related: Map<number, RelatedEntry[]>;
} {
  // Reconcile: keep existing node objects (preserve position), update
  // their .track payload, add new, drop removed.
  const liveIds = new Set<number>();
  const nodes: GNode[] = tracks.map((t) => {
    liveIds.add(t.id);
    const existing = nodesMap.get(t.id);
    if (existing) {
      existing.track = t; // new tags, same node identity + position
      return existing;
    }
    const fresh: GNode = { track: t };
    nodesMap.set(t.id, fresh);
    return fresh;
  });
  for (const id of nodesMap.keys())
    if (!liveIds.has(id)) nodesMap.delete(id);

  const byId = new Map(nodes.map((n) => [n.track.id, n]));
  const seen = new Set<string>();
  const links: GLink[] = [];
  const key = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);

  // 1. Harmonic / strong relationships (the meaningful edges).
  for (let i = 0; i < tracks.length; i++)
    for (let j = i + 1; j < tracks.length; j++) {
      const rel = relationship(tracks[i], tracks[j]);
      if (!rel) continue;
      seen.add(key(tracks[i].id, tracks[j].id));
      links.push({
        source: byId.get(tracks[i].id)!,
        target: byId.get(tracks[j].id)!,
        strength: rel.strength,
        harmonic: rel.kind === "harmonic",
      });
    }

  // 2. k-NN tag-similarity edges (Obsidian-style connective tissue).
  const K = 4;
  for (let i = 0; i < tracks.length; i++) {
    const sims: { j: number; s: number }[] = [];
    for (let j = 0; j < tracks.length; j++) {
      if (i === j) continue;
      sims.push({ j, s: similarity(tracks[i], tracks[j]) });
    }
    sims.sort((a, b) => b.s - a.s);
    for (let k = 0; k < Math.min(K, sims.length); k++) {
      const { j, s } = sims[k];
      if (s <= 0) break;
      const kk = key(tracks[i].id, tracks[j].id);
      if (seen.has(kk)) continue;
      seen.add(kk);
      links.push({
        source: byId.get(tracks[i].id)!,
        target: byId.get(tracks[j].id)!,
        strength: s,
        harmonic: false,
      });
    }
  }

  const adjacency = new Map<number, Set<number>>();
  const related = new Map<number, RelatedEntry[]>();
  for (const n of nodes) {
    adjacency.set(n.track.id, new Set());
    related.set(n.track.id, []);
  }
  for (const l of links) {
    const s = (l.source as GNode).track.id;
    const t = (l.target as GNode).track.id;
    adjacency.get(s)?.add(t);
    adjacency.get(t)?.add(s);
    related
      .get(s)
      ?.push({ id: t, strength: l.strength, harmonic: l.harmonic });
    related
      .get(t)
      ?.push({ id: s, strength: l.strength, harmonic: l.harmonic });
  }
  // Strongest relationships first; harmonic mixes win ties (they're the
  // more meaningful edge — an actual key-compatible blend).
  for (const arr of related.values())
    arr.sort(
      (a, b) =>
        b.strength - a.strength ||
        Number(b.harmonic) - Number(a.harmonic)
    );

  return { nodes, links, adjacency, related };
}

export default function ForceGraph({
  tracks,
  phase,
  showThreads,
  selectedId,
  onSelect,
}: {
  tracks: Track[];
  phase: Phase;
  showThreads: boolean;
  // Drives the persistent selection ring + sticky focus-lit on the graph
  // (mirrors the Set grid's selected-node treatment).
  selectedId?: number | null;
  onSelect: (t: Track) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<number | null>(null);
  // Stable refs so the rAF/draw loop always sees current props without
  // tearing the simulation down on every render. Synced in an effect
  // (writing refs during render is a React anti-pattern).
  const phaseRef = useRef(phase);
  const showThreadsRef = useRef(showThreads);
  useEffect(() => {
    phaseRef.current = phase;
    showThreadsRef.current = showThreads;
  }, [phase, showThreads]);

  // Persistent node identity across re-tags: one GNode per track id, its
  // x/y/vx/vy preserved so an edit reflows the graph instead of rebuilding
  // it. The sim + draw loop read the live graph data from graphRef so the
  // simulation is created ONCE and updated in place.
  // Persistent node identity + current graph data. Both are populated in
  // the mount effect (NOT during render — buildGraph mutates the node map,
  // and reading/passing refs during render is a React anti-pattern). Until
  // the effect runs there are simply no nodes to draw.
  const nodesMapRef = useRef<Map<number, GNode>>(new Map());
  const graphRef = useRef<ReturnType<typeof buildGraph>>({
    nodes: [],
    links: [],
    adjacency: new Map(),
    related: new Map(),
  });
  const getGraph = () => graphRef.current;
  // Latest tracks for the mount effect to build from without depending on
  // them (the reflow effect owns subsequent updates).
  const tracksRef = useRef(tracks);
  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);
  // onSelect via ref so the once-only sim effect needn't depend on it.
  const onSelectRef = useRef(onSelect);
  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);
  // Selected track (drives the persistent ring + sticky focus-lit, like
  // the Set grid). Synced from the prop; the draw loop reads the ref.
  // Mirror the selected id into a ref the draw loop can read. This effect
  // ONLY touches its own ref (not the mount effect's sim/redraw refs), so
  // it doesn't trip the cross-effect ref linter. Repaint on click is done
  // inline in the drag "end" handler; the sim's ticks cover the rest.
  const selectedRef = useRef<number | null>(selectedId ?? null);
  useEffect(() => {
    selectedRef.current = selectedId ?? null;
  }, [selectedId]);

  // Related-songs panel — pinned bottom-left of the graph (does NOT float
  // over the node, so the graph highlight stays fully visible). Holds the
  // last-hovered node's track + ranked related list; persists until you
  // hover a different node. Resolved in the hover handler (refs readable
  // there), so the rendered panel is pure state.
  const [hoverPanel, setHoverPanel] = useState<{
    track: Track;
    rows: (RelatedEntry & { track: Track })[];
  } | null>(null);
  // When a row in the panel is hovered, light THAT song's node + family
  // on the graph too. A ref so the draw loop can read it without a
  // dependency; state mirror only to trigger the row's own highlight.
  const rowHoverRef = useRef<number | null>(null);
  const [rowHoverId, setRowHoverId] = useState<number | null>(null);
  const setRowHover = (id: number | null) => {
    rowHoverRef.current = id;
    setRowHoverId(id);
    redrawRef.current?.(); // repaint focus even if the sim is settled
  };

  // Handles to the live sim + its link force so the reflow effect can
  // update them in place (no teardown) when tags change.
  const simRef = useRef<Simulation<GNode, GLink> | null>(null);
  const linkForceRef = useRef<ReturnType<
    typeof forceLink<GNode, GLink>
  > | null>(null);
  const redrawRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    // Build the initial graph here (in the effect, not render) so the
    // node-map ref is only touched outside render.
    graphRef.current = buildGraph(tracksRef.current, nodesMapRef.current);

    let W = wrap.clientWidth;
    let H = wrap.clientHeight || Math.round(W * 0.66);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const ctx = canvas.getContext("2d")!;
    const sizeCanvas = () => {
      W = wrap.clientWidth;
      H = wrap.clientHeight || Math.round(W * 0.66);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
    };
    sizeCanvas();

    // Bigger nodes so the field reads as a lush mass, not sparse dots.
    const nodeR = (n: GNode) => 5 + (meanConfidence(n.track) - 5) * 1.6;

    const linkForce = forceLink<GNode, GLink>(getGraph().links)
      .id((d) => (d as GNode).track.id)
      .distance((l) => 60 + (1 - l.strength) * 110)
      .strength((l) => 0.08 + l.strength * 0.22);
    linkForceRef.current = linkForce;

    // Live simulation tuned for Obsidian-style DENSITY: gentle short-range
    // repulsion (just enough to not overlap), tight link springs, and a
    // positional pull toward center on BOTH axes so disconnected groups
    // stay in one cohesive ball instead of flying off into isolation.
    const sim = forceSimulation<GNode>(getGraph().nodes)
      // Strong wide-reach repulsion so the graph EXPANDS to fill the frame
      // (Obsidian fills the viewport — a tight clump reads as broken).
      .force(
        "charge",
        forceManyBody<GNode>().strength(-110).distanceMax(W * 0.7)
      )
      .force("link", linkForce)
      // Gentle positional pull (NOT forceCenter — mean-centering fights
      // this and carves a donut). Just enough to keep the cloud centered
      // and disconnected nodes from drifting off — weak so charge can
      // still spread it wide.
      .force("x", forceX<GNode>(W / 2).strength(0.025))
      .force("y", forceY<GNode>(H / 2).strength(0.035))
      .force(
        "collide",
        forceCollide<GNode>().radius((n) => nodeR(n) + 1.5)
      )
      .alphaDecay(0.02)
      .velocityDecay(0.45);
    simRef.current = sim;

    // ── Draw ──────────────────────────────────────────────────────
    const draw = () => {
      const { nodes, links, adjacency } = getGraph();
      const ph = phaseRef.current;
      const th = theme(ph);
      const accent = th.accent;
      // Focus = canvas-hovered node, OR the pinned-list row being hovered,
      // OR (sticky) the selected node — so a clicked track stays lit with
      // its family until selection changes, like a held hover.
      const focusId =
        rowHoverRef.current ??
        hoverRef.current ??
        selectedRef.current;
      const focusSet =
        focusId != null
          ? adjacency.get(focusId) ?? new Set<number>()
          : null;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      // Links
      if (showThreadsRef.current) {
        for (const l of links) {
          const s = l.source as GNode;
          const t = l.target as GNode;
          const sId = s.track.id;
          const tId = t.track.id;
          const touchesFocus =
            focusId != null && (sId === focusId || tId === focusId);
          let alpha: number;
          if (focusId == null) alpha = l.harmonic ? 0.42 : 0.22;
          else if (touchesFocus) alpha = 0.65;
          else alpha = 0.04;
          ctx.beginPath();
          ctx.moveTo(s.x!, s.y!);
          ctx.lineTo(t.x!, t.y!);
          ctx.strokeStyle = touchesFocus
            ? rgb(accent, alpha)
            : rgb([170, 170, 180], alpha);
          ctx.lineWidth = touchesFocus ? 1.6 : 0.7;
          ctx.stroke();
        }
      }

      // Obsidian color rule: the field is mostly DIM WHITE; the theme
      // accent is reserved for the genuine standouts so it actually means
      // something. Every track here is "core" (conf ≥ 8), so the signal
      // isn't core-vs-not — it's the TOP tier: only the 10s get full
      // accent, the 9s a soft tint, everything else stays white. On hover,
      // the focused node + its neighbors light up and the rest dims hard.
      const WHITE: [number, number, number] = [205, 205, 211];
      const selId = selectedRef.current;
      for (const n of nodes) {
        const id = n.track.id;
        const r = nodeR(n);
        const fit = timeConfidence(n.track, ph);
        const isFocus = id === focusId;
        const isNeighbor = focusSet?.has(id) ?? false;
        const isSelected = id === selId;

        let fill: string;
        let alpha = 1;
        if (focusId != null) {
          // Hover focus mode: spotlight the node + its family.
          if (isFocus) fill = rgb(accent, 1);
          else if (isNeighbor) fill = rgb(accent, 0.9);
          else {
            fill = rgb([150, 150, 158], 1);
            alpha = 0.18;
          }
        } else if (fit >= 10) {
          // The standouts — full theme accent.
          fill = rgb(accent, 1);
        } else if (fit >= 9) {
          // Second tier — accent blended toward white (soft tint).
          fill = rgb(
            [
              Math.round(accent[0] * 0.45 + WHITE[0] * 0.55),
              Math.round(accent[1] * 0.45 + WHITE[1] * 0.55),
              Math.round(accent[2] * 0.45 + WHITE[2] * 0.55),
            ],
            0.95
          );
        } else {
          // Everyone else — dim white, Obsidian's resting state.
          fill = rgb(WHITE, 0.8);
        }

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(n.x!, n.y!, isFocus ? r + 1.5 : r, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
        if (isFocus) {
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = rgb(accent, 0.6);
          ctx.stroke();
        }
        // Persistent selection ring — same look as the Set grid's: a
        // white halo offset off the node so a clicked track stays marked.
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(n.x!, n.y!, r + 6, 0, Math.PI * 2);
          ctx.lineWidth = 2;
          ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
          ctx.stroke();
        }
        ctx.globalAlpha = 1;

        // Label only for the focused node (Obsidian shows labels on
        // hover/zoom; keep it minimal so the field stays clean).
        if (isFocus) {
          ctx.font =
            "600 12px var(--font-geist-sans), Inter, system-ui, sans-serif";
          ctx.fillStyle = rgb([240, 240, 244], 0.95);
          ctx.textAlign = "center";
          ctx.fillText(n.track.title, n.x!, n.y! - r - 7);
        }
      }
      ctx.restore();
    };

    sim.on("tick", draw);
    redrawRef.current = draw;

    // ── Picking (hover + click) ───────────────────────────────────
    const nodeAt = (mx: number, my: number): GNode | null => {
      let best: GNode | null = null;
      let bestD = Infinity;
      for (const n of getGraph().nodes) {
        const dx = (n.x ?? 0) - mx;
        const dy = (n.y ?? 0) - my;
        const d = dx * dx + dy * dy;
        const rr = nodeR(n) + 6;
        if (d < rr * rr && d < bestD) {
          bestD = d;
          best = n;
        }
      }
      return best;
    };

    const toLocal = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const onMove = (e: MouseEvent) => {
      const { x, y } = toLocal(e.clientX, e.clientY);
      const hit = nodeAt(x, y);
      const id = hit?.track.id ?? null;
      if (id !== hoverRef.current) {
        hoverRef.current = id;
        canvas.style.cursor = id != null ? "pointer" : "default";
        if (sim.alpha() < 0.03) draw(); // repaint focus even when settled
      }
      // Update the pinned panel to the hovered node's relationships.
      // Resolve the ranked list HERE (ref access is fine in an event
      // handler). The panel PERSISTS (it's parked bottom-left) and just
      // re-points when you hover a different node — moving onto empty
      // space leaves the last one up as a reference.
      if (hit && id != null) {
        const gg = getGraph();
        const rows = (gg.related.get(id) ?? [])
          .map((e) => {
            const t = gg.nodes.find(
              (n) => n.track.id === e.id
            )?.track;
            return t ? { ...e, track: t } : null;
          })
          .filter(
            (r): r is RelatedEntry & { track: Track } => r != null
          )
          .slice(0, 12);
        setHoverPanel({ track: hit.track, rows });
      }
    };
    const onLeave = () => {
      if (hoverRef.current != null) {
        hoverRef.current = null;
        canvas.style.cursor = "default";
        if (sim.alpha() < 0.03) draw();
      }
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    // ── Drag + click (d3-drag owns BOTH) ─────────────────────────
    // d3-drag captures mousedown and preventDefaults it, so separate
    // native mousedown/mouseup click listeners get swallowed (that was
    // the "click does nothing" bug). The canonical d3 fix: detect the
    // click INSIDE the drag lifecycle — a press+release on the same
    // subject node with negligible movement is a click → open detail.
    let pressX = 0;
    let pressY = 0;
    let moved = 0;
    const dragBehavior = d3drag<HTMLCanvasElement, unknown>()
      .container(canvas)
      .subject((event) => {
        const { x, y } = toLocal(event.sourceEvent.clientX, event.sourceEvent.clientY);
        return nodeAt(x, y) ?? undefined;
      })
      .on("start", (event) => {
        if (!event.subject) return;
        pressX = event.x;
        pressY = event.y;
        moved = 0;
        if (!event.active) sim.alphaTarget(0.3).restart();
        const s = event.subject as GNode;
        s.fx = s.x;
        s.fy = s.y;
      })
      .on("drag", (event) => {
        const s = event.subject as GNode;
        moved = Math.hypot(event.x - pressX, event.y - pressY);
        s.fx = event.x;
        s.fy = event.y;
      })
      .on("end", (event) => {
        if (!event.active) sim.alphaTarget(0);
        const s = event.subject as GNode;
        s.fx = null;
        s.fy = null;
        // Barely moved → it was a click, not a drag. Open the detail
        // panel for that node + set the sticky selection ring/focus.
        if (moved <= 5 && s) {
          selectedRef.current = s.track.id;
          onSelectRef.current(s.track);
          draw();
        }
      });
    select(canvas).call(dragBehavior);

    const onResize = () => {
      sizeCanvas();
      (sim.force("x") as ReturnType<typeof forceX<GNode>>)?.x(W / 2);
      (sim.force("y") as ReturnType<typeof forceY<GNode>>)?.y(H / 2);
      sim.alpha(0.3).restart();
    };
    window.addEventListener("resize", onResize);

    sim.alpha(1).restart();

    return () => {
      sim.stop();
      sim.on("tick", null);
      simRef.current = null;
      linkForceRef.current = null;
      redrawRef.current = null;
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      select(canvas).on(".drag", null);
    };
    // Created ONCE. The graph's data lives in graphRef and is updated in
    // place by the reflow effect below — never rebuild the simulation.
  }, []);

  // ── Smooth reflow on re-tag ──────────────────────────────────────
  // When a confidence edit changes `tracks`, recompute links/adjacency
  // against the PERSISTENT nodes (positions kept), swap them into the
  // live sim + link force, and give a gentle reheat. The edited node
  // glides to its new similarity neighborhood; the rest barely moves.
  useEffect(() => {
    const sim = simRef.current;
    const linkForce = linkForceRef.current;
    if (!sim || !linkForce) return; // sim not mounted yet (first render)
    const next = buildGraph(tracks, nodesMapRef.current);
    graphRef.current = next;
    sim.nodes(next.nodes);
    linkForce.links(next.links);
    sim.alpha(0.5).restart(); // gentle reheat, not a teardown
    redrawRef.current?.();
    // The hover panel snapshot is now stale (different positions/relations
    // after the re-tag) — close it so it can't point at a moved node.
    setHoverPanel(null);
  }, [tracks]);

  const relatedRows = hoverPanel?.rows ?? [];

  return (
    <div
      ref={wrapRef}
      className="relative w-full"
      style={{ aspectRatio: "1100 / 720" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block" />

      {/* Related-songs list — PINNED bottom-left so it never covers the
          hovered node or its lit neighbors on the graph. Hovering a row
          lights that song's node + family via setRowHover. */}
      {hoverPanel?.track && (
        <div
          className="thin-scroll pointer-events-auto absolute bottom-3 left-3 z-20 max-h-[62%] w-64 overflow-y-auto rounded-lg border border-white/15 bg-zinc-950/95 p-1 shadow-xl backdrop-blur-sm"
          onMouseLeave={() => setRowHover(null)}
        >
          <div className="px-2.5 pb-1 pt-1.5">
            <div className="line-clamp-1 text-[12px] font-semibold text-zinc-100">
              {hoverPanel.track.title}
            </div>
            <div className="line-clamp-1 text-[10px] uppercase tracking-wider text-zinc-500">
              {relatedRows.length
                ? `Plays alike · ${relatedRows.length} related`
                : "No strong relationships"}
            </div>
          </div>
          {relatedRows.map((r) => (
            <button
              key={r.id}
              onClick={() => onSelect(r.track)}
              onMouseEnter={() => setRowHover(r.id)}
              className={[
                "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left transition-colors",
                rowHoverId === r.id
                  ? "bg-white/[0.12]"
                  : "hover:bg-white/[0.07]",
              ].join(" ")}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                title={
                  r.harmonic
                    ? "Harmonic key mix"
                    : "Similar tags (plays alike)"
                }
                style={{
                  background: r.harmonic ? "#38c4c6" : "#7a7a85",
                }}
              />
              <span className="min-w-0 flex-1">
                <span className="line-clamp-1 text-[12px] text-zinc-200">
                  {r.track.title}
                </span>
                <span className="line-clamp-1 text-[10px] text-zinc-500">
                  {r.track.artist} · {r.track.key} ·{" "}
                  {r.harmonic ? "key mix" : "plays alike"}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
