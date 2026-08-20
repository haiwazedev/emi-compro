import { ArrowRight } from "lucide-react";

import type { CommitmentItem } from "@/module/commitment/content/commitment";
import { cn } from "@/shared/lib/utils";

const mediaToneClassNames: Record<CommitmentItem["mediaTone"], string> = {
  blue: "bg-linear-to-br from-services-nav-blue via-services-nav-blue/85 to-services-nav-navy",
  green:
    "bg-linear-to-br from-services-nav-teal via-services-nav-teal/85 to-services-nav-navy",
  navy: "bg-linear-to-br from-services-nav-navy via-services-nav-navy/90 to-services-nav-slate",
};

type CommitmentCardProps = {
  item: CommitmentItem;
};

export function CommitmentCard({ item }: CommitmentCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-neutral shadow-lg shadow-services-shadow/10 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none">
      <div
        aria-hidden="true"
        className={cn("aspect-video shrink-0", mediaToneClassNames[item.mediaTone])}
      />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-sans text-xl font-bold leading-tight text-partners-foreground">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-partners-muted">
          {item.description}
        </p>

        <a
          className="group mt-5 inline-flex w-fit items-center gap-1 text-sm font-bold text-partners-accent transition-colors hover:text-partners-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-partners-accent/50"
          href={item.href}
        >
          Browse documents
          <ArrowRight
            aria-hidden="true"
            className="size-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </a>
      </div>
    </article>
  );
}
