import { ServiceCard } from "@/module/services/components/service-card";
import { ServiceNavigationItem } from "@/module/services/components/service-navigation-item";
import {
  serviceDivisions,
  serviceNavigationItems,
} from "@/module/services/content/services";
import { SectionContainer } from "@/shared/components/section-container";
import { SectionIntro } from "@/shared/components/section-intro";

export function ServicesSection() {
  return (
    <SectionContainer
      aria-labelledby="services-heading"
      className="py-8 lg:py-20"
      id="services"
      variant="muted"
    >
      <nav aria-label="Service resources">
        <ul className="shadow-foreground/10 flex flex-col overflow-hidden rounded-2xl shadow-xl lg:flex-row">
          {serviceNavigationItems.map((item) => (
            <ServiceNavigationItem item={item} key={item.title} />
          ))}
        </ul>
      </nav>

      <SectionIntro
        action={{ href: "/services", label: "All Services" }}
        className="mt-16 lg:mt-20"
        description="Five integrated pillars — from decarbonization strategy and energy conservation to waste circularity, sustainability consulting, and environmental compliance."
        eyebrow="WHAT WE OFFER"
        headingId="services-heading"
        theme="muted"
        title="Our Service"
        accent="Divisions"
      />

      <ul className="mt-10 flex flex-wrap gap-4 lg:mt-12 lg:gap-5">
        {serviceDivisions.map((service) => (
          <li
            className="min-w-0 basis-full lg:basis-[calc((100%-2.5rem)/3)]"
            key={service.code}
          >
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
