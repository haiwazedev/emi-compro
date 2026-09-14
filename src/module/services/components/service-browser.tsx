"use client";

import * as React from "react";

import { serviceDivisions } from "@/module/services/content/services";
import { SectionContainer } from "@/shared/components/section-container";
import { Dialog } from "@/shared/ui/dialog";
import { ServiceDivisionDetailCard } from "./service-division-detail-card";
import { ServiceDetailDialog } from "./service-detail-dialog";

export function ServiceBrowser() {
  const [activeServiceSlug, setActiveServiceSlug] = React.useState<
    string | null
  >(null);
  const activeCardRef = React.useRef<HTMLElement | null>(null);
  const activeService = serviceDivisions.find(
    (service) => service.slug === activeServiceSlug,
  );

  function handleOpenChange(open: boolean) {
    if (!open) {
      setActiveServiceSlug(null);
    }
  }

  function handleOpen(slug: string, trigger: HTMLElement) {
    activeCardRef.current = trigger;
    setActiveServiceSlug(slug);
  }

  function handleCloseAutoFocus(event: Event) {
    event.preventDefault();
    activeCardRef.current?.focus();
    activeCardRef.current = null;
  }

  return (
    <>
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
              <ServiceDivisionDetailCard
                onOpen={(trigger) => handleOpen(service.slug, trigger)}
                service={service}
              />
            </li>
          ))}
        </ul>
      </SectionContainer>

      <Dialog open={activeServiceSlug !== null} onOpenChange={handleOpenChange}>
        {activeService ? (
          <ServiceDetailDialog
            key={activeService.slug}
            onCloseAutoFocus={handleCloseAutoFocus}
            service={activeService}
          />
        ) : null}
      </Dialog>
    </>
  );
}
