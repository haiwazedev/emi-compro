"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import type { ServiceDivision } from "@/module/services/content/services";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
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
  service: ServiceDivision;
};

export function ServiceDetailDialog({
  onCloseAutoFocus,
  service,
}: ServiceDetailDialogProps) {
  const Icon = service.icon;
  const [activeTagIndex, setActiveTagIndex] = React.useState(0);
  const activeTag = service.offerings[activeTagIndex];
  const tagCount = service.offerings.length;

  return (
    <DialogContent
      aria-describedby="service-dialog-description"
      className="flex h-auto max-h-[calc(100dvh-2rem)] flex-col gap-6 rounded-3xl p-6 lg:gap-8 lg:p-10"
      closeButtonClassName="top-4 right-4 size-8 lg:top-6 lg:right-6 lg:size-10 [&_svg]:size-5!"
      onCloseAutoFocus={onCloseAutoFocus}
    >
      <DialogHeader className="mt-8 gap-4 md:mt-0 lg:gap-8 lg:pr-8">
        <div className="flex items-center gap-2 lg:gap-7">
          <div
            aria-hidden="true"
            className="from-secondary to-accent text-background shadow-foreground/20 flex size-12 items-center justify-center rounded bg-linear-to-br shadow-md lg:size-20 lg:rounded-2xl"
          >
            <Icon className="size-4 lg:size-14" strokeWidth={1.75} />
          </div>

          <div className="min-w-0 flex-1 pr-8">
            <Badge
              className="bg-primary text-accent h-auto rounded-full border-transparent text-xs font-semibold lg:px-3 lg:py-2 lg:text-sm"
              variant="secondary"
            >
              {service.title} · {service.code}
            </Badge>

            <DialogTitle className="mt-1 text-xl leading-tight lg:mt-2 lg:text-3xl">
              {activeTag?.label ?? service.title}
            </DialogTitle>
          </div>
        </div>

        <DialogDescription
          aria-live="polite"
          className="text-secondary text-justify text-xs leading-6 lg:text-base"
          id="service-dialog-description"
        >
          {activeTag?.description ?? service.detailDescription}
        </DialogDescription>
      </DialogHeader>

      <Carousel
        aria-label={`${service.title} service images`}
        className="relative min-h-0 flex-1 overflow-hidden"
        opts={{ loop: false }}
      >
        <CarouselContent className="ml-0">
          {service.detailImages.map((image) => (
            <CarouselItem className="pl-0" key={image.src}>
              <figure className="bg-primary/40 relative aspect-video max-h-[40dvh] w-full rounded-2xl">
                <Image
                  className="object-contain"
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 75vw, calc(100vw - 3rem)"
                  src={image.src}
                />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          aria-label="Previous image"
          className="border-secondary/25 bg-background/90 text-accent hover:bg-background top-1/2 bottom-auto left-3 my-0 size-10 rounded-lg lg:left-4"
          size="icon-lg"
        />
        <CarouselNext
          aria-label="Next image"
          className="border-secondary/25 bg-background/90 text-accent hover:bg-background top-1/2 right-3 bottom-auto my-0 size-10 rounded-lg lg:right-4"
          size="icon-lg"
        />
      </Carousel>

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
            aria-label={`Service tag ${activeTagIndex + 1} of ${tagCount}`}
            aria-live="polite"
            className="text-secondary text-sm font-semibold tabular-nums lg:text-base"
          >
            {tagCount > 0 ? `${activeTagIndex + 1} / ${tagCount}` : "0 / 0"}
          </span>

          <nav
            aria-label="Service tag navigation"
            className="flex items-center gap-3"
          >
            <Button
              aria-label="Previous service tag"
              className="border-secondary/25 text-accent size-10 rounded-lg disabled:pointer-events-none disabled:opacity-100"
              disabled={tagCount === 0 || activeTagIndex === 0}
              onClick={() =>
                setActiveTagIndex((currentIndex) =>
                  Math.max(0, currentIndex - 1),
                )
              }
              size="icon-lg"
              type="button"
              variant="outline"
            >
              <ArrowLeft aria-hidden="true" className="size-6" />
            </Button>
            <Button
              aria-label="Next service tag"
              className="border-secondary/25 text-accent size-10 rounded-lg disabled:pointer-events-none disabled:opacity-100"
              disabled={tagCount === 0 || activeTagIndex === tagCount - 1}
              onClick={() =>
                setActiveTagIndex((currentIndex) =>
                  Math.min(tagCount - 1, currentIndex + 1),
                )
              }
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
