"use client";

import * as React from "react";

import { stats } from "@/module/stats/content/stats";
import { useInViewOnce } from "@/shared/hooks/use-in-view-once";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";

const COUNT_UP_DURATION = 1400;
const targetValues = stats.map((stat) => stat.value);
const zeroValues = stats.map(() => 0);

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);
const subscribeToHydration = () => () => {};
const getHydratedSnapshot = () => true;
const getServerHydratedSnapshot = () => false;

export function useCountUpStats() {
  const hasAnimatedRef = React.useRef(false);
  const hasHydrated = React.useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerHydratedSnapshot,
  );
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref: sectionRef, hasEntered: hasEnteredViewport } =
    useInViewOnce<HTMLElement>({
      enabled: hasHydrated && !prefersReducedMotion,
      rootMargin: "0px 0px -15% 0px",
      threshold: 0.25,
    });
  const hasEntered = hasEnteredViewport || prefersReducedMotion;
  const [displayedValues, setDisplayedValues] =
    React.useState<number[]>(targetValues);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      hasAnimatedRef.current = true;
      queueMicrotask(() => {
        setDisplayedValues(targetValues);
      });
      return;
    }

    if (!hasEntered) {
      queueMicrotask(() => {
        setDisplayedValues(zeroValues);
      });
    }
  }, [hasEntered, prefersReducedMotion]);

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

  return {
    displayedValues,
    prefersReducedMotion,
    sectionRef,
    shouldReveal: !hasHydrated || hasEntered || prefersReducedMotion,
  };
}
