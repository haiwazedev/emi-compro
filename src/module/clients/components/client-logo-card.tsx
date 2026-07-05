import Image from "next/image";

import type { ClientLogo } from "@/module/clients/content/clients";
import { cn } from "@/shared/lib/utils";

type ClientLogoCardProps = {
  ariaHidden?: boolean;
  logo: ClientLogo;
};

export function ClientLogoCard({ ariaHidden, logo }: ClientLogoCardProps) {
  return (
    <div className="flex h-24 w-40 items-center justify-center rounded-lg bg-clients-card px-6 py-5 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-clients-card-hover hover:shadow-[0_18px_34px_var(--color-clients-card-shadow)] motion-reduce:transform-none motion-reduce:transition-none sm:w-44">
      <Image
        alt={ariaHidden ? "" : `${logo.name} logo`}
        className={cn(
          "h-auto max-h-12 w-auto max-w-full object-contain sm:max-h-14",
          logo.className,
        )}
        height={logo.height}
        sizes="(min-width: 640px) 176px, 160px"
        src={logo.src}
        width={logo.width}
      />
    </div>
  );
}
