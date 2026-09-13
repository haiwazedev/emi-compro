"use client";

import { ArrowLeft, ArrowRight, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

type ServiceDetailDialogProps = {
  onCloseAutoFocus: React.ComponentProps<
    typeof DialogContent
  >["onCloseAutoFocus"];
};

export function ServiceDetailDialog({
  onCloseAutoFocus,
}: ServiceDetailDialogProps) {
  return (
    <DialogContent
      aria-describedby="service-dialog-description"
      className="flex h-auto flex-col gap-6 overflow-hidden rounded-3xl p-6 lg:gap-8 lg:p-10"
      closeButtonClassName="top-4 right-4 size-8 lg:top-6 lg:right-6 lg:size-10 [&_svg]:size-5!"
      onCloseAutoFocus={onCloseAutoFocus}
    >
      <DialogHeader className="mt-4 gap-4 lg:gap-8 lg:pr-8">
        <div className="flex items-center gap-2 lg:gap-7">
          <div
            aria-hidden="true"
            className="from-secondary to-accent text-background shadow-foreground/20 flex size-12 items-center justify-center rounded bg-linear-to-br shadow-md lg:size-20 lg:rounded-2xl"
          >
            <Leaf className="size-4 lg:size-14" strokeWidth={1.75} />
          </div>

          <div className="min-w-0 flex-1 pr-8">
            <Badge
              className="bg-primary text-accent h-auto rounded-full border-transparent text-xs font-semibold lg:px-3 lg:py-2 lg:text-sm"
              variant="secondary"
            >
              Decarbonization Strategy Solutions · DSS
            </Badge>

            <DialogTitle className="mt-1 text-xl leading-tight lg:mt-2 lg:text-3xl">
              Green Attribute (ERPA)
            </DialogTitle>
          </div>
        </div>

        <DialogDescription
          className="text-secondary text-justify text-xs leading-6 lg:text-base"
          id="service-dialog-description"
        >
          Sebuah sertifikat yang merepresentasikan setiap{" "}
          <strong className="font-bold">1 MWh</strong> listrik bersih yang
          dihasilkan oleh pembangkit listrik energi terbarukan PLN dan tercatat
          secara aman di dalam sistem pelacakan.
        </DialogDescription>
      </DialogHeader>

      <figure className="relative aspect-video w-full overflow-hidden">
        <Image
          alt="Diagram alur Green Attribute (ERPA)"
          className="h-auto w-full"
          sizes="(min-width: 1024px) 75vw, calc(100vw - 3rem)"
          src="/service-diagram.png"
          fill
        />
      </figure>

      <DialogFooter className="border-foreground/10 mt-2 flex-col items-stretch gap-5 border-t pt-4 lg:flex-row lg:items-center lg:justify-between">
        <Button
          asChild
          className="bg-accent text-background hover:bg-accent/85 focus-visible:ring-secondary/50 rounded-full px-6 py-6 text-sm font-semibold lg:px-7 lg:text-base"
          size="lg"
        >
          <Link href="/contact-us">
            Konsultasikan Layanan Ini
            <ArrowRight aria-hidden="true" className="size-5" />
          </Link>
        </Button>

        <div className="flex items-center justify-end gap-4 lg:gap-5">
          <span
            aria-label="Slide 1 of 5"
            className="text-secondary text-sm font-semibold tabular-nums lg:text-base"
          >
            1 / 5
          </span>

          <nav
            aria-label="Slide navigation"
            className="flex items-center gap-3"
          >
            <Button
              aria-label="Previous slide"
              className="border-secondary/25 text-accent size-10 rounded-lg disabled:pointer-events-none disabled:opacity-100"
              disabled
              size="icon-lg"
              type="button"
              variant="outline"
            >
              <ArrowLeft aria-hidden="true" className="size-6" />
            </Button>
            <Button
              aria-label="Next slide"
              className="border-secondary/25 text-accent size-10 rounded-lg disabled:pointer-events-none disabled:opacity-100"
              disabled
              size="icon-lg"
              type="button"
              variant="outline"
            >
              <ArrowRight aria-hidden="true" className="size-6" />
            </Button>
          </nav>
        </div>
      </DialogFooter>
    </DialogContent>
  );
}
