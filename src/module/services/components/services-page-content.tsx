import { ContactExpert } from "./contact-expert";
import { ServiceBrowser } from "./service-browser";
import { ServicesHero } from "./services-hero";

export function ServicesPageContent() {
  return (
    <>
      <ServicesHero />
      <ServiceBrowser />
      <ContactExpert />
    </>
  );
}
