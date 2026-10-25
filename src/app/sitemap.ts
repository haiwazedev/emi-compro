import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { getPublishedArticleSitemapEntries } from "@/module/articles/lib/articles-api";
import { getSiteOrigin } from "@/shared/lib/site-url";

export const dynamic = "force-dynamic";

const publicPagePaths = [
  "",
  "/about-us",
  "/services",
  "/commitments",
  "/contact-us",
  "/articles",
] as const;

function toSiteUrl(siteOrigin: string, pathname: string) {
  return new URL(pathname, `${siteOrigin}/`).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteOrigin = getSiteOrigin();
  const publicPages = routing.locales.flatMap((locale) =>
    publicPagePaths.map((path) => ({
      url: toSiteUrl(siteOrigin, `/${locale}${path}`),
    })),
  );
  const articlePages = await Promise.all(
    routing.locales.map(async (locale) => {
      try {
        const articles = await getPublishedArticleSitemapEntries(locale);

        return articles.map(({ slug }) => ({
          url: toSiteUrl(
            siteOrigin,
            `/${locale}/articles/${encodeURIComponent(slug)}`,
          ),
        }));
      } catch {
        return [];
      }
    }),
  );

  return [...publicPages, ...articlePages.flat()];
}
