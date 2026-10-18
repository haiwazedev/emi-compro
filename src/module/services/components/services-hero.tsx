import { PageHero } from "@/shared/components/page-hero";
import { useCopy } from "@/i18n/use-copy";

export function ServicesHero() {
  const copy = useCopy();

  return (
    <PageHero
      breadcrumb={copy("Home / Services")}
      description={copy(
        "Explore our service divisions and discover the expertise that can help your organization move forward.",
      )}
      headingId="services-page-heading"
      id="services-hero"
      title={copy("Services page title")}
      titleAccent={copy("Services page title accent")}
    />
  );
}
