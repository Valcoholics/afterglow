// CSV import + tagged-export adapter for the /tag flow.
//
// The tagging UI speaks the same data model as the rest of the app: a track
// carries SPARSE weighted tags on three dimensions. The on-screen wording is
// the HTML dashboard's ("Setting / Journey / Crowd"); the values written to
// the export are the app's canonical ids so the result drops straight into
// library.json with no translation.
//
//   UI "Setting"  (DJ-defined)                 → tags.time   (Phase)
//   UI "Journey"  Opener/Bridge/Reset/HomeStr. → tags.role   (Role)
//   UI "Crowd"    Arrivals/Lock-in/Wanderers   → tags.crowd  (Crowd)

import type {
  Crowd,
  Phase,
  Role,
  Track,
  WeightedTag,
} from "./tracks";

// A row parsed from the uploaded CSV. Only artist + title are required;
// the rest mirror library.json's flat fields and default sensibly.
export interface CsvTrack {
  artist: string;
  title: string;
  duration: string;
  genre: string;
  bpm: string;
  key: string;
}

// Minimal RFC-ish CSV parser: handles quoted fields, escaped quotes (""),
// and commas/newlines inside quotes. Header row is case-insensitive and
// matched on substring so "Track Title" / "title" / "Name" all resolve.
function splitCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  const pushField = () => {
    row.push(field);
    field = "";
  };
  const pushRow = () => {
    pushField();
    rows.push(row);
    row = [];
  };

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      pushField();
    } else if (c === "\n") {
      pushRow();
    } else if (c === "\r") {
      // swallow; \r\n handled by the \n branch
    } else {
      field += c;
    }
  }
  // trailing field/row (no terminating newline)
  if (field.length > 0 || row.length > 0) pushRow();
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

// Find a header column by any of the candidate substrings.
function colIndex(headers: string[], candidates: string[]): number {
  for (let i = 0; i < headers.length; i++) {
    const h = headers[i];
    if (candidates.some((c) => h.includes(c))) return i;
  }
  return -1;
}

export function parseCsv(text: string): CsvTrack[] {
  const rows = splitCsv(text);
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const iArtist = colIndex(headers, ["artist"]);
  const iTitle = colIndex(headers, ["title", "track", "name", "song"]);
  const iDur = colIndex(headers, ["duration", "length", "time"]);
  const iGenre = colIndex(headers, ["genre", "style"]);
  const iBpm = colIndex(headers, ["bpm", "tempo"]);
  const iKey = colIndex(headers, ["key", "camelot"]);

  const at = (cells: string[], idx: number) =>
    idx >= 0 ? (cells[idx] ?? "").trim() : "";

  return rows
    .slice(1)
    .map((cells) => ({
      artist: at(cells, iArtist),
      title: at(cells, iTitle),
      duration: at(cells, iDur),
      genre: at(cells, iGenre),
      bpm: at(cells, iBpm),
      key: at(cells, iKey),
    }))
    .filter((t) => t.artist !== "" || t.title !== "");
}

// ── Tagging dimensions, in the UI's vocabulary ────────────────────
// Journey + Crowd are fixed (they ARE the app's Role/Crowd taxonomy);
// Setting is DJ-defined at runtime (it becomes the Phase/time axis).

export interface TagOption {
  // canonical id written to the export
  value: string;
  // what the DJ sees / what gets slugged from their typed Setting
  label: string;
}

export const JOURNEY_OPTIONS: { value: Role; label: string }[] = [
  { value: "opener", label: "Opener" },
  { value: "bridge", label: "Bridge" },
  { value: "reset", label: "Reset" },
  { value: "home-stretch", label: "Home Stretch" },
];

export const CROWD_OPTIONS: { value: Crowd; label: string }[] = [
  { value: "arrivals", label: "Arrivals" },
  { value: "lock-in", label: "Lock-in" },
  { value: "wanderers", label: "Wanderers" },
];

// A DJ-typed Setting label → a stable Phase-style slug for the export.
export function settingSlug(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Per-track tagging state: a sparse list of weighted picks per dimension.
export interface TrackTagging {
  setting: WeightedTag<string>[];
  journey: WeightedTag<string>[];
  crowd: WeightedTag<string>[];
}

export function emptyTagging(): TrackTagging {
  return { setting: [], journey: [], crowd: [] };
}

// Default confidence a freshly-picked tag gets (matches the HTML's 8).
export const DEFAULT_CONFIDENCE = 8;

// Build the export: each CSV row + its tags, in EXACT library.json shape
// (Omit<Track,"id"> — the app's adapter assigns ids on import).
export function toLibraryTracks(
  rows: CsvTrack[],
  tagging: Record<number, TrackTagging>
): Omit<Track, "id">[] {
  return rows.map((row, i) => {
    const t = tagging[i] ?? emptyTagging();
    return {
      artist: row.artist,
      title: row.title,
      duration: row.duration || "",
      genre: row.genre || "",
      bpm: row.bpm || "",
      key: row.key || "",
      playCount: 0,
      tags: {
        time: t.setting as WeightedTag<Phase>[],
        role: t.journey as WeightedTag<Role>[],
        crowd: t.crowd as WeightedTag<Crowd>[],
      },
    };
  });
}

export function exportJson(
  rows: CsvTrack[],
  tagging: Record<number, TrackTagging>
): string {
  return JSON.stringify(
    { tracks: toLibraryTracks(rows, tagging) },
    null,
    2
  );
}
