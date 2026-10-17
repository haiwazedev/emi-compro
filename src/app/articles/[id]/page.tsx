import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetail } from "@/module/articles/components/article-detail";
import { RelatedArticles } from "@/module/articles/components/related-articles";
import { ArticlesStatus } from "@/module/articles/components/articles-status";
import type { Article } from "@/module/articles/content/articles";
import {
  getArticleById,
  getRelatedArticles,
} from "@/module/articles/lib/articles-api";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";
import { SectionContainer } from "@/shared/components/section-container";
import { parsePositiveInteger } from "@/shared/lib/utils";

type ArticlePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const articleId = parsePositiveInteger(id);

  if (articleId === undefined) {
    return {};
  }

  let article: Article | null;

  try {
    article = await getArticleById(articleId);
  } catch {
    return {};
  }

  if (!article) {
    return {};
  }

  return {
    description: article.description,
    title: `${article.title} | PLN EMI`,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const articleId = parsePositiveInteger(id);

  if (articleId === undefined) {
    notFound();
  }

  let article: Article | null = null;
  let hasApiError = false;

  try {
    article = await getArticleById(articleId);
  } catch {
    hasApiError = true;
  }

  if (!article && !hasApiError) {
    notFound();
  }

  const relatedArticles = article
    ? await getRelatedArticles(article.id).catch(() => [])
    : [];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        {article ? (
          <>
            <ArticleDetail article={article} />
            <RelatedArticles articles={relatedArticles} />
          </>
        ) : (
          <SectionContainer className="py-12 lg:py-20">
            <ArticlesStatus
              description="This article cannot be displayed right now."
              title="This article is temporarily unavailable."
              variant="error"
            />
          </SectionContainer>
        )}
      </main>

      <Footer />
    </div>
  );
}
