"use client";

import Image from "next/image";
import * as React from "react";

import type { ManagementMember } from "@/module/about/content/about-page";
import { cn } from "@/shared/lib/utils";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/ui/dialog";
import { managementToneClassNames } from "./management-card";

type ManagementDialogProps = {
  member: ManagementMember;
  onCloseAutoFocus: React.ComponentProps<
    typeof DialogContent
  >["onCloseAutoFocus"];
};

export function ManagementDialog({
  member,
  onCloseAutoFocus,
}: ManagementDialogProps) {
  const descriptionId = `${member.slug}-dialog-description`;

  return (
    <DialogContent
      aria-describedby={descriptionId}
      className="flex max-w-4xl flex-col gap-0 overflow-hidden rounded-2xl p-0 sm:p-0 lg:flex-row"
      closeButtonClassName="top-4 right-4 size-9 [&_svg]:size-5"
      onCloseAutoFocus={onCloseAutoFocus}
    >
      <div
        className={cn(
          "box-content flex aspect-5/3 w-full shrink-0 justify-center overflow-hidden pt-8 lg:aspect-3/4 lg:w-2/5 lg:pt-16",
          managementToneClassNames[member.tone],
        )}
      >
        <div className="relative w-3/5 lg:w-full">
          <Image
            alt={`${member.name} portrait`}
            className="object-cover object-top"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            src={member.image}
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-8 lg:p-10">
        <DialogTitle className="pr-10 text-2xl leading-tight sm:text-3xl">
          {member.name}
        </DialogTitle>

        <DialogDescription
          className="text-secondary mt-3 text-sm leading-5 font-semibold"
          id={descriptionId}
        >
          {member.role} · {member.company}
        </DialogDescription>

        <p className="text-foreground/80 mt-5 text-base leading-7">
          <strong className="font-bold">{member.englishRole}</strong>{" "}
          {member.englishRoleDescription}
        </p>

        <p className="text-foreground/70 mt-4 text-base leading-7">
          {member.biography}
        </p>
      </div>
    </DialogContent>
  );
}
