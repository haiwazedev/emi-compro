export type FooterLink = {
  label: string;
  href: string;
  translateLabel?: boolean;
};

export type FooterNavGroup = {
  id: string;
  title: string;
  links: readonly FooterLink[];
};

export const footerContent = {
  navGroups: [
    {
      id: "company",
      title: "Company",
      links: [
        { label: "About Us", href: "/about-us" },
        { label: "Our History", href: "/about-us#our-history" },
        { label: "Vision & Mission", href: "/about-us#direction" },
        { label: "Management", href: "/about-us#management" },
      ],
    },
    {
      id: "media-information",
      title: "Media & Information",
      links: [
        { label: "News & Articles", href: "/articles" },
        { label: "Press Releases", href: "/articles" },
        { label: "FAQ", href: "/contact-us#faq" },
      ],
    },
  ] satisfies readonly FooterNavGroup[],
};
