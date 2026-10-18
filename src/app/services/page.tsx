import type { Metadata } from "next";

import { ServicesPageContent } from "@/module/services/components/services-page-content";
import type { ServiceDivision } from "@/module/services/content/services";
import { getServiceDirectoryData } from "@/module/services/lib/services-api";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";

export const metadata: Metadata = {
  title: "Services | PLN EMI",
  description:
    "Explore PLN EMI's service divisions and solutions for energy management and environmental sustainability.",
};

export default async function ServicesPage() {
  let data: ServiceDivision[] | null = null;
  let error = false;

  try {
    data = await getServiceDirectoryData();
  } catch {
    error = true;
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        <ServicesPageContent data={data} error={error} />
      </main>

      <Footer />
    </div>
  );
}
