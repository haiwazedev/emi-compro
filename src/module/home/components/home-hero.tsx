"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/ui/carousel";
import { homeSlides } from "@/module/home/content/home";

import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { HeroIndicators } from "./hero-indicators";
import { useHeroCarousel } from "../hooks/use-hero-carousel";

export function HomeHero() {
  const {
    activeIndex,
    api,
    copyAnimationClassName,
    copyTransitionState,
    displayedSlide,
    prefersReducedMotion,
    setApi,
    setIsPaused,
  } = useHeroCarousel(homeSlides);

  const handleBlurCapture = (event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsPaused(false);
    }
  };

  return (
    <section
      id="home"
      aria-label="PLN EMI home hero"
      className="relative isolate -mt-20 min-h-svh overflow-hidden bg-brand-navbar-foreground text-home-foreground"
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
          {homeSlides.map((slide) => (
            <CarouselItem className="h-full pl-0" key={slide.image}>
              <span>{slide.mainTitle}</span>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <HeroBackground
        activeIndex={activeIndex}
        prefersReducedMotion={prefersReducedMotion}
        slides={homeSlides}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-home-overlay-start via-home-overlay-mid to-home-overlay-end"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-36 bg-linear-to-b from-slate-950/35 to-transparent"
      />

      <HeroContent
        copyAnimationClassName={copyAnimationClassName}
        copyTransitionState={copyTransitionState}
        displayedSlide={displayedSlide}
      />
      <HeroIndicators
        activeIndex={activeIndex}
        api={api}
        slides={homeSlides}
      />
    </section>
  );
}
