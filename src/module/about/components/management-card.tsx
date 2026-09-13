import Image from "next/image";

import type { ManagementMember } from "@/module/about/content/about-page";
import { cn } from "@/shared/lib/utils";

const managementToneClassNames: Record<ManagementMember["tone"], string> = {
  blue: "bg-linear-to-br from-secondary to-accent",
  green: "bg-linear-to-br from-accent-2 to-foreground",
  navy: "bg-linear-to-br from-accent to-foreground",
};

type ManagementCardProps = {
  member: ManagementMember;
  onOpen: (member: ManagementMember, trigger: HTMLButtonElement) => void;
};

export function ManagementCard({ member, onOpen }: ManagementCardProps) {
  return (
    <button
      aria-haspopup="dialog"
      aria-label={`Open profile for ${member.name}`}
      className="group bg-background shadow-foreground/10 focus-visible:ring-secondary/50 flex h-full w-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-xl text-left shadow-lg transition hover:shadow-xl focus-visible:ring-2 focus-visible:outline-none"
      onClick={(event) => onOpen(member, event.currentTarget)}
      type="button"
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex aspect-video w-full justify-center overflow-hidden",
          managementToneClassNames[member.tone],
        )}
      >
        <div className="relative top-4 w-1/2">
          <Image
            alt=""
            className="object-cover object-top"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            src={member.image}
          />
        </div>
      </span>

      <span className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-8 text-center">
        <span className="text-accent text-sm leading-5 font-bold sm:text-base">
          {member.name}
        </span>
        <span className="text-secondary mt-2 text-xs leading-4 font-bold tracking-[0.08em] uppercase">
          {member.role}
        </span>
      </span>
    </button>
  );
}

export { managementToneClassNames };
