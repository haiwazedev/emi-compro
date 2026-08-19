import { aboutBadges, aboutContent } from "@/module/about/content/about";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { AboutMetrics } from "./about-metrics";

export function AboutUsSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="scroll-mt-20 bg-about-background p-10 lg:p-16"
      id="about"
    >
      <div className="mx-auto max-w-sm px-6 lg:max-w-screen-2xl lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
          <div className="lg:basis-1/3 lg:shrink-0">
            <p className="text-xs font-bold uppercase tracking-widest text-about-accent sm:text-sm">
              {aboutContent.eyebrow}
            </p>

            <h2
              className="mt-5 flex flex-wrap gap-x-2 font-sans text-3xl font-bold leading-none tracking-tight text-about-foreground lg:text-5xl"
              id="about-heading"
            >
              <span>{aboutContent.title}</span>
              <span className="text-about-accent">{aboutContent.subtitle}</span>
            </h2>
          </div>

          <p className="mt-6 min-w-0 text-xs lg:text-base leading-7 text-about-muted lg:mt-0 lg:flex-1 lg:leading-9">
            {aboutContent.description}
          </p>

          <Button
            asChild
            className="mt-6 h-14 w-full justify-start gap-4 rounded-full border-about-foreground bg-transparent px-7 text-base font-semibold text-about-foreground hover:bg-about-foreground hover:text-about-background lg:mt-0 lg:w-auto lg:shrink-0 lg:px-9"
            variant="outline"
          >
            <a href="#about">
              <span>Learn More</span>
              <ArrowRightIcon aria-hidden="true" />
            </a>
          </Button>
        </div>

        <ul
          aria-label="About PLN EMI focus areas"
          className="mt-14 flex flex-wrap gap-2 lg:mt-16"
        >
          {aboutBadges.map((badge) => (
            <li key={badge.label}>
              <Badge
                className="h-auto min-h-10 gap-1.5 rounded-full border-transparent bg-about-badge-background px-4 py-2 text-xs font-bold text-about-badge-foreground lg:px-5 lg:text-sm"
                variant="secondary"
              >
                <span aria-hidden="true">{badge.emoji}</span>
                {badge.label}
              </Badge>
            </li>
          ))}
        </ul>

        <div className="mt-14 border-t border-about-divider pt-16 lg:mt-16 lg:pt-24">
          <AboutMetrics />
        </div>
      </div>
    </section>
  );
}
