import "server-only";

import { cache } from "react";

import {
  ApiClientError,
  apiGet,
  resolveApiAssetUrl,
} from "@/shared/lib/api-client";
import {
  articleMediaToneClassNames,
  type Article,
  type ArticleCategory,
  type ArticleMediaTone,
} from "@/module/articles/content/articles";

const ARTICLES_PER_PAGE = 7;
const HOME_ARTICLE_LIMIT = 5;
const RELATED_ARTICLE_LIMIT = 4;
const mediaTones = Object.keys(
  articleMediaToneClassNames,
) as ArticleMediaTone[];

type ApiLanguage = {
  abbreviated_language: string;
  id: number;
  is_active: boolean;
};

type ApiArticleContent = {
  content: string;
  language_id: number;
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
  read_time?: number;
  slug?: string;
  status?: "DRAFT" | "PUBLISHED";
  summary?: string;
  title?: string;
  language_id?: number;
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

function getMediaUrl(path: string | null) {
  if (!path) {
    return null;
  }

  return resolveApiAssetUrl(path);
}

const getIndonesianLanguageId = cache(async () => {
  const { languages } = await apiGet<ApiLanguagesResponse>("/languages");
  const indonesianLanguage = languages.find(
    (language) =>
      language.is_active &&
      language.abbreviated_language.toUpperCase() === "ID",
  );

  if (!indonesianLanguage) {
    throw new ArticlesApiError("Indonesian article content is unavailable.");
  }

  return indonesianLanguage.id;
});

const getArticleCategories = cache(async () => {
  const { articleCategories } = await apiGet<ApiCategoriesResponse>(
    "/article_categories",
  );

  return articleCategories;
});

function formatArticleDate(dateValue: string) {
  const normalizedValue = /^\d{4}-\d{2}-\d{2}$/.test(dateValue)
    ? `${dateValue}T00:00:00.000Z`
    : dateValue;
  const date = new Date(normalizedValue);

  if (Number.isNaN(date.getTime())) {
    throw new ArticlesApiError("An article has an invalid publication date.");
  }

  return {
    date: new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      timeZone: "UTC",
      year: "numeric",
    }).format(date),
    dateTime: date.toISOString().slice(0, 10),
  };
}

function mapArticle(article: ApiArticle): Article {
  const date = formatArticleDate(article.issue_date ?? article.created_at);
  const tone = mediaTones[article.id % mediaTones.length];

  return {
    author: article.cp_name,
    category: article.article_category?.name ?? "Articles",
    categoryId: article.article_category_id,
    content: article.contents?.[0]?.content ?? "",
    date: date.date,
    dateTime: date.dateTime,
    description: article.contents?.[0]?.summary ?? article.summary ?? "",
    id: article.id,
    imageUrl: getMediaUrl(article.primary_photo_url),
    mediaTone: tone,
    readTime: `${article.contents?.[0]?.read_time ?? article.read_time ?? 1} min read`,
    title: article.contents?.[0]?.title ?? article.title ?? "",
  };
}

async function getPublishedArticlePage(options: {
  categoryId?: number;
  languageId: number;
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

function resolveCategoryId(
  categories: ArticleCategory[],
  categoryId: number | undefined,
) {
  return categories.some((category) => category.id === categoryId)
    ? categoryId!
    : undefined;
}

export async function getHomeArticleData(
  requestedCategoryId?: number,
): Promise<HomeArticleData> {
  const [languageId, categories] = await Promise.all([
    getIndonesianLanguageId(),
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
    articles: articles.map(mapArticle),
    categories,
  };
}

export async function getArticleListingData(options: {
  categoryId?: number;
  page: number;
}): Promise<ArticleListingData> {
  const [languageId, categories] = await Promise.all([
    getIndonesianLanguageId(),
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
    articles: uniqueArticles.map(mapArticle),
    categories,
    page: currentPage,
    totalPages,
  };
}

export const getArticleById = cache(
  async (articleId: number): Promise<Article | null> => {
    const languageId = await getIndonesianLanguageId();
    let response: ApiArticleDetailResponse;

    try {
      response = await apiGet<ApiArticleDetailResponse>(
        `/articles/${articleId}`,
      );
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 404) {
        return null;
      }

      throw error;
    }

    const article = response.article;
    const content = article.contents?.find(
      (item) => item.language_id === languageId && item.status === "PUBLISHED",
    );

    if (!content) {
      return null;
    }

    return mapArticle({
      ...article,
      contents: [content],
      language_id: languageId,
      status: content.status,
      summary: content.summary,
      title: content.title,
      read_time: content.read_time,
      slug: content.slug,
    });
  },
);

export async function getRelatedArticles(
  articleId: number,
): Promise<Article[]> {
  const languageId = await getIndonesianLanguageId();
  const { articles } = await getPublishedArticlePage({
    languageId,
    limit: RELATED_ARTICLE_LIMIT,
    page: 1,
  });

  return articles
    .filter((article) => article.id !== articleId)
    .slice(0, 3)
    .map(mapArticle);
}
