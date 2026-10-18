import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  defaultLocale: "id",
  localeDetection: false,
  localePrefix: "always",
  locales: ["id", "en"],
});

export type Locale = (typeof routing.locales)[number];
