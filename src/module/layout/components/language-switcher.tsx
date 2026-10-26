"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { useLocale } from "next-intl";
import type { FC } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { useCopy } from "@/i18n/use-copy";

export type Language = Locale;

type Props = {
  articleAlternateSlugs?: Partial<Record<Language, string>>;
  commitmentCategoryAlternateSlugs?: Partial<Record<Language, string>>;
};

const languages: { label: string; value: Language }[] = [
  { label: "ID", value: "id" },
  { label: "EN", value: "en" },
];

const LanguageSwitcher: FC<Props> = ({
  articleAlternateSlugs,
  commitmentCategoryAlternateSlugs,
}) => {
  const selectedLanguage = useLocale() as Language;
  const pathname = usePathname();
  const router = useRouter();
  const copy = useCopy();

  function handleLanguageChange(language: Language) {
    if (language === selectedLanguage) {
      return;
    }

    const alternateSlug = articleAlternateSlugs?.[language];
    const isArticlePage = articleAlternateSlugs !== undefined;
    const isCommitmentsPage = pathname === "/commitments";
    const targetPathname = articleAlternateSlugs
      ? alternateSlug
        ? `/articles/${encodeURIComponent(alternateSlug)}`
        : "/articles"
      : pathname;
    const preserveHash = !isArticlePage || Boolean(alternateSlug);
    const searchParams = new URLSearchParams(window.location.search);

    if (isCommitmentsPage && searchParams.has("category")) {
      const alternateCategorySlug =
        commitmentCategoryAlternateSlugs?.[language];

      if (alternateCategorySlug) {
        searchParams.set("category", alternateCategorySlug);
      } else {
        searchParams.delete("category");
        searchParams.delete("page");
      }
    }

    const search = searchParams.toString();

    router.replace(
      `${targetPathname}${search ? `?${search}` : ""}${preserveHash ? window.location.hash : ""}`,
      { locale: language },
    );
  }

  return (
    <div
      aria-label={copy("Language selector")}
      className="bg-background flex overflow-hidden rounded-full"
      role="group"
    >
      {languages.map(({ label, value }) => {
        const isSelected = selectedLanguage === value;

        return (
          <Button
            aria-pressed={isSelected}
            className={cn(
              "rounded-none border-0 px-4 py-2 text-sm font-bold transition-colors hover:cursor-pointer",
              isSelected
                ? "bg-accent text-primary hover:bg-accent hover:text-primary"
                : "bg-background text-accent hover:bg-accent/25",
            )}
            key={value}
            onClick={() => handleLanguageChange(value)}
            type="button"
            variant="ghost"
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
