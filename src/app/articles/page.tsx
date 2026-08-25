import type { Metadata } from "next";

import { ArticlesPageContent } from "@/module/articles/components/articles-page-content";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";

export const metadata: Metadata = {
  title: "News & Articles | PLN EMI",
  description:
    "Trusted updates on PLN EMI business developments, innovation, and contribution to energy resilience and sustainable growth.",
};

export default function ArticlesPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        <ArticlesPageContent />
      </main>

      <Footer />
    </div>
  );
}
