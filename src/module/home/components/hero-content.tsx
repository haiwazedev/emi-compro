import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import type { HomeSlide } from "@/module/home/content/home";
import { cn } from "@/shared/lib/utils";

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
    <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-6 pb-28 pt-32 sm:px-8 sm:pb-32 sm:pt-36 lg:px-10">
      <div className="max-w-4xl">
        <Badge
          className="h-auto rounded-full border-white/20 bg-white/10 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-home-muted shadow-lg backdrop-blur-md"
          variant="outline"
        >
          <span className="size-2 rounded-full bg-home-badge-dot animate-home-badge-pulse mr-1" />
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
            <span className="block text-home-foreground">
              {displayedSlide.mainTitle}
            </span>
            <span className="pb-2 block bg-linear-to-r from-home-subtitle-from via-home-subtitle-via to-home-subtitle-to bg-clip-text italic text-transparent">
              {displayedSlide.subtitle}
            </span>
          </h1>
          <p
            className={cn(
              "mt-6 max-w-2xl text-sm leading-8 text-home-muted lg:text-lg",
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
            className="h-12 rounded-full bg-home-primary-action px-6 text-sm font-bold text-home-primary-action-foreground shadow-xl hover:bg-home-foreground sm:px-7"
          >
            <a href="#services">Explore Solutions</a>
          </Button>
          <Button
            asChild
            className="h-12 rounded-full border-white/70 bg-white/5 px-6 text-sm font-bold text-home-foreground backdrop-blur-sm hover:bg-white/15 hover:text-home-foreground sm:px-7"
            variant="outline"
          >
            <a href="#about">Learn More</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
