import { PartnerCard } from "@/module/partners/components/partner-card";
import type { Partner } from "@/module/partners/content/partners";
import { ContentStatus } from "@/shared/components/content-status";
import { SectionContainer } from "@/shared/components/section-container";
import { SectionIntro } from "@/shared/components/section-intro";
import { useCopy } from "@/i18n/use-copy";

type PartnersSectionProps = {
  data: Partner[] | null;
  error: boolean;
};

export function PartnersSection({ data, error }: PartnersSectionProps) {
  const copy = useCopy();

  return (
    <SectionContainer
      aria-labelledby="partners-heading"
      className="py-16 sm:py-20 lg:py-24"
      id="partners"
      variant="default"
    >
      <SectionIntro
        accent={copy("Partners heading accent")}
        description={copy(
          "We are proud to partner with leading organizations across various industries, driving energy efficiency and sustainability solutions together.",
        )}
        eyebrow={copy("PARTNER PLN EMI")}
        headingId="partners-heading"
        theme="light"
        title={copy("Partners heading title")}
      />

      {error ? (
        <ContentStatus
          description={copy("Client logos are currently unavailable.")}
          title={copy("Partners are temporarily unavailable.")}
          variant="error"
        />
      ) : null}

      {!error && data && data.length > 0 ? (
        <ul
          aria-label={copy("PLN EMI partners")}
          className="-m-2 mt-10 flex flex-wrap lg:mt-8"
        >
          {data.map((partner) => (
            <li className="w-1/2 p-2 lg:w-1/4" key={partner.id}>
              <PartnerCard partner={partner} />
            </li>
          ))}
        </ul>
      ) : null}
    </SectionContainer>
  );
}
