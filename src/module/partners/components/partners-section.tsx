import { PartnerCard } from "@/module/partners/components/partner-card";
import { partners } from "@/module/partners/content/partners";
import { SectionContainer } from "@/shared/components/section-container";

export function PartnersSection() {
  return (
    <SectionContainer
      aria-labelledby="partners-heading"
      className="py-16 sm:py-20 lg:py-24"
      id="partners"
      variant="default"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
        <div className="shrink-0 lg:basis-1/3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-partners-accent">
            PARTNER PLN EMI
          </p>
          <h2
            className="mt-3 font-sans text-3xl font-bold leading-tight tracking-tight text-partners-foreground sm:text-4xl"
            id="partners-heading"
          >
            Our <span className="text-partners-accent">Partners</span>
          </h2>
        </div>

        <p className="text-sm leading-7 text-partners-muted lg:flex-1">
          We are proud to partner with leading organizations across various
          industries, driving energy efficiency and sustainability solutions
          together. <em>(Logo asli diunggah via CMS.)</em>
        </p>
      </div>

      <ul
        aria-label="PLN EMI partners"
        className="-m-2 mt-10 flex flex-wrap lg:mt-8"
      >
        {partners.map((partner) => (
          <li className="w-1/2 p-2 lg:w-1/4" key={partner.name}>
            <PartnerCard partner={partner} />
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
