import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function getFirstSearchParamValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export function parsePositiveInteger(value?: string) {
  const parsedValue = Number(value);

  return Number.isSafeInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : undefined;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
