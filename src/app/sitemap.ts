import type { MetadataRoute } from "next";

import {
  getArticlePath,
  getLocalizedPath,
  PUBLIC_PAGE_PATHS,
} from "@/i18n/metadata";
import { routing } from "@/i18n/routing";
import { getPublishedArticleSitemapEntries } from "@/module/articles/lib/articles-api";
import { getSiteOrigin } from "@/shared/lib/site-url";

export const dynamic = "force-dynamic";

function toSiteUrl(siteOrigin: string, pathname: string) {
  return new URL(pathname, `${siteOrigin}/`).toString();
}

function getStaticPageAlternates(siteOrigin: string, pathname: string) {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      toSiteUrl(siteOrigin, getLocalizedPath(locale, pathname)),
    ]),
  );

  return {
    ...languages,
    "x-default": toSiteUrl(
      siteOrigin,
      getLocalizedPath(routing.defaultLocale, pathname),
    ),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteOrigin = getSiteOrigin();
  const publicPages = routing.locales.flatMap((locale) =>
    PUBLIC_PAGE_PATHS.map((path) => ({
      alternates: {
        languages: getStaticPageAlternates(siteOrigin, path),
      },
      url: toSiteUrl(siteOrigin, getLocalizedPath(locale, path)),
    })),
  );
  const articlePages = await Promise.all(
    routing.locales.map(async (locale) => {
      try {
        return await getPublishedArticleSitemapEntries(locale);
      } catch {
        return [];
      }
    }),
  );
  const articleEntries = articlePages.flat();
  const articleSlugsById = new Map<
    number,
    Partial<Record<(typeof routing.locales)[number], string>>
  >();

  for (const entry of articleEntries) {
    const localizedSlugs = articleSlugsById.get(entry.articleId) ?? {};

    Object.assign(localizedSlugs, entry.alternateSlugs, {
      [entry.locale]: entry.slug,
    });
    articleSlugsById.set(entry.articleId, localizedSlugs);
  }
  const articleSitemapEntries = articleEntries.map((entry) => {
    const localizedSlugs = articleSlugsById.get(entry.articleId) ?? {
      [entry.locale]: entry.slug,
    };
    const languages = Object.fromEntries(
      routing.locales.flatMap((locale) => {
        const slug = localizedSlugs[locale];

        return slug
          ? [[locale, toSiteUrl(siteOrigin, getArticlePath(locale, slug))]]
          : [];
      }),
    );
    const defaultLocale = localizedSlugs[routing.defaultLocale]
      ? routing.defaultLocale
      : entry.locale;
    const defaultSlug = localizedSlugs[defaultLocale] ?? entry.slug;

    return {
      alternates: {
        languages: {
          ...languages,
          "x-default": toSiteUrl(
            siteOrigin,
            getArticlePath(defaultLocale, defaultSlug),
          ),
        },
      },
      url: toSiteUrl(siteOrigin, getArticlePath(entry.locale, entry.slug)),
    };
  });

  return [...publicPages, ...articleSitemapEntries];
}
