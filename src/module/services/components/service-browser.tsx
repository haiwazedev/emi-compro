"use client";

import * as React from "react";

import type { ServiceDivision } from "@/module/services/content/services";
import { ContentStatus } from "@/shared/components/content-status";
import { SectionContainer } from "@/shared/components/section-container";
import { Dialog } from "@/shared/ui/dialog";
import { ServiceDivisionDetailCard } from "./service-division-detail-card";
import { ServiceDetailDialog } from "./service-detail-dialog";

type ServiceBrowserProps = {
  data: ServiceDivision[] | null;
  error: boolean;
};

export function ServiceBrowser({ data, error }: ServiceBrowserProps) {
  const [activeServiceId, setActiveServiceId] = React.useState<number | null>(
    null,
  );
  const activeCardRef = React.useRef<HTMLElement | null>(null);
  const activeService = data?.find((service) => service.id === activeServiceId);

  function handleOpenChange(open: boolean) {
    if (!open) {
      setActiveServiceId(null);
    }
  }

  function handleOpen(id: number, trigger: HTMLElement) {
    activeCardRef.current = trigger;
    setActiveServiceId(id);
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

        {error ? (
          <ContentStatus
            description="Service information is currently unavailable. Please try again later."
            title="Our service divisions are temporarily unavailable."
            variant="error"
          />
        ) : null}

        {!error && data?.length === 0 ? (
          <ContentStatus
            description="Published service divisions will appear here."
            title="No service divisions are available yet."
            variant="empty"
          />
        ) : null}

        {!error && data && data.length > 0 ? (
          <ul className="mx-auto flex flex-col gap-4 lg:gap-5">
            {data.map((service) => (
              <li key={service.id}>
                <ServiceDivisionDetailCard
                  onOpen={(trigger) => handleOpen(service.id, trigger)}
                  service={service}
                />
              </li>
            ))}
          </ul>
        ) : null}
      </SectionContainer>

      <Dialog open={activeServiceId !== null} onOpenChange={handleOpenChange}>
        {activeService ? (
          <ServiceDetailDialog
            key={activeService.id}
            onCloseAutoFocus={handleCloseAutoFocus}
            service={activeService}
          />
        ) : null}
      </Dialog>
    </>
  );
}
