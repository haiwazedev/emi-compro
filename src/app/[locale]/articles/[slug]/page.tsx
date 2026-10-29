import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  DEFAULT_OPEN_GRAPH_IMAGE,
  getArticleAlternates,
} from "@/i18n/metadata";
import { getCopyKey } from "@/i18n/keys";
import type { Locale } from "@/i18n/routing";
import { ArticleDetail } from "@/module/articles/components/article-detail";
import { RelatedArticles } from "@/module/articles/components/related-articles";
import type { Article } from "@/module/articles/content/articles";
import {
  getArticleBySlug,
  getRelatedArticles,
} from "@/module/articles/lib/articles-api";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";
import { SectionContainer } from "@/shared/components/section-container";
import { ContentStatus } from "@/shared/components/content-status";
import { getTranslations } from "next-intl/server";

type ArticlePageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  let article: Article | null;

  try {
    article = await getArticleBySlug(slug, locale);
  } catch {
    return {
      alternates: getArticleAlternates(locale, slug, {}),
    };
  }

  if (!article) {
    return {
      alternates: getArticleAlternates(locale, slug, {}),
    };
  }

  return {
    alternates: getArticleAlternates(locale, slug, article.alternateSlugs),
    description: article.description,
    openGraph: {
      description: article.description,
      images: [article.imageUrl ?? DEFAULT_OPEN_GRAPH_IMAGE],
      title: article.title,
      type: "article",
    },
    title: `${article.title} | PLN EMI`,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "copy" });

  let article: Article | null = null;
  let hasApiError = false;

  try {
    article = await getArticleBySlug(slug, locale);
  } catch {
    hasApiError = true;
  }

  if (!article && !hasApiError) {
    notFound();
  }

  const relatedArticles = article
    ? await getRelatedArticles(article.id, locale).catch(() => [])
    : [];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar articleAlternateSlugs={article?.alternateSlugs ?? {}} />

      <main>
        {article ? (
          <>
            <ArticleDetail article={article} />
            <RelatedArticles articles={relatedArticles} />
          </>
        ) : (
          <SectionContainer className="py-12 lg:py-20">
            <ContentStatus
              description={t(
                getCopyKey("This article cannot be displayed right now."),
              )}
              title={t(getCopyKey("This article is temporarily unavailable."))}
              variant="error"
            />
          </SectionContainer>
        )}
      </main>

      <Footer />
    </div>
  );
}
