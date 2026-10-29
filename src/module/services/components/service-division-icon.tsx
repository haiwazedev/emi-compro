import { Layers3 } from "lucide-react";

import type { ServiceDivision } from "@/module/services/content/services";
import { serviceIconToneClassNames } from "@/module/services/components/service-visuals";
import { cn } from "@/shared/lib/utils";

type ServiceDivisionIconProps = {
  className: string;
  iconClassName: string;
  service: ServiceDivision;
};

export function ServiceDivisionIcon({
  className,
  iconClassName,
  service,
}: ServiceDivisionIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "text-background shadow-foreground/20 flex shrink-0 items-center justify-center shadow-md",
        serviceIconToneClassNames[service.iconTone],
        className,
      )}
    >
      {service.iconSvg ? (
        <span
          className="flex size-full items-center justify-center p-2 [&_svg]:size-full"
          dangerouslySetInnerHTML={{ __html: service.iconSvg }}
        />
      ) : (
        <Layers3 className={iconClassName} strokeWidth={2} />
      )}
    </span>
  );
}
