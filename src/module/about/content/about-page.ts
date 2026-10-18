export type AboutHistoryItem = {
  id: number;
  year: string;
  title: string;
  description: string;
};

export type AboutMissionItem = {
  id: number;
  title: string;
  description: string;
};

export const aboutPageContent = {
  hero: {
    breadcrumb: "Home / About Us",
    title: "Tentang",
    titleAccent: "Kami",
    description:
      "Since 1987, supporting Indonesia's national energy efficiency program — and since 2021, managing Green Instruments and Carbon Economic Values across the PLN Group.",
  },
  companyProfile: {
    eyebrow: "COMPANY PROFILE",
    title: "Profil Perusahaan",
    partOfLabel: "PART OF",
    partOfValue: "PLN Group · Danantara Indonesia",
  },
  history: {
    eyebrow: "OUR HISTORY",
    title: "Sejarah Kami",
    description:
      "From Koneba to PLN EMI — the milestones that shaped our journey as Indonesia's energy conservation pioneer.",
  },
  direction: {
    eyebrow: "DIRECTION",
    title: "Vision & Mission",
  },
  management: {
    eyebrow: "MANAJEMEN",
    title: "Manajemen Perusahaan",
  },
} as const;
