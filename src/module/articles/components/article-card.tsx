import { ArrowRight, CalendarDays } from "lucide-react";

import type { Article } from "@/module/articles/content/articles";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

const mediaToneClassNames: Record<Article["mediaTone"], string> = {
  amber: "article-media-amber",
  blue: "article-media-blue",
  green: "article-media-green",
  navy: "article-media-navy",
  slate: "article-media-slate",
};

type ArticleCardProps = {
  article: Article;
  isFeatured?: boolean;
  orientation?: "horizontal" | "vertical";
  showReadAction?: boolean;
};

export function ArticleCard({
  article,
  isFeatured = false,
  orientation = "vertical",
  showReadAction = false,
}: ArticleCardProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <article
      className={cn(
        "bg-background shadow-foreground/10 flex h-full w-full flex-col overflow-hidden rounded-2xl shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none",
        isHorizontal && "lg:flex-row",
      )}
    >
      <a
        aria-label={`Read ${article.title}`}
        className={cn(
          "focus-visible:ring-secondary flex h-full w-full flex-col focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset",
          isHorizontal && "lg:flex-row",
        )}
        href={article.href}
      >
        <div
          aria-hidden="true"
          className={cn(
            "relative aspect-video shrink-0",
            isHorizontal && "lg:aspect-auto lg:w-1/2",
            mediaToneClassNames[article.mediaTone],
          )}
        >
          <Badge
            className="bg-background text-accent shadow-foreground/10 absolute bottom-3 left-3 h-auto rounded-full border-transparent px-3 py-1 text-xs font-semibold shadow-sm"
            variant="secondary"
          >
            {article.category}
          </Badge>
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col",
            isFeatured ? "p-6 sm:p-7" : "p-5",
            isHorizontal && "lg:w-1/2 lg:justify-center lg:p-8",
          )}
        >
          <time
            className="text-foreground/70 inline-flex items-center gap-1.5 text-xs"
            dateTime={article.dateTime}
          >
            <CalendarDays aria-hidden="true" className="size-3" />
            {article.date}
          </time>

          <h3
            className={cn(
              "text-accent mt-3 font-sans leading-tight font-bold",
              isFeatured ? "text-xl sm:text-2xl" : "text-lg",
            )}
          >
            {article.title}
          </h3>

          <p
            className={cn(
              "text-foreground/70 mt-3 text-xs leading-6",
              isFeatured && "sm:text-sm sm:leading-7",
            )}
          >
            {article.description}
          </p>

          {showReadAction ? (
            <span className="text-secondary mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
              Read article
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </span>
          ) : null}
        </div>
      </a>
    </article>
  );
}
