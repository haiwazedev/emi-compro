import type { Metadata } from "next";

import { ContactPageContent } from "@/module/contact/components/contact-page-content";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";

export const metadata: Metadata = {
  title: "Contact Us | PLN EMI",
  description:
    "Connect with PLN EMI's team of experts for energy efficiency, compliance, and climate action support.",
};

export default function ContactUsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        <ContactPageContent />
      </main>

      <Footer />
    </div>
  );
}
