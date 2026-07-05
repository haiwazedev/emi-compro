import { DynamicIcon } from "lucide-react/dynamic";

import { ServiceTagPill } from "@/module/services/components/service-tag-pill";
import { Badge } from "@/shared/ui/badge";
import type { ServiceDivision } from "@/module/services/content/services";
import { cn } from "@/shared/lib/utils";

const iconToneClassNames: Record<ServiceDivision["iconTone"], string> = {
  blue: "bg-services-icon-blue",
  green: "bg-services-icon-green",
  yellow: "bg-services-icon-yellow",
};

type ServiceCardProps = {
  service: ServiceDivision;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="relative rounded-2xl border border-white/80 bg-services-card p-8 shadow-sm transition ease-in-out duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none lg:grid lg:grid-cols-[5rem_minmax(0,1fr)] gap-2">
      <div
        aria-hidden="true"
        className={cn(
          "flex size-14 items-center justify-center rounded-2xl text-white shadow-lg shadow-services-muted/20",
          iconToneClassNames[service.iconTone],
        )}
      >
        <DynamicIcon className="size-6" name={service.icon} strokeWidth={2} />
      </div>

      <div className="mt-4 min-w-0 lg:mt-0">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-2xl leading-tight text-services-foreground">
            {service.title}
          </h3>
          <Badge
            className="h-6 rounded-full border-transparent bg-services-tag-background px-3 text-xs font-bold text-services-accent"
            variant="secondary"
          >
            {service.code}
          </Badge>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-services-muted">
          {service.description}
        </p>

        <ul
          aria-label={`${service.title} services`}
          className="mt-4 flex flex-wrap gap-3"
        >
          {service.tags.map((tag) => (
            <li className="min-w-0" key={tag.label}>
              <ServiceTagPill tag={tag} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
