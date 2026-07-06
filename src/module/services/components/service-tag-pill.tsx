"use client";

import { useState } from "react";
import { ExternalLinkIcon } from "lucide-react";

import { ServiceDocumentPreview } from "@/module/services/components/service-document-preview";
import { Badge } from "@/shared/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/hover-card";
import type { ServiceTag } from "@/module/services/content/services";
import { cn } from "@/shared/lib/utils";

type ServiceTagPillProps = {
  tag: ServiceTag;
};

const tagClassName =
  "h-auto max-w-full rounded-lg border-transparent bg-services-tag-background px-3 py-1 text-left text-xs font-bold leading-5 text-services-tag-foreground shadow-none transition-colors hover:bg-services-foreground hover:text-services-background focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

export function ServiceTagPill({ tag }: ServiceTagPillProps) {
  const [open, setOpen] = useState(false);

  if (tag.type === "plain") {
    return (
      <Badge className={tagClassName} variant="secondary">
        {tag.label}
      </Badge>
    );
  }

  const triggerProps = {
    onBlur: () => setOpen(false),
    onFocus: () => setOpen(true),
  };

  return (
    <HoverCard
      closeDelay={120}
      onOpenChange={setOpen}
      open={open}
      openDelay={120}
    >
      <HoverCardTrigger asChild>
        <Badge
          asChild
          className={cn(
            tagClassName,
            "cursor-pointer outline-none data-[state=open]:bg-services-foreground data-[state=open]:text-neutral",
          )}
          variant="secondary"
        >
          {tag.type === "link" ? (
            <a
              aria-label={`Open ${tag.label} in a new tab`}
              href={tag.href}
              rel="noreferrer"
              target="_blank"
              {...triggerProps}
              className={"hover:bg-services-foreground!"}
            >
              <span>{tag.label}</span>
              <ExternalLinkIcon aria-hidden="true" className="ml-1 size-4" />
            </a>
          ) : (
            <button type="button" {...triggerProps}>
              <span>{tag.label}</span>
            </button>
          )}
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent
        align="center"
        className="h-75 overflow-y-scroll w-[min(34rem,calc(100vw-2rem))] rounded-2xl border-services-popup-border bg-services-popup-background p-0 text-services-foreground shadow-[0_24px_80px_var(--color-services-popup-shadow)] backdrop-blur-md"
        side="top"
      >
        <ServiceDocumentPreview document={tag.document} />
      </HoverCardContent>
    </HoverCard>
  );
}
