# Afterglow: Judge-Aware Product Brief Summary

**Status:** Complete project knowledge base, optimized for Music Hackspace hackathon judge panel  
**Date:** May 15, 2026  
**Judge Panel:** Romain Pouillon, Carlos Caires, Yan Kalnberzin, Richie Hawtin, Michele Darling, JB Thiebaut

---

## What Changed (And Why)

The core concept remains unchanged: **a DJ library browsing system organized by timeline of day → spatial mood constellation → track details.**

What *shifted* is the framing, priorities, and emphasis to authentically resonate with this specific judge panel while staying true to the concept.

---

## Key Principles (Decided)

✓ **One beautiful Pool Party phase, not multiple** → Judges see good scope thinking, polish quality, realistic timelines

✓ **Spatial positions are intentional, not algorithmic** → Judges see intentional design and can trace the logic

✓ **"DJ decision-making dimensions," not "moods"** → Judges see musical sophistication, not reductive categorization

✓ **Real track demo library** → Judges sense authenticity and credibility

✓ **Emphasize artistry and agency** → Judges see respect for DJ creativity, not automation

✓ **Clear zone labels** → Judges can immediately understand the logic

✓ **Responsive hover interaction** → Judges see spatial design is functional, not decorative

✓ **The rediscovery moment as hero beat** → All judges resonate with the universal emotional payoff

---

## Judge Resonance Map

| Judge | Single Most Important Thing | How We Won Them |
|-------|------|---------|
| **Romain Pouillon** | Real track authenticity | Demo library feels like authentic DJ choices |
| **Carlos Caires** | Musical sophistication | Tags are DJ decision-making, not mood reduction |
| **Yan Kalnberzin** | Intentional spatial design | Every position justified; hover shows logic working |
| **Richie Hawtin** | DJ artistry/agency central | No automation; you organize your own library |
| **Michele Darling** | Learnability + rediscovery | Clear labels, intuitive flow, meaningful discovery moment |
| **JB Thiebaut** | Product scope clarity | One phase, explicit MVP, no over-promising |

---

## The 18 Recommendations (All Implemented)

### Must-Have (9)
1. **Timeline view** — Phase selection grounded in real scenario
2. **One Pool Party constellation** — Spatial mood map, fully developed
3. **Intentional spatial positioning** — Hardcoded/manual, not algorithmic
4. **"DJ decision-making" framing** — Not "mood" or "vibe" language
5. **Real track demo library** — 100–150 authentic, well-tagged tracks
6. **Credible rediscovery track** — Play count ≤ 5, genuinely good, musically honest
7. **Hover interaction** — Shows spatial proximity working in real-time
8. **Clear zone labels** — Arrivals, Lock-in, Wanderers visually distinct
9. **Artistry/agency emphasis** — Demo frames as DJ organization tool, not recommendation engine

### Nice-to-Have (4)
- Underplayed track signal (visual indicator)
- Second time phase (Sunrise Reset, if time allows)
- Smooth zoom transitions (Timeline → Constellation)
- Light onboarding tooltips

### Out of Scope (6)
- Audio playback
- AI/algorithmic recommendations
- Real djay SDK integration
- Generic "mood" language
- User accounts & persistence
- Custom tags

---

## Files Created (Judge-Aware)

### Core Documentation
- **00-project-overview.md** — Entry point; what everyone reads first
- **01-problem-and-users.md** — Deep dive on DJ pain points
- **02-core-concept.md** — The three-layer model explained
- **03-mood-taxonomy.md** — DJ decision-making dimensions (NOT "moods")
- **04-ux-and-spatial-interaction.md** — Visual/interaction design guide for visualization specialist
- **05-mvp-and-scope.md** — Judge-aware MVP decisions and time budget
- **06-demo-story.md** — 30-sec, 60-sec, 5–7 min pitches emphasizing artistry
- **07-open-questions.md** — Pending decisions with options
- **08-judge-context-and-decisions.md** — How judge lenses shaped every choice

---

## Demo Strategy (Judge-Optimized)

### The Three Pitches
1. **30 seconds:** Problem hook + different approach + benefit
2. **60 seconds:** Full narrative (problem → insight → solution → value)
3. **5–7 minutes:** Walkthrough (opening → timeline → constellation → rediscovery → arc → close)

### Core Message Structure
- Lead with the real DJ problem (spontaneous gigs, metadata mismatch)
- Show how your thinking differs (organize by context, not metadata)
- Demonstrate the three-layer model in action
- Land the rediscovery moment (emotional/intellectual payoff)
- Emphasize *you* making decisions, *your* library, *your* artistry

### Language Priorities
✓ "Organize your library by how you actually navigate it"  
✓ "DJ decision-making dimensions"  
✓ "Your library, your knowledge"  
✓ "Rediscover material you'd forgotten"  
✗ Avoid: "Recommend," "suggest," "algorithm," "mood," "AI-powered"

---

## What Judges Will Evaluate (And How We Won Them)

| Judge Lens | What They're Looking For | How We Satisfy |
|-----------|---------|---------|
| **Product-market fit** (Romain) | Real DJ problem, plausible solution, honest scope | Pool Party scenario, real tracks, explicit MVP |
| **Musical sophistication** (Carlos) | Respect for musical thinking, no reduction | DJ decision-making dims, spatial proximity shows relationship |
| **Intentional design** (Yan) | Every visual choice justified, responsive interaction | Hardcoded positions, hover feedback, one polished phase |
| **Artistry respect** (Richie) | DJ intelligence central, no automation, genuine | Emphasis on *your* library, *your* choices, no recommendations |
| **Human-centered clarity** (Michele) | Intuitive, learnable, meaningful discovery | Zone labels, clear affordances, rediscovery moment |
| **Product thinking** (JB) | Good scope, clear MVP, technical plausibility, honest | One phase, explicit roadmap, justified decisions |

---

## Critical Success Moments

### The Rediscovery Moment (1–2 minutes into demo)
**What judges will see:**
- Click on "Solar Pool" (underplayed track)
- See: artist, duration, tags (Pool Party, Bridge, Lock-in), play count: 2
- Hear: "I'd forgotten about this. But it's exactly what I need for this moment."

**Why it works for all judges:**
- **Richie:** Your decision-making, not automation
- **Carlos:** Musical logic is clear
- **Yan:** Position shows spatial arrangement is functional
- **Romain:** Real material rediscovered
- **Michele:** Learning moment (system taught you something)
- **JB:** Proof of concept (system did work)

---

## Time Budget (Realistic)

**To build a strong hackathon demo:**
- Must-haves: 35–50 hours (1–2 weeks, 1 person)
- With nice-to-haves: 55–85 hours (2 people, 2 weeks)

**Critical path:**
1. Identify & curate 150-track demo library (6–10 hours)
2. Design spatial encoding (2–3 hours)
3. Build timeline + constellation views (12–16 hours)
4. Implement track details + zone labels (4–6 hours)
5. Build hover interaction (3–5 hours)
6. Polish and QA (3–5 hours)
7. Practice demo script (2–3 hours)

---

## Quality Standards (For This Judge Panel)

### Visual Design
- Intentional, not decorative ✓
- Clear information hierarchy ✓
- Minimal but coherent ✓
- One beautiful phase > three scattered phases ✓

### Interaction Design
- Responsive (<100ms latency) ✓
- Meaningful feedback (hover → nearby tracks respond) ✓
- Smooth, not jarring ✓
- Intuitive affordances ✓

### Product Thinking
- Clear scope boundaries ✓
- Justified decisions ✓
- Honest about MVP vs. roadmap ✓
- No over-promising ✓

### Musical/Creative Credibility
- Real tracks (not dummy data) ✓
- Authentic tagging ✓
- DJ artistry centered ✓
- No automation language ✓

---

## Pre-Demo Checklist (Final Week)

**Production Quality**
- [ ] No crashes or broken states
- [ ] Smooth navigation between views
- [ ] Zone labels are readable
- [ ] Hover interaction works reliably
- [ ] Demo library is loaded and tagged correctly

**Concept Clarity**
- [ ] Can explain three-layer model in <90 seconds
- [ ] Can defend "DJ decision-making" framing
- [ ] Can point to intentional spatial logic
- [ ] Can describe why real tracks matter

**Demo Readiness**
- [ ] Script is practiced (not memorized)
- [ ] Timing is 5–7 minutes
- [ ] Rediscovery moment lands emotionally
- [ ] Backup plan if tech breaks
- [ ] Have phone/laptop backup

**Judge Awareness**
- [ ] Know what matters most to each judge
- [ ] Have answers to common questions (6 provided)
- [ ] Can read the room and adjust emphasis
- [ ] Understand the universal moments (rediscovery)

---

## If Things Go Wrong

**Prototype crashes:** "This is a prototype. Let me show you the core interaction on the next view. The real question is whether organizing around performance contexts helps—I believe it does."

**Judge asks tough question:** Have the six Q&A answers ready. Be authentic, not defensive.

**Tech doesn't cooperate:** Have screenshots, second laptop, printed 1-page guide. Stay calm; concept is sound.

---

## The Authentic Pitch

The strongest thing you have is genuine care for the problem and respect for DJs as creative professionals.

Richie will sense it. Carlos will respect it. All judges will remember it.

This isn't about impressing with technology. It's about showing that you understand a real problem and have thought deeply about how to solve it in a way that respects the people you're building for.

---

## Next Steps

1. **Week 1 (Sprint Planning):**
   - Curate and tag the 150-track demo library
   - Design the spatial encoding (which axis = what dimension?)
   - Set up dev environment

2. **Week 2 (Development):**
   - Build timeline view (complete by day 1)
   - Build constellation view (complete by day 3)
   - Implement interactions & polish (day 4–5)

3. **Week 3 (Demo Prep):**
   - Practice scripts (30-sec, 60-sec, 5–7 min)
   - Get feedback from friends/DJs
   - Run full walkthrough with actual prototype
   - Prepare backup plans

4. **Presentation:**
   - Deliver with authenticity
   - Let your care for the problem come through
   - Remember: one beautiful demo beats over-promising

---

## Success Criteria (For This Judge Panel)

### Minimum Success
Judges understand the core idea and see a credible proof of concept.

### Target Success
Judges ask follow-up questions and imagine using this in their own world.

### Exceptional Success
A judge asks "when can I try this?" or mentions it to other judges.

---

## Status

| Item | Status |
|------|--------|
| **Concept** | ✓ Locked in, core unchanged |
| **Judge context** | ✓ Documented, integrated into all decisions |
| **MVP scope** | ✓ Explicit, justified, realistic |
| **Demo framing** | ✓ Three versions, artistry-focused |
| **Product brief** | ✓ Complete, judge-aware |
| **Ready to build** | ✓ Yes—all decisions made, no blockers |

---

## Final Thought

You're not pitching a DJ tool to DJs. You're pitching a DJ tool to people who understand music, technology, design, and craft at a deep level.

They'll sense immediately if you're being authentic or not. So be authentic.

The concept is strong. The problem is real. Your solution is thoughtful. Trust that, and let it show.

Good luck.
