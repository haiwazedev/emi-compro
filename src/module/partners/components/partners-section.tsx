import { PartnerCard } from "@/module/partners/components/partner-card";
import { partners } from "@/module/partners/content/partners";
import { SectionContainer } from "@/shared/components/section-container";
import { SectionIntro } from "@/shared/components/section-intro";

export function PartnersSection() {
  return (
    <SectionContainer
      aria-labelledby="partners-heading"
      className="py-16 sm:py-20 lg:py-24"
      id="partners"
      variant="default"
    >
      <SectionIntro
        accent="Partners"
        description={
          <>
            We are proud to partner with leading organizations across various
            industries, driving energy efficiency and sustainability solutions
            together. <em>(Logo asli diunggah via CMS.)</em>
          </>
        }
        eyebrow="PARTNER PLN EMI"
        headingId="partners-heading"
        theme="light"
        title="Our"
      />

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
