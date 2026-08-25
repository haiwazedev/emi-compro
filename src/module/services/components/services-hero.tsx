import { SectionContainer } from "@/shared/components/section-container";

export function ServicesHero() {
  return (
    <SectionContainer
      aria-labelledby="services-page-heading"
      className="from-accent-2 via-accent-2/90 to-accent text-background bg-linear-to-r"
      contentClassName="py-14 sm:py-16 lg:py-20"
      id="services-hero"
      variant="transparent"
    >
      <p className="text-primary/70 text-xs sm:text-sm">Home / Services</p>

      <h1
        className="mt-5 font-sans text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        id="services-page-heading"
      >
        Layanan <span className="text-background">Kami</span>
      </h1>

      <p className="text-primary/80 mt-5 max-w-3xl text-sm leading-7 sm:text-base sm:leading-8">
        Explore five integrated service divisions and discover the scope,
        instruments, and expertise that can help your organization move forward.
      </p>
    </SectionContainer>
  );
}
