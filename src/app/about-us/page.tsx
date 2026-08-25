import type { Metadata } from "next";

import { AboutPageContent } from "@/module/about/components/about-page-content";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";

export const metadata: Metadata = {
  title: "About Us | PLN EMI",
  description:
    "Learn about PT Energy Management Indonesia (Persero), our history, direction, and leadership team.",
};

export default function AboutUsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        <AboutPageContent />
      </main>

      <Footer />
    </div>
  );
}
