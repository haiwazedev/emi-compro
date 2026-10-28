import { Plus } from "lucide-react";

import type { ServiceOffering } from "@/module/services/content/services";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

type ServiceOfferingListProps = {
  ariaLabel: string;
  className?: string;
  onOfferingOpen: (offeringId: number, trigger: HTMLButtonElement) => void;
  offerings: readonly ServiceOffering[];
};

export function ServiceOfferingList({
  ariaLabel,
  className,
  onOfferingOpen,
  offerings,
}: ServiceOfferingListProps) {
  return (
    <ul
      aria-label={ariaLabel}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {offerings.map((offering) => (
        <li key={offering.id}>
          <Badge
            asChild
            className="border-primary bg-primary/50 text-accent h-auto min-h-7 cursor-pointer px-3 py-1 text-xs leading-4 font-semibold whitespace-normal"
            variant="outline"
          >
            <button
              aria-haspopup="dialog"
              onClick={(event) =>
                onOfferingOpen(offering.id, event.currentTarget)
              }
              type="button"
            >
              <Plus aria-hidden="true" className="size-3 shrink-0" />
              {offering.label}
            </button>
          </Badge>
        </li>
      ))}
    </ul>
  );
}
