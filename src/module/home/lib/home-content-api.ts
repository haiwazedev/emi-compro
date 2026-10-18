import "server-only";

import type { Locale } from "@/i18n/routing";
import type { HomeSlide, HomeStatistic } from "@/module/home/content/home";
import {
  getSiteContentBlockItems,
  getSiteContentItems,
  getSiteContentValue,
} from "@/shared/lib/site-content-api";
import { resolveApiAssetUrl } from "@/shared/lib/api-client";

export type HomeTeaser = {
  actionLabel: string | null;
  description: string | null;
  title: string | null;
};

export type HomeSiteContentData = {
  slides: HomeSlide[];
  statistics: HomeStatistic[];
  teaser: HomeTeaser;
};

function mapSlides(
  items: Awaited<ReturnType<typeof getSiteContentItems>>,
): HomeSlide[] {
  return getSiteContentBlockItems(
    items,
    "hero-carousel",
    "carousel-slide",
  ).flatMap((item) => {
    const mainTitle = getSiteContentValue(item, "title_1");
    const subtitle = getSiteContentValue(item, "title_2");
    const description = getSiteContentValue(item, "subtitle");

    if (!mainTitle || !subtitle || !description) {
      return [];
    }

    const imagePath = getSiteContentValue(item, "media_filepath");

    return [
      {
        description,
        id: item.id,
        image: imagePath ? resolveApiAssetUrl(imagePath) : null,
        imageAlt: `${mainTitle} ${subtitle}`,
        mainTitle,
        subtitle,
      },
    ];
  });
}

function mapStatistics(
  items: Awaited<ReturnType<typeof getSiteContentItems>>,
): HomeStatistic[] {
  return getSiteContentBlockItems(items, "statistic", "statistic-item").flatMap(
    (item) => {
      const label = getSiteContentValue(item, "label");
      const number = getSiteContentValue(item, "number");
      const description = getSiteContentValue(item, "description");

      if (!label || !number || !description) {
        return [];
      }

      return [{ description, id: item.id, label, number }];
    },
  );
}

function getTeaserField(
  items: Awaited<ReturnType<typeof getSiteContentItems>>,
  blockType: string,
  field: string,
) {
  const item = getSiteContentBlockItems(items, "teaser", blockType)[0];

  return getSiteContentValue(item, field);
}

export async function getHomeSiteContentData(
  locale: Locale,
): Promise<HomeSiteContentData> {
  const items = await getSiteContentItems("home", locale);

  return {
    slides: mapSlides(items),
    statistics: mapStatistics(items),
    teaser: {
      actionLabel: getTeaserField(items, "cta-title", "title"),
      description: getTeaserField(items, "teaser-content", "content"),
      title: getTeaserField(items, "teaser-title", "title"),
    },
  };
}
