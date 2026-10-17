import { Download, FileText } from "lucide-react";

import type { CommitmentDocument } from "@/module/commitment/content/commitment-documents";
import { commitmentDocumentMediaToneClassNames } from "@/module/commitment/content/commitment-documents";
import { cn } from "@/shared/lib/utils";

type CommitmentDocumentCardProps = {
  document: CommitmentDocument;
};

export function CommitmentDocumentCard({
  document,
}: CommitmentDocumentCardProps) {
  return (
    <article className="flex gap-4 lg:gap-5">
      <div
        aria-hidden="true"
        className={cn(
          "text-primary shadow-foreground/10 flex aspect-[3/4] w-1/5 max-w-28 shrink-0 flex-col justify-between overflow-hidden rounded-lg p-2.5 shadow-lg lg:p-3",
          commitmentDocumentMediaToneClassNames[document.mediaTone],
        )}
      >
        <span className="bg-background/90 text-accent inline-flex w-fit rounded-md p-1.5">
          <FileText aria-hidden="true" className="size-4" />
        </span>
        <span className="text-xl leading-none font-bold lg:text-2xl">PDF</span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-accent text-xs leading-tight font-bold lg:text-base">
          {document.title}
        </h3>

        <p className="text-foreground/60 mt-1 text-xs leading-4 lg:text-sm lg:leading-5">
          {document.category} · PDF · {document.fileSize} ·{" "}
          {document.uploadedAt}
        </p>

        <a
          aria-label={`Open ${document.title} PDF in a new tab`}
          className="text-secondary focus-visible:ring-secondary/50 mt-2 inline-flex w-fit items-center gap-1 text-xs font-bold focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none lg:text-sm"
          href={document.fileUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          Unduh PDF
          <Download aria-hidden="true" className="size-3 lg:size-3.5" />
        </a>
      </div>
    </article>
  );
}
