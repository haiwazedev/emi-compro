export type AboutHistoryItem = {
  year: string;
  title: string;
  description: string;
};

export type ManagementTone = "blue" | "green" | "navy";

export type ManagementMember = {
  biography: string;
  englishRole: string;
  englishRoleDescription: string;
  image: string;
  name: string;
  role: string;
  company: string;
  slug: string;
  tone: ManagementTone;
};

export type ManagementContent = {
  directors: readonly ManagementMember[];
  eyebrow: string;
  title: string;
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
    paragraphs: [
      "Since 1987, PT Energy Management Indonesia (Persero) has been supporting the national energy efficiency program. As part of the PLN Group since 2021, we manage Green Instruments and Carbon Economic Values across the entire group environment.",
      "Headquartered at Menara Sentraya, Jakarta Selatan, we deliver audit study, benchmarking, and consulting services, as well as implementation services for energy and environmental conservation — built on proven innovative technology.",
    ],
    partOfLabel: "PART OF",
    partOfValue: "PLN Group · Danantara Indonesia",
  },
  history: {
    eyebrow: "OUR HISTORY",
    title: "Sejarah Kami",
    description:
      "From Koneba to PLN EMI — the milestones that shaped our journey as Indonesia's energy conservation pioneer.",
    items: [
      {
        year: "1987",
        title: "PT Konservasi Energi Abadi (Koneba)",
        description:
          "Founded on January 28, 1987, as PT Konservasi Energi Abadi (Koneba).",
      },
      {
        year: "1993",
        title: "Becoming a State-Owned Enterprise",
        description:
          "Restructured into a State-Owned Enterprise (BUMN) in 1993.",
      },
      {
        year: "2006",
        title: "A new name: PT Energy Management Indonesia (Persero)",
        description:
          "Changed its name from PT Koneba (Persero) to PT Energy Management Indonesia (Persero) in 2006.",
      },
      {
        year: "2021",
        title: "Joining the PLN Group",
        description:
          "In 2021, PT Energy Management Indonesia officially became part of the PLN Group. Along with this transition, the company's status changed from a State-Owned Enterprise (Persero) to a Limited Liability Company (PT).",
      },
      {
        year: "Juni 2026",
        title: "Back to (Persero)",
        description:
          "In accordance with the mandate of Law Number 16 of 2025, the Company has resumed using the name PT Energy Management Indonesia (Persero).",
      },
    ] satisfies readonly AboutHistoryItem[],
  },
  direction: {
    eyebrow: "DIRECTION",
    title: "Vision & Mission",
    vision:
      "Becoming a Strategic Partner of the Government in Energy and Environmental Conservation Initiatives to Achieve Sustainable Development in Indonesia.",
    mission: [
      "Providing audit services, studies, benchmarking, and other consulting services, as well as implementation services for energy and environmental conservation (EPC & equipment supply system), based on the development of proven and innovative technology.",
      "Managing and utilizing environmentally conscious energy, especially renewable energy.",
    ],
  },
  management: {
    eyebrow: "MANAJEMEN",
    title: "Manajemen Perusahaan",
    directors: [
      {
        biography:
          "Memiliki latar belakang pendidikan Sarjana Teknik Informatika dari Institut Teknologi PLN dan Magister Manajemen dari Universitas Sriwijaya.",
        englishRole: "Chief Executive Officer (CEO)",
        englishRoleDescription:
          "dari PT Energy Management Indonesia (Persero).",
        image: "/managements/Henri Firdaus.png",
        name: "Henri Firdaus",
        role: "Direktur Utama",
        company: "PT Energy Management Indonesia (Persero)",
        slug: "henri-firdaus",
        tone: "blue",
      },
      {
        biography:
          "Memiliki latar belakang pendidikan Sarjana Teknik Lingkungan dari Universitas Diponegoro yang diperkuat dengan berbagai pendidikan, pelatihan, dan sertifikasi profesional di bidang ESG, keberlanjutan, dan pengembangan bisnis.",
        englishRole:
          "Chief Operations and Business Development Officer (COO/ CBDO)",
        englishRoleDescription: "of PT Energy Management Indonesia (Persero).",
        image: "/managements/Asep Saepudin.png",
        name: "Asep Saepudin",
        role: "Direktur Operasi dan Pengembangan Usaha",
        company: "PT Energy Management Indonesia (Persero)",
        slug: "asep-saepudin",
        tone: "green",
      },
      {
        biography:
          "Memiliki latar belakang pendidikan Sarjana Manajemen Keuangan dari Universitas Diponegoro dan Magister di bidang Kelistrikan dari Institut Teknologi Bandung (ITB).",
        englishRole: "Director of Finance, Risk Management, and Human Capital",
        englishRoleDescription: "of PT Energy Management Indonesia (Persero).",
        image: "/managements/Saulus Erwin Pamungkas.png",
        name: "Saulus Erwin Pamungkas",
        role: "Direktur Keuangan, Manajemen Risiko, dan Human Capital",
        company: "PT Energy Management Indonesia (Persero)",
        slug: "saulus-erwin-pamungkas",
        tone: "navy",
      },
    ] satisfies readonly ManagementMember[],
  } satisfies ManagementContent,
} as const;
