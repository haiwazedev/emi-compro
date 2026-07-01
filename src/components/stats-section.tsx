"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

const stats: StatItem[] = [
  {
    value: 20,
    suffix: "+",
    label: "Years Experience",
  },
  {
    value: 350,
    suffix: "+",
    label: "Projects Delivered*",
  },
  {
    value: 18,
    suffix: "+ TWh",
    label: "REC Delivered",
  },
  {
    value: 8,
    suffix: "+ M tCO2e",
    label: "SPE Delivered",
  },
  {
    value: 150,
    suffix: "+",
    label: "Clients Served",
  },
];

const COUNT_UP_DURATION = 1400;
const STAGGER_DELAY = 80;
const targetValues = stats.map((stat) => stat.value);
const zeroValues = stats.map(() => 0);

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);
const subscribeToHydration = () => () => {};
const getHydratedSnapshot = () => true;
const getServerHydratedSnapshot = () => false;

export function StatsSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const hasAnimatedRef = React.useRef(false);
  const hasEnteredRef = React.useRef(false);
  const hasHydrated = React.useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerHydratedSnapshot,
  );
  const [hasEntered, setHasEntered] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const [displayedValues, setDisplayedValues] =
    React.useState<number[]>(targetValues);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      const shouldReduceMotion = mediaQuery.matches;

      setPrefersReducedMotion(shouldReduceMotion);

      if (shouldReduceMotion) {
        hasAnimatedRef.current = true;
        hasEnteredRef.current = true;
        setDisplayedValues(targetValues);
        setHasEntered(true);
        return;
      }

      if (!hasEnteredRef.current) {
        setDisplayedValues(zeroValues);
      }
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  React.useEffect(() => {
    if (!hasHydrated || hasEntered || prefersReducedMotion) {
      return;
    }

    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        hasEnteredRef.current = true;
        setHasEntered(true);
        observer.disconnect();
      },
      {
        root: null,
        rootMargin: "0px 0px -15% 0px",
        threshold: 0.25,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [hasEntered, hasHydrated, prefersReducedMotion]);

  React.useEffect(() => {
    if (!hasEntered || prefersReducedMotion || hasAnimatedRef.current) {
      return;
    }

    let animationFrameId = 0;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / COUNT_UP_DURATION, 1);
      const easedProgress = easeOutCubic(progress);

      setDisplayedValues(
        stats.map((stat) => Math.round(stat.value * easedProgress)),
      );

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animate);
        return;
      }

      hasAnimatedRef.current = true;
      setDisplayedValues(targetValues);
    };

    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [hasEntered, prefersReducedMotion]);

  const shouldReveal = !hasHydrated || hasEntered || prefersReducedMotion;

  return (
    <section
      aria-labelledby="stats-heading"
      className="border-b border-stats-border bg-stats-background relative"
      id="stats"
      ref={sectionRef}
    >
      <h2 className="sr-only" id="stats-heading">
        PLN EMI impact in numbers
      </h2>

      <div className="relative mx-auto max-w-7xl px-5 py-14 pb-20 sm:px-8 sm:py-12 sm:pb-16 lg:px-10">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-5 md:gap-x-8 md:gap-y-0">
          {stats.map((stat, index) => (
            <li
              aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
              className={cn(
                "text-center transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
                shouldReveal
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0",
              )}
              key={stat.label}
              style={
                shouldReveal && !prefersReducedMotion
                  ? { transitionDelay: `${index * STAGGER_DELAY}ms` }
                  : undefined
              }
            >
              <p
                aria-hidden="true"
                className="font-display text-4xl leading-none whitespace-nowrap text-stats-foreground sm:text-5xl md:text-4xl lg:text-5xl"
              >
                <span>{displayedValues[index]}</span>
                <span>{stat.suffix}</span>
              </p>
              <p className="mt-4 text-sm opacity-75 font-bold uppercase leading-tight text-stats-muted sm:text-base md:text-xs lg:text-sm">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <p className="absolute bottom-5 right-5 text-xs opacity-75 font-bold text-stats-muted sm:bottom-4 sm:right-8 lg:right-10">
        *Since 1987
      </p>
    </section>
  );
}
