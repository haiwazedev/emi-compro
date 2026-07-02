# Clients UI Implementation Plan

## Source

- Idea: `agent/ideas/clients-ui.md`
- Design references:
  - `agent/resources/clients-ui/clients-desktop.png`
  - `agent/resources/clients-ui/clients-mobile.png`
- Client logo assets:
  - `public/clients/logoklien_accenture.png`
  - `public/clients/logoklien_astraoto.png`
  - `public/clients/logoklien_pama.png`
  - `public/clients/logoklien_plnip.png`
  - `public/clients/logoklien_ritz-carlton.png`
  - `public/clients/logoklien_unitedtrac.png`
  - `public/clients/logoklien_westin.png`

## Goal

Add a polished Clients section below the Services section. The section should pair a left information block with a right two-row logo marquee from the `lg` breakpoint upward, then stack the information above the marquees below `lg`. It should use the existing PLN EMI typography, semantic Tailwind tokens, optimized `next/image` logo rendering, CSS-only infinite marquees, accessible static content for crawlers and assistive technology, and motion behavior that respects user preferences.

## Current Project Context

- App framework: Next.js App Router.
- Styling: Tailwind CSS v4 with CSS variables in `src/app/globals.css`.
- Existing font setup:
  - `Plus_Jakarta_Sans` is configured as `--font-sans`.
  - `Instrument_Serif` is configured as `--font-instrument-serif`.
  - `font-display` already maps to `Instrument Serif`.
- Existing page order:
  - `src/app/page.tsx` currently renders `<Navbar />`, `<HomeHero />`, `<StatsSection />`, `<AboutUsSection />`, `<ServicesSection />`, then `faq` and `contact` placeholders.
  - The Clients section should be inserted after `<ServicesSection />` and before the remaining placeholders.
- Existing shadcn setup:
  - `Badge`, `Button`, `Carousel`, `Sheet`, and `HoverCard` already exist.
  - This section should use shadcn `Badge` for the total clients badge if the styling remains simple.
- Existing icon library:
  - `lucide-react` and `lucide-react/dynamic` are available.
  - No icon is required for this section; the badge dot should be a small semantic span.
- Existing logo assets:
  - Client logo files are transparent PNGs with very different aspect ratios.
  - The implementation should render each logo inside a fixed-size card and use `object-contain` so tall and wide logos remain visually balanced.

## Requirements Checklist

- Clients section renders below the Services section.
- Section uses `id="clients"` for future navigation support.
- UI is divided into two main areas:
  - `information`.
  - `logos-marquee`.
- Information area contains:
  - Section head label: `Our Network`.
  - Section title: `Our Clients`.
  - Title uses `Instrument Serif`.
  - Title is split into two colors.
  - `Clients` word is italic.
  - Small description copy.
  - Total clients badge with a green dot.
- Logos marquee area contains:
  - Two marquee rows stacked vertically.
  - Logo cards use client logo images from `public/clients`.
  - Top marquee moves left infinitely.
  - Bottom marquee moves right infinitely.
  - Logo cards use a soft card UI style.
  - Hovering a logo card pauses the relevant marquee row.
  - Hovering a logo card raises the card slightly.
  - Hovering a logo card adds or increases shadow.
  - Hovering a logo card changes background color.
- Tiny `and many more...` label appears at bottom right below the marquee area.
- Mobile layout uses the reference direction below the `lg` breakpoint:
  - Information block first.
  - Badge below description.
  - Marquees below the information block.
  - Horizontal overflow is hidden by the section, not by the page.
- Desktop layout starts at the `lg` breakpoint.
- Motion respects `prefers-reduced-motion`.
- Implementation remains SEO-friendly and performance-focused.

## Proposed File Changes

### `src/app/globals.css`

Add semantic Clients tokens in `:root`, then expose them through `@theme inline`.

Suggested variables:

```css
--clients-background: #ffffff;
--clients-foreground: #274c77;
--clients-accent: #6096ba;
--clients-muted: #8498b5;
--clients-card: #f8fafc;
--clients-card-hover: #eef5f9;
--clients-card-shadow: rgb(39 76 119 / 12%);
--clients-badge-background: #e7ecef;
--clients-badge-foreground: #274c77;
--clients-badge-dot: #38b26b;
--clients-fade: #ffffff;
```

Suggested theme aliases:

```css
--color-clients-background: var(--clients-background);
--color-clients-foreground: var(--clients-foreground);
--color-clients-accent: var(--clients-accent);
--color-clients-muted: var(--clients-muted);
--color-clients-card: var(--clients-card);
--color-clients-card-hover: var(--clients-card-hover);
--color-clients-card-shadow: var(--clients-card-shadow);
--color-clients-badge-background: var(--clients-badge-background);
--color-clients-badge-foreground: var(--clients-badge-foreground);
--color-clients-badge-dot: var(--clients-badge-dot);
--color-clients-fade: var(--clients-fade);
```

Add small reusable marquee keyframes and utilities:

```css
@keyframes clients-marquee-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes clients-marquee-right {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}
```

Suggested utilities:

```css
.animate-clients-marquee-left {
  animation: clients-marquee-left 32s linear infinite;
}

.animate-clients-marquee-right {
  animation: clients-marquee-right 34s linear infinite;
}

.clients-marquee-row:hover .clients-marquee-track,
.clients-marquee-row:focus-within .clients-marquee-track {
  animation-play-state: paused;
}
```

Implementation notes:

- Use classes like `bg-clients-background`, `text-clients-foreground`, `text-clients-muted`, and `bg-clients-card` instead of repeated literal colors.
- Keep custom CSS limited to marquee motion and pause behavior.
- Add `motion-reduce` handling in JSX classes and/or CSS so marquees do not animate for reduced-motion users.
- The fade masks at the left and right edge of the marquee can use pseudo-elements in CSS or lightweight absolute elements in JSX with `bg-gradient-to-r` and `from-clients-fade`.

### `src/components/clients-section.tsx`

Create a dedicated server component for the Clients section.

Implementation notes:

- Keep this component server-rendered. CSS marquee animation does not require browser state.
- Use `next/image` for every logo.
- Keep logo metadata in typed local constants.
- Duplicate each row's logo list in JSX to create seamless marquee loops.
- Use different logo order for the second row so the two rows do not look mechanically identical.
- Since there are seven provided logo assets and the reference shows more brands, repeat the available logos across the marquee and preserve the `and many more...` label to communicate broader coverage.
- Use semantic HTML:
  - `<section id="clients" aria-labelledby="clients-heading">`
  - Information block can be a `<div aria-label="Client network information">`.
  - Logo rows can use lists (`ul`/`li`) for the cards.
  - Mark the duplicated copy of marquee items with `aria-hidden="true"` so screen readers do not announce duplicate logos.
- Use accessible image alt text such as `Accenture logo`, `Astra Otoparts logo`, and `PLN Indonesia Power logo`.
- Use `sizes` on images because logos are small and fixed inside cards.
- Do not use `priority` for these images; this section is below the fold.
- Keep visible text real text for SEO.
- Use the shadcn `Badge` for the total clients badge unless it becomes harder than a simple native element.

Suggested data shape:

```ts
type ClientLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  className?: string;
};
```

Suggested logo metadata:

```ts
const clientLogos: ClientLogo[] = [
  {
    name: "Accenture",
    src: "/clients/logoklien_accenture.png",
    width: 1966,
    height: 518,
  },
  {
    name: "Astra Otoparts",
    src: "/clients/logoklien_astraoto.png",
    width: 1956,
    height: 430,
  },
  {
    name: "Pama",
    src: "/clients/logoklien_pama.png",
    width: 780,
    height: 1000,
    className: "max-h-20",
  },
  {
    name: "PLN Indonesia Power",
    src: "/clients/logoklien_plnip.png",
    width: 1966,
    height: 406,
  },
  {
    name: "The Ritz-Carlton",
    src: "/clients/logoklien_ritz-carlton.png",
    width: 2000,
    height: 1400,
    className: "max-h-16",
  },
  {
    name: "United Tractors",
    src: "/clients/logoklien_unitedtrac.png",
    width: 1876,
    height: 347,
  },
  {
    name: "Westin Hotels & Resorts",
    src: "/clients/logoklien_westin.png",
    width: 2000,
    height: 634,
  },
];
```

Suggested component structure:

```tsx
<section id="clients" aria-labelledby="clients-heading">
  <div>
    <div aria-label="Client network information">
      <p>Our Network</p>
      <h2 id="clients-heading">
        <span>Our</span>
        <span>Clients</span>
      </h2>
      <p>
        We are proud to partner with leading organizations across various
        industries, driving energy efficiency and sustainability solutions
        together.
      </p>
      <Badge>
        <span aria-hidden="true" />
        150+ Clients Served
      </Badge>
    </div>

    <div aria-label="Client logos" className="logos-marquee">
      <ClientLogoMarquee direction="left" logos={topRowLogos} />
      <ClientLogoMarquee direction="right" logos={bottomRowLogos} />
      <p>and many more...</p>
    </div>
  </div>
</section>
```

Suggested helper components:

```ts
type ClientLogoMarqueeProps = {
  direction: "left" | "right";
  logos: ClientLogo[];
};
```

Implementation notes for helpers:

- `ClientLogoMarquee` can render one visible list plus one duplicated `aria-hidden` list inside a single flex track.
- `ClientLogoCard` should contain the fixed card surface and the `Image`.
- Keep helper components in the same file unless the section becomes large enough to justify splitting.
- Use `cn` from `@/lib/utils` to compose direction, logo, and motion classes.

### `src/app/page.tsx`

Import and render the Clients section immediately after the Services section.

Implementation notes:

- Add `import { ClientsSection } from "@/components/clients-section"`.
- Render order should be:

```tsx
<Navbar />
<main>
  <HomeHero />
  <StatsSection />
  <AboutUsSection />
  <ServicesSection />
  <ClientsSection />
  other sections
</main>
```

- Keep existing `faq` and `contact` placeholders untouched.
- Do not add navbar links in this implementation unless a future navigation task requests it.

## Visual Layout Plan

### Desktop

- Section:
  - Full-width white band.
  - Use `bg-clients-background`.
  - Use a centered `max-w-7xl` container.
  - Use generous vertical padding, likely `py-20` to `py-28`.
  - Use `overflow-hidden` on the section or marquee wrapper to prevent animated rows from creating page-level horizontal scroll.
- Main layout:
  - Use a two-column grid from the `lg` breakpoint upward.
  - Treat `lg` and larger viewports as desktop.
  - Information column should occupy roughly one third of the width.
  - Marquee column should occupy roughly two thirds of the width.
  - Suggested grid: `lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]`.
  - Align both columns vertically around the top-center of the content.
- Information:
  - Eyebrow uses uppercase text, wide tracking, bold weight, and `text-clients-accent`.
  - Title uses `font-display`.
  - `Our` uses `text-clients-foreground`.
  - `Clients` uses `italic text-clients-accent`.
  - Description uses `text-clients-muted`, a readable `leading-8`, and constrained line length.
  - Badge uses a soft pill background and bold foreground.
  - Badge dot uses `bg-clients-badge-dot`.
- Marquee:
  - Two rows stacked with a gap around `gap-5` to `gap-6`.
  - Use fixed card dimensions around `h-24 w-44` on desktop, tuned during visual QA.
  - Cards use small radius, likely `rounded-lg`, matching the project's restrained card guidance.
  - Cards use `bg-clients-card`, subtle shadow, and `transition`.
  - Hover state uses `-translate-y-1`, stronger shadow, and `bg-clients-card-hover`.
  - Logo images use `object-contain` and internal padding.
  - Add left/right fade masks so logos enter and exit softly, as in the reference.
  - `and many more...` aligns bottom right and uses small italic `text-clients-accent`.

### Mobile

- Breakpoint:
  - Treat every viewport below `lg` as mobile/tablet stacked layout.
  - Do not switch to the desktop two-column layout at `md`.
- Section:
  - Preserve the white background.
  - Use `py-16` to `py-20`.
  - Keep side padding consistent with surrounding sections: `px-6 sm:px-8`.
- Main layout:
  - Stack into a single column.
  - Information appears first.
  - Marquee appears below with generous top spacing, around `mt-14`.
- Information:
  - Eyebrow remains uppercase and tracking-wide.
  - Title size around `text-5xl` if it fits, otherwise `text-4xl`.
  - Description can be larger than desktop reference if needed for readability, around `text-lg leading-8`.
  - Badge stays left-aligned and does not exceed viewport width.
- Marquee:
  - Use card dimensions around `h-24 w-40` or `h-24 w-44`.
  - Let marquee tracks extend beyond the viewport while the wrapper clips overflow.
  - Keep two rows visible.
  - Reduce animation speed only if the mobile reference feels too fast during QA.
  - Keep the `and many more...` label visible below the second row, right-aligned.

## Motion And Interaction Plan

- Use CSS keyframes for the marquee tracks.
- Top row:
  - Uses `animate-clients-marquee-left`.
  - Starts at `translateX(0)` and ends at `translateX(-50%)`.
- Bottom row:
  - Uses `animate-clients-marquee-right`.
  - Starts at `translateX(-50%)` and ends at `translateX(0)`.
- Duplicate row content exactly once so the `-50%` translation loops seamlessly.
- Pause the row on hover and focus-within:
  - `.clients-marquee-row:hover .clients-marquee-track`.
  - `.clients-marquee-row:focus-within .clients-marquee-track`.
- Make cards focusable only if they have an action. Since these logo cards are not links, they should not receive tab focus by default.
- For reduced-motion users:
  - Disable marquee animation with `motion-reduce:animate-none`.
  - Render rows as static horizontally arranged logo cards inside the clipped area.
  - Disable hover translate with `motion-reduce:transform-none`.

## Content Plan

Use the reference description copy:

```txt
We are proud to partner with leading organizations across various industries, driving energy efficiency and sustainability solutions together.
```

Use the badge label:

```txt
150+ Clients Served
```

Use the bottom helper label:

```txt
and many more...
```

Logo names should be human-readable in alt text:

- `Accenture logo`
- `Astra Otoparts logo`
- `Pama logo`
- `PLN Indonesia Power logo`
- `The Ritz-Carlton logo`
- `United Tractors logo`
- `Westin Hotels & Resorts logo`

## Accessibility Plan

- Use a visible `h2` with `id="clients-heading"`.
- Use the section label `aria-labelledby="clients-heading"`.
- Keep the logo content in semantic lists.
- Hide duplicated marquee content from assistive technology with `aria-hidden="true"`.
- Use descriptive image alt text for the first copy of logos.
- Use empty `alt=""` inside duplicated hidden lists if duplicating at the card level is simpler.
- Do not make non-interactive logo cards keyboard-focusable.
- Ensure text contrast remains strong against white and soft card backgrounds.
- Ensure hover-only effects are decorative, not required to understand the section.

## Performance And SEO Plan

- Use `next/image` with explicit `width` and `height` for all client logos.
- Do not use `priority` because the Clients section is below the initial hero.
- Use small rendered logo sizes through CSS while letting `next/image` optimize delivery.
- Keep CSS animations transform-only for compositor-friendly movement.
- Avoid client-side JavaScript for marquee animation.
- Keep all important section text server-rendered in HTML.
- Avoid adding a heavy carousel dependency for this marquee; CSS is sufficient.

## Verification Plan

Run these checks after implementation:

```bash
pnpm lint
pnpm build
```

Manual visual QA:

- Start the dev server with `pnpm dev`.
- Verify desktop layout around `1440px` width:
  - Two-column layout is active at `lg` and larger.
  - Information column and marquee column match the reference proportions.
  - Top row moves left.
  - Bottom row moves right.
  - Logo cards remain visually consistent despite different source aspect ratios.
  - Hovering a card pauses its row and applies the raised card state.
  - `and many more...` sits below the marquee at the bottom right.
- Verify mobile layout around `390px` width:
  - Stacked layout remains active below `lg`, including `md` tablet widths.
  - Information appears above logos.
  - No horizontal page scroll appears.
  - Badge text fits in one line or wraps gracefully without clipping.
  - Both marquee rows remain visible and balanced.
- Verify reduced motion:
  - Simulate `prefers-reduced-motion: reduce`.
  - Marquees stop animating.
  - Content remains readable and visible.
- Verify accessibility:
  - The section has one clear heading.
  - Screen reader output does not repeat duplicate marquee logos.

## Out Of Scope

- Adding a navbar link to `#clients`.
- Adding new client logo assets beyond the existing files.
- Replacing the CSS marquee with JavaScript-controlled drag/swipe behavior.
- Implementing analytics for logo impressions or hover events.
- Changing the Services, FAQ, or Contact sections beyond inserting Clients in the page order.
