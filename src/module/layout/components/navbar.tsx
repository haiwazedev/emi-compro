"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { navLinks } from "@/module/layout/content/navigation";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import LanguageSwitcher from "./language-switcher";
import MobileNavbarDropmenu from "./mobile-navbar-dropmenu";

export function Navbar() {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about-us";
  const isServicesPage = pathname === "/services";
  const isArticlesPage =
    pathname === "/articles" || pathname.startsWith("/articles/");
  const isHomePage = pathname === "/";
  const [isHomeSectionActive, setIsHomeSectionActive] = React.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const homeSection = document.getElementById("home");

    if (!homeSection) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHomeSectionActive(entry.isIntersecting);
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
  }, [isHomePage]);

  const isHomeActive = isHomePage && isHomeSectionActive;
  const activeHref = isAboutPage
    ? "/about-us"
    : isServicesPage
      ? "/services"
      : isArticlesPage
        ? "/articles"
        : isHomeActive
          ? "/"
          : null;

  return (
    <header
      className={cn(
        "group/nav hover:bg-primary hover:text-accent hover:shadow-foreground/10 sticky top-0 z-50 transition-all duration-500 hover:shadow-sm",
        isHomeActive && !isMobileMenuOpen
          ? "text-background bg-transparent shadow-none"
          : "text-accent bg-primary shadow-foreground/10 shadow-sm",
      )}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-10 py-4 lg:justify-start"
      >
        <Link
          aria-label="Danantara Indonesia home"
          className="min-w-0 shrink-0 justify-self-start"
          href="/"
        >
          <Image
            alt="Danantara Indonesia"
            className="drop-shadow-foreground/25 h-7 w-auto drop-shadow-md transition-[filter] duration-500 group-hover/nav:drop-shadow-none sm:h-8"
            height={1073}
            priority
            src="/danantara_logo.png"
            width={4090}
          />
        </Link>

        <div className="hidden min-w-0 flex-1 items-center gap-1.5 px-6 lg:flex">
          {navLinks.map((link) => {
            const isActive = link.href === activeHref;

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "hover:bg-accent hover:text-primary relative rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                  isActive && !isHomeActive
                    ? "bg-accent text-primary"
                    : isHomeActive
                      ? "text-background drop-shadow-foreground/30 group-hover/nav:text-accent drop-shadow-sm"
                      : "text-accent",
                )}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <LanguageSwitcher />

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <Link
              aria-label="PLN Energy Management Indonesia home"
              href="/"
              className="hidden gap-2 lg:flex"
            >
              <div className="relative aspect-square w-12">
                <Image
                  alt="PLN Energy Management Indonesia"
                  fill
                  priority
                  src="/pln-logo.svg"
                />
              </div>
              <div className="flex flex-col items-start text-xs font-bold">
                <span>PLN</span>
                <span>Energy Management</span>
                <span>Indonesia</span>
              </div>
            </Link>

            <Button
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              className={cn(
                "hover:text-accent group-hover/nav:text-accent bg-transparent hover:cursor-pointer hover:bg-transparent lg:hidden",
                isHomeActive && !isMobileMenuOpen
                  ? "text-background drop-shadow-foreground/30 drop-shadow-sm"
                  : "text-accent",
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
        activeHref={activeHref ?? undefined}
        isOpen={isMobileMenuOpen}
        navLinks={navLinks}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
