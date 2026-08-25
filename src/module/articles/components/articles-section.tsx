"use client";

import { ArticleCard } from "@/module/articles/components/article-card";
import {
  articleCategories,
  articles,
  type ArticleCategory,
} from "@/module/articles/content/articles";
import { SectionContainer } from "@/shared/components/section-container";
import { SectionIntro } from "@/shared/components/section-intro";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";

export function ArticlesSection() {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>("All");

  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  const [featuredArticle, ...supportingArticles] = filteredArticles;

  return (
    <SectionContainer
      aria-labelledby="articles-heading"
      className="py-16 sm:py-20 lg:py-24"
      id="articles"
      variant="subtle"
    >
      <SectionIntro
        accent="Articles"
        action={{ href: "#articles", label: "See All News" }}
        description="Trusted updates on business developments, innovation, and our contribution to energy resilience and sustainable growth."
        eyebrow="MEDIA & INFORMATION"
        headingId="articles-heading"
        theme="muted"
        title="Our Latest"
      />

      <div
        aria-label="Filter articles by category"
        className="mt-10 flex flex-wrap gap-2"
        role="group"
      >
        {articleCategories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <button
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50",
                isActive
                  ? "border-accent bg-accent text-background"
                  : "border-foreground/20 bg-background text-accent hover:border-secondary hover:text-secondary",
              )}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          );
        })}
      </div>

      {filteredArticles.length === 1 ? (
        <ul aria-label="Latest articles" className="-m-2 mt-6 flex flex-wrap">
          <li className="flex w-full p-2">
            <ArticleCard article={featuredArticle} isFeatured />
          </li>
        </ul>
      ) : (
        <ul aria-label="Latest articles" className="-m-2 mt-6 flex flex-wrap">
          <li className="flex w-full p-2 lg:w-5/12">
            <ArticleCard article={featuredArticle} isFeatured />
          </li>

          <li className="w-full p-2 lg:w-7/12">
            <ul className="-m-2 flex flex-wrap">
              {supportingArticles.map((article) => (
                <li
                  className={cn(
                    "flex w-full p-2",
                    supportingArticles.length > 1 && "lg:w-1/2",
                  )}
                  key={article.id}
                >
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      )}
    </SectionContainer>
  );
}
