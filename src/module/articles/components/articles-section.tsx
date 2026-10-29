import { ArticleCard } from "@/module/articles/components/article-card";
import type { HomeArticleData } from "@/module/articles/lib/articles-api";
import { CategoryFilters } from "@/shared/components/category-filters";
import { ContentStatus } from "@/shared/components/content-status";
import { SectionContainer } from "@/shared/components/section-container";
import { SectionIntro } from "@/shared/components/section-intro";
import { useCopy } from "@/i18n/use-copy";

type ArticlesSectionProps = {
  data: HomeArticleData | null;
  error: boolean;
};

export function ArticlesSection({ data, error }: ArticlesSectionProps) {
  const copy = useCopy();
  const [featuredArticle, ...supportingArticles] = data?.articles ?? [];

  return (
    <SectionContainer
      aria-labelledby="articles-heading"
      className="py-16 sm:py-20 lg:py-24"
      id="articles"
      variant="subtle"
    >
      <SectionIntro
        accent={copy("Articles section accent")}
        action={{ href: "/articles", label: copy("See All News") }}
        description={copy(
          "Trusted updates on business developments, innovation, and our contribution to energy resilience and sustainable growth.",
        )}
        eyebrow={copy("MEDIA & INFORMATION")}
        headingId="articles-heading"
        theme="muted"
        title={copy("Articles section title")}
      />

      {data ? (
        <div className="mt-10">
          <CategoryFilters
            activeCategorySlug={data.activeCategorySlug}
            allLabel={copy("All")}
            anchorId="articles"
            ariaLabel={copy("Filter articles by category")}
            categories={data.categories}
            pathname="/"
            queryKey="category"
          />
        </div>
      ) : null}

      {error ? (
        <ContentStatus
          description={copy("Article updates are currently unavailable.")}
          title={copy("Articles are temporarily unavailable.")}
          variant="error"
        />
      ) : null}

      {!error && data && data.articles.length === 0 ? (
        <ContentStatus
          description={copy(
            "There are no published articles in this category yet.",
          )}
          title={copy("No articles found.")}
          variant="empty"
        />
      ) : null}

      {featuredArticle && supportingArticles.length === 0 ? (
        <ul
          aria-label={copy("Latest articles")}
          className="-m-2 mt-6 flex flex-wrap"
        >
          <li className="flex w-full p-2">
            <ArticleCard article={featuredArticle} isFeatured />
          </li>
        </ul>
      ) : null}

      {featuredArticle && supportingArticles.length > 0 ? (
        <ul
          aria-label={copy("Latest articles")}
          className="-m-2 mt-6 flex flex-wrap"
        >
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
