import type { Metadata } from "next";

import { AboutUsSection } from "@/module/about/components/about-us-section";
import { ArticlesSection } from "@/module/articles/components/articles-section";
import { getHomeArticleData } from "@/module/articles/lib/articles-api";
import { CommitmentSection } from "@/module/commitment/components/commitment-section";
import { ContactUsSection } from "@/module/contact/components/contact-us-section";
import { getPublicSiteSettings } from "@/module/contact/lib/contact-api";
import { HomeHero } from "@/module/home/components/home-hero";
import { getHomeSiteContentData } from "@/module/home/lib/home-content-api";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";
import { getPartners } from "@/module/partners/lib/clients-api";
import { PartnersSection } from "@/module/partners/components/partners-section";
import { ServicesSection } from "@/module/services/components/services-section";
import { getServiceDirectoryData } from "@/module/services/lib/services-api";
import { getLocalizedAlternates } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import {
  getFirstSearchParamValue,
  parsePositiveInteger,
} from "@/shared/lib/utils";

type HomeProps = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{
    homeCategory?: string | string[];
  }>;
};

export async function generateMetadata({
  params,
}: Pick<HomeProps, "params">): Promise<Metadata> {
  const { locale } = await params;

  return { alternates: getLocalizedAlternates(locale) };
}

export default async function Home({ params, searchParams }: HomeProps) {
  const [{ locale }, search] = await Promise.all([params, searchParams]);
  const categoryValue = getFirstSearchParamValue(search.homeCategory);
  const categoryId = parsePositiveInteger(categoryValue);
  const [
    homeResult,
    articleResult,
    servicesResult,
    partnersResult,
    settingsResult,
  ] = await Promise.allSettled([
    getHomeSiteContentData(locale),
    getHomeArticleData(locale, categoryId),
    getServiceDirectoryData(locale),
    getPartners(),
    getPublicSiteSettings(locale),
  ]);
  const homeData = homeResult.status === "fulfilled" ? homeResult.value : null;
  const homeError = homeResult.status === "rejected";
  const articleData =
    articleResult.status === "fulfilled" ? articleResult.value : null;
  const articlesError = articleResult.status === "rejected";
  const servicesData =
    servicesResult.status === "fulfilled" ? servicesResult.value : null;
  const servicesError = servicesResult.status === "rejected";
  const partnersData =
    partnersResult.status === "fulfilled" ? partnersResult.value : null;
  const partnersError = partnersResult.status === "rejected";
  const siteSettings =
    settingsResult.status === "fulfilled" ? settingsResult.value : null;

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        <HomeHero error={homeError} slides={homeData?.slides ?? []} />
        <AboutUsSection data={homeData} error={homeError} />
        <ServicesSection data={servicesData} error={servicesError} />
        <PartnersSection data={partnersData} error={partnersError} />
        <ArticlesSection data={articleData} error={articlesError} />
        <CommitmentSection data={servicesData} error={servicesError} />
        <ContactUsSection settings={siteSettings} />
      </main>

      <Footer settings={siteSettings} />
    </div>
  );
}
