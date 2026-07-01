# Home UI Implementation Plan

## Source

- Idea: `agent/ideas/home-ui.md`
- Design references:
  - `agent/resources/home-ui/home-desktop.png`
  - `agent/resources/home-ui/home-mobile.png`
- Slide assets:
  - `public/slides/slide_1.png`
  - `public/slides/slide_2.png`
  - `public/slides/slide_3.png`
  - `public/slides/slide_4.png`

## Goal

Replace the current placeholder home section with a polished first-viewport hero carousel. The hero should sit at the very top of the page, behind the navbar, with full-bleed slide imagery, static badge and CTA controls, dynamic headline/description content, fade transitions, autoplay, and dot navigation. The navbar should become transparent while the home section is in focus, then return to a solid background when hovered or when the user scrolls away from the home section.

## Current Project Context

- App framework: Next.js App Router.
- Styling: Tailwind CSS v4 with CSS variables in `src/app/globals.css`.
- Existing UI stack: shadcn components and `lucide-react`.
- Preferred shadcn components for this feature:
  - `Carousel`
  - `Badge`
  - `Button`
- Existing navbar:
  - `src/components/navbar.tsx`
  - `src/components/mobile-navbar-sheet.tsx`
  - `src/components/ui/sheet.tsx`
- Required shadcn components to add:
  - `src/components/ui/carousel.tsx`
  - `src/components/ui/badge.tsx`
- Current page:
  - `src/app/page.tsx` renders `<Navbar />` and a placeholder `#home` section.
- Current primary font:
  - `Plus_Jakarta_Sans` is configured in `src/app/layout.tsx`.
- Required display font:
  - Add `Instrument_Serif` for the hero title only.

## Requirements Checklist

- Home section is the first page section and starts at the top of the viewport.
- Navbar visually overlaps the home section.
- Navbar is above the home section content and images.
- Navbar background is transparent when the home section is active.
- Navbar becomes solid again when the navbar area is hovered.
- Navbar remains solid when the user scrolls away from the home section.
- Home section contains a carousel using `public/slides` assets.
- Carousel autoplay is enabled.
- Carousel has no previous or next arrow buttons.
- Carousel has dots below the hero content to jump to a slide.
- Slide changes use smooth fade animation for background image and hero copy.
- Mobile layout keeps the same composition, with responsive text sizing and spacing.
- Hero info badge is static.
- Hero info badge includes a green glowing dot.
- Hero badge text uses `#e5e7eb`.
- Hero title uses `Instrument Serif`.
- Hero title has a dynamic main title and dynamic italic subtitle.
- Hero subtitle uses gradient-colored text.
- Hero description is dynamic.
- Action row is static with two buttons:
  - `Explore Solutions` links to `#services`.
  - `Learn More` links to `#about`.
- Use shadcn `Carousel` for the slide foundation.
- Use shadcn `Badge` for the hero info badge.
- Prefer shadcn `Button` for actions.
- Prefer Tailwind variables over repeated literal colors.
- Keep the implementation SEO-friendly and performance-focused.

## Proposed File Changes

### `src/components/ui/carousel.tsx`

Add the shadcn Carousel component.

Preferred implementation path:

```bash
pnpm dlx shadcn@latest add carousel
```

Implementation notes:

- The shadcn Carousel uses Embla under the hood.
- Do not render `CarouselPrevious` or `CarouselNext`, because the requirement specifically excludes left/right controls.
- Use the Carousel API callback to sync the active dot state.
- Use Embla autoplay through a small effect or plugin-compatible setup, depending on the generated shadcn component API.
- Keep carousel behavior in `HomeHero`; keep the generated UI primitive generic.

### `src/components/ui/badge.tsx`

Add the shadcn Badge component.

Preferred implementation path:

```bash
pnpm dlx shadcn@latest add badge
```

Implementation notes:

- Use `Badge` for the static hero info badge.
- Customize it with semantic hero tokens instead of repeated custom hex strings.
- Keep the green dot as a child element inside the badge so the glow animation is easy to control.

### `src/app/layout.tsx`

Add `Instrument_Serif` from `next/font/google`.

Implementation notes:

- Keep `Plus_Jakarta_Sans` as the main sans font.
- Add a display font variable:

```ts
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});
```

- Add `instrumentSerif.variable` to the `<html>` class list with the existing `plusJakartaSans.variable`.
- Preserve existing metadata unless copy is intentionally updated in a separate SEO pass.

### `src/app/globals.css`

Add semantic home hero tokens in `:root`, then expose them through `@theme inline`.

Suggested variables:

```css
--home-foreground: #ffffff;
--home-muted: #e5e7eb;
--home-badge-dot: #4ade80;
--home-primary-action: #a3cef1;
--home-primary-action-foreground: #274c77;
--home-overlay-start: rgb(15 118 110 / 78%);
--home-overlay-mid: rgb(14 116 144 / 42%);
--home-overlay-end: rgb(2 6 23 / 18%);
--home-subtitle-from: #a3cef1;
--home-subtitle-via: #e0f2fe;
--home-subtitle-to: #fef3c7;
```

Suggested theme aliases:

```css
--color-home-foreground: var(--home-foreground);
--color-home-muted: var(--home-muted);
--color-home-badge-dot: var(--home-badge-dot);
--color-home-primary-action: var(--home-primary-action);
--color-home-primary-action-foreground: var(--home-primary-action-foreground);
--color-home-subtitle-from: var(--home-subtitle-from);
--color-home-subtitle-via: var(--home-subtitle-via);
--color-home-subtitle-to: var(--home-subtitle-to);
--font-instrument-serif: var(--font-instrument-serif);
```

Also add a small reusable animation for the badge dot glow:

```css
@keyframes home-badge-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgb(74 222 128 / 45%);
  }
  50% {
    box-shadow: 0 0 0 8px rgb(74 222 128 / 0%);
  }
}
```

Expose it either as a small CSS class in `@layer utilities` or as an inline Tailwind arbitrary animation only if Tailwind variables cannot express it cleanly.

### `src/components/home-hero.tsx`

Create a dedicated client component for carousel behavior.

Implementation notes:

- Add `"use client"` because autoplay, dot navigation, and animation state require React state/effects.
- Use shadcn `Carousel`, `CarouselContent`, and `CarouselItem` as the slide foundation.
- Use `next/image` for slide images instead of CSS `background-image` so Next can optimize image loading and prevent layout shift.
- Use shadcn `Badge` for the hero info badge.
- Use shadcn `Button` for both CTA links.
- Keep slide content in a local typed constant.
- Use the shadcn Carousel API to move slides for autoplay and clean up any timer/plugin lifecycle in `useEffect`.
- Pause autoplay while the user hovers or focuses within the hero so dot navigation remains comfortable.
- Respect `prefers-reduced-motion` by disabling interval autoplay or extending it significantly.
- Use opacity transitions for both image layers and copy layers.
- Use `aria-live="polite"` for dynamic hero copy.
- Use button dots with `aria-label` and `aria-current`.

Suggested data shape:

```ts
type HomeSlide = {
  image: string;
  imageAlt: string;
  mainTitle: string;
  subtitle: string;
  description: string;
};
```

Suggested initial slide content:

```ts
const slides: HomeSlide[] = [
  {
    image: "/slides/slide_1.png",
    imageAlt: "PLN EMI team member inspecting industrial energy equipment.",
    mainTitle: "Optimizing Power,",
    subtitle: "Empowering The Future",
    description:
      "Energy auditing, performance testing, monitoring systems, ISO certification consulting, and green building solutions for maximum efficiency.",
  },
  {
    image: "/slides/slide_2.png",
    imageAlt: "Industrial facility prepared for environmental and energy assessment.",
    mainTitle: "Legal by Design,",
    subtitle: "Green by Nature",
    description:
      "Comprehensive environmental compliance support, from hazardous waste management to environmental auditing and monitoring reports.",
  },
  {
    image: "/slides/slide_3.png",
    imageAlt: "Sustainable infrastructure and operational environment supported by PLN EMI.",
    mainTitle: "Cleaner Systems,",
    subtitle: "Stronger Operations",
    description:
      "Practical decarbonization and resource efficiency programs that help organizations improve performance with measurable impact.",
  },
  {
    image: "/slides/slide_4.png",
    imageAlt: "Field energy management work supporting sustainable industry in Indonesia.",
    mainTitle: "Measured Impact,",
    subtitle: "Sustainable Growth",
    description:
      "Integrated energy management, circularity, and sustainability consulting for companies building long-term operating resilience.",
  },
];
```

The final copy can be adjusted during implementation if the slide imagery suggests a clearer message, but the component should keep content data-driven.

### `src/components/navbar.tsx`

Update the existing navbar so it can respond to the home section state.

Implementation notes:

- Convert `Navbar` to a client component if Intersection Observer state is handled inside the navbar.
- Track whether `#home` is active with `IntersectionObserver`.
- Treat the navbar as transparent when the home section intersects the top viewport area.
- Use hover state or CSS `hover:` classes so the navbar becomes solid while the navbar itself is hovered.
- Keep the current desktop/mobile structure, logo usage, and nav link data.
- Preserve sticky behavior and z-index.
- Use transition classes for background, text, and shadow changes.

Suggested state logic:

```ts
const [isHomeActive, setIsHomeActive] = useState(true);
```

Observer guidance:

- Observe `document.getElementById("home")`.
- Use a threshold such as `0.45` or a negative bottom `rootMargin` so the transparent state only applies while the hero is meaningfully in view.
- Default to `true` on first render to avoid a solid navbar flash over the first hero frame.

Suggested visual states:

- Home active:
  - `bg-transparent`
  - `shadow-none`
  - desktop links use light text if needed for contrast.
- Home active and navbar hover:
  - `hover:bg-brand-navbar`
  - `hover:shadow-sm`
  - text/logo behavior remains readable.
- Home inactive:
  - `bg-brand-navbar`
  - `shadow-sm`
  - existing brand foreground text.

Logo note:

- The current logo images are colored assets. Confirm they stay readable over all four slides. If not, apply a subtle header gradient or text-shadow-like drop shadow to the header area instead of swapping assets.

### `src/app/page.tsx`

Replace the placeholder `#home` section with the new home hero component.

Implementation notes:

- Import `HomeHero`.
- Keep `<Navbar />` before `<main>`.
- Render `<HomeHero />` as the first child of `<main>`.
- Ensure the hero itself owns `id="home"`.
- Keep existing `about`, `services`, `faq`, and `contact` placeholder sections for nav targets until those sections are implemented.
- Remove placeholder home text that describes the navbar implementation.

Suggested structure:

```tsx
<div className="min-h-screen bg-white text-brand-navbar-foreground">
  <Navbar />
  <main>
    <HomeHero />
    {sections.map(...)}
  </main>
</div>
```

## Component Structure

Recommended `HomeHero` structure:

```tsx
<section id="home" className="relative isolate -mt-20 min-h-svh overflow-hidden">
  <Carousel opts={{ loop: true }}>
    <CarouselContent>
      <CarouselItem>
        background image
        overlay layers
      </CarouselItem>
    </CarouselContent>
  </Carousel>

  <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-6 pt-28 pb-20">
    <Badge>badge content</Badge>
    animated text block
    CTA row
  </div>

  dots
</section>
```

Navbar overlap options:

- Preferred: make the hero start beneath the sticky navbar using `-mt-20` and compensate with `pt-28`.
- Keep the navbar `sticky top-0 z-50`.
- Keep hero content `z-10`; images and overlays stay below it.
- Dots should be `absolute bottom-8 z-20`.

## Desktop UI Plan

- Hero:
  - Full viewport height using `min-h-svh`.
  - Full-bleed imagery with `Image fill`.
  - Use `object-cover`.
  - Add a left-to-right teal/blue overlay to keep text readable.
  - Add a subtle top overlay if navbar/logo contrast needs support.
- Content container:
  - `max-w-7xl`
  - responsive horizontal padding matching the navbar (`px-6 sm:px-8 lg:px-10`)
  - max text width around `max-w-4xl`.
- Badge:
  - inline-flex pill.
  - translucent white border/background.
  - green glowing dot.
  - uppercase text with `text-home-muted`.
- Title:
  - Instrument Serif.
  - large desktop size close to the reference, for example `lg:text-8xl xl:text-9xl`.
  - line height near `leading-[0.95]`.
  - main title in white.
  - subtitle italic with gradient text.
- Description:
  - `max-w-2xl`
  - white or muted white text.
  - readable line height.
- CTAs:
  - static row with `Explore Solutions` and `Learn More`.
  - first button filled with `bg-home-primary-action text-home-primary-action-foreground`.
  - second button transparent/outline with white border and white text.
  - use shadcn `Button` with `asChild`.
- Dots:
  - centered near the bottom.
  - inactive dots small circles.
  - active dot wider pill.
  - no text labels visible, but each button has an accessible label.
  - use custom dot buttons instead of shadcn Carousel previous/next controls.

## Mobile UI Plan

- Keep the same hero hierarchy:
  - navbar overlap
  - badge
  - title
  - description
  - CTA row
  - dots
- Use smaller but still expressive type:
  - title around `text-6xl` on narrow screens if it fits, then scale up at `sm`/`md`.
  - use `text-balance` if supported by Tailwind setup.
- Keep buttons in one row when space allows.
- If width is too tight, allow wrapping without overlap.
- Ensure the mobile title does not collide with the right edge or navbar.
- Move dots lower with enough bottom padding so they do not overlap CTAs.
- Use `min-h-svh` and extra vertical padding to account for mobile browser chrome.

## Carousel Behavior Plan

- State:
  - `activeIndex`
  - optional `isPaused`
  - shadcn Carousel API instance
- Autoplay:
  - default interval around `6000ms`.
  - call the Carousel API `scrollNext()` method.
  - rely on Carousel looping instead of hand-rolled wrap logic.
  - pause while hovered or focused.
- Dot click:
  - call the Carousel API `scrollTo(index)` method.
  - reset the autoplay timer after manual navigation.
- Fade animation:
  - prefer Embla fade-compatible behavior if available in the installed shadcn/Embla setup.
  - otherwise keep Carousel movement for state and render active background/copy layers with opacity transitions.
  - duration around `700ms`.
- Reduced motion:
  - use `window.matchMedia("(prefers-reduced-motion: reduce)")`.
  - disable autoplay and avoid translate movement; opacity changes can be shortened or removed.

## Accessibility Plan

- Hero section:
  - `id="home"`.
  - `aria-label="PLN EMI home hero"`.
- Background images:
  - If images are decorative, use empty alt text.
  - If each slide image communicates context, provide meaningful alt text.
  - Preferred here: meaningful alt text because slide imagery supports the message.
- Dynamic content:
  - Wrap dynamic title/description in `aria-live="polite"` with reasonable update frequency.
- Dots:
  - Use real `<button>` elements.
  - Add `aria-label="Show slide X: {mainTitle} {subtitle}"`.
  - Add `aria-current={active ? "true" : undefined}`.
- CTAs:
  - Use clear anchor text.
  - `Explore Solutions` goes to `#services`.
  - `Learn More` goes to `#about`.
- Keyboard:
  - Dot buttons are naturally keyboard accessible.
  - No hidden arrow controls are needed.
- Motion:
  - Respect reduced-motion preference.

## SEO And Performance Plan

- Use real text in the hero, not image-rendered text.
- Keep the page `h1` inside the hero.
- Use exactly one `h1` for the page.
- Use `next/image` for slide assets.
- Mark the first slide image as `priority`.
- Use `sizes="100vw"` for full-viewport images.
- Keep all image dimensions stable through `fill` plus a fixed hero container.
- Avoid layout shift by defining hero height before images load.
- Keep carousel data local and static so no client-side fetching is needed.
- Prefer the shadcn Carousel component over a custom carousel implementation.
- Do not add arrow icons or unused controls.

## Implementation Sequence

1. Add shadcn `carousel` and `badge` components.
2. Add Instrument Serif font configuration in `src/app/layout.tsx`.
3. Add hero color/font tokens and badge pulse utility in `src/app/globals.css`.
4. Create `src/components/home-hero.tsx` with typed slide data, shadcn Carousel structure, shadcn Badge, CTA row, custom dots, autoplay, pause, and reduced-motion handling.
5. Update `src/components/navbar.tsx` for transparent-on-home behavior and solid-on-hover behavior.
6. Replace the placeholder home section in `src/app/page.tsx` with `<HomeHero />`.
7. Run lint and fix any TypeScript or ESLint issues.
8. Run the dev server and visually verify desktop and mobile responsive states.

## Verification Checklist

- `pnpm lint` passes.
- Home hero appears at the top of the page.
- Navbar overlaps the hero and is visible above it.
- Navbar is transparent while the hero is active.
- Navbar becomes solid on hover.
- Navbar becomes solid after scrolling past the hero.
- All four slide images render.
- Carousel autoplays.
- Dot navigation jumps to the selected slide.
- No previous/next buttons appear.
- Fade transitions are smooth.
- Hero title uses Instrument Serif.
- Subtitle is italic and gradient-colored.
- Badge includes a green glowing dot and muted light text.
- CTA links point to `#services` and `#about`.
- Mobile layout matches the same hierarchy without text overlap.
- The mobile navbar sheet still opens, closes, and remains readable over the hero.

## Risks And Mitigations

- Navbar contrast over bright slide areas:
  - Add a subtle top overlay in the hero or a hover/focus solid state for the navbar.
- Hydration mismatch from `matchMedia`:
  - Read reduced-motion preference only inside `useEffect`.
- Autoplay interval leaks:
  - Always return cleanup from the interval effect.
- Text overflow on mobile:
  - Use responsive font sizes, constrained max width, and wrapping CTA row.
- Loading all slides too early:
  - Prioritize only the first image. Lazy load the remaining images unless smoothness requires preloading the next slide.

## Out Of Scope

- Implementing the actual home UI in this planning step.
- Replacing navbar logo assets.
- Building the full About, Services, FAQ, or Contact sections.
- Adding carousel libraries beyond shadcn Carousel and its required Embla dependency.
- Changing business copy outside the hero slide content unless requested.
