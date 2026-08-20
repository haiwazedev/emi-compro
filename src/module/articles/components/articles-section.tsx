"use client";

import { ArrowRight } from "lucide-react";

import { ArticleCard } from "@/module/articles/components/article-card";
import {
  articleCategories,
  articles,
  type ArticleCategory,
} from "@/module/articles/content/articles";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { useState } from "react";

export function ArticlesSection() {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>("All");

  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  const [featuredArticle, ...supportingArticles] = filteredArticles;

  return (
    <section
      aria-labelledby="articles-heading"
      className="scroll-mt-20 bg-articles-background px-8 py-16 sm:py-20 lg:px-10 lg:py-24"
      id="articles"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div className="shrink-0 lg:basis-1/3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-articles-accent">
              MEDIA &amp; INFORMATION
            </p>
            <h2
              className="mt-3 font-sans text-3xl font-bold leading-tight tracking-tight text-articles-foreground sm:text-4xl"
              id="articles-heading"
            >
              Our Latest <span className="text-articles-accent">Articles</span>
            </h2>
          </div>

          <p className="text-sm leading-7 text-articles-muted lg:flex-1">
            Trusted updates on business developments, innovation, and our
            contribution to energy resilience and sustainable growth.
          </p>

          <Button
            asChild
            className="h-10 w-fit rounded-full border-articles-foreground bg-transparent px-5 text-xs font-semibold text-articles-foreground hover:bg-articles-foreground hover:text-articles-background"
            variant="outline"
          >
            <a href="#articles">
              See All News
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </a>
          </Button>
        </div>

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
                  "rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-articles-accent/50",
                  isActive
                    ? "border-articles-foreground bg-articles-foreground text-neutral"
                    : "border-articles-card-border bg-articles-card text-articles-foreground hover:border-articles-accent hover:text-articles-accent",
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
      </div>
    </section>
  );
}
