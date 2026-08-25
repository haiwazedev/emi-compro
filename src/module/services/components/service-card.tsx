import { ArrowRight } from "lucide-react";

import type { ServiceDivision } from "@/module/services/content/services";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

const iconToneClassNames: Record<ServiceDivision["iconTone"], string> = {
  blue: "bg-secondary",
  green: "bg-accent-2",
  yellow: "bg-foreground",
  slate: "bg-secondary/80",
};

type ServiceCardProps = {
  service: ServiceDivision;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-background/80 bg-background p-6 shadow-lg shadow-foreground/10 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none sm:p-7">
      <div
        aria-hidden="true"
        className={cn(
          "flex size-11 items-center justify-center rounded-xl text-background shadow-md shadow-foreground/20",
          iconToneClassNames[service.iconTone],
        )}
      >
        <Icon className="size-5" strokeWidth={2} />
      </div>

      <div className="mt-5">
        <h3 className="min-w-0 font-sans text-2xl font-bold leading-tight text-accent">
          {service.title}
          <Badge
            className="ml-2 mt-0.5 rounded-full border-transparent bg-primary px-2 py-0.5 text-xs font-bold text-accent"
            variant="secondary"
          >
            {service.code}
          </Badge>
        </h3>
      </div>

      <p className="mt-3 text-xs leading-6 text-foreground/70 sm:text-sm">
        {service.description}
      </p>

      <a
        className="group mt-auto inline-flex w-fit items-center gap-1 pt-6 text-xs font-bold text-secondary transition-colors hover:text-accent focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
        href={service.href}
      >
        Explore {service.code}
        <ArrowRight
          aria-hidden="true"
          className="size-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      </a>
    </article>
  );
}
