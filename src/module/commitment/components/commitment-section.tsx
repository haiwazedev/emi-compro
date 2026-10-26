import { CommitmentCard } from "@/module/commitment/components/commitment-card";
import type { ServiceDivision } from "@/module/services/content/services";
import { ContentStatus } from "@/shared/components/content-status";
import { SectionContainer } from "@/shared/components/section-container";
import { SectionIntro } from "@/shared/components/section-intro";
import { useCopy } from "@/i18n/use-copy";

type CommitmentSectionProps = {
  data: ServiceDivision[] | null;
  error: boolean;
};

export function CommitmentSection({ data, error }: CommitmentSectionProps) {
  const copy = useCopy();

  return (
    <SectionContainer
      aria-labelledby="commitment-heading"
      className="py-16 sm:py-20 lg:py-24"
      id="commitment"
      variant="default"
    >
      <SectionIntro
        accent={copy("Commitment heading accent")}
        action={{ href: "/commitments", label: copy("Document Library") }}
        description={copy(
          "Certifications, corporate policies, and sustainability reports — the documents behind our promises, available for download.",
        )}
        eyebrow={copy("COMMITMENT")}
        headingId="commitment-heading"
        theme="light"
        title={copy("Commitment heading title")}
      />

      {error ? (
        <ContentStatus
          description={copy(
            "Service information is currently unavailable. Please try again later.",
          )}
          title={copy("Our service divisions are temporarily unavailable.")}
          variant="error"
        />
      ) : null}

      {!error && data?.length === 0 ? (
        <ContentStatus
          description={copy("Published service divisions will appear here.")}
          title={copy("No service divisions are available yet.")}
          variant="empty"
        />
      ) : null}

      {!error && data && data.length > 0 ? (
        <ul
          aria-label={copy("PLN EMI commitment resources")}
          className="-m-2 mt-10 flex flex-wrap lg:mt-12"
        >
          {data.slice(0, 3).map((service) => (
            <li className="flex w-full p-2 lg:w-1/3" key={service.id}>
              <CommitmentCard service={service} />
            </li>
          ))}
        </ul>
      ) : null}
    </SectionContainer>
  );
}
