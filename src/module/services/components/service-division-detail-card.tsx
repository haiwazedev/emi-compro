import type { ServiceDivision } from "@/module/services/content/services";
import { Badge } from "@/shared/ui/badge";
import { ServiceOfferingList } from "@/module/services/components/service-offering-list";
import { ServiceDivisionIcon } from "@/module/services/components/service-division-icon";
import { useCopy } from "@/i18n/use-copy";

type ServiceDivisionDetailCardProps = {
  onOpen: (trigger: HTMLButtonElement) => void;
  onOfferingOpen: (offeringId: number, trigger: HTMLButtonElement) => void;
  service: ServiceDivision;
};

export function ServiceDivisionDetailCard({
  onOpen,
  onOfferingOpen,
  service,
}: ServiceDivisionDetailCardProps) {
  const copy = useCopy();
  const headingId = `${service.slug}-heading`;

  return (
    <article
      aria-labelledby={headingId}
      className="border-background/80 bg-background shadow-foreground/10 hover:border-secondary/40 scroll-mt-24 rounded-2xl border p-5 shadow-lg transition hover:shadow-xl sm:p-6 lg:p-8"
      id={service.slug}
    >
      <h2 className="sr-only" id={headingId}>
        {service.title}
      </h2>

      <button
        aria-haspopup="dialog"
        aria-label={copy("Open {title} details", { title: service.title })}
        className="focus-visible:ring-secondary/50 w-full cursor-pointer rounded-lg text-left focus-visible:ring-2 focus-visible:outline-none"
        onClick={(event) => onOpen(event.currentTarget)}
        type="button"
      >
        <span className="flex items-start gap-3 sm:gap-4">
          <ServiceDivisionIcon
            className="size-12 rounded-xl lg:size-16"
            iconClassName="size-5 sm:size-6"
            service={service}
          />

          <span className="min-w-0">
            <Badge
              className="bg-primary text-accent border-transparent px-2 py-0.5 text-xs font-bold"
              variant="secondary"
            >
              {service.code}
            </Badge>

            <span className="text-accent mt-2 block font-sans text-base leading-tight font-bold tracking-tight lg:text-xl">
              {service.title}
            </span>
          </span>
        </span>

        {service.description ? (
          <span className="text-foreground/70 mt-5 block text-xs leading-6 sm:text-sm sm:leading-7">
            {service.description}
          </span>
        ) : null}
      </button>

      {service.offerings.length > 0 ? (
        <ServiceOfferingList
          ariaLabel={copy("{title} offerings", { title: service.title })}
          className="mt-5"
          onOfferingOpen={onOfferingOpen}
          offerings={service.offerings}
        />
      ) : null}
    </article>
  );
}
