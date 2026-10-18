import { aboutPageContent } from "@/module/about/content/about-page";
import type { AboutHistoryItem } from "@/module/about/content/about-page";
import { ContentStatus } from "@/shared/components/content-status";
import { SectionContainer } from "@/shared/components/section-container";
import { SectionIntro } from "@/shared/components/section-intro";
import { useCopy } from "@/i18n/use-copy";

type OurHistoryProps = {
  error: boolean;
  items: AboutHistoryItem[];
};

export function OurHistory({ error, items }: OurHistoryProps) {
  const copy = useCopy();
  const { description, eyebrow, title } = aboutPageContent.history;

  return (
    <SectionContainer
      aria-labelledby="our-history-heading"
      className="py-14 sm:py-16 lg:py-20"
      id="our-history"
      variant="muted"
    >
      <SectionIntro
        description={copy(description)}
        eyebrow={copy(eyebrow)}
        headingId="our-history-heading"
        theme="muted"
        title={copy(title)}
      />

      {items.length > 0 ? (
        <ol className="mt-10 flex max-w-4xl flex-col gap-1 lg:mt-12">
          {items.map((item, index) => (
            <li className="flex gap-4 sm:gap-5" key={item.id}>
              <div className="relative flex w-4 shrink-0 justify-center">
                <span className="border-secondary bg-primary relative z-10 mt-1.5 size-6 shrink-0 rounded-full border-4" />
                {index < items.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="bg-secondary/20 absolute top-4 bottom-0 left-1/2 w-px -translate-x-1/2"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1 pb-9 sm:pb-10">
                <p className="text-accent text-lg leading-none font-bold sm:text-xl">
                  {item.year}
                </p>
                <h3 className="text-accent mt-3 text-sm leading-6 font-bold sm:text-base">
                  {item.title}
                </h3>
                <p className="text-foreground/65 mt-1 text-xs leading-6 sm:text-sm">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <ContentStatus
          description={
            error
              ? copy(
                  "Company history is temporarily unavailable. Please try again later.",
                )
              : copy("Company history is not available at this time.")
          }
          title={
            error
              ? copy("Company history is unavailable.")
              : copy("No history found.")
          }
          variant={error ? "error" : "empty"}
        />
      )}
    </SectionContainer>
  );
}
