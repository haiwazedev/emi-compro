import type { ReactNode } from "react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

import {
  type ServiceDocument,
  type ServiceTag,
  ServiceTagPill,
} from "@/components/service-tag-pill";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ServiceDivision = {
  title: string;
  code: string;
  icon: IconName;
  iconTone: "blue" | "green" | "yellow";
  description: ReactNode;
  tags: ServiceTag[];
};

const environmentDocument: ServiceDocument = {
  title: "Environmental Compliance Documentation",
  summary:
    "Technical support for environmental approvals, operating feasibility, monitoring, and audit readiness.",
  body: [
    "PLN EMI helps organizations prepare, align, and maintain environmental compliance documents across wastewater, emissions, hazardous waste, and non-hazardous waste requirements.",
    "The work can include data collection, regulatory mapping, document preparation, agency coordination support, implementation guidance, and monitoring report preparation.",
    "Each engagement is structured around the client's operating context so compliance requirements stay traceable, practical, and ready for future reviews.",
  ],
};

const energyDocument: ServiceDocument = {
  title: "Energy Conservation Program",
  summary:
    "Integrated energy efficiency support for buildings, power plants, data centers, and industrial operations.",
  body: [
    "PLN EMI combines technical audits, measurement, monitoring, and management-system consulting to identify practical energy-saving opportunities.",
    "Recommendations are designed to support operational reliability, measurable savings, and stronger alignment with recognized energy management standards.",
    "Programs can include audit planning, site assessment, performance analysis, implementation roadmaps, certification support, and ongoing monitoring strategy.",
  ],
};

const performanceTestDocument: ServiceDocument = {
  title: "Power Plant Performance Test",
  summary:
    "Optimize power generation equipment with performance testing services that help improve output, reduce costs, and stay compliant.",
  body: [
    "Performance testing validates how generation assets operate against expected efficiency and reliability benchmarks.",
    "PLN EMI supports test planning, field measurement, data evaluation, and reporting so operators can prioritize improvements with clear technical evidence.",
    "The result is a stronger basis for maintenance planning, compliance reporting, and investment decisions.",
  ],
};

const serviceDivisions: ServiceDivision[] = [
  {
    title: "Decarbonization Strategy Solutions",
    code: "DSS",
    icon: "leaf",
    iconTone: "blue",
    description: (
      <>
        Our comprehensive strategic decarbonization pathways are designed to
        help you navigate the transition to green energy. By integrating robust{" "}
        <strong className="font-bold text-services-foreground">
          Carbon Credit Management
        </strong>
        {", high-impact "}
        <strong className="font-bold text-services-foreground">
          Renewable Energy Certificates
        </strong>
        , and a reliable{" "}
        <strong className="font-bold text-services-foreground">
          Biomass Supply Chain
        </strong>
        {", we empower your organization to effectively reduce its carbon "}
        footprint while meeting global sustainability standards.
      </>
    ),
    tags: [
      {
        type: "link",
        label: "Carbon Credit for Scope 1, 2, 3 offsetting",
        href: "https://plnemi.co.id/",
        document: {
          title: "Carbon Credit Management",
          summary:
            "Support for carbon credit planning, offset strategy, and reporting alignment.",
          body: [
            "Assess current emissions sources and define reduction or offset priorities across relevant scopes.",
            "Prepare implementation support, documentation, and reporting inputs for eligible carbon programs.",
          ],
        },
      },
      {
        type: "link",
        label: "Renewable Energy Certificate (REC) for Scope 2",
        href: "https://plnemi.co.id/",
        document: {
          title: "Renewable Energy Certificate",
          summary:
            "Certificate-based support for electricity-related emissions management.",
          body: [
            "Map Scope 2 needs, certificate requirements, procurement timing, and sustainability communication priorities.",
            "Support REC documentation so electricity-related emissions claims remain clear and traceable.",
          ],
        },
      },
      {
        type: "plain",
        label: "Green Attribute Management",
      },
      {
        type: "plain",
        label: "Biomass Supply",
      },
    ],
  },
  {
    title: "Environment Compliance Solutions",
    code: "ECS",
    icon: "shield-check",
    iconTone: "green",
    description: (
      <>
        PLN EMI provides comprehensive environmental compliance support designed
        to safeguard your business against regulatory risks. Our expertise spans
        the full operational lifecycle, including rigorous{" "}
        <strong className="font-bold text-services-foreground">
          Hazardous Waste Management
        </strong>
        {", in-depth "}
        <strong className="font-bold text-services-foreground">
          Environmental Auditing
        </strong>
        , and the{" "}
        <strong className="font-bold text-services-foreground">
          Preparation of Monitoring Reports
        </strong>
        {"."}
      </>
    ),
    tags: [
      {
        type: "document",
        label: "Rincian Teknis Penyimpanan Limbah B3",
        document: environmentDocument,
      },
      {
        type: "document",
        label: "Rincian Teknis Pengelolaan Limbah Non-B3",
        document: environmentDocument,
      },
      {
        type: "document",
        label: "Persetujuan Teknis Air Limbah",
        document: environmentDocument,
      },
      {
        type: "document",
        label: "Persetujuan Teknis Emisi",
        document: environmentDocument,
      },
      {
        type: "document",
        label: "Persetujuan Teknis Pengelolaan Limbah B3",
        document: environmentDocument,
      },
      {
        type: "document",
        label: "Persetujuan Lingkungan / Integrasi",
        document: environmentDocument,
      },
      {
        type: "document",
        label: "SLO Pengelolaan Limbah B3",
        document: environmentDocument,
      },
      {
        type: "document",
        label: "SLO Air Limbah",
        document: environmentDocument,
      },
      {
        type: "document",
        label: "SLO Emisi",
        document: environmentDocument,
      },
      {
        type: "document",
        label: "Audit Lingkungan Wajib & Sukarela",
        document: environmentDocument,
      },
      {
        type: "plain",
        label: "Pengelolaan Limbah",
      },
      {
        type: "plain",
        label: "Pemantauan & Pengelolaan Lingkungan",
      },
    ],
  },
  {
    title: "Energy Conservation Solutions",
    code: "EnCS",
    icon: "zap",
    iconTone: "yellow",
    description: (
      <>
        Our holistic energy management integrates professional audits, power
        plant performance testing, and advanced monitoring with Strategic{" "}
        <strong className="font-bold text-services-foreground">
          ISO Consulting
        </strong>{" "}
        and{" "}
        <strong className="font-bold text-services-foreground">
          Green Building
        </strong>{" "}
        solutions. By combining technical insight with global standards, we
        drive maximum efficiency and significant energy savings for your
        business.
      </>
    ),
    tags: [
      {
        type: "document",
        label: "Energy Audit for Power Plant, Building, and Data Center",
        document: energyDocument,
      },
      {
        type: "document",
        label: "Performance Test for Power Plant",
        document: performanceTestDocument,
      },
      {
        type: "document",
        label: "Energy Monitoring System as a Service (EnMSaas)",
        document: energyDocument,
      },
      {
        type: "document",
        label: "ISO 50001 Consulting for Certification",
        document: energyDocument,
      },
      {
        type: "document",
        label: "Green Building Consulting (EDGE & Greenship)",
        document: energyDocument,
      },
      {
        type: "document",
        label: "ESCO Implementation for Building",
        document: energyDocument,
      },
      {
        type: "document",
        label: "Energy Auditor & Energy Manager Certification (BNSP)",
        document: energyDocument,
      },
    ],
  },
];

const iconToneClassNames: Record<ServiceDivision["iconTone"], string> = {
  blue: "bg-services-icon-blue",
  green: "bg-services-icon-green",
  yellow: "bg-services-icon-yellow",
};

export function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="scroll-mt-20 bg-services-background py-16 lg:py-36"
      id="services"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-services-accent">
            WHAT WE OFFER
          </p>
          <h2
            className="mt-6 font-display text-4xl leading-none text-services-foreground"
            id="services-heading"
          >
            <span className="block">Our Service</span>
            <span className="block italic text-services-accent">Divisions</span>
          </h2>
        </div>

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

function ServiceCard({ service }: { service: ServiceDivision }) {
  return (
    <article className="relative rounded-2xl border border-white/80 bg-services-card p-8 shadow-sm transition ease-in-out duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none lg:grid lg:grid-cols-[5rem_minmax(0,1fr)] gap-2">
      <div
        aria-hidden="true"
        className={cn(
          "flex size-14 items-center justify-center rounded-2xl text-white shadow-lg shadow-services-muted/20",
          iconToneClassNames[service.iconTone],
        )}
      >
        <DynamicIcon className="size-6" name={service.icon} strokeWidth={2} />
      </div>

      <div className="mt-4 min-w-0 lg:mt-0">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-2xl leading-tight text-services-foreground">
            {service.title}
          </h3>
          <Badge
            className="h-6 rounded-full border-transparent bg-services-tag-background px-3 text-xs font-bold text-services-accent"
            variant="secondary"
          >
            {service.code}
          </Badge>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-services-muted">
          {service.description}
        </p>

        <ul
          aria-label={`${service.title} services`}
          className="mt-4 flex flex-wrap gap-3"
        >
          {service.tags.map((tag) => (
            <li className="min-w-0" key={tag.label}>
              <ServiceTagPill tag={tag} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
