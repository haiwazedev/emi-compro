"use client";

import * as React from "react";

import { aboutPageContent } from "@/module/about/content/about-page";
import type {
  ManagementBoardType,
  ManagementData,
  ManagementMember,
} from "@/module/about/lib/management-api";
import { SectionContainer } from "@/shared/components/section-container";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Dialog } from "@/shared/ui/dialog";
import { ManagementCard } from "./management-card";
import { ManagementDialog } from "./management-dialog";
import { useCopy } from "@/i18n/use-copy";

type ManagementProps = {
  data: ManagementData | null;
  error: boolean;
};

type ManagementStatusProps = {
  className?: string;
  description: string;
  error?: boolean;
  title: string;
};

function ManagementStatus({
  className,
  description,
  error = false,
  title,
}: ManagementStatusProps) {
  return (
    <div
      aria-live={error ? "assertive" : "polite"}
      className={cn(
        "border-foreground/15 bg-background/70 mt-8 rounded-2xl border px-6 py-10 text-center",
        className,
      )}
      role={error ? "alert" : "status"}
    >
      <h3 className="text-accent text-lg font-semibold">{title}</h3>
      <p className="text-foreground/70 mt-2 text-sm leading-6">{description}</p>
    </div>
  );
}

function getPanelId(typeId: number) {
  return `management-${typeId}-panel`;
}

function getTabId(typeId: number) {
  return `management-${typeId}-tab`;
}

export function Management({ data, error }: ManagementProps) {
  const copy = useCopy();
  const { eyebrow, title } = aboutPageContent.management;
  const localizedTitle = copy(title);
  const [titlePrefix, ...titleAccentWords] = localizedTitle.split(" ");
  const titleAccent = titleAccentWords.join(" ");
  const [activeTypeId, setActiveTypeId] = React.useState<number | null>(
    data?.types[0]?.id ?? null,
  );
  const [activeMember, setActiveMember] =
    React.useState<ManagementMember | null>(null);
  const activeCardRef = React.useRef<HTMLButtonElement | null>(null);
  const tabRefs = React.useRef(new Map<number, HTMLButtonElement>());
  const activeType =
    data?.types.find((type) => type.id === activeTypeId) ??
    data?.types[0] ??
    null;

  function handleOpen(member: ManagementMember, trigger: HTMLButtonElement) {
    activeCardRef.current = trigger;
    setActiveMember(member);
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setActiveMember(null);
    }
  }

  function handleCloseAutoFocus(event: Event) {
    event.preventDefault();
    activeCardRef.current?.focus();
    activeCardRef.current = null;
  }

  function handleTabKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const types = data?.types ?? [];

    if (types.length < 2) {
      return;
    }

    let nextIndex: number;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % types.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + types.length) % types.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = types.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextType = types[nextIndex];
    setActiveTypeId(nextType.id);
    tabRefs.current.get(nextType.id)?.focus();
  }

  return (
    <>
      <SectionContainer
        aria-labelledby="management-heading"
        className="py-14 sm:py-16 lg:py-20"
        id="management"
        variant="subtle"
      >
        <p className="text-secondary text-xs font-bold tracking-[0.18em] uppercase">
          {copy(eyebrow)}
        </p>

        <h2
          className="text-accent mt-3 font-sans text-3xl leading-tight font-bold tracking-tight sm:text-4xl"
          id="management-heading"
        >
          {titlePrefix} <span className="text-secondary">{titleAccent}</span>
        </h2>

        {error ? (
          <ManagementStatus
            description={copy(
              "Board member information is temporarily unavailable. Please try again later.",
            )}
            error
            title={copy("Management information is unavailable.")}
          />
        ) : !data || data.types.length === 0 ? (
          <ManagementStatus
            description={copy(
              "There are no board members available at this time.",
            )}
            title={copy("No management information found.")}
          />
        ) : (
          <>
            <div
              aria-label={copy("Management board")}
              className="mt-8 flex flex-wrap gap-3"
              role="tablist"
            >
              {data.types.map((type, index) => {
                const isSelected = activeType?.id === type.id;

                return (
                  <Button
                    aria-controls={getPanelId(type.id)}
                    aria-selected={isSelected}
                    className="rounded-full px-6 py-5 font-semibold"
                    id={getTabId(type.id)}
                    key={type.id}
                    onClick={() => setActiveTypeId(type.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    ref={(node) => {
                      if (node) {
                        tabRefs.current.set(type.id, node);
                      } else {
                        tabRefs.current.delete(type.id);
                      }
                    }}
                    role="tab"
                    tabIndex={isSelected ? 0 : -1}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                  >
                    {type.type}
                  </Button>
                );
              })}
            </div>

            {data.types.map((type) => (
              <ManagementTypePanel
                hidden={type.id !== activeType?.id}
                key={type.id}
                onOpen={handleOpen}
                type={type}
              />
            ))}
          </>
        )}
      </SectionContainer>

      <Dialog open={Boolean(activeMember)} onOpenChange={handleOpenChange}>
        {activeMember ? (
          <ManagementDialog
            member={activeMember}
            onCloseAutoFocus={handleCloseAutoFocus}
          />
        ) : null}
      </Dialog>
    </>
  );
}

type ManagementTypePanelProps = {
  hidden: boolean;
  onOpen: (member: ManagementMember, trigger: HTMLButtonElement) => void;
  type: ManagementBoardType;
};

function ManagementTypePanel({
  hidden,
  onOpen,
  type,
}: ManagementTypePanelProps) {
  const copy = useCopy();

  return (
    <div
      aria-labelledby={getTabId(type.id)}
      className="mt-8"
      hidden={hidden}
      id={getPanelId(type.id)}
      role="tabpanel"
      tabIndex={0}
    >
      {type.members.length > 0 ? (
        <ul aria-label={type.type} className="-m-3 flex flex-wrap">
          {type.members.map((member) => (
            <li className="flex w-full p-3 lg:w-1/3" key={member.id}>
              <ManagementCard member={member} onOpen={onOpen} />
            </li>
          ))}
        </ul>
      ) : (
        <ManagementStatus
          className="mt-0"
          description={copy("There are no members listed for {type} yet.", {
            type: type.type,
          })}
          title={copy("No members found.")}
        />
      )}
    </div>
  );
}
