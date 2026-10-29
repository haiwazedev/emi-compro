import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getCopyKey } from "./keys";
import { routing, type Locale } from "./routing";

export const DEFAULT_OPEN_GRAPH_IMAGE = "/slides/slide_1.png";

export const PUBLIC_PAGE_PATHS = [
  "",
  "/about-us",
  "/services",
  "/commitments",
  "/contact-us",
  "/articles",
] as const;

export function getLocalizedPath(locale: Locale, pathname = "") {
  const normalizedPathname = pathname.replace(/^\/+|\/+$/g, "");

  return normalizedPathname ? `/${locale}/${normalizedPathname}` : `/${locale}`;
}

export function getArticlePath(locale: Locale, slug: string) {
  return `${getLocalizedPath(locale, "/articles")}/${encodeURIComponent(slug)}`;
}

export function getLocalizedAlternates(locale: Locale, pathname = "") {
  const languages = Object.fromEntries(
    routing.locales.map((language) => [
      language,
      getLocalizedPath(language, pathname),
    ]),
  );
  const defaultPath = getLocalizedPath(routing.defaultLocale, pathname);

  return {
    canonical: getLocalizedPath(locale, pathname),
    languages: {
      ...languages,
      "x-default": defaultPath,
    },
  };
}

export function getArticleAlternates(
  locale: Locale,
  slug: string,
  alternateSlugs: Partial<Record<Locale, string>>,
) {
  const publishedSlugs = {
    ...alternateSlugs,
    [locale]: slug,
  };
  const languages = Object.fromEntries(
    routing.locales.flatMap((language) => {
      const localizedSlug = publishedSlugs[language];

      return localizedSlug
        ? [[language, getArticlePath(language, localizedSlug)]]
        : [];
    }),
  );
  const defaultLocale = publishedSlugs[routing.defaultLocale]
    ? routing.defaultLocale
    : locale;
  const defaultSlug = publishedSlugs[defaultLocale] ?? slug;

  return {
    canonical: getArticlePath(locale, slug),
    languages: {
      ...languages,
      "x-default": getArticlePath(defaultLocale, defaultSlug),
    },
  };
}

export async function getLocalizedMetadata(
  locale: Locale,
  title: string,
  description: string,
  pathname: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "copy" });
  const localizedTitle = t(getCopyKey(title));
  const localizedDescription = t(getCopyKey(description));

  return {
    alternates: getLocalizedAlternates(locale, pathname),
    description: localizedDescription,
    openGraph: {
      description: localizedDescription,
      images: [DEFAULT_OPEN_GRAPH_IMAGE],
      title: localizedTitle,
      type: "website",
    },
    title: localizedTitle,
  };
}
