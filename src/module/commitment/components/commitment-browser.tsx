import { ArrowDown } from "lucide-react";
import Link from "@/i18n/navigation";

import type { CommitmentListingData } from "@/module/commitment/lib/commitments-api";
import type { PublicSiteLogos } from "@/module/contact/content/contact";
import { Button } from "@/shared/ui/button";
import { ContentStatus } from "@/shared/components/content-status";
import { SectionContainer } from "@/shared/components/section-container";
import { CommitmentCategoryFilter } from "./commitment-category-filter";
import { CommitmentDocumentCard } from "./commitment-document-card";
import { useCopy } from "@/i18n/use-copy";

type CommitmentBrowserProps = {
  data: CommitmentListingData | null;
  error: boolean;
  logos: PublicSiteLogos;
};

function getPageHref(categoryId: number | null, page: number) {
  const query = new URLSearchParams();

  if (categoryId !== null) {
    query.set("category", String(categoryId));
  }

  query.set("page", String(page));

  return `/commitments?${query.toString()}#commitment-browser`;
}

export function CommitmentBrowser({
  data,
  error,
  logos,
}: CommitmentBrowserProps) {
  const copy = useCopy();

  return (
    <SectionContainer
      aria-labelledby="commitment-browser-heading"
      className="py-12 lg:py-20"
      id="commitment-browser"
      variant="default"
    >
      <h2 className="sr-only" id="commitment-browser-heading">
        {copy("Commitment documents")}
      </h2>

      {error && !data ? (
        <ContentStatus
          description={copy("Silakan coba lagi beberapa saat.")}
          title={copy("Dokumen komitmen sedang tidak tersedia.")}
          variant="error"
        />
      ) : null}

      {data ? (
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:gap-8">
          <div className="w-full lg:w-1/4 lg:shrink-0">
            <CommitmentCategoryFilter
              activeCategoryId={data.activeCategoryId}
              categories={data.categories}
            />
          </div>

          <div className="min-w-0 flex-1">
            {error ? (
              <ContentStatus
                description={copy("Silakan coba lagi beberapa saat.")}
                title={copy("Dokumen komitmen sedang tidak tersedia.")}
                variant="error"
              />
            ) : null}

            {!error && data.documents.length === 0 ? (
              <ContentStatus
                description={copy(
                  "Dokumen yang dipublikasikan akan ditampilkan di sini.",
                )}
                title={copy("Belum ada dokumen komitmen.")}
                variant="empty"
              />
            ) : null}

            {!error && data.documents.length > 0 ? (
              <ul
                aria-label={copy("PLN EMI commitment documents")}
                className="-m-2 flex flex-wrap"
              >
                {data.documents.map((document) => (
                  <li className="flex w-1/2 p-2 lg:w-1/3" key={document.id}>
                    <CommitmentDocumentCard document={document} logos={logos} />
                  </li>
                ))}
              </ul>
            ) : null}

            {!error && data.page < data.totalPages ? (
              <div className="mt-8 flex justify-center lg:mt-10">
                <Button
                  asChild
                  className="h-10 rounded-full px-5 text-xs font-semibold"
                  variant="outline"
                >
                  <Link
                    href={getPageHref(data.activeCategoryId, data.page + 1)}
                  >
                    {copy("Muat lebih banyak dokumen")}
                    <ArrowDown aria-hidden="true" className="size-3.5" />
                  </Link>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </SectionContainer>
  );
}
