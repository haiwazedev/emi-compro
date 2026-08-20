import { ArrowRight } from "lucide-react";

import { CommitmentCard } from "@/module/commitment/components/commitment-card";
import { commitmentItems } from "@/module/commitment/content/commitment";
import { SectionContainer } from "@/shared/components/section-container";
import { Button } from "@/shared/ui/button";

export function CommitmentSection() {
  return (
    <SectionContainer
      aria-labelledby="commitment-heading"
      className="py-16 sm:py-20 lg:py-24"
      id="commitment"
      variant="default"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
        <div className="shrink-0 lg:basis-1/3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-partners-accent">
            COMMITMENT
          </p>
          <h2
            className="mt-3 font-sans text-3xl font-bold leading-tight tracking-tight text-partners-foreground sm:text-4xl"
            id="commitment-heading"
          >
            Our <span className="text-partners-accent">Commitment</span>
          </h2>
        </div>

        <p className="text-sm leading-7 text-partners-muted lg:flex-1">
          Certifications, corporate policies, and sustainability reports — the
          documents behind our promises, available for download.
        </p>

        <Button
          asChild
          className="h-10 w-full rounded-full border-partners-foreground bg-transparent px-5 text-xs font-semibold text-partners-foreground hover:bg-partners-foreground hover:text-neutral lg:w-auto"
          variant="outline"
        >
          <a href="#commitment">
            Document Library
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </a>
        </Button>
      </div>

      <ul
        aria-label="PLN EMI commitment resources"
        className="-m-2 mt-10 flex flex-wrap lg:mt-12"
      >
        {commitmentItems.map((item) => (
          <li className="flex w-full p-2 lg:w-1/3" key={item.id}>
            <CommitmentCard item={item} />
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
