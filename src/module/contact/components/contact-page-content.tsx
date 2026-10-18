import type {
  ContactPageSettings,
  InboxSubject,
} from "@/module/contact/content/contact";

import { ContactHero } from "@/module/contact/components/contact-hero";
import { ContactUsForm } from "@/module/contact/components/contact-us-form";
import { FAQ } from "@/module/contact/components/faq";

export function ContactPageContent({
  contactSettings,
  inboxSubjects,
}: {
  contactSettings: ContactPageSettings | null;
  inboxSubjects: InboxSubject[] | null;
}) {
  return (
    <>
      <ContactHero />
      <ContactUsForm
        contactSettings={contactSettings}
        inboxSubjects={inboxSubjects}
      />
      <FAQ />
    </>
  );
}
