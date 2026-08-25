import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ArticleCard } from "@/module/articles/components/article-card";
import type { Article } from "@/module/articles/content/articles";
import { SectionContainer } from "@/shared/components/section-container";
import { Button } from "@/shared/ui/button";

type RelatedArticlesProps = {
  articles: readonly Article[];
};

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <SectionContainer
      aria-labelledby="related-articles-heading"
      className="py-14 sm:py-16 lg:py-20"
      variant="subtle"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-secondary text-xs font-bold tracking-[0.18em] uppercase">
            Keep Reading
          </p>
          <h2
            className="text-accent mt-3 text-3xl leading-tight font-bold tracking-tight sm:text-4xl"
            id="related-articles-heading"
          >
            Related Articles
          </h2>
        </div>

        <Button
          asChild
          className="h-10 w-fit rounded-full px-5 text-xs font-semibold"
          variant="outline"
        >
          <Link href="/articles">
            All News
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </Button>
      </div>

      <ul
        aria-label="Related articles"
        className="-m-2 mt-8 flex flex-wrap sm:mt-10"
      >
        {articles.map((article) => (
          <li className="flex w-full p-2 lg:w-1/3" key={article.id}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
