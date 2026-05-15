# Afterglow: Complete Knowledge Base

**Welcome, Jasmine & Valerie.** This is everything you need to understand, build, and demo Afterglow at the Music Hackspace hackathon in Lisbon.

All decisions are locked in. Your job: understand the vision, align on approach, then execute the 24-hour sprint starting tomorrow at noon.

---

## 📍 Where You Are & What's Next

**Right now (Friday evening):** Knowledge base is complete and in your hands.

**Tonight/Tomorrow morning:** Each of you reads your role-specific onboarding (30 min), then you sync for 1 hour to align.

**Saturday 12:00 PM:** Hack begins. Jasmine curates the library. Valerie builds the UI. You sync every 4–6 hours.

**Sunday 4:00 PM:** Presentations. You demo Afterglow to the judges.

---

## 🗺️ Reading Roadmap (30 minutes)

Read these in order. They build on each other.

### 1. **START HERE** (5 min)
- **File:** `00-project-overview.md`
- **What it is:** One-page summary; what Afterglow is and why it exists
- **For:** Both of you; get aligned on vision

### 2. Problem & User (5 min)
- **File:** `01-problem-and-users.md`
- **What it is:** Why DJs are stuck; what we're solving
- **For:** Product understanding; grounding in real use case

### 3. Core Concept (5 min)
- **File:** `02-core-concept.md`
- **What it is:** The three-layer model (timeline → constellation → tracks)
- **For:** Understanding the solution structure

### 4. The Tagging System (5 min)
- **File:** `03-mood-taxonomy.md`
- **What it is:** How tracks are organized (three dimensions, nine tags)
- **For:** Product clarity; how DJ thinking maps to tags

### 5. Spatial & Interaction (5 min)
- **File:** `04-ux-and-spatial-interaction.md`
- **What it is:** Why spatial browsing matters; visual design direction
- **For:** Visualizer/creative technologist primarily

### 6. MVP & Scope (5 min)
- **File:** `05-mvp-and-scope.md`
- **What it is:** What you're building (Pool Party constellation only), what you're not
- **For:** Both; clear scope boundaries

### 7. Demo Story (5 min)
- **File:** `06-demo-story.md`
- **What it is:** How you'll walk judges through it (30-sec, 60-sec, 5–7 min pitches)
- **For:** Both; narrative clarity

### 8. Open Questions (Optional)
- **File:** `07-open-questions.md`
- **What it is:** Decisions still pending; things you might need to decide during build
- **For:** Awareness; reference during implementation

### 9. Judge Context (Reference Only)
- **File:** `08-judge-context-and-decisions.md`
- **What it is:** Why each decision was made; what each judge cares about
- **For:** Reference; understanding the "why" behind choices

---

## 🎯 Quick Summary (If You're in a Hurry)

**What you're building:** A spatial DJ library browser organized by timeline (day phases) → spatial mood constellation (performance contexts) → track details.

**Real problem it solves:** DJs get spontaneous gigs (pool parties, festivals, uncertain timing). Current library organization (genre/BPM) doesn't match how they actually navigate (context/moment/crowd). Afterglow fixes this.

**Why it matters:** DJ can prep a gig in 10 minutes instead of 30+. Discovers forgotten material. Feels confident.

**Scope (MVP):** Pool Party constellation only. Timeline view. Track details. Real 150-track demo library. No audio, no AI, no djay integration (yet).

**Team split (29-hour sprint, Sat 12 PM → Sun 5:30 PM):**
- **Jasmine (PM/Visionary):** Curate 150 real tracks, tag authentically, write & practice demo script
- **Valerie (Visualizer/Technologist):** Design spatial encoding, build UI (timeline, constellation, interactions), polish & test

**Success criteria:** Does it actually help a DJ prep a pool party? Is the rediscovery moment credible? Can you walk through it in 5–7 minutes without crashing?

---

## 📋 What's Decided (Greenlit)

You don't need to debate these. They're locked in. See `GREENLIGHT.md` for details.

✓ **MVP Scope:** Pool Party constellation only  
✓ **Spatial Positioning:** Intentional (hardcoded/manual, not algorithmic)  
✓ **Demo Library:** Real tracks (100–150), real artist names, authentic tagging  
✓ **Tagging System:** Three dimensions, nine tags (decided)  
✓ **Demo Scenario:** "You get asked to DJ a pool party at 4 pm"  
✓ **Rediscovery:** You'll find the hero track when curating the library  
✓ **Team:** Jasmine (PM/Visionary) + Valerie (Visualizer/Technologist), 29-hour hackathon sprint  
✓ **Tagging Approach:** Manual (you listen, tag based on three questions)  
✓ **Language:** "DJ decision-making dimensions" (mandatory, not "moods")  
✓ **Judge Context:** Keep as reference (not a primary driver)  

---

---

## 🔍 Your Roles & Onboarding

### Jasmine (PM/Visionary)

**Read first (20 min):**
1. `00-project-overview.md` — What you're building
2. `01-problem-and-users.md` — Why this problem matters
3. `02-core-concept.md` — How the three-layer model works
4. `06-demo-story.md` — How you'll pitch it

**Your responsibilities (Saturday → Sunday):**
- Curate 150 real Creative Commons tracks (10–11 hours)
- Tag each track using three questions: When? Why? What crowd?
- Identify the hero rediscovery track (emerges during curation)
- Write demo script (30-sec, 60-sec, 5–7 min versions)
- Practice script and land the emotional moments
- Own the demo narrative and judge engagement

**Key mindset:** You're the voice of the DJ. Every track, every tag, every choice reflects authentic DJ thinking.

---

### Valerie (Visualizer/Creative Technologist)

**Read first (20 min):**
1. `00-project-overview.md` — What you're building
2. `02-core-concept.md` — The three-layer model
3. `04-ux-and-spatial-interaction.md` — Spatial design & interaction
4. `05-mvp-and-scope.md` — What's in/out

**Your responsibilities (Saturday → Sunday):**
- Design spatial encoding (confirm X/Y/color mapping)
- Build timeline view (2–3 hours)
- Build constellation view shell (4–6 hours)
- Implement hover interaction & track details (4–5 hours)
- Polish and optimize (<100ms hover latency)
- Ensure no crashes during demo

**Key mindset:** You're building the stage for DJ thinking. Every interaction should feel intentional and responsive.

---

## 📋 Next: Alignment Meeting (1 hour, both of you)

Before coding starts:
1. Both finish your role-specific reads
2. Read PRD.md and IMPLEMENTATION-BRIEF.md together
3. Discuss: What's your tech stack? (React/Vue/HTML+JS?)
4. Discuss: Any questions or concerns?
5. Review 24-HOUR-SPRINT.md to confirm the timeline feels realistic
6. Sync on: How will you communicate during the sprint? (Slack? Discord? Check-ins every 4 hours?)

Then → you're ready to build.

---

## 📚 File Index (Complete Knowledge Base)

### Core Documentation
| File | Purpose | Audience |
|------|---------|----------|
| `00-project-overview.md` | Vision + scope summary | Everyone |
| `01-problem-and-users.md` | Why this matters; real DJ pain | Everyone |
| `02-core-concept.md` | How it works; three-layer model | Everyone |
| `03-mood-taxonomy.md` | The tagging system explained | Everyone |
| `04-ux-and-spatial-interaction.md` | Design + interaction approach | Visualizer |
| `05-mvp-and-scope.md` | What's in, what's out | Everyone |
| `06-demo-story.md` | How to pitch it; three versions | PM/Demo owner |
| `07-open-questions.md` | Decisions to make during build | Reference |
| `08-judge-context-and-decisions.md` | Why each choice was made | Reference |

### Team Coordination
| File | Purpose |
|------|---------|
| `README.md` | This file; entry point |
| `GREENLIGHT.md` | What was decided; no debate |
| `PRD.md` | Product requirements (formal) |
| `IMPLEMENTATION-BRIEF.md` | Technical details for build |
| `24-HOUR-SPRINT.md` | Execution plan |

---

## ⏱️ Time Estimates

**To understand the concept:** 30 minutes (read the 7-file roadmap above)

**To align with teammate:** 1 hour (discuss PRD + IMPLEMENTATION-BRIEF)

**To plan implementation:** 2 hours with Claude (planning mode)

**To build:** 24 hours (one sprint with two people)

**To demo:** 5–7 minutes (walkthrough)

---

## ❓ Common Questions

**Q: Should I read all 9 knowledge base files?**  
A: Not on first pass. Read the 7-file roadmap. Reference the others as needed. You can go deep on any topic.

**Q: What if I disagree with a decision?**  
A: Flag it in alignment meeting. But know: every decision has been vetted against both "solves real DJ problem" and "makes sense for 24-hour sprint."

**Q: What if I find an error or ambiguity?**  
A: Update the doc. This KB lives with the project. It's not frozen.

**Q: How do I know if I understand enough to start?**  
A: You should be able to answer these:
- What's the real problem? (DJ gets booked with 2 hours notice; current org system doesn't match real workflow)
- What's the solution? (Timeline → spatial constellation by performance contexts → track details)
- What's the scope? (Pool Party constellation only; 150-track demo library; no audio/AI/djay integration)
- What's success? (DJ can prep a gig in 10 min; rediscovery moment lands; no crashes in demo)

If yes → you're ready.

---

## 🚀 Timeline (Tonight Through Sunday)

**Tonight (Friday evening):**
- Jasmine: Read your onboarding (20 min) + PRD.md (15 min)
- Valerie: Read your onboarding (20 min) + IMPLEMENTATION-BRIEF.md (20 min)
- Both: Get rest before early Saturday

**Saturday morning (before 12 PM):**
- Jasmine: Have Creative Commons music sources identified
- Valerie: Have dev environment ready (Node, tech stack decided)
- Meet at hackathon, team formation at 11:30 AM

**Saturday 12:00 PM – Sunday 5:30 PM:**
- Follow 24-HOUR-SPRINT.md timeline
- Jasmine: Library curation (Sat 2 PM → Sun morning)
- Valerie: UI build (Sat 2 PM → Sun afternoon)
- Check-ins: Every 4–6 hours (informal syncs)

**Sunday 3:00 PM – 4:00 PM:**
- Final walkthrough with prototype
- Jasmine: Practice script one more time
- Valerie: Final tech check
- Head to stage at 3:30 PM

**Sunday 4:00 PM:**
- Demo time. You've got this. 🎵

---

## 📞 If You Get Stuck

- **Concept question?** → Read `02-core-concept.md`
- **Scope question?** → Read `05-mvp-and-scope.md`
- **Why this decision?** → Read `08-judge-context-and-decisions.md`
- **How to pitch it?** → Read `06-demo-story.md`
- **What to build first?** → Read `24-HOUR-SPRINT.md`
- **Technical details?** → Read `IMPLEMENTATION-BRIEF.md`

---

## 💡 Final Words

**The concept is solid.** You're solving a real DJ problem that matters.

**The scope is realistic.** Pool Party only. 150 real tracks. One beautifully built constellation. No vaporware.

**Your execution matters.** You'll be building in parallel, syncing frequently, and shipping something real in 29 hours. That's tight but doable if you stay focused.

**What judges will remember:** Not the polish. Not the technology. They'll remember whether you genuinely understand the problem and respect the people you're building for.

Jasmine, your job is to bring authentic DJ thinking to every tag and every decision. Valerie, your job is to make the interaction feel responsive and intentional.

Together, you're telling a story about DJ artistry and agency. Make it real.

---

## 🎵 Right Now

**Jasmine:** Start with `00-project-overview.md` (5 min), then `01-problem-and-users.md`

**Valerie:** Start with `00-project-overview.md` (5 min), then `04-ux-and-spatial-interaction.md`

Then meet up, discuss, and get some rest before Saturday.

You've got this. 🎵
