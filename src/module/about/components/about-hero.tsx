import { aboutPageContent } from "@/module/about/content/about-page";
import { PageHero } from "@/shared/components/page-hero";

export function AboutHero() {
  const { breadcrumb, description, title, titleAccent } = aboutPageContent.hero;

  return (
    <PageHero
      breadcrumb={breadcrumb}
      description={description}
      headingId="about-page-heading"
      id="about-hero"
      title={title}
      titleAccent={titleAccent}
    />
  );
}
