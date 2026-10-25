import { Download } from "lucide-react";
import Image from "next/image";

import { useCopy } from "@/i18n/use-copy";
import type { CommitmentDocument } from "@/module/commitment/content/commitment-documents";
import { commitmentDocumentMediaToneClassNames } from "@/module/commitment/content/commitment-documents";
import type { PublicSiteLogos } from "@/module/contact/content/contact";
import { cn } from "@/shared/lib/utils";

type CommitmentDocumentCardProps = {
  document: CommitmentDocument;
  logos: PublicSiteLogos;
};

export function CommitmentDocumentCard({
  document,
  logos,
}: CommitmentDocumentCardProps) {
  const copy = useCopy();
  const category = document.category || copy("No document category");

  return (
    <article className="flex w-full flex-col gap-2">
      <a
        aria-label={copy("Open {title} PDF in a new tab", {
          title: document.title,
        })}
        className="group focus-visible:ring-secondary relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-lg p-3 shadow-lg focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
        href={document.fileUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0",
            commitmentDocumentMediaToneClassNames[document.mediaTone],
          )}
        />
        <span
          aria-hidden="true"
          className="commitment-card-texture absolute inset-0"
        />
        <span
          aria-hidden="true"
          className="bg-foreground/25 pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
        />

        {logos.danantaraLogoUrl || logos.plnLogoUrl ? (
          <span className="relative z-10 flex w-full items-center justify-between gap-2">
            {logos.danantaraLogoUrl ? (
              <span className="bg-background/50 relative h-8 w-1/3 rounded">
                <Image
                  alt=""
                  className="object-contain p-1"
                  fill
                  sizes="(min-width: 1024px) 10vw, 25vw"
                  src={logos.danantaraLogoUrl}
                />
              </span>
            ) : null}

            {logos.plnLogoUrl ? (
              <span className="bg-foreground/95 relative h-8 w-1/3 rounded">
                <Image
                  alt=""
                  className="object-contain p-1"
                  fill
                  sizes="(min-width: 1024px) 10vw, 25vw"
                  src={logos.plnLogoUrl}
                />
              </span>
            ) : null}
          </span>
        ) : null}

        <span className="relative z-10">
          <h3 className="text-background text-xs leading-tight font-bold break-words uppercase lg:text-sm">
            {document.title}
          </h3>
          <span className="bg-background/20 text-background mt-2 inline-flex max-w-full truncate rounded-full px-2 py-1 text-xs">
            {category}
          </span>
        </span>

        <span
          aria-hidden="true"
          className="bg-secondary text-background absolute top-1/2 left-1/2 z-20 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
        >
          <Download className="size-4" />
        </span>
      </a>

      <p className="text-foreground/60 text-xs leading-5">
        PDF · {document.fileSize} ·{" "}
        {document.uploadedAt ?? copy("Tanggal tidak tersedia")}
      </p>
    </article>
  );
}
