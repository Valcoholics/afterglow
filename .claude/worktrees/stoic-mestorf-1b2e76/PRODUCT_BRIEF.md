# Afterglow: Product Brief & Project Knowledge Base

**Project:** Afterglow  
**Context:** Music Hackspace Music Technology Hackathon, Lisbon  
**Challenge:** Algoriddim / djay: Novel ways to explore and organize music libraries  
**Date Last Updated:** 2026-05-15  

---

## North Star

**Afterglow is a spatial, context-aware DJ library browsing system that organizes music by emotional and situational logic rather than technical metadata alone.**

The goal: help DJs browse their whole library, rediscover forgotten tracks, organize intuitively, and trust their preparation in uncertain performance situations.

The working title name is **preserved**. Afterglow points to the lingering emotional trace after an intense experience—sunrise after a long night, the soft descent after peak energy, the warmth that remains after a party. It also suggests rediscovering tracks that still "glow" emotionally even if buried in a library.

---

## The Real Use Case (Core Grounding)

This project is not an AI recommendation engine. It exists because **DJs perform in uncertain, spontaneous contexts** where they don't know their setting in advance.

✓ **Real scenarios that define the problem:**
- House parties with no set time (could play 6 pm or 6 am)
- Burning Man camps with undefined start/end
- Pool parties without a timeline
- Festival brunches with uncertain slot length
- Afterparties with crowd state unknown in advance
- Ad hoc gigs where prep time is minimal

In these situations, DJs often navigate by **emotional and situational logic**, not by technical metadata (genre, BPM, key). But their library organization systems are built around the latter, creating a gap.

**The friction:**
- Newer or casual DJs feel blocked by how they organize music
- Great tracks get lost because they don't fit existing folders or indexing
- Organizing becomes mentally heavy and overly technical
- This takes time away from practicing and playing
- Confidence drops when gigs are spontaneous or uncertain

---

## Why Afterglow Matters

→ **What this project aims to solve:**

1. Help newer DJs who feel blocked by current organization systems
2. Prevent tracks from getting lost because they don't fit cleanly into existing structures
3. Reduce mental load and prep time of organizing music
4. Support a more emotional and creative prep process (not just technical)
5. Help DJs rediscover underplayed or forgotten tracks
6. Encourage cross-genre experimentation by organizing around vibe rather than strict genre
7. Give casual or emerging DJs **confidence in spontaneous or ad hoc performance situations**

The core insight: **Library browsing should reflect how DJs actually think and perform, not how music is traditionally taxonomized.**

---

## Product Vision & Direction

### Tone & Feel

**Utility + Expression.**

- Grounded in real-world use cases (Burning Man, uncertain events)
- Professional enough to present as a credible product demo
- Not precious or overly artistic; not bland or corporate
- Browsing experience feels **spatial and tangible**—discovering and moving through music, not clicking rigid filters

### Interface Direction: Three-Layer Navigation

✓ **DECIDED: The core interaction model is three-tier:**

1. **Timeline of the day first** — phases from warm-up through sunrise
2. **Constellation / spatial mood view** — inside each time band, a visual clustering of emotional/contextual moods
3. **Filtered track browsing** — drill into individual tracks and their metadata

This is not negotiable. The timeline anchors the user to a real scenario.

### Visual & Spatial Approach

→ **STRONG DIRECTION:**

- Borrowing visual inspiration from Obsidian-like relationship maps but **cleaner, more product-like, less chaotic**
- Spatial clustering that makes adjacent moods discoverable
- Visual proximity between tracks or moods (adjacent moods are nearby, distant moods are farther)
- A sense of **movement and navigation** rather than grid-based or list-based browsing
- The whole library is browseable, not just a filtered subset

→ **Why this matters:** The spatial approach naturally supports the uncertain DJ use case. Instead of "I need a Warm-up Deep House track," the interface says, "What's available in the Warm-up + Lock-in zone?" and lets the DJ discover what's actually there.

---

## Core Vocabulary & Tagging System

→ **DECIDED: Multiple dimensions of tagging so one track belongs to multiple emotional and contextual lanes.**

The system uses three orthogonal tag dimensions:

### 1. Time / Setting (When & Where)

These describe the time of day and event context in which a track might be useful.

- **Warm-up** — Early arrival, introductory vibe, people still settling in
- **Pool party** — Daytime, social, carefree, often more straightforward energy
- **Festival brunch** — Daytime, groovy, fun, often slightly less intense than night
- **Post-game** — After a main event, winding down but still social, reflective
- **Sunrise reset** — Long night ending, transition toward new day, often introspective or ethereal

✓ **These are decided.** The language is specific to real scenarios and the emotional arc they carry.

### 2. Journey Role (What the track does in a set)

These describe the functional role of a track in the **arc of a DJ set or performance**.

- **Opener** — Establishes the initial energy or mood; may be bold or subtle
- **Bridge** — Transitions between two different zones or energies; creates momentum shifts
- **Reset** — Recalibrates the crowd or energy; often a moment of breath or reflection
- **Home stretch** — The final chosen replacement for "landing the plane." Moves toward closure or rest.

✓ **These are decided.** "Home stretch" replaces "landing the plane."

### 3. Crowd State (Who's here now)

These describe the emotional, social, or energetic state of the people present.

- **Arrivals** — People are still coming in; energy is building but not unified
- **Lock-in** — Full attention, deep engagement, the crowd is together and committed
- **Wanderers** — People are moving around, chatting, not all facing the booth; more ambient acceptance

✓ **These are decided.** They map to real crowd dynamics, not just energy levels.

### Decision: Track-Level Attributes

→ **Each track should display:**
- Artist
- Play count (internal metric)
- Potentially "underplayed" or "rediscovery" signals
- The tags it carries (visual clustering in the timeline/constellation)

? **OPEN: Should play count and underplayed signals be visible to the user in the MVP, or should they be internal metrics used for algorithm or recommendation, not user-facing?**

---

## Interaction & UX Ideas

→ **STRONG DIRECTION: The system should help a DJ browse the whole library, not just solve the first-track problem.**

The experience could include:

1. **Timeline view** — A horizontal or radial timeline of day-to-night-to-sunrise phases
2. **Constellation within each phase** — A spatial clustering of moods/tags; moods that go together are near each other
3. **Visual clustering** — Adjacent moods are discoverable; the interface hints at what's nearby
4. **Proximity as discovery** — A track tagged as "Warm-up + Lock-in" is visually positioned between those two zones
5. **Track details** — Click into a track to see artist, play count, tags, and why it belongs in this zone
6. **Rediscovery signals** — Highlight underplayed tracks or moods that need attention
7. **Browse whole library** — The interface scales to show the full library, not just a filtered subset

→ **Why this matters:** The spatial approach turns prep from "searching for a specific thing" into "discovering what I have and how it moves through a night." This is closer to how DJs actually think.

---

## Visual & Aesthetic Direction

→ **STRONG DIRECTION:**

- **Inspiration:** Obsidian-like relationship maps, but cleaner, more product-like, less chaotic
- **Feel:** Spatial navigation, tangible movement, discoverable clusters
- **Tone:** Professional, grounded, not overly artistic
- **Collaboration note:** Working with a teammate who has visualization experience; visual direction should prioritize spatial clarity and mood over maximum information density

? **OPEN: Specific color palette, iconography, and interaction patterns (hover states, transitions, focus states) — to be defined in design phase**

---

## Constraints (What We Will NOT Do)

✓ **DECIDED:**

1. **Not a generic "AI DJ assistant" concept.** No robot decision-making. The system helps the human DJ navigate and organize their own library.

2. **Not an all-in-one DJ platform.** We're solving library browsing and organization, not mixing, beatmatching, effects, or hardware integration.

3. **Lighter technical scope with strong storytelling.** This is a prototype for a hackathon. The experience should feel polished and credible, but we're not building a production system.

4. **Credible, demoable, plausibly fits into or alongside djay.** The concept should feel like a natural fit for an existing djay workflow, not a standalone tool that requires DJs to adopt a whole new platform.

5. **Do not sprawl.** Future ideas are tracked but not in MVP scope.

---

## Future Features (Not MVP)

? **HYPOTHESIS / BACKLOG:**

These are ideas that could extend the core concept but are explicitly out of scope for now:

- Shared folders or collaborative crates (multiple DJs organizing together)
- Artist credit visibility and discovery (find all your [artist] tracks across the library)
- Visual context for lighting design or stage visuals (e.g., "these tracks work well with blue/warm lighting")
- Analytics like most-played artists, neglected zones, or replay patterns
- Integration with external playlists or streaming data
- Collaborative tagging or community mood definitions

**Decision rule:** These are added only if the core experience is strong enough to support them.

---

## Current Design Thinking & Decisions

### Why a Timeline-First Approach?

The timeline grounds the DJ in reality. Instead of abstract mood space, the DJ first asks: "What time of night am I playing?" or "What's the event context?" The timeline answers that, then opens into mood space.

This is especially powerful for uncertain scenarios. If you don't know whether you're playing at 6 pm or 6 am, you can browse both zones and rediscover what you have.

### Why Spatial/Constellation Instead of Lists or Filters?

Lists and rigid filters feel prescriptive. Spatial arrangement supports discovery. A track tagged "Bridge + Wanderers + Pool party" can exist between those zones in the visualization, and the DJ's eye naturally finds it.

This also honors how experienced DJs already think: they mentally map moods and transitions, not lists.

### Why Multiple Tag Dimensions?

A single tag system (e.g., "Chill," "Energetic") is too flat. By using Time, Journey Role, and Crowd State as separate dimensions, one track can serve many purposes and live in multiple conceptual locations.

Example: A track could be "Warm-up + Bridge + Lock-in," meaning it works early on, helps you transition between energy zones, and can handle a focused crowd.

### Why "Home Stretch" Over "Landing the Plane"?

"Home stretch" is more precise: it captures the final push toward rest or closure without the aviation metaphor. It's also more grounded in the actual DJ experience (the last songs of a set).

---

## Open Questions & Decisions Pending

### On MVP Scope

? **What's the minimum viable track count?** 50 tracks? 500? Does the spatial visualization scale gracefully, or do we need a demo dataset?

? **How does the user populate their library initially?** Upload from djay? Spotify? Manual import? Or do we work with a pre-populated demo set for the hackathon?

? **How are tags assigned?** Manual tagging by the user? Suggested tags based on metadata? A hybrid?

### On the Spatial Visualization

? **What is the actual spatial arrangement?** 
- Is it a 2D grid or continuum (e.g., x-axis = time, y-axis = energy)?
- Is it a radial timeline with moods radiating outward?
- Is it a free-form node graph with proximity-based clustering?
- How do we balance visual beauty with information clarity?

→ **Guidance:** It should feel tangible and discoverable, but not so abstract that the DJ loses context.

? **How do we visualize track overlap across dimensions?** If a track lives in multiple zones (e.g., "Warm-up" and "Pool party"), how is it shown? Duplicate nodes? Shared placement? Visual bridges?

### On Interaction

? **What is the primary interaction flow?**
1. Time phase → mood zone → track details?
2. Or: full library view → zoom into phase → zoom into mood?
3. Do we support search/filter as a secondary path?

? **How much information is shown in the constellation view vs. drill-down?** Do track names appear? Just dots? Icons?

? **What is the "happy path" for a DJ using this to prep for a gig?**
- Is it: "I have 2 hours, let me see what I have for evening play"?
- Or: "I want to rediscover tracks I haven't played in a month"?
- Or: "I have a pool party in 30 min, what's available?"

All three might be valid, but we should have a clear primary use case for the demo.

### On Technical Approach

? **How do we store / represent tags and clusters?**
- Simple: track metadata JSON with tag arrays
- Complex: graph database with relationship queries

? **Do we build a backend, or is this a frontend-only prototype with mock data?**

? **What is the data format for demo / import?** JSON? CSV? Spotify API?

---

## Out-of-Scope Questions (Not Blocking MVP)

These are real challenges but not essential for the hackathon prototype:

- How do we prevent tag creep (users inventing endless custom tags)?
- What happens if a track genuinely doesn't fit any time/role/crowd dimension?
- How do we handle playlists or crates (pre-made collections)?
- How does this integrate with djay's existing library interface?
- How do we make this work at scale (10k+ tracks)?
- Should there be a "mood generation" or suggestion system?

---

## Success Criteria for Hackathon Demo

✓ **A credible, walkable prototype that:**
- Demonstrates the timeline + constellation + track browsing flow
- Shows at least one realistic scenario (e.g., "preparing for a house party")
- Feels spatial and discoverable, not like a form
- Displays a library of at least 50–100 tracks with tags
- Clearly communicates the core idea to judges and viewers
- Could plausibly fit into or extend djay

? **Secondary:** Does it spark conversations about how DJs actually organize? Can judges or other DJs imagine using this?

---

## Collaboration Notes

### For Your Teammate (Visualization)

The spatial/constellation approach is central to the concept. The visualization needs to:
- Make proximity mean something (adjacent moods = adjacent tracks)
- Support discovery (a DJ's eye should land on neighboring tracks naturally)
- Remain clean (Obsidian is inspiring, but not the target aesthetic)
- Scale to at least 100–200 tracks without chaos

The timeline is the anchor. Everything else lives inside it.

### For Teammates (Development / Product)

The core decision-making framework is:
1. **Does it ground the user in a real scenario?** (Uncertain gigs, spontaneous play contexts)
2. **Does it reduce friction for newer or casual DJs?** (Not just power users)
3. **Does it fit alongside djay?** (Not a full platform replacement)

If a feature or interaction passes these three tests, it's worth exploring.

---

## Version History

| Date | Change | Owner |
|------|--------|-------|
| 2026-05-15 | Initial knowledge base created from product brief | Jasmine |
| | | |

---

## Questions or Amendments?

If your teammate or you realize something needs refinement, updating this document is the source of truth. Flag changes with a comment or version note.

Core concept is solid. Details are flexible. Grounding in real use case is non-negotiable.
