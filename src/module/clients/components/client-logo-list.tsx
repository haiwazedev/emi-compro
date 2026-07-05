import { ClientLogoCard } from "@/module/clients/components/client-logo-card";
import type { ClientLogo } from "@/module/clients/content/clients";

type ClientLogoListProps = {
  ariaHidden?: boolean;
  logos: ClientLogo[];
};

export function ClientLogoList({ ariaHidden, logos }: ClientLogoListProps) {
  return (
    <ul
      aria-hidden={ariaHidden}
      className="flex shrink-0 gap-4 pr-4 sm:gap-5 sm:pr-5"
    >
      {logos.map((logo) => (
        <li
          className="shrink-0"
          key={`${ariaHidden ? "copy" : "logo"}-${logo.name}`}
        >
          <ClientLogoCard ariaHidden={ariaHidden} logo={logo} />
        </li>
      ))}
    </ul>
  );
}
