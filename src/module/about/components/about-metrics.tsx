"use client";

import { aboutMetrics } from "@/module/about/content/about";
import { useCountUpStats } from "@/module/stats/hooks/use-count-up-stats";

const metricValues = aboutMetrics.map((metric) => metric.value);

export function AboutMetrics() {
  const { displayedValues, metricsRef } =
    useCountUpStats<HTMLDivElement>(metricValues);

  return (
    <div ref={metricsRef}>
      <ul className="flex flex-col gap-14 lg:flex-row lg:gap-16">
        {aboutMetrics.map((metric, index) => (
          <li
            aria-label={`${metric.label}: ${metric.value}${metric.suffix}. ${metric.description}`}
            className="text-left lg:min-w-0 lg:flex-1"
            key={metric.label}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-about-accent sm:text-sm">
              {metric.label}
            </p>

            <p className="mt-6 font-sans text-5xl font-bold leading-none tracking-tight text-black lg:text-7xl">
              <span aria-hidden="true">
                {displayedValues[index]}
                {metric.suffix}
              </span>
              <span className="sr-only">
                {metric.value}
                {metric.suffix}
              </span>
            </p>

            <p className="mt-5 max-w-xl text-sm leading-6 text-about-muted lg:leading-8">
              {metric.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
