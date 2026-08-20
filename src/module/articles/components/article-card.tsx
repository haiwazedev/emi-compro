import { CalendarDays } from "lucide-react";

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
};

export function ArticleCard({ article, isFeatured = false }: ArticleCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-articles-card shadow-lg shadow-articles-shadow/10 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none">
      <a
        aria-label={`Read ${article.title}`}
        className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-articles-accent"
        href={article.href}
      >
        <div
          aria-hidden="true"
          className={cn(
            "relative aspect-video shrink-0",
            mediaToneClassNames[article.mediaTone],
          )}
        >
          <Badge
            className="absolute bottom-3 left-3 h-auto rounded-full border-transparent bg-articles-card px-3 py-1 text-xs font-semibold text-articles-foreground shadow-sm"
            variant="secondary"
          >
            {article.category}
          </Badge>
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col",
            isFeatured ? "p-6 sm:p-7" : "p-5",
          )}
        >
          <time
            className="inline-flex items-center gap-1.5 text-xs text-articles-muted"
            dateTime={article.dateTime}
          >
            <CalendarDays aria-hidden="true" className="size-3" />
            {article.date}
          </time>

          <h3
            className={cn(
              "mt-3 font-sans font-bold leading-tight text-articles-foreground",
              isFeatured ? "text-xl sm:text-2xl" : "text-lg",
            )}
          >
            {article.title}
          </h3>

          <p
            className={cn(
              "mt-3 text-xs leading-6 text-articles-muted",
              isFeatured && "sm:text-sm sm:leading-7",
            )}
          >
            {article.description}
          </p>
        </div>
      </a>
    </article>
  );
}
