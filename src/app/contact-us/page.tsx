import type { Metadata } from "next";

import { ContactPageContent } from "@/module/contact/components/contact-page-content";
import type { ContactPageSettings } from "@/module/contact/content/contact";
import { getContactFaqs } from "@/module/contact/lib/faq-api";
import {
  getContactPageSettings,
  getInboxSubjects,
} from "@/module/contact/lib/contact-api";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";

export const metadata: Metadata = {
  title: "Contact Us | PLN EMI",
  description:
    "Connect with PLN EMI's team of experts for energy efficiency, compliance, and climate action support.",
};

export default async function ContactUsPage() {
  const [contactSettings, inboxSubjects, faqs] = await Promise.all([
    getContactPageSettings().catch((): ContactPageSettings | null => null),
    getInboxSubjects().catch(() => null),
    getContactFaqs().catch(() => null),
  ]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        <ContactPageContent
          contactSettings={contactSettings}
          faqs={faqs}
          inboxSubjects={inboxSubjects}
        />
      </main>

      <Footer />
    </div>
  );
}
