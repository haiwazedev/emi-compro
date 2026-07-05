"use client";

import * as React from "react";

type UseInViewOnceOptions = {
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number;
};

export function useInViewOnce<TElement extends Element>({
  enabled = true,
  rootMargin = "0px",
  threshold = 0,
}: UseInViewOnceOptions = {}) {
  const ref = React.useRef<TElement>(null);
  const [hasEntered, setHasEntered] = React.useState(false);

  React.useEffect(() => {
    if (!enabled || hasEntered) {
      return;
    }

    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setHasEntered(true);
        observer.disconnect();
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [enabled, hasEntered, rootMargin, threshold]);

  return { ref, hasEntered };
}
