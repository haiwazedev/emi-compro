import { ClientLogoList } from "@/module/clients/components/client-logo-list";
import type { ClientLogo } from "@/module/clients/content/clients";
import { cn } from "@/shared/lib/utils";

type ClientLogoMarqueeProps = {
  direction: "left" | "right";
  logos: ClientLogo[];
};

export function ClientLogoMarquee({
  direction,
  logos,
}: ClientLogoMarqueeProps) {
  return (
    <div className="clients-marquee-row overflow-hidden">
      <div
        className={cn(
          "clients-marquee-track flex w-max motion-reduce:transform-none",
          direction === "left"
            ? "animate-clients-marquee-left"
            : "animate-clients-marquee-right",
        )}
      >
        <ClientLogoList logos={logos} />
        <ClientLogoList ariaHidden logos={logos} />
      </div>
    </div>
  );
}
