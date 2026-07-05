import type { ReactNode } from "react";
import type { IconName } from "lucide-react/dynamic";

export type AboutBadge = {
  label: string;
  icon: IconName;
  iconClassName: string;
};

type AboutContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: ReactNode[];
  closing: string;
};

export const aboutContent: AboutContent = {
  eyebrow: "About Us",
  title: "Decades of Expertise in",
  subtitle: "Sustainable Energy",
  description: [
    <>
      Since 1987,{" "}
      <strong className="font-bold text-about-foreground">
        PT Energy Management Indonesia (EMI)
      </strong>{" "}
      has supported national energy efficiency programs. As part of PLN Group
      since 2021, we manage Green Instruments and Carbon Economic Value across
      the group.
    </>,
    "We deliver practical solutions, from Sustainability Consulting, Energy Audits, and we can even help your company cut emissions through Renewable Energy Certificates (REC) and Greenhouse Gas Emission Reduction Certificates (SPE-GRK).",
  ],
  closing: "Let's move toward a cleaner, more sustainable future together!",
};

export const aboutBadges: AboutBadge[] = [
  {
    label: "Sustainability",
    icon: "leaf",
    iconClassName: "text-about-badge-green",
  },
  {
    label: "Compliance",
    icon: "shield-check",
    iconClassName: "text-about-badge-blue",
  },
  {
    label: "Energy Efficiency",
    icon: "zap",
    iconClassName: "text-about-badge-yellow",
  },
  {
    label: "Climate Action",
    icon: "globe-2",
    iconClassName: "text-about-badge-blue",
  },
];
