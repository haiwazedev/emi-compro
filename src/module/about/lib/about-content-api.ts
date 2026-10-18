import "server-only";

import type {
  AboutHistoryItem,
  AboutMissionItem,
} from "@/module/about/content/about-page";
import {
  getSiteContentBlockItems,
  getSiteContentItems,
  getSiteContentValue,
} from "@/shared/lib/site-content-api";
import { resolveApiAssetUrl } from "@/shared/lib/api-client";

export type AboutSiteContentData = {
  companyPictureUrl: string | null;
  history: AboutHistoryItem[];
  mission: AboutMissionItem[];
  profileContent: string | null;
  vision: string | null;
};

export async function getAboutSiteContentData(): Promise<AboutSiteContentData> {
  const items = await getSiteContentItems("about-us");
  const profileItem = getSiteContentBlockItems(
    items,
    "company-profile",
    "profile-content",
  )[0];
  const pictureItem = getSiteContentBlockItems(
    items,
    "company-profile",
    "company-picture",
  )[0];
  const visionItem = getSiteContentBlockItems(
    items,
    "mission-vision",
    "vision",
  )[0];
  const companyPicturePath = getSiteContentValue(pictureItem, "media_filepath");

  const mission = getSiteContentBlockItems(
    items,
    "mission-vision",
    "mission-item",
  ).flatMap((item) => {
    const title = getSiteContentValue(item, "title");
    const description = getSiteContentValue(item, "description");

    return title && description ? [{ description, id: item.id, title }] : [];
  });

  const history = getSiteContentBlockItems(
    items,
    "history_timeline",
    "timeline-item",
  ).flatMap((item) => {
    const year = getSiteContentValue(item, "period");
    const title = getSiteContentValue(item, "title");
    const description = getSiteContentValue(item, "description");

    return year && title && description
      ? [{ description, id: item.id, title, year }]
      : [];
  });

  return {
    companyPictureUrl: companyPicturePath
      ? resolveApiAssetUrl(companyPicturePath)
      : null,
    history,
    mission,
    profileContent: getSiteContentValue(profileItem, "content"),
    vision: getSiteContentValue(visionItem, "content"),
  };
}
