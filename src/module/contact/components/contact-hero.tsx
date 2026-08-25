import { contactPageContent } from "@/module/contact/content/contact";
import { PageHero } from "@/shared/components/page-hero";

export function ContactHero() {
  const { breadcrumb, description, title, titleAccent } =
    contactPageContent.hero;

  return (
    <PageHero
      breadcrumb={breadcrumb}
      description={description}
      headingId="contact-page-heading"
      id="contact-hero"
      title={title}
      titleAccent={titleAccent}
    />
  );
}
