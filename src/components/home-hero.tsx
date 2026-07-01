"use client";

import * as React from "react";
import Image from "next/image";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HomeSlide = {
  image: string;
  imageAlt: string;
  mainTitle: string;
  subtitle: string;
  description: string;
};

const slides: HomeSlide[] = [
  {
    image: "/slides/slide_1.png",
    imageAlt: "PLN EMI team member inspecting industrial energy equipment.",
    mainTitle: "Optimizing Power,",
    subtitle: "Empowering The Future",
    description:
      "Energy auditing, performance testing, monitoring systems, ISO certification consulting, and green building solutions for maximum efficiency.",
  },
  {
    image: "/slides/slide_2.png",
    imageAlt:
      "Industrial facility prepared for environmental and energy assessment.",
    mainTitle: "Legal by Design,",
    subtitle: "Green by Nature",
    description:
      "Comprehensive environmental compliance support, from hazardous waste management to environmental auditing and monitoring reports.",
  },
  {
    image: "/slides/slide_3.png",
    imageAlt:
      "Sustainable infrastructure and operational environment supported by PLN EMI.",
    mainTitle: "Cleaner Systems,",
    subtitle: "Stronger Operations",
    description:
      "Practical decarbonization and resource efficiency programs that help organizations improve performance with measurable impact.",
  },
  {
    image: "/slides/slide_4.png",
    imageAlt:
      "Field energy management work supporting sustainable industry in Indonesia.",
    mainTitle: "Measured Impact,",
    subtitle: "Sustainable Growth",
    description:
      "Integrated energy management, circularity, and sustainability consulting for companies building long-term operating resilience.",
  },
];

const AUTOPLAY_INTERVAL = 2000;
const COPY_EXIT_DURATION = 250;

type CopyTransitionState = "entering" | "exiting";

export function HomeHero() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [displayedIndex, setDisplayedIndex] = React.useState(0);
  const [copyTransitionState, setCopyTransitionState] =
    React.useState<CopyTransitionState>("entering");
  const [isPaused, setIsPaused] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

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

  const handleBlurCapture = (event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsPaused(false);
    }
  };

  const displayedSlide = slides[displayedIndex] ?? slides[0];
  const copyAnimationClassName = prefersReducedMotion
    ? "duration-0"
    : copyTransitionState === "exiting"
      ? "animate-out fade-out-0 slide-out-to-bottom-3 duration-300"
      : "animate-in fade-in-0 slide-in-from-bottom-4 duration-700";

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
          {slides.map((slide) => (
            <CarouselItem className="h-full pl-0" key={slide.image}>
              <span>{slide.mainTitle}</span>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <Image
            alt={slide.imageAlt}
            aria-hidden={index !== activeIndex}
            className={cn(
              "object-cover transition-opacity duration-700 ease-out",
              prefersReducedMotion && "duration-0",
              index === activeIndex ? "opacity-100" : "opacity-0",
            )}
            fill
            key={slide.image}
            priority={index === 0}
            sizes="100vw"
            src={slide.image}
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-home-overlay-start via-home-overlay-mid to-home-overlay-end"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-36 bg-linear-to-b from-slate-950/35 to-transparent"
      />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-6 pb-28 pt-32 sm:px-8 sm:pb-32 sm:pt-36 lg:px-10">
        <div className="max-w-4xl">
          <Badge
            className="h-auto rounded-full border-white/20 bg-white/10 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-home-muted shadow-lg backdrop-blur-md"
            variant="outline"
          >
            <span className="size-2 rounded-full bg-home-badge-dot animate-home-badge-pulse mr-1" />
            Powering Indonesia Sustainable Future
          </Badge>

          <div aria-live="polite" className="mt-8">
            <h1
              className={cn(
                "font-display text-6xl leading-[0.95] text-balance sm:text-7xl md:text-8xl xl:text-7xl",
                copyAnimationClassName,
              )}
              key={`title-${displayedSlide.mainTitle}-${copyTransitionState}`}
            >
              <span className="block text-home-foreground">
                {displayedSlide.mainTitle}
              </span>
              <span className="pb-2 block bg-linear-to-r from-home-subtitle-from via-home-subtitle-via to-home-subtitle-to bg-clip-text italic text-transparent">
                {displayedSlide.subtitle}
              </span>
            </h1>
            <p
              className={cn(
                "mt-6 max-w-2xl text-sm leading-8 text-home-muted lg:text-lg",
                copyAnimationClassName,
              )}
              key={`description-${displayedSlide.description}-${copyTransitionState}`}
            >
              {displayedSlide.description}
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3 sm:gap-4">
            <Button
              asChild
              className="h-12 rounded-full bg-home-primary-action px-6 text-sm font-bold text-home-primary-action-foreground shadow-xl hover:bg-home-foreground sm:px-7"
            >
              <a href="#services">Explore Solutions</a>
            </Button>
            <Button
              asChild
              className="h-12 rounded-full border-white/70 bg-white/5 px-6 text-sm font-bold text-home-foreground backdrop-blur-sm hover:bg-white/15 hover:text-home-foreground sm:px-7"
              variant="outline"
            >
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center px-6">
        <div className="flex items-center gap-2 rounded-full bg-slate-950/20 px-3 py-2 backdrop-blur-md">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                aria-current={isActive ? "true" : undefined}
                aria-label={`Show slide ${index + 1}: ${slide.mainTitle} ${
                  slide.subtitle
                }`}
                className={cn(
                  "h-2.5 rounded-full bg-white/55 transition-all duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-home-primary-action focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950/40",
                  isActive ? "w-8 bg-home-primary-action" : "w-2.5",
                )}
                key={slide.image}
                onClick={() => api?.scrollTo(index)}
                type="button"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
