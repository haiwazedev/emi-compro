import { ClientLogoMarquee } from "@/module/clients/components/client-logo-marquee";
import { Badge } from "@/shared/ui/badge";
import {
  bottomRowClientLogos,
  topRowClientLogos,
} from "@/module/clients/content/clients";

export function ClientsSection() {
  return (
    <section
      aria-labelledby="clients-heading"
      className="overflow-hidden scroll-mt-20 bg-clients-background py-16 sm:py-20 lg:py-28"
      id="clients"
    >
      <div className="mx-auto max-w-7xl gap-14 px-6 sm:px-8 flex flex-col items-start justify-normal lg:px-10 lg:flex-row lg:justify-between lg:items-center">
        <div
          aria-label="Client network information"
          className="information max-w-2xl"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-clients-accent sm:text-sm">
            Our Network
          </p>

          <h2
            className="flex gap-2 mt-5 font-display text-5xl leading-none text-clients-foreground sm:text-6xl lg:text-6xl"
            id="clients-heading"
          >
            <span className="block">Our</span>
            <span className="block italic text-clients-accent">Clients</span>
          </h2>

          <p className="mt-7 max-w-xl text-sm leading-6 text-clients-muted">
            We are proud to partner with leading organizations across various
            industries, driving energy efficiency and sustainability solutions
            together.
          </p>

          <Badge
            className="mt-7 h-10 max-w-full gap-2 rounded-full border-transparent bg-clients-badge-background px-4 text-xs font-bold text-clients-badge-foreground"
            variant="secondary"
          >
            <span
              aria-hidden="true"
              className="size-2.5 shrink-0 rounded-full bg-clients-badge-dot"
            />
            <span className="truncate">150+ Clients Served</span>
          </Badge>
        </div>

        <div className={"flex flex-col w-full lg:w-3/8"}>
          <div
            aria-label="Client logos"
            className="logos-marquee relative min-w-0 "
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-clients-fade to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-clients-fade to-transparent" />

            <div className="space-y-5 overflow-hidden py-2 sm:space-y-6">
              <ClientLogoMarquee direction="left" logos={topRowClientLogos} />
              <ClientLogoMarquee
                direction="right"
                logos={bottomRowClientLogos}
              />
            </div>
          </div>
          <p className="mt-5 text-right text-xs italic text-clients-accent font-sans">
            and many more...
          </p>
        </div>
      </div>
    </section>
  );
}
