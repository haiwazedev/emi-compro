import type { Metadata } from "next";

import { AboutPageContent } from "@/module/about/components/about-page-content";
import { getManagementData } from "@/module/about/lib/management-api";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";

export const metadata: Metadata = {
  title: "About Us | PLN EMI",
  description:
    "Learn about PT Energy Management Indonesia (Persero), our history, direction, and management team.",
};

export default async function AboutUsPage() {
  let managementData = null;
  let managementError = false;

  try {
    managementData = await getManagementData();
  } catch {
    managementError = true;
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        <AboutPageContent
          managementData={managementData}
          managementError={managementError}
        />
      </main>

      <Footer />
    </div>
  );
}
