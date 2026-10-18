import type { ReactNode } from "react";

import type { HomeSlide } from "@/module/home/content/home";
import { SectionContainer } from "@/shared/components/section-container";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import type { CarouselApi } from "@/shared/ui/carousel";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useCopy } from "@/i18n/use-copy";
import { useLocale } from "next-intl";

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
        "bg-background/55 hover:bg-background focus-visible:ring-secondary focus-visible:ring-offset-accent/40 h-2.5 cursor-pointer rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        isActive ? "bg-primary w-8" : "w-2.5",
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
      className="border-background/60 bg-background/10 text-background hover:bg-background/20 hover:text-background focus-visible:ring-secondary size-12 cursor-pointer rounded-xl"
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
  const copy = useCopy();
  const locale = useLocale();
  const numberFormatter = new Intl.NumberFormat(
    locale === "id" ? "id-ID" : "en-US",
  );
  return (
    <SectionContainer
      as="div"
      className="absolute inset-x-0 bottom-8 z-20"
      contentClassName="flex items-center justify-between gap-4"
      variant="transparent"
    >
      <div className="flex items-center gap-2 rounded-full px-3 py-2">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <HeroIndicatorDotButton
              isActive={isActive}
              key={slide.id}
              label={copy("Show slide {index}: {mainTitle} {subtitle}", {
                index: numberFormatter.format(index + 1),
                mainTitle: slide.mainTitle,
                subtitle: slide.subtitle,
              })}
              onClick={() => api?.scrollTo(index)}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <HeroIndicatorArrowButton
          aria-label={copy("Previous slide")}
          onClick={() => api?.scrollPrev()}
        >
          <ArrowLeftIcon aria-hidden="true" className="size-4" />
        </HeroIndicatorArrowButton>
        <HeroIndicatorArrowButton
          aria-label={copy("Next slide")}
          onClick={() => api?.scrollNext()}
        >
          <ArrowRightIcon aria-hidden="true" className="size-4" />
        </HeroIndicatorArrowButton>
      </div>
    </SectionContainer>
  );
}
