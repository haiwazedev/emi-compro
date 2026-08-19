"use client";

import * as React from "react";

import { useInViewOnce } from "@/shared/hooks/use-in-view-once";
import { usePrefersReducedMotion } from "@/shared/hooks/use-prefers-reduced-motion";

const COUNT_UP_DURATION = 1400;

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);
const subscribeToHydration = () => () => {};
const getHydratedSnapshot = () => true;
const getServerHydratedSnapshot = () => false;

export function useCountUpStats<TElement extends Element = HTMLElement>(
  targetValues: readonly number[],
) {
  const hasAnimatedRef = React.useRef(false);
  const zeroValues = React.useMemo(
    () => targetValues.map(() => 0),
    [targetValues],
  );
  const hasHydrated = React.useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerHydratedSnapshot,
  );
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref: sectionRef, hasEntered: hasEnteredViewport } =
    useInViewOnce<TElement>({
      enabled: hasHydrated && !prefersReducedMotion,
      rootMargin: "0px 0px -15% 0px",
      threshold: 0.25,
    });
  const hasEntered = hasEnteredViewport || prefersReducedMotion;
  const [displayedValues, setDisplayedValues] =
    React.useState<number[]>([...targetValues]);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      hasAnimatedRef.current = true;
      queueMicrotask(() => {
        setDisplayedValues([...targetValues]);
      });
      return;
    }

    if (!hasEntered) {
      queueMicrotask(() => {
        setDisplayedValues(zeroValues);
      });
    }
  }, [hasEntered, prefersReducedMotion, targetValues, zeroValues]);

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
        targetValues.map((value) => Math.round(value * easedProgress)),
      );

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animate);
        return;
      }

      hasAnimatedRef.current = true;
      setDisplayedValues([...targetValues]);
    };

    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [hasEntered, prefersReducedMotion, targetValues]);

  return {
    displayedValues,
    metricsRef: sectionRef,
  };
}
