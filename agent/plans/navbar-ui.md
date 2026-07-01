# Navbar UI Implementation Plan

## Source

- Idea: `agent/ideas/navbar-ui.md`
- Design references:
  - `agent/resources/navbar-ui/navbar-desktop.png`
  - `agent/resources/navbar-ui/navbar-mobile.png`
  - `agent/resources/navbar-ui/navbar-mobile-opened.png`
- Logo assets:
  - `public/danantara_logo.png`
  - `public/pln_logo.png`

## Goal

Add a polished sticky top navigation bar to the landing app. The navbar should show the Danantara and PLN logos, desktop menu links, a mobile menu trigger, and a glass-style animated mobile sidebar. The implementation should be simple, maintainable, and aligned with the existing Next.js, Tailwind CSS, and shadcn setup.

## Current Project Context

- App framework: Next.js App Router.
- Styling: Tailwind CSS v4 with CSS variables in `src/app/globals.css`.
- Existing shadcn component: `src/components/ui/button.tsx`.
- Required shadcn component to add or generate: `src/components/ui/sheet.tsx`.
- Existing root font setup: `src/app/layout.tsx` currently wires Geist, Geist Mono, and Inter.
- Current page: `src/app/page.tsx` still contains starter content.
- Available icon library: `lucide-react`.

## Requirements Checklist

- Navbar is sticky at the top while the user scrolls.
- Navbar contains Danantara logo, PLN logo, and menu links.
- Desktop layout shows the menu links inline.
- Mobile layout replaces inline links with an icon action button.
- Mobile menu opens as a sidebar.
- Sidebar slides in and out.
- Sidebar uses a transparent glass-style UI.
- `Contact` appears as button UI in the mobile sidebar.
- Menu links show an animated underline on hover.
- Navbar has a subtle shadow below it.
- Use Plus Jakarta Sans as the main font.
- Use the requested colors:
  - Background: `#e7ecef`
  - Text: `#274c77`
  - Underline: `#274c77`
  - Button background: `#a3cef1`
- Prefer Tailwind variables over repeated custom color literals.
- Prefer shadcn components where useful.

## Proposed File Changes

### `src/app/globals.css`

Add project-level semantic tokens for the navbar colors inside `:root`, then expose them through the `@theme inline` block.

Suggested variables:

```css
--brand-navbar: #e7ecef;
--brand-navbar-foreground: #274c77;
--brand-navbar-action: #a3cef1;
--brand-navbar-glass: rgb(231 236 239 / 72%);
```

Suggested Tailwind theme aliases:

```css
--color-brand-navbar: var(--brand-navbar);
--color-brand-navbar-foreground: var(--brand-navbar-foreground);
--color-brand-navbar-action: var(--brand-navbar-action);
--color-brand-navbar-glass: var(--brand-navbar-glass);
```

This keeps component classes readable, for example `bg-brand-navbar`, `text-brand-navbar-foreground`, and `bg-brand-navbar-action`.

### `src/app/layout.tsx`

Replace the current primary sans font with `Plus_Jakarta_Sans` from `next/font/google`.

Implementation notes:

- Keep Geist Mono only if the app still needs a mono variable.
- Set `Plus_Jakarta_Sans` to `variable: "--font-sans"`.
- Keep the existing `cn(...)` pattern.
- Preserve `html` and `body` structure.

### `src/components/navbar.tsx`

Create a dedicated navbar component.

Implementation notes:

- Keep this component as the main desktop/sticky navbar shell.
- Use `next/image` for both logo assets.
- Use shadcn `Button` for the mobile trigger through the separate mobile sheet component.
- Keep menu data in a small local constant:

```ts
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
```

The exact labels can be adjusted if the landing content defines different sections later.

When rendering the mobile sidebar, do not show `Contact` twice. Either filter it out of the regular vertical mobile link list and render it as the dedicated button, or branch inside the mobile link loop so `Contact` uses button styling while the rest use text-link styling.

### `src/components/mobile-navbar-sheet.tsx`

Create a separate mobile sidebar component powered by shadcn `Sheet`.

Implementation notes:

- Mark this component as a client component if needed by the generated shadcn `Sheet` usage.
- Receive `navLinks` as props from `Navbar` to keep menu data centralized.
- Use:
  - `Sheet`
  - `SheetTrigger`
  - `SheetContent`
  - `SheetHeader`
  - `SheetTitle`
  - `SheetClose`
- Use shadcn `Button` for the menu trigger and mobile `Contact` button.
- Use `Menu` from `lucide-react` for the trigger icon.
- Rely on shadcn `Sheet` for the slide animation, backdrop, focus handling, Escape behavior, and close interactions.
- Customize `SheetContent` with navbar tokens for the glass-style UI.

### `src/components/ui/sheet.tsx`

Add the shadcn Sheet component if it does not already exist.

Preferred implementation path:

```bash
pnpm dlx shadcn@latest add sheet
```

If the CLI is unavailable during implementation, manually add the shadcn Sheet component using the existing project conventions and `radix-ui` dependency setup.

### `src/app/page.tsx`

Import and render the navbar at the top of the page.

Implementation notes:

- Place `<Navbar />` before the main content.
- Keep the navbar outside the primary page content wrapper so `sticky top-0` works predictably.
- Add temporary section anchors only if the implementation needs immediate scroll targets for links. Otherwise, keep hrefs ready for future sections.

## Component Structure

Recommended JSX structure for `Navbar`:

```tsx
<header>
  <nav>
    <a href="/" aria-label="Danantara and PLN home">
      <Image src="/danantara_logo.png" ... />
      <Image src="/pln_logo.png" ... />
    </a>

    <div className="hidden md:flex">
      desktop links
    </div>

    <MobileNavbarSheet navLinks={navLinks} />
  </nav>
</header>
```

Recommended JSX structure for `MobileNavbarSheet`:

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button className="md:hidden" size="icon" variant="ghost">
      <Menu />
    </Button>
  </SheetTrigger>

  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>

    mobile logo group
    mobile navigation links
    contact button
  </SheetContent>
</Sheet>
```

## Desktop UI Plan

- Header classes:
  - `sticky top-0 z-50`
  - `bg-brand-navbar`
  - `text-brand-navbar-foreground`
  - `shadow-sm`
- Inner nav:
  - Full width with a centered max-width container.
  - Use horizontal padding responsive to viewport.
  - Height around `h-16` or `h-20`, depending on logo proportions from the design reference.
- Logo group:
  - Danantara logo should be wider and visually balanced.
  - PLN logo should be smaller and aligned to the same vertical center.
  - Use explicit `width` and `height` on `Image` to avoid layout shift.
- Desktop links:
  - Use `hidden md:flex`.
  - Use consistent gap, likely `gap-8`.
  - Use `relative` link styling with an `after:` pseudo-element for the animated underline.

Suggested link underline behavior:

```txt
after:absolute
after:left-0
after:-bottom-1
after:h-px
after:w-full
after:origin-left
after:scale-x-0
after:bg-brand-navbar-foreground
after:transition-transform
hover:after:scale-x-100
```

## Mobile UI Plan

- Hide desktop links below `md`.
- Render `MobileNavbarSheet` only as the mobile navigation control.
- Use shadcn `Sheet` with `side="right"` for the sidebar.
- Let shadcn `Sheet` handle:
  - slide in/out animation
  - overlay/backdrop
  - Escape key close behavior
  - focus management
  - closing through built-in close controls
- Customize `SheetContent` for the required glass styling:
  - `bg-brand-navbar-glass`
  - `text-brand-navbar-foreground`
  - `backdrop-blur-xl`
  - subtle border using the navbar foreground color at low opacity.
- Sidebar content:
  - Top row with logos and close icon button.
  - Vertical menu links.
  - `Contact` rendered with shadcn `Button` using `bg-brand-navbar-action text-brand-navbar-foreground`.
  - Avoid duplicate `Contact` entries by excluding it from the plain mobile text-link group when rendering it as the button CTA.
- Close behavior:
  - Use `SheetClose` around each mobile link so selecting a destination closes the menu.
  - Use the default shadcn Sheet close button, or style it to match the navbar if the generated component exposes it cleanly.
  - Use the default backdrop and Escape close behavior from Sheet.

## Accessibility Plan

- Mobile menu trigger:
  - `aria-label="Open navigation menu"`
  - `aria-controls="mobile-navigation"`
- Sidebar:
  - `id="mobile-navigation"`
  - Use clear labels for close button and logo home link.
  - Use `SheetTitle`; if the title should be visually hidden, wrap it with the shadcn-compatible visually hidden utility or keep it subtle in the sidebar header.
- Ensure focus-visible styles remain visible through shadcn `Button`.
- Use semantic `<header>` and `<nav aria-label="Main navigation">`.
- Avoid text overlap by using fixed nav height, explicit image sizes, and responsive spacing.

## Styling And Maintainability Rules

- Use CSS variables for the brand colors rather than repeating raw hex values in components.
- Keep component-specific classes local to `Navbar`; avoid global CSS unless creating tokens.
- Keep mobile sidebar logic in `MobileNavbarSheet` so `Navbar` stays focused on layout.
- Use shadcn `Sheet` instead of a hand-rolled sidebar.
- Avoid adding a new animation dependency because shadcn Sheet already provides the needed motion behavior.
- Use lucide icons instead of custom SVGs.
- Use shadcn `Button` for interactive controls.

## Implementation Steps

1. Add navbar color tokens to `src/app/globals.css`.
2. Update `src/app/layout.tsx` to use `Plus_Jakarta_Sans` as `--font-sans`.
3. Add `src/components/ui/sheet.tsx` using shadcn Sheet if it is not already present.
4. Create `src/components/mobile-navbar-sheet.tsx`.
5. Create `src/components/navbar.tsx`.
6. Define `navLinks` in the navbar component and pass them to `MobileNavbarSheet`.
7. Build the sticky desktop navbar layout with logos and animated underline links.
8. Add the mobile menu trigger inside `MobileNavbarSheet` using shadcn `Button`, `SheetTrigger`, and `Menu`.
9. Build the glass `SheetContent` sidebar with logo header, links, and Contact button.
10. Wrap mobile links with `SheetClose` so the sidebar closes after navigation.
11. Import and render `<Navbar />` in `src/app/page.tsx`.
12. Run lint, run a production build, and manually verify responsive behavior.

## Verification Plan

Run:

```bash
pnpm lint
pnpm build
```

Manual checks:

- Desktop viewport:
  - Navbar stays sticky while scrolling.
  - Logos are visible and proportionally balanced.
  - Menu links are horizontally aligned.
  - Link underline animates smoothly on hover.
  - Subtle shadow appears below the navbar.
- Mobile viewport:
  - Inline links are hidden.
  - Menu icon button is visible and tappable.
  - Sidebar slides in and out smoothly.
  - Glass background and blur are visible.
  - `Contact` appears as a button.
  - Backdrop, close icon, and link click all close the menu.
- Accessibility:
  - Trigger has a correct accessible label and works with shadcn Sheet semantics.
  - Keyboard focus is visible.
  - Escape closes the menu through shadcn Sheet behavior.

## Risks And Decisions To Confirm Later

- Exact menu labels are not defined by existing page sections yet, so use common landing-page labels as placeholders unless content sections are added first.
- The current page is still starter content. The navbar can be integrated now, but final anchor behavior depends on future landing sections.
- Logo sizing should be tuned against the provided reference images after the first visual pass.
- Adding shadcn Sheet may require generating a new UI component file. If the CLI cannot run because of network or registry restrictions, manually add the component using the same shadcn style as `Button`.
