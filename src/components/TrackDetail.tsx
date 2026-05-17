"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  CROWDS,
  PHASES,
  ROLES,
  crowdLabel,
  phaseName,
  phaseSwatch,
  roleLabel,
  setTag,
  type Crowd,
  type Phase,
  type Role,
  type TagDim,
  type Track,
} from "@/data/tracks";

export default function TrackDetail({
  track,
  onClose,
  onEdit,
}: {
  track: Track | null;
  onClose: () => void;
  onEdit: (id: number, tags: Track["tags"]) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const open = track != null;

  // confidence of a value within a dimension, 0 = not tagged
  const confOf = (dim: TagDim, value: string) =>
    track?.tags[dim].find((x) => x.value === value)?.confidence ?? 0;

  const apply = useCallback(
    (dim: TagDim, value: string, conf: number) => {
      if (!track) return;
      onEdit(track.id, setTag(track.tags, dim, value, conf));
    },
    [track, onEdit]
  );

  return (
    <>
      <div
        onClick={onClose}
        className={[
          "fixed inset-0 z-10 bg-black/50 transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      <aside
        className={[
          "thin-scroll fixed right-0 top-0 z-20 flex h-full w-[420px] max-w-[92vw] flex-col gap-6 overflow-y-auto border-l border-white/10 bg-zinc-950/95 p-8 backdrop-blur-sm transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {track && (
          <>
            <button
              onClick={onClose}
              className="self-end text-sm text-zinc-500 transition-colors hover:text-zinc-200"
            >
              Close ✕
            </button>

            <div className="flex flex-col gap-1.5">
              <h2 className="text-2xl font-semibold leading-tight text-zinc-50">
                {track.title}
              </h2>
              <p className="text-lg text-zinc-400">{track.artist}</p>
            </div>

            <div className="grid grid-cols-3 gap-x-3 gap-y-4 text-sm">
              <Meta label="Duration" value={track.duration} />
              <Meta label="BPM" value={track.bpm} />
              <Meta label="Key" value={track.key} />
              <Meta label="Plays" value={String(track.playCount)} />
              <Meta
                label="Genre"
                value={track.genre}
                className="col-span-2"
              />
            </div>

            <p className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs leading-relaxed text-zinc-500">
              Drag a slider and watch this track move on the grid.{" "}
              <span className="text-zinc-300">Role</span> drives its X,{" "}
              <span className="text-zinc-300">Crowd</span> its Y — each is the
              confidence-weighted average. Drag to{" "}
              <span className="text-zinc-300">0</span> to untag it entirely.
            </p>

            <SliderGroup
              title="Journey Role"
              hint="Sets the X position"
              values={ROLES.map((r) => ({
                value: r.id as string,
                label: roleLabel(r.id as Role),
              }))}
              confOf={(v) => confOf("role", v)}
              onChange={(v, c) => apply("role", v, c)}
            />
            <SliderGroup
              title="Crowd State"
              hint="Sets the Y position"
              values={CROWDS.map((c) => ({
                value: c.id as string,
                label: crowdLabel(c.id as Crowd),
              }))}
              confOf={(v) => confOf("crowd", v)}
              onChange={(v, c) => apply("crowd", v, c)}
            />
            <SliderGroup
              title="Time / Setting"
              hint="Which sets it belongs to (heat + membership)"
              values={PHASES.map((p) => ({
                value: p.id as string,
                label: phaseName(p.id as Phase),
                swatch: phaseSwatch(p.id as Phase),
              }))}
              confOf={(v) => confOf("time", v)}
              onChange={(v, c) => apply("time", v, c)}
            />

            <p className="mt-auto text-xs leading-relaxed text-zinc-600">
              Every score is a DJ confidence (1–10), not an algorithm. The
              track lives wherever its strongest tags pull it — change them
              and the position follows. Edits are session-only.
            </p>
          </>
        )}
      </aside>
    </>
  );
}

function Meta({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-[11px] uppercase tracking-wider text-zinc-500">
        {label}
      </div>
      <div className="text-zinc-200">{value}</div>
    </div>
  );
}

function SliderGroup({
  title,
  hint,
  values,
  confOf,
  onChange,
}: {
  title: string;
  hint: string;
  values: { value: string; label: string; swatch?: string }[];
  confOf: (value: string) => number;
  onChange: (value: string, conf: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
          {title}
        </span>
        <span className="text-[11px] text-zinc-600">{hint}</span>
      </div>
      {values.map((v) => (
        <ConfSlider
          key={v.value}
          label={v.label}
          swatch={v.swatch}
          conf={confOf(v.value)}
          onChange={(c) => onChange(v.value, c)}
        />
      ))}
    </div>
  );
}

// A 0–10 confidence slider. 0 = untagged (thumb parked at the far left,
// label dimmed). Click anywhere on the track to set; drag the thumb to
// sweep. Snaps to integers so the value the user sets is exactly what the
// centroid math uses — no hidden rounding between the slider and the node.
function ConfSlider({
  label,
  swatch,
  conf,
  onChange,
}: {
  label: string;
  swatch?: string;
  conf: number;
  onChange: (conf: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tagged = conf > 0;

  const setFromClientX = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const t = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
      onChange(Math.round(t * 10));
    },
    [onChange]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.buttons === 1) setFromClientX(e.clientX);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp")
      onChange(Math.min(10, conf + 1));
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown")
      onChange(Math.max(0, conf - 1));
  };

  const pct = (conf / 10) * 100;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2">
          {swatch && (
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: swatch,
                opacity: tagged ? 1 : 0.25,
              }}
            />
          )}
          <span className={tagged ? "text-zinc-200" : "text-zinc-600"}>
            {label}
          </span>
        </span>
        <span
          className={
            tagged ? "text-zinc-400 tabular-nums" : "text-zinc-700"
          }
        >
          {tagged ? `${conf}/10` : "untagged"}
        </span>
      </div>
      <div
        ref={trackRef}
        role="slider"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={10}
        aria-valuenow={conf}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onKeyDown={onKeyDown}
        className="relative h-6 cursor-pointer touch-none select-none rounded-full"
      >
        {/* rail */}
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full transition-[width] duration-75"
            style={{
              width: `${pct}%`,
              backgroundColor: tagged
                ? swatch ?? "#FF8C42"
                : "transparent",
            }}
          />
        </div>
        {/* thumb */}
        <div
          className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-zinc-950 shadow transition-[left] duration-75"
          style={{
            left: `${pct}%`,
            backgroundColor: tagged ? swatch ?? "#FF8C42" : "#52525b",
          }}
        />
      </div>
    </div>
  );
}
