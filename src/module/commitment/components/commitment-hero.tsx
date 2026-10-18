import { PageHero } from "@/shared/components/page-hero";
import { useCopy } from "@/i18n/use-copy";

export function CommitmentHero() {
  const copy = useCopy();

  return (
    <PageHero
      breadcrumb={copy("Home / Commitment")}
      description={copy(
        "Certifications, corporate policies, and sustainability reports — the documents behind our promises. Uploaded and managed via CMS.",
      )}
      headingId="commitment-page-heading"
      id="commitment-hero"
      title={copy("Commitment page title")}
      titleAccent={copy("Commitment page title accent")}
    />
  );
}
