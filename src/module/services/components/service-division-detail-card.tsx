import { Plus } from "lucide-react";

import type { ServiceDivision } from "@/module/services/content/services";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

const iconToneClassNames: Record<ServiceDivision["iconTone"], string> = {
  blue: "bg-secondary",
  green: "bg-accent-2",
  yellow: "bg-foreground",
  slate: "bg-secondary/80",
};

type ServiceDivisionDetailCardProps = {
  service: ServiceDivision;
};

export function ServiceDivisionDetailCard({
  service,
}: ServiceDivisionDetailCardProps) {
  const Icon = service.icon;
  const headingId = `${service.slug}-heading`;

  return (
    <article
      aria-labelledby={headingId}
      className="border-background/80 bg-background shadow-foreground/10 scroll-mt-24 rounded-2xl border p-5 shadow-lg sm:p-6 lg:p-8"
      id={service.slug}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          aria-hidden="true"
          className={cn(
            "text-background shadow-foreground/20 flex size-12 shrink-0 items-center justify-center rounded-xl shadow-md lg:size-16",
            iconToneClassNames[service.iconTone],
          )}
        >
          <Icon className="size-5 sm:size-6" strokeWidth={2} />
        </div>

        <div className="min-w-0">
          <Badge
            className="bg-primary text-accent border-transparent px-2 py-0.5 text-xs font-bold"
            variant="secondary"
          >
            {service.code}
          </Badge>

          <h2
            className="text-accent mt-2 font-sans text-base leading-tight font-bold tracking-tight lg:text-xl"
            id={headingId}
          >
            {service.title}
          </h2>
        </div>
      </div>

      <p className="text-foreground/70 mt-5 text-xs leading-6 sm:text-sm sm:leading-7">
        {service.detailDescription}
      </p>

      <ul
        aria-label={`${service.title} offerings`}
        className="mt-5 flex flex-wrap gap-2"
      >
        {service.offerings.map((offering) => (
          <li key={offering}>
            <Badge
              className="border-primary bg-primary/50 text-accent h-auto min-h-7 px-3 py-1 text-xs leading-4 font-semibold whitespace-normal"
              variant="outline"
            >
              <Plus aria-hidden="true" className="size-3 shrink-0" />
              {offering}
            </Badge>
          </li>
        ))}
      </ul>
    </article>
  );
}
