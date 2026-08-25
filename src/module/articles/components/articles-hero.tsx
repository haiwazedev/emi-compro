import { SectionContainer } from "@/shared/components/section-container";

export function ArticlesHero() {
  return (
    <SectionContainer
      aria-labelledby="articles-page-heading"
      className="from-accent-2 via-accent-2/90 to-accent text-background bg-linear-to-r"
      contentClassName="py-14 sm:py-16 lg:py-20"
      id="articles-hero"
      variant="transparent"
    >
      <p className="text-primary/70 text-xs sm:text-sm">
        Home / Media &amp; Information
      </p>

      <h1
        className="mt-5 font-sans text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        id="articles-page-heading"
      >
        Berita dan <span className="text-background">Artikel</span>
      </h1>

      <p className="text-primary/80 mt-5 max-w-3xl text-sm leading-7 sm:text-base sm:leading-8">
        Trusted updates on business developments, innovation, and our
        contribution to energy resilience and sustainable growth. Managed via
        CMS.
      </p>
    </SectionContainer>
  );
}
