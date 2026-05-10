# Minjae Kim — Portfolio Site: Claude Code Design Spec

## Overview

Build a personal portfolio site for **Minjae Kim**, a mechanical engineering student at the University of Toronto. The site has three pages: Home (`/`), Experience (`/experience`), and Projects (`/projects`).

> **Critical workflow rule:** Before writing any custom component, always `ls components/` and read any relevant file there. Components in that directory are **authoritative** — use them as-is, adapting props/styles only. Only build something from scratch if a suitable component genuinely does not exist.

---

## Recommended Subagent Breakdown

Spawn subagents for parallelizable work. Suggested split:

| Subagent | Responsibility |
|---|---|
| **Agent A — Design System + Shell** | CSS variable tokens, global layout, theme context, routing scaffold (including `/gallery`), `<FloatingDock>` wiring |
| **Agent B — Home Page** | Hero section, About section (incl. cursor-tracking CTA), Achievements section, all scroll animations |
| **Agent C — Experience Page** | Blender plugin integration, SolidWorks asset imports, 3D scene setup |
| **Agent D — Projects Page** | `3DPopoutCard` grid, responsive layout, hover effects |
| **Agent E — Gallery Page** | Read `gallery/` logic, scan `gallery/photos/`, build masonry/grid layout with lightbox |

Agent A must finish (or at least export the token file and theme context) before B, C, D, E start. B/C/D/E can all run in parallel after that.

---

## Tech Stack

- **Framework:** React (with React Router for page routing)
- **Styling:** CSS custom properties (variables) — no hardcoded hex values anywhere in component files
- **Animations:** Scroll-triggered entrance animations; CSS transitions for hover states
- **3D / Experience page:** Blender plugin integration

---

## Step 0 — Inventory Components Directory (do this first)

```
ls components/
```

Read every file found. Map each component to its intended use:

- `FloatingDock` → persistent nav dock (all pages)
- `3DPopoutCard` → project cards on `/projects`
- Any achievement card, stat card, or badge component → Academic Achievements section on Home
- Anything else → note it; use it if it fits

**Do not build a custom version of any component that already exists here.**

---

## Step 1 — Design Tokens (Agent A)

Create `styles/tokens.css`. All values must be CSS custom properties. No component file may reference a raw hex value.

```css
:root {
  /* === Brand Palette === */
  --color-ochre:  #EAA44B;
  --color-sage:   #DAE3BB;
  --color-teal:   #6799A3;
  --color-navy:   #3A5173;

  /* === Backgrounds (dark mode default) === */
  --color-bg-primary:   #0A0A0A;
  --color-bg-secondary: #111111;
  --color-bg-surface:   #1A1A1A;

  /* === Text === */
  --color-text-primary:   #F5F5F0;
  --color-text-secondary: #A0A09A;
  --color-text-muted:     #505050;

  /* === Accents (reused for borders, glows, highlights) === */
  --color-accent-primary:   var(--color-ochre);
  --color-accent-secondary: var(--color-teal);

  /* === Spacing Scale === */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;

  /* === Radius === */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  16px;
  --radius-xl:  24px;
  --radius-full: 9999px;

  /* === Typography === */
  --font-display: /* distinctive display font — NOT Inter/Roboto/Arial */;
  --font-body:    /* refined body font */;

  /* === Transitions === */
  --transition-fast:   150ms ease;
  --transition-base:   250ms ease;
  --transition-slow:   400ms ease;
}

/* Light mode override — applied via class on <html> */
html.light {
  --color-bg-primary:   #F5F4EF;
  --color-bg-secondary: #EDECEA;
  --color-bg-surface:   #E3E2DC;
  --color-text-primary:   #0A0A0A;
  --color-text-secondary: #404040;
  --color-text-muted:     #808080;
  /* Accent colors stay the same in both modes */
}
```

---

## Step 2 — Theme Context + Global Shell (Agent A)

### Theme Context

```jsx
// context/ThemeContext.jsx
// Persists preference to localStorage.
// Exposes: { theme: 'dark' | 'light', toggleTheme: () => void }
// On mount, reads saved preference; applies class to document.documentElement.
```

### App Shell

```jsx
// App.jsx
// - Wraps everything in <ThemeProvider>
// - Sets up React Router routes: /, /projects, /experience
// - Renders <FloatingDock> outside the route outlet so it persists across pages
// - Implements smooth page transitions (CSS fade or slide between routes)
```

---

## Step 3 — Floating Dock (Agent A)

**Source:** `components/FloatingDock` — use as-is.

**Position:** `position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 1000`

**Items (in order):**

| Icon | Action |
|---|---|
| Home | React Router navigate → `/` |
| Projects | React Router navigate → `/projects` |
| Experience | React Router navigate → `/experience` |
| Gallery | React Router navigate → `/gallery` |
| YouTube | `<a target="_blank">` — TODO: add real URL |
| LinkedIn | `<a target="_blank">` — TODO: add real URL |
| Resume | Opens PDF in new tab — TODO: link to `/assets/resume.pdf` |
| Light/Dark | Calls `toggleTheme()` from ThemeContext |

**Active state:** The icon matching the current route gets `color: var(--color-ochre)` or a subtle `box-shadow: 0 0 8px var(--color-teal)` glow. Use `useLocation()` to derive active page.

---

## Step 4 — Home Page (`/`) (Agent B)

### Section 1 — Hero

```
Layout: Full viewport height (100dvh), content vertically centered or slightly above center.

Elements:
  - Large display name: "Minjae Kim"
      Font: var(--font-display), large (clamp(48px, 8vw, 96px))
      Color: var(--color-text-primary)
  - Subtitle / tagline below name
      Suggested: "Mechanical Engineering · University of Toronto"
      Or a one-line role statement — pick what reads best
  - Robot graphic/illustration
      // TODO: Replace placeholder SVG with real robot asset when available
      Position it to the right (desktop) or below name (mobile)

Entrance animations (trigger on page load, not scroll):
  1. Name: opacity 0→1, translateY(20px)→0, duration 600ms, ease-out
  2. Robot: opacity 0→1, translateY(12px)→0, duration 800ms, delay 200ms, slight float loop after
  3. Subtitle: opacity 0→1, translateY(12px)→0, duration 600ms, delay 400ms
```

### Section 2 — About

```
Layout: Two-column on desktop (photo left, bio right), stacked on mobile (photo top, bio below).

Bio text (render exactly as written, no edits):
  "Mechanical engineering student at the University of Toronto. Minor in Bioengineering.
   Premed, currently researching and developing a low-cost dark field microscope for
   antimicrobial susceptibility testing. Love volleyball, cooking, and making friends."

Scroll animation: IntersectionObserver → on enter, fade + translateY(24px)→0

Background treatment: subtle accent element — e.g. a thin left border in
  var(--color-teal) on the text block, or a faint radial glow using var(--color-navy)
  in the section background. Avoid solid color fills.
```

**Photo field — cursor-tracking "Let's Chat" CTA:**

```
// TODO: Replace placeholder with real photo at assets/images/minjae-photo.jpg

The photo container is a bounded region (e.g. 400×480px on desktop, full-width on mobile).
Position: relative; overflow: hidden.

Behavior:
  - Track mousemove events on the photo container via onMouseMove
  - Derive cursor position relative to the container:
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
  - A frosted glass button is absolutely positioned inside the container.
    It follows the cursor, centered on it:
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
  - Button is visible only when cursor is inside the container (onMouseEnter /
    onMouseLeave to toggle a boolean state)
  - On mobile (touch devices), hide the button entirely — it's a hover-only interaction

Button appearance:
  - Frosted glass: backdrop-filter: blur(12px); background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2)
  - Text: "Let's Chat"  |  Icon: lightning bolt (⚡ or an icon from the component library)
  - Font: var(--font-body), small-medium weight
  - Color: var(--color-text-primary)
  - Border-radius: var(--radius-full)  ← pill shape
  - Padding: var(--space-2) var(--space-4)
  - Pointer-events: none  ← so it never accidentally blocks click-through to the photo
  - Smooth follow: add a CSS transition on left/top (transition: left 80ms ease,
    top 80ms ease) for a slight lag that feels natural, not mechanical

On click (or tap if you choose to support it):
  - Open mailto: link — // TODO: replace with real email address
  - e.g. href="mailto:minjae@example.com?subject=Let's Chat"
  - Since pointer-events is none on the button, attach the click handler to the
    container itself and fire it on mousedown, or set pointer-events: auto and
    ensure z-index layering is correct

Light mode: adjust frosted glass tint — rgba(0,0,0,0.08) background so it reads
  on an off-white background.
```

### Section 3 — Academic Achievements

**First:** check `components/` for an achievement card or stat card. Use whatever fits best. Only build a custom card if nothing suitable exists.

**Stagger animation:** Each card fades + slides up in sequence (delay: 0ms, 100ms, 200ms, 300ms) as the section enters the viewport via `IntersectionObserver`.

**Cards — exact content:**

```
Card 1: "2025 Winter Dean's List"
  Body: "Completed 2.15 credits, achieving a 3.93/4.0 sGPA and an 88.3% average."
  Highlight: Pull "3.93" as a prominent stat badge — color: var(--color-ochre)

Card 2: "2024 Fall Dean's List"
  Body: "Completed 2.75 credits, achieving a 3.80/4.0 sGPA and an 84.8% average."
  Highlight: Pull "3.80" as a stat badge

Card 3: "UofT Scholar's Program"
  Body: "Provides recognition to outstanding incoming students. Approximately 900
         admission awards were granted with a value of $10,000."
  Highlight: Pull "$10,000" as a stat badge — color: var(--color-sage)

Card 4: "Governor General's Academic Award" ← most prestigious, highest visual weight
  Body: "Awarded the Governor General's Academic Award for achieving the highest
         average of my graduating class with a cumulative grades 10–12 average of 98.9%."
  Highlight: Pull "98.9%" as stat badge
  Visual treatment: Larger card or span 2 columns (desktop), accent border using
    var(--color-ochre), subtle outer glow (box-shadow with ochre at low opacity).
    This card should visually dominate the grid.
```

---

## Step 5 — Experience Page (`/experience`) (Agent C)

**Renderer:** Blender plugin integration

```
Scene concept: Mimic a SolidWorks viewport aesthetic
  - Background: dark near-black (#0D0D0D or similar via CSS var)
  - Grid floor plane (subtle lines, low contrast)
  - Ambient + directional studio lighting
  - Camera: slight isometric or perspective angle

Objects to place in scene:
  1. Microscope model — low-cost dark field microscope
     // TODO: Replace with real geometry when available; use placeholder mesh for now
  2. NMES Textile Device
     // TODO: Replace with real geometry when available; use placeholder mesh for now
  3. All files from assets/solidworks/ — import each as a separate scene object
     // TODO: assets/solidworks/ contains placeholder files; arrange naturally in workspace

Interaction: Enable orbit and pan if the plugin supports it.
```

**Fallback:** If Blender plugin is unavailable in the current environment, render a styled placeholder section with a note: "3D scene coming soon — Blender integration required."

---

## Step 6 — Projects Page (`/projects`) (Agent D)

**Component:** `components/3DPopoutCard` — use as-is. Read the component file first to understand required props.

**Layout:**
```
Desktop (≥1024px): 3-column grid
Tablet (≥640px):   2-column grid
Mobile (<640px):   1-column stack
Gap: var(--space-8)
Padding: var(--space-12) on each side
```

**Each card — placeholder content:**
```
title:       "Project Title"
description: "Short description of the project goes here."
image:       // TODO: Replace with real project thumbnail
tags:        ["Mechanical", "Research", "Design"]
```

**Render 6 placeholder cards** so the grid layout is visible and testable.

**Hover behavior (built into 3DPopoutCard — verify props):**
```
- 3D tilt/popout effect (component handles this)
- Border or glow on hover: box-shadow using var(--color-teal) at ~40% opacity
- Transition: var(--transition-base)
```

---

## Step 6b — Gallery Page (`/gallery`) (Agent E)

**Read the gallery logic first:**

```bash
ls gallery/
cat gallery/<logic-file(s)>     # read every file in gallery/ before writing any code
ls gallery/photos/               # enumerate actual photo filenames
```

Use whatever logic, utilities, or configuration already exists in `gallery/` as the foundation. Do not reinvent — extend and wire up.

**Photo population:**

```
Source: gallery/photos/
  - Enumerate all image files at build time (or import them statically)
  - // TODO: if gallery/ uses a manifest or config file, populate it with filenames
    found in gallery/photos/ rather than hardcoding paths in JSX

Each photo entry needs at minimum:
  - src: path to the file in gallery/photos/
  - alt: filename-derived fallback (e.g. strip extension, replace hyphens with spaces)
  - Any other fields the gallery/ logic expects (check its data shape first)
```

**Layout:**

```
Use a masonry or responsive grid layout — whichever the gallery/ logic provides.
If the logic is layout-agnostic, default to:
  - CSS columns (column-count: 3 on desktop, 2 on tablet, 1 on mobile)
  - gap: var(--space-4)
  - Images: width 100%, height auto, border-radius: var(--radius-md)

Entrance animation: stagger images in on scroll using IntersectionObserver,
  same pattern as achievements cards (opacity + translateY, 50ms delay between items)
```

**Lightbox / full-screen view:**

```
If gallery/ includes a lightbox component → use it.
If not → implement a simple one:
  - Click any photo → opens an overlay (position: fixed, inset: 0, z-index: 500)
  - Overlay: backdrop blur + dark scrim (rgba(0,0,0,0.85))
  - Show full-size image centered, max 90vw × 90vh
  - Prev / Next arrows to navigate between photos
  - Close on Escape key or clicking outside the image
  - Frosted glass close button (same treatment as the About CTA button) in top-right corner
```

**Design:**

```
Page heading: "Gallery" or leave headingless and let the grid speak — agent's call.
Consistent with dark-first theme; photo borders or hover states use var(--color-teal)
  at low opacity as a subtle highlight.
No captions needed unless the gallery/ logic provides them.
```

---

```
Breakpoints:
  Mobile:  < 640px
  Tablet:  640px – 1023px
  Desktop: ≥ 1024px

FloatingDock: always bottom-centered; reduce icon size slightly on mobile if needed.

Typography: use clamp() for all display/heading sizes so text scales fluidly.

Page transitions: CSS opacity fade (200ms) between route changes via React Router.

No lorem ipsum anywhere. Use "Coming soon" or "TBD" for any missing real content.
```

---

## TODO Checklist (for handoff)

These are stubs to replace with real content later:

```
// TODO: /assets/resume.pdf — link Resume dock item here
// TODO: YouTube URL — update FloatingDock YouTube link
// TODO: LinkedIn URL — update FloatingDock LinkedIn link
// TODO: Hero robot illustration — replace placeholder SVG in Hero section
// TODO: assets/images/minjae-photo.jpg — replace placeholder in About photo field
// TODO: About CTA email — replace mailto: address in photo container click handler
// TODO: assets/solidworks/ — verify all files import correctly into Blender scene
// TODO: Microscope model geometry — replace placeholder mesh in Experience scene
// TODO: NMES Textile Device geometry — replace placeholder mesh in Experience scene
// TODO: Project thumbnails — replace placeholder images in 3DPopoutCard instances
// TODO: Real project titles/descriptions — replace placeholder card content
// TODO: gallery/photos/ — verify all photo filenames are picked up by the gallery logic
```

---

## Component Audit Reminder (for every agent)

Before writing any new UI element, run:

```bash
ls components/
cat components/<relevant-file>
```

If a suitable component exists → use it.  
If it needs minor prop changes → adapt at the call site with props/CSS overrides.  
Only build from scratch if nothing in `components/` comes close.
