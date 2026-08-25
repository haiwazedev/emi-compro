import { ArticleBrowser } from "@/module/articles/components/article-browser";
import { ArticlesHero } from "@/module/articles/components/articles-hero";

export function ArticlesPageContent() {
  return (
    <>
      <ArticlesHero />
      <ArticleBrowser />
    </>
  );
}
