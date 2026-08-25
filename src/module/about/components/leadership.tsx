import { aboutPageContent } from "@/module/about/content/about-page";
import { SectionContainer } from "@/shared/components/section-container";
import { SectionIntro } from "@/shared/components/section-intro";
import { LeadershipCard } from "./leadership-card";

export function Leadership() {
  const { description, eyebrow, groups, title } = aboutPageContent.leadership;
  const [titlePrefix, titleAccent] = title.split(" ");

  return (
    <SectionContainer
      aria-labelledby="leadership-heading"
      className="py-14 sm:py-16 lg:py-20"
      id="leadership"
      variant="subtle"
    >
      <SectionIntro
        accent={titleAccent}
        description={description}
        eyebrow={eyebrow}
        headingId="leadership-heading"
        theme="muted"
        title={titlePrefix}
      />

      <div className="mt-10 flex flex-col gap-10 lg:mt-12 lg:gap-12">
        {groups.map((group) => {
          const groupHeadingId = `leadership-${group.title
            .toLowerCase()
            .replaceAll(" ", "-")}-heading`;

          return (
            <section aria-labelledby={groupHeadingId} key={group.title}>
              <h3
                className="text-accent text-xl font-bold tracking-tight sm:text-2xl"
                id={groupHeadingId}
              >
                {group.title}
              </h3>
              <p className="text-foreground/60 mt-2 text-sm">
                {group.subtitle}
              </p>

              <ul className="-m-2 mt-5 flex flex-wrap">
                {group.members.map((member) => (
                  <li className="flex w-full p-2 lg:w-1/3" key={member.name}>
                    <LeadershipCard member={member} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </SectionContainer>
  );
}
