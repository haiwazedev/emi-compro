import { aboutBadges, aboutContent } from "@/module/about/content/about";
import { SectionContainer } from "@/shared/components/section-container";
import { SectionIntro } from "@/shared/components/section-intro";
import { Badge } from "@/shared/ui/badge";
import { AboutMetrics } from "./about-metrics";

export function AboutUsSection() {
  return (
    <SectionContainer
      aria-labelledby="about-heading"
      className="py-10 lg:py-16"
      id="about"
      variant="default"
    >
      <SectionIntro
        accent={aboutContent.subtitle}
        action={{ href: "#about", label: "Learn More" }}
        description={aboutContent.description}
        eyebrow={aboutContent.eyebrow}
        headingId="about-heading"
        theme="light"
        title={aboutContent.title}
      />

      <ul
        aria-label="About PLN EMI focus areas"
        className="mt-14 flex flex-wrap gap-2 lg:mt-16"
      >
        {aboutBadges.map((badge) => (
          <li key={badge.label}>
            <Badge
              className="bg-primary text-accent h-auto min-h-10 gap-1.5 rounded-full border-transparent px-4 py-2 text-xs font-bold lg:px-5 lg:text-sm"
              variant="secondary"
            >
              <span aria-hidden="true">{badge.emoji}</span>
              {badge.label}
            </Badge>
          </li>
        ))}
      </ul>

      <div className="border-foreground/20 mt-14 border-t pt-16 lg:mt-16 lg:pt-24">
        <AboutMetrics />
      </div>
    </SectionContainer>
  );
}
