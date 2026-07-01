import Image from "next/image";

import {
  MobileNavbarSheet,
  type NavLink,
} from "@/components/mobile-navbar-sheet";

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const navLinkClassName =
  "relative text-sm font-semibold text-brand-navbar-foreground transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-brand-navbar-action after:transition-transform hover:after:scale-x-100 after:duration-500";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-brand-navbar text-brand-navbar-foreground shadow-sm">
      <nav
        aria-label="Primary navigation"
        className="mx-auto grid h-20 w-full max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-6 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:px-10"
      >
        <a
          aria-label="Danantara Indonesia home"
          className="min-w-0 justify-self-start"
          href="#home"
        >
          <Image
            alt="Danantara Indonesia"
            className="h-8 w-auto"
            height={1073}
            priority
            src="/danantara_logo.png"
            width={4090}
          />
        </a>

        <div className="hidden items-center gap-9 justify-self-center lg:flex">
          {navLinks.map((link) => (
            <a className={navLinkClassName} href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 justify-self-end">
          <a aria-label="PLN Energy Management Indonesia home" href="#home">
            <Image
              alt="PLN Energy Management Indonesia"
              className="h-20 w-auto lg:scale-150 relative top-1"
              height={564}
              priority
              src="/pln_logo.png"
              width={800}
            />
          </a>

          <MobileNavbarSheet navLinks={navLinks} />
        </div>
      </nav>
    </header>
  );
}
