"use client";

import * as React from "react";

import { serviceDivisions } from "@/module/services/content/services";
import { SectionContainer } from "@/shared/components/section-container";
import { Dialog } from "@/shared/ui/dialog";
import { ServiceDivisionDetailCard } from "./service-division-detail-card";
import { ServiceDetailDialog } from "./service-detail-dialog";

export function ServiceBrowser() {
  const [activeServiceIndex, setActiveServiceIndex] = React.useState<
    number | null
  >(null);
  const activeCardRef = React.useRef<HTMLElement | null>(null);

  const selectedServiceIndex = activeServiceIndex ?? 0;
  const activeService = serviceDivisions[selectedServiceIndex];

  function handleOpenChange(open: boolean) {
    if (!open) {
      setActiveServiceIndex(null);
    }
  }

  function handleOpen(index: number, trigger: HTMLElement) {
    activeCardRef.current = trigger;
    setActiveServiceIndex(index);
  }

  function handleCloseAutoFocus(event: Event) {
    event.preventDefault();
    activeCardRef.current?.focus();
    activeCardRef.current = null;
  }

  function handlePrevious() {
    setActiveServiceIndex((currentIndex) =>
      currentIndex === null ? null : Math.max(0, currentIndex - 1),
    );
  }

  function handleNext() {
    setActiveServiceIndex((currentIndex) =>
      currentIndex === null
        ? null
        : Math.min(serviceDivisions.length - 1, currentIndex + 1),
    );
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
          {serviceDivisions.map((service, index) => (
            <li key={service.slug}>
              <ServiceDivisionDetailCard
                onOpen={(trigger) => handleOpen(index, trigger)}
                service={service}
              />
            </li>
          ))}
        </ul>
      </SectionContainer>

      <Dialog
        open={activeServiceIndex !== null}
        onOpenChange={handleOpenChange}
      >
        <ServiceDetailDialog
          onCloseAutoFocus={handleCloseAutoFocus}
          onNext={handleNext}
          onPrevious={handlePrevious}
          service={activeService}
          serviceCount={serviceDivisions.length}
          serviceIndex={selectedServiceIndex}
        />
      </Dialog>
    </>
  );
}
