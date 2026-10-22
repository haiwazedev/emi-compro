import { getLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import type { Article } from "@/module/articles/content/articles";
import { getPublicSiteSettings } from "@/module/contact/lib/contact-api";
import { NavbarClient } from "./navbar-client";

export async function Navbar({
  articleAlternateSlugs,
}: {
  articleAlternateSlugs?: Article["alternateSlugs"];
}) {
  const locale = (await getLocale()) as Locale;
  const siteSettings = await getPublicSiteSettings(locale).catch(() => null);

  return (
    <NavbarClient
      articleAlternateSlugs={articleAlternateSlugs}
      danantaraLogoUrl={siteSettings?.danantaraLogoUrl ?? null}
      plnLogoUrl={siteSettings?.plnLogoUrl ?? null}
    />
  );
}
