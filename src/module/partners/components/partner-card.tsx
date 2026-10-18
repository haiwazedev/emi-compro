import Image from "next/image";

import type { Partner } from "@/module/partners/content/partners";

type PartnerCardProps = {
  partner: Partner;
};

export function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <div className="border-foreground/20 bg-background flex min-h-20 items-center justify-center rounded-xl border px-4 py-5">
      <Image
        alt={`${partner.name} logo`}
        className="h-auto max-h-12 max-w-full object-contain"
        height={partner.logoHeight}
        src={partner.logoUrl}
        width={partner.logoWidth}
      />
    </div>
  );
}
