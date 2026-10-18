import { AboutUsSection } from "@/module/about/components/about-us-section";
import { ArticlesSection } from "@/module/articles/components/articles-section";
import { getHomeArticleData } from "@/module/articles/lib/articles-api";
import { CommitmentSection } from "@/module/commitment/components/commitment-section";
import { ContactUsSection } from "@/module/contact/components/contact-us-section";
import { HomeHero } from "@/module/home/components/home-hero";
import { getHomeSiteContentData } from "@/module/home/lib/home-content-api";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";
import { PartnersSection } from "@/module/partners/components/partners-section";
import { ServicesSection } from "@/module/services/components/services-section";
import { getServiceDirectoryData } from "@/module/services/lib/services-api";
import {
  getFirstSearchParamValue,
  parsePositiveInteger,
} from "@/shared/lib/utils";

type HomeProps = {
  searchParams: Promise<{
    homeCategory?: string | string[];
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const categoryValue = getFirstSearchParamValue(params.homeCategory);
  const categoryId = parsePositiveInteger(categoryValue);
  const [homeResult, articleResult, servicesResult] = await Promise.allSettled([
    getHomeSiteContentData(),
    getHomeArticleData(categoryId),
    getServiceDirectoryData(),
  ]);
  const homeData = homeResult.status === "fulfilled" ? homeResult.value : null;
  const homeError = homeResult.status === "rejected";
  const articleData =
    articleResult.status === "fulfilled" ? articleResult.value : null;
  const articlesError = articleResult.status === "rejected";
  const servicesData =
    servicesResult.status === "fulfilled" ? servicesResult.value : null;
  const servicesError = servicesResult.status === "rejected";

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        <HomeHero error={homeError} slides={homeData?.slides ?? []} />
        <AboutUsSection data={homeData} error={homeError} />
        <ServicesSection data={servicesData} error={servicesError} />
        <PartnersSection />
        <ArticlesSection data={articleData} error={articlesError} />
        <CommitmentSection />
        <ContactUsSection />
      </main>

      <Footer />
    </div>
  );
}
