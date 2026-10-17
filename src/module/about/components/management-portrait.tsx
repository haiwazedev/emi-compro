import Image from "next/image";

import type { ManagementMember } from "@/module/about/lib/management-api";

type ManagementPortraitProps = {
  alt?: string;
  member: Pick<ManagementMember, "imageUrl" | "name">;
  sizes: string;
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function ManagementPortrait({
  alt = "",
  member,
  sizes,
}: ManagementPortraitProps) {
  if (!member.imageUrl) {
    return (
      <span
        aria-hidden="true"
        className="text-background flex h-full w-full items-center justify-center text-4xl font-bold"
      >
        {getInitials(member.name)}
      </span>
    );
  }

  return (
    <Image
      alt={alt}
      className="object-cover object-top"
      fill
      sizes={sizes}
      src={member.imageUrl}
    />
  );
}
