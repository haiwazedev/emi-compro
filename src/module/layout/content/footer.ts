export type FooterLink = {
  label: string;
  href: string;
};

export type FooterNavGroup = {
  id: string;
  title: string;
  links: readonly FooterLink[];
};

const footerPlaceholderHref = "#footer";

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
      id: "services",
      title: "Services",
      links: [
        {
          label: "Decarbonization Strategy",
          href: "/services#decarbonization-strategy",
        },
        {
          label: "Energy Conservation",
          href: "/services#energy-conservation",
        },
        { label: "Waste Circularity", href: "/services#waste-circularity" },
        {
          label: "Sustainability Consulting",
          href: "/services#sustainability-consulting",
        },
        {
          label: "Environment Compliance",
          href: "/services#environment-compliance",
        },
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
    {
      id: "commitment",
      title: "Commitment",
      links: [
        { label: "Certifications", href: "/#commitment" },
        { label: "Corporate Policies", href: "/#commitment" },
        { label: "Sustainability Reports", href: "/#commitment" },
        { label: "Kebijakan Privasi", href: footerPlaceholderHref },
      ],
    },
  ] satisfies readonly FooterNavGroup[],
};
