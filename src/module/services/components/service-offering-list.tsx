import { Plus } from "lucide-react";

import type { ServiceOffering } from "@/module/services/content/services";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

type ServiceOfferingListProps = {
  ariaLabel: string;
  className?: string;
  offerings: readonly ServiceOffering[];
};

export function ServiceOfferingList({
  ariaLabel,
  className,
  offerings,
}: ServiceOfferingListProps) {
  return (
    <ul
      aria-label={ariaLabel}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {offerings.map((offering) => (
        <li key={offering.label}>
          <Badge
            className="border-primary bg-primary/50 text-accent h-auto min-h-7 px-3 py-1 text-xs leading-4 font-semibold whitespace-normal"
            variant="outline"
          >
            <Plus aria-hidden="true" className="size-3 shrink-0" />
            {offering.label}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
