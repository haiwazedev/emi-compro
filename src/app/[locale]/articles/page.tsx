import type { Metadata } from "next";

import { ArticlesPageContent } from "@/module/articles/components/articles-page-content";
import {
  getArticleListingData,
  type ArticleListingData,
} from "@/module/articles/lib/articles-api";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";
import { getLocalizedMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import {
  getFirstSearchParamValue,
  parsePositiveInteger,
} from "@/shared/lib/utils";

type ArticlesPageProps = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{
    category?: string | string[];
    page?: string | string[];
  }>;
};

export async function generateMetadata({
  params,
}: ArticlesPageProps): Promise<Metadata> {
  const { locale } = await params;

  return getLocalizedMetadata(
    locale,
    "News & Articles | PLN EMI",
    "Trusted updates on PLN EMI business developments, innovation, and contribution to energy resilience and sustainable growth.",
  );
}

export default async function ArticlesPage({
  params: routeParams,
  searchParams,
}: ArticlesPageProps) {
  const { locale } = await routeParams;
  const params = await searchParams;
  const categoryValue = getFirstSearchParamValue(params.category);
  const pageValue = getFirstSearchParamValue(params.page);
  const categoryId = parsePositiveInteger(categoryValue);
  const page = parsePositiveInteger(pageValue) ?? 1;
  let data: ArticleListingData | null = null;
  let error = false;

  try {
    data = await getArticleListingData({ categoryId, locale, page });
  } catch {
    error = true;
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        <ArticlesPageContent data={data} error={error} />
      </main>

      <Footer />
    </div>
  );
}
