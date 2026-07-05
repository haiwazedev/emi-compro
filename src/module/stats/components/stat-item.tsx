import type { StatItem as StatItemContent } from "@/module/stats/content/stats";
import { cn } from "@/shared/lib/utils";

const STAGGER_DELAY = 80;

type StatItemProps = {
  displayedValue: number;
  index: number;
  prefersReducedMotion: boolean;
  shouldReveal: boolean;
  stat: StatItemContent;
};

export function StatItem({
  displayedValue,
  index,
  prefersReducedMotion,
  shouldReveal,
  stat,
}: StatItemProps) {
  return (
    <li
      aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
      className={cn(
        "text-center transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        shouldReveal ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
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
        <span>{displayedValue}</span>
        <span>{stat.suffix}</span>
      </p>
      <p className="mt-4 text-sm opacity-75 font-bold uppercase leading-tight text-stats-muted sm:text-base md:text-xs lg:text-sm">
        {stat.label}
      </p>
    </li>
  );
}
