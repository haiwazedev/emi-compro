import { SectionContainer } from "@/shared/components/section-container";

export function CommitmentHero() {
  return (
    <SectionContainer
      aria-labelledby="commitment-page-heading"
      className="from-accent-2 via-accent-2/90 to-accent text-background bg-linear-to-r"
      contentClassName="py-14 sm:py-16 lg:py-20"
      id="commitment-hero"
      variant="transparent"
    >
      <p className="text-primary/70 text-xs sm:text-sm">Home / Commitment</p>

      <h1
        className="mt-5 font-sans text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        id="commitment-page-heading"
      >
        Dokumen <span className="text-primary/70">Komitmen</span>
      </h1>

      <p className="text-primary/80 mt-5 max-w-3xl text-sm leading-7 sm:text-base sm:leading-8">
        Certifications, corporate policies, and sustainability reports — the
        documents behind our promises. Uploaded and managed via CMS.
      </p>
    </SectionContainer>
  );
}
