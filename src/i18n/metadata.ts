import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getCopyKey } from "./keys";
import type { Locale } from "./routing";

export async function getLocalizedMetadata(
  locale: Locale,
  title: string,
  description: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "copy" });

  return {
    title: t(getCopyKey(title)),
    description: t(getCopyKey(description)),
  };
}
