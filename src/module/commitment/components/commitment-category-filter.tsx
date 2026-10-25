import Link from "@/i18n/navigation";

import type { CommitmentListingData } from "@/module/commitment/lib/commitments-api";
import { cn } from "@/shared/lib/utils";
import { useCopy } from "@/i18n/use-copy";

type CommitmentCategoryFilterProps = {
  activeCategoryId: number | null;
  categories: CommitmentListingData["categories"];
};

function getCategoryHref(categoryId: number | null) {
  const query = new URLSearchParams();

  if (categoryId !== null) {
    query.set("category", String(categoryId));
  }

  const queryString = query.toString();

  return `/commitments${queryString ? `?${queryString}` : ""}#commitment-browser`;
}

export function CommitmentCategoryFilter({
  activeCategoryId,
  categories,
}: CommitmentCategoryFilterProps) {
  const copy = useCopy();
  const filters = [
    { id: null, label: copy("All Documents") },
    ...categories.map((category) => ({
      id: category.id,
      label: category.name,
    })),
  ];

  return (
    <nav aria-label={copy("Filter commitment documents by category")}>
      <ul className="flex flex-wrap gap-2 lg:flex-col">
        {filters.map((filter) => {
          const isActive = filter.id === activeCategoryId;

          return (
            <li className="flex" key={filter.id ?? "all"}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "focus-visible:ring-secondary/50 w-fit rounded-lg px-3 py-3 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none lg:w-full",
                  isActive
                    ? "bg-accent text-background shadow-md"
                    : "bg-background text-accent hover:bg-primary/60 shadow-sm",
                )}
                href={getCategoryHref(filter.id)}
              >
                {filter.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
