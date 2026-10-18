import { ArrowLeft, CalendarDays, Clock3, PenLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  articleMediaToneClassNames,
  type Article,
} from "@/module/articles/content/articles";
import { SectionContainer } from "@/shared/components/section-container";
import { cn } from "@/shared/lib/utils";
import { sanitizeRichText } from "@/shared/lib/sanitize-rich-text";
import { Badge } from "@/shared/ui/badge";

type ArticleDetailProps = {
  article: Article;
};

export function ArticleDetail({ article }: ArticleDetailProps) {
  const safeContent = sanitizeRichText(article.content);

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
          "relative mt-5 aspect-[4/5] w-full overflow-hidden rounded-2xl sm:mt-6 lg:aspect-[5/2]",
          articleMediaToneClassNames[article.mediaTone],
        )}
      >
        {article.imageUrl ? (
          <Image
            alt=""
            className="object-cover"
            fill
            priority
            sizes="(min-width: 1024px) 100vw, 100vw"
            src={article.imageUrl}
          />
        ) : null}
      </div>

      <article className="mx-auto mt-8 max-w-3xl sm:mt-10 lg:mt-12" lang="id">
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
          {article.author ? (
            <span className="inline-flex items-center gap-1.5">
              <PenLine aria-hidden="true" className="size-3.5" />
              {article.author}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1.5">
            <Clock3 aria-hidden="true" className="size-3.5" />
            {article.readTime}
          </span>
        </div>

        <div
          className="text-foreground/70 [&_a]:text-secondary [&_blockquote]:border-secondary [&_h2]:text-accent [&_h3]:text-accent [&_h4]:text-accent mt-7 text-sm leading-7 sm:mt-8 sm:text-base sm:leading-8 [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mt-7 [&_h3]:text-lg [&_h3]:font-bold [&_h4]:mt-6 [&_h4]:font-bold [&_li+li]:mt-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_p+p]:mt-5 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: safeContent }}
        />
      </article>
    </SectionContainer>
  );
}
