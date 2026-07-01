# About Us UI Implementation Plan

## Source

- Idea: `agent/ideas/about-us-ui.md`
- Design references:
  - `agent/resources/about-us-ui/about-us-desktop.png`
  - `agent/resources/about-us-ui/about-us-mobile.png`
- Picture asset:
  - `public/about_us.png`

## Goal

Add a polished About Us section directly below the stats section. The section should use a clean two-column desktop layout with written company information on the left and the provided sustainability solutions image on the right. On mobile, the image should move above the information column. The implementation should be simple, accessible, SEO-friendly, performance-focused, and aligned with the existing Next.js App Router, Tailwind CSS v4 tokens, shadcn components, and established typography.

## Current Project Context

- App framework: Next.js App Router.
- Styling: Tailwind CSS v4 with CSS variables in `src/app/globals.css`.
- Existing font setup:
  - `Plus_Jakarta_Sans` is configured as `--font-sans`.
  - `Instrument_Serif` is configured as `--font-instrument-serif`.
  - `font-display` already maps to `Instrument Serif`.
- Existing page:
  - `src/app/page.tsx` renders `<Navbar />`, `<HomeHero />`, `<StatsSection />`, then placeholder content sections.
  - The current `sections` array includes a placeholder `about` section that should be replaced by the real About Us component.
- Existing shadcn setup:
  - `Badge`, `Button`, `Carousel`, and `Sheet` already exist.
  - This feature should use shadcn `Badge` for the badge pills.
- Existing icon library:
  - `lucide-react` is available and should be used for badge icons.
- Existing asset:
  - `public/about_us.png` is a 1355 x 1024 PNG and should be rendered with `next/image`.

## Requirements Checklist

- About Us section renders below the stats section.
- Section uses `id="about"` so the existing navbar and hero CTA links continue to work.
- Desktop layout has two main columns:
  - Information column on the left.
  - Picture column on the right.
- Information column contains:
  - Top `ABOUT US` label in uppercase.
  - Title text using `Instrument Serif`.
  - Title color `#274c77`.
  - Subtitle text using `Instrument Serif`.
  - Subtitle color `#6096ba`.
  - Subtitle is italic.
  - Description copy.
  - Badge list with icon and label.
- Mobile layout stacks into one column.
- Mobile layout places the picture above the information column.
- Use the existing `public/about_us.png` image.
- Use `next/image` with explicit sizing and responsive `sizes`.
- Prefer semantic Tailwind tokens over repeated literal colors.
- Prefer shadcn components where useful.
- Keep implementation SEO-friendly and performance-focused.

## Proposed File Changes

### `src/app/globals.css`

Add semantic About Us tokens in `:root`, then expose them through `@theme inline`.

Suggested variables:

```css
--about-background: #ffffff;
--about-foreground: #274c77;
--about-muted: #6f86aa;
--about-accent: #6096ba;
--about-badge-background: #eef3f7;
--about-badge-foreground: #274c77;
--about-badge-green: #38b26b;
--about-badge-blue: #6096ba;
--about-badge-yellow: #f59e0b;
--about-image-shadow: rgb(39 76 119 / 10%);
```

Suggested theme aliases:

```css
--color-about-background: var(--about-background);
--color-about-foreground: var(--about-foreground);
--color-about-muted: var(--about-muted);
--color-about-accent: var(--about-accent);
--color-about-badge-background: var(--about-badge-background);
--color-about-badge-foreground: var(--about-badge-foreground);
--color-about-badge-green: var(--about-badge-green);
--color-about-badge-blue: var(--about-badge-blue);
--color-about-badge-yellow: var(--about-badge-yellow);
--color-about-image-shadow: var(--about-image-shadow);
```

Implementation notes:

- Use classes like `bg-about-background`, `text-about-foreground`, `text-about-muted`, and `text-about-accent` instead of repeating hex values.
- Add only the tokens needed for this section.
- Avoid adding broad brand tokens unless multiple sections will share them later.
- No custom animation is required unless visual QA shows the section needs reveal motion.

### `src/components/about-us-section.tsx`

Create a dedicated server component for the About Us section.

Implementation notes:

- Keep this component server-rendered. There is no required browser state or effect.
- Use `next/image` for `public/about_us.png`.
- Use shadcn `Badge` for the badge list.
- Use lucide icons for badge icons.
- Keep content and badges in small typed constants so the JSX stays readable.
- Use semantic HTML:
  - `<section id="about" aria-labelledby="about-heading">`
  - `h2` for the visible section title.
  - Paragraphs for body copy.
  - `ul`/`li` for the badge list.
- Use `font-display` for the title and subtitle.
- Use `font-sans` for eyebrow, body copy, and badges.
- Keep text widths constrained for readability.

Suggested data shape:

```ts
type AboutBadge = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconClassName: string;
};
```

Suggested badge content:

```ts
const badges: AboutBadge[] = [
  {
    label: "Sustainability",
    icon: Leaf,
    iconClassName: "text-about-badge-green",
  },
  {
    label: "Compliance",
    icon: ShieldCheck,
    iconClassName: "text-about-badge-blue",
  },
  {
    label: "Energy Efficiency",
    icon: Zap,
    iconClassName: "text-about-badge-yellow",
  },
  {
    label: "Climate Action",
    icon: Globe2,
    iconClassName: "text-about-badge-blue",
  },
];
```

Suggested text content:

```ts
const aboutContent = {
  eyebrow: "About Us",
  title: "Decades of Expertise in",
  subtitle: "Sustainable Energy",
  description: [
    "Since 1987, PT Energy Management Indonesia (EMI) has supported national energy efficiency programs. As part of PLN Group since 2021, we manage Green Instruments and Carbon Economic Value across the group.",
    "We deliver practical solutions, from Sustainability Consulting, Energy Audits, and we can even help your company cut emissions through Renewable Energy Certificates (REC) and Greenhouse Gas Emission Reduction Certificates (SPE-GRK).",
  ],
  closing:
    "Let's move toward a cleaner, more sustainable future together!",
};
```

Suggested component structure:

```tsx
<section id="about" aria-labelledby="about-heading">
  <div>
    <div>
      <Image
        alt="PLN EMI sustainability solutions including decarbonization, compliance, energy conservation, waste circularity, and consulting."
        src="/about_us.png"
      />
    </div>

    <div>
      <p>ABOUT US</p>
      <h2 id="about-heading">
        <span>Decades of Expertise in</span>
        <span>Sustainable Energy</span>
      </h2>
      body copy
      badge list
    </div>
  </div>
</section>
```

The JSX order can place the picture first and use responsive CSS ordering, or place the information first and use responsive `order-*` classes. Prefer the clearest structure that preserves correct reading order; for accessibility, information-first DOM order with `order-first lg:order-none` on the image is recommended if visual QA remains correct.

### `src/app/page.tsx`

Import and render the About Us section immediately after the stats section.

Implementation notes:

- Add `import { AboutUsSection } from "@/components/about-us-section"`.
- Render order should be:

```tsx
<Navbar />
<main>
  <HomeHero />
  <StatsSection />
  <AboutUsSection />
  other sections
</main>
```

- Remove the current placeholder `about` object from the `sections` array to avoid duplicate `id="about"` values.
- Keep `services`, `faq`, and `contact` placeholders untouched unless a future feature replaces them.
- Verify `#about` navigation still lands comfortably below the sticky navbar. Add or tune `scroll-mt-20` on the About Us section if needed.

## Visual Layout Plan

### Desktop

- Section:
  - Full-width white band.
  - Use `bg-about-background`.
  - Use a centered `max-w-7xl` container.
  - Use generous vertical padding, likely `py-20` to `py-24`.
- Grid:
  - Use two columns from `lg` upward.
  - Left information column should be slightly narrower or equal width depending on image balance.
  - Suggested layout: `grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]`.
  - Use a wide column gap, likely `gap-14` to `gap-20`.
  - Align columns to the center vertically.
- Eyebrow:
  - Uppercase `ABOUT US`.
  - Use `text-about-accent`.
  - Use bold weight and moderate letter spacing.
  - Keep it small, around `text-sm`.
- Title:
  - Use `font-display`.
  - Use `text-about-foreground`.
  - Size around `text-4xl` to `text-5xl`.
  - Use tight but readable line height.
  - Render the subtitle as its own line.
- Subtitle:
  - Use `font-display italic`.
  - Use `text-about-accent`.
  - Keep it visually connected to the title.
- Description:
  - Use `text-about-muted`.
  - Size around `text-base`.
  - Line height around `leading-8`.
  - Bold only the company name using a semantic inline element such as `<strong>`.
- Closing sentence:
  - Use `text-about-foreground`.
  - Use semibold or bold weight.
  - Place after the body paragraphs with clear spacing.
- Badges:
  - Use a wrapping flex row.
  - Use shadcn `Badge`.
  - Use rounded-full pill styling.
  - Use `bg-about-badge-background text-about-badge-foreground`.
  - Keep icon size around `size-3.5` to `size-4`.
  - Use `gap-2` between icon and label.
- Picture:
  - Use `next/image`.
  - Keep the image visually close to the reference size.
  - Use a stable wrapper with `relative`, `aspect-[1355/1024]`, and `w-full`.
  - Add subtle shadow only if it improves separation from the white background; the image already contains its own bordered panel.

### Mobile

- Section:
  - Use comfortable horizontal padding, likely `px-6`.
  - Use top/bottom padding around `py-14` to `py-16`.
- Layout:
  - Stack into one column.
  - Picture appears first visually.
  - Information appears below picture.
  - Use `gap-12` to keep the image and text from feeling cramped.
- Picture:
  - Use full available width.
  - Preserve image aspect ratio.
  - Avoid cropping the image because the text inside the asset needs to remain readable.
- Eyebrow:
  - Keep uppercase with wide letter spacing.
  - Use size around `text-sm` to `text-base`.
- Title:
  - Use responsive size around `text-5xl` on larger phones only if it fits.
  - Start near `text-4xl` for narrow screens.
  - Ensure the subtitle wraps naturally without clipping.
- Description:
  - Increase readability with `leading-8`.
  - Keep paragraph spacing comfortable.
- Badges:
  - Wrap naturally.
  - Keep each pill compact.
  - Do not force all badges onto one row.

## Accessibility Plan

- Use one visible `h2` with `id="about-heading"` and connect the section with `aria-labelledby`.
- Use meaningful image alt text that summarizes the panel content without repeating every visual detail.
- Use a list for badges so assistive technology treats them as a related set.
- Icons inside badges should be decorative with `aria-hidden="true"` because the text label carries the meaning.
- Keep color contrast strong:
  - `#274c77` on white for headings.
  - `#6096ba` or muted copy colors should be checked during visual QA.
- Avoid motion unless a later implementation intentionally adds a reduced-motion-friendly reveal.

## Performance Plan

- Keep the component server-rendered to avoid unnecessary client JavaScript.
- Use `next/image` with explicit `width`, `height`, `sizes`, and a stable aspect-ratio wrapper to prevent layout shift.
- Do not use `priority` for `about_us.png` because it appears below the hero and stats sections.
- Use `loading="lazy"` by default through `next/image`.
- Keep icons imported individually from `lucide-react`.
- Avoid extra dependencies.

## Implementation Steps

1. Add About Us semantic color tokens to `src/app/globals.css`.
2. Create `src/components/about-us-section.tsx` as a server component.
3. Add typed content constants for copy and badges.
4. Render the responsive section structure with image, heading, body copy, closing sentence, and badge list.
5. Update `src/app/page.tsx` to render `<AboutUsSection />` after `<StatsSection />`.
6. Remove the placeholder `about` entry from the `sections` array to avoid duplicate anchors.
7. Run lint and build checks.
8. Verify desktop and mobile layouts against the reference screenshots.

## Validation Checklist

- `pnpm lint` passes.
- `pnpm build` passes.
- Desktop visual check:
  - About section appears below stats.
  - Information is on the left and image is on the right.
  - Heading, subtitle, body copy, and badges match the reference hierarchy.
- Mobile visual check:
  - Image appears above information.
  - No text overlaps or clips.
  - The `about_us.png` panel remains readable.
  - Badges wrap cleanly.
- Navigation check:
  - `#about` anchors to the real About Us section.
  - No duplicate `id="about"` exists.
- Accessibility check:
  - Section has a proper heading.
  - Image has useful alt text.
  - Badge icons are decorative.

## Open Implementation Notes

- The copy in the design reference appears to have a few capitalization inconsistencies, such as "We can". During implementation, use polished sentence case unless exact visual copy is required.
- The design image already contains solution labels inside `about_us.png`; do not recreate those labels in HTML unless the asset changes.
- If visual QA shows the `#6096ba` subtitle or body text is too low contrast at small sizes, keep the required subtitle color but use a darker token for body copy.
