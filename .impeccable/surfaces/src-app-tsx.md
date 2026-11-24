---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

# Surface brief: itinerary notebook (src/App.tsx)

Scope: the single-page itinerary notebook (both trips). Visitor mode: Operate.
Audience: the owner and travel companions; planning on desktop, day-of on phones in Seoul.
Task: see a day's plan by period, find the next stop, open Naver Map, read and edit notes; sign in / import / reload.
Constraints: keep all features and copy; keep the navy brand blue (#163b9c).

## Direction contract

THESIS: The day is a hanok window (창살) at blue hour: stops sit in panes of a fine lattice, and the selected day glows like a lit paper window. It refuses the category default of rounded white cards on grey with pill tabs.

OWN-WORLD: Deep night navy (#0c1c47) shell, brand blue #163b9c for structure and actions, cool frost paper (#eef2f8) ground, white panes, one lamp amber (#f3b94d) used only for "selected/lit". Every rule 1px, square corners everywhere, three values plus lamp. Pretendard for Latin/numerals with Noto Sans TC; hierarchy by scale contrast (huge thin numerals, tiny tracked labels). (Stop index numbers were removed at the user's request: they read as unclear.)

STORY: The visitor sees the trip title and dates, picks a lit day, then reads the day's panes period by period: number, time, place, region, note, Naver Map. They add notes in place.

FIRST VIEWPORT: Full-width navy band: slim top bar (SEOUL wordmark left, other-trip link right), trip title in light large type with dates, DDP photo framed in a 1px pane at right; the four day tabs as a lattice row of panes inside the band, numerals ~56px thin, the active pane filled lamp amber. Below on frost: day title, count, then the period lattice: period label column left, stop panes in a grid at right. Sign-in sits as a quiet line under the band.

FORM: Hanok window lattice at blue hour, position 7 on the ordered list; seed key aa506323.

Signature interaction: switching day relights the chosen pane (amber fill sweeps in) and the lattice below fades in pane by pane, once; reduced motion snaps.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
