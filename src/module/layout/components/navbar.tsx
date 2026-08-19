"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { navLinks } from "@/module/layout/content/navigation";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import LanguageSwitcher from "./language-switcher";
import MobileNavbarDropmenu from "./mobile-navbar-dropmenu";

export function Navbar() {
  const [isHomeActive, setIsHomeActive] = React.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
      },
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
        isHomeActive && !isMobileMenuOpen
          ? "bg-transparent text-home-foreground shadow-none"
          : "bg-brand-navbar text-brand-navbar-foreground shadow-sm",
      )}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto px-10 py-4 flex w-full max-w-7xl justify-between lg:justify-start items-center gap-8"
      >
        <a
          aria-label="Danantara Indonesia home"
          className="min-w-0 shrink-0 justify-self-start"
          href="#home"
        >
          <Image
            alt="Danantara Indonesia"
            className="h-7 w-auto drop-shadow-md transition-[filter] duration-500 group-hover/nav:drop-shadow-none sm:h-8"
            height={1073}
            priority
            src="/danantara_logo.png"
            width={4090}
          />
        </a>

        <div className="hidden flex-1 min-w-0 items-center gap-1.5 px-6 lg:flex">
          {navLinks.map((link) => (
            <a
              className={cn(
                "relative text-sm font-semibold transition-colors px-4 py-2 rounded-full hover:text-brand-navbar hover:bg-foreground group-hover/nav:text-brand-navbar-foreground",
                isHomeActive
                  ? "text-home-foreground drop-shadow-sm"
                  : "text-brand-navbar-foreground",
              )}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <LanguageSwitcher />

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <a
              aria-label="PLN Energy Management Indonesia home"
              href="#home"
              className="hidden lg:flex gap-2"
            >
              <div className="relative w-12 aspect-square">
                <Image
                  alt="PLN Energy Management Indonesia"
                  fill
                  priority
                  src="/pln-logo.svg"
                />
              </div>
              <div className="flex flex-col items-start font-bold text-xs">
                <span>PLN</span>
                <span>Energy Management</span>
                <span>Indonesia</span>
              </div>
            </a>

            <Button
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              className={cn(
                "hover:cursor-pointer bg-transparent hover:bg-transparent hover:text-accent lg:hidden group-hover/nav:text-brand-navbar-foreground",
                isHomeActive && !isMobileMenuOpen
                  ? "text-home-foreground drop-shadow-sm"
                  : "text-brand-navbar-foreground",
              )}
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              size="icon-lg"
              type="button"
            >
              {isMobileMenuOpen ? (
                <XIcon aria-hidden="true" className="size-6" />
              ) : (
                <MenuIcon aria-hidden="true" className="size-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      <MobileNavbarDropmenu
        isHomeActive={isHomeActive}
        isOpen={isMobileMenuOpen}
        navLinks={navLinks}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
