import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

type AboutBadge = {
  label: string;
  icon: IconName;
  iconClassName: string;
};

const aboutContent = {
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

const badges: AboutBadge[] = [
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

export function AboutUsSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="scroll-mt-20 bg-about-background py-14 sm:py-16 lg:py-24"
      id="about"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-20 lg:px-10">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase text-about-accent sm:text-sm tracking-widest">
            {aboutContent.eyebrow}
          </p>

          <h2
            className="font-display text-4xl leading-none text-about-foreground sm:text-5xl lg:text-5xl xl:text-5xl"
            id="about-heading"
          >
            <span className="block">{aboutContent.title}</span>
            <span className="block italic text-about-accent">
              {aboutContent.subtitle}
            </span>
          </h2>

          <div className="mt-8 space-y-6 text-sm leading-6 text-about-muted lg:text-base lg:leading-6">
            {aboutContent.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <p className="mt-8 text-sm lg:text-base font-bold leading-6 text-about-foreground">
            {aboutContent.closing}
          </p>

          <ul
            aria-label="About PLN EMI focus areas"
            className="mt-8 flex flex-wrap gap-3"
          >
            {badges.map((badge) => {
              return (
                <li key={badge.label}>
                  <Badge
                    className="h-9 gap-2 rounded-full border-transparent bg-about-badge-background px-3 py-1 text-xs font-bold text-about-badge-foreground"
                    variant="secondary"
                  >
                    <DynamicIcon
                      name={badge.icon}
                      aria-hidden="true"
                      className={cn("size-4", badge.iconClassName)}
                      strokeWidth={2}
                    />
                    {badge.label}
                  </Badge>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="order-first lg:order-0">
          <div className="relative aspect-1355/1024 w-full drop-shadow-[0_20px_40px_var(--color-about-image-shadow)]">
            <Image
              alt="PLN EMI sustainability solutions for decarbonization, compliance, energy conservation, circularity, and consulting."
              className="h-full w-full object-contain"
              height={1024}
              sizes="(min-width: 1024px) 48vw, (min-width: 640px) 82vw, 100vw"
              src="/about_us.png"
              width={1355}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
