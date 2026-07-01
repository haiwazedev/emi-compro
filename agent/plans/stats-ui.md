# Stats UI Implementation Plan

## Source

- Idea: `agent/ideas/stats-ui.md`
- Design references:
  - `agent/resources/stats-ui/stats.png`
  - `agent/resources/stats-ui/stats-mobile.png`

## Goal

Add a polished stats section directly below the hero section. The section should use a clean white band with grid-based metric items, animated count-up numbers, fade-up reveal motion, and a small `*Since 1987` note anchored at the bottom right. The implementation should stay simple, reusable, accessible, performance-focused, and aligned with the existing Next.js, Tailwind CSS v4, shadcn, and font setup.

## Current Project Context

- App framework: Next.js App Router.
- Styling: Tailwind CSS v4 with CSS variables in `src/app/globals.css`.
- Existing font setup:
  - `Plus_Jakarta_Sans` is configured as `--font-sans`.
  - `Instrument_Serif` is configured as `--font-instrument-serif`.
  - `font-display` already maps to `Instrument Serif`.
- Existing page:
  - `src/app/page.tsx` renders `<Navbar />`, then `<HomeHero />`, then placeholder content sections.
  - The stats section should be inserted immediately after `<HomeHero />`.
- Existing shadcn setup:
  - `Button`, `Badge`, `Carousel`, and `Sheet` already exist, but this section likely does not need a shadcn primitive.
- Existing animation utilities:
  - `tw-animate-css` is imported in `src/app/globals.css`.
  - Custom keyframes can be added in `src/app/globals.css` if a reusable animation class is cleaner.

## Requirements Checklist

- Stats section renders below the hero section.
- Stats section uses a grid-based layout.
- Desktop layout shows five metrics in one horizontal row.
- Mobile layout shows a two-column grid with comfortable vertical spacing.
- Each stat item contains:
  - Animated numeric value.
  - Unit/suffix label displayed beside the number, such as `+`, `+ TWh`, or `+ M tCO2e`.
  - Uppercase stat label below the number row.
- Stat number row uses `Instrument Serif`.
- Stat number color is `#274c77`.
- Stat number is visually larger than the stat label.
- Stat label uses `Plus Jakarta Sans`.
- Stat label color is `#6096ba`.
- Stat label is uppercase.
- Stat number animates incrementally when the section enters the viewport.
- Stat number row fades up into view.
- Stat label fades up into view.
- Small `*Since 1987` info label appears at the bottom right of the section.
- Motion respects `prefers-reduced-motion`.
- Implementation remains SEO-friendly and performance-focused.

## Proposed File Changes

### `src/app/globals.css`

Add semantic stats tokens in `:root`, then expose them through `@theme inline`.

Suggested variables:

```css
--stats-background: #ffffff;
--stats-foreground: #274c77;
--stats-muted: #6096ba;
--stats-border: #dbe7ef;
```

Suggested theme aliases:

```css
--color-stats-background: var(--stats-background);
--color-stats-foreground: var(--stats-foreground);
--color-stats-muted: var(--stats-muted);
--color-stats-border: var(--stats-border);
```

Add a small reusable fade-up animation only if `tw-animate-css` utilities are not enough for the desired stagger.

Suggested keyframes:

```css
@keyframes stats-fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Suggested utility:

```css
.animate-stats-fade-up {
  animation: stats-fade-up 700ms ease-out both;
}
```

Implementation notes:

- Prefer classes like `bg-stats-background`, `text-stats-foreground`, `text-stats-muted`, and `border-stats-border` over repeated hex values.
- Keep animation utilities small and specific to this section.
- Do not add broad color names unless they will be reused beyond this section.

### `src/components/stats-section.tsx`

Create a dedicated client component for viewport-triggered count-up animation.

Implementation notes:

- Add `"use client"` because the count-up animation and viewport detection need browser APIs.
- Keep the component self-contained and data-driven.
- Use a local typed constant for metric content.
- Use `IntersectionObserver` to start animation when the section first enters the viewport.
- Start the animation once; do not restart every time the user scrolls away and back.
- Use `requestAnimationFrame` for smooth numeric interpolation.
- Clean up observers and animation frames in effects.
- Respect `prefers-reduced-motion` by rendering final values immediately while still showing content.
- Use semantic HTML:
  - `<section aria-labelledby="stats-heading">`
  - Include a visually hidden heading, such as `PLN EMI impact in numbers`.
  - Use a list (`ul`/`li`) for the stats collection.
- Avoid unnecessary images or heavy dependencies.

Suggested data shape:

```ts
type StatItem = {
  value: number;
  suffix: string;
  label: string;
};
```

Suggested stat data:

```ts
const stats: StatItem[] = [
  {
    value: 20,
    suffix: "+",
    label: "Years Experience",
  },
  {
    value: 350,
    suffix: "+",
    label: "Projects Delivered*",
  },
  {
    value: 18,
    suffix: "+ TWh",
    label: "REC Delivered",
  },
  {
    value: 8,
    suffix: "+ M tCO2e",
    label: "SPE Delivered",
  },
  {
    value: 150,
    suffix: "+",
    label: "Clients Served",
  },
];
```

Suggested component structure:

```tsx
<section id="stats" aria-labelledby="stats-heading">
  <h2 id="stats-heading" className="sr-only">
    PLN EMI impact in numbers
  </h2>

  <div>
    <ul>
      {stats.map((stat) => (
        <li key={stat.label}>
          <p>
            <span>{animatedValue}</span>
            <span>{stat.suffix}</span>
          </p>
          <p>{stat.label}</p>
        </li>
      ))}
    </ul>

    <p>*Since 1987</p>
  </div>
</section>
```

### `src/app/page.tsx`

Import and render the stats section immediately after the hero.

Implementation notes:

- Add `import { StatsSection } from "@/components/stats-section"`.
- Render order should be:

```tsx
<Navbar />
<main>
  <HomeHero />
  <StatsSection />
  other sections
</main>
```

- Keep existing placeholder sections untouched unless spacing needs a small adjustment after the stats band.
- If future nav links should jump to stats, add a `#stats` link in a separate navbar-focused change, not as part of this implementation.

## Visual Layout Plan

### Desktop

- Section:
  - Full-width white band.
  - Thin bottom border matching the reference.
  - Enough vertical padding to breathe, likely `py-10` to `py-12`.
  - Use a centered max-width container.
- Grid:
  - Use `grid-cols-5`.
  - Each stat is centered.
  - Keep consistent column gaps.
- Number row:
  - Use `font-display`.
  - Use `text-stats-foreground`.
  - Use a large size around `text-4xl` to `text-5xl`, tuned to the reference.
  - Use tight line height.
  - Render the numeric value and suffix in the same inline row.
- Stat label:
  - Use `font-sans`.
  - Use `text-stats-muted`.
  - Use uppercase text.
  - Use bold or semibold weight.
  - Use modest size around `text-xs` to `text-sm`.
  - Use comfortable top spacing below the number row.
- Since label:
  - Place inside the same container.
  - Align bottom right with `absolute bottom-3 right-6` or a layout equivalent.
  - Use `text-stats-muted`.
  - Keep it small and unobtrusive.

### Mobile

- Section:
  - Preserve the white band.
  - Increase vertical spacing enough for the taller grid, likely `py-14`.
  - Keep bottom border visible.
- Grid:
  - Use `grid-cols-2`.
  - Use row gaps around `gap-y-9` to match the reference.
  - Five stats means the final item occupies the left column on the third row.
  - Do not force the final item to span both columns unless visual QA shows better balance.
- Number row:
  - Use larger display styling than labels, around `text-5xl` if it fits comfortably.
  - Keep suffix beside the number without wrapping for `8+ M tCO2e`.
- Stat label:
  - Use uppercase.
  - Slightly larger than desktop if the reference requires it, around `text-base`.
  - Use tracking only if it still feels readable; avoid aggressive letter spacing.
- Since label:
  - Anchor bottom right.
  - Ensure it does not overlap the final metric.
  - Add bottom padding to the section if needed.

## Animation Plan

### Count-Up Behavior

- Animate from `0` to the target number when the stats section first enters the viewport.
- Recommended duration: `1200ms` to `1600ms`.
- Use an ease-out function for a natural finish:

```ts
const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);
```

- Round displayed values with `Math.round`.
- Keep suffix text static beside the animated value.
- For `prefers-reduced-motion`, skip the frame loop and render target values immediately.

### Reveal Behavior

- Fade and slide each stat upward when the section enters the viewport.
- Stagger items slightly, around `80ms` per item.
- Animate the number row and stat label together unless separate delays are visually needed.
- The requirement says both number and label fade up, but they do not need independent observers.
- Use `opacity-0 translate-y-4` before reveal and transition to `opacity-100 translate-y-0`.
- Avoid layout shift by keeping the stat items mounted from the first render.

### Accessibility

- Respect reduced motion.
- Ensure final stat values are readable if JavaScript is slow or disabled after hydration.
- Avoid announcing every incremental number change to screen readers.
- Prefer `aria-label` on each stat item with the final value, for example:

```tsx
<li aria-label={`${stat.value}${stat.suffix} ${stat.label}`}>
```

- Mark animated visual number spans as `aria-hidden="true"` if a separate accessible label is provided.

## Implementation Steps

1. Add stats color tokens and optional fade-up animation utilities in `src/app/globals.css`.
2. Create `src/components/stats-section.tsx` with stat data, viewport detection, reduced-motion detection, and count-up rendering.
3. Import and render `<StatsSection />` immediately after `<HomeHero />` in `src/app/page.tsx`.
4. Run `pnpm lint` to catch TypeScript, JSX, and style issues.
5. Run `pnpm build` if feasible to verify the Next.js app compiles.
6. Start the dev server and visually check desktop and mobile layouts.
7. Verify the section appears directly under the hero, the count-up animation runs once, reduced motion behaves correctly, and text does not wrap or overlap.

## Verification Checklist

- `pnpm lint` passes.
- `pnpm build` passes.
- Desktop viewport:
  - Stats are in one row.
  - Number rows use `Instrument Serif`.
  - Labels are uppercase and blue.
  - `*Since 1987` sits bottom right.
- Mobile viewport:
  - Stats are in a two-column grid.
  - The final stat sits cleanly without awkward centering or overlap.
  - `8+ M tCO2e` stays readable and does not collide with neighboring content.
  - Since label remains bottom right and unobtrusive.
- Animation:
  - Numbers increment from zero on first viewport entry.
  - Stat items fade up.
  - Animation does not repeatedly restart on scroll.
  - Reduced motion renders final values without count-up.
- Performance:
  - No new large dependencies are added.
  - Observers and animation frames are cleaned up.
  - No layout shift occurs when numbers animate.

## Open Decisions for Implementation

- Whether to keep the final mobile stat in the left column exactly like the reference or center it across both columns for balance.
- Whether the count-up should begin as soon as any part of the section enters the viewport or after about 30% of the section is visible.
- Whether to format numbers with locale separators if future stats exceed three digits.

## Non-Goals

- Do not modify hero carousel behavior.
- Do not modify navbar links.
- Do not replace placeholder content sections beyond inserting the stats section above them.
- Do not add analytics, API-driven stats, or CMS integration.
- Do not implement this plan until a separate implementation request is made.
