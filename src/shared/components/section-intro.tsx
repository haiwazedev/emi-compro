import type { ReactNode } from "react";

import { ArrowRight } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

export type SectionIntroTheme = "light" | "muted" | "dark";

type SectionIntroAction = {
  label: string;
  href: string;
};

export type SectionIntroProps = {
  eyebrow: string;
  headingId: string;
  title: ReactNode;
  accent?: ReactNode;
  description: ReactNode;
  theme: SectionIntroTheme;
  action?: SectionIntroAction;
  className?: string;
};

const sectionIntroThemeClasses: Record<
  SectionIntroTheme,
  {
    eyebrow: string;
    heading: string;
    accent: string;
    description: string;
    action: string;
  }
> = {
  light: {
    eyebrow: "text-secondary",
    heading: "text-primary",
    accent: "text-secondary",
    description: "text-secondary",
    action:
      "border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-secondary/50",
  },
  muted: {
    eyebrow: "text-secondary",
    heading: "text-primary",
    accent: "text-secondary",
    description: "text-muted-foreground",
    action:
      "border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-secondary/50",
  },
  dark: {
    eyebrow: "text-secondary",
    heading: "text-primary-foreground",
    accent: "text-secondary",
    description: "text-primary-foreground/70",
    action:
      "border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary focus-visible:ring-secondary/50",
  },
};

export function SectionIntro({
  eyebrow,
  headingId,
  title,
  accent,
  description,
  theme,
  action,
  className,
}: SectionIntroProps) {
  const themeClasses = sectionIntroThemeClasses[theme];

  return (
    <div
      className={cn(
        "flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12",
        className,
      )}
    >
      <div className="shrink-0 lg:basis-1/3">
        <p
          className={cn(
            "text-xs font-bold uppercase tracking-[0.18em]",
            themeClasses.eyebrow,
          )}
        >
          {eyebrow}
        </p>

        <h2
          className={cn(
            "mt-3 font-sans text-3xl font-bold leading-tight tracking-tight sm:text-4xl",
            themeClasses.heading,
          )}
          id={headingId}
        >
          {title}
          {accent ? (
            <>
              {" "}
              <span className={themeClasses.accent}>{accent}</span>
            </>
          ) : null}
        </h2>
      </div>

      <p
        className={cn(
          "min-w-0 text-sm leading-7 lg:flex-1",
          themeClasses.description,
        )}
      >
        {description}
      </p>

      {action ? (
        <Button
          asChild
          className={cn(
            "h-10 w-fit shrink-0 rounded-full px-5 text-xs font-semibold",
            themeClasses.action,
          )}
          variant="outline"
        >
          <a href={action.href}>
            {action.label}
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </a>
        </Button>
      ) : null}
    </div>
  );
}
