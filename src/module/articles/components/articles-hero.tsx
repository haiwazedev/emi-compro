import { PageHero } from "@/shared/components/page-hero";
import { useCopy } from "@/i18n/use-copy";

export function ArticlesHero() {
  const copy = useCopy();
  return (
    <PageHero
      breadcrumb={copy("Home / Media & Information")}
      description={copy(
        "Trusted updates on business developments, innovation, and our contribution to energy resilience and sustainable growth.",
      )}
      headingId="articles-page-heading"
      id="articles-hero"
      title={copy("Berita dan")}
      titleAccent={copy("Artikel")}
    />
  );
}
