"use client";

import { stats } from "@/module/stats/content/stats";

import { StatItem } from "./stat-item";
import { useCountUpStats } from "../hooks/use-count-up-stats";

export function StatsSection() {
  const { displayedValues, prefersReducedMotion, sectionRef, shouldReveal } =
    useCountUpStats();

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
            <StatItem
              displayedValue={displayedValues[index]}
              index={index}
              key={stat.label}
              prefersReducedMotion={prefersReducedMotion}
              shouldReveal={shouldReveal}
              stat={stat}
            />
          ))}
        </ul>
      </div>

      <p className="absolute bottom-5 right-5 text-xs opacity-75 font-bold text-stats-muted sm:bottom-4 sm:right-8 lg:right-10">
        *Since 1987
      </p>
    </section>
  );
}
