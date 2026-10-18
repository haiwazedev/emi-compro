import { aboutPageContent } from "@/module/about/content/about-page";
import { PageHero } from "@/shared/components/page-hero";
import { useCopy } from "@/i18n/use-copy";

export function AboutHero() {
  const copy = useCopy();
  const { breadcrumb, description, title, titleAccent } = aboutPageContent.hero;

  return (
    <PageHero
      breadcrumb={copy(breadcrumb)}
      description={copy(description)}
      headingId="about-page-heading"
      id="about-hero"
      title={copy(title)}
      titleAccent={copy(titleAccent)}
    />
  );
}
