import type { ServiceDivision } from "@/module/services/content/services";
import { serviceIconToneClassNames } from "@/module/services/components/service-visuals";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { ServiceOfferingList } from "@/module/services/components/service-offering-list";

type ServiceDivisionDetailCardProps = {
  onOpen: (trigger: HTMLElement) => void;
  service: ServiceDivision;
};

export function ServiceDivisionDetailCard({
  onOpen,
  service,
}: ServiceDivisionDetailCardProps) {
  const Icon = service.icon;
  const headingId = `${service.slug}-heading`;

  return (
    <article
      aria-labelledby={headingId}
      aria-haspopup="dialog"
      aria-label={`Open ${service.title} details`}
      className="border-background/80 bg-background shadow-foreground/10 hover:border-secondary/40 focus-visible:ring-secondary/50 cursor-pointer scroll-mt-24 rounded-2xl border p-5 shadow-lg transition hover:shadow-xl focus-visible:ring-2 focus-visible:outline-none sm:p-6 lg:p-8"
      id={service.slug}
      onClick={(event) => onOpen(event.currentTarget)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(event.currentTarget);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          aria-hidden="true"
          className={cn(
            "text-background shadow-foreground/20 flex size-12 shrink-0 items-center justify-center rounded-xl shadow-md lg:size-16",
            serviceIconToneClassNames[service.iconTone],
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

      <ServiceOfferingList
        ariaLabel={`${service.title} offerings`}
        className="mt-5"
        offerings={service.offerings}
      />
    </article>
  );
}
