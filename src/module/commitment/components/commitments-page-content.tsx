import { CommitmentBrowser } from "@/module/commitment/components/commitment-browser";
import { CommitmentHero } from "@/module/commitment/components/commitment-hero";
import type { CommitmentListingData } from "@/module/commitment/lib/commitments-api";
import type { PublicSiteLogos } from "@/module/contact/content/contact";

type CommitmentsPageContentProps = {
  data: CommitmentListingData | null;
  error: boolean;
  logos: PublicSiteLogos;
};

export function CommitmentsPageContent({
  data,
  error,
  logos,
}: CommitmentsPageContentProps) {
  return (
    <>
      <CommitmentHero />
      <CommitmentBrowser data={data} error={error} logos={logos} />
    </>
  );
}
