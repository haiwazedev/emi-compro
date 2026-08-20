export type CommitmentMediaTone = "green" | "blue" | "navy";

export type CommitmentItem = {
  description: string;
  href: string;
  id: string;
  mediaTone: CommitmentMediaTone;
  title: string;
};

export const commitmentItems: CommitmentItem[] = [
  {
    description:
      "ISO certifications and accreditations reflecting our solid performance.",
    href: "#commitment",
    id: "certifications-ratings",
    mediaTone: "green",
    title: "Certifications & Ratings",
  },
  {
    description:
      "Governance, HSE, and ethics policies that guide how we work every day.",
    href: "#commitment",
    id: "corporate-policies",
    mediaTone: "blue",
    title: "Corporate Policies",
  },
  {
    description:
      "Annual reports and disclosures highlighting our measurable commitment.",
    href: "#commitment",
    id: "sustainability-reports",
    mediaTone: "navy",
    title: "Sustainability Reports",
  },
];
