import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
    <article className="border-background/80 bg-background shadow-foreground/10 flex h-full flex-col rounded-2xl border p-6 shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none sm:p-7">
      <div
        aria-hidden="true"
        className={cn(
          "text-background shadow-foreground/20 flex size-11 items-center justify-center rounded-xl shadow-md",
          iconToneClassNames[service.iconTone],
        )}
      >
        <Icon className="size-5" strokeWidth={2} />
      </div>

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

      <p className="text-foreground/70 mt-3 text-xs leading-6 sm:text-sm">
        {service.description}
      </p>

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
