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
import { getLocalizedMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";

type ContactUsPageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: ContactUsPageProps): Promise<Metadata> {
  const { locale } = await params;

  return getLocalizedMetadata(
    locale,
    "Contact Us | PLN EMI",
    "Connect with PLN EMI's team of experts for energy efficiency, compliance, and climate action support.",
  );
}

export default async function ContactUsPage({ params }: ContactUsPageProps) {
  const { locale } = await params;
  const [contactSettings, inboxSubjects, faqs] = await Promise.all([
    getContactPageSettings(locale).catch(
      (): ContactPageSettings | null => null,
    ),
    getInboxSubjects().catch(() => null),
    getContactFaqs(locale).catch(() => null),
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
