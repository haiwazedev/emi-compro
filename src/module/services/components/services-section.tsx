import { ArrowRight } from "lucide-react";

import { ServiceCard } from "@/module/services/components/service-card";
import { ServiceNavigationItem } from "@/module/services/components/service-navigation-item";
import {
  serviceDivisions,
  serviceNavigationItems,
} from "@/module/services/content/services";

export function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="scroll-mt-20 bg-services-background px-4 py-8 sm:px-6 lg:px-10 lg:py-20"
      id="services"
    >
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Service resources">
          <ul className="flex flex-col overflow-hidden rounded-2xl shadow-xl lg:flex-row">
            {serviceNavigationItems.map((item) => (
              <ServiceNavigationItem item={item} key={item.title} />
            ))}
          </ul>
        </nav>

        <div className="mt-16 flex flex-col gap-7 lg:mt-20 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="shrink-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-services-accent">
              WHAT WE OFFER
            </p>
            <h2
              className="mt-3 font-sans text-3xl font-bold leading-tight tracking-tight text-services-foreground sm:text-4xl"
              id="services-heading"
            >
              Our Service{" "}
              <span className="text-services-accent">Divisions</span>
            </h2>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-1 lg:gap-10">
            <p className="max-w-xl text-sm leading-7 text-services-muted">
              Five integrated pillars — from decarbonization strategy and energy
              conservation to waste circularity, sustainability consulting, and
              environmental compliance.
            </p>
            <a
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-services-foreground px-5 py-3 text-xs font-bold text-services-foreground transition-colors hover:bg-services-foreground hover:text-neutral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-services-accent/50"
              href="#services"
            >
              All Services
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        </div>

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
      </div>
    </section>
  );
}
