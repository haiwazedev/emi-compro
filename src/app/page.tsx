import { AboutUsSection } from "@/components/about-us-section";
import { ClientsSection } from "@/components/clients-section";
import { HomeHero } from "@/components/home-hero";
import { Navbar } from "@/components/navbar";
import { ServicesSection } from "@/components/services-section";
import { StatsSection } from "@/components/stats-section";

const sections = [
  {
    id: "faq",
    eyebrow: "FAQ",
    title: "Built for long-term operating clarity",
    description:
      "The navigation is ready for future content sections, including common customer questions, project highlights, and consultation pathways.",
  },
  {
    id: "contact",
    eyebrow: "Contact",
    title: "Start a sustainability conversation",
    description:
      "Connect with PLN EMI to explore energy management, environmental compliance, and circularity opportunities.",
  },
];

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

        {sections.map((section) => (
          <section
            className="mx-auto min-h-[60vh] max-w-7xl scroll-mt-20 px-6 py-20 sm:px-8 lg:px-10"
            id={section.id}
            key={section.id}
          >
            <p className="mb-3 text-sm font-bold uppercase text-brand-navbar-foreground/70">
              {section.eyebrow}
            </p>
            <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
              {section.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-brand-navbar-foreground/75">
              {section.description}
            </p>
          </section>
        ))}
      </main>
    </div>
  );
}
