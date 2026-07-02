# Footer UI Implementation Plan

## Source

- Idea: `agent/ideas/footer-ui.md`
- Design references:
  - `agent/resources/footer-ui/footer-desktop.png`
  - `agent/resources/footer-ui/footer-mobile.png`

## Goal

Add a polished footer section at the bottom of the landing page. The footer should use the required `#1a3352` background, present the company name with a compact logo mark, show the company address, and include the copyright label. The implementation should stay simple, accessible, SEO-friendly, performance-focused, and consistent with the existing Next.js App Router, Tailwind CSS v4 token setup, shadcn conventions, and section-level component structure already used across the landing page.

## Current Project Context

- App framework: Next.js App Router.
- Styling: Tailwind CSS v4 with CSS variables in `src/app/globals.css`.
- Existing fonts:
  - `Plus_Jakarta_Sans` is configured as `--font-sans`.
  - `Instrument_Serif` is configured as `--font-instrument-serif`, but the footer reference reads as sans-serif UI text.
- Existing icon library:
  - `lucide-react` is available.
  - Use a lightweight Lucide icon such as `Zap` for the footer logo mark rather than adding a new dependency.
- Existing page order in `src/app/page.tsx`:
  - `<Navbar />`
  - `<HomeHero />`
  - `<StatsSection />`
  - `<AboutUsSection />`
  - `<ServicesSection />`
  - `<ClientsSection />`
  - `<FaqSection />`
  - `<ContactUsSection />`
- The footer should render after `<ContactUsSection />`.
- Existing semantic color tokens are section-specific and exposed through `@theme inline`; follow that pattern for footer tokens.

## Requirements Checklist

- Footer uses `#1a3352` as the background color.
- Footer contains exactly the three required content groups:
  - Company name with logo.
  - Company address.
  - Copyright label.
- Company name text:
  - `PT Energy Management Indonesia`
- Address text:
  - `Menara Sentraya. Lt 17. Jl. Iskandarsyah Raya No.1A, RT.3/RW.1, Jakarta Selatan`
  - `DKI Jakarta, 12160`
- Copyright text:
  - `© 2026 PLN EMI. All rights reserved.`
- Desktop layout follows the reference:
  - Full-width horizontal footer.
  - Three content groups aligned in one row.
  - Company group aligned left.
  - Address centered.
  - Copyright aligned right.
- Mobile layout follows the reference:
  - Content stacks vertically.
  - All content is centered.
  - Logo and company name remain grouped together.
  - Address wraps cleanly over two lines.
- Use semantic Tailwind variables rather than repeated arbitrary values.
- Use real text in the DOM for SEO and accessibility.
- Avoid layout shift by using stable spacing and icon dimensions.
- Do not add client-side JavaScript; this can be a server component.
- Keep the footer compact and quiet so it supports the Contact section rather than competing with it.

## Proposed File Changes

### `src/app/globals.css`

Add footer-specific semantic tokens in `:root`, near the existing section tokens.

Suggested variables:

```css
--footer-background: #1a3352;
--footer-foreground: rgb(231 236 239 / 72%);
--footer-foreground-strong: rgb(231 236 239 / 86%);
--footer-logo-background: rgb(163 206 241 / 20%);
--footer-logo-foreground: #a3cef1;
```

Expose the variables through `@theme inline`.

Suggested theme aliases:

```css
--color-footer-background: var(--footer-background);
--color-footer-foreground: var(--footer-foreground);
--color-footer-foreground-strong: var(--footer-foreground-strong);
--color-footer-logo-background: var(--footer-logo-background);
--color-footer-logo-foreground: var(--footer-logo-foreground);
```

Implementation notes:

- The required `#1a3352` should live in `--footer-background`.
- Use `bg-footer-background`, `text-footer-foreground`, and `text-footer-foreground-strong` in JSX.
- Keep opacity and color choices close to the reference, where the footer text is intentionally muted against the dark blue background.
- Do not reuse Contact tokens for the footer, even though the base background color is the same. Separate tokens keep future section styling changes isolated.

### `src/components/footer.tsx`

Create a dedicated server component for the footer.

Implementation notes:

- Use semantic HTML:
  - `<footer aria-label="Site footer">`
  - `<address>` for the physical address.
- Keep the component server-rendered. No client state or effects are needed.
- Use `Zap` from `lucide-react` for the small logo mark shown in the reference.
- Use a stable logo tile size:
  - Mobile: around `size-16`.
  - Desktop: around `size-11` or `size-12`.
- Mark the decorative icon as hidden from assistive technology with `aria-hidden="true"`.
- Keep the company name as visible text next to the logo mark.
- Use `not-italic` on `<address>` so it matches the UI reference.
- Use responsive layout classes rather than custom CSS:
  - Mobile-first stacked layout.
  - `lg:grid` with three columns for desktop alignment.
- Keep the footer inside a centered `max-w-7xl` container with the same horizontal padding rhythm as other sections: `px-6 sm:px-8 lg:px-10`.

Suggested constants:

```ts
const companyName = "PT Energy Management Indonesia";
const addressLines = [
  "Menara Sentraya. Lt 17. Jl. Iskandarsyah Raya No.1A, RT.3/RW.1, Jakarta Selatan",
  "DKI Jakarta, 12160",
];
const copyright = "© 2026 PLN EMI. All rights reserved.";
```

Suggested component structure:

```tsx
import { Zap } from "lucide-react";

const companyName = "PT Energy Management Indonesia";
const addressLines = [
  "Menara Sentraya. Lt 17. Jl. Iskandarsyah Raya No.1A, RT.3/RW.1, Jakarta Selatan",
  "DKI Jakarta, 12160",
];
const copyright = "© 2026 PLN EMI. All rights reserved.";

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="bg-footer-background px-6 py-16 text-footer-foreground sm:px-8 lg:px-10 lg:py-12"
    >
      <div className="mx-auto grid max-w-7xl gap-8 text-center lg:grid-cols-[1fr_1.4fr_1fr] lg:items-center lg:gap-10 lg:text-left">
        <div className="flex flex-col items-center gap-5 lg:flex-row lg:justify-start lg:gap-4">
          <span
            aria-hidden="true"
            className="grid size-16 shrink-0 place-items-center rounded-2xl bg-footer-logo-background text-footer-logo-foreground lg:size-12 lg:rounded-xl"
          >
            <Zap
              className="size-8 lg:size-6"
              fill="currentColor"
              strokeWidth={2}
            />
          </span>
          <p className="text-xl font-bold tracking-tight text-footer-foreground-strong lg:text-base">
            {companyName}
          </p>
        </div>

        <address className="not-italic leading-7">
          {addressLines.map((line) => (
            <span className="block" key={line}>
              {line}
            </span>
          ))}
        </address>

        <p className="lg:text-right">{copyright}</p>
      </div>
    </footer>
  );
}
```

### `src/app/page.tsx`

Import and render the footer after the Contact section.

Implementation notes:

- Add `import { Footer } from "@/components/footer";`.
- Render order should be:

```tsx
<Navbar />
<main>
  <HomeHero />
  <StatsSection />
  <AboutUsSection />
  <ServicesSection />
  <ClientsSection />
  <FaqSection />
  <ContactUsSection />
</main>
<Footer />
```

- Keep `<Footer />` outside `<main>` because it is site-level landmark content, not primary page content.
- Do not add an `id` unless the product later needs direct footer navigation.

## Visual Layout Plan

### Desktop

- Footer height should be compact, close to the reference.
- Use `lg:py-12` to create breathing room without making the footer oversized.
- Inner container:
  - `max-w-7xl`
  - Three-column grid.
  - Company column uses `justify-start`.
  - Address column uses centered text.
  - Copyright column uses right-aligned text.
- Text style:
  - Muted blue-gray on top of `#1a3352`.
  - Company name slightly stronger than address and copyright.
  - Sans-serif, medium-to-bold weight.
- Logo mark:
  - Small rounded square.
  - Subtle lighter blue background.
  - Light blue lightning icon.

### Mobile

- Footer content stacks in this order:
  1. Logo and company name.
  2. Address.
  3. Copyright.
- Use centered alignment for all groups.
- Increase vertical padding compared with desktop to match the taller mobile reference.
- Company group should use a vertical stack or a compact row depending on viewport width:
  - Default mobile can use a centered row if it fits.
  - For narrow screens, allow wrapping without overflow.
- Address should stay readable at small sizes, with a comfortable line height.
- Text must not overflow the viewport; use normal wrapping and no fixed widths.

## Accessibility Plan

- Use a real `<footer>` landmark.
- Use an `aria-label` only if needed to clarify the landmark as `Site footer`.
- Keep all required text as readable DOM text.
- Use `<address>` for the physical office address.
- Add `not-italic` to address for visual consistency.
- Hide the decorative icon with `aria-hidden="true"`.
- Avoid clickable elements unless a future requirement adds footer links.
- Ensure color contrast remains acceptable against the dark blue background; adjust `--footer-foreground` opacity if needed during visual QA.

## SEO And Performance Plan

- Render the footer as a server component.
- Do not load image assets for the simple icon mark; use the already-installed Lucide SVG icon.
- Keep content static so it is available in the initial HTML.
- Use no client-side effects and no animation.
- Keep CSS token additions small and scoped.
- Use stable icon and layout dimensions to avoid cumulative layout shift.

## Implementation Steps

1. Add footer color tokens to `src/app/globals.css`.
2. Create `src/components/footer.tsx` as a server component.
3. Import and render `<Footer />` in `src/app/page.tsx` after `</main>`.
4. Verify desktop layout against `agent/resources/footer-ui/footer-desktop.png`.
5. Verify mobile layout against `agent/resources/footer-ui/footer-mobile.png`.
6. Run lint and fix any formatting or accessibility issues.
7. Run a production build if time allows.

## Verification Checklist

- `pnpm lint` passes.
- `pnpm build` passes, if run during implementation.
- Footer renders at the bottom of the landing page after the Contact section.
- Background color is `#1a3352` through `--footer-background`.
- Desktop footer shows three horizontal groups.
- Mobile footer stacks groups vertically and centers them.
- Address wraps cleanly on mobile.
- Company logo mark and name remain visually grouped.
- Text contrast is readable on the dark blue background.
- No horizontal overflow at mobile widths.
- No new runtime dependency is added.
- No unnecessary client component is introduced.

## Open Questions

- Confirm whether the footer logo should stay as the reference lightning mark or use an official PLN EMI logo asset if one becomes available.
- Confirm whether the copyright year should remain the fixed reference value `2026` or be generated dynamically from the current year.
- Confirm whether the address punctuation must exactly match the reference, including periods after `Sentraya.` and `Lt 17.`.
