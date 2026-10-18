import Link from "@/i18n/navigation";

import { cn } from "@/shared/lib/utils";

type FilterCategory = {
  id: number;
  name: string;
};

type CategoryFiltersProps = {
  activeCategoryId: number | null;
  allLabel: string;
  anchorId: string;
  ariaLabel: string;
  categories: readonly FilterCategory[];
  pathname: string;
  preserveQuery?: Record<string, string | undefined>;
  queryKey: string;
};

export function CategoryFilters({
  activeCategoryId,
  allLabel,
  anchorId,
  ariaLabel,
  categories,
  pathname,
  preserveQuery,
  queryKey,
}: CategoryFiltersProps) {
  const filters = [
    { id: null, label: allLabel },
    ...categories.map((category) => ({
      id: category.id,
      label: category.name,
    })),
  ];

  return (
    <div aria-label={ariaLabel} className="flex flex-wrap gap-2" role="group">
      {filters.map((filter) => {
        const isActive = filter.id === activeCategoryId;
        const query = new URLSearchParams();

        for (const [key, value] of Object.entries(preserveQuery ?? {})) {
          if (value) {
            query.set(key, value);
          }
        }

        if (filter.id !== null) {
          query.set(queryKey, String(filter.id));
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
            key={filter.id ?? "all"}
          >
            {filter.label}
          </Link>
        );
      })}
    </div>
  );
}
