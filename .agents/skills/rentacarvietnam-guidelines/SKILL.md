---
name: rentacarvietnam-guidelines
description: Mandatory frontend styling, UI design, and markup rules for the rentacarvietnam project. Activate whenever creating, modifying, or styling any web page or component in this repository.
---

# Rent A Car Vietnam — Mandatory Frontend Guidelines

This skill enforces strict frontend rules for the **Hanoi Car & Bus Rental / Rent a Car Vietnam** web application:

## 1. CSS Source of Truth: ONLY Use CSS in `src/styles/`
- All styling must strictly come from the 5-layer CSS architecture inside `src/styles/`:
  - `tokens.css`: Design tokens, colors, typography scale, spacing, shadows.
  - `global.css`: Reset, layout containers (`.p-container`), base elements.
  - `components.css`: Buttons (`.p-btn`), Cards (`.p-card`), Badges (`.p-badge`), Accordions, Form controls.
  - `pricing-engine.css`: Pricing calculation cards & layout.
  - `utilities.css`: Layout helpers (flex, grid, spacing).
- Do NOT add ad-hoc CSS libraries, Tailwind, or arbitrary style blocks.

## 2. STRICTLY NO TABLES (`<table>`)
- Never use `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>`, `<th>` for presentation or pricing.
- All pricing, vehicle specifications, routes, and comparison data MUST use:
  - Stacked Cards (`.p-card`)
  - Pill Chips & Badges (`.p-badge`)
  - Stepper / Timelines
  - Collapsible Accordions for FAQs / Details

## 3. NO HARDCODED CSS
- Never write inline styles `style="..."`.
- Never hardcode raw hex colors (e.g. `#123456`) or pixel values inside components.
- Always reference tokens via CSS variables `var(--...)` or use predefined utility classes (`.p-text-center`, `.p-flex-col`, etc.).

## 4. NO ICONS
- Do not import or inject FontAwesome icon fonts, messy SVGs, or emoji clutter into the UI.
- Use clear typography, proper contrast, descriptive text labels, and clean badges instead.

## 5. NO RANDOM / ARBITRARY COLORS
- Strictly adhere to the brand palette defined in `tokens.css`:
  - Primary: `var(--color-primary)` (#0098da) & `var(--color-primary-dark)`
  - Navy & Dark: `var(--color-navy)` (#0f172a) & `var(--color-navy-dark)`
  - Accent / Gold: `var(--color-accent)` (#eab308)
  - Status: `var(--color-success)`, `var(--color-danger)`, `var(--color-caution)`
  - Neutrals: `var(--color-bg)` (#f8fafc), `var(--color-border)`, `var(--color-text-muted)`
- Never invent random pinks, purples, or uncalibrated hues.
