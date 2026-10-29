"use client";

import * as React from "react";

import type { ServiceDivision } from "@/module/services/content/services";
import { ContentStatus } from "@/shared/components/content-status";
import { SectionContainer } from "@/shared/components/section-container";
import { Dialog } from "@/shared/ui/dialog";
import { ServiceDivisionDetailCard } from "./service-division-detail-card";
import { ServiceDetailDialog } from "./service-detail-dialog";
import { useCopy } from "@/i18n/use-copy";

type ServiceBrowserProps = {
  data: ServiceDivision[] | null;
  error: boolean;
};

export function ServiceBrowser({ data, error }: ServiceBrowserProps) {
  const copy = useCopy();
  const [activeSelection, setActiveSelection] = React.useState<{
    offeringId: number | null;
    serviceId: number;
  } | null>(null);
  const activeTriggerRef = React.useRef<HTMLButtonElement | null>(null);
  const activeService = data?.find(
    (service) => service.id === activeSelection?.serviceId,
  );

  function handleOpenChange(open: boolean) {
    if (!open) {
      setActiveSelection(null);
    }
  }

  function handleOpen(
    serviceId: number,
    offeringId: number | null,
    trigger: HTMLButtonElement,
  ) {
    activeTriggerRef.current = trigger;
    setActiveSelection({ offeringId, serviceId });
  }

  function handleCloseAutoFocus(event: Event) {
    event.preventDefault();
    activeTriggerRef.current?.focus();
    activeTriggerRef.current = null;
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
          {copy("Our service divisions")}
        </h2>

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
          <ul className="mx-auto flex flex-col gap-4 lg:gap-5">
            {data.map((service) => (
              <li key={service.id}>
                <ServiceDivisionDetailCard
                  onOpen={(trigger) => handleOpen(service.id, null, trigger)}
                  onOfferingOpen={(offeringId, trigger) =>
                    handleOpen(service.id, offeringId, trigger)
                  }
                  service={service}
                />
              </li>
            ))}
          </ul>
        ) : null}
      </SectionContainer>

      <Dialog open={activeSelection !== null} onOpenChange={handleOpenChange}>
        {activeService ? (
          <ServiceDetailDialog
            initialOfferingId={activeSelection?.offeringId ?? null}
            key={`${activeService.id}-${activeSelection?.offeringId ?? "first"}`}
            onCloseAutoFocus={handleCloseAutoFocus}
            service={activeService}
          />
        ) : null}
      </Dialog>
    </>
  );
}
