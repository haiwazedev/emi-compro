import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SectionContainer } from "@/shared/components/section-container";
import { Button } from "@/shared/ui/button";

export function ContactExpert() {
  return (
    <SectionContainer
      aria-labelledby="contact-expert-heading"
      className="py-14 lg:py-20"
      id="contact-expert"
      variant="default"
    >
      <div className="flex justify-center">
        <div className="flex max-w-3xl flex-col items-center text-center">
          <p className="text-secondary text-xs font-bold tracking-[0.18em] uppercase">
            NOT SURE WHERE TO START?
          </p>

          <h2
            className="text-accent mt-4 max-w-2xl font-sans text-2xl leading-tight font-bold tracking-tight sm:text-3xl"
            id="contact-expert-heading"
          >
            Our team can map the right service mix for your sustainability
            goals.
          </h2>

          <Button
            asChild
            className="bg-accent text-background hover:bg-accent/85 focus-visible:ring-secondary/50 mt-7 h-10 rounded-full px-5 text-xs font-bold"
            size="lg"
          >
            <Link href="/#contact">
              Talk to an Expert
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
