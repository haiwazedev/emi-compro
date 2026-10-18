import { aboutBadges } from "@/module/about/content/about";
import type { HomeSiteContentData } from "@/module/home/lib/home-content-api";
import { ContentStatus } from "@/shared/components/content-status";
import { SectionContainer } from "@/shared/components/section-container";
import { SectionIntro } from "@/shared/components/section-intro";
import { Badge } from "@/shared/ui/badge";
import { AboutMetrics } from "./about-metrics";

type AboutUsSectionProps = {
  data: HomeSiteContentData | null;
  error: boolean;
};

export function AboutUsSection({ data, error }: AboutUsSectionProps) {
  const { actionLabel, description, title } = data?.teaser ?? {
    actionLabel: null,
    description: null,
    title: null,
  };
  const hasTeaser = Boolean(actionLabel && description && title);

  return (
    <SectionContainer
      aria-labelledby="about-heading"
      className="py-10 lg:py-16"
      id="about"
      variant="default"
    >
      {hasTeaser ? (
        <SectionIntro
          action={{ href: "/about-us", label: actionLabel! }}
          description={description!}
          eyebrow="SEKILAS EMI"
          headingId="about-heading"
          theme="light"
          title={title!}
        />
      ) : (
        <ContentStatus
          description={
            error
              ? "The company introduction is temporarily unavailable. Please try again later."
              : "Company introduction content is not available at this time."
          }
          title={
            error
              ? "Company introduction is unavailable."
              : "No company introduction found."
          }
          variant={error ? "error" : "empty"}
        />
      )}

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
        <AboutMetrics data={data?.statistics ?? []} error={error} />
      </div>
    </SectionContainer>
  );
}
