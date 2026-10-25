import "server-only";

import { cache } from "react";

import type { Locale } from "@/i18n/routing";
import {
  articleMediaToneClassNames,
  type Article,
  type ArticleCategory,
  type ArticleMediaTone,
} from "@/module/articles/content/articles";
import {
  ApiClientError,
  apiGet,
  resolveApiAssetUrl,
} from "@/shared/lib/api-client";

const ARTICLES_PER_PAGE = 7;
const HOME_ARTICLE_LIMIT = 5;
const RELATED_ARTICLE_LIMIT = 4;
const mediaTones = Object.keys(
  articleMediaToneClassNames,
) as ArticleMediaTone[];

type ApiLanguage = {
  id: string;
};

type ApiArticleContent = {
  content: string;
  language_id: string;
  read_time: number;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  summary: string;
  title: string;
};

type ApiArticle = {
  article_category: ArticleCategory | null;
  article_category_id: number;
  contents?: ApiArticleContent[];
  cp_name: string | null;
  created_at: string;
  id: number;
  issue_date: string | null;
  primary_photo_url: string | null;
  content?: string;
  read_time?: number;
  slug?: string;
  status?: "DRAFT" | "PUBLISHED";
  summary?: string;
  title?: string;
  language_id?: string;
};

type ApiArticleListResponse = {
  articles: ApiArticle[];
  pagination: {
    page: number;
    totalItems: number;
    totalPages: number;
  };
};

type ApiArticleDetailResponse = {
  article: ApiArticle;
};

type ApiCategoriesResponse = {
  articleCategories: ArticleCategory[];
};

type ApiLanguagesResponse = {
  languages: ApiLanguage[];
};

export class ArticlesApiError extends ApiClientError {
  constructor(message: string, status?: number) {
    super(message, status);
    this.name = "ArticlesApiError";
  }
}

export type ArticleListingData = {
  activeCategoryId: number | null;
  articles: Article[];
  categories: ArticleCategory[];
  page: number;
  totalPages: number;
};

export type HomeArticleData = {
  activeCategoryId: number | null;
  articles: Article[];
  categories: ArticleCategory[];
};

export type PublishedArticleSitemapEntry = {
  slug: string;
};

function getMediaUrl(path: string | null) {
  if (!path) {
    return null;
  }

  return resolveApiAssetUrl(path);
}

const getLanguageId = cache(async (locale: Locale) => {
  const { languages } = await apiGet<ApiLanguagesResponse>("/languages");
  const selectedLanguage = languages.find((language) => language.id === locale);

  if (!selectedLanguage) {
    throw new ArticlesApiError(
      "Article content is unavailable in this language.",
    );
  }

  return selectedLanguage.id;
});

const getArticleCategories = cache(async () => {
  const { articleCategories } = await apiGet<ApiCategoriesResponse>(
    "/article_categories",
  );

  return articleCategories;
});

function formatArticleDate(dateValue: string, locale: Locale) {
  const normalizedValue = /^\d{4}-\d{2}-\d{2}$/.test(dateValue)
    ? `${dateValue}T00:00:00.000Z`
    : dateValue;
  const date = new Date(normalizedValue);

  if (Number.isNaN(date.getTime())) {
    throw new ArticlesApiError("An article has an invalid publication date.");
  }

  return {
    date: new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "short",
      timeZone: "UTC",
      year: "numeric",
    }).format(date),
    dateTime: date.toISOString().slice(0, 10),
  };
}

function mapArticle(article: ApiArticle, locale: Locale): Article {
  const translatedContent = article.contents?.find(
    (item) => item.language_id === locale,
  );
  const content =
    translatedContent ?? (article.language_id === locale ? article : undefined);

  if (!content) {
    throw new ArticlesApiError(
      "Article content is unavailable in this language.",
    );
  }

  const slug = content.slug;

  if (!slug) {
    throw new ArticlesApiError("An article is missing its slug.");
  }

  const date = formatArticleDate(
    article.issue_date ?? article.created_at,
    locale,
  );
  const tone = mediaTones[article.id % mediaTones.length];
  const alternateSlugs = Object.fromEntries(
    (article.contents ?? []).map((item) => [item.language_id, item.slug]),
  ) as Partial<Record<Locale, string>>;

  return {
    alternateSlugs,
    author: article.cp_name,
    category: article.article_category?.name ?? "",
    categoryId: article.article_category_id,
    content: content.content ?? "",
    date: date.date,
    dateTime: date.dateTime,
    description: content.summary ?? "",
    id: article.id,
    imageUrl: getMediaUrl(article.primary_photo_url),
    mediaTone: tone,
    readTime: content.read_time ?? 1,
    slug,
    title: content.title ?? "",
  };
}

async function getPublishedArticlePage(options: {
  categoryId?: number;
  languageId: string;
  limit: number;
  page: number;
}) {
  const { categoryId, languageId, limit, page } = options;
  const query: Record<string, number | string> = {
    language_id: languageId,
    limit,
    page,
    status: "PUBLISHED",
  };

  if (categoryId !== undefined) {
    query.article_category_id = categoryId;
  }

  return apiGet<ApiArticleListResponse>("/articles", query);
}

export async function getPublishedArticleSitemapEntries(
  locale: Locale,
): Promise<PublishedArticleSitemapEntry[]> {
  const languageId = await getLanguageId(locale);
  const firstPage = await getPublishedArticlePage({
    languageId,
    limit: ARTICLES_PER_PAGE,
    page: 1,
  });
  const remainingPages = await Promise.all(
    Array.from(
      { length: Math.max(0, firstPage.pagination.totalPages - 1) },
      (_, index) =>
        getPublishedArticlePage({
          languageId,
          limit: ARTICLES_PER_PAGE,
          page: index + 2,
        }),
    ),
  );
  const articles = [firstPage, ...remainingPages].flatMap(
    (page) => page.articles,
  );
  const slugs = articles.flatMap((article) => {
    const localizedContent = article.contents?.find(
      (content) =>
        content.language_id === languageId && content.status === "PUBLISHED",
    );

    if (localizedContent?.slug) {
      return [localizedContent.slug];
    }

    if (
      article.language_id === languageId &&
      article.status === "PUBLISHED" &&
      article.slug
    ) {
      return [article.slug];
    }

    return [];
  });

  return Array.from(new Set(slugs), (slug) => ({ slug }));
}

function resolveCategoryId(
  categories: ArticleCategory[],
  categoryId: number | undefined,
) {
  return categories.some((category) => category.id === categoryId)
    ? categoryId!
    : undefined;
}

export async function getHomeArticleData(
  locale: Locale,
  requestedCategoryId?: number,
): Promise<HomeArticleData> {
  const [languageId, categories] = await Promise.all([
    getLanguageId(locale),
    getArticleCategories(),
  ]);
  const categoryId = resolveCategoryId(categories, requestedCategoryId);
  const { articles } = await getPublishedArticlePage({
    categoryId,
    languageId,
    limit: HOME_ARTICLE_LIMIT,
    page: 1,
  });

  return {
    activeCategoryId: categoryId ?? null,
    articles: articles.map((article) => mapArticle(article, locale)),
    categories,
  };
}

export async function getArticleListingData(options: {
  categoryId?: number;
  locale: Locale;
  page: number;
}): Promise<ArticleListingData> {
  const [languageId, categories] = await Promise.all([
    getLanguageId(options.locale),
    getArticleCategories(),
  ]);
  const categoryId = resolveCategoryId(categories, options.categoryId);
  const firstPage = await getPublishedArticlePage({
    categoryId,
    languageId,
    limit: ARTICLES_PER_PAGE,
    page: 1,
  });
  const totalPages = Math.max(1, firstPage.pagination.totalPages);
  const currentPage = Math.min(options.page, totalPages);

  const remainingPages = await Promise.all(
    Array.from({ length: currentPage - 1 }, (_, index) =>
      getPublishedArticlePage({
        categoryId,
        languageId,
        limit: ARTICLES_PER_PAGE,
        page: index + 2,
      }),
    ),
  );
  const articles = [
    ...firstPage.articles,
    ...remainingPages.flatMap((page) => page.articles),
  ];
  const uniqueArticles = Array.from(
    new Map(articles.map((article) => [article.id, article])).values(),
  );

  return {
    activeCategoryId: categoryId ?? null,
    articles: uniqueArticles.map((article) =>
      mapArticle(article, options.locale),
    ),
    categories,
    page: currentPage,
    totalPages,
  };
}

export const getArticleBySlug = cache(
  async (slug: string, locale: Locale): Promise<Article | null> => {
    let response: ApiArticleDetailResponse;

    try {
      response = await apiGet<ApiArticleDetailResponse>(
        `/articles/slug/${encodeURIComponent(slug)}`,
      );
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 404) {
        return null;
      }

      throw error;
    }

    const article = response.article;
    const content = article.contents?.find(
      (item) =>
        item.slug === slug &&
        item.language_id === locale &&
        item.status === "PUBLISHED",
    );

    if (!content) {
      return null;
    }

    return mapArticle(article, locale);
  },
);

export async function getRelatedArticles(
  articleId: number,
  locale: Locale,
): Promise<Article[]> {
  const languageId = await getLanguageId(locale);
  const { articles } = await getPublishedArticlePage({
    languageId,
    limit: RELATED_ARTICLE_LIMIT,
    page: 1,
  });

  return articles
    .filter((article) => article.id !== articleId)
    .slice(0, 3)
    .map((article) => mapArticle(article, locale));
}
