# Contact Us UI Implementation Plan

## Source

- Idea: `agent/ideas/contact-us-ui.md`
- Design references:
  - `agent/resources/contact-us-ui/contact-us-desktop.png`
  - `agent/resources/contact-us-ui/contact-us-mobile.png`

## Goal

Replace the current Contact placeholder with a polished final call-to-action section for the landing page. The section should use a full-width `#274c77` blue background, centered serif headline, gradient italic subtitle, concise support copy, two clear contact actions, and a small email label below the buttons. The implementation should stay simple, accessible, SEO-friendly, performance-focused, and aligned with the existing Next.js App Router, Tailwind CSS v4 tokens, shadcn `Button`, `lucide-react`, and established typography.

## Current Project Context

- App framework: Next.js App Router.
- Styling: Tailwind CSS v4 with CSS variables in `src/app/globals.css`.
- Existing font setup:
  - `Plus_Jakarta_Sans` is configured as `--font-sans`.
  - `Instrument_Serif` is configured as `--font-instrument-serif`.
  - `font-display` already maps to `Instrument Serif`.
- Existing page order:
  - `src/app/page.tsx` renders `<Navbar />`, `<HomeHero />`, `<StatsSection />`, `<AboutUsSection />`, `<ServicesSection />`, `<ClientsSection />`, `<FaqSection />`, then a `contact` placeholder from the `sections` array.
  - This feature should replace the remaining placeholder with a dedicated `<ContactUsSection />`.
- Existing shadcn setup:
  - `Button` already exists at `src/components/ui/button.tsx`.
  - Use `Button` with `asChild` for real anchor links.
- Existing icon library:
  - `lucide-react` is available.
  - Use `Send`, `Mail`, and a WhatsApp icon solution that does not add a heavy dependency.
- Existing navigation:
  - Navbar links include `href="#contact"`.
  - The new section must keep `id="contact"` and `scroll-mt-20`.

## Requirements Checklist

- Contact section renders after the FAQ section.
- Section uses `id="contact"` so existing navbar links continue to work.
- Section uses `#274c77` as its background color, preferably through semantic Tailwind tokens.
- Section uses a centered content block.
- Section includes a decorative icon tile above the headline:
  - Rounded square tile.
  - Subtle lighter blue fill.
  - Paper-plane/send icon.
- Section contains title and subtitle:
  - `Ready to Start Your`
  - `Sustainability Journey?`
- Title and subtitle both use `Instrument Serif`.
- Subtitle uses italic styling and a gradient text color.
- Section contains supporting copy:
  - `Connect with our team of experts. We're here to help you navigate energy efficiency, compliance, and climate action.`
- Section contains two action buttons:
  - `WhatsApp Us`
  - `Email Us`
- Buttons use real links:
  - WhatsApp should use a `https://wa.me/...` URL once the official number is known.
  - Email should use `mailto:pemasaran@emipersero.co.id`.
- Section has a small email label under action buttons:
  - `pemasaran@emipersero.co.id`
- Use `lg` as the mobile-to-desktop layout breakpoint:
  - Below `lg`, buttons stack vertically and fill the available width.
  - At `lg` and above, buttons sit side by side and use compact intrinsic widths.
- Preserve a subtle grid background similar to the reference.
- Keep all important text as real text in the DOM.
- Prefer shadcn components where useful.
- Prefer semantic Tailwind variables over repeated custom string values.
- Keep implementation SEO-friendly and performance-focused.

## Proposed File Changes

### `src/app/globals.css`

Add semantic Contact tokens in `:root`, then expose them through `@theme inline`.

Suggested variables:

```css
--contact-background: #274c77;
--contact-foreground: #ffffff;
--contact-muted: #b9cce0;
--contact-muted-soft: rgb(185 204 224 / 55%);
--contact-icon-background: rgb(163 206 241 / 18%);
--contact-icon-foreground: #a3cef1;
--contact-grid: rgb(163 206 241 / 5%);
--contact-subtitle-from: #a3cef1;
--contact-subtitle-via: #bcd9f1;
--contact-subtitle-to: #7fb0d2;
--contact-whatsapp: #22c55e;
--contact-whatsapp-hover: #16a34a;
--contact-whatsapp-foreground: #ffffff;
--contact-email-background: rgb(255 255 255 / 8%);
--contact-email-background-hover: rgb(255 255 255 / 14%);
--contact-email-border: rgb(255 255 255 / 22%);
--contact-email-border-hover: rgb(255 255 255 / 34%);
--contact-email-foreground: #ffffff;
```

Suggested theme aliases:

```css
--color-contact-background: var(--contact-background);
--color-contact-foreground: var(--contact-foreground);
--color-contact-muted: var(--contact-muted);
--color-contact-muted-soft: var(--contact-muted-soft);
--color-contact-icon-background: var(--contact-icon-background);
--color-contact-icon-foreground: var(--contact-icon-foreground);
--color-contact-grid: var(--contact-grid);
--color-contact-subtitle-from: var(--contact-subtitle-from);
--color-contact-subtitle-via: var(--contact-subtitle-via);
--color-contact-subtitle-to: var(--contact-subtitle-to);
--color-contact-whatsapp: var(--contact-whatsapp);
--color-contact-whatsapp-hover: var(--contact-whatsapp-hover);
--color-contact-whatsapp-foreground: var(--contact-whatsapp-foreground);
--color-contact-email-background: var(--contact-email-background);
--color-contact-email-background-hover: var(--contact-email-background-hover);
--color-contact-email-border: var(--contact-email-border);
--color-contact-email-border-hover: var(--contact-email-border-hover);
--color-contact-email-foreground: var(--contact-email-foreground);
```

Add a small reusable grid utility if keeping the background in JSX becomes too noisy.

Suggested utility:

```css
.contact-grid {
  background-image:
    linear-gradient(var(--contact-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--contact-grid) 1px, transparent 1px);
  background-size: 86px 86px;
}
```

Implementation notes:

- Use classes like `bg-contact-background`, `text-contact-foreground`, `text-contact-muted`, and `from-contact-subtitle-from`.
- Keep section-specific tokens near the existing section tokens.
- Avoid arbitrary hex values in JSX except where a Tailwind feature cannot reference a token cleanly.
- The required `#274c77` should live in `--contact-background`.

### `src/components/contact-us-section.tsx`

Create a dedicated server component for the Contact section.

Implementation notes:

- Keep this component server-rendered. Links and CSS hover states do not require client state.
- Use shadcn `Button` with `asChild` so each action is a semantic anchor.
- Use `Mail` and `Send` icons from `lucide-react`.
- For the WhatsApp button icon, prefer a tiny inline component or current local icon pattern if one exists during implementation. Avoid adding another icon package for a single brand glyph.
- Use semantic HTML:
  - `<section id="contact" aria-labelledby="contact-heading">`
  - `h2` for the visible section title.
  - Contact buttons as `<a>` elements.
- Keep visible text real text for SEO and accessibility.
- Use `font-display` for both title lines.
- Use `font-sans` for supporting text, button labels, and the email label.
- Add `scroll-mt-20` on the section for sticky navbar offset.
- Use `aria-label` on the action links if the visible text is not enough once URLs are final.
- Use `rel="noopener noreferrer"` only if links open in a new tab. Prefer same-tab links unless product wants new tabs.

Suggested constants:

```ts
const contactEmail = "pemasaran@emipersero.co.id";
const whatsappHref = "https://wa.me/6200000000000";
```

Implementation note:

- Replace the placeholder WhatsApp number with the official PLN EMI marketing number before implementation is finalized. If the number is not available, use `"#contact"` temporarily and leave a clear TODO in the implementation plan execution notes rather than shipping a broken external URL.

Suggested component structure:

```tsx
<section
  aria-labelledby="contact-heading"
  className="contact-grid scroll-mt-20 bg-contact-background px-6 py-20 text-contact-foreground sm:px-8 lg:px-10 lg:py-28"
  id="contact"
>
  <div className="mx-auto flex max-w-7xl justify-center">
    <div className="flex w-full max-w-3xl flex-col items-center text-center">
      <div aria-hidden="true">
        <Send />
      </div>

      <h2 id="contact-heading">
        <span>Ready to Start Your</span>
        <span>Sustainability Journey?</span>
      </h2>

      <p>
        Connect with our team of experts. We're here to help you navigate energy
        efficiency, compliance, and climate action.
      </p>

      <div>
        <Button asChild>
          <a href={whatsappHref}>WhatsApp Us</a>
        </Button>
        <Button asChild variant="outline">
          <a href={`mailto:${contactEmail}`}>Email Us</a>
        </Button>
      </div>

      <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
    </div>
  </div>
</section>
```

### `src/app/page.tsx`

Import and render the Contact section immediately after the FAQ section.

Implementation notes:

- Add `import { ContactUsSection } from "@/components/contact-us-section"`.
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
```

- Remove the current `sections` array if it only contains the old contact placeholder.
- Ensure there is no duplicate `id="contact"`.
- Verify `#contact` navigation lands comfortably below the sticky navbar.

## Visual Layout Plan

### Desktop

- Section:
  - Full-width blue band using `bg-contact-background`.
  - Use a subtle grid overlay with very low opacity.
  - Use a centered `max-w-7xl` outer container.
  - Use generous vertical padding, likely `lg:py-28`.
  - Content should visually sit near the center of the section, matching the reference.
- Content block:
  - Center aligned.
  - Width around `max-w-3xl`.
  - No card wrapper; content sits directly on the blue background.
- Icon tile:
  - Square tile around `size-22`.
  - Rounded around `rounded-3xl`.
  - Background `bg-contact-icon-background`.
  - Icon uses `text-contact-icon-foreground`.
  - Place above title with a large but balanced gap.
- Heading:
  - Two-line heading.
  - First line: white, normal serif.
  - Second line: italic serif with gradient text.
  - Use `font-display`, large display sizing, and tight line height.
  - Suggested sizing: `lg:text-6xl` with line height near `leading-none`.
- Supporting text:
  - Centered below heading.
  - Use `text-contact-muted`.
  - Width around `max-w-xl`.
  - Readable line height.
- Buttons:
  - Horizontal at `lg` and above.
  - WhatsApp button uses bright green fill.
  - Email button uses translucent blue/white fill, border, and white text.
  - Button shape should be pill-like, matching the reference.
  - Icons appear before labels.
  - Hover states should be visible but restrained.
- Email label:
  - Centered under buttons.
  - Use `text-contact-muted-soft`.
  - Small and understated.
  - Link it with `mailto:` for usability.

### Mobile

- Section:
  - Still uses the full-width blue band and grid background.
  - Use `px-6` or `px-8` with large vertical padding.
  - Since the mobile reference is tall, use substantial spacing without forcing viewport height.
- Icon tile:
  - Larger than typical icon buttons, around `size-28`.
  - Rounded enough to match the soft square reference.
- Heading:
  - Centered and split into two lines.
  - Use responsive sizing around `text-4xl` to `text-5xl`.
  - Avoid viewport-width font scaling.
  - Keep the subtitle on one line if possible; allow clean wrapping if the viewport is narrower.
- Supporting text:
  - Larger and readable.
  - Use `max-w` and relaxed line height.
  - Avoid overlapping or clipped text.
- Buttons:
  - Stack vertically below the `lg` breakpoint.
  - Full width within the content container.
  - Use large touch targets, likely `min-h-16`.
  - Maintain pill shape.
  - Keep icons and labels centered.
- Email label:
  - Sits below the stacked buttons with enough spacing.
  - Use muted text and keep it readable.

## Interaction And Accessibility Plan

- Use real anchor links for both contact actions.
- WhatsApp link:
  - Use the official `wa.me` format after the phone number is confirmed.
  - Include a URL-encoded introductory message only if marketing copy is provided.
- Email link:
  - Use `mailto:pemasaran@emipersero.co.id`.
  - The small email label should also be clickable.
- Button labels should remain visible text, not icon-only.
- Icons should be decorative with `aria-hidden="true"` unless they add unique meaning.
- Use visible `focus-visible` rings on both buttons and the email label.
- Preserve strong color contrast:
  - White heading on blue background.
  - Light blue body text on blue background.
  - White text on green WhatsApp button.
  - White text on translucent Email button.
- Do not add animations beyond subtle hover transitions.
- Respect `prefers-reduced-motion` by keeping any transitions simple and nonessential.

## SEO And Performance Plan

- Render the section server-side as real text.
- Avoid runtime data fetching.
- Avoid image assets for this section; use CSS and lightweight icons.
- Do not add a new dependency just for the WhatsApp icon.
- Use semantic headings so the final CTA contributes to the page structure.
- Keep links crawlable and meaningful.
- Consider updating `src/app/layout.tsx` metadata later if marketing wants the contact email or contact action reflected in site metadata, but keep that out of the first contact UI implementation.

## Validation Checklist

- Run lint:

```bash
pnpm lint
```

- Run a production build if time allows:

```bash
pnpm build
```

- Visual QA desktop:
  - Section background matches `#274c77`.
  - Grid overlay is visible but subtle.
  - Icon tile, heading, subtitle, body copy, buttons, and email label are centered.
  - Title uses Instrument Serif.
  - Subtitle is italic and gradient-colored.
  - Buttons are side by side at `lg` and above.
  - Button sizes and spacing feel close to `contact-us-desktop.png`.
- Visual QA mobile:
  - Buttons stack below `lg`.
  - Buttons fill the content width without touching viewport edges.
  - Text wraps cleanly and does not overlap.
  - Email label remains visible and centered.
  - Overall spacing feels close to `contact-us-mobile.png`.
- Accessibility QA:
  - Tab reaches WhatsApp link, Email link, and the email label link.
  - Focus states are visible.
  - Links have correct accessible names.
  - No duplicate `id="contact"` exists.
- Navigation QA:
  - Desktop and mobile navbar `Contact` link scrolls to the new section.
  - Sticky navbar does not cover the section heading after hash navigation.

## Implementation Order

1. Confirm the official WhatsApp number or choose a temporary non-external fallback.
2. Add Contact color tokens and grid utility in `src/app/globals.css`.
3. Create `src/components/contact-us-section.tsx` with typed constants, semantic structure, shadcn `Button`, and icons.
4. Replace the contact placeholder in `src/app/page.tsx` with `<ContactUsSection />`.
5. Run lint and build checks.
6. Perform desktop and mobile visual QA against `agent/resources/contact-us-ui`.
7. Tune spacing, typography, button dimensions, and grid opacity only where the screenshots show a mismatch.

## Open Questions

- What is the official WhatsApp number for the `WhatsApp Us` action?
- Should WhatsApp and email actions open in the same tab or a new tab?
- Should the WhatsApp URL include a prefilled message? If yes, what exact copy should be used?

## Out Of Scope

- Do not implement the Contact UI as part of this planning task.
- Do not change navbar behavior unless `#contact` navigation is broken during implementation.
- Do not add a contact form, API route, CRM integration, analytics tracking, or CMS-driven contact settings.
- Do not redesign earlier page sections.
- Do not add new icon or animation dependencies for this section.
