import type { CarouselApi } from "@/shared/ui/carousel";
import type { HomeSlide } from "@/module/home/content/home";
import { cn } from "@/shared/lib/utils";

type HeroIndicatorsProps = {
  activeIndex: number;
  api: CarouselApi | undefined;
  slides: HomeSlide[];
};

export function HeroIndicators({
  activeIndex,
  api,
  slides,
}: HeroIndicatorsProps) {
  return (
    <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center px-6">
      <div className="flex items-center gap-2 rounded-full bg-slate-950/20 px-3 py-2 backdrop-blur-md">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              aria-current={isActive ? "true" : undefined}
              aria-label={`Show slide ${index + 1}: ${slide.mainTitle} ${
                slide.subtitle
              }`}
              className={cn(
                "h-2.5 rounded-full bg-white/55 transition-all duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-home-primary-action focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950/40",
                isActive ? "w-8 bg-home-primary-action" : "w-2.5",
              )}
              key={slide.image}
              onClick={() => api?.scrollTo(index)}
              type="button"
            />
          );
        })}
      </div>
    </div>
  );
}
