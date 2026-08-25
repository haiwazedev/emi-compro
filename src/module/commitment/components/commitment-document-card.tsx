import { Download } from "lucide-react";

import type {
  CommitmentDocument,
  CommitmentDocumentMediaTone,
} from "@/module/commitment/content/commitment-documents";
import { cn } from "@/shared/lib/utils";

const mediaToneClassNames: Record<CommitmentDocumentMediaTone, string> = {
  amber: "bg-linear-to-br from-amber-500 via-amber-500 to-amber-600",
  blue: "bg-linear-to-br from-secondary via-secondary/85 to-accent",
  green: "bg-linear-to-br from-accent-2 via-accent-2/85 to-secondary",
  navy: "bg-linear-to-br from-accent via-accent/90 to-foreground",
  slate: "bg-linear-to-br from-secondary/75 via-secondary to-accent",
  teal: "bg-linear-to-br from-accent-2 via-accent-2/80 to-foreground",
};

type CommitmentDocumentCardProps = {
  document: CommitmentDocument;
};

export function CommitmentDocumentCard({
  document,
}: CommitmentDocumentCardProps) {
  return (
    <article className="flex gap-4 sm:gap-5">
      <div
        aria-hidden="true"
        className={cn(
          "text-primary shadow-foreground/10 flex aspect-[3/4] w-1/5 max-w-28 shrink-0 flex-col justify-between overflow-hidden rounded-lg p-2.5 shadow-lg sm:p-3",
          mediaToneClassNames[document.mediaTone],
        )}
      >
        <span className="text-[0.4rem] leading-[1.3] font-bold tracking-[0.12em] whitespace-pre-line uppercase lg:text-[0.5rem]">
          {document.coverLabel}
        </span>
        <span className="text-xl leading-none font-bold sm:text-2xl">
          {document.coverCode}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-accent text-xs leading-tight font-bold sm:text-base">
          {document.title}aa
        </h3>

        <p className="text-foreground/60 mt-1 text-[0.65rem] leading-4 sm:text-sm sm:leading-5">
          {document.category} · {document.fileType} · {document.fileSize} ·{" "}
          {document.uploadedAt}
        </p>

        <button
          aria-label={`Download ${document.title} (not available yet)`}
          className="text-secondary mt-2 inline-flex w-fit items-center gap-1 text-xs font-bold disabled:cursor-default disabled:opacity-100 sm:text-sm"
          disabled
          type="button"
        >
          Unduh
          <Download aria-hidden="true" className="size-3 sm:size-3.5" />
        </button>
      </div>
    </article>
  );
}
