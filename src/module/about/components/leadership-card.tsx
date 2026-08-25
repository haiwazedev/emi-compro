import type { LeadershipMember } from "@/module/about/content/about-page";
import { cn } from "@/shared/lib/utils";

const leadershipToneClassNames: Record<LeadershipMember["tone"], string> = {
  blue: "bg-linear-to-br from-secondary to-accent",
  green: "bg-linear-to-br from-accent-2 to-foreground",
  navy: "bg-linear-to-br from-accent to-foreground",
};

type LeadershipCardProps = {
  member: LeadershipMember;
};

export function LeadershipCard({ member }: LeadershipCardProps) {
  return (
    <article
      aria-label={`${member.name}, ${member.role}`}
      className="bg-background shadow-foreground/10 flex h-full w-full min-w-0 flex-col overflow-hidden rounded-xl shadow-lg"
    >
      <div
        aria-hidden="true"
        className={cn(
          "text-background flex min-h-32 flex-1 items-center justify-center px-4 py-8 sm:min-h-36",
          leadershipToneClassNames[member.tone],
        )}
      >
        <span className="text-3xl font-bold tracking-tight sm:text-4xl">
          {member.initials}
        </span>
      </div>
      <div className="flex min-h-28 flex-1 flex-col items-center justify-center px-4 py-5 text-center sm:min-h-32">
        <h4 className="text-accent text-sm leading-5 font-bold sm:text-base">
          {member.name}
        </h4>
        <p className="text-secondary mt-2 text-[0.6rem] leading-4 font-bold tracking-[0.08em] uppercase">
          {member.role}
        </p>
      </div>
    </article>
  );
}
