"use client";

import * as React from "react";

import type { ManagementMember } from "@/module/about/lib/management-api";
import { cn } from "@/shared/lib/utils";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/ui/dialog";
import { getManagementToneClassName } from "./management-card";
import { ManagementPortrait } from "./management-portrait";
import { useCopy } from "@/i18n/use-copy";

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
  const copy = useCopy();
  const descriptionId = `management-${member.id}-dialog-description`;

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
          getManagementToneClassName(member.id),
        )}
      >
        <div className="relative w-3/5 lg:w-full">
          <ManagementPortrait
            alt={copy("{name} portrait", { name: member.name })}
            member={member}
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-8 lg:p-10">
        <DialogTitle className="pr-10 text-2xl leading-tight sm:text-3xl">
          {member.name}
        </DialogTitle>

        <DialogDescription
          className="text-foreground/75 mt-3 text-base leading-7"
          id={descriptionId}
        >
          <strong className="text-foreground font-semibold">
            {member.role}
          </strong>
          {member.companyName
            ? ` ${copy("from {company}", { company: member.companyName })}`
            : null}
        </DialogDescription>

        {member.description ? (
          <p className="text-foreground/75 mt-6 text-sm leading-7">
            {member.description}
          </p>
        ) : null}
      </div>
    </DialogContent>
  );
}
