# MVP & Scope: Hackathon Demo Strategy (Judge-Aware)

**Goal:** A credible, walkable prototype that demonstrates the core idea in 5–7 minutes with light technical scope.

**Philosophy:** Strong storytelling + clear core mechanic > polish + features. We'd rather show one scenario beautifully than three scenarios partially.

**Judge Context:** These recommendations are shaped by the panel's lenses: product fit & DJ workflow (Romain), musical sophistication (Carlos), intentional spatial design (Yan), artistry respect (Richie), human-centered clarity (Michele), and product thinking (JB).

---

## MUST-HAVE FOR DEMO (Judge-Aware)

### 1. Timeline View (Phase Selection)

**What it is:**
A visual representation of the day's five phases. DJ clicks one phase to enter the constellation view.

**Judge alignment:** All judges need this to understand the three-layer model.

**Success criteria:**
- Phases are clear (Warm-up, Pool Party, Festival Brunch, Post-game, Sunrise Reset)
- Clicking transitions smoothly to constellation view
- No confusion about what a phase means

---

### 2. ONE Beautiful Pool Party Constellation (Not Multiple Phases)

**What it is:**
A fully developed spatial mood map for Pool Party only. Show three zones: Arrivals, Lock-in, Wanderers. 40–50 Pool Party tracks positioned intentionally.

**Why this scope:**
- Light technical scope (one phase = better quality than three mediocre phases)
- Judges see exactly how the system works
- Time saved allows focus on polish and demo practice

**Judge alignment:**
- **JB Thiebaut** (good scope thinking, product clarity)
- **Yan Kalnberzin** (one beautiful thing > three scattered things)
- **Romain Pouillon** (realistic, credible scope)

**Success criteria:**
- All three zones are visually distinct and labeled
- Spatial positions are intentional (traceable to tags)
- No algorithmic clustering—every position is justified
- Responsive hover interaction (nearby tracks fade in/highlight)

---

### 3. Spatial Positioning Is Intentional, Not Algorithmic

**What it is:**
Track positions in the constellation are hardcoded or manually positioned based on tags. Not computed by force-directed graphs or clustering algorithms.

**Why this matters:**
- Every position must answer the question "why is this track here?"
- Judges (especially Yan) need to see intentional design, not emergent/random behavior
- Avoids black-box algorithm confusion
- Faster to implement and control

**Judge alignment:**
- **Yan Kalnberzin** (intentional design is non-negotiable)
- **JB Thiebaut** (over-engineering is not clever)
- **Romain Pouillon** (clarity > complexity)

**Spatial encoding example:**
- X-axis: Journey Role (Opener on left ← → Home Stretch on right)
- Y-axis: Crowd State (Arrivals on top ↑ → Wanderers on bottom ↓)
- Each track positioned at the intersection of its Role and State
- Color or grouping indicates Time/Setting (Pool Party)

---

### 4. Tagging System Framed as "DJ Decision-Making," Not "Moods"

**What it is:**
Tags represent how DJs actually think: Time/Setting (when?), Journey Role (why?), Crowd State (who's listening?).

**Language to use:**
- "DJ decision-making dimensions"
- "Performance contexts"
- "Set functions"
- "Crowd attention states"

**Language to avoid:**
- "Moods" or "vibes"
- "Emotional categories"
- "Feel-based organization"

**Why this matters:**
- **Carlos Caires** needs musical sophistication (decision-making > mood tags)
- **Michele Darling** needs precision (DJ logic is learnable; mood is subjective)
- **Richie Hawtin** needs respect for DJ intelligence (thinking > feeling)

**Judge alignment:**
- **Carlos Caires** (musical sophistication)
- **Michele Darling** (learnability, precision)
- **Richie Hawtin** (respects artistry)

---

### 5. Demo Library Uses Real Tracks, Authentically Tagged

**What it is:**
100–150 tracks using real music with real artist names. All tracks genuinely curated and tagged by the DJ creating the demo.

**Why this scope:**
- **Romain Pouillon** (DJ himself) will know immediately if tracks are inauthentic
- Authenticity builds credibility with all judges
- Allows genuine cross-genre combinations
- Makes rediscovery feel earned

**Track selection:**
- Real Creative Commons or royalty-free tracks
- Genres: house, techno, deep house, garage, soul, funk, ambient, breaks, world
- Include 2–3 tracks by same artist (proves cross-context discovery)
- 3–5 underplayed tracks (play count 0–5) positioned in different zones

**Judge alignment:**
- **Romain Pouillon** (musical authenticity)
- **Carlos Caires** (respects real musical choices)
- **Richie Hawtin** (can sense sincerity)

---

### 6. The Rediscovery Track Is Real and Credible

**What it is:**
One specific track in the demo library that:
- Has play count ≤ 5
- Legitimately belongs in the Lock-in zone (tags justify it)
- Is musically good (any DJ would play it)
- Creates an "oh right, I have exactly this" moment

**Why it matters:**
- This is the universal hero moment (all judges will lean in)
- If it feels forced, the entire concept loses credibility
- Emotional payoff for the demo

**Judge alignment:**
- **All judges** (universal moment)
- Especially: **Romain** (musical quality), **Carlos** (context rightness), **Richie** (genuine discovery)

**How to choose:**
- When curating the demo library, identify 2–3 candidates
- Pick the one that feels most resonant
- Verify: real track, legitimate underplay, genuine fit

---

### 7. Hover Interaction Shows Spatial Proximity Working

**What it is:**
When user hovers over a track or zone, nearby related tracks respond visually: fade in, highlight, or brighten.

**Why it matters:**
- **Yan Kalnberzin** needs to see the spatial interface is *functional*, not decorative
- Interaction proves spatial logic is real (proximity = relationship)
- Demonstrates responsiveness and intentionality

**Judge alignment:**
- **Yan Kalnberzin** (intentional, responsive design)
- **Romain Pouillon** (usability proof)
- **Michele Darling** (intuitive interaction)

**Interaction example:**
1. User hovers over "Solar Pool" track
2. Nearby Lock-in tracks fade in or brighten
3. Distant Arrivals/Wanderers tracks fade out
4. Feedback is immediate (<100ms latency)
5. Demonstrates relationship visually

---

### 8. Zone Labels Are Explicit

**What it is:**
The three zones (Arrivals, Lock-in, Wanderers) are clearly labeled with text or visual grouping. No guessing what a cluster means.

**Why it matters:**
- **JB Thiebaut** values clarity (no ambiguity)
- **Michele Darling** values learnability (labels = onboarding)
- **Carlos Caires** wants to understand the logic

**Judge alignment:**
- **JB Thiebaut** (clarity)
- **Michele Darling** (learnability)
- **Carlos Caires** (logical transparency)

**Implementation:**
- Text labels positioned in or near zones
- Visual grouping (background colors, subtle borders)
- Or combination of both
- Tooltips secondary to primary labels

---

### 9. Demo Script Emphasizes DJ Artistry and Agency

**What it is:**
The walkthrough and all framing position Afterglow as a *browsing and organization tool* that supports DJ decision-making, not as a system that recommends or decides what to play.

**Language to use:**
- "Organize your library by how you actually navigate"
- "Discover material you've forgotten"
- "Browse your whole library quickly"
- "Explore cross-genre combinations"

**Language to avoid:**
- "Recommend tracks"
- "Suggest playlists"
- "The system decides what to play"
- "AI-powered curation"

**Why it matters:**
- **Richie Hawtin** will reject any hint of automation replacing DJ judgment
- **Carlos Caires** will see automation as musically unsophisticated
- **Michele Darling** will see it as overpromising on AI
- Sets realistic expectations

**Judge alignment:**
- **Richie Hawtin** (artistry is non-negotiable)
- **Carlos Caires** (respects musicianship)
- **Michele Darling** (human-centered design)

---

## NICE-TO-HAVE (If Time Allows)

### 1. Underplayed Signal (Visual Indicator)

**What it is:**
Tracks with play count < 5 marked with an icon, color shift, or badge.

**Why it's nice:**
- Strengthens the rediscovery narrative
- **Michele Darling** will appreciate the affordance (visual signal = good UX)

**Judge alignment:**
- **Michele Darling** (design clarity)
- **Carlos Caires** (musical sense)
- **Romain Pouillon** (feature utility)

**Time:** 3–5 hours

---

### 2. A Second Time Phase (Sunrise Reset) as Bonus

**What it is:**
If Pool Party is polished by day 4, build a second constellation (Sunrise Reset) with 40–50 tracks.

**Why it's nice:**
- Shows concept scales across contexts
- **Richie Hawtin** will appreciate creative breadth
- **Carlos Caires** will see musical diversity

**Judge alignment:**
- **Richie Hawtin** (creative range)
- **Carlos Caires** (musical diversity)
- **Romain Pouillon** (completeness)

**Decision rule:**
Only if Pool Party is solid. One beautiful phase > two mediocre phases.

**Time:** 15–20 hours (skip if behind)

---

### 3. Smooth Zoom Transition (Timeline → Constellation)

**What it is:**
Clicking from timeline to constellation uses a subtle zoom or fade (not a hard cut).

**Why it's nice:**
- **Yan Kalnberzin** appreciates thoughtful micro-interactions
- Reinforces "tangible" spatial feeling
- Coherent experience

**Judge alignment:**
- **Yan Kalnberzin** (interaction design)
- **Michele Darling** (intuitive flow)

**Time:** 3–5 hours

---

### 4. Light Onboarding / Tooltips

**What it is:**
On first visit: "This is the Pool Party phase. Click to explore. Hover to see related tracks."

**Why it's nice:**
- **Michele Darling** appreciates learning support
- Reduces friction for judges unfamiliar with system

**Judge alignment:**
- **Michele Darling** (educational clarity)
- **JB Thiebaut** (efficiency)

**Time:** 2–3 hours

---

## EXPLICITLY OUT OF SCOPE

### ✗ Audio Playback

**Why not:**
- Out of scope for a prep/organization tool
- **Romain Pouillon** respects honest scoping
- **JB Thiebaut** sees it as scope creep
- Licensing complexity adds weeks

**What to do instead:**
- In detail view, link: "Play on Spotify" or "Listen on SoundCloud"
- Demo says: "Organization happens here. Playback happens in djay."

**Post-hackathon:** Spotify/SoundCloud API as optional feature

---

### ✗ AI or Algorithmic Recommendations

**Why not:**
- **Richie Hawtin** will see it as removing DJ agency
- **Carlos Caires** sees it as musically unsophisticated
- **JB Thiebaut** sees it as infeasible in a hackathon
- Contradicts core message (DJ artistry is central)

**What to do instead:**
- Manual tagging proves the concept
- Spatial browsing surfaces discoveries organically
- Post-hackathon: optional tag suggestions based on metadata (not decisions)

---

### ✗ Real djay SDK Integration

**Why not:**
- djay SDK is complex (10+ hours)
- **JB Thiebaut** respects honest scoping
- **Romain Pouillon** appreciates clarity
- Better to say "designed for djay" than to attempt half-baked integration

**What to do instead:**
- Design as if sitting alongside djay
- Demo says: "You organize here, then load into djay to play"
- Show a mock "Export to djay" button (shows intent without integration)

**Post-hackathon:** Approach Algoriddim about real SDK integration

---

### ✗ User Accounts & Persistent Library

**Why not:**
- Requires backend (10+ hours)
- Demo doesn't need persistence
- **JB Thiebaut** sees it as scope creep

**What to do instead:**
- Load demo library from JSON on page open
- In-memory changes only (lost on refresh, judges don't care)
- Note: "Post-hackathon: user accounts and cloud sync"

---

### ✗ Custom Tags

**Why not:**
- Adds complexity (creation, validation, management)
- Demo is stronger with clean, fixed taxonomy
- Risk of tag creep (50 custom tags = chaos)

**What to do instead:**
- Use nine core tags (3 per dimension)
- Prove sufficiency in demo
- Post-hackathon: custom tags with user research

---

### ✗ Generic "Mood" Language

**Why not:**
- **Carlos Caires** sees it as musically reductive
- **Michele Darling** sees it as imprecise
- Undermines tagging system sophistication

**What to do instead:**
- Use "DJ decision-making dimensions"
- Explain tags as answers to three questions
- Demonstrate multi-tagging shows versatility

---

## Judge Resonance: What Matters Most

| Judge | Single Most Important Decision |
|-------|--------------------------------|
| **Romain Pouillon** | Real track demo library (authenticity) |
| **Carlos Caires** | "DJ decision-making" framing + real tracks |
| **Yan Kalnberzin** | Intentional spatial design + hover interaction |
| **Richie Hawtin** | Emphasize artistry/agency, avoid automation |
| **Michele Darling** | Clear zone labels + underplayed signal |
| **JB Thiebaut** | One Pool Party phase + clear scope |

---

## Time Budget (Realistic)

| Category | Hours | Priority |
|----------|-------|----------|
| **Must-Haves** | 35–50 | Critical |
| Timeline view | 4–6 | ✓ |
| Pool Party constellation | 12–16 | ✓ |
| Track detail view | 4–6 | ✓ |
| Demo library (150 tracks) | 6–10 | ✓ |
| Intentional spatial positioning | 4–8 | ✓ |
| Hover interaction + zone labels | 3–5 | ✓ |
| Demo script + practice | 2–3 | ✓ |
| **Nice-to-Haves** | 20–35 | Optional |
| Underplayed signal | 3–5 | If time |
| Second phase | 15–20 | If time |
| Smooth transitions | 3–5 | If time |
| Onboarding | 2–3 | If time |
| **Out of Scope** | (saved time) | ✗ |
| Audio playback | 8–12 | ✗ |
| AI recommendations | 8–12 | ✗ |
| Real djay integration | 10–15 | ✗ |
| Custom tags | 5–8 | ✗ |

**Total for strong demo:** 35–50 hours (1–2 weeks)

---

## Implementation Checklist

Before building:

- [ ] Confirm: Pool Party constellation only (not all five phases)
- [ ] Confirm: Real tracks for demo library, not dummy data
- [ ] Confirm: Spatial positions intentional (hardcoded/manual, not algorithmic)
- [ ] Confirm: No automation language in docs or script
- [ ] Confirm: Using "DJ decision-making dimensions," not "moods"
- [ ] Identify: Rediscovery track (play count ≤ 5, genuinely good)
- [ ] Design: Zone labels (Arrivals, Lock-in, Wanderers visibility)
- [ ] Build: Hover interaction (track response on hover)
- [ ] Practice: Demo script emphasizes artistry and exploration

---

## Status

| State | Items |
|-------|-------|
| **Decided** | Must-haves (9), nice-to-haves (4), out-of-scope (6) |
| **Judge-Aligned** | All recommendations rated by judge resonance |
| **Time-Budgeted** | Realistic hours for each component |
| **Ready** | For implementation planning |
