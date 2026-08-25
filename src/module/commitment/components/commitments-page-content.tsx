import { CommitmentBrowser } from "@/module/commitment/components/commitment-browser";
import { CommitmentHero } from "@/module/commitment/components/commitment-hero";

export function CommitmentsPageContent() {
  return (
    <>
      <CommitmentHero />
      <CommitmentBrowser />
    </>
  );
}
