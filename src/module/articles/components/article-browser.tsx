"use client";

import { ArrowDown } from "lucide-react";
import { useState } from "react";

import { ArticleCard } from "@/module/articles/components/article-card";
import {
  articleCategories,
  articles,
  type ArticleCategory,
} from "@/module/articles/content/articles";
import { SectionContainer } from "@/shared/components/section-container";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

const initialVisibleArticleCount = 7;
const articlesPerLoad = 6;

export function ArticleBrowser() {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>("All");
  const [visibleArticleCount, setVisibleArticleCount] = useState(
    initialVisibleArticleCount,
  );

  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((article) => article.category === activeCategory);
  const visibleArticles = filteredArticles.slice(0, visibleArticleCount);
  const featuredArticle = visibleArticles[0];
  const supportingArticles = visibleArticles.slice(1);

  function handleCategoryChange(category: ArticleCategory) {
    setActiveCategory(category);
    setVisibleArticleCount(initialVisibleArticleCount);
  }

  return (
    <SectionContainer
      aria-labelledby="article-browser-heading"
      className="py-12 sm:py-16 lg:py-20"
      id="articles"
      variant="default"
    >
      <h2 className="sr-only" id="article-browser-heading">
        Browse articles
      </h2>

      <div
        aria-label="Filter articles by category"
        className="flex flex-wrap gap-2"
        role="group"
      >
        {articleCategories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <button
              aria-pressed={isActive}
              className={cn(
                "focus-visible:ring-secondary/50 rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none",
                isActive
                  ? "border-accent bg-accent text-background"
                  : "border-foreground/20 bg-background text-accent hover:border-secondary hover:text-secondary",
              )}
              key={category}
              onClick={() => handleCategoryChange(category)}
              type="button"
            >
              {category}
            </button>
          );
        })}
      </div>

      {featuredArticle ? (
        <ul aria-label="Featured article" className="-m-2 mt-6 flex flex-wrap">
          <li className="flex w-full p-2">
            <ArticleCard
              article={featuredArticle}
              isFeatured
              orientation="horizontal"
              showReadAction
            />
          </li>
        </ul>
      ) : null}

      {supportingArticles.length > 0 ? (
        <ul
          aria-label="More articles"
          className="-m-2 mt-4 flex flex-wrap lg:mt-6"
        >
          {supportingArticles.map((article) => (
            <li className="flex w-full p-2 lg:w-1/3" key={article.id}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      ) : null}

      {visibleArticleCount < filteredArticles.length ? (
        <div className="mt-8 flex justify-center lg:mt-10">
          <Button
            className="h-10 rounded-full px-5 text-xs font-semibold"
            onClick={() =>
              setVisibleArticleCount((count) => count + articlesPerLoad)
            }
            type="button"
            variant="outline"
          >
            Load More Articles
            <ArrowDown aria-hidden="true" className="size-3.5" />
          </Button>
        </div>
      ) : null}
    </SectionContainer>
  );
}
