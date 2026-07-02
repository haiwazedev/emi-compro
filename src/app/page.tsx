import { AboutUsSection } from "@/components/about-us-section";
import { ClientsSection } from "@/components/clients-section";
import { ContactUsSection } from "@/components/contact-us-section";
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { HomeHero } from "@/components/home-hero";
import { Navbar } from "@/components/navbar";
import { ServicesSection } from "@/components/services-section";
import { StatsSection } from "@/components/stats-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-brand-navbar-foreground">
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
