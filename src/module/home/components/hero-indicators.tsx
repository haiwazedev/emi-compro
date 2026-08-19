import type { ReactNode } from "react";

import type { HomeSlide } from "@/module/home/content/home";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import type { CarouselApi } from "@/shared/ui/carousel";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

type HeroIndicatorDotButtonProps = {
  isActive: boolean;
  label: string;
  onClick: () => void;
};

function HeroIndicatorDotButton({
  isActive,
  label,
  onClick,
}: HeroIndicatorDotButtonProps) {
  return (
    <button
      aria-current={isActive ? "true" : undefined}
      aria-label={label}
      className={cn(
        "cursor-pointer h-2.5 rounded-full bg-neutral/55 transition-all duration-300 hover:bg-neutral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-home-primary-action focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950/40",
        isActive ? "w-8 bg-background" : "w-2.5",
      )}
      onClick={onClick}
      type="button"
    />
  );
}

type HeroIndicatorArrowButtonProps = {
  "aria-label": string;
  children: ReactNode;
  onClick: () => void;
};

function HeroIndicatorArrowButton({
  "aria-label": ariaLabel,
  children,
  onClick,
}: HeroIndicatorArrowButtonProps) {
  return (
    <Button
      aria-label={ariaLabel}
      className="cursor-pointer size-12 rounded-xl border-neutral/60 bg-neutral/10 text-home-foreground hover:bg-neutral/20 hover:text-home-foreground focus-visible:ring-home-primary-action"
      onClick={onClick}
      size="icon-lg"
      type="button"
      variant="outline"
    >
      {children}
    </Button>
  );
}

type HeroIndicatorsProps = {
  activeIndex: number;
  api: CarouselApi | undefined;
  slides: HomeSlide[];
};

export function HeroIndicators({
  activeIndex,
  api,
  slides,
}: HeroIndicatorsProps) {
  return (
    <div className="absolute inset-x-0 bottom-8 z-20 px-6 sm:px-8 lg:px-14">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-2 rounded-full px-3 py-2">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <HeroIndicatorDotButton
                isActive={isActive}
                key={slide.image}
                label={`Show slide ${index + 1}: ${slide.mainTitle} ${
                  slide.subtitle
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <HeroIndicatorArrowButton
            aria-label="Previous slide"
            onClick={() => api?.scrollPrev()}
          >
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
          </HeroIndicatorArrowButton>
          <HeroIndicatorArrowButton
            aria-label="Next slide"
            onClick={() => api?.scrollNext()}
          >
            <ArrowRightIcon aria-hidden="true" className="size-4" />
          </HeroIndicatorArrowButton>
        </div>
      </div>
    </div>
  );
}
