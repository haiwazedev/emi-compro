export type FooterLink = {
  label: string;
  href: string;
};

export type FooterNavGroup = {
  id: string;
  title: string;
  links: readonly FooterLink[];
};

export type FooterSocialIcon =
  "website" | "linkedin" | "x" | "email" | "youtube";

export type FooterSocialLink = {
  label: string;
  href: string;
  icon: FooterSocialIcon;
};

const footerPlaceholderHref = "#footer";

export const footerContent = {
  companyName: "PT Energy Management Indonesia (Persero)",
  address:
    "Menara Sentraya Lt. 17, Unit A4 & B5, Jl. Iskandarsyah Raya No.1A, Melawai, Kebayoran Baru, Jakarta Selatan 12160",
  emailAddresses: ["emi@pln.co.id", "pemasaran@emipersero.co.id"],
  phone: "021–27881925",
  phoneHref: "tel:+622127881925",
  copyright:
    "© 2026 PT Energy Management Indonesia (Persero). All rights reserved.",
  navGroups: [
    {
      id: "company",
      title: "Company",
      links: [
        { label: "About Us", href: "/about-us" },
        { label: "Our History", href: "/about-us#our-history" },
        { label: "Vision & Mission", href: "/about-us#direction" },
        { label: "Leadership", href: "/about-us#leadership" },
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
  socialLinks: [
    { label: "Company website", href: footerPlaceholderHref, icon: "website" },
    { label: "LinkedIn", href: footerPlaceholderHref, icon: "linkedin" },
    { label: "X", href: footerPlaceholderHref, icon: "x" },
    { label: "Email", href: footerPlaceholderHref, icon: "email" },
    { label: "YouTube", href: footerPlaceholderHref, icon: "youtube" },
  ] satisfies readonly FooterSocialLink[],
};
