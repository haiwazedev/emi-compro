import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ClientLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  className?: string;
};

type ClientLogoMarqueeProps = {
  direction: "left" | "right";
  logos: ClientLogo[];
};

const clientLogos: ClientLogo[] = [
  {
    name: "Accenture",
    src: "/clients/logoklien_accenture.png",
    width: 1966,
    height: 518,
  },
  {
    name: "Astra Otoparts",
    src: "/clients/logoklien_astraoto.png",
    width: 1956,
    height: 430,
  },
  {
    name: "Pama",
    src: "/clients/logoklien_pama.png",
    width: 780,
    height: 1000,
    className: "max-h-16",
  },
  {
    name: "PLN Indonesia Power",
    src: "/clients/logoklien_plnip.png",
    width: 1966,
    height: 406,
  },
  {
    name: "The Ritz-Carlton",
    src: "/clients/logoklien_ritz-carlton.png",
    width: 2000,
    height: 1400,
    className: "max-h-16",
  },
  {
    name: "United Tractors",
    src: "/clients/logoklien_unitedtrac.png",
    width: 1876,
    height: 347,
  },
  {
    name: "Westin Hotels & Resorts",
    src: "/clients/logoklien_westin.png",
    width: 2000,
    height: 634,
  },
];

const topRowLogos = clientLogos;
const bottomRowLogos = [
  clientLogos[3],
  clientLogos[6],
  clientLogos[1],
  clientLogos[4],
  clientLogos[0],
  clientLogos[5],
  clientLogos[2],
];

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
              <ClientLogoMarquee direction="left" logos={topRowLogos} />
              <ClientLogoMarquee direction="right" logos={bottomRowLogos} />
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

function ClientLogoMarquee({ direction, logos }: ClientLogoMarqueeProps) {
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

function ClientLogoList({
  ariaHidden,
  logos,
}: {
  ariaHidden?: boolean;
  logos: ClientLogo[];
}) {
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

function ClientLogoCard({
  ariaHidden,
  logo,
}: {
  ariaHidden?: boolean;
  logo: ClientLogo;
}) {
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
