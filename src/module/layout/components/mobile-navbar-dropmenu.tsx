import type { NavLink } from "@/module/layout/content/navigation";
import { cn } from "@/shared/lib/utils";
import type { FC } from "react";

type MenuItemProps = {
  href: string;
  label: string;
  onSelect: () => void;
  isSelected?: boolean;
};

const MenuItem: FC<MenuItemProps> = ({ href, label, onSelect, isSelected }) => {
  return (
    <li>
      <a
        className={cn(
          "text-accent hover:bg-accent hover:text-primary focus-visible:ring-secondary block rounded-full px-6 py-4 transition-colors focus-visible:ring-2 focus-visible:outline-none",
          isSelected && "bg-accent text-primary",
        )}
        href={href}
        onClick={onSelect}
      >
        {label}
      </a>
    </li>
  );
};

type MobileNavbarDropmenuProps = {
  isHomeActive?: boolean;
  isOpen: boolean;
  navLinks: NavLink[];
  onClose: () => void;
};

const MobileNavbarDropmenu: FC<MobileNavbarDropmenuProps> = ({
  isHomeActive = false,
  isOpen,
  navLinks,
  onClose,
}) => {
  return (
    <div
      aria-hidden={!isOpen}
      className={cn(
        "flex flex-col overflow-hidden motion-safe:transition-[max-height,opacity,transform] motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none lg:hidden",
        isOpen
          ? "max-h-dvh translate-y-0 opacity-100"
          : "pointer-events-none max-h-0 -translate-y-2 opacity-0",
      )}
      id="mobile-navigation"
      inert={!isOpen}
    >
      <nav
        aria-label="Mobile navigation"
        className="bg-primary flex max-h-dvh flex-col overflow-y-auto px-10 py-4 shadow-sm shadow-foreground/10"
      >
        <ul className="flex flex-col gap-2 font-semibold">
          {navLinks.map((link) => (
            <MenuItem
              href={link.href}
              isSelected={isHomeActive && link.href === "#home"}
              key={link.href}
              label={link.label}
              onSelect={onClose}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavbarDropmenu;
