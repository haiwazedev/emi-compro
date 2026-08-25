import { ArrowRight } from "lucide-react";

import type { ServiceNavigationItem as ServiceNavigationItemData } from "@/module/services/content/services";
import { cn } from "@/shared/lib/utils";

const navigationToneClassNames: Record<
  ServiceNavigationItemData["tone"],
  string
> = {
  teal: "bg-linear-to-br from-secondary via-secondary/85 to-accent",
  blue: "bg-linear-to-br from-secondary via-accent/85 to-foreground",
  navy: "bg-linear-to-br from-accent via-accent/90 to-foreground",
  slate:
    "bg-linear-to-br from-foreground via-secondary/80 to-accent",
};

type ServiceNavigationItemProps = {
  item: ServiceNavigationItemData;
};

export function ServiceNavigationItem({
  item,
}: ServiceNavigationItemProps) {
  const Icon = item.icon;
  const panelClassName = cn(
    "group relative flex min-h-64 flex-1 flex-col justify-end overflow-hidden p-6 text-background sm:p-8 lg:min-h-80",
    navigationToneClassNames[item.tone],
    item.href &&
      "transition duration-300 hover:brightness-110 motion-reduce:transition-none",
  );

  const panelContent = (
    <>
      <Icon
        aria-hidden="true"
        className="pointer-events-none absolute -right-5 top-5 size-36 text-background/10 transition duration-500 group-hover:scale-105 group-hover:text-background/15 motion-reduce:transition-none"
        strokeWidth={1}
      />
      <div className="relative z-10 max-w-56">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-background/75">
          {item.eyebrow}
        </p>
        <h3 className="mt-3 font-sans text-lg font-bold leading-tight text-background sm:text-xl">
          {item.title}
        </h3>
        <span
          aria-hidden="true"
          className={cn(
            "mt-5 flex size-9 items-center justify-center rounded-full border border-background/70 transition duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none",
            item.href
              ? "text-background"
              : "border-secondary bg-secondary text-background",
          )}
        >
          <ArrowRight className="size-4" strokeWidth={1.75} />
        </span>
      </div>
    </>
  );

  return (
    <li className="flex min-w-0 flex-1">
      {item.href ? (
        <a
          className={cn(
            panelClassName,
            "focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-background",
          )}
          href={item.href}
        >
          {panelContent}
        </a>
      ) : (
        <div className={panelClassName}>{panelContent}</div>
      )}
    </li>
  );
}
