# Rent A Car Vietnam — Workspace Rules & Guidelines

All agents working in this repository MUST strictly follow these rules:

1. **Only Use CSS from `src/styles/`**:
   - `tokens.css`, `global.css`, `components.css`, `pricing-engine.css`, `utilities.css`.
   - Do NOT install or use Tailwind CSS. Do NOT add external CSS frameworks.
2. **Strictly NO HTML Tables (`<table>`)**:
   - Modern OTA standard only: Card stacks, chips/badges, visual timelines, and accordions.
3. **No Hardcoded CSS**:
   - No inline `style="..."`.
   - No hardcoded hex color codes or px sizes in components. Everything must reference `var(--...)` or predefined classes.
4. **No Icons**:
   - No FontAwesome, no SVG icon libraries, no emoji clutter. Use clean typography, badges, and clear text labels.
5. **No Arbitrary Colors**:
   - Only use the tokens defined in `tokens.css`: Primary Blue, Dark Navy, Accent Gold, Status colors, and Slate Neutrals.
6. **English-First**:
   - Initial multi-language deployment starts with English (`en`) as the primary locale.
7. **Cloudflare Stack**:
   - Astro SSG for Static Pages on Cloudflare Pages.
   - Cloudflare D1 for car rental pricing & booking inquiries.
