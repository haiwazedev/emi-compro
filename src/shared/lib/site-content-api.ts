import "server-only";

import type { Locale } from "@/i18n/routing";
import { apiGet } from "@/shared/lib/api-client";

export type SiteContentPage = "home" | "about-us";

export type SiteContentItem = {
  block_key: string;
  block_type: string;
  data: Record<string, string | null>;
  id: number;
  sort_order: number;
};

type ApiSiteContentsResponse = {
  site_contents: {
    items: SiteContentItem[];
    language_id: string;
  };
};

export async function getSiteContentItems(
  page: SiteContentPage,
  locale: Locale,
) {
  const response = await apiGet<ApiSiteContentsResponse>("/site_contents", {
    language_id: locale,
    page,
  });

  return response.site_contents.items;
}

export function getSiteContentBlockItems(
  items: SiteContentItem[],
  blockKey: string,
  blockType: string,
) {
  return items
    .filter(
      (item) => item.block_key === blockKey && item.block_type === blockType,
    )
    .sort((left, right) => left.sort_order - right.sort_order);
}

export function getSiteContentValue(
  item: SiteContentItem | undefined,
  field: string,
) {
  const value = item?.data[field];

  return typeof value === "string" ? value.trim() || null : null;
}
