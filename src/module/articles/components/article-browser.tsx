import { ArrowDown } from "lucide-react";
import Link from "next/link";

import { ArticleCard } from "@/module/articles/components/article-card";
import type { ArticleListingData } from "@/module/articles/lib/articles-api";
import { CategoryFilters } from "@/shared/components/category-filters";
import { ContentStatus } from "@/shared/components/content-status";
import { SectionContainer } from "@/shared/components/section-container";
import { Button } from "@/shared/ui/button";

type ArticleBrowserProps = {
  data: ArticleListingData | null;
  error: boolean;
};

function getPageHref(categoryId: number | null, page: number) {
  const query = new URLSearchParams();

  if (categoryId !== null) {
    query.set("category", String(categoryId));
  }

  query.set("page", String(page));

  return `/articles?${query.toString()}#articles`;
}

export function ArticleBrowser({ data, error }: ArticleBrowserProps) {
  const featuredArticle = data?.articles[0];
  const supportingArticles = data?.articles.slice(1) ?? [];

  return (
    <SectionContainer
      aria-labelledby="article-browser-heading"
      className="py-12 sm:py-16 lg:py-20"
      id="articles"
      variant="default"
    >
      <h2 className="sr-only" id="article-browser-heading">
        Browse articles
      </h2>

      {data ? (
        <CategoryFilters
          activeCategoryId={data.activeCategoryId}
          allLabel="All"
          anchorId="articles"
          ariaLabel="Filter articles by category"
          categories={data.categories}
          pathname="/articles"
          queryKey="category"
        />
      ) : null}

      {error ? (
        <ContentStatus
          description="Article updates are currently unavailable."
          title="Articles are temporarily unavailable."
          variant="error"
        />
      ) : null}

      {!error && data && data.articles.length === 0 ? (
        <ContentStatus
          description="There are no published articles in this category yet."
          title="No articles found."
          variant="empty"
        />
      ) : null}

      {featuredArticle ? (
        <ul aria-label="Featured article" className="-m-2 mt-6 flex flex-wrap">
          <li className="flex w-full p-2">
            <ArticleCard
              article={featuredArticle}
              isFeatured
              orientation="horizontal"
              showReadAction
            />
          </li>
        </ul>
      ) : null}

      {supportingArticles.length > 0 ? (
        <ul
          aria-label="More articles"
          className="-m-2 mt-4 flex flex-wrap lg:mt-6"
        >
          {supportingArticles.map((article) => (
            <li className="flex w-full p-2 lg:w-1/3" key={article.id}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      ) : null}

      {data && data.page < data.totalPages ? (
        <div className="mt-8 flex justify-center lg:mt-10">
          <Button
            asChild
            className="h-10 rounded-full px-5 text-xs font-semibold"
            variant="outline"
          >
            <Link href={getPageHref(data.activeCategoryId, data.page + 1)}>
              Load More Articles
              <ArrowDown aria-hidden="true" className="size-3.5" />
            </Link>
          </Button>
        </div>
      ) : null}
    </SectionContainer>
  );
}
