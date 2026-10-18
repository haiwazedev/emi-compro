import { cn } from "@/shared/lib/utils";

type ContentStatusProps = {
  className?: string;
  description: string;
  title: string;
  variant: "empty" | "error";
};

export function ContentStatus({
  className,
  description,
  title,
  variant,
}: ContentStatusProps) {
  const isError = variant === "error";

  return (
    <div
      aria-live={isError ? "assertive" : "polite"}
      className={cn(
        "border-foreground/15 bg-background/70 mt-8 rounded-2xl border px-6 py-10 text-center",
        className,
      )}
      role={isError ? "alert" : "status"}
    >
      <h3 className="text-accent text-lg font-semibold">{title}</h3>
      <p className="text-foreground/70 mt-2 text-sm leading-6">{description}</p>
    </div>
  );
}
