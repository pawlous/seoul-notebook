---
name: 首爾散步手帳 (Seoul Notebook)
description: A Seoul itinerary notebook drawn as a hanok window lattice at blue hour.
colors:
  night: "#0c1c47"
  night-line: "#2b3d72"
  night-soft: "#aebbe0"
  blue: "#163b9c"
  line-soft: "#adbadc"
  paper: "#eef2f8"
  pane: "#ffffff"
  muted-ink: "#4a5a82"
  lamp: "#f3b94d"
  error: "#a3261b"
  ok: "#1f6b4a"
typography:
  display:
    fontFamily: "LXGW WenKai TC, Noto Sans TC, serif"
    fontSize: "clamp(38px, 5.6vw, 76px)"
    fontWeight: 300
    lineHeight: 1.12
    letterSpacing: "0.01em"
  headline:
    fontFamily: "LXGW WenKai TC, Noto Sans TC, serif"
    fontSize: "clamp(26px, 2.8vw, 34px)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "0.02em"
  numeral:
    fontFamily: "Pretendard Seoul, Noto Sans TC, system-ui, sans-serif"
    fontSize: "clamp(40px, 5vw, 64px)"
    fontWeight: 200
    lineHeight: 0.9
    letterSpacing: "-0.04em"
    fontFeature: "tnum"
  time:
    fontFamily: "Pretendard Seoul, Noto Sans TC, system-ui, sans-serif"
    fontSize: "clamp(26px, 2.4vw, 32px)"
    fontWeight: 250
    lineHeight: 1.1
    letterSpacing: "-0.03em"
    fontFeature: "tnum"
  title:
    fontFamily: "Pretendard Seoul, Noto Sans TC, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Pretendard Seoul, Noto Sans TC, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  note:
    fontFamily: "Pretendard Seoul, Noto Sans TC, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.85
  period-label:
    fontFamily: "Pretendard Seoul, Noto Sans TC, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "0.14em"
  label:
    fontFamily: "Pretendard Seoul, Noto Sans TC, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.14em"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(16px, 4.4vw, 64px)"
  pane-y: "22px"
  pane-x: "24px"
  pane-x-phone: "18px"
  section: "56px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.pane}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.night}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.blue}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "44px"
  button-outline-hover:
    backgroundColor: "{colors.pane}"
  input:
    backgroundColor: "{colors.pane}"
    textColor: "{colors.night}"
    rounded: "{rounded.none}"
    padding: "11px 12px"
  note-editor:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.night}"
    typography: "{typography.note}"
    rounded: "{rounded.none}"
    padding: "12px"
  day-tab:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-soft}"
    typography: "{typography.numeral}"
    rounded: "{rounded.none}"
    padding: "20px 22px 18px"
  day-tab-active:
    backgroundColor: "{colors.lamp}"
    textColor: "{colors.night}"
  period-heading:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue}"
    typography: "{typography.period-label}"
    padding: "22px 20px"
  stop-pane:
    backgroundColor: "{colors.pane}"
    textColor: "{colors.night}"
    rounded: "{rounded.none}"
    padding: "22px 24px 0"
---

# Design System: 首爾散步手帳 (Seoul Notebook)

## Overview

**Creative North Star: "The Hanok Window at Blue Hour"**

The page is a 창살 (hanok window lattice) seen at dusk. A deep night-navy band holds the title, a hand-drawn line skyline of Seoul, and a row of day panes; the chosen day glows lamp amber, like one lit paper window. Below the band the ground turns to cool frost paper, and the day's stops sit in white panes held by a lattice of 1px rules. The surface reads as a calm, unhurried notebook rather than a trip-planner app.

Density comes from structure, not decoration: every division is a hairline rule, every corner is square, and hierarchy comes from scale contrast between very large, very light numerals and small, widely tracked labels. Titles are set in a brush-kai face (LXGW WenKai TC) so the Traditional Chinese reads as handwritten journal headings; everything else is a quiet sans. Motion is limited to the lamp sweeping into the active day and the panes settling once.

The build rejects the category default of rounded white cards on grey with pill tabs; this is confirmed in the direction contract and holds across the build.

**Key Characteristics:**
- Navy band over frost paper; two grounds, never a third.
- One lamp: amber only marks what is lit (active day, its focus ring, text selection).
- Square corners and 1px rules everywhere; frame rules in brand blue, inner muntins in soft blue.
- Huge thin numerals against tiny tracked labels.
- Line-illustration imagery drawn in the palette's own strokes, never photography.

## Colors

A cold, three-value blue-hour palette (night, blue, paper) plus a single warm lamp.

### Primary
- **Hanok Brand Blue** (#163b9c): the owner's brand blue. Carries structure and action: the lattice frame rules, period labels, the stop count, links, map links, outline and filled buttons, input and textarea strokes, the default focus ring and caret.

### Secondary
- **Lamp Amber** (#f3b94d): the lit window. Reserved for the active day tab fill, the focus ring inside the day tabs, and `::selection`. Nothing else.

### Neutral
- **Blue-Hour Night** (#0c1c47): the band background and the body ink color on paper and panes; also the hover fill of primary buttons and the text on the lit day tab.
- **Night Rule** (#2b3d72): hairlines inside the band (top bar divider, day-tab pane edges, trip-meta separators, the far mountain ridge in the skyline).
- **Night Mist** (#aebbe0): secondary text on the band (brand subtitle, trip dates meta, unlit day tabs), the thin strokes and stars of the skyline.
- **Frost Paper** (#eef2f8): the page ground below the band, the period label column, the note editor field, the outline focus color inside the band.
- **Pane White** (#ffffff): stop panes and form inputs.
- **Muntin Mist** (#adbadc): the inner lattice; the 1px gaps between stop panes show this ground. Also the decorative em dash for an untimed stop.
- **Muted Ink** (#4a5a82): secondary text on light grounds (region, note labels, hints, footer, form labels, empty notes).

### Status
- **Persimmon Error** (#a3261b): error text and the 1px border of load alerts.
- **Pine OK** (#1f6b4a): the save confirmation and the "Naver Map" provider label.

### Named Rules
**The One Lamp Rule.** Lamp amber marks only the lit state: the active day pane, focus within the day tabs, and text selection. If an element is not "the one lit thing", it is not amber.

**The Two Grounds Rule.** Night navy above, frost paper below. Panes are white; there is no grey and no third surface color.

**The Frame and Muntin Rule.** The lattice uses two rule weights by color, not by thickness: the outer frame and period dividers are brand blue (#163b9c); the muntins between stop panes are soft blue (#adbadc). Both are 1px.

## Typography

**Title Font:** LXGW WenKai TC (with Noto Sans TC, serif)
**Body Font:** Pretendard Seoul for Latin, numerals and Hangul, falling through to Noto Sans TC for CJK (then PingFang TC, Microsoft JhengHei, system-ui)

**Character:** A brush-kai title face gives the page a handwritten-journal voice; a neutral, variable-weight sans handles everything operational, with its thinnest weights reserved for big numerals.

### Hierarchy
- **Display** (300, clamp(38px, 5.6vw, 76px), 1.12): the trip title in the band only. Balanced wrapping, `keep-all` line breaking. Phone: clamp(34px, 10vw, 44px).
- **Headline** (400, clamp(26px, 2.8vw, 34px), 1.35): the day title above the lattice.
- **Numeral** (200, clamp(40px, 5vw, 64px), 0.9, -0.04em, tabular): day-tab dates; 300 when active. Phone: 40px.
- **Time** (250, clamp(26px, 2.4vw, 32px), 1.1, -0.03em, tabular): the stop time in each pane.
- **Title** (600, 18px, 1.5): the place name in each pane.
- **Body** (400, 16px, 1.6): base text. Notes run at 15px / 1.85; hints at 14px / 1.75, capped at 60ch.
- **Period label** (500, 15px, 0.14em): period names (上午, 下午…) in the sticky left column, in brand blue.
- **Label** (400, 12–13px, 0.14–0.2em tracking): brand subtitle, trip meta, tab month and weekday, category, note label, count, sign-in summary, footer.

### Named Rules
**The Scale Contrast Rule.** Hierarchy comes from size and weight extremes: numerals and times go thin (200–300) and large; labels go small and tracked. Never fake hierarchy with bold mid-sized type.

**The Brush for Titles Rule.** LXGW WenKai TC is used for h1 and h2 only. Labels, numerals, buttons and body stay in the sans.

## Layout

A single column, max 1240px wide, with a fluid gutter of clamp(16px, 4.4vw, 64px). The navy band (top bar, intro, skyline, day tabs) bleeds full width using a 100vmax spread and inset clip-path, so content stays aligned to the container.

- **Top bar:** 72px tall (60px on phone), wordmark left, other-trip link right behind a 1px vertical rule, 1px night-rule bottom border.
- **Day tabs:** an equal-column grid of panes inside the band; on phones (≤700px) the panes become a horizontally scrolling, snapping row with a 78px minimum per pane and the month dropped.
- **Lattice:** each period is a row with a label column of clamp(112px, 12vw, 168px) and a two-column grid of stop panes. When a period has an odd number of stops, the empty cell is filled with an unlit 띠살 pane (dense vertical sticks with three grouped rails) on paper, so the window never shows a hole. At ≤960px stops go to one column and the filler is dropped; at ≤700px the label column stacks above the panes.
- **Rhythm:** panes pad 22px 24px (18px horizontally on phone); the sign-in panel sits 56px below the lattice, above the footer.

## Elevation & Depth

Flat. There are no shadows; depth is conveyed by the two grounds (night band over frost paper), white panes set into a blue lattice, and the lamp fill. The only `box-shadow` in the system is the zero-blur 100vmax spread that extends the band to the viewport edges; it is a layout device, not elevation.

### Named Rules
**The Paper Window Rule.** Surfaces never lift. A pane is distinguished by its fill and its 1px frame, never by a shadow.

## Shapes

Square corners everywhere (radius 0), including inputs, buttons, tabs and the textarea. Every rule is 1px solid; the one exception is the dashed 1px divider (blue at 35% opacity) between a stop's header and its note, and a 1px blue-at-18% rule above the map footer. The sign-in disclosure marker is a 9px outlined square that fills blue and turns 45 degrees when open, a small lattice joint rather than a chevron.

The skyline illustration is drawn in round-capped, non-scaling strokes: paper at 1.25px for landmarks, night mist at 0.75px for detail, night rule for the far ridge. Landmark fills are night navy so they occlude the ridge.

## Components

### Buttons
Square, ruled, and quiet.
- **Shape:** square (0px), 1px brand-blue border, min-height 44px (40px inside the note editor).
- **Primary:** brand blue fill, white text, 600 weight; hover deepens fill and border to night navy.
- **Outline:** transparent with brand-blue text and border; hover fills pane white.
- **Text actions:** note edit and alert retry buttons are borderless brand-blue text that underline on hover.
- **Disabled:** 40% opacity.

### Inputs / Fields
- **Style:** 1px brand-blue stroke, square, pane-white field, 16px text, padding 11px 12px. Labels sit above in tracked 12px muted ink.
- **Note editor:** frost-paper textarea, 15px / 1.75, vertical resize.
- **Focus:** 2px brand-blue outline offset 2–3px; caret brand blue.
- **Error:** persimmon text below; load alerts get a 1px persimmon border on a faint warm tint.

### Navigation
- **Top bar:** tracked uppercase SEOUL wordmark with a 1.5px-stroke notebook icon; the trip switch link underlines on hover and its arrow nudges 3px right.
- **Day tabs (signature):** a lattice row of panes in the band. Unlit panes show night-mist numerals and brighten to paper on hover. The active pane fills with lamp amber, sweeping up from the bottom (0.5s, cubic-bezier(.16, 1, .3, 1)), text turns night navy and the numeral thickens to 300. Focus inside the tabs is drawn in amber.

### Stop Pane (signature)
A white window pane in the lattice: a header row (category with a line icon in ink, region with a pin in muted ink), the thin time, the place title, an optional hint, then a dashed divider into the note block, and a map footer listing "Naver Map" in pine and each map link in bold brand blue with a 44px tap height. Panes settle in once with a staggered opacity rise (0.7s, 45ms per pane, capped at 10). Untimed stops show a soft-blue em dash in place of the time.

### Period Heading
A frost-paper cell in the lattice's left column; the label is sticky 20px from the top while its period scrolls. On phones it becomes a full-width strip above its panes.

### Cloud Notes Panel
A disclosure that starts as one tracked blue line under a 1px blue rule, above the footer. Open, it shows the sign-in form or the signed-in actions as square buttons.

### Skyline Illustration
An authored inline SVG of Seoul landmarks (Bukhansan ridge, DDP, Namsan and N Seoul Tower, Sungnyemun, Lotte World Tower, hanok roofs, a Han River bridge, moon and stars), full-bleed under the title, cropping from the centre on narrow screens.

## Do's and Don'ts

### Do:
- **Do** separate everything with 1px rules: brand blue (#163b9c) for frames, soft blue (#adbadc) for muntins between panes, night rule (#2b3d72) inside the band.
- **Do** keep every corner square (0px), including inputs and buttons.
- **Do** set h1 and h2 in LXGW WenKai TC and everything else in Pretendard Seoul with Noto Sans TC.
- **Do** make large numerals thin (200–300) and labels small and tracked (0.14–0.2em).
- **Do** fill an odd lattice cell with the unlit 띠살 pane rather than leaving a gap.
- **Do** draw imagery as line illustration in the palette's own stroke colors.
- **Do** honor reduced motion: all animation and transitions snap off.

### Don't:
- **Don't** use lamp amber (#f3b94d) for anything except the active day tab, focus inside the day tabs, and text selection.
- **Don't** round corners or use pill tabs and rounded white cards on grey.
- **Don't** add drop shadows to lift panes or buttons.
- **Don't** introduce a third ground color between navy and frost paper.
- **Don't** reintroduce numbered stop indices; they were removed as unclear.
