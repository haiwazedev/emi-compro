import { SectionHeading } from "@/shared/components/section-heading";
import { ServiceCard } from "@/module/services/components/service-card";
import { serviceDivisions } from "@/module/services/content/services";
import { cn } from "@/shared/lib/utils";

export function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="scroll-mt-20 bg-services-background py-16 lg:py-36"
      id="services"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeading
          className="text-center"
          eyebrow="WHAT WE OFFER"
          eyebrowClassName="text-sm font-bold uppercase tracking-widest text-services-accent"
          headingId="services-heading"
          subtitle="Divisions"
          subtitleClassName="text-services-accent"
          title="Our Service"
          titleClassName="mt-6 font-display text-4xl leading-none text-services-foreground"
        />

        <ul className="mt-16 flex flex-col gap-4">
          {serviceDivisions.map((service, index) => (
            <li
              className={cn("relative", index > 0 && "-mt-px")}
              key={service.code}
            >
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
