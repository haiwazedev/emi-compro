"use client";

import * as React from "react";

import type { HomeStatistic } from "@/module/home/content/home";
import { ContentStatus } from "@/shared/components/content-status";
import { useCountUpStats } from "@/module/stats/hooks/use-count-up-stats";

type AboutMetricsProps = {
  data: HomeStatistic[];
  error: boolean;
};

export function AboutMetrics({ data, error }: AboutMetricsProps) {
  const numericMetrics = React.useMemo(
    () => data.map((metric) => /^\d+$/.test(metric.number)),
    [data],
  );
  const metricValues = React.useMemo(
    () =>
      data.map((metric, index) =>
        numericMetrics[index] ? Number(metric.number) : 0,
      ),
    [data, numericMetrics],
  );
  const { displayedValues, metricsRef } =
    useCountUpStats<HTMLDivElement>(metricValues);

  if (data.length === 0) {
    return (
      <ContentStatus
        description={
          error
            ? "Company statistics are temporarily unavailable. Please try again later."
            : "Company statistics are not available at this time."
        }
        title={
          error
            ? "Company statistics are unavailable."
            : "No company statistics found."
        }
        variant={error ? "error" : "empty"}
      />
    );
  }

  return (
    <div ref={metricsRef}>
      <ul className="flex flex-col gap-14 lg:flex-row lg:gap-16">
        {data.map((metric, index) => (
          <li
            aria-label={`${metric.label}: ${metric.number}. ${metric.description}`}
            className="text-left lg:min-w-0 lg:flex-1"
            key={metric.id}
          >
            <p className="text-secondary text-xs font-bold tracking-widest uppercase sm:text-sm">
              {metric.label}
            </p>

            <p className="text-accent mt-6 font-sans text-5xl leading-none font-bold tracking-tight lg:text-7xl">
              <span aria-hidden="true">
                {numericMetrics[index] ? displayedValues[index] : metric.number}
              </span>
              <span className="sr-only">{metric.number}</span>
            </p>

            <p className="text-foreground/70 mt-5 max-w-xl text-sm leading-6 lg:leading-8">
              {metric.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
