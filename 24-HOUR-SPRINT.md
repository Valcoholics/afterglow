# The 24-Hour Sprint: Execution Plan

**Duration:** 24 hours (one continuous or split into 2 x 12h sessions)  
**Team:** Jasmine (PM/Visionary) + Teammate (Visualizer/Technologist)  
**Goal:** Working prototype ready for demo, with practiced walkthrough

---

## Role Breakdown (Clear Ownership)

### Jasmine (PM/Visionary)
**Primary responsibility:** Demo library + demo script + product decisions

**During sprint:**
- Curate and tag 150 real tracks (6–10 hours)
- Identify rediscovery hero track (1–2 hours, part of curation)
- Write and practice demo script (2–3 hours)
- QA from product perspective (1–2 hours)
- Make product calls during build ("Does this feel right?")

**Deliverables:**
- 150-track JSON file with artist, title, duration, play count, tags
- Rediscovery track selected and validated
- Demo script (3 versions: 30-sec, 60-sec, 5–7 min)
- Final walkthrough practiced and timed

### Teammate (Visualizer/Technologist)
**Primary responsibility:** UI/interaction + spatial encoding

**During sprint:**
- Design spatial encoding (confirm X/Y/color mapping) (1–2 hours)
- Build timeline view (2–3 hours)
- Build constellation view structure (4–6 hours)
- Implement hover interaction (2–3 hours)
- Implement track detail view (2–3 hours)
- Polish and responsive behavior (2–3 hours)
- QA from technical perspective (1–2 hours)

**Deliverables:**
- Working timeline view
- Working constellation view (all 40–50 Pool Party tracks positioned)
- Responsive hover interaction (<100ms)
- Track detail modal/panel
- No crashes or broken states
- All 60fps, smooth transitions

---

## Hour-by-Hour Breakdown (Rough Timeline)

### Hours 0–2: Planning & Alignment (Synchronous)

**Jasmine:**
- Review PRD + IMPLEMENTATION-BRIEF
- Identify Creative Commons music sources
- Set up spreadsheet for track curation
- Define library format (JSON structure)

**Teammate:**
- Review PRD + IMPLEMENTATION-BRIEF
- Confirm tech stack choice (React/Vue/HTML+JS)
- Set up dev environment (Node, build tools, GitHub repo)
- Design spatial encoding (confirm X/Y/color mapping)
- Create initial component structure / mockup

**Sync point (end of hour 2):**
- Both understand the three-layer model
- Track data format is finalized
- Tech stack is decided
- Spatial encoding is confirmed
- Libraries/frameworks are installed
- Timeline: "On track? Any blockers?"

---

### Hours 2–10: Heavy Lift (Can be parallel with checkins)

#### Jasmine's Work (6–8 hours for library)
- Start sourcing tracks from Creative Commons sources
- Listen to each track (3–5 min per track)
- Tag each track using three questions:
  - When would I play this? (Time/Setting)
  - What does it do in a set? (Journey Role)
  - What crowd state does it need? (Crowd State)
- Build up JSON file as you go
- Identify 3–5 underplayed candidates for rediscovery

**Parallel:** While curation is happening, make index to track which ones are Pool Party.

#### Teammate's Work (6–8 hours for UI structure)
- Build timeline view (shows 5 phase buttons)
- Build constellation view shell (grid structure, zone labels)
- Set up track data loading (reads JSON from Jasmine)
- Test with sample data (10–20 dummy tracks)
- Implement basic hover interaction

**Checkin point (end of hour 8):**
- Jasmine: 80–100 tracks curated and tagged
- Teammate: Timeline and constellation shell working with dummy data
- Both: Confirm data format matches (no mismatches)

---

### Hours 10–16: Integration (Parallel)

#### Jasmine's Work (Finish library + start demo)
- Complete library curation (150 total tracks)
- Final QA on tagging (listen to random samples, check for consistency)
- Export final JSON with all 150 tracks
- Identify rediscovery hero track (should be obvious during curation)
- Start writing demo script (30-sec, 60-sec, 5–7 min)

#### Teammate's Work (Integrate real data + interactions)
- Load real 150-track JSON from Jasmine
- Filter to Pool Party tracks only (40–50)
- Position all tracks in constellation (hardcoded positions based on tags)
- Implement click interaction (show track detail view)
- Refine hover interaction (test latency, optimize)
- Add underplayed signal (visual indicator for play count < 5)
- Test on target device/screen size

**Checkin point (end of hour 16):**
- Jasmine: Library complete, demo script drafted
- Teammate: Full prototype working with real data, all interactions functional
- Both: Can run a full walkthrough (will be slow, but no errors)

---

### Hours 16–22: Polish & QA (Parallel)

#### Jasmine's Work (Practice + refinement)
- Practice demo script (multiple times)
- Time the 5–7 minute walkthrough
- Get feedback on narrative flow
- Refine opening hook and closing moment
- Plan Q&A responses (common judge questions)
- Prepare backup plan (screenshots, second laptop setup)

#### Teammate's Work (Visual polish + robustness)
- Test all interactions thoroughly
- Fix any bugs or lag issues
- Refine hover feedback (ensure <100ms)
- Optimize performance (if needed)
- Check responsive behavior (zoom, different screen sizes)
- Clean up code, remove console errors
- Test on multiple browsers/devices if possible

**Specific QA checklist (Teammate):**
- [ ] Timeline view shows 5 phases clearly
- [ ] Click Pool Party → constellation loads smoothly
- [ ] All 40–50 tracks visible and positioned correctly
- [ ] Zone labels are readable
- [ ] Hover over track → nearby tracks respond visibly
- [ ] Hover latency is <100ms
- [ ] Click track → detail view shows all info
- [ ] Detail view shows underplayed badge if applicable
- [ ] No console errors
- [ ] No crashes on any interaction

**Specific QA checklist (Jasmine):**
- [ ] Rediscovery track is genuinely good
- [ ] Rediscovery track has play count < 5
- [ ] Rediscovery track is in Pool Party context
- [ ] Demo script flows naturally (not memorized)
- [ ] Timing is 5–7 minutes (not longer)
- [ ] Opening hook is strong
- [ ] Closing moment is memorable
- [ ] Can explain three-layer model in <90 seconds

**Checkin point (end of hour 22):**
- Jasmine: Demo script practiced, timing locked, Q&A answers ready
- Teammate: Prototype is polished, no crashes, responsive
- Both: Can do full walkthrough without errors

---

### Hours 22–24: Final Prep & Backup (Synchronous)

#### Joint Work
- Do **one full walkthrough** with the actual prototype (no stopping, full script)
- Time it (should be 5–7 minutes)
- Note any last-minute fixes needed (quick bug fixes only)
- Create screenshots of key moments (Timeline, Constellation, Hero Track Detail)
- Set up backup laptop with demo ready (if possible)
- Print 1-page fallback guide (how to explain if tech breaks)
- Review talking points one more time

**Final QA before demo:**
- [ ] Prototype runs smoothly start to finish
- [ ] No crashes during full walkthrough
- [ ] Rediscovery moment lands emotionally
- [ ] Script flows naturally
- [ ] Timing is locked (5–7 min)
- [ ] Backup plan is documented
- [ ] Backup screenshots captured
- [ ] Team is confident

**End of hour 24:**
- Prototype is **ready for demo**
- Script is **practiced and locked in**
- Backup plan is **documented**
- Team is **confident**

---

## Resource Allocation (Team Effort)

### Jasmine's Time (10–12 hours)
- Library curation: 6–8 hours
- Library QA: 1–2 hours
- Demo script: 2–3 hours
- Practice: 1–2 hours
- Final QA: 1 hour
- **Total:** ~13 hours of focused work

### Teammate's Time (14–16 hours)
- Planning & setup: 1–2 hours
- UI development: 10–12 hours
- Polish & QA: 2–4 hours
- Final walkthrough: 0.5 hour
- **Total:** ~14–16 hours of focused work

### Overlap (Joint Work)
- Initial planning: 2 hours
- Data format checkin: 0.5 hours
- Integration checkin: 0.5 hours
- Final walkthrough: 1 hour
- **Total:** ~4 hours of joint time

**Total effort:** ~13 + 15 + 4 = ~32 person-hours for 24-clock hours (realistic for 2 people).

---

## Pace & Energy Management

### Pacing Strategy

**Don't try to maintain 24-hour continuous push.**

**Better approach:**
- **Option A (Two 12-hour sessions):**
  - Session 1: Hours 0–12 (9 am → 9 pm, with 1h lunch break)
  - Break: 8 hours sleep
  - Session 2: Hours 12–24 (9 am → 9 pm next day, with lunch)

- **Option B (Split roles, stagger):**
  - Jasmine: 6–8 hours continuous (library curation is flow work)
  - Teammate: 12–16 hours (development is sprintable)
  - Sync at key checkpoints (every 4–6 hours)

### Energy Checkpoints

- **Hour 6:** Quick sync ("How's it going?")
- **Hour 12:** Major checkpoint (half done, reassess)
- **Hour 18:** Late afternoon, second wind
- **Hour 22:** Final push, close to finish line
- **Hour 24:** Done

---

## Contingency Plans

### If Library Curation Takes Too Long (Hour 12 checkpoint)

**Problem:** Jasmine is behind. Won't hit 150 tracks.

**Solutions:**
- **Option 1 (Pattern matching):** 
  - Tag 50 tracks deeply and carefully
  - For remaining 100: identify 10–15 "anchor" tracks per category
  - Map remaining tracks to anchors (same genre/energy = similar tags)
  - Quality drops slightly but concept still works

- **Option 2 (Accelerate listening):**
  - Reduce per-track listening time
  - Quick tag based on first 30 seconds
  - Still get 150, but less depth

- **Option 3 (Reduce total):**
  - Aim for 100 tracks instead of 150
  - Pool Party constellation is 40–50 (not reduced)
  - Concept still works, library is smaller

**Recommendation:** Start with **Option 1.** Have "anchor tracks" pre-identified before sprint starts.

---

### If UI Development Is Sluggish (Hour 16 checkpoint)

**Problem:** Teammate is behind schedule. Won't finish all interactions.

**Priority order (cut what you can):**
1. **Must-have (don't cut):**
   - Timeline view
   - Constellation view with real tracks
   - Zone labels
   - Click to detail view
   - Hover highlights nearby tracks
   
2. **Nice-to-have (cut if needed):**
   - Underplayed signal visual
   - Smooth transitions / animations
   - Responsive scaling
   - Second time phase (if attempted)

**Fallback:** If full interaction doesn't work, show screenshots + explain the interactions verbally.

---

### If Demo Crashes (During Walkthrough)

**Don't panic. Have a backup plan:**

1. **Quick restart:** "Let me reload" (30 seconds)
2. **If that fails:** "This is a prototype. Let me show you the key interaction on the next view."
3. **Ultimate fallback:** "Let me walk you through with screenshots."

**Prep for this:**
- Capture screenshots of Timeline → Constellation → Hero Track Detail
- Write 1-page guide on how to explain the demo verbally
- Have second laptop with same demo ready (if possible)

---

## Success Metrics (End of 24h)

### Must-Have (Non-negotiable)
- ✓ Prototype runs from start to finish without crashing
- ✓ All 40–50 Pool Party tracks are positioned and visible
- ✓ Hover interaction responds (<100ms latency)
- ✓ Click detail view shows artist, tags, play count
- ✓ Rediscovery track is identified and works
- ✓ Demo script is practiced and timed (5–7 min)
- ✓ No console errors or broken UI states

### Nice-to-Have (Bonus, but not required)
- Underplayed signal is visually distinct
- Smooth animations and transitions
- Responsive design (works at different scales)
- Second time phase sketch

### Fallback (If something breaks)
- Backup screenshots of all key moments
- Backup plan documented (how to explain without tech)
- Team has practiced verbal walkthrough

---

## Communication & Checkpoints

### Before Sprint Starts
- [ ] Read PRD, IMPLEMENTATION-BRIEF, GREENLIGHT together
- [ ] Confirm tech stack (Teammate)
- [ ] Confirm library sources and format (Jasmine)
- [ ] Agree on checkpoint times
- [ ] Exchange phone numbers / backup comms

### During Sprint (Every 4–6 hours)
- 5-minute sync: "How's it going? Any blockers?"
- Share progress: Jasmine updates track count, Teammate shows UI
- Identify any issues early
- Re-prioritize if needed

### Before Final Walkthrough (Hour 22)
- One joint demo run-through
- Capture screenshots
- Practice Q&A responses
- Confirm both are confident

---

## Final Reminder

**You've planned well. The concept is solid. The scope is realistic.**

Your job in the next 24 hours is to:
1. Curate an authentic library (Jasmine)
2. Build a responsive UI (Teammate)
3. Tell a compelling story (Jasmine)
4. Show up with confidence

**You've got this.** 🎵

---

## Sign-Off Checklist (End of Sprint)

Before submitting to judges:

- [ ] Prototype is built and functional
- [ ] Demo script is practiced
- [ ] Library is curated and tagged
- [ ] Rediscovery track is identified
- [ ] Screenshots are captured
- [ ] Backup plan is documented
- [ ] Team has done one full walkthrough
- [ ] No crashes in final walkthrough
- [ ] Timing is locked (5–7 min)
- [ ] Both teammates feel confident

---

**Ready to execute? Let's build it.** 🚀
