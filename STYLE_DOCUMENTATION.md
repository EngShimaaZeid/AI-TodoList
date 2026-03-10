# Hayati UI Style Documentation

This document serves as the source of truth for the visual styles of the Hayati application. Use this guide to restore or maintain the UI consistency if conflicts occur.

## 1. Modern Style (Default)
**Concept:** Clean, professional, efficient, "Material Design" aesthetic.

### Technical Specs
*   **Theme Key:** `isBoho = false`
*   **Typography:**
    *   Headings & Body: `"Roboto", "Helvetica", "Arial", sans-serif`
*   **Color Palette:**
    *   **Primary:** Indigo 500 (`#3F51B5`)
    *   **Secondary:** Pink A400 (`#F50057`)
    *   **Background:** White (`#FFFFFF`)
    *   **Text:** Dark Grey (`#212121`, `#757575`)
    *   **Accents:** Cyan Gradients (`linear-gradient(135deg, #26BFF0 0%, #4DCBF3 100%)`)

### Component Styling Rules
*   **Cards/Paper:**
    *   Background: White.
    *   Border Radius: `16px` (Rounded).
    *   Shadows: Soft, elevated shadows (`elevation={1}`).
    *   Hover Effects: Slight lift (`translateY(-8px)`), cyan gradient border/glow.
*   **Icons:** Standard Emojis or Material UI Icons.
*   **Layout:** Grid-based, straight lines, symmetrical.

---

## 2. Boho Style (Vintage/Scrapbook)
**Concept:** Warm, organic, nostalgic, "Digital Scrapbook" aesthetic.

### Technical Specs
*   **Theme Key:** `isBoho = true`
*   **Typography:**
    *   Headings: `"Caveat", cursive` (Handwritten style).
    *   Body: `"Quicksand", sans-serif` (Rounded, soft).
*   **Color Palette:**
    *   **Primary (Lagoon):** `#243533` (Dark Green/Teal).
    *   **Secondary (Crimson Blaze):** `#964734` (Rust/Terracotta).
    *   **Background (Cream Paper):** `#F0EFE7` (Warm Beige).
    *   **Accents:**
        *   Amber/Gold: `#B78953`
        *   Moss Green: `#4C563F`
*   **Textures:**
    *   Background Image: `url('https://www.transparenttextures.com/patterns/cream-paper.png')`

### Component Styling Rules (Critical for Restoration)

#### Global Elements
*   **Backgrounds:** Must use the cream paper texture overlay.
*   **Transitions:** SVG Wave dividers between sections (often with `fill="#F0EFE7"`).

#### "How It Works" Section (`HowItWorks.jsx`)
*   **Cards:**
    *   **Rotation:** Cards must be slightly rotated to look like scattered photos.
        *   Formula: `rotate(${(index % 2 === 0 ? -1 : 1) * (Math.random() + 0.5)}deg)`
    *   **Tape Effect:** A small `Box` positioned absolutely at the top center (`top: -10`) to simulate washi tape holding the card.
    *   **Border:** Thin, subtle (`1px solid rgba(0,0,0,0.08)`).
    *   **Radius:** Small (`4px`), almost square.
*   **Icons:** Custom SVG components (`BohoJournalIcon`, `BohoCompassIcon`, etc.) drawn with stroke widths and specific palette colors.

#### "Features" Section (`Features.jsx`)
*   **Cards:**
    *   **Border:** Dashed line (`2px dashed rgba(183, 137, 83, 0.3)`).
    *   **Background:** Semi-transparent cream (`rgba(240, 239, 231, 0.5)`).
    *   **Tape Effect:** Similar to "How It Works", positioned at `top: -12`.
*   **Icons:** `BohoIcons` object containing specific SVGs (Brain, Chart, Flower, etc.) using the Rust/Gold palette.

#### Hero Section (`Hero.jsx`)
*   **Visuals:**
    *   Floating "dust" particles (animated `Box` elements).
    *   Radial gradient overlay for warmth.
    *   Main Text: Rotated slightly (`-2deg`) to feel hand-placed.

### Restoration Checklist
If the Boho style breaks:
1.  Ensure `isBoho` prop is being passed correctly from `App.jsx`.
2.  Check that `theme.js` has the `bohoTheme` definition.
3.  Verify that `HowItWorks.jsx` and `Features.jsx` have the **Tape Decoration** code block (absolute positioned Box).
4.  Verify that the **Custom SVG Icons** are present in the component files (not just emojis).
