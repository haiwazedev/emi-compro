"use client";

import * as React from "react";

import { serviceDivisions } from "@/module/services/content/services";
import { SectionContainer } from "@/shared/components/section-container";
import { Dialog } from "@/shared/ui/dialog";
import { ServiceDivisionDetailCard } from "./service-division-detail-card";
import { ServiceDetailDialog } from "./service-detail-dialog";

export function ServiceBrowser() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const activeCardRef = React.useRef<HTMLElement | null>(null);

  function handleOpenChange(open: boolean) {
    if (!open) {
      setIsDialogOpen(false);
    }
  }

  function handleOpen(trigger: HTMLElement) {
    activeCardRef.current = trigger;
    setIsDialogOpen(true);
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
                onOpen={handleOpen}
                service={service}
              />
            </li>
          ))}
        </ul>
      </SectionContainer>

      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <ServiceDetailDialog onCloseAutoFocus={handleCloseAutoFocus} />
      </Dialog>
    </>
  );
}
