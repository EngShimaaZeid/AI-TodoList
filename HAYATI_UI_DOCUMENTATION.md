# Hayati UI/UX Design Documentation

> **Version:** 1.0  
> **Last Updated:** December 3, 2025  
> **Purpose:** Complete UI/UX documentation for the Hayati AI Life Management Assistant

---

## 🎨 DESIGN PHILOSOPHY

Hayati offers **TWO visual experiences** that users can switch between:

| Mode | Feel | Emotional Goal |
|------|------|----------------|
| **Modern Mode** | Clean, tech, professional | Productive, smart, efficient |
| **Boho Vintage Mode** | Warm, cozy, emotional | Safe, calm, personal refuge |

---

## 🌐 MODERN MODE (Default)

### Color Palette

```css
--primary: #26BFF0          /* Bright cyan - main brand color */
--primary-light: #7DD4F4    /* Light cyan - hover states */
--secondary: #667eea        /* Purple gradient start */
--secondary-alt: #764ba2    /* Purple gradient end */
--dark: #1a1a2e             /* Dark background */
--dark-light: #16213e       /* Card backgrounds */
--text-primary: #ffffff     /* Main text */
--text-secondary: #a0a0a0   /* Muted text */
--success: #10b981          /* Green accents */
--warning: #f59e0b          /* Yellow accents */
--error: #ef4444            /* Red accents */
```

### Typography

```css
/* Headings */
font-family: 'Outfit', sans-serif;
font-weight: 700;

/* Body Text */
font-family: 'Inter', sans-serif;
font-weight: 400;
```

### Visual Elements

- **Hero**: Animated robot mascot with floating icons
- **Cards**: Glassmorphism with blur effects
- **Buttons**: Gradient backgrounds with hover lift
- **Shadows**: Soft, elevated shadows
- **Animations**: Smooth, subtle transitions

---

## 🍂 BOHO VINTAGE MODE

### Design Concept

```
The app should feel like:
┌─────────────────────────────────────────┐
│  • A secret handwritten diary           │
│  • A vintage study room at golden hour  │
│  • A calm café corner with old books    │
│  • A personal letter from a wise friend │
│  • A digital refuge, not a tool         │
└─────────────────────────────────────────┘
```

### Color Palette

```css
/* Primary Warm Colors */
--boho-burnt-orange: #C4703A;   /* Main accent */
--boho-deep-green: #2D4A3E;     /* Secondary accent */
--boho-vintage-mustard: #D4A84B; /* Highlights */
--boho-cocoa-brown: #5D4037;    /* Rich brown */

/* Supporting Earth Tones */
--boho-olive: #6B7B3C;          /* Muted green */
--boho-faded-teal: #5A8A8A;     /* Soft teal */

/* Paper & Background */
--boho-cream: #F5F0E6;          /* Main background */
--boho-aged-paper: #F8F3E8;     /* Card backgrounds */
--boho-warm-white: #FFFBF5;     /* Highlights */
--boho-soft-sepia: #D4C4A8;     /* Borders, shadows */

/* Text Colors */
--boho-ink-brown: #3D2B1F;      /* Primary text */
--boho-pencil-gray: #6B5B4F;    /* Secondary text */

/* Texture Colors */
--coffee-stain: rgba(139, 90, 43, 0.15);
--paper-shadow: rgba(61, 43, 31, 0.1);
--tape-color: rgba(255, 248, 220, 0.85);
--torn-edge: #E8DFD0;
```

### Typography

```css
/* Handwritten Headings - Diary feel */
font-family: 'Caveat', cursive;
font-weight: 500-700;

/* Elegant Body - Vintage book feel */
font-family: 'Crimson Text', Georgia, serif;
font-weight: 400;
font-style: italic; /* for emphasis */

/* Readable UI Text */
font-family: 'Quicksand', sans-serif;
font-weight: 400-600;
```

---

## 🖼️ HERO SECTION VISUALS

### Modern Mode Hero

```
┌────────────────────────────────────────────┐
│                                            │
│   [Robot Mascot]      📅 (floating)        │
│      🤖               🎯 (floating)        │
│                       ❤️ (floating)        │
│                       🧠 (floating)        │
│                                            │
│   Let AI Run Your To-Do List               │
│   While You Run Your Life                  │
│                                            │
│   [Design My Week] [Talk to AI]            │
│                                            │
└────────────────────────────────────────────┘
```

### Boho Vintage Hero

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│     ☀️ (soft light rays from corner)                              │
│         · · · (floating dust particles)                            │
│                                                                    │
│                    ~~~ ~~~ ~~~                                     │
│                     (steam)                                        │
│                                                                    │
│     📔📕📗         ┌─────┐        🖋️                             │
│     (books)       │ ☕  │       (pen)   🍂 🍁                      │
│       📖          │_____|         ✏️                               │
│    (notebook)     (saucer)      👓                                │
│                                (glasses)                           │
│              🕯️                                                    │
│            (candle)      ○  (tea stain)                           │
│                                                                    │
│   ░░░░░░░░░░░░░ WOODEN TABLE ░░░░░░░░░░░░░                        │
│                                                                    │
│   Let AI Run Your To-Do List                                       │
│   While You Run Your Life                                          │
│                                                                    │
│   [Design My Week] [Talk to AI]                                    │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘

Mood: "I just sat down with my tea and my notebook to rethink my life."
```

---

## 🎭 VISUAL ELEMENTS COMPARISON

| Element | Modern Mode | Boho Vintage Mode |
|---------|-------------|-------------------|
| **Hero Visual** | Robot mascot with glow | Cozy tea scene illustration |
| **Main Focus** | Animated robot | Vintage tea cup with steam |
| **Floating Icons** | 📅🎯❤️🧠 | Dust particles, light rays |
| **Logo Icon** | 🤖 | 📖 |
| **Background** | Dark gradients | Cream paper with grain, warm vignette |
| **Texture** | None / smooth | Paper grain, wood table, stain rings |
| **Decorative Items** | Tech floating icons | Books, pen, pencil, candle, glasses, leaves |
| **Cards** | Glassmorphism | Sticky notes with masking tape |
| **Card Edges** | Rounded (12px) | Torn paper edges |
| **Buttons** | Gradient fills | Paper tags with wax seal accents |
| **Chat Area** | Dark with glow | Lined paper with notebook binding |
| **Shadows** | Cool toned | Warm sepia toned |
| **Animations** | Smooth fades | Steam wisps, candle flicker, dust float, leaf sway |

---

## ✨ BOHO VINTAGE ANIMATIONS

### Steam Wisps (Tea Cup) - Natural, Slow Movement
```css
@keyframes steamWisp1 {
    0% { opacity: 0; transform: translateY(20px) scaleY(0.5); }
    20% { opacity: 0.6; }
    80% { opacity: 0.3; }
    100% { opacity: 0; transform: translateY(-30px) scaleY(1.2) translateX(-10px); }
}
/* Duration: 4-5s, easing: ease-in-out */
```

### Floating Dust Particles - Ambient, Dreamy
```css
@keyframes floatDustSlow {
    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
    25% { transform: translateY(-30px) translateX(15px); opacity: 0.6; }
    50% { transform: translateY(-15px) translateX(-10px); opacity: 0.4; }
    75% { transform: translateY(-40px) translateX(5px); opacity: 0.5; }
}
/* Duration: 15s, multiple particles with different delays */
```

### Light Breathing - Soft Ambient Glow
```css
@keyframes lightBreathing {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
}
/* Duration: 8s, very subtle */
```

### Candle Flame Flicker
```css
@keyframes flameFlicker {
    0% { transform: translateX(-50%) scaleY(1) scaleX(1); }
    100% { transform: translateX(-50%) scaleY(1.1) scaleX(0.9); }
}
/* Duration: 0.5s, alternate */
```

### Leaf Float - Gentle Movement
```css
@keyframes leafFloat {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(5deg); }
}
/* Duration: 8s */
```

### Fade-in Scene on Load
```css
@keyframes fadeInScene {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
}
/* Duration: 1.5s, runs once */
```

### Gentle Breathing (Cup)
```css
@keyframes gentleBreathing {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-3px); }
}
/* Duration: 5s, very subtle vertical movement */
```

---

## 📝 CARD DESIGN (Boho Mode)

### Sticky Note Card Structure

```
        ┌─ Masking tape ─┐
        │     ░░░░░      │ (rotated -2deg)
┌───────┴────────────────┴───────┐
│                                │
│   📋 Task Title                │
│                                │
│   Description text goes        │
│   here with elegant font       │
│                                │
│   ─────────────────────        │
│                                │
└────────────────────────────────┘
        ▲▲▲ torn edge ▲▲▲
```

### CSS Implementation

```css
/* Masking Tape */
.card::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%) rotate(-2deg);
    width: 60px;
    height: 20px;
    background: rgba(255, 248, 220, 0.85);
    border: 1px solid rgba(212, 196, 168, 0.5);
}

/* Torn Edge */
.card::after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 4px;
    background: linear-gradient(90deg, 
        transparent 0%, 
        #E8DFD0 10%, 
        transparent 15%, ...);
}
```

---

## 💬 CHAT INTERFACE

### Modern Chat Design
- Dark background with gradient
- Glowing input field
- Rounded message bubbles
- Purple/cyan accent colors

### Boho Vintage Chat Design

```
┌──────────────────────────────────────┐
│ ║                                    │ ← Notebook binding
│ ║  𝐇𝐚𝐲𝐚𝐭𝐢 💙                         │ ← Handwritten header
│ ╠══════════════════════════════════╣ │
│ ║  ______________________________ │ │
│ ║  ______________________________ │ │ ← Lined paper
│ ║  ✒️ Bot message here...        │ │ ← Quill decoration
│ ║  ______________________________ │ │
│ ║                                  │ │
│ ║       User message here ___│    │ │ ← Right aligned
│ ║  ______________________________ │ │
│ ╠══════════════════════════════════╣ │
│ ║  [Type here...        ] [🟢]    │ │ ← Wax seal send button
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

---

## 🎚️ THEME TOGGLE BUTTON

### Position
- Fixed position: top-right corner
- Below navbar: `top: 100px; right: 20px;`
- Z-index: 999 (above content, below modals)

### Design

```
Modern Mode:
┌─────────────────────────┐
│  🍂  Boho Mode          │  ← Purple gradient background
└─────────────────────────┘

Boho Mode:
┌─────────────────────────┐
│  ✨  Modern Mode        │  ← Aged paper background
└─────────────────────────┘
```

### Behavior
- Click to toggle between modes
- Preference saved to localStorage
- Persists across page reloads
- Smooth transition (0.3s)

---

## 📱 RESPONSIVE DESIGN

### Breakpoints

```css
/* Desktop */
@media (min-width: 1024px) { }

/* Tablet */
@media (max-width: 768px) {
    /* Reduce font sizes */
    /* Stack layouts vertically */
    /* Smaller vintage scene */
}

/* Mobile */
@media (max-width: 480px) {
    /* Minimal decorations */
    /* Hidden steam animation */
    /* Hidden scattered papers */
    /* Compact vintage desk */
}
```

### Mobile Optimizations (Boho Mode)
- Smaller emoji sizes
- Hidden complex animations on small screens
- Simplified vintage scene
- Touch-friendly tap targets (min 44px)

---

## 📄 PRINT STYLES (PDF Export)

```css
@media print {
    /* Remove background textures */
    /* Solid borders instead of shadows */
    /* Black text for readability */
    /* Page break controls */
    /* Hidden interactive elements */
}
```

---

## 🔗 RELATED FILES

| File | Purpose |
|------|---------|
| `index.html` | Main landing page structure |
| `index.css` | Modern mode styling |
| `boho-theme.css` | Boho vintage mode styling |
| `script.js` | Theme toggle logic, chat interface |
| `HAYATI_SYSTEM_PROMPT.md` | AI behavior documentation |

---

## 📝 CHANGELOG

| Date | Version | Changes |
|------|---------|---------|
| Dec 3, 2025 | 1.0 | Initial UI documentation |
| Dec 3, 2025 | 1.0 | Documented Modern Mode design |
| Dec 3, 2025 | 1.0 | Complete Boho Vintage World documentation |
| Dec 3, 2025 | 1.0 | Added vintage study desk scene specs |
| Dec 3, 2025 | 1.0 | Animation keyframes documented |
| Dec 3, 2025 | 1.0 | Card design patterns documented |
| Dec 3, 2025 | 1.0 | Theme toggle behavior documented |
| Dec 3, 2025 | 2.0 | **MAJOR: New Cozy Tea Scene Hero Illustration** |
| Dec 3, 2025 | 2.0 | CSS-illustrated tea cup with SVG steam wisps |
| Dec 3, 2025 | 2.0 | Wooden table surface with texture |
| Dec 3, 2025 | 2.0 | Stacked old books with open notebook |
| Dec 3, 2025 | 2.0 | Fountain pen with ink stain |
| Dec 3, 2025 | 2.0 | Vintage pencil illustration |
| Dec 3, 2025 | 2.0 | Small candle with animated flame |
| Dec 3, 2025 | 2.0 | Reading glasses, dried leaves, paper scraps |
| Dec 3, 2025 | 2.0 | Tea stain rings decorations |
| Dec 3, 2025 | 2.0 | Background layers: paper texture, vignette, dust, light rays |
| Dec 3, 2025 | 2.0 | All-new slow, warm animations (no bouncing) |
| Dec 3, 2025 | 2.0 | Fade-in scene on page load |
| Dec 3, 2025 | 2.0 | Mobile-optimized responsive design |
| Dec 3, 2025 | 3.0 | **MAJOR: Organic Section Transitions** |
| Dec 3, 2025 | 3.0 | Removed all straight lines between sections |
| Dec 3, 2025 | 3.0 | Added SVG wave transitions with animations |
| Dec 3, 2025 | 3.0 | Torn paper edges, ink drips, coffee spills |
| Dec 3, 2025 | 3.0 | Paint strokes, brush strokes, light leaks |
| Dec 3, 2025 | 3.0 | Notebook corners, tape strips, floating papers |
| Dec 3, 2025 | 3.0 | Fabric edges, stitch lines for footer |
| Dec 3, 2025 | 3.0 | Scattered dots, ink splashes |
| Dec 3, 2025 | 3.0 | Flowing section backgrounds that blend |
| Dec 3, 2025 | 3.0 | Journal/scrapbook traveling experience |

---

## 🎯 UX GOALS

### Modern Mode
- Users feel: "This is smart and efficient"
- Professional, clean, trustworthy
- Tech-forward productivity tool

### Boho Vintage Mode
- Users feel: "This is my personal sanctuary"
- Warm, emotional, comforting
- A friend helping, not a tool demanding

---

## 🌊 ORGANIC SECTION TRANSITIONS (Boho Mode)

**Philosophy:** No straight lines. No harsh dividers. Everything flows like a scrapbook.

### Transition Elements

| Element | Description | Location |
|---------|-------------|----------|
| **Wave SVG** | Soft, animated curved waves | Between all sections |
| **Torn Paper Edge** | Zigzag paper tear effect | Hero → How It Works |
| **Ink Drips** | Dark dripping ink animation | Hero → How It Works |
| **Coffee Spills** | Radial gradient stains | Throughout |
| **Floating Leaves** | 🍂🍁 drifting animations | Between sections |
| **Paint Strokes** | Horizontal brush marks | How It Works → Features |
| **Notebook Corner** | Folded paper corner | How It Works → Features |
| **Tape Strips** | Masking tape pieces | Various |
| **Scattered Dots** | Hand-drawn dot marks | Throughout |
| **Brush Stroke Wide** | Animated wavy line | Features → CTA |
| **Paper Fold** | Triangular fold corner | Features → CTA |
| **Ink Splash** | Splattered ink mark | Features → CTA |
| **Floating Papers** | Paper scraps floating | Features → CTA |
| **Light Leaks** | Warm glowing gradients | Features → CTA |
| **Fabric Edge** | Wavy fabric/thread line | CTA → Footer |
| **Stitch Line** | Dashed sewing stitch | CTA → Footer |

### Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  HERO SECTION                                               │
│  (Tea scene illustration)                                    │
│                                                             │
│  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ (wave 1)              │
│    🍂         ~~~~~~~~~~~~~~~~~~~~~~~ (wave 2)        🍁    │
│  ▲▲▲▲▲▲▲▲▲▲▲▲▲ (torn paper)                                │
│  ╷  ╷ (ink drips)                    ○ (coffee spill)       │
├─────────────────────────────────────────────────────────────┤
│  HOW IT WORKS                                               │
│  (Step cards on layered paper bg)                           │
│                                                             │
│  ════════════════════ (paint stroke)                        │
│  ───────────── (brush stroke)        ┌───┐ (notebook corner)│
│  ░░░░░ (tape strip)    • • • (dots)  │   │                  │
│  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ (wave 3)                  │
├─────────────────────────────────────────────────────────────┤
│  FEATURES                                                   │
│  (Feature cards on sepia bg)         ◦ (coffee stain)       │
│                                                             │
│  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ (wave 4)               │
│  ════════════════════════════════ (brush stroke wide)       │
│  ◥ (paper fold)  💧(ink splash)  📄 📄 (floating papers)    │
│  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ (wave 5)   ☀️(light leak) │
├─────────────────────────────────────────────────────────────┤
│  CTA SECTION                                                │
│  (Warm glowing background)                                  │
│                                                             │
│  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ (wave 6)            │
│  ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿ (fabric edge)                        │
│  - - - - - - - - - - - (stitch line)                       │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                     │
│  (Deep brown, cozy ending)                                  │
└─────────────────────────────────────────────────────────────┘
```

### Section Background Blending

Each section has a gradient that flows into the next:

```css
Hero:      cream → transparent bottom
How Works: cream → aged-paper → cream
Features:  aged-paper → sepia blend → cream  
CTA:       cream → orange tint → sepia
Footer:    dark cocoa brown
```

### Transition Animations

```css
/* Wave floating */
@keyframes waveFloat1/2 { translateX ±20px over 8-10s }

/* Ink drip pulsing */
@keyframes dripFall { scaleY 1 → 1.1 over 4-5s }

/* Leaf drifting */
@keyframes leafDrift { translateY ±10px, rotate ±10deg over 12s }

/* Brush sliding */
@keyframes brushSlide { background-position 0 → 400px over 20s }

/* Light leak pulsing */
@keyframes leakPulse { opacity 0.5→0.8, scale 1→1.1 over 6s }

/* Paper floating */
@keyframes paperFloat { translateY 0 → -10px over 8-10s }
```

---

*This documentation should be updated whenever UI/UX changes are made.*
