export type CommitmentDocumentMediaTone =
  "amber" | "blue" | "green" | "navy" | "slate" | "teal";

export type CommitmentDocument = {
  category: string;
  coverCode: string;
  coverLabel: string;
  fileSize: string;
  fileType: "PDF";
  id: string;
  mediaTone: CommitmentDocumentMediaTone;
  title: string;
  uploadedAt: string;
};

export const commitmentDocuments = [
  {
    category: "Sustainability Report",
    coverCode: "2025",
    coverLabel: "PLN EMI\nSUSTAINABILITY\nREPORT",
    fileSize: "8.6 MB",
    fileType: "PDF",
    id: "sustainability-report-2025",
    mediaTone: "blue",
    title: "Sustainability Report 2025",
    uploadedAt: "Diunggah Mei 2026",
  },
  {
    category: "Annual Report",
    coverCode: "2025",
    coverLabel: "PLN EMI\nANNUAL REPORT",
    fileSize: "12.4 MB",
    fileType: "PDF",
    id: "annual-report-2025",
    mediaTone: "navy",
    title: "Annual Report 2025",
    uploadedAt: "Diunggah Mei 2026",
  },
  {
    category: "Certification",
    coverCode: "ISO",
    coverLabel: "PLN EMI\nCERTIFICATION",
    fileSize: "1.2 MB",
    fileType: "PDF",
    id: "iso-9001-2015-quality-management",
    mediaTone: "green",
    title: "ISO 9001:2015 Quality Management Certificate",
    uploadedAt: "Diunggah Mar 2026",
  },
  {
    category: "Certification",
    coverCode: "ISO",
    coverLabel: "PLN EMI\nCERTIFICATION",
    fileSize: "1.4 MB",
    fileType: "PDF",
    id: "iso-14001-2015-environmental-management",
    mediaTone: "teal",
    title: "ISO 14001:2015 Environmental Management Certificate",
    uploadedAt: "Diunggah Mar 2026",
  },
  {
    category: "Certification",
    coverCode: "ISO",
    coverLabel: "PLN EMI\nCERTIFICATION",
    fileSize: "1.1 MB",
    fileType: "PDF",
    id: "iso-50001-2018-energy-management",
    mediaTone: "amber",
    title: "ISO 50001:2018 Energy Management Certificate",
    uploadedAt: "Diunggah Feb 2026",
  },
  {
    category: "Corporate Policy",
    coverCode: "COC",
    coverLabel: "PLN EMI\nCORPORATE\nPOLICY",
    fileSize: "2.3 MB",
    fileType: "PDF",
    id: "code-of-conduct-business-ethics",
    mediaTone: "slate",
    title: "Code of Conduct & Business Ethics",
    uploadedAt: "Diunggah Apr 2026",
  },
  {
    category: "Corporate Policy",
    coverCode: "ABC",
    coverLabel: "PLN EMI\nCORPORATE\nPOLICY",
    fileSize: "1.8 MB",
    fileType: "PDF",
    id: "anti-bribery-gratification-policy",
    mediaTone: "slate",
    title: "Anti-Bribery & Gratification Policy",
    uploadedAt: "Diunggah Apr 2026",
  },
  {
    category: "Corporate Policy",
    coverCode: "K3L",
    coverLabel: "PLN EMI\nCORPORATE\nPOLICY",
    fileSize: "1.5 MB",
    fileType: "PDF",
    id: "hse-k3l-corporate-policy",
    mediaTone: "blue",
    title: "HSE (K3L) Corporate Policy",
    uploadedAt: "Diunggah Feb 2026",
  },
  {
    category: "Corporate Policy",
    coverCode: "WBS",
    coverLabel: "PLN EMI\nCORPORATE\nPOLICY",
    fileSize: "1.0 MB",
    fileType: "PDF",
    id: "whistleblowing-system-guidelines",
    mediaTone: "navy",
    title: "Whistleblowing System Guidelines",
    uploadedAt: "Diunggah Jan 2026",
  },
  {
    category: "Sustainability Report",
    coverCode: "GHG",
    coverLabel: "PLN EMI\nSUSTAINABILITY\nREPORT",
    fileSize: "3.2 MB",
    fileType: "PDF",
    id: "ghg-emissions-disclosure-2025",
    mediaTone: "green",
    title: "GHG Emissions Disclosure 2025",
    uploadedAt: "Diunggah Apr 2026",
  },
  {
    category: "Sustainability Report",
    coverCode: "2024",
    coverLabel: "PLN EMI\nSUSTAINABILITY\nREPORT",
    fileSize: "7.9 MB",
    fileType: "PDF",
    id: "sustainability-report-2024",
    mediaTone: "blue",
    title: "Sustainability Report 2024",
    uploadedAt: "Diunggah Mei 2025",
  },
  {
    category: "Annual Report",
    coverCode: "2024",
    coverLabel: "PLN EMI\nANNUAL REPORT",
    fileSize: "11.8 MB",
    fileType: "PDF",
    id: "annual-report-2024",
    mediaTone: "navy",
    title: "Annual Report 2024",
    uploadedAt: "Diunggah Mei 2025",
  },
] satisfies readonly CommitmentDocument[];
