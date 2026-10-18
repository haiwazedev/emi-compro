import { useTranslations } from "next-intl";

import { getCopyKey } from "./keys";

export { getCopyKey };

export function useCopy() {
  const translate = useTranslations("copy");

  return (source: string, values?: Record<string, string | number | Date>) =>
    translate(getCopyKey(source), values);
}
