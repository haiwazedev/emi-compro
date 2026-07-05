"use client";

import { MenuIcon, XIcon } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";

import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import type { NavLink } from "@/module/layout/content/navigation";
import { cn } from "@/shared/lib/utils";

type MobileNavbarSheetProps = {
  navLinks: NavLink[];
  isHomeActive?: boolean;
};

const mobileLinkClassName =
  "relative w-fit text-xl font-semibold text-brand-navbar transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-brand-navbar-action after:transition-transform hover:after:scale-x-100 hover:text-brand-navbar-action duration-700 after:duration-700";

export function MobileNavbarSheet({
  navLinks,
  isHomeActive = false,
}: MobileNavbarSheetProps) {
  const contactLink = navLinks.find((link) => link.label === "Contact");
  const regularLinks = navLinks.filter((link) => link.label !== "Contact");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Open navigation menu"
          className={cn(
            "hover:bg-brand-navbar-action/50 hover:text-brand-navbar-foreground group-hover/nav:text-brand-navbar-foreground lg:hidden",
            isHomeActive
              ? "text-home-foreground drop-shadow-sm"
              : "text-brand-navbar-foreground",
          )}
          size="icon-lg"
          variant="ghost"
        >
          <MenuIcon className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        className="w-72 border-white/30 bg-brand-navbar-glass px-8 py-8 text-brand-navbar-foreground shadow-2xl backdrop-blur-xl"
        side="right"
        showCloseButton={false}
        blurOverlay={false}
      >
        <SheetHeader className="p-0 flex flex-row justify-end">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetPrimitive.Close className={"flex"}>
            <XIcon className="size-6 text-brand-navbar" />
          </SheetPrimitive.Close>
        </SheetHeader>

        <nav
          aria-label="Mobile navigation"
          className="mt-10 flex flex-col gap-7"
        >
          {regularLinks.map((link) => (
            <SheetClose asChild key={link.href}>
              <a className={mobileLinkClassName} href={link.href}>
                {link.label}
              </a>
            </SheetClose>
          ))}
        </nav>

        {contactLink ? (
          <SheetClose asChild>
            <Button
              asChild
              className={cn(
                "mt-8 h-12 rounded-full bg-brand-navbar-action px-8 text-base font-bold text-brand-navbar-foreground",
                "hover:bg-brand-navbar hover:text-brand-navbar-foreground",
              )}
            >
              <a href={contactLink.href}>{contactLink.label}</a>
            </Button>
          </SheetClose>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
