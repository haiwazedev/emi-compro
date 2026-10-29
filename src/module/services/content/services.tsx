import type { LucideIcon } from "lucide-react";
import { FileText, Leaf, Mail, Newspaper } from "lucide-react";

export type ServiceDivision = {
  code: string;
  description: string | null;
  href: string;
  iconSvg: string | null;
  iconTone: "blue" | "green" | "yellow" | "slate";
  id: number;
  offerings: readonly ServiceOffering[];
  slug: string;
  title: string;
};

export type ServiceDetailImage = {
  alt: string;
  description: string | null;
  src: string;
};

export type ServiceOffering = {
  id: number;
  images: readonly ServiceDetailImage[];
  label: string;
};

export type ServiceNavigationItem = {
  eyebrow: string;
  title: string;
  icon: LucideIcon;
  tone: "teal" | "blue" | "navy" | "slate";
  href?: string;
};

export const serviceNavigationItems: ServiceNavigationItem[] = [
  {
    eyebrow: "WHAT WE OFFER",
    title: "Our Service Divisions",
    icon: Leaf,
    tone: "teal",
    href: "/services",
  },
  {
    eyebrow: "NEW · MEDIA & INFORMATION",
    title: "News, Insights & Press Releases",
    icon: Newspaper,
    tone: "blue",
  },
  {
    eyebrow: "NEW · COMMITMENT",
    title: "Certifications, Policies & Reports",
    icon: FileText,
    tone: "navy",
  },
  {
    eyebrow: "GET IN TOUCH",
    title: "Talk to Our Experts",
    icon: Mail,
    tone: "slate",
    href: "/contact-us",
  },
];
