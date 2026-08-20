import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

const sectionSurfaceVariants = {
  default: "bg-neutral text-primary",
  muted: "bg-background text-primary",
  subtle: "bg-articles-background text-primary",
  inverse: "bg-accent text-neutral",
  transparent: "bg-transparent",
};

export const sectionContainerVariants = cva("", {
  variants: {
    variant: sectionSurfaceVariants,
  },
  defaultVariants: {
    variant: "default",
  },
});

export const sectionContainerRailClassName =
  "mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10";

type SectionContainerElement = "section" | "div";

export type SectionContainerProps<
  TElement extends SectionContainerElement = "section",
> = Omit<React.ComponentPropsWithoutRef<TElement>, "children" | "className"> &
  VariantProps<typeof sectionContainerVariants> & {
    as?: TElement;
    children?: React.ReactNode;
    className?: string;
    contentClassName?: string;
  };

export function SectionContainer<
  TElement extends SectionContainerElement = "section",
>({
  as,
  children,
  className,
  contentClassName,
  variant,
  ...props
}: SectionContainerProps<TElement>) {
  const Component = as ?? "section";

  return (
    <Component
      className={cn(
        Component === "section" && "scroll-mt-20",
        sectionContainerVariants({ variant }),
        className,
      )}
      {...props}
    >
      <div className={cn(sectionContainerRailClassName, contentClassName)}>
        {children}
      </div>
    </Component>
  );
}
