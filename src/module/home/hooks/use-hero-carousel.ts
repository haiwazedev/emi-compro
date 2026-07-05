"use client";

import * as React from "react";

import type { CarouselApi } from "@/shared/ui/carousel";
import type { HomeSlide } from "@/module/home/content/home";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";

const AUTOPLAY_INTERVAL = 2000;
const COPY_EXIT_DURATION = 250;

export type CopyTransitionState = "entering" | "exiting";

export function useHeroCarousel(slides: HomeSlide[]) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [displayedIndex, setDisplayedIndex] = React.useState(0);
  const [copyTransitionState, setCopyTransitionState] =
    React.useState<CopyTransitionState>("entering");
  const [isPaused, setIsPaused] = React.useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const syncActiveSlide = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    syncActiveSlide();
    api.on("select", syncActiveSlide);
    api.on("reInit", syncActiveSlide);

    return () => {
      api.off("select", syncActiveSlide);
      api.off("reInit", syncActiveSlide);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api || isPaused || prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      api.scrollNext();
    }, AUTOPLAY_INTERVAL);

    return () => {
      window.clearInterval(timer);
    };
  }, [api, isPaused, prefersReducedMotion, activeIndex]);

  React.useEffect(() => {
    if (activeIndex === displayedIndex) {
      return;
    }

    if (prefersReducedMotion) {
      queueMicrotask(() => {
        setDisplayedIndex(activeIndex);
        setCopyTransitionState("entering");
      });
      return;
    }

    const exitTimer = window.setTimeout(() => {
      setCopyTransitionState("exiting");
    }, 0);
    const swapTimer = window.setTimeout(() => {
      setDisplayedIndex(activeIndex);
      setCopyTransitionState("entering");
    }, COPY_EXIT_DURATION);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(swapTimer);
    };
  }, [activeIndex, displayedIndex, prefersReducedMotion]);

  const displayedSlide = slides[displayedIndex] ?? slides[0];
  const copyAnimationClassName = prefersReducedMotion
    ? "duration-0"
    : copyTransitionState === "exiting"
      ? "animate-out fade-out-0 slide-out-to-bottom-3 duration-300"
      : "animate-in fade-in-0 slide-in-from-bottom-4 duration-700";

  return {
    activeIndex,
    api,
    copyAnimationClassName,
    copyTransitionState,
    displayedSlide,
    prefersReducedMotion,
    setApi,
    setIsPaused,
  };
}
