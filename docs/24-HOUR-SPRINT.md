# The Hackathon Sprint: Execution Plan

**Event:** Music Hackspace Music Technology Hackathon, Lisbon  
**Duration:** Saturday 12:00 PM → Sunday 5:30 PM (~29.5 hours available)  
**Team:** Jasmine (PM/Visionary) + Valerie (Visualizer/Creative Technologist)  
**Goal:** Working prototype ready for demo at 4:00 PM Sunday, with practiced walkthrough

---

## Role Breakdown (Clear Ownership)

### Jasmine (PM/Visionary)
**Primary responsibility:** Demo library + demo script + product decisions

**During hackathon:**
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

### Valerie (Visualizer/Technologist)
**Primary responsibility:** UI/interaction + spatial encoding

**During hackathon:**
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

## Saturday Timeline (Day 1)

### 12:00 PM – 2:00 PM: Planning & Alignment (Synchronous)

**Location:** Team table at hackathon  
**Duration:** 2 hours (includes lunch for some)

**Jasmine:**
- Quick review of PRD + IMPLEMENTATION-BRIEF
- Identify Creative Commons music sources to start with
- Set up laptop for track curation workflow
- Define library format (JSON structure confirmation)
- Get first 10–20 tracks queued up for listening

**Valerie:**
- Quick review of PRD + IMPLEMENTATION-BRIEF
- Confirm tech stack choice (React/Vue/HTML+JS)
- Set up dev environment (Node, build tools, GitHub repo)
- Design spatial encoding (confirm X/Y/color mapping visually)
- Create initial component mockup / wireframe on paper/Figma

**Sync checkpoint (end of 2:00 PM):**
- Both understand the three-layer model
- Track data format is finalized
- Tech stack is decided
- Spatial encoding is confirmed (sketch/wireframe visible)
- Dev environment is ready
- Jasmine is ready to start listening
- Valerie is ready to start building

---

### 2:00 PM – 6:00 PM Saturday: Heavy Lift (Parallel work)

**Jasmine's Work (Library curation)**
- Listen to tracks from CC sources (3–5 min per track)
- Tag each track using three questions:
  - When would I play this? (Time/Setting)
  - What does it do in a set? (Journey Role)
  - What crowd state does it need? (Crowd State)
- Build up JSON file as you go
- Target: 40–50 tracks by 6:00 PM (enough for Pool Party constellation)

**Valerie's Work (UI structure)**
- Build timeline view (shows 5 phase buttons)
- Build constellation view shell (grid structure, zone labels)
- Set up track data loading (reads JSON from Jasmine)
- Test with sample data (10–20 dummy tracks)
- Implement basic hover interaction

**Timeline:**
- 2:00 PM: Both start heavy work
- 3:00 PM: Informal checkin (no need to pause)
- 4:00 PM: Dinner served (continue hacking while eating)
- 5:00 PM: Quick sync (Jasmine: how many tracks? Valerie: prototype working?)
- 6:00 PM: Checkpoint

**Checkpoint (end of 6:00 PM):**
- Jasmine: 40–50 tracks curated and tagged (enough for MVP constellation)
- Valerie: Timeline and constellation shell working with dummy data
- Both: Confirm data format matches (no mismatches)

---

### 6:00 PM Saturday – 12:00 AM Sunday: Integration & Late Night Push

**Jasmine's Work (Continue curation + start demo)**
- Continue tagging tracks through evening
- Target: 100–120 tracks by midnight
- Identify 3–5 underplayed candidates (this emerges as you listen)
- Begin writing demo script outline (30-sec, 60-sec versions)
- Take breaks (dinner available, rest eyes periodically)

**Valerie's Work (Integrate real data as it arrives)**
- As Jasmine's JSON updates come in, load tracks into constellation
- Filter to Pool Party tracks only (40–50)
- Position all tracks in constellation (hardcoded positions based on tags)
- Implement click interaction (show track detail view)
- Refine hover interaction (test latency, optimize)
- Add underplayed signal (visual indicator for play count < 5)
- Test on target device/screen size

**Timeline:**
- 6:00 PM: Dinner served, continue hacking
- 8:00 PM: Check-in (Jasmine: ~80 tracks? Valerie: interactions working?)
- 10:00 PM: Informal sync (no need to stop working)
- 12:00 AM Sunday: Checkpoint

**Checkpoint (end of Saturday, midnight):**
- Jasmine: 100–120 tracks curated and tagged
- Valerie: Full prototype working with real data, all core interactions functional
- Both: Could do a walthrough (might have some bugs, but not crashing)

---

### 12:00 AM – 9:00 AM Sunday: Night Sprint & Morning Crunch

**Location:** Still at hackathon (some may rest, but work continues)

**Jasmine's Work (Finish library + complete demo script)**
- Complete final batch of track curation (target 150 total)
- Final QA on tagging (spot-check for consistency)
- Identify the hero rediscovery track (should be obvious by now)
- Export final 150-track JSON with all tags complete
- Begin writing full demo script (30-sec, 60-sec, 5–7 min versions)
- Get some sleep if possible (2–4 hours recommended)

**Valerie's Work (Polish & robustness)**
- Load final 150-track JSON once Jasmine exports it
- Make sure all 40–50 Pool Party tracks are positioned
- Test all interactions thoroughly
- Fix any bugs or lag issues
- Refine hover feedback (ensure <100ms)
- Optimize performance
- Check responsive behavior
- Clean up code, remove console errors
- Get some sleep if possible (2–4 hours recommended)

**Timeline:**
- 12:00 AM: Midnight checkpoint
- 2:00 AM: Quick sync (how's it going?)
- 4:00 AM: Both should try to get rest if possible
- 6:00 AM: One or both wake up, resume work
- 9:00 AM: Morning coffee break, final push begins

**Morning Checkpoint (9:00 AM Sunday):**
- Jasmine: Library fully curated and tagged (all 150 done)
- Valerie: Prototype polished, interactions responsive, no crashes
- Both: Ready to practice and refine

### 9:00 AM – 12:00 PM Sunday: Final Polish & Script

**Jasmine's Work (Script refinement + practice)**
- Finalize demo script (30-sec, 60-sec, 5–7 min versions)
- Identify the hero rediscovery track if not done yet
- Practice script (multiple times, refine as you go)
- Time the 5–7 minute walkthrough
- Prepare Q&A responses (common judge questions from JUDGE-RESONANCE.md)
- Review product talking points
- Eat breakfast, take a walk, clear your head

**Valerie's Work (Final technical polish)**
- Final QA pass: test every interaction
- Fix any last-minute bugs (quick fixes only)
- Optimize hover latency if needed
- Ensure no console errors
- Test on the actual presentation device/screen
- Make sure demo data is loaded and ready
- Eat breakfast, take a walk, stay fresh

**Timeline:**
- 9:00 AM: Coffee, breakfast, team sync
- 9:30 AM: Both resume work on their tasks
- 10:00 AM: Informal check-in
- 11:00 AM: "Is everything ready?"
- 12:00 PM: Checkpoint

**Checkpoint (12:00 PM, 4 hours before presentations):**
- Jasmine: Script is practiced, timing is locked (5–7 min)
- Valerie: Prototype is polished, no crashes, responsive
- Both: Ready for one final full walkthrough

### 12:00 PM – 3:00 PM Sunday: Final Walkthrough & Backup

**Joint Work**
- Do **one full walkthrough** with the actual prototype (no stopping, full script)
- Time it (should be 5–7 minutes)
- Note any last-minute fixes needed (quick bug fixes only, quick tweaks only)
- Create screenshots of key moments (Timeline, Constellation, Hero Track Detail)
- Set up backup laptop with demo ready (if possible)
- Print 1-page fallback guide (how to explain if tech breaks)
- Prepare talking points and confidence

**Timeline:**
- 12:00 PM: Start full walkthrough
- 12:10 PM: Walthrough complete, time noted
- 12:15 PM: Screenshots captured
- 12:30 PM: Second walkthrough for confidence
- 1:00 PM: Break, lunch, rest before presentations
- 2:00 PM: Team meets, does final confidence check
- 3:00 PM: Ready to present, no more changes
- 3:30 PM: Head to presentation stage, final tech check

**Final QA before demo:**
- [ ] Prototype runs smoothly start to finish
- [ ] No crashes during full walkthrough
- [ ] Rediscovery moment lands emotionally
- [ ] Script flows naturally and is timed (5–7 min)
- [ ] Backup plan is documented
- [ ] Backup screenshots captured
- [ ] Backup laptop is ready (if available)
- [ ] Team is confident

### 4:00 PM Sunday: Presentation Time

**Your moment.** You've built something real for a real problem. 
- Demo runs. 
- Story lands. 
- Judges see the concept works. 
- Team is confident. 
- Good luck. 🎵

---

## Realistic Time Allocation (Hackathon Sprint)

### Available Time
- Saturday 12:00 PM – Sunday 5:30 PM = ~29.5 hours
- Minus meals, breaks, rest = ~24 hours of focused work
- Minus final presentations = demo done by 4:00 PM

### Jasmine's Allocation (~14–15 hours)
- Planning & setup: 1 hour (Sat 12–1 PM)
- Library curation: 10–11 hours (Sat 1 PM – Sun 12 AM, with breaks)
- Library QA: 1 hour (Sun morning)
- Demo script writing: 1–1.5 hours (Sat evening / Sun morning)
- Script practice & refinement: 2 hours (Sun morning / midday)
- Final walkthrough & Q&A prep: 1–1.5 hours (Sun afternoon)
- **Total:** ~14–15 hours focused work + some overlapping time

### Valerie's Allocation (~15–17 hours)
- Planning & setup: 1–2 hours (Sat 12–2 PM)
- UI development (core): 10–12 hours (Sat 2 PM – Sun 12 AM)
- Polish & QA: 2–3 hours (Sun morning)
- Final tech check & optimization: 1–2 hours (Sun afternoon)
- Final walkthrough: 0.5 hour (Sun afternoon)
- **Total:** ~15–17 hours focused work

### Overlapping/Joint Time
- Initial planning: 2 hours (Sat 12–2 PM)
- Data format check-ins: 1 hour (multiple short syncs)
- Integration check-ins: 1 hour (multiple short syncs)
- Final walkthrough & confidence: 1.5 hours (Sun afternoon)
- **Total:** ~5.5 hours of joint/sync time

**Reality:** ~14.5 + 16 + 5.5 = ~36 person-hours for ~29.5 clock hours (tight but realistic for motivated team).

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
