import type { FooterNavGroup as FooterNavGroupData } from "@/module/layout/content/footer";
import Link from "@/i18n/navigation";
import { useCopy } from "@/i18n/use-copy";

type FooterNavGroupProps = {
  group: FooterNavGroupData;
};

export function FooterNavGroup({ group }: FooterNavGroupProps) {
  const copy = useCopy();
  const headingId = `footer-${group.id}-heading`;

  return (
    <section aria-labelledby={headingId} className="min-w-0 flex-1">
      <h2 className="text-accent text-sm leading-5 font-bold" id={headingId}>
        {copy(group.title)}
      </h2>

      <ul className="text-foreground/80 mt-5 flex flex-col gap-2.5 text-xs leading-5 sm:text-sm sm:leading-6">
        {group.links.map((link) => (
          <li key={link.label}>
            <Link
              className="hover:text-secondary focus-visible:ring-secondary/50 inline-flex rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
              href={link.href}
            >
              {link.translateLabel === false ? link.label : copy(link.label)}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
