import { ArrowRight } from "lucide-react";

import type { ServiceDivision } from "@/module/services/content/services";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

const iconToneClassNames: Record<ServiceDivision["iconTone"], string> = {
  blue: "bg-services-icon-blue",
  green: "bg-services-icon-green",
  yellow: "bg-services-icon-yellow",
  slate: "bg-services-icon-slate",
};

type ServiceCardProps = {
  service: ServiceDivision;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/80 bg-services-card p-6 shadow-lg shadow-services-shadow/10 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none sm:p-7">
      <div
        aria-hidden="true"
        className={cn(
          "flex size-11 items-center justify-center rounded-xl text-neutral shadow-md shadow-services-shadow/20",
          iconToneClassNames[service.iconTone],
        )}
      >
        <Icon className="size-5" strokeWidth={2} />
      </div>

      <div className="mt-5">
        <h3 className="min-w-0 font-sans text-2xl font-bold leading-tight text-services-foreground">
          {service.title}
          <Badge
            className="ml-2 mt-0.5 rounded-full border-transparent bg-services-tag-background px-2 py-0.5 text-xs font-bold text-services-accent"
            variant="secondary"
          >
            {service.code}
          </Badge>
        </h3>
      </div>

      <p className="mt-3 text-xs leading-6 text-services-muted sm:text-sm">
        {service.description}
      </p>

      <a
        className="group mt-auto inline-flex w-fit items-center gap-1 pt-6 text-xs font-bold text-services-accent transition-colors hover:text-services-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-services-accent/50"
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
