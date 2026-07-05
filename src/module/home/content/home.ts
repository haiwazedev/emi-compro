export type HomeSlide = {
  image: string;
  imageAlt: string;
  mainTitle: string;
  subtitle: string;
  description: string;
};

export const homeSlides: HomeSlide[] = [
  {
    image: "/slides/slide_1.png",
    imageAlt: "PLN EMI team member inspecting industrial energy equipment.",
    mainTitle: "Optimizing Power,",
    subtitle: "Empowering The Future",
    description:
      "Energy auditing, performance testing, monitoring systems, ISO certification consulting, and green building solutions for maximum efficiency.",
  },
  {
    image: "/slides/slide_2.png",
    imageAlt:
      "Industrial facility prepared for environmental and energy assessment.",
    mainTitle: "Legal by Design,",
    subtitle: "Green by Nature",
    description:
      "Comprehensive environmental compliance support, from hazardous waste management to environmental auditing and monitoring reports.",
  },
  {
    image: "/slides/slide_3.png",
    imageAlt:
      "Sustainable infrastructure and operational environment supported by PLN EMI.",
    mainTitle: "Cleaner Systems,",
    subtitle: "Stronger Operations",
    description:
      "Practical decarbonization and resource efficiency programs that help organizations improve performance with measurable impact.",
  },
  {
    image: "/slides/slide_4.png",
    imageAlt:
      "Field energy management work supporting sustainable industry in Indonesia.",
    mainTitle: "Measured Impact,",
    subtitle: "Sustainable Growth",
    description:
      "Integrated energy management, circularity, and sustainability consulting for companies building long-term operating resilience.",
  },
];
