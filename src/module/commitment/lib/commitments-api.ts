import "server-only";

import { apiGet, resolveApiAssetUrl } from "@/shared/lib/api-client";
import {
  commitmentDocumentMediaToneClassNames,
  type CommitmentDocument,
  type CommitmentDocumentMediaTone,
} from "@/module/commitment/content/commitment-documents";

const DOCUMENTS_PER_PAGE = 20;
const mediaTones = Object.keys(
  commitmentDocumentMediaToneClassNames,
) as CommitmentDocumentMediaTone[];

type ApiCommitmentCategory = {
  id: number;
  name: string;
};

type ApiCommitmentDocument = {
  document_commitment_category?: ApiCommitmentCategory | null;
  file_path: string;
  id: number;
  size: number;
  status: "DRAFT" | "PUBLISHED";
  title: string;
  uploaded_at: string;
};

type CommitmentDocumentsResponse = {
  documentCommitments: ApiCommitmentDocument[];
  pagination: {
    limit: number;
    page: number;
    totalItems: number;
    totalPages: number;
  };
};

export type CommitmentListingData = {
  documents: CommitmentDocument[];
  page: number;
  totalPages: number;
};

function formatFileSize(sizeInKilobytes: number) {
  if (sizeInKilobytes < 1024) {
    return `${sizeInKilobytes} KB`;
  }

  return `${new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 1,
  }).format(sizeInKilobytes / 1024)} MB`;
}

function formatUploadDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Tanggal tidak tersedia";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(date);
}

function mapCommitmentDocument(
  document: ApiCommitmentDocument,
): CommitmentDocument {
  return {
    category: document.document_commitment_category?.name ?? "Dokumen",
    fileSize: formatFileSize(document.size),
    fileUrl: resolveApiAssetUrl(document.file_path),
    id: document.id,
    mediaTone: mediaTones[document.id % mediaTones.length],
    title: document.title,
    uploadedAt: formatUploadDate(document.uploaded_at),
  };
}

async function getCommitmentDocuments(page: number) {
  const query: Record<string, number | string> = {
    limit: DOCUMENTS_PER_PAGE,
    page,
    status: "PUBLISHED",
  };

  return apiGet<CommitmentDocumentsResponse>("/document_commitments", query);
}

export async function getCommitmentListingData(options: {
  page: number;
}): Promise<CommitmentListingData> {
  const firstPage = await getCommitmentDocuments(1);
  const totalPages = Math.max(1, firstPage.pagination.totalPages);
  const page = Math.min(options.page, totalPages);
  const remainingPages = await Promise.all(
    Array.from({ length: page - 1 }, (_, index) =>
      getCommitmentDocuments(index + 2),
    ),
  );

  return {
    documents: [
      ...firstPage.documentCommitments,
      ...remainingPages.flatMap((result) => result.documentCommitments),
    ].map(mapCommitmentDocument),
    page,
    totalPages,
  };
}
