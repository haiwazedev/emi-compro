export type ArticleCategory = {
  id: number;
  name: string;
  slug: string;
};

export type ArticleMediaTone = "blue" | "green" | "amber" | "slate" | "navy";

export const articleMediaToneClassNames: Record<ArticleMediaTone, string> = {
  amber: "article-media-amber",
  blue: "article-media-blue",
  green: "article-media-green",
  navy: "article-media-navy",
  slate: "article-media-slate",
};

export type Article = {
  alternateSlugs: Partial<Record<"id" | "en", string>>;
  author: string | null;
  category: string;
  categoryId: number;
  content: string;
  date: string;
  dateTime: string;
  description: string;
  id: number;
  imageUrl: string | null;
  mediaTone: ArticleMediaTone;
  readTime: number;
  slug: string;
  title: string;
};

export function getArticleHref(slug: string) {
  return `/articles/${encodeURIComponent(slug)}`;
}
