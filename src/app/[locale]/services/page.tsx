import type { Metadata } from "next";

import { ServicesPageContent } from "@/module/services/components/services-page-content";
import type { ServiceDivision } from "@/module/services/content/services";
import { getServiceDirectoryData } from "@/module/services/lib/services-api";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";
import { getLocalizedMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";

type ServicesPageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;

  return getLocalizedMetadata(
    locale,
    "Services | PLN EMI",
    "Explore PLN EMI's service divisions and solutions for energy management and environmental sustainability.",
    "/services",
  );
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  let data: ServiceDivision[] | null = null;
  let error = false;

  try {
    data = await getServiceDirectoryData(locale);
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
