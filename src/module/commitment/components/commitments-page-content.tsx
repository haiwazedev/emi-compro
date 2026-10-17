import { CommitmentBrowser } from "@/module/commitment/components/commitment-browser";
import { CommitmentHero } from "@/module/commitment/components/commitment-hero";
import type { CommitmentListingData } from "@/module/commitment/lib/commitments-api";

type CommitmentsPageContentProps = {
  data: CommitmentListingData | null;
  error: boolean;
};

export function CommitmentsPageContent({
  data,
  error,
}: CommitmentsPageContentProps) {
  return (
    <>
      <CommitmentHero />
      <CommitmentBrowser data={data} error={error} />
    </>
  );
}
