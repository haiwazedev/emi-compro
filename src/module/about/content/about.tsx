export type AboutBadge = {
  label: string;
  emoji: string;
};

export type AboutMetric = {
  label: string;
  value: number;
  suffix: string;
  description: string;
};

type AboutContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
};

export const aboutContent: AboutContent = {
  eyebrow: "SEKILAS EMI",
  title: "Who",
  subtitle: "We Are",
  description:
    "Since 1987, PT Energy Management Indonesia (Persero) has been supporting the national energy efficiency program. As part of the PLN Group since 2021, we manage Green Instruments and Carbon Economic Values across the entire group environment.",
};

export const aboutBadges: AboutBadge[] = [
  {
    label: "Sustainability",
    emoji: "🌿",
  },
  {
    label: "Compliance",
    emoji: "🛡️",
  },
  {
    label: "Energy Efficiency",
    emoji: "⚡",
  },
  {
    label: "Climate Action",
    emoji: "🌐",
  },
];

export const aboutMetrics: AboutMetric[] = [
  {
    label: "ESTABLISHED",
    value: 1987,
    suffix: "",
    description:
      "Nearly four decades supporting Indonesia's national energy efficiency program.",
  },
  {
    label: "WHAT WE OFFER",
    value: 5,
    suffix: "",
    description:
      "Integrated service divisions from decarbonization to environmental compliance.",
  },
  {
    label: "OUR NETWORK",
    value: 150,
    suffix: "+",
    description:
      "Clients served across industries — driving energy efficiency and sustainability together.",
  },
];
