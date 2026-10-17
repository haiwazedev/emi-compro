export type CommitmentDocumentMediaTone =
  "amber" | "blue" | "green" | "navy" | "slate" | "teal";

export const commitmentDocumentMediaToneClassNames: Record<
  CommitmentDocumentMediaTone,
  string
> = {
  amber: "bg-linear-to-br from-amber-500 via-amber-500 to-amber-600",
  blue: "bg-linear-to-br from-secondary via-secondary/85 to-accent",
  green: "bg-linear-to-br from-accent-2 via-accent-2/85 to-secondary",
  navy: "bg-linear-to-br from-accent via-accent/90 to-foreground",
  slate: "bg-linear-to-br from-secondary/75 via-secondary to-accent",
  teal: "bg-linear-to-br from-accent-2 via-accent-2/80 to-foreground",
};

export type CommitmentDocument = {
  category: string;
  fileSize: string;
  fileUrl: string;
  id: number;
  mediaTone: CommitmentDocumentMediaTone;
  title: string;
  uploadedAt: string;
};
