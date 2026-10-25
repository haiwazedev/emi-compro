import type { Metadata } from "next";

import { getPublicSiteSettings } from "@/module/contact/lib/contact-api";
import { CommitmentsPageContent } from "@/module/commitment/components/commitments-page-content";
import {
  getCommitmentListingData,
  type CommitmentListingData,
} from "@/module/commitment/lib/commitments-api";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";
import { getLocalizedMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import {
  getFirstSearchParamValue,
  parsePositiveInteger,
} from "@/shared/lib/utils";

type CommitmentsPageProps = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{
    category?: string | string[];
    page?: string | string[];
  }>;
};

export async function generateMetadata({
  params,
}: CommitmentsPageProps): Promise<Metadata> {
  const { locale } = await params;

  return getLocalizedMetadata(
    locale,
    "Commitment Documents | PLN EMI",
    "Explore PLN EMI certifications, corporate policies, and sustainability reports.",
  );
}

export default async function CommitmentsPage({
  params: routeParams,
  searchParams,
}: CommitmentsPageProps) {
  const { locale } = await routeParams;
  const params = await searchParams;
  const categoryId = parsePositiveInteger(
    getFirstSearchParamValue(params.category),
  );
  const page = parsePositiveInteger(getFirstSearchParamValue(params.page)) ?? 1;
  let data: CommitmentListingData | null = null;
  let error = false;
  const siteSettingsPromise = getPublicSiteSettings(locale).catch(() => null);

  try {
    data = await getCommitmentListingData({ categoryId, locale, page });
  } catch {
    error = true;
  }

  const siteSettings = await siteSettingsPromise;

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        <CommitmentsPageContent
          data={data}
          error={error}
          logos={{
            danantaraLogoUrl: siteSettings?.danantaraLogoUrl ?? null,
            plnLogoUrl: siteSettings?.plnLogoUrl ?? null,
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
