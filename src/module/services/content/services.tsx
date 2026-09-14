import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  FileText,
  Leaf,
  Mail,
  Newspaper,
  Recycle,
  ShieldCheck,
  Zap,
} from "lucide-react";

export type ServiceDivision = {
  title: string;
  code: string;
  slug: string;
  icon: LucideIcon;
  iconTone: "blue" | "green" | "yellow" | "slate";
  description: string;
  detailDescription: string;
  detailImages: readonly ServiceDetailImage[];
  offerings: readonly ServiceOffering[];
  href: string;
};

export type ServiceDetailImage = {
  alt: string;
  src: string;
};

export type ServiceOffering = {
  description: string;
  label: string;
};

export type ServiceNavigationItem = {
  eyebrow: string;
  title: string;
  icon: LucideIcon;
  tone: "teal" | "blue" | "navy" | "slate";
  href?: string;
};

export const serviceNavigationItems: ServiceNavigationItem[] = [
  {
    eyebrow: "WHAT WE OFFER",
    title: "Our Service Divisions",
    icon: Leaf,
    tone: "teal",
    href: "/services",
  },
  {
    eyebrow: "NEW · MEDIA & INFORMATION",
    title: "News, Insights & Press Releases",
    icon: Newspaper,
    tone: "blue",
  },
  {
    eyebrow: "NEW · COMMITMENT",
    title: "Certifications, Policies & Reports",
    icon: FileText,
    tone: "navy",
  },
  {
    eyebrow: "GET IN TOUCH",
    title: "Talk to Our Experts",
    icon: Mail,
    tone: "slate",
    href: "/contact-us",
  },
];

const serviceDetailImages: readonly ServiceDetailImage[] = [
  {
    alt: "Contoh diagram alur layanan Green Attribute (ERPA)",
    src: "/service-diagram.png",
  },
  {
    alt: "Contoh sertifikat Renewable Energy Certificate (REC)",
    src: "/service-certificate.png",
  },
];

export const serviceDivisions: ServiceDivision[] = [
  {
    title: "Decarbonization Strategy Solutions",
    code: "DSS",
    slug: "decarbonization-strategy",
    icon: Leaf,
    iconTone: "blue",
    description:
      "PLN EMI helps organizations transition to eco-friendly energy through carbon investment management and renewable energy solutions.",
    detailDescription:
      "PLN EMI is ready to assist companies in transitioning to eco-friendly energy through Carbon Investment Management, the utilization of Renewable Energy Certificates (REC), and the reliable supply of eco-friendly fuel (Biomass). We help companies reduce emission pollution seamlessly while meeting internationally recognized environmental standards.",
    detailImages: serviceDetailImages,
    offerings: [
      {
        description:
          "Layanan ini membantu perusahaan menghitung dan mengelola atribut hijau dari energi terbarukan secara transparan.",
        label: "Green Attribute (ERPA)",
      },
      {
        description:
          "Sertifikat ini membantu organisasi membuktikan penggunaan listrik terbarukan dan mendukung target pengurangan emisi.",
        label: "Renewable Energy Certificate (REC)",
      },
      {
        description:
          "Pasokan biomassa yang andal membantu pembangkit dan industri beralih ke bahan bakar yang lebih ramah lingkungan.",
        label: "Biomass Supply",
      },
    ],
    href: "/services#decarbonization-strategy",
  },
  {
    title: "Energy Conservation Solutions",
    code: "ECS",
    slug: "energy-conservation",
    icon: Zap,
    iconTone: "yellow",
    description:
      "PLN EMI integrates energy audits, power plant performance testing, ISO 50001 consulting, and green building solutions to improve efficiency.",
    detailDescription:
      "PLN EMI’s energy conservation services integrate professional Energy Audits, Performance Tests for Power Plants, ISO 50001 Consultation, and Green Building Certification solutions. By combining technical precision with global standards, we drive maximum efficiency and significant energy savings for your business.",
    detailImages: serviceDetailImages,
    offerings: [
      {
        description:
          "Pengujian ini mengukur kinerja pembangkit secara menyeluruh untuk menemukan peluang peningkatan efisiensi.",
        label: "Performance Test for Power Plant",
      },
      {
        description:
          "Audit energi memetakan pola konsumsi dan merekomendasikan langkah penghematan untuk fasilitas dan pusat data.",
        label: "Energy Audit for Power Plant, Building & Data Center",
      },
      {
        description:
          "Skema ESCO membantu perusahaan menjalankan proyek efisiensi energi dengan dukungan teknis dan pengelolaan kinerja.",
        label: "Energy Services Company (ESCO)",
      },
      {
        description:
          "Program sertifikasi menyiapkan auditor dan manajer energi agar memenuhi kompetensi dan standar yang berlaku.",
        label: "Energy Auditor & Energy Manager Certification (BNSP)",
      },
      {
        description:
          "Sistem pemantauan energi menyediakan data konsumsi secara berkala untuk mendukung keputusan operasional.",
        label: "Energy Monitoring System as a Service (EnMSaaS)",
      },
      {
        description:
          "Konsultasi ISO 50001 membantu organisasi membangun sistem manajemen energi yang siap untuk proses sertifikasi.",
        label: "ISO 50001 Consulting for Certification",
      },
      {
        description:
          "Konsultasi bangunan hijau mengarahkan perencanaan fasilitas yang hemat energi, sehat, dan berkelanjutan.",
        label: "Green Building Consulting (EDGE & Greenship)",
      },
    ],
    href: "/services#energy-conservation",
  },
  {
    title: "Waste Circularity Solutions",
    code: "WCS",
    slug: "waste-circularity",
    icon: Recycle,
    iconTone: "green",
    description:
      "PLN EMI helps industries transform waste into resources through practical circular economy strategies and innovative FABA solutions.",
    detailDescription:
      "PLN EMI empowers industries to transform waste into resource through robust circular economy strategies. Our expertise spans innovative Fly Ash Bottom Ash (FABA) Utilization, Sustainable E-Waste Management, and comprehensive Non-Hazardous Waste Solutions. By reimagining waste as an asset, we help your business reduce environmental liabilities and achieve a zero-waste future.",
    detailImages: serviceDetailImages,
    offerings: [
      {
        description:
          "Pemanfaatan FABA mengubah residu pembakaran menjadi material bernilai dengan memperhatikan persyaratan teknis dan lingkungan.",
        label: "Fly Ash Bottom Ash (FABA) Utilization",
      },
      {
        description:
          "Solusi sirkular ini membantu industri mengelola limbah berbahaya dan non-B3 secara aman serta bertanggung jawab.",
        label: "Hazardous & Non-Hazardous Waste Circularity",
      },
      {
        description:
          "Pengelolaan e-waste mendukung pemulihan material elektronik dan mengurangi dampak limbah terhadap lingkungan.",
        label: "E-Waste (ATPB) Circularity",
      },
    ],
    href: "/services#waste-circularity",
  },
  {
    title: "Sustainability Consulting Solutions",
    code: "SCS",
    slug: "sustainability-consulting",
    icon: BarChart3,
    iconTone: "slate",
    description:
      "PLN EMI provides sustainability consulting to help organizations navigate modern standards, ESG reporting, and long-term climate goals.",
    detailDescription:
      "PLN EMI provides expert consulting to help organizations navigate modern sustainability standards. Our services include Sustainability Reporting, ESG Ratings, LCA Studies, and GHG Inventories. By implementing rigorous safeguards, we ensure your business remains compliant, transparent, and resilient in an ESG-focused market.",
    detailImages: serviceDetailImages,
    offerings: [
      {
        description:
          "Pelaporan keberlanjutan membantu organisasi menyampaikan kinerja ekonomi, sosial, dan lingkungan secara terstruktur.",
        label: "Sustainability Reporting",
      },
      {
        description:
          "Inventarisasi GHG menghitung sumber emisi organisasi sebagai dasar penetapan target dan strategi pengurangannya.",
        label: "GHG Inventories",
      },
      {
        description:
          "Penilaian ESG membantu perusahaan memahami kesiapan, risiko, dan peluang keberlanjutan dalam rantai bisnis.",
        label: "ESG Rating",
      },
      {
        description:
          "Studi LCA mengevaluasi dampak lingkungan produk atau proses dari hulu hingga hilir.",
        label: "LCA Study",
      },
      {
        description:
          "Konsultasi safeguard membantu memastikan aspek lingkungan dan sosial terintegrasi dalam pengambilan keputusan proyek.",
        label: "Environment & Social Safeguard Consulting",
      },
    ],
    href: "/services#sustainability-consulting",
  },
  {
    title: "Environment Compliance Solutions",
    code: "EnCS",
    slug: "environment-compliance",
    icon: ShieldCheck,
    iconTone: "blue",
    description:
      "PLN EMI provides comprehensive environmental compliance support across waste management, auditing, permits, and monitoring reports.",
    detailDescription:
      "PLN EMI provides comprehensive environmental compliance support designed to safeguard your business against regulatory risks. Our expertise spans the full operational lifecycle, including rigorous Waste Management Permitting, in-depth Environmental Auditing, and the Preparation of Monitoring Reports — enabling your organization to focus on growth while maintaining the highest standards of environmental stewardship.",
    detailImages: serviceDetailImages,
    offerings: [
      {
        description:
          "Pendampingan ini membantu perusahaan menyiapkan persetujuan teknis penyimpanan limbah B3 sesuai ketentuan.",
        label: "Persetujuan Teknis Penyimpanan Limbah B3",
      },
      {
        description:
          "Layanan ini mendukung pemenuhan persetujuan teknis emisi dan kesiapan dokumen SLO emisi.",
        label: "Persetujuan Teknis Emisi & SLO Emisi",
      },
      {
        description:
          "Rincian teknis ini membantu organisasi merencanakan pengelolaan limbah non-B3 secara tertib dan dapat ditelusuri.",
        label: "Rincian Teknis Pengelolaan Limbah Non-B3",
      },
      {
        description:
          "Pendampingan air limbah membantu perusahaan memenuhi persetujuan teknis dan kesiapan SLO air limbah.",
        label: "Persetujuan Teknis Air Limbah & SLO Air Limbah",
      },
      {
        description:
          "Solusi ini mendukung kepatuhan pengelolaan limbah B3 melalui persetujuan teknis dan dokumen SLO.",
        label: "Persetujuan Teknis Limbah B3 & SLO Limbah B3",
      },
      {
        description:
          "Dokumen teknis ini membantu memastikan pembuangan air limbah ke laut dikelola sesuai persyaratan lingkungan.",
        label: "Rincian Teknis & SLO Air Limbah ke Air Laut",
      },
      {
        description:
          "Pelaporan pemantauan dan pengelolaan lingkungan merangkum kinerja kepatuhan secara jelas dan berkala.",
        label: "Pelaporan Pemantauan & Pengelolaan Lingkungan",
      },
      {
        description:
          "Pendampingan persetujuan lingkungan membantu memastikan rencana kegiatan memiliki dasar perizinan yang tepat.",
        label: "Persetujuan Lingkungan / Integrasi",
      },
      {
        description:
          "Pengelolaan limbah B3 dan PCBs membantu mengurangi risiko paparan serta memastikan penanganan yang aman.",
        label: "Pengelolaan Limbah B3 & PCBs",
      },
      {
        description:
          "Audit lingkungan menilai kepatuhan dan memberikan rekomendasi perbaikan untuk mengurangi risiko operasional.",
        label: "Audit Lingkungan Wajib & Sukarela",
      },
      {
        description:
          "Penyusunan dokumen lingkungan membantu kegiatan usaha memenuhi kebutuhan perizinan dan pengelolaan dampak.",
        label: "Dokumen Lingkungan (SPPL, DPLH, DELH, AMDAL, UKL-UPL, PKPLH)",
      },
    ],
    href: "/services#environment-compliance",
  },
];
