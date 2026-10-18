import { ServiceCard } from "@/module/services/components/service-card";
import { ServiceNavigationItem } from "@/module/services/components/service-navigation-item";
import {
  serviceNavigationItems,
  type ServiceDivision,
} from "@/module/services/content/services";
import { ContentStatus } from "@/shared/components/content-status";
import { SectionContainer } from "@/shared/components/section-container";
import { SectionIntro } from "@/shared/components/section-intro";
import { useCopy } from "@/i18n/use-copy";

type ServicesSectionProps = {
  data: ServiceDivision[] | null;
  error: boolean;
};

export function ServicesSection({ data, error }: ServicesSectionProps) {
  const copy = useCopy();

  return (
    <SectionContainer
      aria-labelledby="services-heading"
      className="py-8 lg:py-20"
      id="services"
      variant="muted"
    >
      <nav aria-label={copy("Service resources")}>
        <ul className="shadow-foreground/10 flex flex-col overflow-hidden rounded-2xl shadow-xl lg:flex-row">
          {serviceNavigationItems.map((item) => (
            <ServiceNavigationItem item={item} key={item.title} />
          ))}
        </ul>
      </nav>

      <SectionIntro
        action={{ href: "/services", label: copy("All Services") }}
        className="mt-16 lg:mt-20"
        description={copy(
          "Explore the expertise and services that can help your organization move forward.",
        )}
        eyebrow={copy("WHAT WE OFFER")}
        headingId="services-heading"
        theme="muted"
        title={copy("Services section title")}
        accent={copy("Services section accent")}
      />

      {error ? (
        <ContentStatus
          description={copy(
            "Service information is currently unavailable. Please try again later.",
          )}
          title={copy("Our service divisions are temporarily unavailable.")}
          variant="error"
        />
      ) : null}

      {!error && data?.length === 0 ? (
        <ContentStatus
          description={copy("Published service divisions will appear here.")}
          title={copy("No service divisions are available yet.")}
          variant="empty"
        />
      ) : null}

      {!error && data && data.length > 0 ? (
        <ul className="mt-10 flex flex-wrap gap-4 lg:mt-12 lg:gap-5">
          {data.map((service) => (
            <li
              className="min-w-0 basis-full lg:basis-[calc((100%-2.5rem)/3)]"
              key={service.id}
            >
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      ) : null}
    </SectionContainer>
  );
}
