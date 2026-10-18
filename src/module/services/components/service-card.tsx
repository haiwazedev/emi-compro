import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { ServiceDivision } from "@/module/services/content/services";
import { Badge } from "@/shared/ui/badge";
import { ServiceDivisionIcon } from "./service-division-icon";

type ServiceCardProps = {
  service: ServiceDivision;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="border-background/80 bg-background shadow-foreground/10 flex h-full flex-col rounded-2xl border p-6 shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none sm:p-7">
      <ServiceDivisionIcon
        className="size-11 rounded-xl"
        iconClassName="size-5"
        service={service}
      />

      <div className="mt-5">
        <h3 className="text-accent min-w-0 font-sans text-2xl leading-tight font-bold">
          {service.title}
          <Badge
            className="bg-primary text-accent mt-0.5 ml-2 rounded-full border-transparent px-2 py-0.5 text-xs font-bold"
            variant="secondary"
          >
            {service.code}
          </Badge>
        </h3>
      </div>

      {service.description ? (
        <p className="text-foreground/70 mt-3 text-xs leading-6 sm:text-sm">
          {service.description}
        </p>
      ) : null}

      <Link
        className="group text-secondary hover:text-accent focus-visible:ring-secondary/50 mt-auto inline-flex w-fit items-center gap-1 pt-6 text-xs font-bold transition-colors focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none"
        href={service.href}
      >
        Explore {service.code}
        <ArrowRight
          aria-hidden="true"
          className="size-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      </Link>
    </article>
  );
}
