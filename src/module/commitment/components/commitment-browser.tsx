import { ArrowDown } from "lucide-react";
import Link from "@/i18n/navigation";

import type { CommitmentListingData } from "@/module/commitment/lib/commitments-api";
import { Button } from "@/shared/ui/button";
import { ContentStatus } from "@/shared/components/content-status";
import { SectionContainer } from "@/shared/components/section-container";
import { CommitmentDocumentCard } from "./commitment-document-card";
import { useCopy } from "@/i18n/use-copy";

type CommitmentBrowserProps = {
  data: CommitmentListingData | null;
  error: boolean;
};

function getPageHref(page: number) {
  return `/commitments?page=${page}#commitment-browser`;
}

export function CommitmentBrowser({ data, error }: CommitmentBrowserProps) {
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

      {error ? (
        <ContentStatus
          description={copy("Silakan coba lagi beberapa saat.")}
          title={copy("Dokumen komitmen sedang tidak tersedia.")}
          variant="error"
        />
      ) : null}

      {!error && data && data.documents.length === 0 ? (
        <ContentStatus
          description={copy(
            "Dokumen yang dipublikasikan akan ditampilkan di sini.",
          )}
          title={copy("Belum ada dokumen komitmen.")}
          variant="empty"
        />
      ) : null}

      {data && data.documents.length > 0 ? (
        <ul
          aria-label={copy("PLN EMI commitment documents")}
          className="-m-3 mt-6 flex flex-wrap"
        >
          {data.documents.map((document) => (
            <li className="w-full p-3 lg:w-1/2" key={document.id}>
              <CommitmentDocumentCard document={document} />
            </li>
          ))}
        </ul>
      ) : null}

      {data && data.page < data.totalPages ? (
        <div className="mt-8 flex justify-center lg:mt-10">
          <Button
            asChild
            className="h-10 rounded-full px-5 text-xs font-semibold"
            variant="outline"
          >
            <Link href={getPageHref(data.page + 1)}>
              {copy("Muat lebih banyak dokumen")}
              <ArrowDown aria-hidden="true" className="size-3.5" />
            </Link>
          </Button>
        </div>
      ) : null}
    </SectionContainer>
  );
}
