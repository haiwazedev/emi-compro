import { ArticleCard } from "@/module/articles/components/article-card";
import { ArticleCategoryFilters } from "@/module/articles/components/article-category-filters";
import { ArticlesStatus } from "@/module/articles/components/articles-status";
import type { HomeArticleData } from "@/module/articles/lib/articles-api";
import { SectionContainer } from "@/shared/components/section-container";
import { SectionIntro } from "@/shared/components/section-intro";

type ArticlesSectionProps = {
  data: HomeArticleData | null;
  error: boolean;
};

export function ArticlesSection({ data, error }: ArticlesSectionProps) {
  const [featuredArticle, ...supportingArticles] = data?.articles ?? [];

  return (
    <SectionContainer
      aria-labelledby="articles-heading"
      className="py-16 sm:py-20 lg:py-24"
      id="articles"
      variant="subtle"
    >
      <SectionIntro
        accent="Articles"
        action={{ href: "/articles", label: "See All News" }}
        description="Trusted updates on business developments, innovation, and our contribution to energy resilience and sustainable growth."
        eyebrow="MEDIA & INFORMATION"
        headingId="articles-heading"
        theme="muted"
        title="Our Latest"
      />

      {data ? (
        <div className="mt-10">
          <ArticleCategoryFilters
            activeCategoryId={data.activeCategoryId}
            categories={data.categories}
            pathname="/"
            queryKey="homeCategory"
          />
        </div>
      ) : null}

      {error ? (
        <ArticlesStatus
          description="Article updates are currently unavailable."
          title="Articles are temporarily unavailable."
          variant="error"
        />
      ) : null}

      {!error && data && data.articles.length === 0 ? (
        <ArticlesStatus
          description="There are no published articles in this category yet."
          title="No articles found."
          variant="empty"
        />
      ) : null}

      {featuredArticle && supportingArticles.length === 0 ? (
        <ul aria-label="Latest articles" className="-m-2 mt-6 flex flex-wrap">
          <li className="flex w-full p-2">
            <ArticleCard article={featuredArticle} isFeatured />
          </li>
        </ul>
      ) : null}

      {featuredArticle && supportingArticles.length > 0 ? (
        <ul aria-label="Latest articles" className="-m-2 mt-6 flex flex-wrap">
          <li className="flex w-full p-2 lg:w-5/12">
            <ArticleCard article={featuredArticle} isFeatured />
          </li>

          <li className="w-full p-2 lg:w-7/12">
            <ul className="-m-2 flex flex-wrap">
              {supportingArticles.map((article) => (
                <li className="flex w-full p-2 lg:w-1/2" key={article.id}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ) : null}
    </SectionContainer>
  );
}
