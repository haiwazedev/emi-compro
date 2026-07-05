import Image from "next/image";

import type { HomeSlide } from "@/module/home/content/home";
import { cn } from "@/shared/lib/utils";

type HeroBackgroundProps = {
  activeIndex: number;
  prefersReducedMotion: boolean;
  slides: HomeSlide[];
};

export function HeroBackground({
  activeIndex,
  prefersReducedMotion,
  slides,
}: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0">
      {slides.map((slide, index) => (
        <Image
          alt={slide.imageAlt}
          aria-hidden={index !== activeIndex}
          className={cn(
            "object-cover transition-opacity duration-700 ease-out",
            prefersReducedMotion && "duration-0",
            index === activeIndex ? "opacity-100" : "opacity-0",
          )}
          fill
          key={slide.image}
          priority={index === 0}
          sizes="100vw"
          src={slide.image}
        />
      ))}
    </div>
  );
}
