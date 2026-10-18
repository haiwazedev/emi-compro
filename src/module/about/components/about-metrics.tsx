"use client";

import * as React from "react";

import type { HomeStatistic } from "@/module/home/content/home";
import { ContentStatus } from "@/shared/components/content-status";
import { useCountUpStats } from "@/module/stats/hooks/use-count-up-stats";
import { useCopy } from "@/i18n/use-copy";
import { useLocale } from "next-intl";

type AboutMetricsProps = {
  data: HomeStatistic[];
  error: boolean;
};

export function AboutMetrics({ data, error }: AboutMetricsProps) {
  const copy = useCopy();
  const locale = useLocale();
  const numberFormatter = new Intl.NumberFormat(
    locale === "id" ? "id-ID" : "en-US",
  );
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
            ? copy(
                "Company statistics are temporarily unavailable. Please try again later.",
              )
            : copy("Company statistics are not available at this time.")
        }
        title={
          error
            ? copy("Company statistics are unavailable.")
            : copy("No company statistics found.")
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
            aria-label={`${metric.label}: ${numericMetrics[index] ? numberFormatter.format(Number(metric.number)) : metric.number}. ${metric.description}`}
            className="text-left lg:min-w-0 lg:flex-1"
            key={metric.id}
          >
            <p className="text-secondary text-xs font-bold tracking-widest uppercase sm:text-sm">
              {metric.label}
            </p>

            <p className="text-accent mt-6 font-sans text-5xl leading-none font-bold tracking-tight lg:text-7xl">
              <span aria-hidden="true">
                {numericMetrics[index]
                  ? numberFormatter.format(displayedValues[index])
                  : metric.number}
              </span>
              <span className="sr-only">
                {numericMetrics[index]
                  ? numberFormatter.format(Number(metric.number))
                  : metric.number}
              </span>
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
