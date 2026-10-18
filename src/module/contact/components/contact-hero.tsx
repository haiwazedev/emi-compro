import { contactPageContent } from "@/module/contact/content/contact";
import { PageHero } from "@/shared/components/page-hero";
import { useCopy } from "@/i18n/use-copy";

export function ContactHero() {
  const copy = useCopy();
  const { breadcrumb, description, title, titleAccent } =
    contactPageContent.hero;

  return (
    <PageHero
      breadcrumb={copy(breadcrumb)}
      description={copy(description)}
      headingId="contact-page-heading"
      id="contact-hero"
      title={copy(title)}
      titleAccent={copy(titleAccent)}
    />
  );
}
