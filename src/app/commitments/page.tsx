import type { Metadata } from "next";

import { CommitmentsPageContent } from "@/module/commitment/components/commitments-page-content";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";

export const metadata: Metadata = {
  title: "Commitment Documents | PLN EMI",
  description:
    "Explore PLN EMI certifications, corporate policies, and sustainability reports.",
};

export default function CommitmentsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        <CommitmentsPageContent />
      </main>

      <Footer />
    </div>
  );
}
