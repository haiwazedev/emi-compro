import Link from "@/i18n/navigation";

import { cn } from "@/shared/lib/utils";

type FilterCategory = {
  name: string;
  slug: string;
};

type CategoryFiltersProps = {
  activeCategorySlug: string | null;
  allLabel: string;
  anchorId: string;
  ariaLabel: string;
  categories: readonly FilterCategory[];
  pathname: string;
  preserveQuery?: Record<string, string | undefined>;
  queryKey: string;
};

export function CategoryFilters({
  activeCategorySlug,
  allLabel,
  anchorId,
  ariaLabel,
  categories,
  pathname,
  preserveQuery,
  queryKey,
}: CategoryFiltersProps) {
  const filters = [
    { slug: null, label: allLabel },
    ...categories.map((category) => ({
      slug: category.slug,
      label: category.name,
    })),
  ];

  return (
    <div aria-label={ariaLabel} className="flex flex-wrap gap-2" role="group">
      {filters.map((filter) => {
        const isActive = filter.slug === activeCategorySlug;
        const query = new URLSearchParams();

        for (const [key, value] of Object.entries(preserveQuery ?? {})) {
          if (value) {
            query.set(key, value);
          }
        }

        if (filter.slug !== null) {
          query.set(queryKey, filter.slug);
        }

        const queryString = query.toString();
        const href = `${pathname}${queryString ? `?${queryString}` : ""}#${anchorId}`;

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
            key={filter.slug ?? "all"}
          >
            {filter.label}
          </Link>
        );
      })}
    </div>
  );
}
