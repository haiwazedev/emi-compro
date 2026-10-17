import type { Metadata } from "next";

import { CommitmentsPageContent } from "@/module/commitment/components/commitments-page-content";
import {
  getCommitmentListingData,
  type CommitmentListingData,
} from "@/module/commitment/lib/commitments-api";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";
import {
  getFirstSearchParamValue,
  parsePositiveInteger,
} from "@/shared/lib/utils";

export const metadata: Metadata = {
  title: "Commitment Documents | PLN EMI",
  description:
    "Explore PLN EMI certifications, corporate policies, and sustainability reports.",
};

type CommitmentsPageProps = {
  searchParams: Promise<{
    page?: string | string[];
  }>;
};

export default async function CommitmentsPage({
  searchParams,
}: CommitmentsPageProps) {
  const params = await searchParams;
  const page = parsePositiveInteger(getFirstSearchParamValue(params.page)) ?? 1;
  let data: CommitmentListingData | null = null;
  let error = false;

  try {
    data = await getCommitmentListingData({ page });
  } catch {
    error = true;
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        <CommitmentsPageContent data={data} error={error} />
      </main>

      <Footer />
    </div>
  );
}
