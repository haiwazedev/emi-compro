import type {
  ContactFaqItem,
  ContactPageSettings,
  InboxSubject,
} from "@/module/contact/content/contact";

import { ContactHero } from "@/module/contact/components/contact-hero";
import { ContactUsForm } from "@/module/contact/components/contact-us-form";
import { FAQ } from "@/module/contact/components/faq";

export function ContactPageContent({
  contactSettings,
  faqs,
  inboxSubjects,
}: {
  contactSettings: ContactPageSettings | null;
  faqs: ContactFaqItem[] | null;
  inboxSubjects: InboxSubject[] | null;
}) {
  return (
    <>
      <ContactHero />
      <ContactUsForm
        contactSettings={contactSettings}
        inboxSubjects={inboxSubjects}
      />
      <FAQ faqs={faqs} />
    </>
  );
}
