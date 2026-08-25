import { ContactHero } from "@/module/contact/components/contact-hero";
import { ContactUsForm } from "@/module/contact/components/contact-us-form";
import { FAQ } from "@/module/contact/components/faq";

export function ContactPageContent() {
  return (
    <>
      <ContactHero />
      <ContactUsForm />
      <FAQ />
    </>
  );
}
