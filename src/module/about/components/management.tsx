"use client";

import * as React from "react";

import {
  aboutPageContent,
  type ManagementMember,
} from "@/module/about/content/about-page";
import { SectionContainer } from "@/shared/components/section-container";
import { Button } from "@/shared/ui/button";
import { Dialog } from "@/shared/ui/dialog";
import { ManagementCard } from "./management-card";
import { ManagementDialog } from "./management-dialog";

export function Management() {
  const { directors, eyebrow, title } = aboutPageContent.management;
  const [titlePrefix, titleAccent] = title.split(" ");
  const [activeMember, setActiveMember] =
    React.useState<ManagementMember | null>(null);
  const activeCardRef = React.useRef<HTMLButtonElement | null>(null);

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

  return (
    <>
      <SectionContainer
        aria-labelledby="management-heading"
        className="py-14 sm:py-16 lg:py-20"
        id="management"
        variant="subtle"
      >
        <p className="text-secondary text-xs font-bold tracking-[0.18em] uppercase">
          {eyebrow}
        </p>

        <h2
          className="text-accent mt-3 font-sans text-3xl leading-tight font-bold tracking-tight sm:text-4xl"
          id="management-heading"
        >
          {titlePrefix} <span className="text-secondary">{titleAccent}</span>
        </h2>

        <div
          aria-label="Management board"
          className="mt-8 flex flex-wrap gap-3"
          role="tablist"
        >
          <Button
            aria-label="Dewan Komisaris (coming soon)"
            aria-selected={false}
            disabled
            id="management-commissioners-tab"
            role="tab"
            title="Coming soon"
            type="button"
            variant="outline"
            className="rounded-full px-6 py-5 font-semibold"
          >
            Dewan Komisaris
            <span className="sr-only">Coming soon</span>
          </Button>
          <Button
            aria-controls="management-directors-panel"
            aria-selected={true}
            id="management-directors-tab"
            role="tab"
            type="button"
            className="rounded-full px-6 py-5 font-semibold"
          >
            Dewan Direksi
          </Button>
        </div>

        <div
          aria-labelledby="management-directors-tab"
          className="mt-8"
          id="management-directors-panel"
          role="tabpanel"
          tabIndex={0}
        >
          <ul aria-label="Dewan Direksi" className="-m-3 flex flex-wrap">
            {directors.map((member) => (
              <li className="flex w-full p-3 lg:w-1/3" key={member.slug}>
                <ManagementCard member={member} onOpen={handleOpen} />
              </li>
            ))}
          </ul>
        </div>
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
