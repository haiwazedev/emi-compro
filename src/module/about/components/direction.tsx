import { aboutPageContent } from "@/module/about/content/about-page";
import { SectionContainer } from "@/shared/components/section-container";

export function Direction() {
  const { eyebrow, mission, title, vision } = aboutPageContent.direction;
  const [visionTitle, missionTitle] = title.split(" & ");

  return (
    <SectionContainer
      aria-labelledby="direction-heading"
      className="py-14 sm:py-16 lg:py-20"
      id="direction"
      variant="default"
    >
      <p className="text-secondary text-xs font-bold tracking-[0.18em] uppercase">
        {eyebrow}
      </p>
      <h2
        className="text-accent mt-3 font-sans text-3xl font-bold tracking-tight sm:text-4xl"
        id="direction-heading"
      >
        {visionTitle}{" "}
        <span className="text-secondary">&amp; {missionTitle}</span>
      </h2>

      <div className="mt-9 flex flex-col gap-4 lg:flex-row">
        <article className="bg-accent text-background flex min-w-0 flex-1 flex-col rounded-xl p-6 sm:p-8">
          <h3 className="text-lg font-bold sm:text-xl">Vision</h3>
          <p className="text-primary/75 mt-5 text-sm leading-7">{vision}</p>
        </article>

        <article className="bg-accent-2 text-background flex min-w-0 flex-1 flex-col rounded-xl p-6 sm:p-8">
          <h3 className="text-lg font-bold sm:text-xl">Mission</h3>
          <ol className="text-primary/80 mt-5 list-decimal space-y-3 pl-5 text-sm leading-7">
            {mission.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
      </div>
    </SectionContainer>
  );
}
