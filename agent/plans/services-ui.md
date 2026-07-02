# Services UI Implementation Plan

## Source

- Idea: `agent/ideas/services-ui.md`
- Design references:
  - `agent/resources/services-ui/services-desktop.png`
  - `agent/resources/services-ui/services-mobile.png`
  - `agent/resources/services-ui/services-popup.png`

## Goal

Replace the current services placeholder with a polished services section that introduces PLN EMI service divisions through stacked cards. The section should use a pale background, centered display heading, large rounded white service cards, icon-led content, division badges, descriptive copy, and tag pills with hover states, scrollable document previews, and external-link behavior where applicable. The implementation should stay accessible, SEO-friendly, performance-focused, and aligned with the existing Next.js App Router, Tailwind CSS v4 tokens, shadcn components, `lucide-react/dynamic`, and established typography.

## Current Project Context

- App framework: Next.js App Router.
- Styling: Tailwind CSS v4 with CSS variables in `src/app/globals.css`.
- Existing font setup:
  - `Plus_Jakarta_Sans` is configured as `--font-sans`.
  - `Instrument_Serif` is configured as `--font-instrument-serif`.
  - `font-display` already maps to `Instrument Serif`.
- Existing page:
  - `src/app/page.tsx` renders `<Navbar />`, `<HomeHero />`, `<StatsSection />`, `<AboutUsSection />`, then placeholder sections.
  - The current `sections` array includes a placeholder `services` section that should be replaced by the real Services component.
- Existing shadcn setup:
  - `Badge`, `Button`, `Carousel`, and `Sheet` already exist.
  - This feature should use shadcn `Badge` for division badges and tag pills.
- Suggested shadcn component to add:
  - `HoverCard` for desktop/focus document previews.
- Existing icon library:
  - `lucide-react/dynamic` is already used in `src/components/about-us-section.tsx`.
  - Services should use `DynamicIcon` and `IconName` for dynamic service icons to match the existing About Us implementation pattern.
  - Link tags should use the static `ExternalLinkIcon` import because the external-link glyph is not data-driven.

## Requirements Checklist

- Services section renders below the About Us section.
- Services section uses `id="services"` so existing navbar and hero CTA links continue to work.
- Section heading appears at the very top of the section.
- Heading content matches the reference:
  - Uppercase eyebrow: `WHAT WE OFFER`.
  - Main title: `Our Service`.
  - Italic subtitle: `Divisions`.
- Main title and subtitle use `Instrument Serif`.
- Body and tag copy use `Plus Jakarta Sans`.
- Desktop layout uses vertically stacked service cards.
- Cards visually overlap or sit tightly enough to feel stacked.
- Each service card contains:
  - Icon at the left on desktop.
  - Title using `Instrument Serif`.
  - Small division badge beside the title.
  - Description text using `Plus Jakarta Sans`.
  - Tag list rendered as badge-style pills.
- Card hover state raises the card slightly and increases shadow.
- Mobile layout switches card internals to a stacked column at the `lg` breakpoint.
- Mobile cards place the icon above the title/content.
- Tag types are supported:
  - Plain tag: background changes on hover.
  - Document tag: shows a scrollable document preview on hover/focus.
  - Link tag: includes an external-link icon, shows a scrollable document preview on hover/focus, and opens the related link in a new tab.
- Link tags use `target="_blank"` with `rel="noreferrer"`.
- Document previews are keyboard accessible through focus, not only pointer hover.
- Motion respects `prefers-reduced-motion`.
- Prefer semantic Tailwind tokens over repeated literal colors.
- Prefer shadcn components where useful.
- Keep implementation SEO-friendly and performance-focused.

## Proposed File Changes

### `src/app/globals.css`

Add semantic services tokens in `:root`, then expose them through `@theme inline`.

Suggested variables:

```css
--services-background: #e7ecef;
--services-card: #ffffff;
--services-foreground: #274c77;
--services-muted: #7f94b2;
--services-accent: #6096ba;
--services-tag-background: #e8edf2;
--services-tag-background-hover: #dce7ef;
--services-tag-foreground: #274c77;
--services-popup-background: rgb(255 255 255 / 82%);
--services-popup-border: rgb(96 150 186 / 28%);
--services-popup-shadow: rgb(39 76 119 / 18%);
--services-icon-blue: #2f65ed;
--services-icon-green: #20ad55;
--services-icon-yellow: #f5a400;
```

Suggested theme aliases:

```css
--color-services-background: var(--services-background);
--color-services-card: var(--services-card);
--color-services-foreground: var(--services-foreground);
--color-services-muted: var(--services-muted);
--color-services-accent: var(--services-accent);
--color-services-tag-background: var(--services-tag-background);
--color-services-tag-background-hover: var(--services-tag-background-hover);
--color-services-tag-foreground: var(--services-tag-foreground);
--color-services-popup-background: var(--services-popup-background);
--color-services-popup-border: var(--services-popup-border);
--color-services-popup-shadow: var(--services-popup-shadow);
--color-services-icon-blue: var(--services-icon-blue);
--color-services-icon-green: var(--services-icon-green);
--color-services-icon-yellow: var(--services-icon-yellow);
```

Implementation notes:

- Reuse existing brand colors where they fit, but add section-specific tokens when the service reference needs distinct surfaces.
- Use classes like `bg-services-background`, `text-services-foreground`, `text-services-muted`, and `bg-services-tag-background`.
- Avoid arbitrary hex values in JSX except where a one-off fallback is unavoidable.
- No custom animation is required unless visual QA shows the card hover needs a reusable utility.

### `src/components/ui/hover-card.tsx`

Add the shadcn Hover Card component.

Preferred implementation path:

```bash
pnpm dlx shadcn@latest add hover-card
```

Implementation notes:

- Use `HoverCard`, `HoverCardTrigger`, and `HoverCardContent` for document and link tag previews.
- Keep the generated shadcn primitive generic.
- Configure preview behavior in the service tag component, not in the generated UI primitive.
- Use `openDelay` and `closeDelay` to keep previews responsive without being jumpy.

### `src/components/services-section.tsx`

Create a dedicated component for the Services section.

Implementation notes:

- Prefer a server component if using only shadcn `HoverCard` and CSS hover/focus states.
- Convert to a client component only if mobile tap previews require local state or a dialog fallback.
- Use local typed constants for service cards and tag metadata.
- Use shadcn `Badge` for division labels and tag pills.
- Use `DynamicIcon` and `IconName` from `lucide-react/dynamic` for service icons, matching `src/components/about-us-section.tsx`.
- Use the direct `ExternalLinkIcon` import from `lucide-react` for link tag indicators because that icon is static.
- Use semantic HTML:
  - `<section id="services" aria-labelledby="services-heading">`
  - `h2` for the visible section title.
  - `ul`/`li` for the service card collection.
  - `ul`/`li` for each service tag list.
- Keep all visible service content in the DOM for SEO.
- Keep descriptions as real text, not images.
- Use `font-display` only for section title and service card titles.
- Use `font-sans` for eyebrow, descriptions, badges, tags, and popup content.

Suggested data shape:

```ts
type ServiceTagBase = {
  label: string;
};

type PlainServiceTag = ServiceTagBase & {
  type: "plain";
};

type DocumentServiceTag = ServiceTagBase & {
  type: "document";
  document: ServiceDocument;
};

type LinkServiceTag = ServiceTagBase & {
  type: "link";
  href: string;
  document: ServiceDocument;
};

type ServiceTag = PlainServiceTag | DocumentServiceTag | LinkServiceTag;

type ServiceDocument = {
  title: string;
  summary: string;
  body: string[];
  image?: {
    src: string;
    alt: string;
  };
};

type ServiceDivision = {
  title: string;
  code: string;
  icon: IconName;
  iconTone: "blue" | "green" | "yellow";
  description: React.ReactNode;
  tags: ServiceTag[];
};
```

Suggested imports:

```ts
import { ExternalLinkIcon } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

import { cn } from "@/lib/utils";
```

Suggested service content:

```ts
const serviceDivisions: ServiceDivision[] = [
  {
    title: "Decarbonization Strategy Solutions",
    code: "DSS",
    icon: "leaf",
    iconTone: "blue",
    description: (
      <>
        Our comprehensive strategic decarbonization pathways are designed to help
        you navigate the transition to green energy. By integrating robust{" "}
        <strong>Carbon Credit Management</strong>, high-impact{" "}
        <strong>Renewable Energy Certificates</strong>, and a reliable{" "}
        <strong>Biomass Supply Chain</strong>, we empower your organization to
        effectively reduce its carbon footprint while meeting global
        sustainability standards.
      </>
    ),
    tags: [
      {
        type: "link",
        label: "Carbon Credit for Scope 1, 2, 3 offsetting",
        href: "https://plnemi.co.id/",
        document: {
          title: "Carbon Credit Management",
          summary:
            "Support for carbon credit planning, offset strategy, and reporting alignment.",
          body: [
            "Assess current emissions sources and define reduction or offset priorities.",
            "Prepare documentation and implementation support for eligible carbon programs.",
          ],
        },
      },
      {
        type: "link",
        label: "Renewable Energy Certificate (REC) for Scope 2",
        href: "https://plnemi.co.id/",
        document: {
          title: "Renewable Energy Certificate",
          summary:
            "Certificate-based support for electricity-related emissions management.",
          body: [
            "Map Scope 2 needs and certificate requirements.",
            "Support REC procurement documentation and sustainability communication.",
          ],
        },
      },
      {
        type: "plain",
        label: "Green Attribute Management",
      },
      {
        type: "plain",
        label: "Biomass Supply",
      },
    ],
  },
  {
    title: "Environment Compliance Solutions",
    code: "ECS",
    icon: "shield-check",
    iconTone: "green",
    description: (
      <>
        PLN EMI provide comprehensive environmental compliance support designed
        to safeguard your business against regulatory risks. Our expertise spans
        the full operational lifecycle, including rigorous{" "}
        <strong>Hazardous Waste Management</strong>, in-depth{" "}
        <strong>Environmental Auditing</strong>, and the{" "}
        <strong>Preparation of Monitoring Reports</strong>.
      </>
    ),
    tags: [
      { type: "document", label: "Rincian Teknis Penyimpanan Limbah B3", document: environmentDocument },
      { type: "document", label: "Rincian Teknis Pengelolaan Limbah Non-B3", document: environmentDocument },
      { type: "document", label: "Persetujuan Teknis Air Limbah", document: environmentDocument },
      { type: "document", label: "Persetujuan Teknis Emisi", document: environmentDocument },
      { type: "document", label: "Persetujuan Teknis Pengelolaan Limbah B3", document: environmentDocument },
      { type: "document", label: "Persetujuan Lingkungan / Integrasi", document: environmentDocument },
      { type: "document", label: "SLO Pengelolaan Limbah B3", document: environmentDocument },
      { type: "document", label: "SLO Air Limbah", document: environmentDocument },
      { type: "document", label: "SLO Emisi", document: environmentDocument },
      { type: "document", label: "Audit Lingkungan Wajib & Sukarela", document: environmentDocument },
      { type: "plain", label: "Pengelolaan Limbah" },
      { type: "plain", label: "Pemantauan & Pengelolaan Lingkungan" },
    ],
  },
  {
    title: "Energy Conservation Solutions",
    code: "EnCS",
    icon: "zap",
    iconTone: "yellow",
    description: (
      <>
        Our holistic energy management integrates professional audits, power
        plant performance testing, and advanced monitoring with Strategic{" "}
        <strong>ISO Consulting</strong> and <strong>Green Building</strong>{" "}
        solutions. By combining technical insight with global standards, we
        drive maximum efficiency and significant energy savings for your
        business.
      </>
    ),
    tags: [
      { type: "document", label: "Energy Audit for Power Plant, Building, and Data Center", document: energyDocument },
      { type: "document", label: "Performance Test for Power Plant", document: performanceTestDocument },
      { type: "document", label: "Energy Monitoring System as a Service (EnMSaas)", document: energyDocument },
      { type: "document", label: "ISO 50001 Consulting for Certification", document: energyDocument },
      { type: "document", label: "Green Building Consulting (EDGE & Greenship)", document: energyDocument },
      { type: "document", label: "ESCO Implementation for Building", document: energyDocument },
      { type: "document", label: "Energy Auditor & Energy Manager Certification (BNSP)", document: energyDocument },
    ],
  },
];
```

Notes for suggested content:

- The `href` examples should be replaced with confirmed destination URLs before implementation ships. Do not ship `#` as a new-tab link.
- Reusable `environmentDocument`, `energyDocument`, and `performanceTestDocument` constants can keep the first implementation concise.
- If real document text is supplied later, use that text in the `ServiceDocument` body instead of placeholder marketing copy.
- The popup reference includes a photo. If no service-specific image assets are provided, keep popup documents text-only or reuse approved existing public assets only when they accurately represent the service.

Suggested component structure:

```tsx
<section id="services" aria-labelledby="services-heading">
  <div>
    <p>WHAT WE OFFER</p>
    <h2 id="services-heading">
      <span>Our Service</span>
      <span>Divisions</span>
    </h2>

    <ul>
      {serviceDivisions.map((service) => (
        <li key={service.code}>
          <article>
            <div aria-hidden="true">
              <DynamicIcon name={service.icon} />
            </div>

            <div>
              <div>
                <h3>{service.title}</h3>
                <Badge>{service.code}</Badge>
              </div>

              <p>{service.description}</p>

              <ul>
                {service.tags.map((tag) => (
                  <ServiceTagPill key={tag.label} tag={tag} />
                ))}
              </ul>
            </div>
          </article>
        </li>
      ))}
    </ul>
  </div>
</section>
```

### `src/components/service-tag-pill.tsx`

Create a small internal component if `services-section.tsx` becomes too large.

Implementation notes:

- Keep the tag rendering logic isolated from service card layout.
- Use one public prop: `tag: ServiceTag`.
- Render plain tags as shadcn `Badge` or a button-like non-interactive pill only if there is no action.
- Render document tags with `HoverCardTrigger` and `HoverCardContent`.
- Render link tags with an anchor inside the trigger and an `ExternalLinkIcon`.
- For link tags, clicking the trigger should open the link in a new tab.
- Ensure keyboard users can focus the trigger and read the preview.
- Keep `aria-label` clear for link tags, such as `Open Renewable Energy Certificate in a new tab`.

Suggested rendering rules:

```tsx
if (tag.type === "plain") {
  return <Badge>{tag.label}</Badge>;
}

if (tag.type === "document") {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button type="button">{tag.label}</button>
      </HoverCardTrigger>
      <HoverCardContent>
        <ServiceDocumentPreview document={tag.document} />
      </HoverCardContent>
    </HoverCard>
  );
}

return (
  <HoverCard>
    <HoverCardTrigger asChild>
      <a href={tag.href} rel="noreferrer" target="_blank">
        {tag.label}
        <ExternalLinkIcon aria-hidden="true" />
      </a>
    </HoverCardTrigger>
    <HoverCardContent>
      <ServiceDocumentPreview document={tag.document} />
    </HoverCardContent>
  </HoverCard>
);
```

### `src/components/service-document-preview.tsx`

Create a small presentational component for popup content.

Implementation notes:

- Render the preview title, summary, optional image, and body paragraphs.
- Keep the content area scrollable with a bounded height.
- Use `next/image` only if the preview includes a real public image asset with known dimensions.
- Use a regular `<img>` only if dimensions are unknown and the image is decorative enough to avoid optimization needs. Prefer `next/image`.
- Add `aria-hidden="true"` only for decorative imagery.
- Do not fetch document content on hover; keep the initial implementation static and lightweight.

Suggested structure:

```tsx
<div className="max-h-[min(28rem,70vh)] overflow-y-auto">
  <h4>{document.title}</h4>
  <p>{document.summary}</p>
  {document.image ? <Image /> : null}
  {document.body.map((paragraph) => (
    <p key={paragraph}>{paragraph}</p>
  ))}
</div>
```

### `src/app/page.tsx`

Import and render the Services section immediately after About Us.

Implementation notes:

- Add `import { ServicesSection } from "@/components/services-section"`.
- Render order should be:

```tsx
<Navbar />
<main>
  <HomeHero />
  <StatsSection />
  <AboutUsSection />
  <ServicesSection />
  other sections
</main>
```

- Remove the current placeholder `services` object from the `sections` array to avoid duplicate `id="services"` values.
- Keep `faq` and `contact` placeholders untouched unless a future feature replaces them.
- Keep `scroll-mt-20` on the Services section so anchor navigation clears the sticky navbar.

## Visual Layout Plan

### Desktop

- Section:
  - Full-width pale band using `bg-services-background`.
  - Large top padding so the heading has breathing room, likely `pt-20` to `pt-24`.
  - Bottom padding large enough to show the final stacked card cleanly, likely `pb-24`.
  - Use a centered `max-w-7xl` container with `px-6 sm:px-8 lg:px-10`.
- Heading:
  - Center aligned.
  - Eyebrow uses `text-services-accent`, uppercase, bold, and wide tracking.
  - Heading uses `font-display`.
  - `Our Service` uses `text-services-foreground`.
  - `Divisions` uses italic `text-services-accent`.
  - Use `text-5xl` to `text-6xl` on desktop, tuned against the reference.
- Card list:
  - Start below the heading with large spacing, around `mt-20`.
  - Use `space-y-0` or small negative margins to create the stacked-card feel.
  - Each card has `rounded-[1.75rem]` or a token-compatible radius close to the reference.
  - Cards use `bg-services-card`, subtle border, and soft shadow.
  - Give later cards a slight overlap using `-mt-px` or controlled negative margin only if it does not obscure focus outlines.
- Card internals:
  - Use a two-column internal grid from `lg` upward: fixed icon column plus flexible content column.
  - Suggested card padding: `p-8 lg:p-12`.
  - Icon square around `size-20` with `rounded-2xl`.
  - Title row uses flex wrap so the badge never overlaps long titles.
  - Title size around `text-3xl` with `font-display`.
  - Description uses `text-services-muted`, `leading-8`, and bold `<strong>` spans in `text-services-foreground`.
  - Tags use flex wrap with `gap-3`.
- Card hover:
  - Add `transition-[transform,box-shadow] duration-300`.
  - Use `hover:-translate-y-1 hover:shadow-xl`.
  - Add `motion-reduce:transform-none motion-reduce:transition-none`.

### Mobile

- Breakpoint:
  - Treat mobile as everything below `lg`, matching the idea requirement.
- Section:
  - Keep the pale background.
  - Use generous top spacing but reduce card-list gap enough to avoid excessive scrolling.
  - Suggested padding: `pt-14 pb-16`.
- Heading:
  - Keep center alignment.
  - Use a smaller display size, around `text-5xl` for title lines if it fits, otherwise `text-4xl`.
  - Keep subtitle on its own line.
- Cards:
  - Use stacked internal layout.
  - Icon appears above title/content.
  - Card padding around `p-7` to `p-8`.
  - Title row can remain inline with the badge if it fits; allow wrapping with `gap-3`.
  - Description text should stay readable, around `text-lg` in the reference, but verify it does not overflow narrow screens.
  - Tag pills should wrap naturally and never exceed the card width.
- Popups:
  - HoverCard works for keyboard focus and pointer hover, but touch-only users may need a tap path.
  - If QA shows mobile previews are inaccessible, add a small shadcn `Dialog` fallback for document/link tags below `lg`.
  - Link tags must remain tappable on mobile even if the preview is unavailable.

## Popup Interaction Plan

- Plain tags:
  - Render as non-interactive pills if they do not open content.
  - Use `hover:bg-services-tag-background-hover` for pointer feedback.
- Document tags:
  - Render with `HoverCard`.
  - Trigger should be a real `<button type="button">`.
  - Preview should open on hover and focus.
  - Preview content should have `max-h` and `overflow-y-auto`.
  - Place popup above the tag when possible, matching the reference overlay.
- Link tags:
  - Render with `HoverCard`.
  - Trigger should be a real `<a>`.
  - Include `<ExternalLinkIcon />` at the end of the label.
  - The anchor opens in a new tab.
  - The same trigger also displays a preview on hover/focus.
- Preview visual style:
  - Use semi-transparent white background.
  - Add subtle border and shadow.
  - Use `backdrop-blur-md` if it does not reduce text legibility.
  - Keep width bounded, likely `w-[min(34rem,calc(100vw-2rem))]`.
  - Keep a visible custom scrollbar only if browser defaults look poor; avoid heavy scrollbar styling.

## Accessibility Plan

- Use a real section heading with `aria-labelledby`.
- Use lists for service cards and tag groups.
- Keep service cards as content containers, not clickable cards, because each card contains separate tag interactions.
- Plain tags should not be focusable if they do not perform an action.
- Document tag triggers should be keyboard focusable.
- Link tags should have clear accessible labels when the visible label is not enough.
- Popups should not contain essential-only content that keyboard or touch users cannot reach.
- Preserve visible focus outlines on tag triggers.
- Use `motion-reduce:` classes for hover movement and popup transitions.
- Do not rely on color alone to distinguish link tags; include the external-link icon.

## Performance Plan

- Keep service data static in the component to allow fast server rendering.
- Avoid fetching popup content on hover.
- Avoid adding animation libraries.
- Use `DynamicIcon` and `IconName` from `lucide-react/dynamic` for dynamic service icons, keeping the pattern consistent with `src/components/about-us-section.tsx`.
- Use direct `ExternalLinkIcon` from `lucide-react` for the static external-link indicator.
- Use `next/image` for any popup images that are shipped as local assets.
- Keep the component split only where readability improves; avoid over-fragmenting tiny presentational pieces.
- Ensure no duplicate `id="services"` remains after replacing the placeholder.

## Implementation Steps

1. Add shadcn `HoverCard` if it is not already present.
2. Add services-specific tokens to `src/app/globals.css`.
3. Create `src/components/services-section.tsx` with service data, semantic section markup, and stacked-card layout.
4. Add `ServiceTagPill` and `ServiceDocumentPreview` inside the same file first.
5. Extract `ServiceTagPill` or `ServiceDocumentPreview` into separate files only if the component becomes difficult to scan.
6. Wire `<ServicesSection />` into `src/app/page.tsx` after `<AboutUsSection />`.
7. Remove the placeholder `services` item from the `sections` array.
8. Run lint and build checks.
9. Perform visual QA at desktop and mobile widths against the reference images.
10. Verify hover/focus previews, external links, reduced motion behavior, and anchor navigation.

## Verification Plan

Run:

```bash
pnpm lint
pnpm build
```

Manual QA:

- Desktop width around 1440px:
  - Heading aligns and sizes like the reference.
  - Cards are stacked, full width within the container, and not cramped.
  - Icons sit at the left.
  - Titles, badges, descriptions, and tags align cleanly.
  - Card hover raises the card without layout shift.
  - Document and link tags show previews on hover.
  - Link tags include the external-link icon and open a new tab.
- Mobile width around 390px:
  - Card internals stack vertically below `lg`.
  - Icon appears above content.
  - Long titles and tag labels wrap without overflow.
  - Cards retain comfortable padding.
  - Link tags are tappable.
- Keyboard:
  - Tab order reaches document and link tags.
  - Focus outlines are visible.
  - HoverCard previews open on focus where supported.
- Reduced motion:
  - Card transform and popup transitions do not create unnecessary movement.
- Anchor navigation:
  - `#services` lands on the section without hiding the heading behind the sticky navbar.

## Open Questions Before Implementation

- Confirm the final external URLs for link tags. The plan should not ship placeholder `href` values.
- Confirm whether popup document previews should use provided official document content, short marketing summaries, or downloadable documents.
- Confirm whether service-specific popup images will be provided. Without approved assets, text-only previews are safer and more accurate.
