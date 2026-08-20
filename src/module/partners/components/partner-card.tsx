import type { Partner } from "@/module/partners/content/partners";
import { cn } from "@/shared/lib/utils";

type PartnerCardProps = {
  partner: Partner;
};

export function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <div
      className={cn(
        "flex min-h-20 items-center justify-center rounded-xl border border-partners-card-border bg-partners-card px-4 py-5 text-center font-semibold text-partners-muted",
        partner.isEmphasized && "italic",
      )}
    >
      {partner.name}
    </div>
  );
}
