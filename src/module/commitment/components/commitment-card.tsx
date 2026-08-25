import { ArrowRight } from "lucide-react";

import type { CommitmentItem } from "@/module/commitment/content/commitment";
import { cn } from "@/shared/lib/utils";

const mediaToneClassNames: Record<CommitmentItem["mediaTone"], string> = {
  blue: "bg-linear-to-br from-secondary via-secondary/85 to-accent",
  green:
    "bg-linear-to-br from-primary via-secondary/75 to-accent",
  navy: "bg-linear-to-br from-accent via-accent/90 to-foreground",
};

type CommitmentCardProps = {
  item: CommitmentItem;
};

export function CommitmentCard({ item }: CommitmentCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-background shadow-lg shadow-foreground/10 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none">
      <div
        aria-hidden="true"
        className={cn("aspect-video shrink-0", mediaToneClassNames[item.mediaTone])}
      />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-sans text-xl font-bold leading-tight text-accent">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-foreground/70">
          {item.description}
        </p>

        <a
          className="group mt-5 inline-flex w-fit items-center gap-1 text-sm font-bold text-secondary transition-colors hover:text-accent focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
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
