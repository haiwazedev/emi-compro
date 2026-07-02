# FAQ UI Implementation Plan

## Source

- Idea: `agent/ideas/faq-ui.md`
- Design references:
  - `agent/resources/faq-ui/faq-desktop.png`
  - `agent/resources/faq-ui/faq-mobile.png`

## Goal

Replace the current FAQ placeholder with a polished Frequently Asked Questions section on the landing page. The section should use a centered stacked header, an instructional helper line, and a bordered scrollable accordion panel with rounded card-like questions. The implementation should stay simple, accessible, SEO-friendly, performance-focused, and aligned with the existing Next.js App Router, Tailwind CSS v4 tokens, shadcn components, `lucide-react`, and established typography.

## Current Project Context

- App framework: Next.js App Router.
- Styling: Tailwind CSS v4 with CSS variables in `src/app/globals.css`.
- Existing font setup:
  - `Plus_Jakarta_Sans` is configured as `--font-sans`.
  - `Instrument_Serif` is configured as `--font-instrument-serif`.
  - `font-display` already maps to `Instrument Serif`.
- Existing page:
  - `src/app/page.tsx` renders `<Navbar />`, `<HomeHero />`, `<StatsSection />`, `<AboutUsSection />`, `<ServicesSection />`, `<ClientsSection />`, then placeholder sections.
  - The current `sections` array includes a placeholder `faq` section that should be replaced by the real FAQ component.
- Existing shadcn setup:
  - `Badge`, `Button`, `Carousel`, `HoverCard`, and `Sheet` already exist.
  - This feature should add and use shadcn `Accordion`.
- Existing icon library:
  - `lucide-react` is available.
  - The accordion should use the shadcn/Radix trigger icon behavior where possible. If a custom icon is needed, use `ChevronDown` or `ChevronUp` from `lucide-react`.

## Requirements Checklist

- FAQ section renders below the Clients section.
- FAQ section uses `id="faq"` so existing navbar links continue to work.
- Section uses stacked column UI:
  - Header area with title information.
  - Questions area with accordion UI component.
- Header content matches the reference:
  - Uppercase eyebrow: `FAQ`.
  - Main title: `Frequently Asked`.
  - Italic subtitle: `Questions`.
  - Helper line: `Hover and scroll to see more questions`.
- Main title and subtitle use `Instrument Serif`.
- Eyebrow, helper line, questions, and answers use `Plus Jakarta Sans`.
- Questions are displayed inside a bordered scrollable panel.
- The scrollable panel has a visible light-blue border and custom scrollbar treatment.
- Accordion items use card-like UI:
  - White surface.
  - Rounded border.
  - Space between items.
  - Question text in dark blue.
  - Answer text in muted blue-gray.
- Default open item should be the first question.
- Only one accordion item should be open at a time unless product feedback asks for multiple open answers.
- Accordion content remains real text in the DOM for SEO.
- Accordion is keyboard accessible through Radix/shadcn primitives.
- Mobile layout keeps the same stacked structure with larger readable text and a constrained scroll area.
- Motion respects `prefers-reduced-motion`.
- Prefer semantic Tailwind tokens over repeated literal colors.
- Prefer shadcn components where useful.
- Keep implementation SEO-friendly and performance-focused.

## Proposed File Changes

### `src/app/globals.css`

Add semantic FAQ tokens in `:root`, then expose them through `@theme inline`.

Suggested variables:

```css
--faq-background: #ffffff;
--faq-foreground: #274c77;
--faq-accent: #6096ba;
--faq-muted: #7187a9;
--faq-panel-border: #dbe7ef;
--faq-card: #ffffff;
--faq-card-border: #e3edf4;
--faq-scrollbar-track: #edf4f8;
--faq-scrollbar-thumb: #c8d9e6;
--faq-scrollbar-thumb-hover: #a9c3d8;
```

Suggested theme aliases:

```css
--color-faq-background: var(--faq-background);
--color-faq-foreground: var(--faq-foreground);
--color-faq-accent: var(--faq-accent);
--color-faq-muted: var(--faq-muted);
--color-faq-panel-border: var(--faq-panel-border);
--color-faq-card: var(--faq-card);
--color-faq-card-border: var(--faq-card-border);
--color-faq-scrollbar-track: var(--faq-scrollbar-track);
--color-faq-scrollbar-thumb: var(--faq-scrollbar-thumb);
--color-faq-scrollbar-thumb-hover: var(--faq-scrollbar-thumb-hover);
```

Add a small reusable scrollbar utility if Tailwind classes alone are too verbose.

Suggested utility:

```css
.faq-scrollbar {
  scrollbar-color: var(--faq-scrollbar-thumb) var(--faq-scrollbar-track);
  scrollbar-width: thin;
}

.faq-scrollbar::-webkit-scrollbar {
  width: 10px;
}

.faq-scrollbar::-webkit-scrollbar-track {
  background: var(--faq-scrollbar-track);
}

.faq-scrollbar::-webkit-scrollbar-thumb {
  background: var(--faq-scrollbar-thumb);
  border-radius: 999px;
}

.faq-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--faq-scrollbar-thumb-hover);
}
```

Implementation notes:

- Use classes like `bg-faq-background`, `text-faq-foreground`, `text-faq-accent`, `text-faq-muted`, and `border-faq-panel-border`.
- Keep section-specific tokens near the existing section tokens.
- Avoid arbitrary hex values in JSX.
- Add only the custom scrollbar CSS needed for the FAQ panel.

### `src/components/ui/accordion.tsx`

Add the shadcn Accordion component.

Preferred implementation path:

```bash
pnpm dlx shadcn@latest add accordion
```

Implementation notes:

- Keep the generated shadcn primitive generic.
- Do not bake FAQ-specific styling into the shared UI primitive.
- Use `Accordion`, `AccordionItem`, `AccordionTrigger`, and `AccordionContent` in the section component.
- If the generated trigger includes the default chevron, style it through class names from the FAQ component.

### `src/components/faq-section.tsx`

Create a dedicated server component for the FAQ section.

Implementation notes:

- Keep this component server-rendered. The shadcn Accordion can manage interaction through Radix without custom client state if generated as a client primitive.
- Use a local typed constant for FAQ content.
- Use semantic HTML:
  - `<section id="faq" aria-labelledby="faq-heading">`
  - `h2` for the visible section title.
  - `Accordion` for the interactive question list.
- Keep all FAQ copy in rendered text for SEO.
- Use `font-display` for the main title and italic subtitle.
- Use `font-sans` for eyebrow, helper text, questions, and answers.
- Use `scroll-mt-20` on the section for sticky navbar offset.
- Use `max-h` plus `overflow-y-auto` on the questions panel so the panel scrolls independently when there are more questions.
- Use enough inner padding that cards do not visually touch the panel border or scrollbar.
- Use `defaultValue={faqs[0]?.id}` so the first item is open on initial render.

Suggested data shape:

```ts
type FaqItem = {
  id: string;
  question: string;
  answer: string[];
};
```

Suggested FAQ content:

```ts
const faqs: FaqItem[] = [
  {
    id: "rec-spe",
    question: "Apa itu REC dan SPE?",
    answer: [
      "REC adalah instrumen berupa sertifikat yang membuktikan bahwa setiap 1 MWh listrik yang dikonsumsi oleh operasional perusahaan Anda berasal dari pembangkit energi terbarukan, seperti tenaga surya, air, atau angin, yang tersertifikasi.",
      "Sedangkan SPE adalah instrumen berupa sertifikat yang membuktikan bahwa perusahaan Anda telah mendanai atau mengompensasi proyek penurunan emisi karbon secara nyata di tempat lain, seperti proyek efisiensi energi atau konservasi hutan.",
    ],
  },
  {
    id: "ghg-accounting",
    question: "Apa hubungannya REC dan SPE ini dengan GHG Accounting?",
    answer: [
      "REC dapat mendukung pelaporan emisi Scope 2 karena berkaitan dengan penggunaan listrik dari sumber energi terbarukan.",
      "SPE dapat membantu strategi kompensasi emisi yang belum dapat dihindari, terutama saat perusahaan menyusun inventaris dan rencana pengurangan emisi berdasarkan prinsip GHG Accounting.",
    ],
  },
  {
    id: "price-calculation",
    question: "Berapa harga 1 unit REC dan 1 unit SPE? Dan bagaimana cara perhitungannya?",
    answer: [
      "Harga REC dan SPE dapat berbeda tergantung volume kebutuhan, jenis instrumen, periode penggunaan, serta ketersediaan sertifikat atau proyek yang relevan.",
      "Perhitungannya dimulai dari konsumsi energi, baseline emisi, target pengurangan emisi, dan kebutuhan pelaporan perusahaan.",
    ],
  },
  {
    id: "purchase-process",
    question: "Bagaimana proses pembelian REC atau SPE melalui PLN EMI?",
    answer: [
      "Tim PLN EMI akan membantu mengidentifikasi kebutuhan perusahaan, memvalidasi data konsumsi atau emisi, menghitung kebutuhan instrumen, lalu menyiapkan rekomendasi dan dokumentasi pendukung.",
    ],
  },
  {
    id: "reporting-use",
    question: "Apakah REC dan SPE dapat digunakan untuk laporan ESG atau sustainability report?",
    answer: [
      "Ya, REC dan SPE dapat menjadi bagian dari bukti pendukung dalam laporan keberlanjutan, laporan ESG, atau komunikasi dekarbonisasi, selama penggunaannya sesuai dengan batasan pelaporan dan metodologi yang digunakan perusahaan.",
    ],
  },
];
```

Suggested component structure:

```tsx
<section id="faq" aria-labelledby="faq-heading">
  <div>
    <div>
      <p>FAQ</p>
      <h2 id="faq-heading">
        <span>Frequently Asked</span>
        <span>Questions</span>
      </h2>
      <p>Hover and scroll to see more questions</p>
    </div>

    <div>
      <Accordion type="single" defaultValue={faqs[0]?.id} collapsible>
        {faqs.map((item) => (
          <AccordionItem value={item.id} key={item.id}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
              {item.answer.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </div>
</section>
```

### `src/app/page.tsx`

Import and render the FAQ section immediately after the Clients section.

Implementation notes:

- Add `import { FaqSection } from "@/components/faq-section"`.
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
  contact placeholder
</main>
```

- Remove the current placeholder `faq` object from the `sections` array to avoid duplicate `id="faq"` values.
- Keep the `contact` placeholder untouched unless a future feature replaces it.
- Verify `#faq` navigation lands comfortably below the sticky navbar.

## Visual Layout Plan

### Desktop

- Section:
  - Full-width white band.
  - Use `bg-faq-background`.
  - Use a centered `max-w-7xl` container.
  - Use generous top padding after Clients, likely `pt-20` to `pt-24`.
  - Use enough bottom padding before Contact, likely `pb-20` to `pb-24`.
- Header:
  - Center aligned.
  - Eyebrow uses uppercase `FAQ`, `text-faq-accent`, bold weight, and moderate tracking.
  - Title uses two lines:
    - `Frequently Asked` in `text-faq-foreground`.
    - `Questions` in `text-faq-accent`, italic.
  - Use `font-display`, large display sizing, and readable line height.
  - Helper line uses `text-faq-accent`, italic, and `font-sans`.
- Questions panel:
  - Place below the header with a large vertical gap.
  - Width around `max-w-5xl` to match the reference.
  - Use border color `border-faq-panel-border`.
  - Use a light bordered frame around the scroll area.
  - Keep panel background white.
  - Use `max-h-[34rem]` or similar so overflow is visible on desktop.
  - Use `overflow-y-auto faq-scrollbar`.
  - Use inner padding around `p-6`.
- Accordion items:
  - Use `rounded-2xl` or the nearest local radius token that matches the reference.
  - Use `border border-faq-card-border`.
  - Use `bg-faq-card`.
  - Use vertical spacing between items, likely `space-y-4`.
  - Trigger has large horizontal padding and comfortable height.
  - Answer content uses a readable text measure and generous line height.
  - Open item has enough bottom padding for multi-paragraph answers.

### Mobile

- Section:
  - Keep a white full-width band.
  - Use `px-6` or the existing page section padding convention.
  - Use `py-16` to keep the section substantial without wasting space.
- Header:
  - Maintain centered alignment.
  - Use responsive title sizes around `text-4xl` to `text-5xl`.
  - Keep the helper line readable and avoid wrapping awkwardly.
- Questions panel:
  - Use full available width.
  - Use a visible panel border.
  - Increase top margin enough to match the reference spacing.
  - Use `max-h-[38rem]` or a viewport-aware max height such as `max-h-[70vh]`.
  - Keep scrollbar visible and usable.
- Accordion items:
  - Use slightly smaller padding than desktop, but keep touch targets at least 44px high.
  - Question text should use `text-xl` or similar on mobile, matching the visual reference.
  - Answer text should be large enough for comfortable reading, likely `text-lg` with relaxed line height.
  - Long questions should wrap cleanly without overlapping the chevron.

## Interaction And Accessibility Plan

- Use shadcn Accordion backed by Radix for keyboard navigation and ARIA attributes.
- Use `type="single"` and `collapsible` unless product decides the first item should never be closed.
- Keep first item open by default to match the reference.
- Ensure each accordion trigger has a clear focus-visible ring.
- Do not hide focus outlines.
- The scrollable panel should be keyboard scrollable when focused.
- Keep visible question text inside the trigger, not hidden behind icons.
- Use a decorative chevron with `aria-hidden` behavior from the shadcn primitive.
- Ensure reduced motion users do not get unnecessary animated transitions. If AccordionContent animation is present, wrap duration utilities with `motion-safe:` or keep the default subtle Radix behavior.
- Keep color contrast high enough for dark blue question text and muted answer text on white.

## SEO And Performance Plan

- Render FAQ content server-side as real text.
- Avoid fetching FAQ data at runtime unless CMS integration is requested later.
- Avoid images and heavy dependencies for this section.
- Use a semantic heading so the FAQ contributes to page structure.
- Consider adding JSON-LD `FAQPage` schema later if the final approved FAQ copy is stable. Keep that out of the first implementation unless requested, because inaccurate structured data is worse than no structured data.
- Keep the component data-driven so copy updates do not require structural changes.

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
  - Header is centered and matches the screenshot hierarchy.
  - Accordion panel width, border, and spacing match the desktop reference.
  - First item is open by default.
  - Additional items are visible below the open item.
  - Panel scrolls and the scrollbar styling appears.
- Visual QA mobile:
  - Header remains centered.
  - The helper line fits without awkward clipping.
  - Accordion cards keep comfortable touch targets.
  - Long questions wrap cleanly.
  - Scroll panel remains usable.
- Accessibility QA:
  - Tab reaches accordion triggers.
  - Enter/Space toggles items.
  - Focus states are visible.
  - Screen reader labels from the shadcn Accordion remain intact.

## Implementation Order

1. Add shadcn `Accordion` primitive.
2. Add FAQ color tokens and scrollbar utility in `src/app/globals.css`.
3. Create `src/components/faq-section.tsx` with typed FAQ data and semantic structure.
4. Replace the `faq` placeholder in `src/app/page.tsx` with `<FaqSection />`.
5. Run lint and build checks.
6. Perform desktop and mobile visual QA against `agent/resources/faq-ui`.
7. Tune spacing, max heights, and typography only where the screenshots show a mismatch.

## Out Of Scope

- Do not implement the FAQ UI as part of this planning task.
- Do not replace the Contact placeholder.
- Do not add CMS or API-driven FAQ management.
- Do not add JSON-LD schema until final FAQ copy is confirmed.
- Do not change navbar behavior unless `#faq` navigation is broken during implementation.
