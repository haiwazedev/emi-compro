"use client";

import * as React from "react";

import type { HomeSlide } from "@/module/home/content/home";
import { ContentStatus } from "@/shared/components/content-status";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";

import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroIndicators } from "./hero-indicators";
import { useHeroCarousel } from "../hooks/use-hero-carousel";
import { useCopy } from "@/i18n/use-copy";

type HomeHeroProps = {
  error: boolean;
  slides: HomeSlide[];
};

export function HomeHero({ error, slides }: HomeHeroProps) {
  const copy = useCopy();
  if (slides.length === 0) {
    return (
      <section
        aria-label={copy("PLN EMI home hero")}
        className="bg-accent text-background relative isolate -mt-20 flex min-h-svh items-center overflow-hidden"
        id="home"
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
          <ContentStatus
            description={
              error
                ? copy(
                    "Home highlights are temporarily unavailable. Please try again later.",
                  )
                : copy("Home highlights are not available at this time.")
            }
            title={
              error
                ? copy("Home highlights are unavailable.")
                : copy("No home highlights found.")
            }
            variant={error ? "error" : "empty"}
          />
        </div>
      </section>
    );
  }

  return <HomeHeroCarousel slides={slides} />;
}

function HomeHeroCarousel({ slides }: { slides: HomeSlide[] }) {
  const {
    activeIndex,
    api,
    copyAnimationClassName,
    copyTransitionState,
    displayedSlide,
    prefersReducedMotion,
    setApi,
    setIsPaused,
  } = useHeroCarousel(slides);
  const copy = useCopy();

  const handleBlurCapture = (event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsPaused(false);
    }
  };

  return (
    <section
      id="home"
      aria-label={copy("PLN EMI home hero")}
      className="bg-accent text-background relative isolate -mt-20 min-h-svh overflow-hidden"
      onBlurCapture={handleBlurCapture}
      onFocusCapture={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Carousel
        className="absolute inset-0 **:data-[slot=carousel-content]:h-full"
        opts={{ loop: true, watchDrag: false }}
        setApi={setApi}
      >
        <CarouselContent className="h-full opacity-0" aria-hidden="true">
          {slides.map((slide) => (
            <CarouselItem className="h-full pl-0" key={slide.id}>
              <span>{slide.mainTitle}</span>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <HeroBackground
        activeIndex={activeIndex}
        prefersReducedMotion={prefersReducedMotion}
        slides={slides}
      />

      <div
        aria-hidden="true"
        className="from-accent-2/80 via-foreground/50 to-accent/20 absolute inset-0 bg-linear-to-r"
      />
      <div
        aria-hidden="true"
        className="from-accent/35 absolute inset-x-0 top-0 h-36 bg-linear-to-b to-transparent"
      />

      <HeroContent
        copyAnimationClassName={copyAnimationClassName}
        copyTransitionState={copyTransitionState}
        displayedSlide={displayedSlide}
      />
      <HeroIndicators activeIndex={activeIndex} api={api} slides={slides} />
    </section>
  );
}
