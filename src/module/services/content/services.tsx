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
  slug: string;
  icon: LucideIcon;
  iconTone: "blue" | "green" | "yellow" | "slate";
  description: string;
  detailDescription: string;
  offerings: readonly string[];
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

export const serviceDivisions: ServiceDivision[] = [
  {
    title: "Decarbonization Strategy Solutions",
    code: "DSS",
    slug: "decarbonization-strategy",
    icon: Leaf,
    iconTone: "blue",
    description:
      "PLN EMI helps organizations transition to eco-friendly energy through carbon investment management and renewable energy solutions.",
    detailDescription:
      "PLN EMI is ready to assist companies in transitioning to eco-friendly energy through Carbon Investment Management, the utilization of Renewable Energy Certificates (REC), and the reliable supply of eco-friendly fuel (Biomass). We help companies reduce emission pollution seamlessly while meeting internationally recognized environmental standards.",
    offerings: [
      "Green Attribute (ERPA)",
      "Renewable Energy Certificate (REC)",
      "Biomass Supply",
    ],
    href: "/services#decarbonization-strategy",
  },
  {
    title: "Energy Conservation Solutions",
    code: "ECS",
    slug: "energy-conservation",
    icon: Zap,
    iconTone: "yellow",
    description:
      "PLN EMI integrates energy audits, power plant performance testing, ISO 50001 consulting, and green building solutions to improve efficiency.",
    detailDescription:
      "PLN EMI’s energy conservation services integrate professional Energy Audits, Performance Tests for Power Plants, ISO 50001 Consultation, and Green Building Certification solutions. By combining technical precision with global standards, we drive maximum efficiency and significant energy savings for your business.",
    offerings: [
      "Performance Test for Power Plant",
      "Energy Audit for Power Plant, Building & Data Center",
      "Energy Services Company (ESCO)",
      "Energy Auditor & Energy Manager Certification (BNSP)",
      "Energy Monitoring System as a Service (EnMSaaS)",
      "ISO 50001 Consulting for Certification",
      "Green Building Consulting (EDGE & Greenship)",
    ],
    href: "/services#energy-conservation",
  },
  {
    title: "Waste Circularity Solutions",
    code: "WCS",
    slug: "waste-circularity",
    icon: Recycle,
    iconTone: "green",
    description:
      "PLN EMI helps industries transform waste into resources through practical circular economy strategies and innovative FABA solutions.",
    detailDescription:
      "PLN EMI empowers industries to transform waste into resource through robust circular economy strategies. Our expertise spans innovative Fly Ash Bottom Ash (FABA) Utilization, Sustainable E-Waste Management, and comprehensive Non-Hazardous Waste Solutions. By reimagining waste as an asset, we help your business reduce environmental liabilities and achieve a zero-waste future.",
    offerings: [
      "Fly Ash Bottom Ash (FABA) Utilization",
      "Hazardous & Non-Hazardous Waste Circularity",
      "E-Waste (ATPB) Circularity",
    ],
    href: "/services#waste-circularity",
  },
  {
    title: "Sustainability Consulting Solutions",
    code: "SCS",
    slug: "sustainability-consulting",
    icon: BarChart3,
    iconTone: "slate",
    description:
      "PLN EMI provides sustainability consulting to help organizations navigate modern standards, ESG reporting, and long-term climate goals.",
    detailDescription:
      "PLN EMI provides expert consulting to help organizations navigate modern sustainability standards. Our services include Sustainability Reporting, ESG Ratings, LCA Studies, and GHG Inventories. By implementing rigorous safeguards, we ensure your business remains compliant, transparent, and resilient in an ESG-focused market.",
    offerings: [
      "Sustainability Reporting",
      "GHG Inventories",
      "ESG Rating",
      "LCA Study",
      "Environment & Social Safeguard Consulting",
    ],
    href: "/services#sustainability-consulting",
  },
  {
    title: "Environment Compliance Solutions",
    code: "EnCS",
    slug: "environment-compliance",
    icon: ShieldCheck,
    iconTone: "blue",
    description:
      "PLN EMI provides comprehensive environmental compliance support across waste management, auditing, permits, and monitoring reports.",
    detailDescription:
      "PLN EMI provides comprehensive environmental compliance support designed to safeguard your business against regulatory risks. Our expertise spans the full operational lifecycle, including rigorous Waste Management Permitting, in-depth Environmental Auditing, and the Preparation of Monitoring Reports — enabling your organization to focus on growth while maintaining the highest standards of environmental stewardship.",
    offerings: [
      "Persetujuan Teknis Penyimpanan Limbah B3",
      "Persetujuan Teknis Emisi & SLO Emisi",
      "Rincian Teknis Pengelolaan Limbah Non-B3",
      "Persetujuan Teknis Air Limbah & SLO Air Limbah",
      "Persetujuan Teknis Limbah B3 & SLO Limbah B3",
      "Rincian Teknis & SLO Air Limbah ke Air Laut",
      "Pelaporan Pemantauan & Pengelolaan Lingkungan",
      "Persetujuan Lingkungan / Integrasi",
      "Pengelolaan Limbah B3 & PCBs",
      "Audit Lingkungan Wajib & Sukarela",
      "Dokumen Lingkungan (SPPL, DPLH, DELH, AMDAL, UKL-UPL, PKPLH)",
    ],
    href: "/services#environment-compliance",
  },
];
