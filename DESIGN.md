---
name: AI Agent
description: A calm, sourced internal AI copilot — chat, tools, and proactive Daily News in one place.
colors:
  brand-primary: "#55456e"
  accent-violet: "#9747ff"
  focus-border: "#6e598e"
  secondary-border: "#8d73b6"
  focus-ring: "#d1c4e6"
  focus-ring-strong: "#b080ff"
  brand-subtle: "#f5f2fa"
  text-primary: "#1c1b1f"
  text-secondary: "#62606e"
  text-tertiary: "#61647a"
  border-subtle: "#e8eef4"
  border-neutral: "#e3e4e5"
  border-input: "#d9e3ed"
  error: "#dd524c"
  dark-surface: "#2e2b33"
  dark-surface-deep: "#1f1730"
  dark-elevated: "#3d3845"
  dark-border: "#62606e"
  dark-text-secondary: "#b0b2be"
  dark-accent-text: "#c4a1ff"
typography:
  display:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: "48px"
  headline:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: "32px"
  title:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "24px"
  body:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "24px"
  body-large:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  label:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
  badge:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "10px"
    fontWeight: 700
    lineHeight: "16px"
    letterSpacing: "0.5px"
rounded:
  xs: "2px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  field: "20px"
  xl: "24px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.brand-primary}"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: "6px 16px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.brand-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: "6px 16px"
  chip-purple:
    backgroundColor: "#edecff"
    textColor: "#5e55d1"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  card:
    backgroundColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "0px"
---

# Design System: AI Agent

## Overview

**Creative North Star: "The Calm Copilot"**

AI Agent is a work tool, not a stage — it earns trust by staying out of the way. The system is built almost entirely from pills and soft rectangles (rounded-full buttons and chips, 12–20px-radius cards and fields), a single restrained plum-to-violet accent, and near-total flatness at rest. Depth is reserved for the moments that need it: a popover lifting off the page, a modal claiming focus, a prompt bar responding to hover. Nothing else casts a shadow.

The voice is calm and uncluttered, modern and minimal: generous whitespace, one accent color doing the work of ten, and typography that never shouts. Components feel soft and precise — gently rounded, but every state (hover, focus, error, disabled) is deliberately specified rather than left to browser defaults.

**Key Characteristics:**
- One accent family (Deep Plum → Electric Violet) carries brand weight; everything else is near-neutral.
- Flat by default; shadow is exclusively an overlay/elevation signal, never decoration.
- Pills and soft rectangles everywhere — no sharp corners outside functional exceptions (checkboxes).
- Full parallel dark theme, not a filter: every surface, border, and text color has its own confirmed dark value.

## Colors

The palette is a single plum-violet family stretched from near-black text to a bright violet interaction accent, set against near-white and near-black neutrals. Status and file-type colors are used sparingly and only where they carry real meaning (errors, alerts, file-type recognition).

### Primary
- **Deep Plum** (`#55456e`): the brand color. Primary button fills, primary link/label text (e.g. "New chat", sidebar item labels in light mode), the app's most confident color.
- **Electric Violet** (`#9747ff`): the live-interaction accent. Never a resting fill — appears on hover borders, active/selected states, focus rings' strong variant, and the dark-mode theme-toggle "on" state. If something is violet, the user just did something or is about to.

### Secondary
- **Twilight Plum** (`#6e598e`): focus border for the prompt bar and cards — a calmer cousin of Electric Violet for "this has focus" rather than "this is interactive."
- **Dusty Violet** (`#8d73b6`): secondary-button and icon-button borders — the outline-button color family.
- **Pale Lilac** (`#d1c4e6`) / **Bright Lilac** (`#b080ff`, dark mode): the focus-ring color, always paired with a 3px border and used identically across checkboxes, radios, menu items, and inputs.

### Neutral
- **Near Black** (`#1c1b1f`): primary text in light mode; doubles as the app shell's dark-mode background (coincidental overlap, not a shared token — treat them as separate roles that happen to share a value).
- **Slate Plum** (`#62606e`): secondary text — the most-used color in the system after the accent family; subtitles, meta text, descriptions.
- **Steel Slate** (`#61647a`): input placeholder and tertiary text — reserved for "not yet filled in" content.
- **Whisper Lavender** (`#f5f2fa`): the universal hover/selected tint for rows, cards, and buttons in light mode.
- **Mist Blue** (`#e8eef4`) / **Fog Grey** (`#e3e4e5`) / **Powder Blue** (`#d9e3ed`): the light-mode border family, from subtlest to firmest — pick by how much a boundary needs to announce itself.

### Dark Mode (parallel neutral set, not a filter)
- **Charcoal Plum** (`#2e2b33`): the dark-mode surface color for inputs, cards, and the sidebar panel itself.
- **Midnight Plum** (`#1f1730`): a second, slightly deeper dark surface used for secondary elevation (focused/selected card states, modal background).
- **Dark Lavender Haze** (`#3d3845`): the elevated-popover surface in dark mode (search dropdown, add-menu) — deliberately lighter than the base surfaces so overlays read as lifted, per the Elevated-Surface Rule below.
- **Dusty Lilac Grey** (`#b0b2be`): dark-mode secondary/placeholder text and disabled states.
- **Soft Violet** (`#c4a1ff`): dark-mode accent text — the dark equivalent of Deep Plum for labels and links.

### Status
- **Alert Red** (`#dd524c`): the only error color in the system — invalid fields, error alerts, error file chips. Never reused for anything else.
- Success / Info / Warning follow the same soft-tint-background + saturated-border-and-text pattern as Error (see Alert component), each with its own light and dark pairing.

### Named Rules
**The One-Accent Rule.** Deep Plum and Electric Violet are the only saturated colors allowed to lead a component. Every other hue in the system (chip colors, status colors, file-type colors) is a small, contained accent — never a page-level color.

## Typography

**Body & Display Font:** Open Sans (with sans-serif fallback) — the only typeface in the system, weighted 400/600/700.

**Character:** A single humanist sans carries the whole hierarchy; personality comes from weight and size jumps, not typeface switching.

### Hierarchy
- **Display** (600, 32px, 48px line-height): page-level greetings and titles — "Welcome, Anastasiia!", "Daily news".
- **Headline** (600, 24px, 32px line-height): the first line of an AI chat response.
- **Title** (600, 16–20px, 24px line-height): section headers, modal titles, chat subheadings.
- **Body** (400, 14px, 24px line-height): the default for almost everything — descriptions, list items, form values.
- **Body Large** (400, 16px, 24px line-height): prompt-bar input text and suggestion-chip labels — reserved for primary input surfaces.
- **Label** (400, 12px, 16px line-height): captions, chip text, helper text.
- **Badge** (700, 10px, 16px line-height, 0.5px tracking, uppercase): pagination numbers and source-chip indices — the only place the system uses letter-spaced uppercase type.

### Named Rules
**The Two-Weight Rule.** Only 400 (regular) and 600 (semibold) appear in running UI; 700 (bold) is reserved for the badge scale and a handful of emphasis spans in AI response bullet lists.

## Layout

Flex-first, not grid-first: nearly every screen is a `flex` column or row rather than a CSS grid (the Daily News card list is the one deliberate `grid-cols-2`). Content columns are fixed-width and centered (728px chat/prompt column, 1180px Daily News list, 520px modal) rather than fluid, which keeps line lengths and card proportions consistent regardless of viewport. The sidebar is a fixed 206px content width (76px collapsed) that never reflows with the rest of the page. Spacing follows a tight 4px-based rhythm at the component level (`gap-1`/`gap-2` dominate) opening up to 16–24px between major sections.

## Elevation & Depth

Flat by default; shadow is used exclusively as an overlay/state signal, never as ambient card decoration. A resting card, button, or panel has zero shadow — its edge is a 1px border instead. Shadow appears only when something is temporarily on top of the page (a popover, dropdown, modal) or actively responding to the pointer (a hovered prompt bar).

### Shadow Vocabulary
- **Overlay — light** (`0px 8px 24px 0px rgba(0,0,0,0.08)`): the add-menu popover.
- **Overlay — dark** (`0px 8px 24px 0px rgba(0,0,0,0.4)`): the same popovers/dropdowns in dark mode — deliberately heavier since it must read against a dark page.
- **Dropdown** (`0px 2px 10px 0px rgba(85,69,110,0.09)`): the sidebar search-results dropdown.
- **Modal** (`0px 18px 24px rgba(0,0,0,0.15)`): the Create Feed dialog — the heaviest shadow in the system, matching its focus-stealing role.
- **Hover lift** (`0px 2px 5px rgba(85,69,110,0.09)`): the prompt bar's hovered/focused border glow.
- **Ambient card** (`0px 4px 24px 0px rgba(85,69,110,0.03)`): the one near-imperceptible exception, used only on the (currently unused) TemplateCard.

### Named Rules
**The Flat-By-Default Rule.** If a component is part of the page's resting layout, it has no shadow. Shadow is reserved for things the user did not put there themselves (popovers, modals) or things responding live to the cursor (hover).
**The Elevated-Surface Rule.** Dark-mode overlays use a lighter surface color (`#3d3845`) than the page around them (`#1c1b1f`/`#2e2b33`), paired with a visible border and the heavier dark shadow — the lightness jump reads as "lifted" even though contrast against the page is intentionally modest, not WCAG-literal.

## Shapes

Two shape families cover the entire system. **Pills** (`rounded-full`, 9999px): every button, tag, chip, tab, and avatar. **Soft rectangles** (12–20px radius): every card, panel, input field, modal, and popover — the prompt bar's 20px field radius is the single largest corner radius in the system, marking it as the primary interaction surface. The one deliberate exception is form controls that need to read as precise rather than soft: checkboxes use a near-sharp 2px radius, and radio buttons are true circles (not pills) to match their native semantics. Borders are hairline (1px) everywhere except the focus state, which steps up to 3px specifically so focus is unmistakable at a glance.

## Components

### Buttons
- **Shape:** fully rounded (`rounded-full`/`rounded-2xl`, effectively pill-shaped at the button's height).
- **Primary:** Deep Plum fill, white text, 16px horizontal / 6px vertical padding. In dark mode the fill shifts to Electric Violet — the one place the accent becomes a resting fill, because a primary action needs to read as active even at rest.
- **Secondary:** transparent fill, Dusty Violet 1px border, Deep Plum text (Soft Violet border/text in dark mode).
- **Ghost:** no border or fill, text-only in the secondary-text color — used for tertiary actions like "Explore all".
- **Hover / Focus:** secondary and outline buttons swap their border to Electric Violet on hover; a 3px Pale Lilac ring on focus, always additive to (not replacing) the resting border.

### Chips / Tags
- **Style:** soft-tint background with saturated matching text, 8px radius, no border. Six colors (purple, light blue, mint, grey/pearl, orchid) rotate for topical tagging (schedule badges, category tags) — never for status.
- **Source chips:** a distinct pill variant (fully rounded, with a small circular numbered badge) used only for AI-response citations, with its own default/hover/active state set independent of the tag palette.
- **File-type chip:** the one place color carries external meaning rather than brand meaning — a folded-document glyph tinted to match the real file format (PDF red-orange `#dc3e15`, Word blue `#2b579a`, Excel green `#217346`, PowerPoint orange `#d24726`, images in brand violet, everything else neutral grey) with a 3-letter label baked in.

### Cards / Containers
- **Corner Style:** 12px radius (`rounded-xl`), consistently.
- **Background:** white at rest / Charcoal Plum in dark mode; Whisper Lavender / Midnight Plum on hover or selected.
- **Shadow Strategy:** none at rest (see Elevation & Depth) — differentiation is entirely border color/width plus background tint.
- **Border:** 1px Fog Grey at rest, thickening to 3px Pale Lilac when focused.
- **Internal Padding:** 16px, with a 16px gap between the image/content block and the footer.

### Inputs / Fields
- **Style:** 1px Powder Blue border, white/Charcoal-Plum fill, fully rounded (`rounded-3xl`) for single-line fields; 12–20px radius for multi-line (textarea) and the prompt bar.
- **Focus:** border shifts to Twilight Plum (prompt bar) or a visible Electric-Violet-to-Pale-Lilac ring (form fields); never a glow without a border change.
- **Placeholder:** always Steel Slate, distinct from filled-value text (Near Black / white).
- **Error / Disabled:** error swaps the border to Alert Red with a matching soft-red background; disabled drops opacity/lightens text to Dusty Lilac Grey rather than graying the whole control.

### Navigation
- **Sidebar:** fixed-width panel, Brand Tint background in light mode / Charcoal Plum in dark mode, entirely built from the same pill-row "menu item" primitive (icon + label, `rounded-xl`, Whisper-Lavender hover). Active/selected state adds a 1px Pale-Lilac-family border plus the hover tint, rather than a distinct highlight color. Collapses to a 76px icon-only rail that preserves every affordance at reduced scale.
- **Tabs:** pill-shaped, selected state fills Deep Plum with white text; unselected is a bordered white pill; disabled is flat grey.

### Prompt Bar (signature component)
The system's primary interaction surface and its most elaborate component: a single field that morphs through eight states (default → hovered → focused-empty → focused-typing → filled → multiline → with-attachment → drag-over) without ever changing shape, only border color, shadow, and internal content. It owns the system's largest corner radius (20px) and is the only place a dashed border appears (drag-and-drop state). Attachments render as inline file-type chips above the text area rather than a separate list.

## Do's and Don'ts

### Do:
- **Do** keep every resting surface flat (no shadow) and reserve shadow for overlays and hover.
- **Do** use Deep Plum / Electric Violet as the only saturated, page-level accent; everything else stays a contained, small-area color (chips, status, file-type badges).
- **Do** default to pill or 12–20px-radius shapes; use the near-sharp 2px radius only for checkboxes.
- **Do** give every interactive state (hover, focus, error, disabled) its own confirmed color — never rely on opacity alone to signal disabled.
- **Do** build the dark theme from its own confirmed neutral set (`#1c1b1f`/`#2e2b33`/`#1f1730`/`#3d3845`), not by inverting or filtering the light-mode palette.

### Don't:
- **Don't** add a shadow to a component that's part of the page's resting layout — if it's not a popover, modal, or hover state, it stays flat.
- **Don't** introduce a new saturated hue for a one-off feature; reuse the chip/tag or status palette instead of inventing a color.
- **Don't** use file-type recognition colors (PDF red, Word blue, Excel green, PowerPoint orange) anywhere outside the file-attachment chip — they're a utility signal, not brand color.
- **Don't** sharpen a card, button, or panel corner below the established radius scale; the checkbox exception is deliberate and singular, not a precedent.
