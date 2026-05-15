# Open Questions (For Planning & Build)

These decisions are not yet made. They'll be clarified during **planning mode with Claude** or during the build when you have better information.

---

## Visual & Layout

### Q1: Exact Grid Dimensions
**Question:** What cell size and spacing work best for 40–50 Pool Party tracks?

**Options:**
- Small cells (100px × 100px): Fits more tracks, denser, less whitespace
- Medium cells (150px × 150px): Balanced, feels spacious, easier to read
- Large cells (200px × 200px): Very spacious, requires scrolling, harder to scan all at once

**Impact:** Affects container size, responsiveness, and visual clarity.

**Decision timing:** During planning; test different sizes and pick based on UI prototyping.

---

### Q2: Track Representation in Constellation
**Question:** How should each track look in the grid?

**Options:**
- Circular dots (minimal, fast to implement)
- Small cards with artist initial (more info at a glance)
- Dots with number index (tracks are numbered)
- Icons based on genre subset
- Artist first name in small text

**Impact:** Affects visual complexity and recognizability.

**Decision timing:** During planning; tie to tech stack choice.

---

### Q3: Zone Label Placement
**Question:** Where should "Arrivals / Lock-in / Wanderers" labels appear?

**Options:**
- Left side (Y-axis labels)
- Top and left (both axes labeled)
- Built into grid background (subtle background color per row)
- Floating labels (appear on hover)
- Combination (text labels + subtle background color)

**Impact:** Affects clarity and visual clutter.

**Decision timing:** During planning; pair with UX mockup.

---

### Q4: Detail View Presentation
**Question:** How should the track detail view appear?

**Options:**
- Modal (center-screen popup, dark background overlay)
- Side panel (slides in from right, doesn't block constellation)
- Full-screen detail (navigate away from constellation)
- Tooltip/popover (appears near hovered track)

**Impact:** Affects user flow and spatial context preservation.

**Decision timing:** During planning; consider UX and tech feasibility.

---

## Technical Stack

### Q5: Frontend Framework
**Question:** Which framework to use?

**Options:**
- **React:** Component-based, familiar, mature ecosystem
- **Vue:** Simpler syntax, reactive, lighter bundle
- **Svelte:** Minimal boilerplate, compiled, performant
- **HTML + Vanilla JS:** No dependencies, maximum control

**Impact:** Development speed, code maintainability, learning curve.

**Decision timing:** Planning or immediately; depends on team expertise.

---

### Q6: Spatial Layout Implementation
**Question:** How to position tracks in the constellation?

**Options:**
- **CSS Grid:** Native, responsive, good for zone structure
- **Absolute positioning:** Full control, flexible, more manual work
- **Canvas:** Full control, smooth rendering, more complex
- **SVG:** Vectors, scalable, good for overlays
- **Hybrid:** CSS Grid for structure + absolute positioning for tracks

**Impact:** Development complexity, performance, responsiveness.

**Decision timing:** During planning; tie to tech stack choice.

**Recommendation from IMPLEMENTATION-BRIEF:** Hybrid (CSS Grid + absolute positioning for tracks).

---

### Q7: Styling Approach
**Question:** How to manage CSS?

**Options:**
- **Tailwind CSS:** Utility-first, fast to build, modern
- **CSS Modules:** Scoped styles, avoid naming conflicts
- **Styled Components:** CSS-in-JS, component-scoped
- **Plain CSS:** No dependencies, full control
- **SCSS/SASS:** Nesting, variables, organization

**Impact:** Development speed, file size, maintainability.

**Decision timing:** During planning; tie to framework choice.

---

## Data & Library

### Q8: Exact Track Count
**Question:** How many tracks in the Pool Party constellation?

**Target:** 40–50 Pool Party tracks from the 150-track demo library.

**Options:**
- **40 tracks:** Cleaner, less scrolling, faster to curate
- **50 tracks:** More comprehensive, shows depth, requires more work
- **Dynamic:** Based on whatever Jasmine curates that fits Pool Party

**Impact:** Curation time, constellation density, demo comprehensiveness.

**Decision timing:** During library curation; Jasmine decides.

---

### Q9: Demo Library Sourcing
**Question:** Which Creative Commons / royalty-free sources to use?

**Candidates:**
- Free Music Archive (FMA)
- Incompetech
- Bandcamp (Creative Commons tracks)
- YouTube Audio Library
- OpenMusicArchive
- Archive.org (historical recordings)
- Artist SoundCloud pages

**Impact:** Track quality, genre diversity, artist legitimacy.

**Decision timing:** Immediately; Jasmine starts sourcing.

**Recommendation:** Use 2–3 sources to ensure diversity and quality.

---

### Q10: Rediscovery Track Identification
**Question:** Which track is the "hero" underplayed track?

**Criteria:**
- Play count: 0–5
- Time/Setting: Pool Party
- Journey Role: Ideally Bridge (versatile)
- Crowd State: Lock-in or Wanderers (both work)
- Quality: Any DJ would recognize as good
- Vibe: Uplifting, groovy, accessible

**Decision timing:** During library curation; Jasmine identifies 3–5 candidates and picks the one that lands best.

**Current status:** TBD (will be found during curation).

---

## Demo & Narrative

### Q11: Exact Demo Script
**Question:** How exactly will you walk judges through the demo?

**Known:**
- 30-second hook
- 60-second full story
- 5–7 minute walkthrough
- (See `06-demo-story.md` for detailed structure)

**Open:**
- Exact words and pacing
- Emphasis points (technical vs. product vs. artistry)
- Q&A follow-ups
- Backup plan wording

**Decision timing:** During planning + practice; Jasmine owns this.

---

### Q12: Success Moment
**Question:** How will you know if the demo lands?

**Indicators:**
- Judges ask "when can I try this?"
- Rediscovery moment resonates visibly
- DJ in audience engages with concept
- Judges mention it to other judges
- No crashes during walkthrough

**Decision timing:** Post-demo; feedback collection.

---

## Scope Clarifications

### Q13: Multiple Phases (Nice-to-Have)
**Question:** Should you attempt a second time phase (Sunrise Reset)?

**Options:**
- **Pool Party only (MVP):** Focus, polish, one beautiful demo
- **Pool Party + one more:** Shows multi-phase roadmap, riskier for 24h sprint
- **All five phases:** Stretch goal; likely too much work

**Impact:** Development time, scope creep, demo quality.

**Decision timing:** During planning; make trade-off explicit.

**Recommendation:** Pool Party only. One beautiful phase > two half-finished phases.

---

### Q14: Search / Filter UI
**Question:** Should you include search or filter controls?

**Options:**
- **No search (MVP):** Spatial discovery is primary; users scroll/hover
- **Simple search:** Filter by artist or title
- **Advanced filters:** Multiple criteria
- **Search + spatial:** Both available

**Impact:** Development time, interaction design, user mental model.

**Decision timing:** During planning; likely scope cut for MVP.

**Recommendation:** None for MVP. Spatial discovery is the point. Search is secondary feature (post-hackathon).

---

### Q15: Underplayed Signal
**Question:** Which visual indicator for underplayed tracks?

**Options:**
- **Color badge:** Contrasting color (gold, red, etc.)
- **Icon:** ⚡ lightning, ⭐ star, 🔥 fire, or custom
- **Border/glow:** Special outline or glow
- **Text label:** "Underplayed" badge
- **Combination:** Icon + color + text

**Impact:** Visual clarity, recognizability, design consistency.

**Decision timing:** During planning; tie to overall visual design.

**Recommendation:** Icon overlay + subtle color shift. Visible at distance and close-up.

---

## Timeline & Feasibility

### Q16: Can You Hit 24 Hours?
**Question:** Is the scope realistic for 24-hour sprint?

**Breaking down:**
- Library curation: 6–10 hours (Jasmine)
- UI development: 12–16 hours (Technologist)
- Integration: 2–4 hours (both)
- Polish + QA: 3–5 hours (both)
- Demo prep: 2–3 hours (Jasmine)

**Total:** 35–50 hours (requires tight execution, clear plan, no surprises).

**Decision timing:** During planning; confirm resource availability and energy.

**Risk mitigation:**
- Have backup library (pre-curated list)
- Start with MVP only (no second phase)
- Use pattern-matching for last 50 tracks if needed
- Have fallback plan (screenshots, second laptop)

---

## How to Use This Document

**During Planning:** Go through Q1–Q16 with Claude. Some will be decided, some will have clear answers in context, some will remain open until build time.

**During Build:** If you hit a decision point and think "wait, should we do X or Y?" — check here first. Probably already analyzed.

**If You Get Stuck:** This document gives you the option space. You can pick an option, explain your choice, and move on.

---

## Quick Reference: Decision Status

| Question | Priority | Status | Decision Timing |
|----------|----------|--------|-----------------|
| Q1: Grid size | Medium | Pending | Planning |
| Q2: Track visual | High | Pending | Planning |
| Q3: Zone labels | High | Pending | Planning |
| Q4: Detail view | High | Pending | Planning |
| Q5: Framework | High | Pending | Planning |
| Q6: Spatial layout | High | Pending | Planning |
| Q7: Styling | Medium | Pending | Planning |
| Q8: Track count | Medium | Pending | Library curation |
| Q9: Library sources | High | Pending | NOW (Jasmine) |
| Q10: Hero track | Medium | Pending | Library curation |
| Q11: Demo script | Medium | Pending | Planning + practice |
| Q12: Success moment | Low | Pending | Post-demo |
| Q13: Multiple phases | Medium | Likely no | Planning |
| Q14: Search UI | Low | Likely no | Planning |
| Q15: Underplayed signal | Medium | Pending | Planning |
| Q16: Timeline feasibility | Critical | Pending | Planning |

---

**Next:** Bring these questions into planning mode with Claude.
