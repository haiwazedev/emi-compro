export const articleCategories = [
  "All",
  "Press Release",
  "Insight",
  "CSR News",
  "Energy News",
] as const;

export type ArticleCategory = (typeof articleCategories)[number];
export type ArticleMediaTone = "blue" | "green" | "amber" | "slate" | "navy";

type PublishedArticleCategory = Exclude<ArticleCategory, "All">;

export type Article = {
  category: PublishedArticleCategory;
  date: string;
  dateTime: string;
  description: string;
  href: string;
  id: string;
  mediaTone: ArticleMediaTone;
  title: string;
};

export const articles: Article[] = [
  {
    category: "Press Release",
    date: "12 Jul 2026",
    dateTime: "2026-07-12",
    description:
      "New agreements bring renewable energy certificates to Indonesia's fastest-growing digital infrastructure sector.",
    href: "#articles",
    id: "emi-expands-rec-coverage",
    mediaTone: "blue",
    title: "EMI Expands REC Coverage for Data Center Clients Nationwide",
  },
  {
    category: "Energy News",
    date: "10 Jul 2026",
    dateTime: "2026-07-10",
    description:
      "A practical guide to Sertifikat Pengurangan Emisi and how it fits your Scope 1–3 strategy.",
    href: "#articles",
    id: "understanding-spe-grk",
    mediaTone: "green",
    title: "Understanding SPE–GRK: Indonesia's Carbon Unit Explained",
  },
  {
    category: "CSR News",
    date: "6 Jul 2026",
    dateTime: "2026-07-06",
    description:
      "The Ombilin fly-ash fertilizer pilot on paddy fields shows the circular-economy value of zero waste.",
    href: "#articles",
    id: "faba-demplot-program",
    mediaTone: "amber",
    title: "FABA Demplot Program Boosts Rice Yields in Sawahlunto",
  },
  {
    category: "Insight",
    date: "1 Jul 2026",
    dateTime: "2026-07-01",
    description:
      "From SLO renewals to emissions reporting — a checklist to keep your operations audit-ready.",
    href: "#articles",
    id: "facility-compliance-deadlines",
    mediaTone: "slate",
    title:
      "Five Compliance Deadlines Every Facility Manager Should Track in 2026",
  },
  {
    category: "Press Release",
    date: "24 Jun 2026",
    dateTime: "2026-06-24",
    description:
      "Hotel groups commit to audited efficiency programs targeting double-digit energy savings.",
    href: "#articles",
    id: "hospitality-partners-mou",
    mediaTone: "navy",
    title: "EMI and Hospitality Partners Sign Energy Efficiency MoU",
  },
  {
    category: "Energy News",
    date: "18 Jun 2026",
    dateTime: "2026-06-18",
    description:
      "How your electricity accounting choice changes your reported footprint — and what auditors expect.",
    href: "#articles",
    id: "scope-2-accounting",
    mediaTone: "green",
    title: "Scope 2 Accounting: Market-Based vs Location-Based Methods",
  },
  {
    category: "Insight",
    date: "11 Jun 2026",
    dateTime: "2026-06-11",
    description:
      "Co-firing demand is rising. Here's how reliable feedstock partnerships de-risk the transition.",
    href: "#articles",
    id: "biomass-supply-chains",
    mediaTone: "blue",
    title: "Why Biomass Supply Chains Are the Next Decarbonization Frontier",
  },
];

export const homeArticles = articles.slice(0, 5);
