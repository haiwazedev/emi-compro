import "server-only";

import type { ContactFaqItem } from "@/module/contact/content/contact";
import { apiGet } from "@/shared/lib/api-client";
import { sanitizeRichText } from "@/shared/lib/sanitize-rich-text";

type ApiFaq = {
  answer: string;
  id: number;
  question: string;
};

type ApiFaqsResponse = {
  faqs: ApiFaq[];
};

export async function getContactFaqs(): Promise<ContactFaqItem[]> {
  const { faqs } = await apiGet<ApiFaqsResponse>("/faqs", {
    language_id: "id",
    status: "PUBLISHED",
  });

  return faqs.map((faq) => ({
    answerHtml: sanitizeRichText(faq.answer),
    id: faq.id,
    question: faq.question,
  }));
}
