import Link from "next/link";

import type { ArticleCategory } from "@/module/articles/content/articles";
import { cn } from "@/shared/lib/utils";

type ArticleCategoryFiltersProps = {
  activeCategoryId: number | null;
  categories: readonly ArticleCategory[];
  pathname: string;
  queryKey: string;
};

export function ArticleCategoryFilters({
  activeCategoryId,
  categories,
  pathname,
  queryKey,
}: ArticleCategoryFiltersProps) {
  const filters = [
    { id: null, label: "All" },
    ...categories.map((category) => ({
      id: category.id,
      label: category.name,
    })),
  ];

  return (
    <div
      aria-label="Filter articles by category"
      className="flex flex-wrap gap-2"
      role="group"
    >
      {filters.map((filter) => {
        const isActive = filter.id === activeCategoryId;
        const query = new URLSearchParams();

        if (filter.id !== null) {
          query.set(queryKey, String(filter.id));
        }

        const queryString = query.toString();
        const href = `${pathname}${queryString ? `?${queryString}` : ""}#articles`;

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "focus-visible:ring-secondary/50 rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none",
              isActive
                ? "border-accent bg-accent text-background"
                : "border-foreground/20 bg-background text-accent hover:border-secondary hover:text-secondary",
            )}
            href={href}
            key={filter.id ?? "all"}
          >
            {filter.label}
          </Link>
        );
      })}
    </div>
  );
}
