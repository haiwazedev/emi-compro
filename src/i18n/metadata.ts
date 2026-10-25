import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getCopyKey } from "./keys";
import type { Locale } from "./routing";

export const DEFAULT_OPEN_GRAPH_IMAGE = "/slides/slide_1.png";

export async function getLocalizedMetadata(
  locale: Locale,
  title: string,
  description: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "copy" });
  const localizedTitle = t(getCopyKey(title));
  const localizedDescription = t(getCopyKey(description));

  return {
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
