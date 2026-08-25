import type { Metadata } from "next";

import { ServicesPageContent } from "@/module/services/components/services-page-content";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";

export const metadata: Metadata = {
  title: "Services | PLN EMI",
  description:
    "Explore PLN EMI's decarbonization, energy conservation, waste circularity, sustainability consulting, and environmental compliance services.",
};

export default function ServicesPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        <ServicesPageContent />
      </main>

      <Footer />
    </div>
  );
}
