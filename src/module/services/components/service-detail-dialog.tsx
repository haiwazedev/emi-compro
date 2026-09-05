"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { ServiceDivision } from "@/module/services/content/services";
import { serviceIconToneClassNames } from "@/module/services/components/service-visuals";
import { ServiceOfferingList } from "@/module/services/components/service-offering-list";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";

type ServiceDetailDialogProps = {
  onCloseAutoFocus: React.ComponentProps<
    typeof DialogContent
  >["onCloseAutoFocus"];
  onNext: () => void;
  onPrevious: () => void;
  service: ServiceDivision;
  serviceCount: number;
  serviceIndex: number;
};

export function ServiceDetailDialog({
  onCloseAutoFocus,
  onNext,
  onPrevious,
  service,
  serviceCount,
  serviceIndex,
}: ServiceDetailDialogProps) {
  const Icon = service.icon;

  return (
    <DialogContent
      aria-describedby="service-dialog-description"
      onCloseAutoFocus={onCloseAutoFocus}
    >
      <DialogHeader className="pr-10">
        <div className="flex items-start gap-3 sm:gap-4">
          <div
            aria-hidden="true"
            className={cn(
              "text-background shadow-foreground/20 flex size-12 shrink-0 items-center justify-center rounded-xl shadow-md",
              serviceIconToneClassNames[service.iconTone],
            )}
          >
            <Icon className="size-6" strokeWidth={2} />
          </div>

          <div className="min-w-0">
            <Badge
              className="bg-primary text-accent border-transparent px-2 py-0.5 text-xs font-bold"
              variant="secondary"
            >
              {service.code}
            </Badge>

            <DialogTitle className="mt-2 text-xl sm:text-2xl">
              {service.title}
            </DialogTitle>
          </div>
        </div>

        <DialogDescription id="service-dialog-description" className="mt-3">
          {service.detailDescription}
        </DialogDescription>
      </DialogHeader>

      <section aria-labelledby="service-scope-heading">
        <h3
          className="text-secondary text-[0.65rem] font-bold tracking-[0.16em] uppercase"
          id="service-scope-heading"
        >
          Service Scope
        </h3>

        <ServiceOfferingList
          ariaLabel={`${service.title} offerings`}
          className="mt-3"
          offerings={service.offerings}
        />
      </section>

      <DialogFooter className="border-foreground/10 mt-1 items-center border-t pt-4 sm:justify-between">
        <Button
          asChild
          className="bg-accent text-background hover:bg-accent/85 focus-visible:ring-secondary/50 rounded-full px-4 text-xs font-bold"
          size="lg"
        >
          <Link href="/contact-us">
            Talk About This Service
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </Button>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <span
            aria-live="polite"
            className="text-secondary text-xs font-semibold tabular-nums"
          >
            {serviceIndex + 1} / {serviceCount}
          </span>

          <div className="flex items-center gap-2">
            <Button
              aria-label="Previous service"
              disabled={serviceIndex === 0}
              onClick={onPrevious}
              size="icon"
              type="button"
              variant="outline"
            >
              <ArrowLeft aria-hidden="true" />
            </Button>
            <Button
              aria-label="Next service"
              disabled={serviceIndex === serviceCount - 1}
              onClick={onNext}
              size="icon"
              type="button"
              variant="outline"
            >
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </DialogFooter>
    </DialogContent>
  );
}
