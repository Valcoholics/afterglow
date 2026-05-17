# UX & Spatial Interaction Design

---

## Why Spatial Design Matters

**Hypothesis:** DJ can prep a gig faster and discover more material if their library is organized by *spatial proximity* rather than *listed metadata*.

**How we test it:** Build an interactive spatial UI where DJ can hover and click, seeing relationships in real-time.

---

## The Spatial Grid Layout

### Overall Structure

```
                Opener       Bridge       Reset       Home Stretch
             (Columns)
Arrivals (0)   [16]         [32]         [24]         [20]
Lock-in (1)    [28]         [35]         [18]         [22]
Wanderers (2)  [12]         [24]         [14]          [8]
(Rows)
```

Numbers = track count in each cell (example).

### Coordinate System

- **X-axis (left to right):** Opener (0) → Bridge (1) → Reset (2) → Home Stretch (3)
- **Y-axis (top to bottom):** Arrivals (0) → Lock-in (1) → Wanderers (2)
- **Cell dimensions:** 150px × 150px (tunable during build)

Each track is positioned at the center of its cell, with small visual padding/offset to show clustering.

---

## Visual Design (Intentional & Minimal)

### Color Palette (Pool Party)

- **Warm tones:** Gold, orange, amber (reflects 4 pm afternoon energy)
- **Neutral base:** Light gray/white background
- **Accent:** Bright accent for hover/interaction

Example:
- Base track: Gold (#FFD700)
- Hovered track: Bright orange (#FF8C00)
- Nearby tracks: Lighter gold (#FFF8DC)
- Distant tracks: Slightly dimmed

### Zone Labels (Clarity First)

**Y-axis (left side):**
```
Arrivals  ← Label at top
Lock-in   ← Label at middle
Wanderers ← Label at bottom
```

**X-axis (top):**
```
Opener | Bridge | Reset | Home Stretch
```

**Visual option:** Subtle background color per row (Arrivals = light, Lock-in = medium, Wanderers = dark) to reinforce structure.

### Track Representation

**Options (pick one during build):**

1. **Circular dots** (minimal)
   - 30px radius circle
   - Color = time/setting (gold for Pool Party)
   - On hover: Enlarge to 40px, brighten
   
2. **Small cards** (more info)
   - 40px × 40px card
   - Artist initial or small icon
   - On hover: Expand to show title
   
3. **Minimal text** (balanced)
   - 30px circle with artist first name
   - On hover: Show full title in tooltip
   
**Recommendation for hackathon:** Circular dots + hover tooltip. Simple, fast to implement, visually clear.

---

## Interaction Design: Hover (The Magic)

### Base State
- All tracks visible
- Normal opacity (1.0)
- No interaction active

### Hover Over a Track

**Calculate proximity** (distance in pixels from hovered track to all others):

```javascript
distance = sqrt((x2-x1)² + (y2-y1)²)
threshold = 150px (tunable)
```

**Apply visual feedback:**
- **Hovered track:** Brighten, enlarge slightly (focus indicator)
- **Nearby tracks (distance < 150px):** Brighten or show subtle glow (show relationship)
- **Distant tracks (distance ≥ 150px):** Fade slightly (de-emphasize)

**Transition speed:** <100ms (must feel responsive, not laggy)

### Example Interaction

```
User hovers over "Solar" (Bridge, Lock-in)
  ↓
System calculates distance to all 50 Pool Party tracks
  ↓
8 tracks within 150px light up
  ↓
User sees: "These tracks are musically adjacent"
  ↓
User hovers over one of those → discovers new relationship
  ↓
User clicks one → sees details
```

### Hover Away

Return to base state smoothly (<200ms transition). No jarring snap.

---

## Track Detail View

### Trigger
Click on any track in constellation

### Presentation Options

1. **Modal** (center-screen popup)
2. **Side panel** (slide in from right)
3. **Full-screen detail** (navigate away)

**Recommendation:** Side panel or modal. Stays in spatial context.

### Content

```
┌─────────────────────────────────┐
│         Solar                    │
│       (title)                    │
│                                  │
│  Artist:   Untitled (duo)        │
│  Duration: 6:42                  │
│  Plays:    2 ⚡ (UNDERPLAYED)    │
│                                  │
│  Pool Party | Bridge | Lock-in   │
│                                  │
│  [Close / Back]                  │
└─────────────────────────────────┘
```

### Visual Hierarchy

1. **Track title** (largest)
2. **Artist** (large)
3. **Tags** (medium, visual grouping)
4. **Duration + play count** (smaller)
5. **Underplayed badge** (prominent if applicable)

### Interaction

- Click outside → close
- Press Escape → close
- Click "Back" → return to constellation
- Smooth transition in/out (<300ms)

---

## Underplayed Signal

### Criteria
Play count < 5

### Visual Indicators (Pick One or Combine)

1. **Color:** Badge with contrasting color (e.g., gold star or flash icon)
2. **Icon:** Small emoji or glyph (⚡ lightning, ⭐ star, 🔥 fire)
3. **Outline:** Special border or glow around track
4. **Text:** "Underplayed" label

**Recommendation:** Icon overlay + subtle color shift. Works at distance and close-up.

**Placement:** Visible in constellation view (corner of track) AND in detail view (badge near play count).

### Purpose

Draws eye to forgotten material. Makes rediscovery obvious.

---

## Responsive Behavior (Desktop-First)

### Primary Device: Laptop/Desktop (16:9 aspect)

- **Viewport width:** 1200px–1600px
- **Grid fits fully:** All 12 cells visible without scroll
- **Readability:** Zone labels and hover effects work clearly

### Nice-to-Have: Tablet (iPad)

- **Grid scales:** Smaller but functional
- **Touch interaction:** Tap for detail (no hover)
- **Labels:** Repositioned if needed

### Out of Scope (MVP): Mobile

- No mobile optimization
- Tested on laptop only
- If mobile: Design would need rethink (touch vs. hover)

---

## Performance Targets

| Metric | Target | Why |
|--------|--------|-----|
| **Hover response** | <100ms | Feel tangible and responsive |
| **View transitions** | <300ms | Smooth, not jarring |
| **Page load** | <2s | Demo should start fast |
| **60fps on hover** | No jank | Smooth visual feedback |

**Critical path:** Optimize hover latency first. This is what proves spatial interaction works.

---

## Animation Philosophy

**Minimal but meaningful:**

- **Hover glow/brighten:** Immediate, subtle
- **Click detail view:** Slide in smoothly (200ms)
- **Phase transitions:** Fade or zoom (300ms)
- **Color changes:** Not instant; smooth transition (100–200ms)

**Avoid:**
- Spinning loaders (no loading delay)
- Fancy entrance animations (distract from content)
- Slow transitions (feel sluggish)

**Goal:** Animation reinforces structure, doesn't compete with content.

---

## Visual Hierarchy Summary

1. **Hovered track:** Brightest, largest, most prominent
2. **Nearby tracks:** Visible, slightly brightened
3. **Distant tracks:** Slightly faded (not invisible)
4. **Zone labels:** Always visible, consistent positioning
5. **Time/Setting color:** Constant background context (warm tones for Pool Party)

---

## Accessibility (Best Effort)

- **Color contrast:** Ensure text is readable (WCAG AA minimum)
- **Zone labels:** Text-based (not just color)
- **Hover tooltips:** Include title and basic info
- **No motion sickness:** No rapid flashing or extreme animation
- **Keyboard navigation:** Nice-to-have (arrow keys to move between tracks)

---

## Design System (For Consistency)

### Spacing
- **Grid cell:** 150px × 150px
- **Track size:** 30px radius (circle)
- **Padding:** 10px between elements
- **Container margin:** 20px

### Typography
- **Zone labels:** 14px, bold, sans-serif
- **Track detail title:** 24px, bold
- **Artist name:** 18px, regular
- **Metadata:** 12px, light gray
- **Tags:** 12px, bold, color-coded

### Colors
- **Pool Party base:** #FFD700 (gold)
- **Pool Party hover:** #FF8C00 (orange)
- **Text:** #333333 (dark gray)
- **Accent:** #FF6347 (tomato, for underplayed)
- **Background:** #FFFFFF (white)

---

## QA Checklist (Design)

- [ ] Zone labels are readable from 10+ feet away
- [ ] Hover response is snappy (<100ms)
- [ ] All 40–50 Pool Party tracks visible without scrolling
- [ ] Detail view shows all required info
- [ ] Underplayed signal is obvious
- [ ] Colors are intentional (no random choices)
- [ ] Transitions are smooth (no jank)

---

**Next:** See `IMPLEMENTATION-BRIEF.md` for technical stack and component breakdown.
