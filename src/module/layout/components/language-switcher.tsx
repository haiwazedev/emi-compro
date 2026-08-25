"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { FC, useState } from "react";

export type Language = "id" | "en";

type Props = {
  defaultLanguage?: Language;
  onLanguageChange?: (language: Language) => void;
};

const languages: { label: string; value: Language }[] = [
  { label: "ID", value: "id" },
  { label: "EN", value: "en" },
];

const LanguageSwitcher: FC<Props> = ({
  defaultLanguage = "id",
  onLanguageChange,
}) => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>(defaultLanguage);

  function handleLanguageChange(language: Language) {
    if (language === selectedLanguage) {
      return;
    }

    setSelectedLanguage(language);
    onLanguageChange?.(language);
  }

  return (
    <div
      aria-label="Language selector"
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
