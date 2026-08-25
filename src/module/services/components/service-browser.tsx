import { serviceDivisions } from "@/module/services/content/services";
import { SectionContainer } from "@/shared/components/section-container";
import { ServiceDivisionDetailCard } from "./service-division-detail-card";

export function ServiceBrowser() {
  return (
    <SectionContainer
      aria-labelledby="services-browser-heading"
      className="py-12 lg:py-20"
      id="service-browser"
      variant="muted"
    >
      <h2 className="sr-only" id="services-browser-heading">
        Our service divisions
      </h2>

      <ul className="mx-auto flex flex-col gap-4 lg:gap-5">
        {serviceDivisions.map((service) => (
          <li key={service.slug}>
            <ServiceDivisionDetailCard service={service} />
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
