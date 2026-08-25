import { ArrowLeft, CalendarDays, Clock3, PenLine } from "lucide-react";
import Link from "next/link";

import {
  articleMediaToneClassNames,
  type Article,
  type ArticleContentBlock,
} from "@/module/articles/content/articles";
import { SectionContainer } from "@/shared/components/section-container";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

type ArticleDetailProps = {
  article: Article;
};

function ArticleContentBlockView({ block }: { block: ArticleContentBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="text-accent text-xl leading-tight font-bold sm:text-2xl">
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote className="border-secondary text-accent font-display border-l-2 pl-4 text-lg leading-8 italic sm:pl-5 sm:text-xl">
          {block.text}
        </blockquote>
      );
    case "paragraph":
      return <p>{block.text}</p>;
  }
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <SectionContainer
      aria-labelledby="article-detail-heading"
      className="py-8 sm:py-10 lg:py-12"
      variant="default"
    >
      <Link
        className="text-secondary hover:text-accent focus-visible:ring-secondary/50 inline-flex items-center gap-1 rounded-sm text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
        href="/articles"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5" />
        Back to News
      </Link>

      <div
        aria-hidden="true"
        className={cn(
          "mt-5 aspect-[4/5] w-full rounded-2xl sm:mt-6 lg:aspect-[5/2]",
          articleMediaToneClassNames[article.mediaTone],
        )}
      />

      <article className="mx-auto mt-8 max-w-3xl sm:mt-10 lg:mt-12">
        <Badge
          className="bg-primary text-accent h-auto rounded-full border-transparent px-3 py-1 text-xs font-semibold"
          variant="secondary"
        >
          {article.category}
        </Badge>

        <h1
          className="text-accent mt-4 text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl"
          id="article-detail-heading"
        >
          {article.title}
        </h1>

        <div className="text-foreground/60 border-foreground/15 mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-b pb-5 text-xs sm:mt-6">
          <time
            className="inline-flex items-center gap-1.5"
            dateTime={article.dateTime}
          >
            <CalendarDays aria-hidden="true" className="size-3.5" />
            {article.date}
          </time>
          <span className="inline-flex items-center gap-1.5">
            <PenLine aria-hidden="true" className="size-3.5" />
            {article.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 aria-hidden="true" className="size-3.5" />
            {article.readTime}
          </span>
        </div>

        <div className="text-foreground/70 mt-7 flex flex-col gap-5 text-sm leading-7 sm:mt-8 sm:gap-6 sm:text-base sm:leading-8">
          {article.content.map((block) => (
            <ArticleContentBlockView
              block={block}
              key={`${block.type}-${block.text}`}
            />
          ))}
        </div>
      </article>
    </SectionContainer>
  );
}
