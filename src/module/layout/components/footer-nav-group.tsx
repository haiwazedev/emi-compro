import type { FooterNavGroup as FooterNavGroupData } from "@/module/layout/content/footer";

type FooterNavGroupProps = {
  group: FooterNavGroupData;
};

export function FooterNavGroup({ group }: FooterNavGroupProps) {
  const headingId = `footer-${group.id}-heading`;

  return (
    <section aria-labelledby={headingId} className="min-w-0 flex-1">
      <h2
        className="text-sm font-bold leading-5 text-accent"
        id={headingId}
      >
        {group.title}
      </h2>

      <ul className="mt-5 flex flex-col gap-2.5 text-xs leading-5 text-foreground/80 sm:text-sm sm:leading-6">
        {group.links.map((link) => (
          <li key={link.label}>
            <a
              className="inline-flex rounded-sm transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
              href={link.href}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
