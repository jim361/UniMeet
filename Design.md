# UniMeet Design System
> Version 1.0 — Derived from GPT Image2 visual outputs and adapted from Meta design.md structure.  
> 색상은 인포그래픽 결과물(옵션 1·2)에서 추출한 실측 값 기준.

---

## Overview

UniMeet's visual language is anchored in **academic authority + global warmth**. The system uses a deep Navy Blue foundation that communicates institutional trust, activated by a Gold accent that signals inclusion and connection. The dual-palette (Navy / Gold) is non-negotiable — it is the brand's most recognizable signature and must appear in every rendered surface.

The design mode is **clean informational**: generous white canvas, flat-vector iconography, and typography that leans slightly humanist to offset the formality of the navy. On marketing/presentation surfaces (PowerPoint slides, infographics) the palette shifts toward fuller saturation; inside the app UI mockups it softens slightly with white cards and subdued fills.

**Key Characteristics:**
- Deep navy ({colors.navy-deep}) as the primary brand surface, gold ({colors.gold}) as the activation accent
- Flat, circular icon containers — no shadow, no border, just a filled circle as the icon background
- White canvas ({colors.canvas}) for content sections; navy fill for hero/header zones
- Pill-shaped chips for language tags, badges, and status indicators
- Illustrated characters drawn in a friendly, slightly anime-influenced 2D style (for marketing infographics only)
- App UI uses card-based layout with rounded rectangles and a clean bottom navigation bar

---

## Colors

> Extracted from the two GPT Image2 outputs. Each token is anchored to a specific visual role observed in the images.

### Brand & Accent

| Token | Hex | Description |
|---|---|---|
| `{colors.navy-deep}` | `#1A2E5A` | Darkest navy — used in primary button fills, header zones, and icon circle backgrounds. Observed in the app's top bar and icon rings. |
| `{colors.navy}` | `#1E3A7B` | Standard brand navy — the dominant fill for large graphic elements, badge backgrounds, and feature icon containers. |
| `{colors.navy-mid}` | `#2D4A8A` | Mid-weight navy — used in secondary icon circles and hover/active states. |
| `{colors.gold}` | `#D4A017` | Primary gold accent — headlines ("UniMeet" wordmark second syllable), icon highlights, decorative dots, connector lines. |
| `{colors.gold-light}` | `#F0C040` | Lighter gold — used for glow halos behind circular icons and warm background tints in illustration zones. |
| `{colors.gold-pale}` | `#FBF0C8` | Very pale gold — background wash behind the central phone mockup (the warm cream halo). |

### Surface

| Token | Hex | Description |
|---|---|---|
| `{colors.canvas}` | `#FFFFFF` | Page background and primary card surface. |
| `{colors.surface-soft}` | `#F5F7FA` | Light gray — used behind content sections and inside app list items. |
| `{colors.surface-warm}` | `#FDF6E8` | Warm off-white — the infographic background tint that prevents a cold, clinical feel. |
| `{colors.border}` | `#E2E8F0` | Card and input borders. |
| `{colors.border-soft}` | `#EEF2F7` | Quieter dividers, section separators. |

### Text

| Token | Hex | Description |
|---|---|---|
| `{colors.ink-deep}` | `#1A2E5A` | Primary headline text — matches navy-deep. |
| `{colors.ink}` | `#2D3748` | Standard body text. |
| `{colors.ink-muted}` | `#718096` | Supporting copy, captions, meta text. |
| `{colors.on-navy}` | `#FFFFFF` | Text on navy backgrounds (buttons, headers, icon labels). |
| `{colors.on-gold}` | `#1A2E5A` | Text on gold backgrounds — navy-deep for maximum contrast. |

### Semantic

| Token | Hex | Description |
|---|---|---|
| `{colors.success}` | `#38A169` | "Verified", "Approved", "In club" affirmations. |
| `{colors.attention}` | `#D69E2E` | Mid-priority notices — uses a muted gold tone to stay on-brand. |
| `{colors.critical}` | `#E53E3E` | Validation errors, rejection notices. |
| `{colors.info}` | `#3182CE` | Informational callouts (distinct from navy — used for language chips). |

### Language Flag Accent Colors
> These are used only for country flag chips in the multilingual feed — not as general-purpose colors.

| Token | Use |
|---|---|
| `{colors.flag-kr}` | Korean flag chip background |
| `{colors.flag-cn}` | Chinese flag chip background |
| `{colors.flag-es}` | Spanish flag chip background |
| `{colors.flag-ar}` | Arabic flag chip background |

---

## Typography

### Font Family

**Primary Display:** `Pretendard` (Korean + Latin) — a humanist sans-serif with strong Korean glyph support. Fallbacks: `Apple SD Gothic Neo`, `Noto Sans KR`, `sans-serif`.

**Secondary / Latin Emphasis:** `DM Sans` — used for English-only labels, app UI text, and numeric values. Fallbacks: `Helvetica Neue`, `Arial`.

> Note: The GPT Image2 outputs use what appears to be a custom bold Korean typeface with slight geometric character for the hero headline ("하나의 캠퍼스, 다양한 목소리"). Pretendard Bold or Noto Sans KR Black are the closest system equivalents.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.hero}` | 52px | 800 | 1.15 | -0.5px | Slide hero headline ("하나의 캠퍼스, 다양한 목소리.") |
| `{typography.display}` | 36px | 700 | 1.20 | -0.3px | Section-opener headlines ("모두의 캠퍼스를 하나로 연결하다") |
| `{typography.heading-lg}` | 28px | 700 | 1.28 | -0.2px | Feature section titles |
| `{typography.heading-md}` | 22px | 600 | 1.30 | -0.1px | Card titles, icon feature labels ("언어 장벽 제거", "신뢰 기반 커뮤니티") |
| `{typography.heading-sm}` | 18px | 600 | 1.35 | 0 | Sub-feature labels, form section headers |
| `{typography.body-lg}` | 16px | 400 | 1.60 | 0 | Primary body copy (infographic supporting text) |
| `{typography.body-md}` | 14px | 400 | 1.57 | 0 | Standard body, list items, descriptions |
| `{typography.body-sm}` | 13px | 400 | 1.54 | 0 | Secondary body, helper text, app list item subtitles |
| `{typography.caption}` | 12px | 400 | 1.40 | 0.1px | Timestamps, fine print |
| `{typography.caption-bold}` | 12px | 700 | 1.40 | 0.1px | Badge labels, chip text, notification counts |
| `{typography.button}` | 14px | 700 | 1.43 | -0.1px | Button labels |
| `{typography.label}` | 13px | 600 | 1.40 | 0.2px | Nav tab labels ("Home", "Explore", "Chats", "Profile") |

### Brand Wordmark Typography
The UniMeet logotype uses a two-color split:
- **"Uni"** → `{colors.navy-deep}`, weight 800
- **"Meet"** → `{colors.gold}`, weight 800
This is a locked brand treatment — never split differently or use a single color.

### Principles
- Korean body copy always uses Pretendard — never mix Korean glyphs into DM Sans.
- Heading weight steps: 800 (hero) → 700 (display/heading-lg) → 600 (heading-md/sm) → 400 (body). Do not skip levels.
- Negative letter-spacing applies only to headings (`-0.1px` to `-0.5px`); body copy uses 0 or slightly positive.
- On navy backgrounds, all text is `{colors.on-navy}` (#FFFFFF). No gray variants on dark surfaces.

---

## Layout

### Spacing System
Base unit: 4px with 8px as the primary step.

| Token | Value | Use |
|---|---|---|
| `{spacing.xxs}` | 4px | Tight internal gaps (icon to label) |
| `{spacing.xs}` | 8px | Chip internal padding, small gaps |
| `{spacing.sm}` | 12px | Card internal padding (compact) |
| `{spacing.md}` | 16px | Standard element gap, list item padding |
| `{spacing.lg}` | 20px | Section sub-spacing |
| `{spacing.xl}` | 24px | Card internal padding (standard) |
| `{spacing.xxl}` | 32px | Between cards / feature rows |
| `{spacing.xxxl}` | 48px | Between major sections |
| `{spacing.section}` | 64px | Section vertical rhythm (slide/infographic) |
| `{spacing.hero}` | 96px | Hero zone vertical padding |

### Grid & Container
- **Infographic / Slide:** Single-surface layout at 1920×1080 (16:9). No grid columns — uses radial/hub-and-spoke composition with the phone mockup at center.
- **App UI:** Mobile-first, single-column. Max content width 390px (iPhone 14 Pro reference). Bottom nav bar fixed at 83px (safe area inclusive).
- **Feature icon row:** 5-column horizontal on infographic slides; 2-column grid in app feature sections.

### Composition Principles
The infographic layouts use a **hub-and-spoke** pattern:
- Central element: smartphone mockup (the product)
- Radiating elements: circular icon badges (the values/features)
- Connector style: dashed gold lines with directional arrows
- Background: white or warm-off-white canvas; navy is reserved for the phone frame and icon circles

---

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Tags, fine UI corners |
| `{rounded.sm}` | 8px | Input fields, small cards |
| `{rounded.md}` | 12px | App list items, standard cards |
| `{rounded.lg}` | 16px | Feature cards, modal sheets |
| `{rounded.xl}` | 20px | Phone mockup frame inner radius |
| `{rounded.xxl}` | 28px | Hero showcase cards, large feature panels |
| `{rounded.full}` | 9999px | Pills (language chips, badges, buttons), circular icon backgrounds |
| `{rounded.circle}` | 50% | Icon container circles, avatar images |

### Signature Shape — Circular Icon Badge
The most distinctive shape in the UniMeet system. Specifications:
- Container: circle (`{rounded.circle}`), diameter 88–120px on infographics / 56–72px in app
- Fill: `{colors.navy}` or `{colors.navy-deep}`
- Icon: white, 40–56% of container diameter
- Optional: thin gold ring outline (`2px solid {colors.gold}`) for "active" or "primary" feature emphasis
- No shadow, no border-radius softening — the circle is always a perfect circle

---

## Elevation & Depth

The system runs flat on marketing surfaces. Depth is created through **color layering** (navy on white) rather than shadows.

| Level | Treatment | Use |
|---|---|---|
| 0 (flat) | No shadow; `{rounded.md}` + `{colors.border}` border | App list items, standard cards |
| 1 (subtle) | `rgba(0,0,0,0.06) 0px 2px 8px` | App card hover / selected state |
| 2 (panel) | `rgba(0,0,0,0.12) 0px 4px 16px` | Modal bottom sheet, app overlay panels |

### Illustrative Depth (Infographic Only)
- Gold halo: `radial-gradient(circle, {colors.gold-pale} 0%, transparent 70%)` behind the center phone mockup
- Dashed connector lines in `{colors.gold}` at 50% opacity, 2px stroke, 6px dash / 4px gap
- Speech bubble overlaps create layering — bubbles float above characters, overlapping each other slightly

---

## Components

### Buttons

**`button-primary`** — Navy pill CTA ("동아리 신청하기", "지원서 제출")
- Background `{colors.navy}`, text `{colors.on-navy}`, typography `{typography.button}`, padding `12px 28px`, rounded `{rounded.full}`
- Pressed: background `{colors.navy-deep}`

**`button-gold`** — Gold accent CTA for onboarding and hero CTAs
- Background `{colors.gold}`, text `{colors.on-gold}`, typography `{typography.button}`, padding `12px 28px`, rounded `{rounded.full}`
- Pressed: background `{colors.gold-light}`

**`button-ghost`** — Outlined secondary CTA
- Background transparent, text `{colors.navy}`, border `2px solid {colors.navy}`, typography `{typography.button}`, padding `10px 26px`, rounded `{rounded.full}`

**`button-icon-circle`** — 44×44px circular icon button (notification bell, back arrow)
- Background `{colors.surface-soft}`, icon `{colors.navy}`, rounded `{rounded.circle}`

### Cards & Containers

**`card-feature`** — White feature card (icon + headline + body)
- Background `{colors.canvas}`, rounded `{rounded.lg}`, padding `{spacing.xl}`, border `1px solid {colors.border}`
- Icon circle sits top-center or top-left, 56px diameter, navy fill

**`card-list-item`** — App list row (club entry, event entry)
- Background `{colors.canvas}`, rounded `{rounded.md}`, padding `{spacing.md}`, border `1px solid {colors.border-soft}`
- Left: 48px square thumbnail with `{rounded.sm}`; Right: chevron icon in `{colors.ink-muted}`

**`card-language-banner`** — Top-of-screen language selector strip
- Background `{colors.surface-soft}`, rounded `{rounded.full}`, padding `{spacing.xs} {spacing.md}`
- Contains globe icon + language name chips separated by dots

**`card-infographic-panel`** — Large informational panel on slide infographics
- Background `{colors.navy}`, text `{colors.on-navy}`, rounded `{rounded.lg}`, padding `{spacing.xl}`

### Chips & Badges

**`chip-language`** — Language tag chips in the multilingual feed
- Background: flag color (see `{colors.flag-*}` tokens) or `{colors.surface-soft}`
- Contains: flag emoji + language name, typography `{typography.caption-bold}`, rounded `{rounded.full}`, padding `4px 10px`

**`chip-category`** — Club category tag ("문화", "스포츠", "학술")
- Background `{colors.navy}` at 10% opacity tint, text `{colors.navy}`, rounded `{rounded.full}`, padding `4px 10px`, typography `{typography.caption-bold}`

**`badge-verified`** — Student verified indicator
- Background `{colors.success}`, text white, rounded `{rounded.full}`, padding `4px 8px`, typography `{typography.caption-bold}`
- Icon: checkmark shield (matches the verified badge in Option 2 right panel)

**`badge-count`** — Notification count dot
- Background `{colors.gold}`, text `{colors.on-gold}`, 20px circle, typography `{typography.caption-bold}`

### Speech Bubbles (Infographic Only)

**`bubble-speech`** — Floating multilingual conversation bubble
- Rounded `{rounded.lg}`, background white, border `1px solid {colors.border}`, padding `{spacing.sm} {spacing.md}`
- Tail: small triangle pointer toward speaker
- Contains: flag emoji + text in native script + English translation in parentheses
- Color variants: white (standard), light-gold (for "UniMeet system" bubbles)

### Navigation

**`nav-bottom`** — App bottom navigation bar
- Background `{colors.canvas}`, top border `1px solid {colors.border-soft}`, height 56px + safe-area padding
- 5 tabs: Home, Explore, [+FAB], Chats, Profile
- Active tab: icon + label in `{colors.navy}`, weight 700
- Inactive tab: icon + label in `{colors.ink-muted}`, weight 400

**`nav-fab`** — Floating action button centered in bottom nav
- 52px circle, background `{colors.navy}`, icon white (`+`), shadow level 2
- This is the primary creation entry point

**`nav-top`** — App top navigation
- Background `{colors.canvas}`, bottom border `1px solid {colors.border-soft}`, height 52px
- Left: UniMeet wordmark (two-color); Right: bell icon (`button-icon-circle`)

### Infographic-Specific Components

**`hub-phone-mockup`** — Central smartphone device frame
- Standard iPhone-style frame, navy or dark charcoal bezel
- Screen content shows the app UI at reduced scale
- Always positioned at horizontal center of the composition

**`spoke-icon-badge`** — Radiating feature icons around the hub
- `{rounded.circle}` container, `{colors.navy}` fill, white icon inside
- Connected to hub by dashed gold line
- Label below the circle in `{typography.heading-md}` navy text + body description in `{typography.body-sm}` muted

**`connector-line`** — Dashed gold connection line
- Stroke: `{colors.gold}`, width 2px, dash: 6px, gap: 4px
- Arrowhead at the hub end: small filled triangle in gold
- Opacity 70% to avoid competing with icon content

---

## Do's and Don'ts

### Do
- Always pair navy and gold together. A navy-only or gold-only surface loses the brand identity.
- Use `{rounded.circle}` for every icon container — never square icon boxes.
- Keep the UniMeet wordmark two-tone: "Uni" in navy, "Meet" in gold. Never monochrome.
- Use the hub-and-spoke layout for any overview/feature infographic.
- Keep speech bubbles in the infographic layer light (white/cream) — heavy colored bubbles compete with the icon badges.
- Use Pretendard for all Korean text — critical for glyph quality and brand consistency.

### Don't
- Don't use purple, teal, or any color outside the navy/gold/white system as a primary surface color.
- Don't use square buttons — pill shape (`{rounded.full}`) is mandatory for all CTAs.
- Don't apply heavy drop shadows to marketing/infographic elements — the system is intentionally flat.
- Don't use gold as a background fill for large surfaces — it is an accent only.
- Don't break the wordmark split — "UniMeet" is never all-navy or all-gold.
- Don't add decorative gradients on the phone mockup screen — keep the app UI flat and readable at small scale.

---

## Responsive Behavior (App)

| Breakpoint | Width | Key Changes |
|---|---|---|
| Mobile S | < 375px | All card padding compressed to `{spacing.sm}`; hero text drops to `{typography.display}` |
| Mobile M (reference) | 375–430px | Standard layout as designed |
| Tablet | 768px+ | Two-column feature grid; side navigation replaces bottom bar |

---

## Infographic Layout Templates

### Template A — Overview (옵션 1 기반)
- Canvas: 1920×1080, background `{colors.surface-warm}`
- Top: headline in `{typography.hero}`, subheadline in `{typography.body-lg}`
- Center: `hub-phone-mockup` at ~380px height
- Radiating: 3× `spoke-icon-badge` (left, right, below)
- Bottom: 5-column `spoke-icon-badge` row with smaller icons for secondary features
- Connector: `connector-line` from each badge to phone

### Template B — User Connection (옵션 2 기반)
- Canvas: 1920×1080, background `{colors.canvas}`
- Left: domestic student illustration + feature copy
- Center: `hub-phone-mockup` with gold halo
- Right: 2× `spoke-icon-badge` stacked vertically
- Language chips floating around the phone

---

## Iteration Guide

1. Always check the wordmark treatment first — it anchors brand consistency across all surfaces.
2. When adding new feature icons, use white icon on `{colors.navy}` circle — do not introduce new icon background colors.
3. The gold connector lines are for infographics only — never use dashed lines in the app UI.
4. Run the navy/gold ratio check: gold should cover ≤20% of any given surface. If gold dominates, it loses its accent function.
5. For slide infographics, keep the phone mockup at 35–45% of canvas height. Smaller loses legibility; larger unbalances the spoke layout.
6. Typography scale is fixed — do not introduce intermediate sizes. Use the nearest defined token.

---

## Known Gaps

- Dark mode tokens are not defined. If a dark mode variant is needed, invert canvas/navy roles: `{colors.navy-deep}` as background, `{colors.canvas}` as text, `{colors.gold}` unchanged.
- Animation/transition timings for app micro-interactions: recommend 200ms ease-out for standard transitions, 300ms spring for bottom sheet reveals.
- Illustration character style guide (the friendly 2D student figures) is not tokenized — treat as photographic/illustrative content, not a system component.
- The specific flag color values for `{colors.flag-*}` tokens are not formalized — use standard ISO country flag colors per region.
