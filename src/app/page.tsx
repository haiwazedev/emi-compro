import { AboutUsSection } from "@/module/about/components/about-us-section";
import { ClientsSection } from "@/module/clients/components/clients-section";
import { ContactUsSection } from "@/module/contact/components/contact-us-section";
import { FaqSection } from "@/module/faq/components/faq-section";
import { HomeHero } from "@/module/home/components/home-hero";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";
import { ServicesSection } from "@/module/services/components/services-section";
import { StatsSection } from "@/module/stats/components/stats-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral text-brand-navbar-foreground">
      <Navbar />

      <main>
        <HomeHero />
        <StatsSection />
        <AboutUsSection />
        <ServicesSection />
        <ClientsSection />
        <FaqSection />
        <ContactUsSection />
      </main>

      <Footer />
    </div>
  );
}
