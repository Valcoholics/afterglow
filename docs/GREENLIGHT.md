# GREENLIGHT: Approved Decisions (No Debate)

**These decisions are locked in.** You don't need to debate them. They've been vetted against both "solves real DJ problem" and "feasible in 24-hour sprint."

**Date Greenlit:** May 15, 2026  
**Team:** Jasmine (PM) + Visualizer/Technologist

---

## 1. MVP Scope

✓ **Build Pool Party constellation only** (not all five time phases)

- Timeline view shows all five phases as options
- Only Pool Party has a complete, playable constellation
- Other phases can be sketched or greyed out (future work)
- This scope proves the concept works for one real DJ scenario
- Fits 24-hour sprint timeline

---

## 2. Spatial Positioning

✓ **Positions are intentional, not algorithmic**

- Hardcoded or manually arranged (no force-directed graphs)
- X-axis = Journey Role (Opener → Home Stretch)
- Y-axis = Crowd State (Arrivals → Wanderers)
- Color/grouping = Time/Setting (Pool Party)
- Every position is traceable to track's tags
- DJ can understand "why is this track positioned here?"

---

## 3. Demo Library

✓ **Real tracks, 150 total, manually tagged**

- Use Creative Commons, royalty-free, or licensed music
- Real artist names (no dummy data)
- Authentic DJ curation (you listen, you tag)
- Mix of genres (house, garage, soul, funk, ambient, breaks, world)
- Include 3–5 underplayed candidates (play count < 5)
- Tagging approach: Manual (answer three questions per track)

---

## 4. Tagging System

✓ **Three dimensions, nine tags total (locked in)**

### Time/Setting (pick 1–2, usually 1)
- Warm-up
- Pool Party ← MVP focus
- Festival Brunch
- Post-game
- Sunrise Reset

### Journey Role (pick 1)
- Opener
- Bridge
- Reset
- Home Stretch

### Crowd State (pick 1–2)
- Arrivals
- Lock-in
- Wanderers

**No custom tags in MVP.** These nine are sufficient. Post-hackathon: explore user customization.

---

## 5. Demo Scenario

✓ **Pool Party walkthrough**

- "You get texted: friend asks you to DJ a pool party at 4 pm"
- 2-hour prep window
- Real constraint: don't know exact crowd/energy
- Demo shows full three-layer flow
- Ends with rediscovery moment + confidence

---

## 6. Rediscovery Track

✓ **Ready to find during library curation**

- Requirements: play count ≤ 5, Pool Party context, genuinely good, ideally Bridge role
- You'll identify this when curating (listen to 150, 3–5 will stand out)
- Must be real track (not contrived for demo)
- Will be the hero moment of the walkthrough

---

## 7. Team & Timeline

✓ **24-hour sprint with clear role split**

**PM / Visionary (Jasmine):**
- Curate demo library (150 tracks, tagged)
- Own demo narrative (all three versions)
- Make product decisions during build
- Identify rediscovery track
- QA: Does it solve the real DJ problem?

**Visualizer / Creative Technologist (Teammate):**
- Design spatial encoding (confirm X/Y/color mapping)
- Build timeline view
- Build Pool Party constellation (40–50 tracks)
- Implement zone labels + hover interaction
- Polish interactions (responsive, no lag)

**Timeline:** 24 hours total  
**Breakdown:** Library (6–10h) + UI (12–16h) + Polish (3–5h) + Demo (2–3h)

---

## 8. Tagging Approach

✓ **Manual tagging (not algorithmic seed)**

- You listen to each track
- Ask three questions: When? Why? What crowd?
- Tag based on honest DJ thinking
- Time estimate: 6–10 hours for 150 tracks
- Quality over speed (authenticity matters)

---

## 9. Language & Framing

✓ **"DJ decision-making dimensions" (mandatory)**

### Use this language:
- "DJ decision-making dimensions" (not "mood tags")
- "Performance contexts" (not "vibes")
- "When would you play this?" (not "what mood is it?")
- "Your library, organized your way" (not "algorithm decides")

### Avoid this language:
- "Mood" or "feel"
- "AI-powered" or "recommend"
- "Emotional categories"
- Anything suggesting automation replaces DJ judgment

**Why:** Respects musical sophistication. Frames system as DJ tool, not mood tagger.

---

## 10. Judge Context

✓ **Keep as reference (not primary driver)**

- Reference `08-judge-context-and-decisions.md` to understand why each decision was made
- Useful for demo framing and trade-off decisions
- Don't optimize FOR judges; optimize for DJ problem; judges will see the thinking

---

## What's NOT Greenlit (Out of Scope)

| What | Why Not |
|------|---------|
| Audio playback | Out of scope; prep tool, not player |
| djay integration | Future; design for it, don't build it |
| AI recommendations | Removes DJ agency; contradicts core message |
| User accounts | Not needed for demo; MVP is stateless |
| Custom tags | Adds complexity; nine tags are sufficient |
| Multiple phases | Pool Party only; proves concept |
| Search/filter UI | Spatial discovery is primary; search is secondary |
| Analytics | Nice later; not core to demo |

---

## What Happens If You Hit a Blocker?

### If demo library tagging takes too long:
- You have 50 deeply-tagged "anchor" tracks
- For remaining 100: use pattern-matching (same genre/energy = similar tags)
- Quality drops slightly but proves concept still works

### If spatial interaction is sluggish:
- Prioritize hover latency (<100ms)
- Simplify hover effect if needed (just brighten, no fade)
- Test early and often

### If rediscovery track doesn't feel right:
- You identified 3–5 candidates
- Pick the next best one
- Doesn't need to be perfect; just needs to be real and honest

### If tech breaks during demo:
- You have screenshots of key moments
- Second laptop with demo ready
- Fallback: walk judges through screenshots + explain the demo
- Concept is solid enough to survive tech failure

---

## How to Use This Document

- **Before starting:** Read this (5 min). You don't need to debate these decisions.
- **During build:** If you hit a choice point and think "wait, should we do this differently?" — check here first. Probably already answered.
- **If something feels off:** Don't change greenlit decisions without talking to Jasmine. But small tweaks are fine (e.g., "hover effect is a fade instead of brighten").

---

## TL;DR

✓ Pool Party only  
✓ Intentional spatial positioning  
✓ Real tracks, real tags  
✓ Nine tags (no custom)  
✓ Manual tagging  
✓ Pool party demo scenario  
✓ DJ decision-making language (not "mood")  
✓ 24-hour sprint with role split  
✓ Judge context for reference (not primary)  

**Everything else** is either implementation detail (planning mode will clarify) or explicitly out of scope.

---

## Sign-Off

**Greenlit by:** Jasmine Sabio  
**Approved for build:** Yes  
**Ready to plan:** Yes  
**Ready to hack:** Yes  

**Next step:** Read PRD + IMPLEMENTATION-BRIEF with your teammate, align, then go into planning mode.

You're good to go. 🎵
