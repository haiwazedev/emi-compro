type ArticlesStatusProps = {
  description: string;
  title: string;
  variant: "empty" | "error";
};

export function ArticlesStatus({
  description,
  title,
  variant,
}: ArticlesStatusProps) {
  const isError = variant === "error";

  return (
    <div
      aria-live={isError ? "assertive" : "polite"}
      className="border-foreground/15 bg-background/70 mt-8 rounded-2xl border px-6 py-10 text-center"
      role={isError ? "alert" : "status"}
    >
      <h3 className="text-accent text-lg font-semibold">{title}</h3>
      <p className="text-foreground/70 mt-2 text-sm leading-6">{description}</p>
    </div>
  );
}
