import type { Metadata } from "next";

import { ContactPageContent } from "@/module/contact/components/contact-page-content";
import type { ContactPageSettings } from "@/module/contact/content/contact";
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
  const [contactSettings, inboxSubjects] = await Promise.all([
    getContactPageSettings().catch((): ContactPageSettings | null => null),
    getInboxSubjects().catch(() => null),
  ]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        <ContactPageContent
          contactSettings={contactSettings}
          inboxSubjects={inboxSubjects}
        />
      </main>

      <Footer />
    </div>
  );
}
