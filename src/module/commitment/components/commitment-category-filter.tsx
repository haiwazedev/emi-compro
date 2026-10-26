import Link from "@/i18n/navigation";

import type { CommitmentListingData } from "@/module/commitment/lib/commitments-api";
import { cn } from "@/shared/lib/utils";
import { useCopy } from "@/i18n/use-copy";

type CommitmentCategoryFilterProps = {
  activeCategorySlug: string | null;
  categories: CommitmentListingData["categories"];
};

function getCategoryHref(categorySlug: string | null) {
  const query = new URLSearchParams();

  if (categorySlug !== null) {
    query.set("category", categorySlug);
  }

  const queryString = query.toString();

  return `/commitments${queryString ? `?${queryString}` : ""}#commitment-browser`;
}

export function CommitmentCategoryFilter({
  activeCategorySlug,
  categories,
}: CommitmentCategoryFilterProps) {
  const copy = useCopy();
  const filters = [
    { slug: null, label: copy("All Documents") },
    ...categories.map((category) => ({
      slug: category.slug,
      label: category.name,
    })),
  ];

  return (
    <nav aria-label={copy("Filter commitment documents by category")}>
      <ul className="flex flex-wrap gap-2 lg:flex-col">
        {filters.map((filter) => {
          const isActive = filter.slug === activeCategorySlug;

          return (
            <li className="flex" key={filter.slug ?? "all"}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "focus-visible:ring-secondary/50 w-fit rounded-lg px-3 py-3 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none lg:w-full",
                  isActive
                    ? "bg-accent text-background shadow-md"
                    : "bg-background text-accent hover:bg-primary/60 shadow-sm",
                )}
                href={getCategoryHref(filter.slug)}
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
