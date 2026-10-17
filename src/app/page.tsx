import { AboutUsSection } from "@/module/about/components/about-us-section";
import { ArticlesSection } from "@/module/articles/components/articles-section";
import {
  getHomeArticleData,
  type HomeArticleData,
} from "@/module/articles/lib/articles-api";
import { CommitmentSection } from "@/module/commitment/components/commitment-section";
import { ContactUsSection } from "@/module/contact/components/contact-us-section";
import { HomeHero } from "@/module/home/components/home-hero";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";
import { PartnersSection } from "@/module/partners/components/partners-section";
import { ServicesSection } from "@/module/services/components/services-section";
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
  let articleData: HomeArticleData | null = null;
  let articlesError = false;

  try {
    articleData = await getHomeArticleData(categoryId);
  } catch {
    articlesError = true;
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main>
        <HomeHero />
        <AboutUsSection />
        <ServicesSection />
        <PartnersSection />
        <ArticlesSection data={articleData} error={articlesError} />
        <CommitmentSection />
        <ContactUsSection />
      </main>

      <Footer />
    </div>
  );
}
