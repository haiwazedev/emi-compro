import { ArticleBrowser } from "@/module/articles/components/article-browser";
import { ArticlesHero } from "@/module/articles/components/articles-hero";
import type { ArticleListingData } from "@/module/articles/lib/articles-api";

type ArticlesPageContentProps = {
  data: ArticleListingData | null;
  error: boolean;
};

export function ArticlesPageContent({ data, error }: ArticlesPageContentProps) {
  return (
    <>
      <ArticlesHero />
      <ArticleBrowser data={data} error={error} />
    </>
  );
}
