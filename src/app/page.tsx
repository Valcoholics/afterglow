"use client";

import { useCallback, useMemo, useState } from "react";
import TaggingFlow from "@/components/TaggingFlow";
import PlaylistPicker from "@/components/Timeline";
import Constellation from "@/components/Constellation";
import TrackDetail from "@/components/TrackDetail";
import type { ViewMode } from "@/lib/spatial";
import {
  CROWDS,
  DEFAULT_PHASE,
  ROLES,
  crowdColor,
  effectiveTracks,
  matchesFacets,
  membership,
  phaseName,
  roleColor,
  type Crowd,
  type EditMap,
  type FacetSelection,
  type Phase,
  type Role,
  type TrackTags,
} from "@/data/tracks";

// The app is a two-stage experience. Stage 1 ("flow") is the light paper
// tagging flow — it gates the app and is where a DJ preps their library.
// Stage 2 ("constellation") is the spatial visualization. The flow's arrow
// jumps straight here; the graph always renders the bundled library.json.
type Stage = "flow" | "constellation";

export default function Home() {
  const [stage, setStage] = useState<Stage>("flow");

  const [phase, setPhase] = useState<Phase>(DEFAULT_PHASE);
  // Affinity graph is the default view; the Set grid tab is still there
  // to switch into.
  const [viewMode, setViewMode] = useState<ViewMode>("graph");
  const [showThreads, setShowThreads] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [edits, setEdits] = useState<EditMap>({});
  const [selection, setSelection] = useState<FacetSelection>({
    roles: [],
    crowds: [],
  });

  // Single source of truth: tracks with the session edit overlay applied.
  const tracks = useMemo(() => effectiveTracks(edits), [edits]);
  const selected = useMemo(
    () => tracks.find((t) => t.id === selectedId) ?? null,
    [tracks, selectedId]
  );

  const playlist = useMemo(
    () => tracks.filter((t) => membership(t, phase) !== "out"),
    [tracks, phase]
  );
  const coreCount = useMemo(
    () => playlist.filter((t) => membership(t, phase) === "core").length,
    [playlist, phase]
  );

  const editTags = useCallback(
    (id: number, tags: TrackTags) =>
      setEdits((e) => ({ ...e, [id]: tags })),
    []
  );
  const resetEdits = useCallback(() => setEdits({}), []);
  const editCount = Object.keys(edits).length;

  const toggleRole = useCallback((r: Role) => {
    setSelection((s) => ({
      ...s,
      roles: s.roles.includes(r)
        ? s.roles.filter((x) => x !== r)
        : [...s.roles, r],
    }));
  }, []);
  const toggleCrowd = useCallback((c: Crowd) => {
    setSelection((s) => ({
      ...s,
      crowds: s.crowds.includes(c)
        ? s.crowds.filter((x) => x !== c)
        : [...s.crowds, c],
    }));
  }, []);
  const clearFacets = useCallback(
    () => setSelection({ roles: [], crowds: [] }),
    []
  );

  const facetActive =
    viewMode === "centroid" &&
    (selection.roles.length > 0 || selection.crowds.length > 0);
  const matchCount = useMemo(
    () =>
      facetActive
        ? playlist.filter(
            (t) =>
              membership(t, phase) === "core" &&
              matchesFacets(t, selection)
          ).length
        : 0,
    [playlist, phase, selection, facetActive]
  );

  // ── Stage 1: the light tagging flow ─────────────────────────────
  if (stage === "flow") {
    return (
      <main
        className="min-h-screen px-4 py-3"
        style={{ background: "#f8f7f5", color: "#1a1a1a", lineHeight: 1.3 }}
      >
        <TaggingFlow onEnterConstellation={() => setStage("constellation")} />
      </main>
    );
  }

  // ── Stage 2: the constellation (light chrome, dark plot inset) ──
  return (
    <main
      className="min-h-screen"
      style={{ background: "#f8f7f5", color: "#1a1a1a" }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-10">
        <header className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight">
              Afterglow{" "}
              <span style={{ color: "#888" }}>· spatial DJ library</span>
            </h1>
            <p
              className="max-w-2xl text-sm"
              style={{ color: "#666" }}
            >
              Open a track and drag its confidence sliders. The node moves
              because{" "}
              <span style={{ color: "#1a1a1a" }} className="font-medium">
                position is the tags
              </span>{" "}
              — X is the role centroid, Y is the crowd centroid. Predict where
              it&apos;ll go before you let go.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {editCount > 0 && (
              <button
                onClick={resetEdits}
                className="rounded-[3px] px-3 py-1.5 text-xs font-medium transition-colors"
                style={{
                  background: "#fff",
                  color: "#1a1a1a",
                  border: "1px solid #d8d3cc",
                }}
              >
                Reset edits ({editCount}) ↺
              </button>
            )}
            <button
              onClick={() => setStage("flow")}
              className="rounded-[3px] px-3 py-1.5 text-xs font-medium transition-colors"
              style={{
                background: "#fff",
                color: "#1a1a1a",
                border: "1px solid #d8d3cc",
              }}
            >
              ← Tagging
            </button>
          </div>
        </header>

        <PlaylistPicker selected={phase} onSelect={setPhase} />

        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <h2
                className="text-sm font-bold uppercase tracking-[0.2em]"
                style={{ color: "#666" }}
              >
                {phaseName(phase)} set
              </h2>
              <span className="text-xs" style={{ color: "#888" }}>
                {viewMode === "graph"
                  ? `${coreCount} core · clustered by what plays alike · hover a node to trace its family`
                  : facetActive
                    ? `${matchCount} match${matchCount === 1 ? "" : "es"} of ${coreCount} core`
                    : `${coreCount} core · ${playlist.length - coreCount} edge · hover for relationships · click for detail`}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {facetActive && (
                <button
                  onClick={clearFacets}
                  className="rounded-[3px] px-3 py-1 text-xs font-medium"
                  style={{
                    background: "#fff",
                    color: "#1a1a1a",
                    border: "1px solid #d8d3cc",
                  }}
                >
                  Clear filters ✕
                </button>
              )}
              {/* Same data, two questions. Centroid: "where does this
                  belong in a set?" Graph: "what's like this?" */}
              <div
                role="tablist"
                aria-label="Layout"
                className="flex rounded-[3px] p-0.5 text-xs"
                style={{ border: "1px solid #d8d3cc", background: "#fff" }}
              >
                {(
                  [
                    ["centroid", "Set grid"],
                    ["graph", "Affinity graph"],
                  ] as const
                ).map(([mode, label]) => (
                  <button
                    key={mode}
                    role="tab"
                    aria-selected={viewMode === mode}
                    onClick={() => setViewMode(mode)}
                    className="rounded-[2px] px-3 py-1 font-medium transition-colors"
                    style={
                      viewMode === mode
                        ? { background: "#1a1a1a", color: "#fff" }
                        : { color: "#888" }
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
              {/* Threads = same/adjacent key mixes. */}
              <button
                onClick={() => setShowThreads((v) => !v)}
                aria-pressed={showThreads}
                title="Lines between tracks that mix in key (same or ±1 on the Camelot wheel)"
                className="rounded-[3px] px-3 py-1 text-xs font-medium transition-colors"
                style={
                  showThreads
                    ? { background: "#1a1a1a", color: "#fff" }
                    : {
                        background: "#fff",
                        color: "#888",
                        border: "1px solid #d8d3cc",
                      }
                }
              >
                Threads {showThreads ? "on" : "off"}
              </button>
            </div>
          </div>

          <Constellation
            tracks={playlist}
            phase={phase}
            viewMode={viewMode}
            showThreads={showThreads}
            selection={selection}
            onToggleRole={toggleRole}
            onToggleCrowd={toggleCrowd}
            selectedId={selectedId}
            onSelect={(t) => setSelectedId(t.id)}
          />

          {/* Facet legend — only meaningful with axes (centroid mode) */}
          {viewMode === "centroid" && (
            <div
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px]"
              style={{ color: "#888" }}
            >
              <span className="uppercase tracking-wider" style={{ color: "#888" }}>
                Roles
              </span>
              {ROLES.map((r) => (
                <span key={r.id} className="flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: roleColor(r.id, phase) }}
                  />
                  {r.label}
                </span>
              ))}
              <span
                className="ml-2 uppercase tracking-wider"
                style={{ color: "#888" }}
              >
                Crowd
              </span>
              {CROWDS.map((c) => (
                <span key={c.id} className="flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: crowdColor(c.id, phase) }}
                  />
                  {c.label}
                </span>
              ))}
            </div>
          )}

          <p className="text-xs" style={{ color: "#999" }}>
            {viewMode === "graph" ? (
              <>
                Same library, no axes — a force layout pulls tracks together
                by how alike their tags are. Tight clusters are your signature
                moves; the lone nodes drifting at the edge are the forgotten
                ones.{" "}
                <span style={{ color: "#666" }}>Heat</span> still = fit to{" "}
                {phaseName(phase)}. Hover any node to light its family.
              </>
            ) : facetActive ? (
              <>
                Lit nodes match your filter (roles OR&apos;d, then AND&apos;d
                with crowd, ≥8 confidence). Brightness = how strongly each
                track satisfies it. Greyed nodes stay placed for context.
              </>
            ) : null}
          </p>
        </section>
      </div>

      <TrackDetail
        track={selected}
        onClose={() => setSelectedId(null)}
        onEdit={editTags}
      />
    </main>
  );
}
