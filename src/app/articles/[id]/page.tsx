import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetail } from "@/module/articles/components/article-detail";
import { RelatedArticles } from "@/module/articles/components/related-articles";
import {
  articles,
  getArticleById,
  getRelatedArticles,
} from "@/module/articles/content/articles";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";

type ArticlePageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getArticleById(id);

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
  const article = getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        <ArticleDetail article={article} />
        <RelatedArticles articles={getRelatedArticles(article.id)} />
      </main>

      <Footer />
    </div>
  );
}
