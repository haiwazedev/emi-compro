import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  headingId: string;
  title: string;
  subtitle: string;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  titleLayoutClassName?: string;
  subtitleClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

export function SectionHeading({
  eyebrow,
  headingId,
  title,
  subtitle,
  children,
  className,
  eyebrowClassName,
  titleClassName,
  titleLayoutClassName,
  subtitleClassName,
  ...props
}: SectionHeadingProps) {
  return (
    <div className={className} {...props}>
      <p className={eyebrowClassName}>{eyebrow}</p>

      <h2 className={titleClassName} id={headingId}>
        <span className={cn("block", titleLayoutClassName)}>{title}</span>
        <span className={cn("block italic", subtitleClassName)}>
          {subtitle}
        </span>
      </h2>
      {children}
    </div>
  );
}
