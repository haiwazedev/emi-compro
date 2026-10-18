import { aboutPageContent } from "@/module/about/content/about-page";
import type { AboutMissionItem } from "@/module/about/content/about-page";
import { ContentStatus } from "@/shared/components/content-status";
import { SectionContainer } from "@/shared/components/section-container";
import { useCopy } from "@/i18n/use-copy";

type DirectionProps = {
  error: boolean;
  mission: AboutMissionItem[];
  vision: string | null;
};

export function Direction({ error, mission, vision }: DirectionProps) {
  const copy = useCopy();
  const { eyebrow, title } = aboutPageContent.direction;
  const localizedTitle = copy(title);
  const [visionTitle, missionTitle] = localizedTitle.split(" & ");
  const hasContent = Boolean(vision || mission.length > 0);

  return (
    <SectionContainer
      aria-labelledby="direction-heading"
      className="py-14 sm:py-16 lg:py-20"
      id="direction"
      variant="default"
    >
      <p className="text-secondary text-xs font-bold tracking-[0.18em] uppercase">
        {copy(eyebrow)}
      </p>
      <h2
        className="text-accent mt-3 font-sans text-3xl font-bold tracking-tight sm:text-4xl"
        id="direction-heading"
      >
        {visionTitle}{" "}
        <span className="text-secondary">&amp; {missionTitle}</span>
      </h2>

      {error || !hasContent ? (
        <ContentStatus
          description={
            error
              ? copy(
                  "Vision and mission information is temporarily unavailable. Please try again later.",
                )
              : copy(
                  "Vision and mission information is not available at this time.",
                )
          }
          title={
            error
              ? copy("Vision and mission are unavailable.")
              : copy("No vision or mission found.")
          }
          variant={error ? "error" : "empty"}
        />
      ) : (
        <div className="mt-9 flex flex-col gap-4 lg:flex-row">
          <article className="bg-accent text-background flex min-w-0 flex-1 flex-col rounded-xl p-6 sm:p-8">
            <h3 className="text-lg font-bold sm:text-xl">{copy("Vision")}</h3>
            {vision ? (
              <p className="text-primary/75 mt-5 text-sm leading-7">{vision}</p>
            ) : (
              <ContentStatus
                description={copy(
                  "Vision information is not available at this time.",
                )}
                title={copy("No vision found.")}
                variant="empty"
              />
            )}
          </article>

          <article className="bg-accent-2 text-background flex min-w-0 flex-1 flex-col rounded-xl p-6 sm:p-8">
            <h3 className="text-lg font-bold sm:text-xl">{copy("Mission")}</h3>
            {mission.length > 0 ? (
              <ol className="text-primary/80 mt-5 list-decimal space-y-3 pl-5 text-sm leading-7">
                {mission.map((item) => (
                  <li key={item.id}>
                    <span className="font-semibold">{item.title}</span>
                    <span> {item.description}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <ContentStatus
                description={copy(
                  "Mission information is not available at this time.",
                )}
                title={copy("No mission found.")}
                variant="empty"
              />
            )}
          </article>
        </div>
      )}
    </SectionContainer>
  );
}
