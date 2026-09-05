import type { ServiceDivision } from "@/module/services/content/services";

export const serviceIconToneClassNames: Record<
  ServiceDivision["iconTone"],
  string
> = {
  blue: "bg-secondary",
  green: "bg-accent-2",
  yellow: "bg-foreground",
  slate: "bg-secondary/80",
};
