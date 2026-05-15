# Product Requirements Document: Afterglow

**Version:** 1.0  
**Status:** Greenlit  
**Date:** May 15, 2026  
**Hackathon:** Music Hackspace Music Technology Hackathon, Lisbon

---

## 1. Overview

**Product Name:** Afterglow

**One-Line Description:** A spatial DJ library browsing system organized by timeline of day and performance contexts instead of metadata alone.

**Tagline:** "Organize your library by how you actually DJ. Discover what you have. Feel confident in uncertain gigs."

---

## 2. Problem Statement

### The Real Problem
DJs organize their libraries with technical metadata (genre, BPM, key) because that's what existing tools support. But when actually preparing to perform, DJs navigate by emotional and situational logic: **When would I play this? Why? What's the crowd state?**

This mismatch is especially painful for **emerging and casual DJs in spontaneous scenarios**:
- Asked to play a house party with 2 hours notice
- Booked for a festival brunch with unknown timing
- Playing a Burning Man camp at unpredictable hours
- Last-minute event bookings where setup is uncertain

**Current friction:**
- Great tracks get lost because they don't fit folder structures
- Organization is mentally heavy; takes time away from practicing
- Confidence drops when gigs are spontaneous
- Browse experience is linear (lists, filters) not exploratory (discovery)

### Why It Matters
An emerging DJ who feels blocked by their organization system stops DJing. A confident DJ discovers cross-genre combinations they wouldn't have found otherwise. Organization directly impacts creativity and performance.

---

## 3. Solution Overview

### What Afterglow Is
A three-layer library browsing system:

1. **Timeline of the Day** — Choose your scenario (Pool Party, Sunrise Reset, Post-game, etc.)
2. **Spatial Mood Constellation** — Spatial arrangement of your library by performance contexts (who's here? what role does this track play?)
3. **Track Details** — Click to see artist, duration, tags, play count, and why it belongs in this zone

### What Afterglow Is NOT
- A recommendation engine (DJ decides; system organizes)
- A mixing or playback tool (prep tool, not performance tool)
- An all-in-one DJ platform (scoped library browsing only)
- A mood tagging system (tags reflect DJ decision-making: when/why/crowd)

### Core Value
- **For the DJ:** Prep a spontaneous gig in 10 minutes instead of 30+. Rediscover forgotten material. Feel confident.
- **For emerging DJs:** Reduce mental load of organizing. Make better use of their library.
- **For the product:** Organize libraries the way DJs actually think, not how systems traditionally categorize.

---

## 4. Target User

### Primary User
**Emerging and casual DJs** (playing 1–4 gigs/month, 500–5,000 tracks)
- Often self-booked or spontaneously asked to play
- May feel overwhelmed by organization systems
- Needs confidence in uncertain situations
- Thinks in moods and moments, not BPM/genre

### Secondary User
**Experienced DJs** who want to:
- Rediscover underplayed material
- Explore cross-genre combinations
- Organize around performance contexts (not just metadata)

### All Users
Anyone preparing for **uncertain performance scenarios** (unknown timing, unknown crowd, unknown setup).

---

## 5. User Stories (MVP Scope)

### Story 1: Quick Prep for a Spontaneous Gig
**As a** DJ who just got texted about a pool party in 2 hours  
**I want to** see what I have for "Pool Party" context all at once  
**So that** I can find material fast without scrolling through 50 track names

**Acceptance Criteria:**
- Open Pool Party phase
- See all Pool Party tracks organized by zone (Arrivals, Lock-in, Wanderers)
- Scan in <2 minutes
- Find 3+ usable tracks

---

### Story 2: Understand Why a Track Belongs Somewhere
**As a** DJ browsing the constellation  
**I want to** click a track and see why it's positioned in this zone  
**So that** I understand the system's logic and trust the organization

**Acceptance Criteria:**
- Click track → detail view shows artist, duration, tags
- Tags explain: When? Why? What crowd?
- Can see play count + underplayed flag

---

### Story 3: Rediscover Forgotten Material
**As a** DJ prepping a gig  
**I want to** find tracks I haven't played in months  
**So that** I have fresh material and feel more confident

**Acceptance Criteria:**
- Underplayed tracks are marked (play count < 5)
- Underplayed tracks appear in relevant zones
- Visual signal makes rediscovery obvious

---

## 6. Functional Requirements

### Timeline View
- **Display:** Five time phases (Warm-up, Pool Party, Festival Brunch, Post-game, Sunrise Reset)
- **Interaction:** Click phase → loads constellation view
- **Behavior:** Visual feedback on selected phase

### Constellation View (Pool Party Only)
- **Display:** Spatial arrangement of 40–50 Pool Party tracks
- **Zones:** Three visually distinct zones (Arrivals, Lock-in, Wanderers)
- **Zone labels:** Clear text labels or visual grouping
- **Spatial logic:** X-axis = Journey Role (Opener → Home Stretch), Y-axis = Crowd State (Arrivals → Wanderers)
- **Interaction:** Hover shows nearby tracks; click shows details
- **Visual feedback:** Responsive (<100ms latency)

### Track Detail View
- **Display:** Artist, duration, tags (Time/Setting, Journey Role, Crowd State), play count
- **Signal:** Underplayed flag (play count < 5)
- **Interaction:** Click to view, back to constellation

### Spatial Positioning
- **Approach:** Intentional (hardcoded/manual), not algorithmic
- **Justification:** Every track position traceable to its tags
- **Result:** DJ can understand "why is this track positioned here?"

---

## 7. Non-Functional Requirements

### Performance
- Hover interaction response: <100ms
- Navigation between views: smooth, <300ms
- No crashes or broken states during demo

### Data
- 150 tracks in demo library
- Track metadata: artist, title, duration, play count, three tags (Time, Role, Crowd)
- Format: JSON or similar (loadable in frontend)

### Responsiveness
- Works on laptop/desktop (primary)
- Readable at presentation distance (10+ feet away)
- Color contrast is accessible

---

## 8. Out of Scope (MVP)

### Explicitly NOT Building
- Audio playback / music player
- AI or algorithmic recommendations
- Real djay SDK integration
- User accounts or persistent storage
- Custom tag creation
- Search or filter UI
- Analytics dashboard
- Multiple fully-built time phases (Pool Party only)

### Why These Are Out of Scope
- Keep technical scope light (24-hour sprint)
- Solve the core problem (library browsing) before adding features
- Don't confuse the user with extra features
- Maintain focus on demo narrative

### Post-Hackathon Roadmap
- Real djay integration
- User accounts + cloud sync
- All five time phases
- Optional algorithmic tag suggestions
- Analytics and insights

---

## 9. MVP Scope Summary

### What You're Building
1. **Timeline view** showing five day phases
2. **Pool Party constellation** with three zones, 40–50 real tracks
3. **Track detail view** showing artist, tags, play count
4. **Demo library:** 150 real Creative Commons/royalty-free tracks, manually tagged
5. **Hover interaction** showing spatial proximity
6. **Clear zone labels** (Arrivals, Lock-in, Wanderers)

### What You're NOT Building
- Other time phases (fully built)
- Audio or playback
- AI or recommendations
- User signup or persistence
- djay integration
- Search or advanced filtering

### Why This Scope
- Proves the concept works for one real DJ scenario
- Fits in 24-hour sprint (35–50 hours)
- Shows quality over quantity (one polished phase > three scattered)
- Solves the core problem (prep for uncertain gigs)

---

## 10. Key Decisions (Greenlit)

| Decision | Status | Why |
|----------|--------|-----|
| Pool Party phase only | ✓ Greenlit | Proves concept, realistic scope, one beautiful demo |
| Intentional spatial positioning | ✓ Greenlit | Controllable, traceable logic, DJ understands placement |
| Real track demo library | ✓ Greenlit | Authenticity matters; dummy data would be obvious |
| Three dimensions, nine tags | ✓ Greenlit | Reflects real DJ thinking; not reductive |
| Manual tagging | ✓ Greenlit | Quality > speed; DJ curation is honest |
| "DJ decision-making" language | ✓ Greenlit | Respects musical sophistication; not "mood" reduction |
| Emphasis on DJ artistry in demo | ✓ Greenlit | System organizes; DJ decides (no automation) |

---

## 11. Success Criteria (For Hackathon)

### Minimum Success
- Judges understand the core idea (three-layer model)
- Demo runs without crashes
- Rediscovery moment resonates

### Target Success
- A judge asks "when can I try this?"
- Real DJ in the crowd engages with the concept
- Judges mention it to other judges

### Must-Have Technical Success
- Timeline view works reliably
- Constellation loads with real tracks
- Zone labels are clear
- Hover interaction is responsive
- Detail view shows all track info
- Demo script is practiced and under 7 minutes

---

## 12. Demo Narrative (High-Level)

### 30-Second Hook
DJ gets asked to play pool party with 2 hours notice. Opens Afterglow instead of drowning in metadata. Different approach. Same goal: confidence.

### 60-Second Full Story
Problem (metadata mismatch) → Insight (DJs navigate by context) → Solution (organize by when/why/crowd) → Benefit (faster prep, rediscovery, confidence).

### 5–7 Minute Walkthrough
1. Open Pool Party phase (30 sec)
2. Show constellation with three zones (90 sec)
3. Explain spatial logic (60 sec)
4. Find + click rediscovery track (60 sec)
5. Show the arc (Arrivals → Lock-in → Wanderers) (45 sec)
6. Close with confidence moment (30 sec)

---

## 13. Team & Timeline

### Team Composition
- **PM / Visionary:** Curate demo library, own narrative, make product calls
- **Visualizer / Creative Technologist:** Design spatial encoding, build UI, implement interactions

### Timeline (Hackathon)
- **Hours 0–2:** Planning & setup (confirm spatial encoding, start library)
- **Hours 2–8:** Heavy lift (finish library, build timeline + constellation structure)
- **Hours 8–16:** Integration (load real data, add zone labels, implement hover)
- **Hours 16–22:** Testing & refinement (walkthrough, fix bugs, polish)
- **Hours 22–24:** Final polish & backup (one full run-through, screenshots, fallback plan)

### Success Definition
- **By hour 24:** Walkable demo, no crashes, rediscovery moment testable, script practiced

---

## 14. Assumptions & Risks

### Assumptions
- Real CC/royalty-free tracks are available and findable (Creative Commons Music, Bandcamp, Free Music Archive)
- Spatial browsing is genuinely faster than list browsing (hypothesis to prove in demo)
- Manual tagging for 150 tracks is feasible in 6–8 hours
- Judges value understanding real DJ problems over visual polish

### Risks & Mitigations
| Risk | Mitigation |
|------|-----------|
| Demo library tagging takes too long | Have pre-curated list ready; alias method (tag 50, extrapolate) |
| Spatial interaction is sluggish | Prioritize responsiveness; test hover latency early |
| Rediscovery track doesn't land | Have 3–5 backup candidates identified during curation |
| Tech breaks during demo | Screenshots, second laptop, printed fallback |
| Judge doesn't understand spatial logic | Clear zone labels, demo script explains logic |

---

## 15. Open Questions (For Alignment)

These are resolved or will be during planning/build:

- [ ] Exact spatial encoding details (will be confirmed with visualizer)
- [ ] Final track count (150 target; 100 minimum)
- [ ] Which Creative Commons sources to use
- [ ] Exact rediscovery track (will be chosen during curation)
- [ ] Tech stack (React? Vue? HTML+JS?)
- [ ] Responsive breakpoints (focus on desktop; mobile nice-to-have)

---

## 16. Glossary

| Term | Definition |
|------|-----------|
| **Constellation** | Spatial arrangement of tracks by performance contexts (zones) |
| **Zone** | Cluster within constellation (Arrivals, Lock-in, Wanderers) |
| **Time/Setting** | When/where you'd play a track (Pool Party, Sunrise Reset, etc.) |
| **Journey Role** | What a track does in a set (Opener, Bridge, Reset, Home Stretch) |
| **Crowd State** | Who's here and what's their attention (Arrivals, Lock-in, Wanderers) |
| **Rediscovery** | Finding underplayed material in context |
| **Underplayed** | Track with play count < 5 |
| **MVP** | Minimum viable product for hackathon (Pool Party + demo) |

---

## 17. Sign-Off

**Product Owner (Vision):** Jasmine Sabio  
**Status:** Approved for implementation

**Team Alignment:** Pending (read PRD, then align in meeting)

**Next Step:** Planning mode with Claude → detailed implementation plan

---

**For questions or changes:** Update this PRD. It lives with the project.
