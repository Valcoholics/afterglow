# Afterglow: Complete Knowledge Base

**Welcome.** This is everything you need to understand, build, and demo Afterglow.

**For Jasmine & your teammate:** Start with the roadmap below. Read in order. Then we align on PRD and go into planning mode.

---

## 📍 You Are Here

This is a **pre-kickoff knowledge base**. Everything is decided. Your job is to understand the vision, understand the scope, align with your teammate, then build.

**Timeline:** 
- Today: Align on PRD (read KB, discuss)
- Tomorrow: Planning mode with Claude (structured implementation plan)
- Next week: 24-hour sprint (build + demo)

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

**Team split (24-hour sprint):**
- **Jasmine (PM/Visionary):** Curate demo library (150 real tracks), write demo script
- **Teammate (Visualizer/Technologist):** Build UI (timeline, constellation, interactions), spatial encoding

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
✓ **Team:** PM (you) + Visualizer/Technologist (teammate), 24-hour sprint  
✓ **Tagging Approach:** Manual (you listen, tag based on three questions)  
✓ **Language:** "DJ decision-making dimensions" (mandatory, not "moods")  
✓ **Judge Context:** Keep as reference (not a primary driver)  

---

## 📄 For Alignment (Next Step)

Read through these together with your teammate:

1. **PRD.md** — Formal product requirements (what to build)
2. **IMPLEMENTATION-BRIEF.md** — Technical details (how to build it)
3. **24-HOUR-SPRINT.md** — The execution plan (who does what, when)

Then discuss:
- Does this align with both your visions?
- Are there questions or concerns?
- Are the roles clear (PM vs. Technologist)?

Once aligned → planning mode with Claude.

---

## 🔍 For Different Roles

### If You're the Product Manager / Visionary

**Read first:**
1. `00-project-overview.md`
2. `01-problem-and-users.md`
3. `02-core-concept.md`
4. `06-demo-story.md`

**Key responsibilities:**
- Understand the DJ problem deeply (read 01)
- Own the demo narrative (read 06)
- Curate the track library (manual; you listen)
- Make product decisions during build

### If You're the Visualizer / Creative Technologist

**Read first:**
1. `00-project-overview.md`
2. `02-core-concept.md`
3. `04-ux-and-spatial-interaction.md`
4. `05-mvp-and-scope.md`

**Key responsibilities:**
- Understand the three-layer model (read 02)
- Understand spatial design approach (read 04)
- Design spatial encoding (X-axis, Y-axis, color)
- Build the prototype (24-hour sprint)

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

## 🚀 Next Moves

1. **Today:** Both read the 7-file roadmap (30 min)
2. **Today:** Discuss PRD + IMPLEMENTATION-BRIEF (1 hour)
3. **Align:** Are you both on the same page?
4. **Tomorrow:** Planning mode with Claude (2 hours)
5. **Planning output:** Detailed implementation plan, task breakdown, technical decisions
6. **Next week:** 24-hour sprint (build it)
7. **End of sprint:** Demo ready for judges

---

## 📞 If You Get Stuck

- **Concept question?** → Read `02-core-concept.md`
- **Scope question?** → Read `05-mvp-and-scope.md`
- **Why this decision?** → Read `08-judge-context-and-decisions.md`
- **How to pitch it?** → Read `06-demo-story.md`
- **What to build first?** → Read `24-HOUR-SPRINT.md`
- **Technical details?** → Read `IMPLEMENTATION-BRIEF.md`

---

## 💡 One Final Thing

The concept is solid. The scope is realistic. The problem is real.

Your job isn't to reinvent it. It's to build it well and tell the story clearly.

Read the KB. Align with your teammate. Plan thoughtfully. Build fast.

You've got this. 🎵

---

**Start with:** `00-project-overview.md` (5 minutes)
