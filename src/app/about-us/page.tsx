import type { Metadata } from "next";

import { AboutPageContent } from "@/module/about/components/about-page-content";
import { getAboutSiteContentData } from "@/module/about/lib/about-content-api";
import { getManagementData } from "@/module/about/lib/management-api";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";

export const metadata: Metadata = {
  title: "About Us | PLN EMI",
  description:
    "Learn about PT Energy Management Indonesia (Persero), our history, direction, and management team.",
};

export default async function AboutUsPage() {
  const [contentResult, managementResult] = await Promise.allSettled([
    getAboutSiteContentData(),
    getManagementData(),
  ]);
  const contentData =
    contentResult.status === "fulfilled" ? contentResult.value : null;
  const contentError = contentResult.status === "rejected";
  const managementData =
    managementResult.status === "fulfilled" ? managementResult.value : null;
  const managementError = managementResult.status === "rejected";

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        <AboutPageContent
          contentData={contentData}
          contentError={contentError}
          managementData={managementData}
          managementError={managementError}
        />
      </main>

      <Footer />
    </div>
  );
}
