import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { aboutPageContent } from "@/module/about/content/about-page";
import { SectionContainer } from "@/shared/components/section-container";
import { Button } from "@/shared/ui/button";

export function CompanyProfile() {
  const { eyebrow, paragraphs, partOfLabel, partOfValue, title } =
    aboutPageContent.companyProfile;

  return (
    <SectionContainer
      aria-labelledby="company-profile-heading"
      className="py-14 sm:py-16 lg:py-20"
      id="company-profile"
      variant="default"
    >
      <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="min-w-0 flex-1">
          <p className="text-secondary text-xs font-bold tracking-[0.18em] uppercase">
            {eyebrow}
          </p>
          <h2
            className="text-accent mt-3 font-sans text-3xl font-bold tracking-tight sm:text-4xl"
            id="company-profile-heading"
          >
            {title}
          </h2>

          <div className="text-foreground/70 mt-6 space-y-5 text-sm leading-7">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-secondary/25 text-accent hover:bg-secondary/35 focus-visible:ring-secondary/50 h-9 rounded-full px-4 text-xs font-bold shadow-none"
            >
              <Link href="/#services">
                Our Services
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </Button>
            <Button
              asChild
              className="border-accent/40 text-accent hover:bg-primary focus-visible:ring-secondary/50 h-9 rounded-full px-4 text-xs font-bold shadow-none"
              variant="outline"
            >
              <Link href="/#commitment">Our Commitment</Link>
            </Button>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1">
          <div className="from-secondary via-accent to-foreground shadow-foreground/15 relative aspect-video overflow-hidden rounded-xl bg-linear-to-br shadow-xl">
            <div
              aria-hidden="true"
              className="from-background/10 to-foreground/25 absolute inset-0 bg-linear-to-br via-transparent"
            />
            <div className="bg-background text-accent shadow-foreground/20 absolute inset-x-6 bottom-6 rounded-lg px-4 py-3 shadow-lg sm:inset-x-8 sm:bottom-8 sm:max-w-xs">
              <p className="text-secondary text-[0.55rem] font-bold tracking-[0.16em] uppercase">
                {partOfLabel}
              </p>
              <p className="mt-1 text-xs font-bold sm:text-sm">{partOfValue}</p>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
