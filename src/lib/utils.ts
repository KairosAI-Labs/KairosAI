import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Locale } from "date-fns";
import { LOCALE_MAP } from "@/constants/TimeMeeting";
import { es } from "date-fns/locale";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cleanText = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

export function getBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return es;
  const lang = navigator.language?.split("-")[0] ?? "es";
  return LOCALE_MAP[lang] ?? es;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatDate(date: Date): string {
  const lang = typeof navigator !== "undefined" ? navigator.language : "es";
  return date.toLocaleDateString(lang, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
