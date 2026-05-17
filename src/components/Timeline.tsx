"use client";

import {
  PHASES,
  TRACKS,
  contextIsBrowsable,
  membership,
  phaseSwatch,
  theme,
  type Phase,
} from "@/data/tracks";

const rgb = ([r, g, b]: [number, number, number]) => `rgb(${r},${g},${b})`;

// The context / playlist picker. NOT a timeline — the grid itself is the
// set's timeline. This only answers "which set am I building right now."
export default function PlaylistPicker({
  selected,
  onSelect,
}: {
  selected: Phase;
  onSelect: (p: Phase) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline gap-3">
        <h2
          className="text-sm font-bold uppercase tracking-[0.2em]"
          style={{ color: "#666" }}
        >
          Which set are you building?
        </h2>
        <span className="text-xs" style={{ color: "#888" }}>
          Afterglow reflects this DJ&apos;s own personality
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {PHASES.filter((p) => contextIsBrowsable(p.id)).map((phase) => {
          const isSelected = selected === phase.id;
          const core = TRACKS.filter(
            (t) => membership(t, phase.id) === "core"
          ).length;
          const edge = TRACKS.filter(
            (t) => membership(t, phase.id) === "edge"
          ).length;
          const th = theme(phase.id);
          const gradient = `linear-gradient(135deg, ${rgb(
            th.rampLo
          )}, ${rgb(th.rampHi)})`;
          return (
            <button
              key={phase.id}
              onClick={() => onSelect(phase.id)}
              className={[
                "group relative flex min-w-[150px] cursor-pointer flex-col items-start gap-1 overflow-hidden rounded-[4px] px-5 py-4 pl-6 text-left transition-all duration-200",
                isSelected ? "ring-2" : "",
              ].join(" ")}
              style={
                isSelected
                  ? ({
                      background: "#fff",
                      border: "1px solid transparent",
                      "--tw-ring-color": phaseSwatch(phase.id),
                    } as React.CSSProperties)
                  : ({
                      background: "#fff",
                      border: "1px solid #d8d3cc",
                    } as React.CSSProperties)
              }
            >
              {/* Per-context theme accent — the whole gradient family */}
              <span
                className="absolute inset-y-0 left-0 w-1.5 transition-opacity duration-200"
                style={{
                  background: gradient,
                  opacity: isSelected ? 1 : 0.55,
                }}
              />
              <span className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full transition-transform duration-200 group-hover:scale-125"
                  style={{ background: gradient }}
                />
                <span
                  className="text-base font-semibold"
                  style={{ color: "#1a1a1a" }}
                >
                  {phase.name}
                </span>
              </span>
              <span className="text-[11px]" style={{ color: "#888" }}>
                {core} core
                {edge > 0 ? ` · ${edge} edge` : ""}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
