import { ArrowRight } from "lucide-react";
import Link from "@/i18n/navigation";

import type { ServiceDivision } from "@/module/services/content/services";
import { cn } from "@/shared/lib/utils";
import { useCopy } from "@/i18n/use-copy";

const mediaToneClassNames: Record<ServiceDivision["iconTone"], string> = {
  blue: "bg-linear-to-br from-secondary via-secondary/85 to-accent",
  green: "bg-linear-to-br from-accent-2 via-secondary/75 to-accent",
  yellow: "bg-linear-to-br from-accent via-accent/90 to-foreground",
  slate: "bg-linear-to-br from-accent via-accent/90 to-foreground",
};

type CommitmentCardProps = {
  service: ServiceDivision;
};

export function CommitmentCard({ service }: CommitmentCardProps) {
  const copy = useCopy();

  return (
    <article className="bg-background shadow-foreground/10 flex h-full w-full flex-col overflow-hidden rounded-2xl shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none">
      <div
        aria-hidden="true"
        className={cn(
          "aspect-video shrink-0",
          mediaToneClassNames[service.iconTone],
        )}
      />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-accent font-sans text-xl leading-tight font-bold">
          {service.title}
        </h3>

        {service.description ? (
          <p className="text-foreground/70 mt-3 text-sm leading-6">
            {service.description}
          </p>
        ) : null}

        <Link
          className="group text-secondary hover:text-accent focus-visible:ring-secondary/50 mt-auto inline-flex w-fit items-center gap-1 pt-5 text-sm font-bold transition-colors focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none"
          href={service.href}
        >
          {copy("Browse documents")}
          <ArrowRight
            aria-hidden="true"
            className="size-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </Link>
      </div>
    </article>
  );
}
