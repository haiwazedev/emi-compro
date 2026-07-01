"use client";

import * as React from "react";
import Image from "next/image";

import {
  MobileNavbarSheet,
  type NavLink,
} from "@/components/mobile-navbar-sheet";
import { cn } from "@/lib/utils";

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isHomeActive, setIsHomeActive] = React.useState(true);

  React.useEffect(() => {
    const homeSection = document.getElementById("home");

    if (!homeSection) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHomeActive(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px 0px -45% 0px",
        threshold: 0.25,
      }
    );

    observer.observe(homeSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={cn(
        "group/nav sticky top-0 z-50 transition-all duration-500 hover:bg-brand-navbar hover:text-brand-navbar-foreground hover:shadow-sm",
        isHomeActive
          ? "bg-transparent text-home-foreground shadow-none"
          : "bg-brand-navbar text-brand-navbar-foreground shadow-sm"
      )}
    >
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
            className="h-8 w-auto drop-shadow-md transition-[filter] duration-500 group-hover/nav:drop-shadow-none"
            height={1073}
            priority
            src="/danantara_logo.png"
            width={4090}
          />
        </a>

        <div className="hidden items-center gap-9 justify-self-center lg:flex">
          {navLinks.map((link) => (
            <a
              className={cn(
                "relative text-sm font-semibold transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-brand-navbar-action after:transition-transform after:duration-500 hover:after:scale-x-100 group-hover/nav:text-brand-navbar-foreground",
                isHomeActive
                  ? "text-home-foreground drop-shadow-sm"
                  : "text-brand-navbar-foreground"
              )}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 justify-self-end">
          <a aria-label="PLN Energy Management Indonesia home" href="#home">
            <Image
              alt="PLN Energy Management Indonesia"
              className="relative top-1 h-20 w-auto drop-shadow-md transition-[filter] duration-500 group-hover/nav:drop-shadow-none lg:scale-150"
              height={564}
              priority
              src="/pln_logo.png"
              width={800}
            />
          </a>

          <MobileNavbarSheet
            isHomeActive={isHomeActive}
            navLinks={navLinks}
          />
        </div>
      </nav>
    </header>
  );
}
