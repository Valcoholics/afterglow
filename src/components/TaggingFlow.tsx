"use client";

// Song-tagging flow — the light "paper" entry experience, ported from
// tagging-dashboard.html. It gates the app: upload → define settings →
// tag each track → done. The arrow in the top bar skips straight to the
// constellation (graph renders the bundled library.json regardless; this
// flow's output is a downloadable library.json the DJ can drop in).

import { useCallback, useMemo, useRef, useState } from "react";
import {
  CROWD_OPTIONS,
  DEFAULT_CONFIDENCE,
  JOURNEY_OPTIONS,
  emptyTagging,
  exportJson,
  parseCsv,
  settingSlug,
  type CsvTrack,
  type TrackTagging,
} from "@/data/csv";

type Screen = "upload" | "settings" | "tagging" | "done";
type Dim = "setting" | "journey" | "crowd";

export default function TaggingFlow({
  onEnterConstellation,
}: {
  onEnterConstellation: () => void;
}) {
  const [screen, setScreen] = useState<Screen>("upload");
  const [tracks, setTracks] = useState<CsvTrack[]>([]);
  const [settings, setSettings] = useState<{ slug: string; label: string }[]>(
    []
  );
  const [settingDraft, setSettingDraft] = useState("");
  const [tagging, setTagging] = useState<Record<number, TrackTagging>>({});
  const [current, setCurrent] = useState(0);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // ── Upload ──────────────────────────────────────────────────────
  const onFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const parsed = parseCsv(String(e.target?.result ?? ""));
      if (parsed.length === 0) {
        alert(
          "No valid tracks found. Expected columns: Artist, Title, Duration, Key, BPM."
        );
        return;
      }
      setTracks(parsed);
      setSettings([]);
      setSettingDraft("");
      setScreen("settings");
    };
    reader.readAsText(file);
  }, []);

  // ── Settings ────────────────────────────────────────────────────
  const addSetting = useCallback(() => {
    const label = settingDraft.trim();
    if (!label) return;
    const slug = settingSlug(label);
    if (!slug) return;
    setSettings((s) =>
      s.some((x) => x.slug === slug) ? s : [...s, { slug, label }]
    );
    setSettingDraft("");
  }, [settingDraft]);

  const removeSetting = (slug: string) =>
    setSettings((s) => s.filter((x) => x.slug !== slug));

  const startTagging = useCallback(() => {
    const init: Record<number, TrackTagging> = {};
    tracks.forEach((_, i) => (init[i] = emptyTagging()));
    setTagging(init);
    setCurrent(0);
    setScreen("tagging");
  }, [tracks]);

  // ── Tagging ─────────────────────────────────────────────────────
  const settingOptions = useMemo(
    () => settings.map((s) => ({ value: s.slug, label: s.label })),
    [settings]
  );

  const cur = tagging[current] ?? emptyTagging();

  const toggleTag = (dim: Dim, value: string) => {
    setTagging((all) => {
      const t = all[current] ?? emptyTagging();
      const exists = t[dim].some((x) => x.value === value);
      const next = exists
        ? t[dim]
        : [...t[dim], { value, confidence: DEFAULT_CONFIDENCE }];
      return { ...all, [current]: { ...t, [dim]: next } };
    });
  };

  const setConf = (dim: Dim, value: string, conf: number) => {
    const c = Math.max(1, Math.min(10, conf));
    setTagging((all) => {
      const t = all[current] ?? emptyTagging();
      return {
        ...all,
        [current]: {
          ...t,
          [dim]: t[dim].map((x) =>
            x.value === value ? { ...x, confidence: c } : x
          ),
        },
      };
    });
  };

  const removeTag = (dim: Dim, value: string) => {
    setTagging((all) => {
      const t = all[current] ?? emptyTagging();
      return {
        ...all,
        [current]: {
          ...t,
          [dim]: t[dim].filter((x) => x.value !== value),
        },
      };
    });
  };

  const taggedCount = useMemo(
    () =>
      Object.values(tagging).filter(
        (t) =>
          t.setting.length > 0 ||
          t.journey.length > 0 ||
          t.crowd.length > 0
      ).length,
    [tagging]
  );
  const pct = tracks.length
    ? Math.round((taggedCount / tracks.length) * 100)
    : 0;

  const next = () => {
    if (current < tracks.length - 1) setCurrent((c) => c + 1);
    else setScreen("done");
  };
  const prev = () => current > 0 && setCurrent((c) => c - 1);

  // ── Export ──────────────────────────────────────────────────────
  const download = () => {
    const blob = new Blob([exportJson(tracks, tagging)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "library.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };
  const copy = async () => {
    await navigator.clipboard.writeText(exportJson(tracks, tagging));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const restart = () => {
    setTracks([]);
    setSettings([]);
    setSettingDraft("");
    setTagging({});
    setCurrent(0);
    setScreen("upload");
    if (fileRef.current) fileRef.current.value = "";
  };

  const track = tracks[current];

  return (
    <div
      className={[
        "mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[1100px] flex-col",
        screen === "upload" ? "items-center justify-center" : "",
      ].join(" ")}
    >
      {/* Top bar: title + an arrow that jumps straight to the graph,
          available from every screen so the demo is never blocked. */}
      {screen !== "upload" ? (
        <header
          className="mb-3 flex items-center justify-between border-b pb-2.5"
          style={{ borderColor: "#e0ddd8" }}
        >
          <div className="flex-1 text-center">
            <h1 className="text-[2em] font-bold">🎵 Afterglow Tagging</h1>
            <p className="text-[0.82em]" style={{ color: "#666" }}>
              Tag each track with Setting, Journey, and Crowd. Pick multiple
              options per category.
            </p>
          </div>
          <button
            type="button"
            onClick={onEnterConstellation}
            title="Skip to the constellation"
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[1.1em] transition-colors"
            style={{ background: "#fff", border: "1px solid #d8d3cc" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#1a1a1a";
              e.currentTarget.style.background = "#fafaf8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#d8d3cc";
              e.currentTarget.style.background = "#fff";
            }}
            aria-label="Skip to the constellation"
          >
            →
          </button>
        </header>
      ) : null}

      {/* ── Upload ───────────────────────────────────────────────── */}
      {screen === "upload" && (
        <div className="w-full max-w-[560px]">
          <div className="mb-3 text-center">
            <h1 className="mb-1 text-[2em] font-bold">
              🎵 Afterglow Tagging
            </h1>
            <p className="text-[0.82em]" style={{ color: "#666" }}>
              Tag each track with Setting, Journey, and Crowd.
            </p>
          </div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full cursor-pointer rounded-[4px] px-4 py-[18px] text-center transition-colors"
            style={{ background: "#fff", border: "2px solid #d8d3cc" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#1a1a1a";
              e.currentTarget.style.background = "#fafaf8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#d8d3cc";
              e.currentTarget.style.background = "#fff";
            }}
          >
            <div className="mb-1.5 text-[1.65em]">📤</div>
            <div className="mb-[3px] text-[1.05em] font-semibold">
              Upload your tracks (CSV)
            </div>
            <div className="text-[0.95em]" style={{ color: "#888" }}>
              Artist, Title, Duration, Key, BPM
            </div>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
            }}
          />
          <div className="mt-4 text-center text-[0.8em]">
            <button
              type="button"
              onClick={onEnterConstellation}
              className="underline underline-offset-2"
              style={{ color: "#888" }}
            >
              Already have a library? Go to the constellation →
            </button>
          </div>
        </div>
      )}

      {/* ── Settings ─────────────────────────────────────────────── */}
      {screen === "settings" && (
        <div>
          <div
            className="mb-[15px] rounded-[4px] p-[15px]"
            style={{ background: "#fff", border: "1px solid #d8d3cc" }}
          >
            <p
              className="text-[0.9em] leading-[1.5]"
              style={{ color: "#666" }}
            >
              <strong style={{ color: "#1a1a1a" }}>
                Define your settings.
              </strong>{" "}
              What kinds of contexts or moments are you organizing your music
              for? (Examples: Peak Time, Warm-up, Reset, Afterparty,
              Production…) Each becomes a Time / Setting the constellation can
              build a set from.
            </p>
          </div>

          <div className="mb-3 flex gap-2">
            <input
              type="text"
              value={settingDraft}
              onChange={(e) => setSettingDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSetting()}
              placeholder="e.g., Sunset Slot, Late Night, Studio Vibes, Slow Burn…"
              className="flex-1 rounded-[3px] px-2.5 py-2 text-[0.9em] outline-none"
              style={{ border: "1px solid #d8d3cc", background: "#fff" }}
            />
            <button
              type="button"
              onClick={addSetting}
              className="rounded-[3px] px-3.5 py-2 text-[0.8em] font-medium text-white"
              style={{ background: "#1a1a1a" }}
            >
              Add Setting
            </button>
          </div>

          <div
            className="mb-[15px] rounded-[4px] p-3"
            style={{ background: "#fff", border: "1px solid #d8d3cc" }}
          >
            <div
              className="mb-2.5 text-[0.8em] font-semibold uppercase tracking-[0.3px]"
              style={{ color: "#888" }}
            >
              Your Settings
            </div>
            {settings.length === 0 ? (
              <div
                className="p-2.5 text-center text-[0.8em]"
                style={{ color: "#888" }}
              >
                No settings yet. Add one to get started.
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {settings.map((s) => (
                  <span
                    key={s.slug}
                    className="flex items-center gap-1.5 rounded-[3px] px-2.5 py-1.5 text-[0.85em]"
                    style={{
                      background: "#f8f7f5",
                      border: "1px solid #d8d3cc",
                    }}
                  >
                    <span>{s.label}</span>
                    <button
                      type="button"
                      onClick={() => removeSetting(s.slug)}
                      className="flex h-4 w-4 items-center justify-center"
                      style={{ color: "#888" }}
                      aria-label={`Remove ${s.label}`}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mb-5 mt-2 flex justify-between gap-2">
            <button
              type="button"
              onClick={restart}
              className="rounded-[3px] px-4 py-2 text-[0.825em] font-medium"
              style={{
                background: "#fff",
                color: "#1a1a1a",
                border: "1px solid #d8d3cc",
              }}
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={startTagging}
              disabled={settings.length === 0}
              className="rounded-[3px] px-4 py-2 text-[0.825em] font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: "#1a1a1a" }}
            >
              Start Tagging →
            </button>
          </div>
        </div>
      )}

      {/* ── Tagging ──────────────────────────────────────────────── */}
      {screen === "tagging" && track && (
        <div>
          <div className="mb-2">
            <div
              className="mb-[3px] flex justify-between text-[0.77em]"
              style={{ color: "#888" }}
            >
              <span>
                {taggedCount} of {tracks.length}
              </span>
              <span>{pct}%</span>
            </div>
            <div
              className="h-[3px] w-full overflow-hidden rounded-[1px]"
              style={{ background: "#e0ddd8" }}
            >
              <div
                className="h-full transition-[width] duration-300"
                style={{ width: `${pct}%`, background: "#1a1a1a" }}
              />
            </div>
          </div>

          <div
            className="mb-2 rounded-[3px] p-2"
            style={{
              background: "#fff",
              border: "1px solid #d8d3cc",
              borderLeft: "3px solid #1a1a1a",
            }}
          >
            <div className="mb-[3px] text-[1.05em] font-semibold">
              {track.artist ? `${track.artist} — ` : ""}
              {track.title || "(untitled)"}
            </div>
            <div
              className="flex flex-wrap gap-3 text-[0.77em]"
              style={{ color: "#666" }}
            >
              <span>
                <span className="font-medium">Duration:</span>{" "}
                {track.duration || "N/A"}
              </span>
              <span>
                <span className="font-medium">Key:</span>{" "}
                {track.key || "N/A"}
              </span>
              <span>
                <span className="font-medium">BPM:</span>{" "}
                {track.bpm || "N/A"}
              </span>
              {track.genre && (
                <span>
                  <span className="font-medium">Genre:</span> {track.genre}
                </span>
              )}
            </div>
          </div>

          <TagGroup
            title="Setting"
            dim="setting"
            options={settingOptions}
            picks={cur.setting}
            onToggle={toggleTag}
            onConf={setConf}
            onRemove={removeTag}
          />
          <TagGroup
            title="Journey"
            dim="journey"
            options={JOURNEY_OPTIONS}
            picks={cur.journey}
            onToggle={toggleTag}
            onConf={setConf}
            onRemove={removeTag}
          />
          <TagGroup
            title="Crowd"
            dim="crowd"
            options={CROWD_OPTIONS}
            picks={cur.crowd}
            onToggle={toggleTag}
            onConf={setConf}
            onRemove={removeTag}
          />

          <div className="mb-5 mt-2 flex justify-between gap-2">
            <button
              type="button"
              onClick={prev}
              disabled={current === 0}
              className="rounded-[3px] px-4 py-2 text-[0.825em] font-medium disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                background: "#fff",
                color: "#1a1a1a",
                border: "1px solid #d8d3cc",
              }}
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={next}
              className="rounded-[3px] px-4 py-2 text-[0.825em] font-medium text-white"
              style={{ background: "#1a1a1a" }}
            >
              {current === tracks.length - 1 ? "Finish" : "Next →"}
            </button>
          </div>
        </div>
      )}

      {/* ── Done ─────────────────────────────────────────────────── */}
      {screen === "done" && (
        <div className="px-4 py-4 text-center">
          <div className="mb-2.5 text-[2.2em]">✨</div>
          <div className="mb-2 text-[1.43em] font-semibold">
            All Tracks Tagged!
          </div>
          <div className="mb-[15px] text-[0.88em]" style={{ color: "#666" }}>
            {tracks.length} tracks tagged and ready to import. The JSON
            matches{" "}
            <code className="font-mono">src/data/library.json</code> — drop it
            in and the constellation re-derives.
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={download}
              className="rounded-[3px] px-4 py-2 text-[0.825em] font-medium text-white"
              style={{ background: "#1a1a1a" }}
            >
              Download library.json
            </button>
            <button
              type="button"
              onClick={copy}
              className="rounded-[3px] px-4 py-2 text-[0.825em] font-medium"
              style={{
                background: "#fff",
                color: "#1a1a1a",
                border: "1px solid #d8d3cc",
              }}
            >
              {copied ? "Copied!" : "Copy JSON to Clipboard"}
            </button>
            <button
              type="button"
              onClick={onEnterConstellation}
              className="rounded-[3px] px-4 py-2 text-[0.825em] font-medium text-white"
              style={{ background: "#1a1a1a" }}
            >
              Open the constellation →
            </button>
          </div>
          <button
            type="button"
            onClick={restart}
            className="mt-5 rounded-[3px] px-4 py-2 text-[0.825em] font-medium"
            style={{
              background: "#fff",
              color: "#1a1a1a",
              border: "1px solid #d8d3cc",
            }}
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}

// One dimension's option buttons + slider/number rows for picked tags.
// Visuals ported verbatim from tagging-dashboard.html.
function TagGroup({
  title,
  dim,
  options,
  picks,
  onToggle,
  onConf,
  onRemove,
}: {
  title: string;
  dim: Dim;
  options: { value: string; label: string }[];
  picks: { value: string; confidence: number }[];
  onToggle: (dim: Dim, value: string) => void;
  onConf: (dim: Dim, value: string, conf: number) => void;
  onRemove: (dim: Dim, value: string) => void;
}) {
  const pickedValues = new Set(picks.map((p) => p.value));
  const labelOf = (v: string) =>
    options.find((o) => o.value === v)?.label ?? v;

  return (
    <div
      className="mb-2 rounded-[3px] p-[7px]"
      style={{ background: "#fff", border: "1px solid #d8d3cc" }}
    >
      <div className="mb-1.5 text-[0.715em] font-bold uppercase tracking-[0.3px]">
        {title}
      </div>

      <div className="mb-[7px] flex flex-wrap gap-1">
        {options.length === 0 ? (
          <span className="text-[0.77em]" style={{ color: "#888" }}>
            No options.
          </span>
        ) : (
          options.map((o) => {
            const selected = pickedValues.has(o.value);
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => onToggle(dim, o.value)}
                className="rounded-[2px] px-[9px] py-[5px] text-[0.77em] font-medium transition-colors"
                style={
                  selected
                    ? {
                        background: "#1a1a1a",
                        color: "#fff",
                        border: "1px solid #1a1a1a",
                      }
                    : {
                        background: "#f8f7f5",
                        color: "#1a1a1a",
                        border: "1px solid #d8d3cc",
                      }
                }
              >
                {o.label}
              </button>
            );
          })
        )}
      </div>

      <div className="flex flex-col gap-1">
        {picks.length === 0 ? (
          <div
            className="p-2 text-center text-[0.75em]"
            style={{ color: "#888" }}
          >
            No tags selected
          </div>
        ) : (
          picks.map((p) => (
            <div
              key={p.value}
              className="flex items-center gap-1.5 rounded-[2px] p-[5px] text-[0.88em]"
              style={{
                background: "#f8f7f5",
                border: "1px solid #d8d3cc",
              }}
            >
              <div className="min-w-[75px] text-[0.88em] font-medium">
                {labelOf(p.value)}
              </div>
              <div className="flex flex-1 items-center gap-1.5">
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={p.confidence}
                  onChange={(e) =>
                    onConf(dim, p.value, parseInt(e.target.value, 10))
                  }
                  className="ag-tag-slider h-2 flex-1 cursor-pointer appearance-none rounded-[4px]"
                  style={{ background: "#e0ddd8" }}
                  aria-label={`${labelOf(p.value)} confidence`}
                />
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={p.confidence}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    onConf(dim, p.value, Number.isNaN(v) ? 8 : v);
                  }}
                  className="w-[42px] rounded-[2px] px-[5px] py-1 text-center text-[0.825em] font-semibold outline-none"
                  style={{ border: "1px solid #d8d3cc", background: "#fff" }}
                />
              </div>
              <button
                type="button"
                onClick={() => onRemove(dim, p.value)}
                className="flex h-5 w-5 items-center justify-center text-[1.1em]"
                style={{ color: "#888" }}
                aria-label={`Remove ${labelOf(p.value)}`}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
