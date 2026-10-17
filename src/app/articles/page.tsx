import type { Metadata } from "next";

import { ArticlesPageContent } from "@/module/articles/components/articles-page-content";
import {
  getArticleListingData,
  type ArticleListingData,
} from "@/module/articles/lib/articles-api";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";
import {
  getFirstSearchParamValue,
  parsePositiveInteger,
} from "@/shared/lib/utils";

export const metadata: Metadata = {
  title: "News & Articles | PLN EMI",
  description:
    "Trusted updates on PLN EMI business developments, innovation, and contribution to energy resilience and sustainable growth.",
};

type ArticlesPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    page?: string | string[];
  }>;
};

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const params = await searchParams;
  const categoryValue = getFirstSearchParamValue(params.category);
  const pageValue = getFirstSearchParamValue(params.page);
  const categoryId = parsePositiveInteger(categoryValue);
  const page = parsePositiveInteger(pageValue) ?? 1;
  let data: ArticleListingData | null = null;
  let error = false;

  try {
    data = await getArticleListingData({ categoryId, page });
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
