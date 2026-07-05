export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
};

export const faqs: FaqItem[] = [
  {
    id: "rec-spe",
    question: "Apa itu REC dan SPE?",
    answer: [
      "REC adalah instrumen berupa sertifikat yang membuktikan bahwa setiap 1 MWh listrik yang dikonsumsi oleh operasional perusahaan Anda berasal dari pembangkit energi terbarukan, seperti tenaga surya, air, atau angin, yang tersertifikasi.",
      "Sedangkan SPE adalah instrumen berupa sertifikat yang membuktikan bahwa perusahaan Anda telah mendanai atau mengompensasi proyek penurunan emisi karbon secara nyata di tempat lain, seperti proyek efisiensi energi atau konservasi hutan.",
    ],
  },
  {
    id: "ghg-accounting",
    question: "Apa hubungannya REC dan SPE ini dengan GHG Accounting?",
    answer: [
      "REC dapat mendukung pelaporan emisi Scope 2 karena berkaitan dengan penggunaan listrik dari sumber energi terbarukan.",
      "SPE dapat membantu strategi kompensasi emisi yang belum dapat dihindari, terutama saat perusahaan menyusun inventaris dan rencana pengurangan emisi berdasarkan prinsip GHG Accounting.",
    ],
  },
  {
    id: "price-calculation",
    question:
      "Berapa harga 1 unit REC dan 1 unit SPE? Dan bagaimana cara perhitungannya?",
    answer: [
      "Harga REC dan SPE dapat berbeda tergantung volume kebutuhan, jenis instrumen, periode penggunaan, serta ketersediaan sertifikat atau proyek yang relevan.",
      "Perhitungannya dimulai dari konsumsi energi, baseline emisi, target pengurangan emisi, dan kebutuhan pelaporan perusahaan.",
    ],
  },
  {
    id: "purchase-process",
    question: "Bagaimana proses pembelian REC atau SPE melalui PLN EMI?",
    answer: [
      "Tim PLN EMI akan membantu mengidentifikasi kebutuhan perusahaan, memvalidasi data konsumsi atau emisi, menghitung kebutuhan instrumen, lalu menyiapkan rekomendasi dan dokumentasi pendukung.",
    ],
  },
  {
    id: "reporting-use",
    question:
      "Apakah REC dan SPE dapat digunakan untuk laporan ESG atau sustainability report?",
    answer: [
      "Ya, REC dan SPE dapat menjadi bagian dari bukti pendukung dalam laporan keberlanjutan, laporan ESG, atau komunikasi dekarbonisasi, selama penggunaannya sesuai dengan batasan pelaporan dan metodologi yang digunakan perusahaan.",
    ],
  },
];
