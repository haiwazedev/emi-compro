import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  FileText,
  Leaf,
  Mail,
  Newspaper,
  Recycle,
  ShieldCheck,
  Zap,
} from "lucide-react";

export type ServiceDivision = {
  title: string;
  code: string;
  icon: LucideIcon;
  iconTone: "blue" | "green" | "yellow" | "slate";
  description: string;
  href: string;
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
    href: "#services",
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
    href: "#contact",
  },
];

export const serviceDivisions: ServiceDivision[] = [
  {
    title: "Decarbonization Strategy Solutions",
    code: "DSS",
    icon: Leaf,
    iconTone: "blue",
    description:
      "PLN EMI helps organizations transition to eco-friendly energy through carbon investment management and renewable energy solutions.",
    href: "#contact",
  },
  {
    title: "Energy Conservation Solutions",
    code: "ECS",
    icon: Zap,
    iconTone: "yellow",
    description:
      "PLN EMI integrates energy audits, power plant performance testing, ISO 50001 consulting, and green building solutions to improve efficiency.",
    href: "#contact",
  },
  {
    title: "Waste Circularity Solutions",
    code: "WCS",
    icon: Recycle,
    iconTone: "green",
    description:
      "PLN EMI helps industries transform waste into resources through practical circular economy strategies and innovative FABA solutions.",
    href: "#contact",
  },
  {
    title: "Sustainability Consulting Solutions",
    code: "SCS",
    icon: BarChart3,
    iconTone: "slate",
    description:
      "PLN EMI provides sustainability consulting to help organizations navigate modern standards, ESG reporting, and long-term climate goals.",
    href: "#contact",
  },
  {
    title: "Environment Compliance Solutions",
    code: "EnCS",
    icon: ShieldCheck,
    iconTone: "blue",
    description:
      "PLN EMI provides comprehensive environmental compliance support across waste management, auditing, permits, and monitoring reports.",
    href: "#contact",
  },
];
