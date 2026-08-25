export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Media & Information", href: "/articles" },
  { label: "Commitment", href: "/commitments" },
  { label: "Contact Us", href: "/#contact" },
];
