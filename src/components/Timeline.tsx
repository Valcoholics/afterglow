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
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
          Which set are you building?
        </h2>
        <span className="text-xs text-zinc-500">
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
                "group relative flex min-w-[150px] flex-col items-start gap-1 overflow-hidden rounded-xl border px-5 py-4 pl-6 text-left transition-all duration-200",
                isSelected
                  ? "border-transparent bg-white/[0.09] ring-2"
                  : "cursor-pointer border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]",
              ].join(" ")}
              style={
                isSelected
                  ? ({
                      "--tw-ring-color": phaseSwatch(phase.id),
                    } as React.CSSProperties)
                  : undefined
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
                <span className="text-base font-medium text-zinc-100">
                  {phase.name}
                </span>
              </span>
              <span className="text-[11px] text-zinc-500">
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
