# Implementation Brief: Technical & Product Details

**For:** Jasmine (PM) + Teammate (Visualizer/Technologist)  
**Purpose:** Clarity on what to build, how to organize it, key decisions  
**This is:** Not a code spec (that comes after planning mode), but enough to start work

---

## 1. Architecture Overview

### Three-Layer Structure (User Facing)

```
Timeline View (all 5 phases visible)
    ↓ (click Pool Party)
Constellation View (Pool Party phase, 3 zones, 40-50 tracks)
    ↓ (hover/click track)
Track Detail View (artist, duration, tags, play count)
```

### Data Structure (Backend)

```json
{
  "tracks": [
    {
      "id": 1,
      "artist": "Artist Name",
      "title": "Track Title",
      "duration": "6:42",
      "playCount": 2,
      "tags": {
        "time": "pool-party",
        "role": "bridge",
        "crowd": "lock-in"
      },
      "spatial": {
        "x": 105,
        "y": 210
      }
    }
  ]
}
```

---

## 2. Spatial Encoding (Critical Decision)

### The Model

| Dimension | X-Axis | Y-Axis | Color/Grouping |
|-----------|--------|--------|----------------|
| **Axis name** | Journey Role | Crowd State | Time/Setting |
| **Range** | Opener (0) → Home Stretch (3) | Arrivals (0) → Wanderers (2) | Pool Party = warm tones |
| **Visual** | Left to right | Top to bottom | Color/background grouping |

### Why This Works
- **X-axis (Journey Role):** Natural left-to-right progression through a set (open → bridge → reset → close)
- **Y-axis (Crowd State):** Natural top-to-bottom (focused → distributed)
- **Color (Time):** Immediate visual grouping (all Pool Party tracks share color family)

### Example Grid Layout

```
                 Opener      Bridge      Reset      Home Stretch
                  (0)         (1)         (2)          (3)
Arrivals  (0)   Track A     Track B     Track C      Track D
Lock-in   (1)   Track E     Track F     Track G      Track H
Wanderers (2)   Track I     Track J     Track K      Track L
```

Each cell contains tracks that match that (Role, Crowd State) combination within Pool Party.

### Positioning Math (Simple)

```
Track position = {
  x: roleIndex[track.tags.role] * cellWidth,
  y: crowdIndex[track.tags.crowd] * cellHeight
}
```

No algorithm. Hardcoded. Clean. Traceable.

---

## 3. Component Breakdown

### Component 1: Timeline View
**What it shows:** Five clickable phase options

**Props:**
- phases: Array of phase objects (name, icon?, description?)
- onPhaseSelect: Callback when phase is clicked
- selectedPhase: Currently selected phase

**UI Elements:**
- Phase buttons/cards (horizontal or radial layout)
- Visual highlight on selected phase
- No animation needed, but smooth is nice

**Data:**
```javascript
const phases = [
  { id: "warmup", name: "Warm-up", color: "#FFA500" },
  { id: "pool-party", name: "Pool Party", color: "#FFD700" },
  { id: "festival-brunch", name: "Festival Brunch", color: "#FF8C00" },
  { id: "post-game", name: "Post-game", color: "#FF6347" },
  { id: "sunrise-reset", name: "Sunrise Reset", color: "#87CEEB" }
];
```

---

### Component 2: Constellation View
**What it shows:** Spatial arrangement of tracks in selected phase (Pool Party only for MVP)

**Props:**
- tracks: Array of track objects
- selectedZone?: Currently hovered zone (for highlighting)
- onTrackClick: Callback when track is clicked
- onTrackHover: Callback when mouse enters track vicinity

**UI Elements:**
- 12-cell grid (4 roles × 3 crowds)
- Zone labels (Arrivals, Lock-in, Wanderers on Y-axis; Opener, Bridge, Reset, Home Stretch on X-axis)
- Track representations (could be dots, small cards, or minimal info)
- Hover state (nearby tracks brighten/fade)

**Layout Approach:**
- Container with fixed width/height
- Tracks positioned absolutely based on spatial { x, y }
- SVG overlay for zone labels? Or CSS grid?
- Recommended: CSS grid + absolute positioning overlay for tracks

**Critical Interaction:**
```
On hover over track:
- Track under cursor: brighten/highlight
- Nearby tracks (within threshold distance): fade in or brighten slightly
- Distant tracks: fade out slightly or stay same
```

**Data Needed:**
```javascript
const tracks = [
  {
    id: 1,
    artist: "Artist",
    title: "Title",
    duration: "6:42",
    playCount: 2,
    tags: { time: "pool-party", role: "bridge", crowd: "lock-in" },
    spatial: { x: 105, y: 210 } // pre-computed
  }
];
```

---

### Component 3: Track Detail View
**What it shows:** Full track info when clicked from constellation

**Props:**
- track: Selected track object
- onClose: Callback to return to constellation

**UI Elements:**
- Artist name (large)
- Track title
- Duration
- Play count
- Tags displayed clearly (Time/Setting | Journey Role | Crowd State)
- Underplayed badge (if play count < 5)
- Close button or back arrow

**Design Note:**
- Could be modal, side panel, or slide-in
- Should stay in spatial context (not feel disconnected)
- Quick dismiss (click outside, press Escape)

---

## 4. The Demo Library (Product Manager Focus)

### Curation Requirements

**Total:** 150 real tracks

**Source:** Creative Commons, royalty-free, or licensed music  
Example sources: Free Music Archive, Incompetech, Bandcamp, YouTube Audio Library

**Composition:**
- **Genres:** House, deep house, techno, garage, soul, funk, ambient, breaks, world (variety matters)
- **Artists:** Mix of one-off tracks + 3-5 tracks by same artist (proves cross-context discovery)
- **Play counts:** Vary from 0–50 plays (realistic library)
- **Underplayed candidates:** 3–5 tracks with play count < 5

### Tagging Process (Manual)

For each track, ask three questions:

1. **"When would I play this?"** → Time/Setting (choose 1–2, usually 1)
   - Warm-up, Pool Party, Festival Brunch, Post-game, Sunrise Reset
   - Example: This uplifting house groove? Pool Party.

2. **"What does this track do in a set?"** → Journey Role (choose 1)
   - Opener, Bridge, Reset, Home Stretch
   - Example: This track transitions smoothly? Bridge.

3. **"What crowd state does it need or work with?"** → Crowd State (choose 1–2)
   - Arrivals, Lock-in, Wanderers
   - Example: This groovy track can work whether people are focused or chatting? Both.

**Output:** Tagged JSON file with artist, title, duration, play count, and three tags.

**Reality check:** Will take 6–10 hours to do 150 tracks well. Plan accordingly.

### Rediscovery Hero Track

**Criteria:**
- Play count: 0–5 (genuinely underplayed)
- Time: Must be Pool Party
- Role: Should be Bridge (versatile, shows transition)
- Crowd: Can be Lock-in or Wanderers (both are discovery-enabling)
- **Quality:** Any DJ would recognize as a good track
- **Vibe:** Uplifting, groovy, accessible (feels like a "yes, I should have remembered this" moment)

**Example:**
- Artist: Unknown gem (not a superstar, but solid)
- Title: Something evocative but not cheesy
- Genre: House, funk, garage, soul (cross-genre is better)
- Energy: Uplifting, groove-forward, immediately listenable
- Play count: 2–3 (forgotten but not controversial)

**You'll find this when curating.** Listen to 150 tracks, 3–5 will stand out as "wait, this is perfect and I haven't played it in forever."

---

## 5. Spatial Positioning (Technologist Focus)

### How Positions Are Determined

**Rule:** No algorithms. Positions are intentional and traceable.

**Approach:**
1. Role maps to X (Opener=0, Bridge=1, Reset=2, Home Stretch=3)
2. Crowd maps to Y (Arrivals=0, Lock-in=1, Wanderers=2)
3. Time/Setting determines color/grouping
4. Each track is positioned at the intersection of its (Role, Crowd)

**Implementation:**

```javascript
const roleIndex = { "opener": 0, "bridge": 1, "reset": 2, "home-stretch": 3 };
const crowdIndex = { "arrivals": 0, "lock-in": 1, "wanderers": 2 };
const cellWidth = 150;  // pixels
const cellHeight = 150; // pixels

function computePosition(track) {
  const x = roleIndex[track.tags.role] * cellWidth;
  const y = crowdIndex[track.tags.crowd] * cellHeight;
  return { x, y };
}
```

**Multiple tags within same dimension:**
- A track can have both "Lock-in" and "Wanderers"
- Position it between them (average the Y values)
- Visual hint that it's versatile

**Result:** DJ sees spatial proximity and can trace it back to tags. No mystery, no "why is this here?"

---

## 6. Zone Labels Strategy

### Visual Clarity

Judges should immediately understand: "Oh, this is organized by who's listening and what the track does."

**Option A: Text Labels (Simplest)**
- Y-axis label on left: "Arrivals," "Lock-in," "Wanderers"
- X-axis label on top: "Opener," "Bridge," "Reset," "Home Stretch"
- Clear, readable, no ambiguity

**Option B: Subtle Backgrounds**
- Rows have background color (Arrivals = light, Lock-in = medium, Wanderers = dark)
- Columns have subtle opacity or border variation
- Labels + visual grouping

**Option C: Combination (Recommended)**
- Text labels (primary)
- Subtle color/background grouping (secondary)
- Icons optional (Arrivals = people arriving, Lock-in = focus, Wanderers = movement)

**Pick the approach that feels most natural for your tech stack.**

---

## 7. Hover Interaction Details

### What Should Happen

**Base state:**
- All tracks visible, normal opacity/color

**Hover over a track:**
- Track under cursor: brighten, highlight, enlarge slightly (focus)
- Nearby tracks (within ~150px): fade in or brighten (show relationship)
- Distant tracks: fade out slightly or stay neutral (less relevant)

**Hover away:**
- Return to base state smoothly (<200ms transition)

### Why This Works

- Shows spatial proximity is functional (not decorative)
- Helps DJ discover adjacent possibilities
- Fast interaction (<100ms response)

### Technical Implementation

```javascript
function onTrackHover(hoveredTrack) {
  const proximity = 150; // pixels
  
  tracks.forEach(track => {
    const distance = Math.sqrt(
      Math.pow(track.spatial.x - hoveredTrack.spatial.x, 2) +
      Math.pow(track.spatial.y - hoveredTrack.spatial.y, 2)
    );
    
    if (distance < proximity) {
      track.opacity = 1.0;   // nearby: brighten
    } else {
      track.opacity = 0.5;   // distant: dim
    }
  });
}
```

---

## 8. Underplayed Signal

### Implementation

**Trigger:** play count < 5

**Visual Options:**
- Different color (e.g., gold/yellow)
- Icon overlay (e.g., ⚡, ⭐, or custom icon)
- Border or glow effect
- Combination of above

**Placement:** Visible in constellation view AND detail view

**Purpose:** Makes rediscovery obvious; draws eye to forgotten material

**Recommended:** Icon overlay + subtle color shift (works at distance and up close)

---

## 9. Technical Stack Decision (Pending Alignment)

### Frontend Framework Options

| Option | Pros | Cons | For 24h Sprint |
|--------|------|------|----------------|
| **React** | Component-based, familiar, libraries exist | Slight learning curve | Good if team knows it |
| **Vue** | Simple, reactive, gentle learning curve | Smaller ecosystem | Good for quick build |
| **HTML + Vanilla JS** | Minimal dependencies, full control | More manual DOM work | Possible but more code |
| **Svelte** | Reactive, minimal boilerplate | Less familiar | Could work, less experience needed |

**Recommendation:** React (or Vue if you prefer simpler syntax). Either is fast enough for 24h.

### Spatial Layout Approach

| Option | Pros | Cons | Recommendation |
|--------|------|------|-----------------|
| **CSS Grid** | Native, responsive, easy | Limited absolute positioning | Good for zone structure |
| **Canvas** | Full control, smooth rendering | More complex, harder to debug | Overkill for hackathon |
| **SVG** | Vectors, scalable, precise | Can be slow with many elements | Good for zone labels |
| **HTML + CSS Positioning** | Flexible, debuggable | Manual layout math | Recommended; hybrid approach |

**Recommended Approach:** CSS Grid for overall structure + absolute positioning for tracks + SVG for zone labels.

### Styling
- **Tailwind CSS** (if using React/Vue) — fast utility styling
- Or plain CSS — fine for a hackathon
- **Color palette:** Warm tones for Pool Party (oranges, golds); cool for Sunrise Reset. Keep it simple.

---

## 10. Data Flow

### On Page Load
```
1. Load track JSON data (150 tracks with tags & spatial positions)
2. Render Timeline view (5 phases)
3. Wait for user to select phase
```

### On Phase Select
```
1. Filter tracks by time/setting (e.g., all Pool Party tracks)
2. Render Constellation view with those tracks
3. Render zone labels
4. Show all tracks at their spatial positions
5. Enable hover interaction
```

### On Track Hover
```
1. Compute distance from hovered track to all others
2. Update opacity/brightness based on distance
3. Smooth transition (<200ms)
```

### On Track Click
```
1. Show Track Detail view (modal or side panel)
2. Display artist, title, duration, tags, play count
3. Show underplayed badge if applicable
4. Allow close/back to constellation
```

---

## 11. Performance Targets

| Metric | Target | Why |
|--------|--------|-----|
| **Hover response** | <100ms | Feel "tangible" and responsive |
| **View transitions** | <300ms | Smooth, not jarring |
| **Page load** | <2s | Demo should start fast |
| **No jank** | 60fps | Smooth hovering + interactions |

**Key:** Prioritize hover latency. This is what proves spatial interaction works.

---

## 12. QA Checklist (Before Demo)

### Functionality
- [ ] Timeline view shows 5 phases clearly
- [ ] Click Pool Party → constellation appears (no lag)
- [ ] All 40–50 Pool Party tracks visible in constellation
- [ ] Zone labels are readable
- [ ] Hover over a track → nearby tracks respond
- [ ] Click track → detail view shows all info
- [ ] Underplayed signal is visible
- [ ] No console errors or broken state

### Product
- [ ] Demo library includes rediscovery hero track
- [ ] Rediscovery track is in Lock-in zone
- [ ] Rediscovery track has play count < 5
- [ ] Rediscovery track is genuinely good
- [ ] Demo script has been practiced
- [ ] 5–7 minute walkthrough works without stumbling

### Polish
- [ ] Typography is readable from 10ft away
- [ ] Colors are consistent and intentional
- [ ] No visual glitches or broken layouts
- [ ] Responsive on target device/screen size

### Safety
- [ ] Backup screenshots captured
- [ ] Second laptop has demo ready
- [ ] Fallback plan documented (if tech breaks)

---

## 13. Decisions to Make During Planning

These are open; will be clarified during planning mode with Claude:

- [ ] Exact spatial grid dimensions (cell size, spacing)
- [ ] Final tech stack decision (React/Vue/other)
- [ ] Styling approach (Tailwind, plain CSS, etc.)
- [ ] Track representation in constellation (dots, cards, minimal text, icons?)
- [ ] Zone label placement (left/top, or built into grid?)
- [ ] Detail view presentation (modal, side panel, full screen?)
- [ ] Underplayed signal style (icon type, color choice)
- [ ] Responsive breakpoints (if supporting mobile)

---

## 14. Success Definition

**By end of 24 hours, you have:**

✓ A working prototype where a DJ can:
  - Open the app
  - Select Pool Party
  - See all their Pool Party tracks in a spatial arrangement
  - Understand why each track is positioned where it is
  - Hover and see relationships
  - Click a track and see details
  - Find the rediscovery moment

✓ A demo script that's practiced and timed

✓ No crashes during the walkthrough

✓ Judge can see: "Oh, this is a different way to organize. It solves the problem. It's real."

---

## 15. Reference: Key Files for Builders

| Role | Read These | Purpose |
|------|-----------|---------|
| **Both** | `PRD.md` | What to build |
| **Both** | `02-core-concept.md` | How it works |
| **PM** | `01-problem-and-users.md` | Understand the DJ problem |
| **PM** | `06-demo-story.md` | Demo narrative |
| **Technologist** | `04-ux-and-spatial-interaction.md` | Design approach |
| **Both** | `24-HOUR-SPRINT.md` | Hour-by-hour plan |
| **Both** | `08-judge-context.md` | Why decisions were made (reference) |

---

## 16. Questions During Build?

- **What are the exact visual specs?** → Will be clarified in planning mode
- **How should the detail view look?** → Placeholder; your taste + feedback
- **Can I change the spatial encoding?** → Only if you have a better approach that's simpler to implement
- **What if tagging takes too long?** → Have 50-track alias method ready; tag 50 deeply, copy pattern to others
- **What if we run out of time?** → Cut nice-to-haves first (underplayed signal, second phase, animations)

---

**Questions?** Clarify during alignment meeting. Specifics come after planning mode.

Good luck building. 🎵
