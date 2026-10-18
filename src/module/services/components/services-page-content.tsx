import type { ServiceDivision } from "@/module/services/content/services";

import { ContactExpert } from "./contact-expert";
import { ServiceBrowser } from "./service-browser";
import { ServicesHero } from "./services-hero";

type ServicesPageContentProps = {
  data: ServiceDivision[] | null;
  error: boolean;
};

export function ServicesPageContent({ data, error }: ServicesPageContentProps) {
  return (
    <>
      <ServicesHero />
      <ServiceBrowser data={data} error={error} />
      <ContactExpert />
    </>
  );
}
