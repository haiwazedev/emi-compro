import { SectionContainer } from "./section-container";

type PageHeroProps = {
  breadcrumb: string;
  description: string;
  headingId: string;
  id: string;
  title: string;
  titleAccent: string;
};

export function PageHero({
  breadcrumb,
  description,
  headingId,
  id,
  title,
  titleAccent,
}: PageHeroProps) {
  return (
    <SectionContainer
      aria-labelledby={headingId}
      className="from-accent-2 via-accent-2/90 to-accent text-background bg-linear-to-r"
      contentClassName="py-14 sm:py-16 lg:py-20"
      id={id}
      variant="transparent"
    >
      <p className="text-primary/70 text-xs sm:text-sm">{breadcrumb}</p>

      <h1
        className="mt-5 font-sans text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        id={headingId}
      >
        {title} <span className="text-secondary-2">{titleAccent}</span>
      </h1>

      <p className="text-primary/80 mt-5 max-w-3xl text-sm leading-7 sm:text-base sm:leading-8">
        {description}
      </p>
    </SectionContainer>
  );
}
