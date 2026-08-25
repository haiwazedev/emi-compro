import type { HomeSlide } from "@/module/home/content/home";
import { SectionContainer } from "@/shared/components/section-container";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";

import { ArrowRightIcon } from "lucide-react";
import type { CopyTransitionState } from "../hooks/use-hero-carousel";

type HeroContentProps = {
  copyAnimationClassName: string;
  copyTransitionState: CopyTransitionState;
  displayedSlide: HomeSlide;
};

export function HeroContent({
  copyAnimationClassName,
  copyTransitionState,
  displayedSlide,
}: HeroContentProps) {
  return (
    <SectionContainer
      as="div"
      className="relative z-10"
      contentClassName="flex min-h-svh flex-col justify-center pb-28 pt-32 sm:pb-32 sm:pt-36"
      variant="transparent"
    >
      <div className="max-w-4xl">
        <Badge
          className="h-auto rounded-full border-background/20 bg-background/10 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-md"
          variant="outline"
        >
          <span className="mr-1 size-2 animate-home-badge-pulse rounded-full bg-accent-2" />
          Powering Indonesia Sustainable Future
        </Badge>

        <div aria-live="polite" className="mt-8">
          <h1
            className={cn(
              "font-display text-6xl leading-[0.95] text-balance sm:text-7xl md:text-8xl xl:text-7xl",
              copyAnimationClassName,
            )}
            key={`title-${displayedSlide.mainTitle}-${copyTransitionState}`}
          >
            <span className="block text-background">
              {displayedSlide.mainTitle}
            </span>
            <span className="block bg-linear-to-r from-secondary via-primary to-background bg-clip-text pb-2 text-transparent italic">
              {displayedSlide.subtitle}
            </span>
          </h1>
          <p
            className={cn(
              "mt-6 max-w-2xl text-sm leading-8 text-primary/80 lg:text-lg",
              copyAnimationClassName,
            )}
            key={`description-${displayedSlide.description}-${copyTransitionState}`}
          >
            {displayedSlide.description}
          </p>
        </div>

        <div className="mt-9 flex flex-wrap gap-3 sm:gap-4">
          <Button
            asChild
            className="h-12 rounded-full bg-primary px-6 text-sm font-bold text-accent hover:bg-background sm:px-7"
          >
            <div className="flex items-center gap-2">
              <a href="#services">Explore Services</a>
              <ArrowRightIcon />
            </div>
          </Button>
          <Button
            asChild
            className="h-12 rounded-full border-background/70 bg-background/5 px-6 text-sm font-bold text-background hover:bg-background/15 hover:text-background sm:px-7"
            variant="outline"
          >
            <a href="#about">Learn More</a>
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
