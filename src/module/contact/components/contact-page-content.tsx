import type { ContactPageSettings } from "@/module/contact/content/contact";

import { ContactHero } from "@/module/contact/components/contact-hero";
import { ContactUsForm } from "@/module/contact/components/contact-us-form";
import { FAQ } from "@/module/contact/components/faq";

export function ContactPageContent({
  contactSettings,
}: {
  contactSettings: ContactPageSettings | null;
}) {
  return (
    <>
      <ContactHero />
      <ContactUsForm contactSettings={contactSettings} />
      <FAQ />
    </>
  );
}
